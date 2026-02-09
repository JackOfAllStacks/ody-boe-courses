import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoursePlayerClient from "@/components/course/CoursePlayerClient";
import { getCourseBySlug } from "@/lib/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const CoursePage = async ({ params }: CoursePageProps) => {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-odyssey-gray"
        >
          Odyssey
        </Link>
        <div className="rounded-pill border border-odyssey-gray-light bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-odyssey-gray">
          Course Player
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="rounded-card border border-odyssey-gray-light/60 bg-white p-8 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
                {course.meta.level} course
              </p>
              <h1 className="mt-4 font-display text-4xl text-foreground">
                {course.meta.title}
              </h1>
              <p className="mt-4 text-sm text-odyssey-gray">
                {course.meta.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-odyssey-gray">
                <span className="rounded-pill border border-odyssey-gray-light bg-odyssey-gray-light/40 px-3 py-1">
                  {course.meta.estimated_time}
                </span>
                <span className="rounded-pill border border-odyssey-gray-light bg-odyssey-gray-light/40 px-3 py-1">
                  Multi-modal
                </span>
                <span className="rounded-pill border border-odyssey-gray-light bg-odyssey-gray-light/40 px-3 py-1">
                  MVP build
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-odyssey-gray-light/60">
              {course.meta.hero_image ? (
                <Image
                  src={course.meta.hero_image}
                  alt={course.meta.title}
                  width={960}
                  height={640}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          </div>
          {course.meta.learning_outcomes ? (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
                Learning outcomes
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-odyssey-gray sm:grid-cols-2">
                {course.meta.learning_outcomes.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-odyssey-gray-light bg-white px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <CoursePlayerClient
          chapters={course.meta.chapters || []}
          blocks={course.blocks}
        />
      </main>
    </div>
  );
};

export default CoursePage;
