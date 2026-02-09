import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

const root = process.cwd();
const coursesDir = path.join(root, "content/courses");
const divider = "\n---\n";
const blockRegex = /:::(\w+)\n([\s\S]*?)\n:::/g;
const allowedTypes = new Set([
  "lesson",
  "study_guide",
  "quiz",
  "flashcards",
  "final_exam",
  "podcast",
]);

const REQUIREMENTS = {
  minChapters: 6,
  maxChapters: 10,
  minBlocks: 16,
  maxBlocks: 30,
  minLessons: 6,
  minStudyGuides: 2,
  minQuizzes: 4,
  minFlashcards: 1,
  minLessonWords: 250,
};

const parseHeader = (raw) => {
  if (!raw.trim()) {
    return {};
  }
  return parseYaml(raw) || {};
};

const asString = (value) =>
  typeof value === "string" && value.trim().length > 0 ? value : "";

const asText = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number") {
    return String(value);
  }
  return "";
};

const countWords = (text) => {
  const cleaned = text
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) {
    return 0;
  }
  return cleaned.split(" ").length;
};

const parseBlocks = (content) => {
  const blocks = [];
  for (const match of content.matchAll(blockRegex)) {
    const type = match[1];
    const raw = match[2].trim();
    const dividerIndex = raw.indexOf(divider);

    let header = raw;
    let body = "";
    if (dividerIndex >= 0) {
      header = raw.slice(0, dividerIndex);
      body = raw.slice(dividerIndex + divider.length).trim();
    }
    const meta = parseHeader(header);

    blocks.push({
      type,
      id: asString(meta.id),
      title: asString(meta.title),
      chapter: asString(meta.chapter),
      body,
      meta,
    });
  }
  return blocks;
};

const parseQuestions = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    const record = item;
    const prompt = asText(record.prompt);
    const answer = asText(record.answer);
    const options = Array.isArray(record.options)
      ? record.options.filter((option) => asText(option)).length
      : 0;
    return Boolean(prompt && answer && options >= 3);
  });
};

const parseCards = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    const record = item;
    return asString(record.front) && asString(record.back);
  });
};

const validateFile = (filePath) => {
  const errors = [];
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = data || {};
  const blocks = parseBlocks(content);
  const slug = asString(meta.slug) || path.basename(filePath, ".md");

  for (const field of ["slug", "title", "level", "estimated_time", "summary"]) {
    if (!asString(meta[field])) {
      errors.push(`Missing frontmatter field: ${field}`);
    }
  }

  if (!Array.isArray(meta.chapters)) {
    errors.push("Frontmatter chapters must be a list.");
  } else {
    const chapterCount = meta.chapters.length;
    if (chapterCount < REQUIREMENTS.minChapters || chapterCount > REQUIREMENTS.maxChapters) {
      errors.push(
        `Chapter count must be ${REQUIREMENTS.minChapters}-${REQUIREMENTS.maxChapters}. Found ${chapterCount}.`
      );
    }
    const seenChapterIds = new Set();
    for (const chapter of meta.chapters) {
      if (!chapter || typeof chapter !== "object") {
        errors.push("Each chapter must be an object with id/title.");
        continue;
      }
      const chapterId = asString(chapter.id);
      const chapterTitle = asString(chapter.title);
      if (!chapterId || !chapterTitle) {
        errors.push("Each chapter requires both id and title.");
        continue;
      }
      if (seenChapterIds.has(chapterId)) {
        errors.push(`Duplicate chapter id: ${chapterId}`);
      }
      seenChapterIds.add(chapterId);
    }
  }

  if (blocks.length < REQUIREMENTS.minBlocks || blocks.length > REQUIREMENTS.maxBlocks) {
    errors.push(
      `Block count must be ${REQUIREMENTS.minBlocks}-${REQUIREMENTS.maxBlocks}. Found ${blocks.length}.`
    );
  }

  const seenIds = new Set();
  let lessonCount = 0;
  let quizCount = 0;
  let studyGuideCount = 0;
  let flashcardsCount = 0;
  let finalExamCount = 0;
  let podcastCount = 0;

  for (const block of blocks) {
    if (!allowedTypes.has(block.type)) {
      errors.push(`Unsupported block type: ${block.type}`);
      continue;
    }
    if (!block.id || !block.title) {
      errors.push(`Each block requires id and title. Problem type: ${block.type}`);
    } else if (seenIds.has(block.id)) {
      errors.push(`Duplicate block id: ${block.id}`);
    } else {
      seenIds.add(block.id);
    }

    if (block.type !== "final_exam" && block.type !== "podcast" && !block.chapter) {
      errors.push(`Block ${block.id || block.type} must include chapter.`);
    }

    if (block.type === "lesson") {
      lessonCount += 1;
      const words = countWords(block.body);
      if (words < REQUIREMENTS.minLessonWords) {
        errors.push(
          `Lesson ${block.id} is too short (${words} words). Minimum ${REQUIREMENTS.minLessonWords}.`
        );
      }
    }
    if (block.type === "study_guide") {
      studyGuideCount += 1;
      if (!block.body.trim()) {
        errors.push(`Study guide ${block.id} has empty body.`);
      }
    }
    if (block.type === "quiz") {
      quizCount += 1;
      const questions = parseQuestions(block.meta.questions);
      if (questions.length < 2) {
        errors.push(`Quiz ${block.id} requires at least 2 valid questions.`);
      }
    }
    if (block.type === "flashcards") {
      flashcardsCount += 1;
      const cards = parseCards(block.meta.cards);
      if (cards.length < 3) {
        errors.push(`Flashcards ${block.id} requires at least 3 valid cards.`);
      }
    }
    if (block.type === "final_exam") {
      finalExamCount += 1;
      const questions = parseQuestions(block.meta.questions);
      if (questions.length < 3) {
        errors.push(`Final exam ${block.id} requires at least 3 valid questions.`);
      }
    }
    if (block.type === "podcast") {
      podcastCount += 1;
    }
  }

  if (lessonCount < REQUIREMENTS.minLessons) {
    errors.push(`Need at least ${REQUIREMENTS.minLessons} lessons. Found ${lessonCount}.`);
  }
  if (studyGuideCount < REQUIREMENTS.minStudyGuides) {
    errors.push(
      `Need at least ${REQUIREMENTS.minStudyGuides} study guides. Found ${studyGuideCount}.`
    );
  }
  if (quizCount < REQUIREMENTS.minQuizzes) {
    errors.push(`Need at least ${REQUIREMENTS.minQuizzes} quizzes. Found ${quizCount}.`);
  }
  if (flashcardsCount < REQUIREMENTS.minFlashcards) {
    errors.push(`Need at least ${REQUIREMENTS.minFlashcards} flashcards block.`);
  }
  if (finalExamCount !== 1) {
    errors.push(`Need exactly 1 final exam block. Found ${finalExamCount}.`);
  }
  if (podcastCount !== 1) {
    errors.push(`Need exactly 1 podcast block. Found ${podcastCount}.`);
  }

  return { slug, errors };
};

const target = process.argv[2];
let files = [];

if (target && target !== "--all") {
  const file = path.join(coursesDir, `${target}.md`);
  if (!fs.existsSync(file)) {
    console.error(`Course file not found: ${file}`);
    process.exit(1);
  }
  files = [file];
} else {
  files = fs
    .readdirSync(coursesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(coursesDir, file));
}

let hasErrors = false;
for (const file of files) {
  const result = validateFile(file);
  if (!result.errors.length) {
    console.log(`PASS ${result.slug}`);
    continue;
  }

  hasErrors = true;
  console.log(`FAIL ${result.slug}`);
  for (const error of result.errors) {
    console.log(`  - ${error}`);
  }
}

if (hasErrors) {
  process.exit(1);
}
