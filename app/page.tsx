import Image from "next/image";
import Link from "next/link";
import LandingPromptClient from "@/components/prompt/LandingPromptClient";
import { getVisibleCourseCatalog } from "@/lib/courses";

export default function Home() {
  const courseCatalog = getVisibleCourseCatalog();

  return (
    <div className="min-h-screen bg-[#f8f4ef]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
          Odyssey
        </div>
        <div className="rounded-pill border border-odyssey-gray-light bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-odyssey-gray">
          Multi-Modal Course Generator
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-odyssey-gray-light bg-white">
            <Image
              src="/odyssey-boat.png"
              alt="Odyssey"
              width={72}
              height={72}
              className="h-18 w-18 object-contain"
            />
          </div>
          <h1 className="mt-6 font-display text-2xl text-foreground sm:text-3xl">
            Learn about <span className="italic">anything</span>.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-odyssey-gray">
            Instantly generate textbooks, study guides, podcasts, quizzes, and
            more from a single prompt.
          </p>
          <LandingPromptClient />
        </section>

        <section className="mt-16">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
              Other users recently made these courses
            </p>
            <div className="text-2xl text-odyssey-gray">↓</div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courseCatalog.map((course) => (
              <article
                key={course.slug}
                className="group rounded-card border border-odyssey-gray-light/60 bg-white p-5 shadow-[0_20px_50px_rgba(17,17,17,0.08)] transition hover:-translate-y-1"
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
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-odyssey-gray">{course.summary}</p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                  <span>{course.level}</span>
                  <span>{course.estimatedTime}</span>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-odyssey-orange"
                >
                  View Course -&gt;
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
