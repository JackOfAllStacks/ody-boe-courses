import Image from "next/image";
import Link from "next/link";
import { getVisibleCourseCatalog } from "@/lib/courses";

type ChooseCoursePageProps = {
  searchParams: Promise<{
    topic?: string | string[];
    focus?: string | string[];
    length?: string | string[];
    complexity?: string | string[];
    files?: string | string[];
  }>;
};

const getSingleValue = (value: string | string[] | undefined, fallback = "") =>
  Array.isArray(value) ? value[0] || fallback : value || fallback;

const getAttachmentCount = (raw: string): number => {
  if (!raw) {
    return 0;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
};

const ChooseCoursePage = async ({ searchParams }: ChooseCoursePageProps) => {
  const params = await searchParams;
  const courseCatalog = getVisibleCourseCatalog();
  const topic = getSingleValue(params.topic, "Multi-modal learning");
  const focus = getSingleValue(params.focus, "Learning");
  const length = getSingleValue(params.length, "Short");
  const complexity = getSingleValue(params.complexity, "Beginner");
  const attachmentCount = getAttachmentCount(getSingleValue(params.files, ""));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-card border border-odyssey-gray-light/60 bg-white p-8 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
            Course Ready
          </p>
          <h1 className="mt-3 font-display text-3xl text-foreground">
            Pick your course for &quot;{topic}&quot;
          </h1>
          <p className="mt-3 text-sm text-odyssey-gray">
            This MVP uses local, canned course files. Choose one to continue the
            learning experience.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
            Focus: {focus} | Length: {length} | Complexity: {complexity}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
            Sources attached: {attachmentCount}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courseCatalog.map((course) => (
            <article
              key={course.slug}
              className="rounded-card border border-odyssey-gray-light/60 bg-white p-5 shadow-[0_20px_50px_rgba(17,17,17,0.08)]"
            >
              <div className="h-32 overflow-hidden rounded-2xl bg-odyssey-gray-light/60">
                <Image
                  src={course.heroImage}
                  alt={course.title}
                  width={480}
                  height={256}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {course.title}
              </h2>
              <p className="mt-2 text-sm text-odyssey-gray">{course.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                <span>{course.level}</span>
                <span>{course.estimatedTime}</span>
              </div>
              <Link
                href={`/courses/${course.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-odyssey-orange"
              >
                Start course -&gt;
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChooseCoursePage;
