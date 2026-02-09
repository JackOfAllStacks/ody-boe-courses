"use client";

import { useMemo, useState } from "react";
import type { FinalExamBlock as FinalExamBlockType } from "@/lib/courses";

const FinalExamBlock = ({ block }: { block: FinalExamBlockType }) => {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return block.questions.reduce((total, question, index) => {
      if (responses[index] === question.answer) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [block.questions, responses]);

  const percentage = block.questions.length
    ? Math.round((score / block.questions.length) * 100)
    : 0;

  return (
    <section className="rounded-card border border-odyssey-orange/50 bg-[linear-gradient(135deg,#ffffff_0%,#fff0e4_100%)] p-6 shadow-[0_20px_50px_rgba(242,107,29,0.12)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-orange">
        Final Exam
      </p>
      <h2 className="mt-2 font-display text-2xl text-foreground">
        {block.title}
      </h2>
      {!block.questions.length ? (
        <p className="mt-4 rounded-2xl border border-odyssey-orange/40 bg-white/80 px-4 py-3 text-sm text-odyssey-gray">
          This final exam has no valid questions yet.
        </p>
      ) : null}
      <div className="mt-6 space-y-6">
        {block.questions.map((question, index) => {
          const selected = responses[index];
          const isCorrect = selected === question.answer;

          return (
            <div
              key={`${block.id}-${index}`}
              className="rounded-2xl border border-odyssey-orange/40 bg-white/80 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === option;

                  return (
                    <button
                      key={`${block.id}-${index}-${optionIndex}`}
                      type="button"
                      disabled={submitted}
                      onClick={() =>
                        setResponses((prev) => ({
                          ...prev,
                          [index]: option,
                        }))
                      }
                      className={`rounded-pill border px-4 py-2 text-left text-sm transition ${
                        isSelected
                          ? "border-odyssey-orange bg-odyssey-orange/10 text-foreground"
                          : "border-odyssey-gray-light text-odyssey-gray hover:border-odyssey-orange"
                      } ${submitted ? "opacity-70" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted ? (
                <p
                  className={`mt-3 text-sm ${
                    isCorrect ? "text-odyssey-orange" : "text-red-500"
                  }`}
                >
                  {isCorrect
                    ? "Correct."
                    : `Answer: ${question.answer}. ${question.explanation || ""}`}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!block.questions.length}
          onClick={() => setSubmitted(true)}
          className="rounded-pill bg-odyssey-orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(242,107,29,0.3)]"
        >
          Submit Exam
        </button>
        {submitted ? (
          <div className="text-sm text-odyssey-gray">
            Score: {score} / {block.questions.length} ({percentage}%)
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FinalExamBlock;
