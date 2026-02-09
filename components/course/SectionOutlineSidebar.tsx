import Link from "next/link";
import type { CourseChapter, CourseSection } from "@/lib/courses";

type SectionOutlineSidebarProps = {
  slug: string;
  chapters: CourseChapter[];
  sections: CourseSection[];
  activeSectionId: string;
};

const SectionOutlineSidebar = ({
  slug,
  chapters,
  sections,
  activeSectionId,
}: SectionOutlineSidebarProps) => {
  const unchapteredSections = sections.filter((section) => !section.chapter);

  return (
    <aside className="sticky top-8 h-fit rounded-card border border-odyssey-gray-light/60 bg-white p-4 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
        Course Outline
      </p>
      <div className="mt-4 space-y-4">
        {chapters.map((chapter) => {
          const chapterSections = sections.filter(
            (section) => section.chapter === chapter.id
          );
          if (!chapterSections.length) {
            return null;
          }

          return (
            <div key={chapter.id}>
              <h3 className="text-sm font-semibold text-foreground">
                {chapter.title}
              </h3>
              <ul className="mt-2 space-y-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                {chapterSections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`/courses/${slug}/${section.id}`}
                      className={`block rounded-pill px-3 py-1 transition ${
                        activeSectionId === section.id
                          ? "bg-odyssey-orange/10 text-odyssey-orange"
                          : "bg-odyssey-gray-light/40"
                      }`}
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {unchapteredSections.length ? (
          <div>
            <h3 className="text-sm font-semibold text-foreground">Wrap Up</h3>
            <ul className="mt-2 space-y-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
              {unchapteredSections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/courses/${slug}/${section.id}`}
                    className={`block rounded-pill px-3 py-1 transition ${
                      activeSectionId === section.id
                        ? "bg-odyssey-orange/10 text-odyssey-orange"
                        : "bg-odyssey-gray-light/40"
                    }`}
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default SectionOutlineSidebar;
