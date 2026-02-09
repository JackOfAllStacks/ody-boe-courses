import ReactMarkdown from "react-markdown";
import type { LessonBlock as LessonBlockType } from "@/lib/courses";

const LessonBlock = ({ block }: { block: LessonBlockType }) => {
  return (
    <section className="rounded-card border border-odyssey-gray-light/60 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
            Lesson
          </p>
          <h2 className="mt-2 font-display text-2xl text-foreground">
            {block.title}
          </h2>
          {block.summary ? (
            <p className="mt-2 text-sm text-odyssey-gray">{block.summary}</p>
          ) : null}
        </div>
        <div className="rounded-pill border border-odyssey-gray-light px-3 py-1 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
          Read
        </div>
      </div>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-foreground/90">
        <ReactMarkdown>{block.body}</ReactMarkdown>
      </div>
    </section>
  );
};

export default LessonBlock;
