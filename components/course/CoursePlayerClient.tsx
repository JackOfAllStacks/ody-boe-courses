"use client";

import { useEffect, useMemo, useState } from "react";
import type { CourseBlock, CourseChapter } from "@/lib/courses";
import OutlineSidebar from "@/components/course/OutlineSidebar";
import BlockRenderer from "@/components/course/BlockRenderer";

type CoursePlayerClientProps = {
  chapters: CourseChapter[];
  blocks: CourseBlock[];
};

const CoursePlayerClient = ({ chapters, blocks }: CoursePlayerClientProps) => {
  const [activeId, setActiveId] = useState<string | undefined>(blocks[0]?.id);

  const blockIds = useMemo(() => blocks.map((block) => block.id), [blocks]);

  useEffect(() => {
    if (!blockIds.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        const topId = visible[0].target.getAttribute("data-block-id");
        if (topId) {
          setActiveId(topId);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    for (const id of blockIds) {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, [blockIds]);

  return (
    <section className="mt-10 grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
      <OutlineSidebar chapters={chapters} blocks={blocks} activeId={activeId} />
      <div className="space-y-8">
        {blocks.map((block) => (
          <article
            key={block.id}
            id={block.id}
            data-block-id={block.id}
            className="scroll-mt-24"
          >
            <BlockRenderer block={block} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default CoursePlayerClient;
