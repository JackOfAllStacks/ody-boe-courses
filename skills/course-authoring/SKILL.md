# Course Authoring Skill

## Purpose
Create, validate, and publish Markdown courses locally while keeping production locked to an explicit allowlist.

## Local workflow
1. Create draft scaffold:
```bash
npm run course:new -- --slug your-course-slug --title "Your Course Title" --level beginner
```
2. Generate course content with your local LLM using:
- `skills/course-authoring/templates/system-prompt.md`
3. Paste generated markdown into:
- `content/courses/your-course-slug.md`
4. Validate quality and schema:
```bash
npm run course:validate -- your-course-slug
```
5. Publish to production allowlist:
```bash
npm run course:publish -- your-course-slug
```

## Authoring guardrails
- Keep ASCII only.
- Keep 6-10 chapters.
- Keep 16-30 blocks.
- Include all required block types and minimum counts.
- Keep lesson depth substantive (long-form body text, not short blurbs).
- Keep IDs unique and deterministic.

## Files used
- Template scaffold: `skills/course-authoring/templates/course-template.md`
- System prompt template: `skills/course-authoring/templates/system-prompt.md`
- Course drafts: `content/courses/*.md`
- Published allowlist: `content/published-courses.json`
