import type { CourseBlock, CourseChapter } from "@/lib/courses";

export type OutlineSidebarProps = {
  chapters: CourseChapter[];
  blocks: CourseBlock[];
  activeId?: string;
};

const OutlineSidebar = ({ chapters, blocks, activeId }: OutlineSidebarProps) => {
  const unchapteredBlocks = blocks.filter((block) => !("chapter" in block));

  return (
    <aside className="sticky top-8 h-fit rounded-card border border-odyssey-gray-light/60 bg-white p-4 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
        Course Outline
      </p>
      <div className="mt-4 space-y-4">
        {chapters.map((chapter) => {
          const chapterBlocks = blocks.filter(
            (block) => "chapter" in block && block.chapter === chapter.id
          );

          return (
            <div key={chapter.id}>
              <h3 className="text-sm font-semibold text-foreground">
                {chapter.title}
              </h3>
              <ul className="mt-2 space-y-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                {chapterBlocks.map((block) => (
                  <li
                    key={block.id}
                    className={`rounded-pill px-3 py-1 transition ${
                      activeId === block.id
                        ? "bg-odyssey-orange/10 text-odyssey-orange"
                        : "bg-odyssey-gray-light/40"
                    }`}
                  >
                    <a href={`#${block.id}`} className="block">
                      {block.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {unchapteredBlocks.length ? (
          <div>
            <h3 className="text-sm font-semibold text-foreground">Wrap Up</h3>
            <ul className="mt-2 space-y-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
              {unchapteredBlocks.map((block) => (
                <li
                  key={block.id}
                  className={`rounded-pill px-3 py-1 transition ${
                    activeId === block.id
                      ? "bg-odyssey-orange/10 text-odyssey-orange"
                      : "bg-odyssey-gray-light/40"
                  }`}
                >
                  <a href={`#${block.id}`} className="block">
                    {block.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default OutlineSidebar;
