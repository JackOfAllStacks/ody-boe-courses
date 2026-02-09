"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { courseCatalog } from "@/lib/courseCatalog";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const examplePrompts = useMemo(
    () => [
      "Designing a bedtime routine for kids",
      "Bite-sized quantum mechanics",
      "Product strategy for a new app idea",
    ],
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetSlug = courseCatalog[0]?.slug || "mastering-first-grade-geometry";
    const topic = prompt.trim() || "Multi-modal learning";
    router.push(
      `/generate?topic=${encodeURIComponent(topic)}&slug=${targetSlug}`
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-sm uppercase tracking-[0.3em] text-odyssey-gray">
          Odyssey
        </div>
        <div className="rounded-pill border border-odyssey-gray-light bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-odyssey-gray">
          Multi-Modal Course Generator
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-odyssey-orange">
              Fast MVP Demo
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Build a multi-modal course in minutes, not months.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-odyssey-gray">
              Odyssey transforms a simple prompt into study guides, quizzes,
              flashcards, and audio-first learning moments. This MVP focuses on
              clarity, momentum, and a polished learning flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {examplePrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrompt(item)}
                  className="rounded-pill border border-odyssey-gray-light bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-odyssey-gray transition hover:border-odyssey-orange"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-odyssey-orange/40 bg-white p-6 shadow-[0_30px_70px_rgba(242,107,29,0.18)]">
            <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
              Generate Course
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="text-sm font-semibold text-foreground">
                What do you want to learn?
              </label>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Try: Intro to design systems for startups"
                rows={4}
                className="w-full rounded-2xl border border-odyssey-gray-light bg-odyssey-gray-light/30 px-4 py-3 text-sm text-foreground outline-none transition focus:border-odyssey-orange"
              />
              <button
                type="submit"
                className="w-full rounded-pill bg-odyssey-orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(242,107,29,0.3)]"
              >
                Generate Course
              </button>
            </form>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-foreground">
              See some of Odyssey's offered courses below
            </h2>
            <div className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
              Curated MVP Set
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courseCatalog.map((course) => (
              <article
                key={course.slug}
                className="group rounded-card border border-odyssey-gray-light/60 bg-white p-5 shadow-[0_20px_50px_rgba(17,17,17,0.08)] transition hover:-translate-y-1"
              >
                <div className="h-32 overflow-hidden rounded-2xl bg-odyssey-gray-light/60">
                  <img
                    src={course.heroImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-odyssey-gray">
                  {course.summary}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                  <span>{course.level}</span>
                  <span>{course.estimatedTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/courses/${course.slug}`)}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-odyssey-orange"
                >
                  View Course -&gt;
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
