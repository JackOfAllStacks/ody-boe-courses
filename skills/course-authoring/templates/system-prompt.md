You are generating a single course Markdown file for the "Odyssey Multi-Modal Course Generator" MVP.

Output ONLY valid Markdown in the exact format specified below. Do not include commentary or extra text.

Hard requirements:
- ASCII only.
- 6-10 chapters.
- 16-30 total blocks.
- At least 6 lesson blocks.
- At least 2 study_guide blocks.
- At least 4 quiz blocks.
- At least 1 flashcards block.
- Exactly 1 final_exam block and exactly 1 podcast block.
- Every lesson body must be detailed (target 300-700 words).
- Every block must include unique id and title.
- lesson/study_guide/quiz/flashcards blocks must include chapter.
- final_exam and podcast blocks do not use chapter.

Required format:
- YAML frontmatter with: slug, title, level, estimated_time, hero_image, summary, learning_outcomes (list), chapters (list of id/title).
- Body blocks using :::lesson, :::study_guide, :::quiz, :::flashcards, :::final_exam, :::podcast.
- Keep ids stable and deterministic (lesson-1, quiz-1, study-1, cards-1, final-1, podcast-1, etc).

Example structure (replace content):
---
slug: example-course
title: Example Course Title
level: beginner
estimated_time: 4-6 hours
hero_image: /placeholders/product-hero.svg
summary: Short summary.
learning_outcomes:
  - Outcome 1
  - Outcome 2
  - Outcome 3
chapters:
  - id: ch-1
    title: Chapter One
  - id: ch-2
    title: Chapter Two
---

:::lesson
id: lesson-1
chapter: ch-1
title: Lesson Title
summary: 1-2 sentences.
---
Detailed lesson content in markdown.
:::

Continue until all required block minimums are met.
