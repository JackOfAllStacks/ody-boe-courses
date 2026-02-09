# AGENTS.md

## Project goal
Build a Next.js + React MVP for "Odyssey Multi-Modal Course Generator" that visually and behaviorally emulates the Oboe experience using local, canned content. The wow factor is the smooth, multi-modal course player (study guide, quizzes, flashcards, final exam, podcast/audio page) and a prompt -> loading -> generated course flow. No real backend, no auth, no subscriptions.

## Non-goals
- No real AI calls or external APIs.
- No login, billing, or account management.
- No audio generation (audio UI only, planned for later).

## Visual direction
- Bold, high-contrast design.
- 3-tone palette: white, orange, mid-gray.
- Smooth motion and transitions. Prioritize polish over completeness.
- Use placeholder images everywhere for now.

## Tech stack
- Next.js (App Router) + React.
- Tailwind CSS.
- Local content only (static data and Markdown files).

## UX requirements (must show in demo)
- Landing page with prompt box and "See some of Odyssey's offered courses" list.
- Loading animation and/or progressive text-fill when "generating" a course.
- Course page with left outline sidebar + active lesson view.
- Interactive elements:
  - Flashcards (flip or step-through).
  - Quizzes (multiple choice with feedback).
  - Study guide page.
  - Final exam page.
  - Podcast page with audio player UI (static).

## Content system (Markdown-driven courses)
Courses are stored as Markdown in a local directory and rendered into the UI. The format is intentionally simple and formulaic so a custom GPT can generate new courses on demand.

### Location
- Store course files under `content/courses/`.
- One file per course: `content/courses/<slug>.md`.

### Markdown format spec
Each course file uses YAML frontmatter plus section blocks. Keep it deterministic and minimal.

Frontmatter:
```
---
slug: mastering-first-grade-geometry
title: Mastering First Grade Geometry and Spatial Reasoning
level: beginner
estimated_time: 2-3 hours
hero_image: /placeholders/geometry-hero.png
summary: Short 1-2 sentence course summary.
learning_outcomes:
  - Outcome 1
  - Outcome 2
  - Outcome 3
chapters:
  - id: ch-1
    title: Foundations of Shapes
  - id: ch-2
    title: Spatial Reasoning Basics
  - id: ch-3
    title: Patterns and Transformations
---
```

Body sections use fenced blocks with a `type` header. The order of blocks is the course flow. Keep `id` values unique.

Block templates:

1) Lesson (text)
```
:::lesson
id: lesson-1
chapter: ch-1
title: What is a Shape?
summary: 1-2 sentences.
---
Main lesson text in Markdown.
:::
```

2) Study guide
```
:::study_guide
id: study-1
chapter: ch-1
title: Study Guide: Shapes
---
- Bullet key point 1
- Bullet key point 2
- Bullet key point 3
:::
```

3) Quiz (multiple choice)
```
:::quiz
id: quiz-1
chapter: ch-1
title: Quick Check: Shapes
questions:
  - prompt: Which shape has three sides?
    options:
      - Square
      - Triangle
      - Circle
    answer: Triangle
    explanation: A triangle has three sides.
  - prompt: How many corners does a square have?
    options:
      - 3
      - 4
      - 5
    answer: 4
    explanation: A square has four corners.
:::
```

4) Flashcards
```
:::flashcards
id: cards-1
chapter: ch-2
title: Spatial Reasoning Flashcards
cards:
  - front: What does "left" mean?
    back: The direction opposite of right.
  - front: What is a rotation?
    back: Turning a shape around a center point.
:::
```

5) Final exam
```
:::final_exam
id: final-1
title: Final Exam
questions:
  - prompt: A rectangle has ___ sides.
    options:
      - 2
      - 4
      - 6
    answer: 4
    explanation: A rectangle has four sides.
:::
```

6) Podcast (audio UI only)
```
:::podcast
id: podcast-1
title: The Future of Multi-Modal Learning
summary: 1-2 sentences about the episode.
audio_src: /audio/placeholder.mp3
length: 12:34
:::
```

### Rendering requirements
- Sidebar uses `chapters` from frontmatter and highlights the active block.
- Blocks are rendered by type with matching UI components.
- Provide basic animation when blocks mount or when stepping through quizzes/flashcards.

## LLM system prompt for course generation
Canonical local-dev prompt now lives at `skills/course-authoring/templates/system-prompt.md`.
Use that file for new course generation. The embedded prompt below is a fallback reference.

```
You are generating a single course Markdown file for the "Odyssey Multi-Modal Course Generator" MVP.

Output ONLY valid Markdown in the exact format specified below. Do not include commentary or extra text.

Required format:
- YAML frontmatter with: slug, title, level, estimated_time, hero_image, summary, learning_outcomes (list), chapters (list of id/title).
- Body blocks using :::lesson, :::study_guide, :::quiz, :::flashcards, :::final_exam, :::podcast.
- Every block must include id, title, and chapter (except final_exam and podcast which do not require chapter).
- Use 6-10 chapters and 16-30 total blocks.
- At least: 6 lessons, 2 study_guides, 4 quizzes, 1 flashcards, 1 final_exam, 1 podcast.
- Keep each lesson body detailed (target 300-700 words).
- Keep language concise and friendly. Avoid advanced jargon unless requested.
- Use ASCII only. No special unicode characters.

Example structure (replace content):
---
slug: example-course
title: Example Course Title
level: beginner
estimated_time: 2-3 hours
hero_image: /placeholders/example.png
summary: Short summary.
learning_outcomes:
  - Outcome 1
  - Outcome 2
  - Outcome 3
chapters:
  - id: ch-1
    title: Chapter One Title
  - id: ch-2
    title: Chapter Two Title
---

:::lesson
id: lesson-1
chapter: ch-1
title: Lesson Title
summary: 1-2 sentences.
---
Lesson body text.
:::

(Continue with other blocks...)
```

## Repo roadmap (fast MVP)
1) Scaffold Next.js app with Tailwind and theme tokens.
2) Build core pages: landing, loading, course player.
3) Implement Markdown loader and block renderer.
4) Add interactive components: quiz, flashcards, study guide, final exam, podcast UI.
5) Polish transitions and animations.

## Notes
- Example Resources are read-only reference material.
- Do not copy content verbatim; create new placeholder content.
