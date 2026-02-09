<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [https://oboe.com/](https://oboe.com/)

I need you to do go to oboe.com and create extensive research documentation for what the site is and what it does.
Create a spec sheet and feature list of the site to create an extensive understanding of what it is, how it works, technical implementation etc. so that I can pass the docs to an engineer to create a clone.

Below is a reverse‑engineered product/technical spec for Oboe at oboe.com based on all available public information. Because direct scraping of oboe.com is blocked from this environment, everything here is synthesized from third‑party write‑ups, founder posts, and investor materials; where implementation details are not public, the spec calls them out explicitly as design assumptions for your clone, not claims about Oboe’s internal stack.[^1][^2][^3][^4][^5][^6]

***

## 1. Product Overview

**Product name:** Oboe
**Domain:** oboe.com (new product; earlier branding also used oboe.fyi)[^4][^6]
**Category:** AI‑powered learning platform (generalized)
**Core value prop:**

- Users can generate **personalized, multimodal courses on any topic** from a simple prompt or title.[^2][^3][^5][^4]
- Courses are delivered in a mix of **text, audio, quizzes, games, flashcards, and slide‑like visuals**.[^5][^6][^2]
- Platform emphasizes **speed, low friction, and fun**, with a guided path instead of open‑ended content search.[^3][^2][^5]

**High‑level experience:**

1. User types a topic or short prompt (“AI fundamentals”, “Brazilian tax law”, “how mortgages work”, “ordering wine in France”).[^6][^4][^5]
2. Oboe generates a **structured, chaptered course** with multiple lesson types (articles, audio, games, quizzes, flashcards).[^2][^5][^6]
3. User consumes content in a **lightweight, narrative‑style interface** geared for curiosity‑driven, self‑paced learning.[^3][^5][^2]
4. System **recommends follow‑on topics** and tracks progress; over time it learns user interests and adapts.[^5][^6][^3]
5. Content is passed through **multi‑agent fact‑checking pipelines** to reduce hallucinations.[^6][^3][^5]

**Founding context:**

- Built by co‑founders of podcasting platform **Anchor**, acquired by Spotify; they bring strong product and narrative design experience.[^7][^4][^6]
- Backed by a16z; Series A announcement explicitly calls out **“the all‑new Oboe – now available at oboe.com”** and positions it as a generalized AI learning engine.[^6]

***

## 2. User Roles \& Personas

**Primary roles:**

1. **Learner (end user)**
    - Creates or discovers courses.
    - Consumes content in multiple formats.
    - Tracks progress and possibly bookmarks/favorites.
2. **(Implicit) Creator**
    - In the current product, creation is mostly **AI‑driven from a prompt**. At launch there is **no full manual editing** of structure; that’s on the roadmap.[^3][^5]
    - For a clone, you can later separate “consumer” vs “power creator” once editing tools exist.
3. **Platform Admin**
    - Manages abuse reports, content takedowns, and system configuration.
    - Manages subscription plans and usage limits.

***

## 3. Functional Feature List (Observed vs Proposed)

### 3.1 Core Observed Features (from public sources)

1. **Prompt‑based course generation**
    - Input: course title or short natural‑language prompt.[^4][^2][^5][^3]
    - Output: a **multi‑chapter course** with mixed lesson types and learning paths.[^2][^5][^6]
    - Internally uses LLMs to:
        - Scope the topic.
        - Design an outline (chapters/sections).
        - Generate specific lesson content and activity items.
2. **Multi‑format content types**

Confirmed types include:[^1][^5][^2][^3][^6]
    - **Deep‑dive lessons / articles** (long‑form text).
    - **Narrated audio lectures** (AI‑generated voice).
    - **“AI podcasts” / informal audio segments**.
    - **Visual slides** (slide‑like or card‑like visual summaries).
    - **Quizzes** (multiple‑choice / short‑answer; format unspecified but interactive).
    - **Games** – specifically:
        - “**Word Quest**”, described as akin to a constrained Wordle‑style word game.[^2]
    - **Flashcards** (mentioned by a16z; used for spaced review).[^6]
3. **Personalization \& recommendations**
    - Personalized course suggestions based on:
        - Past courses created/consumed.
        - Declared interests inferred from prompts.[^5][^3][^6]
    - Over time, platform “gets better at teaching you” via adaptive recommendations and possibly difficulty adjustments.[^4][^6]
4. **General AI fact‑checking / multi‑agent validation**
    - The system uses **agents that audit and correct the output of other agents** to reduce hallucinations.[^3][^5][^6]
    - Fact‑checking is a key differentiator, repeatedly highlighted in founder replies and reviews.[^5][^3]
5. **Public library / discovery layer**
    - Public library of courses that can be browsed by other users.[^1][^3]
    - Lightweight, “clean” course layout and browsing UI with recommendation‑driven discovery.[^3][^5]
6. **Pricing \& plans**
    - **Free tier:** up to **5 courses** per month.[^1][^2][^3]
    - **Paid tiers:** plans that allow **30** and **100** course creations per month (exact pricing amounts vary by source / may change).[^1][^2]
    - Emphasis is on **course creation count**, not just consumption; free tier is pitched for experimentation.[^5][^3]
7. **Language \& editing limitations (current)**
    - At launch:
        - **No full editing** of generated structure/content (structure editing is explicitly “on the roadmap”).[^3][^5]
        - **English‑only** content support initially; broader language support planned.[^5][^3]

***

### 3.2 Proposed Features for a Clone (Design Assumptions)

These are **not confirmed** Oboe features but are logical requirements if you want a practical clone:

1. **User accounts \& auth**
    - Email + password login, plus OAuth (Google/Apple).
    - Basic profile (name, avatar, short bio, time zone).
    - Email verification, password reset.
2. **Course home \& catalog**
    - Explore page (featured, trending, categories).
    - Search with semantic and keyword support.
    - Filters: topic tags, difficulty, duration, media type.
    - Course detail page with:
        - Description.
        - List of chapters \& lesson formats.
        - Estimated time-to-complete.
        - Progress indicator.
3. **Course progression \& tracking**
    - Track per‑user completion of lessons/chapters.
    - Persist quiz results and game performance.
    - Resume from last position.
4. **Social / sharing**
    - Shareable public URL for each course.
    - Basic engagement metrics: views, completions, likes.
5. **Content moderation \& safety**
    - Reporting flows for harmful or illegal content.
    - Automatic content scans for restricted topics (policy‑based heuristics).
6. **Analytics**
    - Basic per‑course analytics for the platform team:
        - Enrollment, completion rates, drop‑off by chapter.
        - Engagement by content type (articles vs audio vs games).

***

## 4. User Flows \& UX Specs

### 4.1 Onboarding \& Signup

1. **Landing Page**
    - Hero copy: AI‑powered learning, “world’s first generalized AI‑powered learning platform”, etc.[^4][^6][^5]
    - Short explanation with examples of prompts and course screenshots.
    - “Start for free” CTA.
2. **Signup / Login**
    - Minimal friction (1–2 steps max).
    - Route immediately into **“Create your first course”** or **“Browse library”**.
3. **First‑time course creation wizard**
    - Step 1: Ask “What do you want to learn?” with input placeholder examples.
    - Step 2: Optional sliders / toggles (depth, tone, time per day) – proposed for clone.
    - Once submitted, show **loading state** while LLM builds outline (10–30s target).

### 4.2 Course Creation Flow (Prompt‑driven)

**Input:**

- Required:
    - Title or short free‑text prompt.
- Optional (nice to have in clone):
    - Target level (beginner / intermediate / advanced).
    - Purpose (exam prep / practical skills / curiosity).
    - Preferred format emphasis (text‑heavy, more audio, more games/quizzes).

**Backend process (clone design):**

1. **Outline generation**
    - LLM prompt that produces:
        - Course goals and learning outcomes.
        - Chapters (3–10).
        - Lessons inside each chapter, with lesson type suggestions.
2. **Lesson generation**
    - For each lesson:
        - Generate:
            - Article content (text).
            - Quiz questions \& answers.
            - Game configuration (e.g., Word Quest word list \& hints).
            - Flashcards (Q/A pairs).
            - Audio script text.
3. **Fact‑checking agents**
    - Secondary agents evaluate:
        - Factual claims.
        - Ambiguous or outdated statements.
        - Unsupported numbers.
    - Agents either:
        - Approve content.
        - Suggest corrections which are applied and re‑checked.[^6][^3][^5]
4. **Multimodal realization**
    - Convert audio script to speech (TTS).
    - Generate any visuals or slide summaries.
5. **Persist course**
    - Save course + metadata + generated assets.
    - Mark status = “Ready” and expose to user library; optionally to public library if user consent given.

**Output UI:**

- Show a **course outline page**:
    - Chapter list.
    - Lesson types labeled (e.g., Article, Quiz, Word Quest, Audio).
    - “Start course” button.


### 4.3 Course Consumption Flow

1. **Course player layout**
    - Left: navigation (chapters + lessons).
    - Center: active content (article text / game / quiz / audio).
    - Right/top: progress, key takeaways, maybe glossary.
2. **Lesson types (UX behaviors):**
    - **Article / deep dive:**
        - Scrollable, formatted text (headings, bullets, examples).
        - Progress automatically when user reaches end.
    - **Audio lecture / AI podcast:**
        - Embedded audio player (play, pause, 1.25x/1.5x).
        - Optional transcript.
    - **Quiz:**
        - Multiple choice and possibly short‑answer.
        - Immediate feedback per question.
        - Show explanations and references.
    - **Word Quest (game):**
        - Daily or per‑course vocab game.
        - Narrow Wordle‑like puzzle around course vocabulary (target words + hints).[^2]
    - **Flashcards:**
        - Flip cards with spaced repetition scheduling (for clone).
3. **Progress \& state**
    - Persistent progress per lesson.
    - Ability to **resume where you left off**.
    - Simple completion metrics (“X of Y lessons complete”).

***

## 5. Information Architecture \& Data Model (Clone Design)

Below is a suggested relational model (e.g., Postgres). Names and fields are for a clone, not confirmed Oboe schema.

### 5.1 Core Entities

- **User**
    - id, email, password_hash or OAuth ID
    - name, avatar_url
    - plan_id, plan_limits (max_courses_per_month, etc.)
    - created_at, last_login_at
- **Course**
    - id, owner_user_id (creator)
    - title, description, topic_tags[]
    - target_level, estimated_duration_minutes
    - visibility (public/unlisted/private)
    - status (draft/generating/ready)
    - language (currently “en”)
    - created_at, updated_at
- **Chapter**
    - id, course_id
    - title, ordering_index
    - summary
- **Lesson**
    - id, chapter_id
    - title
    - lesson_type (article, quiz, game_wordquest, audio, flashcards, slides)
    - body_richtext (for articles)
    - metadata JSON (e.g., for game configs, quiz settings)
- **QuizQuestion**
    - id, lesson_id
    - question_text
    - choices JSON
    - correct_choice_index
    - explanation
- **GameWordQuest**
    - id, lesson_id
    - target_word
    - hint
    - allowed_attempts
- **Flashcard**
    - id, lesson_id
    - front_text
    - back_text
- **AudioAsset**
    - id, lesson_id
    - transcript_text
    - audio_url
    - duration_seconds
- **UserCourseProgress**
    - id, user_id, course_id
    - current_lesson_id
    - completion_percentage
    - started_at, completed_at
- **UserLessonState**
    - id, user_id, lesson_id
    - status (not_started, in_progress, completed)
    - last_interaction_at
    - quiz_score, attempts, etc.
- **Subscription / Plan**
    - id, name
    - max_courses_per_month
    - price_monthly
    - features JSON
- **UserUsage**
    - id, user_id, month, year
    - courses_created_count
    - tokens_used (for AI billing)

***

## 6. System Architecture (Clone Design)

Since oboe.com’s stack is not public, this is a **reference implementation** you can hand to engineers.

### 6.1 High‑Level Components

1. **Web Frontend**
    - SPA/SSR app (e.g., **Next.js + React**).
    - Responsibilities:
        - Landing marketing pages.
        - Auth UI.
        - Course creation wizard.
        - Course library \& search.
        - Course player (multi‑format).
    - Integration with:
        - Backend REST/GraphQL.
        - TTS audio streaming URLs.
        - Analytics.
2. **API Backend**
    - Candidate: **Node.js (TypeScript) / NestJS** or **Python (FastAPI)**.
    - Responsibilities:
        - Auth (JWT or session).
        - CRUD for courses, chapters, lessons, user progress.
        - Orchestration of AI workflows:
            - Outline generation.
            - Lesson generation.
            - Fact‑checking.
            - TTS audio generation.
        - Plan enforcement \& metering.
3. **AI Orchestration Layer**
    - Could be a dedicated service or part of backend.
    - Steps:
        - Normalizes user prompt and metadata.
        - Calls LLM to generate outline.
        - Fan‑out tasks to generate per‑lesson content.
        - Runs verification/fact‑checking agents.
        - Coordinates retries and model fallbacks.
    - Integrations:
        - LLM provider (OpenAI, Anthropic, etc.).
        - Vector DB (optional, if later adding retrieval from web or documents).
        - Internal knowledge base (if you seed trusted references).
4. **Fact‑Checking / Agent System**
    - Multiple LLM calls with different system prompts:
        - “Teacher” agent: generates explanation and content.
        - “Reviewer” agent: checks correctness, identifies likely hallucinations, flags contradictions.[^6][^3][^5]
        - “Editor” agent: rewrites flagged content using reviewer feedback.
    - Logging for debugging \& evaluation.
5. **Data Storage**
    - **Relational DB:** Postgres (users, courses, progress, subscriptions).
    - **Object Storage:** S3 or equivalent for audio files and possibly images.
    - **Cache:** Redis for session caching and hot course content.
6. **Billing \& Subscriptions**
    - Use Stripe/Braintree for:
        - Free tier (5 courses/month).
        - Paid tiers (30 and 100 courses/month).[^1][^2][^3]
    - Rate‑limit course creation based on plan + month.
7. **Observability**
    - Logging (structured, JSON).
    - Metrics: course creation times, AI token use, error rates.
    - A/B testing and feature flags (for experimentation on generation prompts, fact‑checking strategies).

***

## 7. AI/ML Details (Clone Design)

Again, this is a **design to replicate behavior**, not an internal leak.

### 7.1 Models \& Providers

- Use a capable general‑purpose LLM (e.g., GPT‑4‑class) with strong reasoning.
- Optional specialized models:
    - Smaller model for quick classification (topic categories, difficulty prediction).
    - TTS model for natural, friendly audio.


### 7.2 Prompting Strategy (Outline)

1. **Course outline prompt**
    - Input: user prompt, target audience, duration, style.
    - Output: JSON structure with:
        - Overview.
        - Learning objectives.
        - Chapters and lessons with types and brief descriptions.
2. **Lesson content prompts**
    - For each planned lesson:
        - Prompt for article text.
        - Prompt for quiz questions (with difficulty \& answers).
        - Prompt for flashcards.
        - Prompt for game data (word list, hints) where applicable.
        - Prompt for audio script.
3. **Fact‑checking prompts**
    - Reviewer agent is instructed to:
        - Highlight incorrect or unsupported claims.
        - Suggest corrections with citations where possible.
        - Mark content as safe/unsafe by risk category.
4. **Editing prompts**
    - Editor agent merges original + reviewer suggestions into final text.

### 7.3 Personalization Logic

- Basic v1:
    - Track topics and tags of courses user interacts with.
    - Use collaborative signals (other users who liked these courses also liked…).
    - Adjust recommended next courses based on:
        - Completion history.
        - Self‑declared interests or goals if you collect them.
- Advanced (later):
    - Difficulty adaptation:
        - Use quiz outcomes to infer mastery; present more advanced or remedial content.
    - Format preferences:
        - Learn whether user tends to engage more with text vs audio vs games and adjust lesson mix.

***

## 8. Non‑Functional Requirements

1. **Performance**
    - Course generation should feel “fast enough”:
        - Target < 30 seconds end‑to‑end for a full course.
        - Show partial outline early, then progressively fill in lessons (“skeleton loading”).
2. **Scalability**
    - Designed to handle:
        - Large concurrent generation jobs.
        - Spiky usage (e.g., press events like Product Hunt launches).[^5][^6]
3. **Reliability**
    - Retries for LLM/API failures.
    - Circuit breakers around TTS and fact‑checker services.
4. **Security \& Privacy**
    - Encrypt sensitive data at rest.
    - PII boundaries: treat prompts and generated content as user data.
    - Clear privacy policy; allow users to delete their account and associated courses.
5. **Compliance**
    - Age gating if you allow minors (in education context, you may need COPPA/GDPR‑K compliance depending on geos).

***

## 9. Gaps \& Open Questions

Because oboe.com itself is not directly accessible from this environment, the following details remain unknown and must be decided in your clone design:

- Exact UI layout \& design system (colors, typography, animations).
- Actual technology stack and frameworks used by Oboe.
- Exact shape of recommendation algorithms.
- Detailed statistics tracking and dashboards.
- Whether there is any notion of “follower” social graph or comments on courses.
- Whether there is currently collaborative editing or co‑creation flows.

***

## 10. Deliverable Summary for Your Engineer

To create a credible Oboe‑style clone, your engineering brief should cover:

1. **Scope:**
    - Prompt‑based generalized course generation with:
        - Chapters and lessons.
        - Mixed content types (article, quiz, flashcards, Word Quest‑style vocab game, AI‑voice audio).
    - Free tier + two paid tiers (course creation limits).
    - Public course library + personal dashboard.
2. **Core modules to build:**
    - Auth \& user profiles.
    - Course model (Course → Chapters → Lessons → Activities).
    - AI orchestration service (outline + per‑lesson generation).
    - Multi‑agent fact‑checking pipeline.
    - Course player UI for text, audio, quizzes, games, flashcards.
    - Subscriptions \& metering.
    - Analytics \& basic moderation.
3. **Technical choices (recommended baseline):**
    - Frontend: Next.js (React), TypeScript.
    - Backend: Node.js (NestJS) or Python (FastAPI) with REST/GraphQL.
    - DB: Postgres, Redis cache, S3‑compatible object storage.
    - AI: GPT‑4‑class LLM; external TTS provider.
    - Billing: Stripe.
4. **MVP order:**
    - v0: Prompt → outline → text‑only course (articles + simple quizzes).
    - v1: Add audio generation + flashcards.
    - v2: Add Word Quest‑style game + fact‑checking agents.
    - v3: Add personalization, public discovery, and richer analytics.

If you’d like, a next step can be a more formal, engineer‑ready technical design document (with API endpoints, DB schema DDL, and example LLM prompts) tailored to your preferred stack.
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.automateed.com/oboe-review

[^2]: https://www.techradar.com/ai-platforms-assistants/gemini/oboe-just-launched-its-an-ai-powered-platform-that-helps-you-learn-anything

[^3]: https://completeaitraining.com/ai-tools/oboe/

[^4]: https://www.linkedin.com/posts/nir-zicherman-172a461a_introducing-oboe-the-worlds-first-ai-powered-activity-7371545257311707136-a5SN

[^5]: https://www.producthunt.com/products/oboe-2

[^6]: https://a16z.com/announcement/investing-in-oboe/

[^7]: https://techcrunch.com/2025/09/10/after-selling-to-spotify-anchors-co-founders-are-back-with-oboe-an-ai-powered-app-for-learning/

[^8]: https://en.wikipedia.org/wiki/Oboe

[^9]: https://www.ombea.com

[^10]: https://www.bajajfinserv.in/different-types-of-oboes-and-their-uses

[^11]: https://www.oboeapp.com

[^12]: https://foxproducts.com/oboe-model-features/

[^13]: https://x.com/oboelabs?lang=en

[^14]: https://www.yamaha.com/en/musical_instrument_guide/oboe/selection/selection002.html

[^15]: https://x.com/oboelabs

[^16]: https://www.linkedin.com/posts/nicolehepworth_ai-learning-edtech-activity-7373314791282708480-0VGL

[^17]: https://moge.ai/product/oboe

[^18]: https://www.oboeapp.com/pricing

[^19]: https://www.linkedin.com/company/oboelabs

[^20]: https://newsletter.oboe.com

[^21]: https://online-oboe.com

