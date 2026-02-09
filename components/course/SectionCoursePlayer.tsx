import Link from "next/link";
import type { CourseBlock, CourseChapter, CourseSection } from "@/lib/courses";
import BlockRenderer from "@/components/course/BlockRenderer";
import SectionOutlineSidebar from "@/components/course/SectionOutlineSidebar";

type SectionCoursePlayerProps = {
  slug: string;
  chapters: CourseChapter[];
  blocks: CourseBlock[];
  sections: CourseSection[];
  activeSection: CourseSection;
};

const SectionCoursePlayer = ({
  slug,
  chapters,
  blocks,
  sections,
  activeSection,
}: SectionCoursePlayerProps) => {
  const blockMap = new Map(blocks.map((block) => [block.id, block]));
  const activeBlocks = activeSection.blockIds
    .map((id) => blockMap.get(id))
    .filter((block): block is CourseBlock => Boolean(block));

  const activeIndex = sections.findIndex((section) => section.id === activeSection.id);
  const previousSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection =
    activeIndex >= 0 && activeIndex < sections.length - 1
      ? sections[activeIndex + 1]
      : null;

  return (
    <section className="mt-10 grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
      <SectionOutlineSidebar
        slug={slug}
        chapters={chapters}
        sections={sections}
        activeSectionId={activeSection.id}
      />

      <div className="space-y-8">
        {activeBlocks.map((block) => (
          <article key={block.id}>
            <BlockRenderer block={block} />
          </article>
        ))}

        <div className="flex flex-col gap-3 border-t border-odyssey-gray-light/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {previousSection ? (
            <Link
              href={`/courses/${slug}/${previousSection.id}`}
              className="inline-flex items-center rounded-pill border border-odyssey-gray-light px-4 py-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray transition hover:border-odyssey-orange hover:text-foreground"
            >
              Previous: {previousSection.title}
            </Link>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-odyssey-gray">
              Start of course
            </span>
          )}
          {nextSection ? (
            <Link
              href={`/courses/${slug}/${nextSection.id}`}
              className="inline-flex items-center rounded-pill bg-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-black"
            >
              Next: {nextSection.title}
            </Link>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-odyssey-gray">
              End of course
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionCoursePlayer;
