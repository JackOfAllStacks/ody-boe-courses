import ReactMarkdown from "react-markdown";
import type { StudyGuideBlock as StudyGuideBlockType } from "@/lib/courses";

const StudyGuideBlock = ({ block }: { block: StudyGuideBlockType }) => {
  return (
    <section className="rounded-card border border-odyssey-orange/40 bg-[linear-gradient(135deg,#ffffff_0%,#fff3e8_100%)] p-6 shadow-[0_20px_50px_rgba(242,107,29,0.12)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
        Study Guide
      </p>
      <h2 className="mt-2 font-display text-2xl text-foreground">
        {block.title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/85">
        <ReactMarkdown>{block.body}</ReactMarkdown>
      </div>
    </section>
  );
};

export default StudyGuideBlock;
