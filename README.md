# Odyssey Multi-Modal Course Generator

![Odyssey landing page](public/readme-landing-page.png)

**Version:** v0.2.0

**Live demo:** https://ody-boe-courses.onrender.com/

A fast, polished MVP of the Odyssey AI-assisted multi-modal education course generator. Inspired by oboe.com.

## Project status
This repo is an MVP focused on UX, layout, and course structure. AI generation is not implemented yet. The current flow uses local Markdown files as the course source of truth.

## Features
- Prompt-to-course flow with loading animation
- Course player with outline sidebar
- Interactive course blocks:
  - Quizzes (multiple choice)
  - Flashcards
  - Study guides
  - Final exam
  - Audio podcast card (UI only, no audio generation)
- Markdown-driven courses with YAML frontmatter

## Local development
```bash
npm install
npm run dev
```

## Content system (Markdown)
Courses live in `content/courses/*.md` and are rendered at runtime. Each file includes:
- YAML frontmatter for course metadata and chapters
- Block sections for lessons, quizzes, flashcards, study guides, final exams, and podcast UI

See examples in `content/courses/`.

## Authoring with an external AI
A system prompt template for generating new Markdown courses lives in `AGENTS.md`. Use it with your preferred external LLM to produce valid course files, then drop them into `content/courses/`.

## Deployment
Deploy as a web service (not a static export):
- Build: `npm run build`
- Start: `npm run start`

## Work log
See `work-done.md`.
