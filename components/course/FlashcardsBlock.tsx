"use client";

import { useState } from "react";
import type { FlashcardsBlock as FlashcardsBlockType } from "@/lib/courses";

const FlashcardsBlock = ({ block }: { block: FlashcardsBlockType }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = block.cards[index];

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % block.cards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) =>
      prev === 0 ? block.cards.length - 1 : prev - 1
    );
  };

  return (
    <section className="rounded-card border border-odyssey-gray-light/60 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
        Flashcards
      </p>
      <h2 className="mt-2 font-display text-2xl text-foreground">
        {block.title}
      </h2>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className="flex min-h-[180px] w-full items-center justify-center rounded-3xl border border-odyssey-orange/40 bg-[linear-gradient(135deg,#fff5ec_0%,#ffffff_100%)] p-6 text-center text-lg font-semibold text-foreground shadow-[0_20px_50px_rgba(242,107,29,0.12)]"
        >
          {flipped ? card.back : card.front}
        </button>
        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-odyssey-gray">
          <button
            type="button"
            onClick={prevCard}
            className="rounded-pill border border-odyssey-gray-light px-4 py-2"
          >
            Prev
          </button>
          <span>
            Card {index + 1} of {block.cards.length}
          </span>
          <button
            type="button"
            onClick={nextCard}
            className="rounded-pill border border-odyssey-gray-light px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashcardsBlock;
