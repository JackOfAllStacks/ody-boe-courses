"use client";

import type { CourseBlock } from "@/lib/courses";
import LessonBlock from "@/components/course/LessonBlock";
import StudyGuideBlock from "@/components/course/StudyGuideBlock";
import PodcastBlock from "@/components/course/PodcastBlock";
import QuizBlock from "@/components/course/QuizBlock";
import FlashcardsBlock from "@/components/course/FlashcardsBlock";
import FinalExamBlock from "@/components/course/FinalExamBlock";

const BlockRenderer = ({ block }: { block: CourseBlock }) => {
  switch (block.type) {
    case "lesson":
      return <LessonBlock block={block} />;
    case "study_guide":
      return <StudyGuideBlock block={block} />;
    case "quiz":
      return <QuizBlock block={block} />;
    case "flashcards":
      return <FlashcardsBlock block={block} />;
    case "final_exam":
      return <FinalExamBlock block={block} />;
    case "podcast":
      return <PodcastBlock block={block} />;
    default:
      return null;
  }
};

export default BlockRenderer;
