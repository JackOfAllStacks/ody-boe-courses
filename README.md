# Odyssey Multi-Modal Course Generator (MVP)

A fast, polished MVP that emulates an Oboe-style learning experience using Next.js and markdown-driven content. The focus is on high-impact UI: prompt-to-course flow, interactive quizzes and flashcards, study guides, a final exam, and an audio-first podcast card.

## Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Markdown course files with YAML frontmatter

## What is included
- Landing page with prompt entry and curated course previews
- Loading/generation screen with staged progress
- Course player with outline sidebar and multi-modal blocks
- Interactive blocks: quizzes, flashcards, study guide, final exam, podcast UI
- Local markdown content and placeholder hero artwork

## Local development
```bash
npm install
npm run dev
```

## Content format
Courses live in `content/courses/*.md`. Each file includes frontmatter plus block sections. See the examples in `content/courses/`.

## Deployment
Deploy as a web service (not static export).
- Build: `npm run build`
- Start: `npm run start`

## Work log
See `work-done.md`.
