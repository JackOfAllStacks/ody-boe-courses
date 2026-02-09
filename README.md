# Odyssey Multi-Modal Course Generator

![Odyssey landing page](public/readme-landing-page-v2.9.png)

**Version:** v0.2.13

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

### Local authoring workflow
Use the repo skill at `skills/course-authoring/SKILL.md`.

1. Create a draft scaffold:
```bash
npm run course:new -- --slug your-course-slug --title "Your Course Title" --level beginner
```
2. Generate/paste course markdown into `content/courses/your-course-slug.md`.
3. Validate:
```bash
npm run course:validate -- your-course-slug
```
4. Publish that slug to production allowlist:
```bash
npm run course:publish -- your-course-slug
```

Production only serves allowlisted courses in `content/published-courses.json`.
Development mode still shows all local courses for fast iteration.

## Authoring with an external AI
A system prompt template for generating new Markdown courses lives in `skills/course-authoring/templates/system-prompt.md`.
Use it with your preferred external LLM to produce valid course files, then validate and publish with the commands above.

## Deployment
Deploy as a web service (not a static export):
- Build: `npm run build`
- Start: `npm run start`

## Work log
See `work-done.md`.

## Commit automation
- Run `npm run hooks:setup` once per clone to enable repo hooks.
- Every commit auto-bumps patch version by `0.0.1` and updates:
  - `lib/version.ts`
  - `README.md`
  - `package.json`
  - `package-lock.json`
- Generate concise branch summaries with `npm run summary:branch`.
- Bootstrap planned worktree branches with `npm run worktrees:setup`.
