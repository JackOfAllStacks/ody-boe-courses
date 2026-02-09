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

type BaseBlock = {
  id: string;
  type: CourseBlockType;
  title: string;
  chapter?: string;
};

export type LessonBlock = BaseBlock & {
  summary?: string;
  body: string;
};

export type StudyGuideBlock = BaseBlock & {
  body: string;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type QuizBlock = BaseBlock & {
  questions: QuizQuestion[];
};

export type Flashcard = {
  front: string;
  back: string;
};

export type FlashcardsBlock = BaseBlock & {
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

const parseBlocks = (content: string): CourseBlock[] => {
  const blocks: CourseBlock[] = [];

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

    if (!meta.id || !meta.title) {
      continue;
    }

    switch (type) {
      case "lesson":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          chapter: meta.chapter ? String(meta.chapter) : undefined,
          summary: meta.summary ? String(meta.summary) : undefined,
          body,
        });
        break;
      case "study_guide":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          chapter: meta.chapter ? String(meta.chapter) : undefined,
          body,
        });
        break;
      case "quiz":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          chapter: meta.chapter ? String(meta.chapter) : undefined,
          questions: (meta.questions || []) as QuizQuestion[],
        });
        break;
      case "flashcards":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          chapter: meta.chapter ? String(meta.chapter) : undefined,
          cards: (meta.cards || []) as Flashcard[],
        });
        break;
      case "final_exam":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          questions: (meta.questions || []) as QuizQuestion[],
        });
        break;
      case "podcast":
        blocks.push({
          type,
          id: String(meta.id),
          title: String(meta.title),
          summary: meta.summary ? String(meta.summary) : undefined,
          audio_src: meta.audio_src ? String(meta.audio_src) : undefined,
          length: meta.length ? String(meta.length) : undefined,
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

  return {
    meta: data as CourseMeta,
    blocks: parseBlocks(content),
  };
};

export const getAllCourses = (): CourseMeta[] => {
  return getCourseSlugs()
    .map((slug) => getCourseBySlug(slug)?.meta)
    .filter(Boolean) as CourseMeta[];
};
