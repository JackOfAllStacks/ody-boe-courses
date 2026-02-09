"use client";

import { useState } from "react";
import type { QuizBlock as QuizBlockType } from "@/lib/courses";

const QuizBlock = ({ block }: { block: QuizBlockType }) => {
  const [responses, setResponses] = useState<Record<number, string>>({});

  return (
    <section className="rounded-card border border-odyssey-gray-light/60 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
        Quiz
      </p>
      <h2 className="mt-2 font-display text-2xl text-foreground">
        {block.title}
      </h2>
      <div className="mt-6 space-y-6">
        {block.questions.map((question, index) => {
          const selected = responses[index];
          const isCorrect = selected === question.answer;

          return (
            <div
              key={`${block.id}-${index}`}
              className="rounded-2xl border border-odyssey-gray-light/60 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.options.map((option) => {
                  const isSelected = selected === option;
                  const optionIsCorrect = option === question.answer;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setResponses((prev) => ({
                          ...prev,
                          [index]: option,
                        }))
                      }
                      className={`rounded-pill border px-4 py-2 text-left text-sm transition ${
                        isSelected
                          ? optionIsCorrect
                            ? "border-odyssey-orange bg-odyssey-orange/10 text-foreground"
                            : "border-red-400 bg-red-50 text-red-600"
                          : "border-odyssey-gray-light text-odyssey-gray hover:border-odyssey-orange"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {selected ? (
                <p
                  className={`mt-3 text-sm ${
                    isCorrect ? "text-odyssey-orange" : "text-red-500"
                  }`}
                >
                  {isCorrect
                    ? "Correct."
                    : `Not quite. ${question.explanation || "Try again."}`}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuizBlock;
