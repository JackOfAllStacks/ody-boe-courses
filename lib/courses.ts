import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";

export type CourseBlockType =
  | "lesson"
  | "study_guide"
  | "quiz"
  | "flashcards"
  | "final_exam"
  | "podcast";

type BaseBlock<T extends CourseBlockType> = {
  id: string;
  type: T;
  title: string;
  chapter?: string;
};

export type LessonBlock = BaseBlock<"lesson"> & {
  summary?: string;
  body: string;
};

export type StudyGuideBlock = BaseBlock<"study_guide"> & {
  body: string;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type QuizBlock = BaseBlock<"quiz"> & {
  questions: QuizQuestion[];
};

export type Flashcard = {
  front: string;
  back: string;
};

export type FlashcardsBlock = BaseBlock<"flashcards"> & {
  cards: Flashcard[];
};

export type FinalExamBlock = {
  id: string;
  type: "final_exam";
  title: string;
  questions: QuizQuestion[];
};

export type PodcastBlock = {
  id: string;
  type: "podcast";
  title: string;
  summary?: string;
  audio_src?: string;
  length?: string;
};

export type CourseBlock =
  | LessonBlock
  | StudyGuideBlock
  | QuizBlock
  | FlashcardsBlock
  | FinalExamBlock
  | PodcastBlock;

export type CourseChapter = {
  id: string;
  title: string;
};

export type CourseMeta = {
  slug: string;
  title: string;
  level: string;
  estimated_time: string;
  hero_image?: string;
  summary?: string;
  learning_outcomes?: string[];
  chapters?: CourseChapter[];
};

export type Course = {
  meta: CourseMeta;
  blocks: CourseBlock[];
};

const coursesDirectory = path.join(process.cwd(), "content/courses");
const blockRegex = /:::(\w+)\n([\s\S]*?)\n:::/g;
const divider = "\n---\n";

const parseHeader = (raw: string) => {
  if (!raw.trim()) {
    return {} as Record<string, unknown>;
  }

  return (parseYaml(raw) || {}) as Record<string, unknown>;
};

const asString = (value: unknown): string | undefined => {
  return typeof value === "string" && value.trim() ? value : undefined;
};

const parseQuestions = (value: unknown): QuizQuestion[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const questions: QuizQuestion[] = [];

  for (const question of value) {
    if (!question || typeof question !== "object") {
      continue;
    }

    const questionRecord = question as Record<string, unknown>;
    const prompt = asString(questionRecord.prompt);
    const answer = asString(questionRecord.answer);
    const explanation = asString(questionRecord.explanation);
    const options = Array.isArray(questionRecord.options)
      ? questionRecord.options.filter(
          (option): option is string =>
            typeof option === "string" && option.trim().length > 0
        )
      : [];

    if (!prompt || !answer || !options.length) {
      continue;
    }

    questions.push({
      prompt,
      options,
      answer,
      explanation,
    });
  }

  return questions;
};

const parseCards = (value: unknown): Flashcard[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const cards: Flashcard[] = [];

  for (const card of value) {
    if (!card || typeof card !== "object") {
      continue;
    }

    const cardRecord = card as Record<string, unknown>;
    const front = asString(cardRecord.front);
    const back = asString(cardRecord.back);

    if (!front || !back) {
      continue;
    }

    cards.push({ front, back });
  }

  return cards;
};

const parseBlocks = (content: string): CourseBlock[] => {
  const blocks: CourseBlock[] = [];
  const usedIds = new Set<string>();

  for (const match of content.matchAll(blockRegex)) {
    const type = match[1] as CourseBlockType;
    const raw = match[2].trim();
    const dividerIndex = raw.indexOf(divider);

    let header = raw;
    let body = "";

    if (dividerIndex >= 0) {
      header = raw.slice(0, dividerIndex);
      body = raw.slice(dividerIndex + divider.length).trim();
    }

    const meta = parseHeader(header);

    const id = asString(meta.id);
    const title = asString(meta.title);
    const chapter = asString(meta.chapter);

    if (!id || !title) {
      continue;
    }

    if (usedIds.has(id)) {
      // Keep parsing on duplicate ids to avoid hard failures in the MVP demo.
      console.warn(`Duplicate block id found in course markdown: ${id}`);
      continue;
    }
    usedIds.add(id);

    switch (type) {
      case "lesson":
        blocks.push({
          type,
          id,
          title,
          chapter,
          summary: asString(meta.summary),
          body,
        });
        break;
      case "study_guide":
        blocks.push({
          type,
          id,
          title,
          chapter,
          body,
        });
        break;
      case "quiz":
        blocks.push({
          type,
          id,
          title,
          chapter,
          questions: parseQuestions(meta.questions),
        });
        break;
      case "flashcards":
        blocks.push({
          type,
          id,
          title,
          chapter,
          cards: parseCards(meta.cards),
        });
        break;
      case "final_exam":
        blocks.push({
          type,
          id,
          title,
          questions: parseQuestions(meta.questions),
        });
        break;
      case "podcast":
        blocks.push({
          type,
          id,
          title,
          summary: asString(meta.summary),
          audio_src: asString(meta.audio_src),
          length: asString(meta.length),
        });
        break;
      default:
        break;
    }
  }

  return blocks;
};

export const getCourseSlugs = () => {
  if (!fs.existsSync(coursesDirectory)) {
    return [] as string[];
  }

  return fs
    .readdirSync(coursesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
};

export const getCourseBySlug = (slug: string): Course | null => {
  const coursePath = path.join(coursesDirectory, `${slug}.md`);

  if (!fs.existsSync(coursePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(coursePath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = (data || {}) as Partial<CourseMeta>;

  return {
    meta: {
      slug: asString(meta.slug) || slug,
      title: asString(meta.title) || "Untitled Course",
      level: asString(meta.level) || "beginner",
      estimated_time: asString(meta.estimated_time) || "2-3 hours",
      hero_image: asString(meta.hero_image),
      summary: asString(meta.summary),
      learning_outcomes: Array.isArray(meta.learning_outcomes)
        ? meta.learning_outcomes.filter(
            (item): item is string =>
              typeof item === "string" && item.trim().length > 0
          )
        : [],
      chapters: Array.isArray(meta.chapters)
        ? meta.chapters
            .map((chapter) => {
              if (!chapter || typeof chapter !== "object") {
                return null;
              }

              const chapterRecord = chapter as Record<string, unknown>;
              const id = asString(chapterRecord.id);
              const title = asString(chapterRecord.title);

              if (!id || !title) {
                return null;
              }

              return { id, title };
            })
            .filter((chapter): chapter is CourseChapter => chapter !== null)
        : [],
    },
    blocks: parseBlocks(content),
  };
};

export const getAllCourses = (): CourseMeta[] => {
  return getCourseSlugs()
    .map((slug) => getCourseBySlug(slug)?.meta)
    .filter(Boolean) as CourseMeta[];
};
