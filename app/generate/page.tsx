"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "Multi-modal learning";
  const slug =
    searchParams.get("slug") || "mastering-first-grade-geometry";

  const steps = useMemo(
    () => [
      "Gathering sources",
      "Drafting course outline",
      "Designing quizzes and flashcards",
      "Preparing audio moments",
      "Final polish and publish",
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 900);

    const timeout = setTimeout(() => {
      router.push(`/courses/${slug}`);
    }, 4800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, slug, steps.length]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 lg:flex-row">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
            Generating Course
          </p>
          <h1 className="mt-4 font-display text-4xl text-foreground">
            "{topic}"
          </h1>
          <p className="mt-4 text-sm text-odyssey-gray">
            Odyssey is building a multi-modal learning path. Hang tight while we
            assemble the study guide, interactive checks, and audio moments.
          </p>
          <div className="mt-8 space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                  index <= stepIndex
                    ? "border-odyssey-orange bg-odyssey-orange/10 text-foreground"
                    : "border-odyssey-gray-light bg-white text-odyssey-gray"
                }`}
              >
                <span>{step}</span>
                <span className="text-xs uppercase tracking-[0.2em]">
                  {index <= stepIndex ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-md rounded-card border border-odyssey-gray-light/60 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
            Live Draft
          </p>
          <div className="mt-4 space-y-4">
            {["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"].map(
              (item, index) => (
                <div key={item}>
                  <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                    <span>{item}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-odyssey-gray">
                      {index <= stepIndex ? "Ready" : "Drafting"}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-pill bg-odyssey-gray-light/60">
                    <div
                      className="h-full rounded-pill bg-odyssey-orange"
                      style={{ width: `${30 + index * 15}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
