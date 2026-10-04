# Eric Reyes — Development Journal

A minimal professional journal for Eric Reyes, built with Next.js App Router, TypeScript, Tailwind CSS, and local Markdown. Independent of the Misfit Sanctuary codebase.

## Run locally

Use Node.js 22 or newer (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run build
npm run typecheck
npm start
```

## Add a post

Create `content/posts/your-post-title.md`. Its filename becomes `/blog/your-post-title`.

```md
---
title: "A feature or problem you worked on"
description: "A short summary for the journal index."
author: "Eric Reyes"
date: "2026-10-10"
category: "Development"
draft: false
---

## The problem
Explain the context and what you needed to accomplish.

## My approach
Describe the alternatives, decisions, and implementation.

## Results and reflection
Explain what you verified and what you would improve.
```

Dates must be quoted YYYY-MM-DD strings. Posts sort newest first. `draft: true` excludes a post from pages and the sitemap. Publication is controlled by `draft`, not a scheduled date. Missing or invalid metadata fails the build. Markdown supports headings, links, images, tables, lists, and fenced code blocks; raw HTML is not executed. Put images in `public/images/`, reference `/images/filename.png`, and include descriptive alt text.

Adding a file automatically updates Home, Blog, the article route, and sitemap on the next build. No registry or database is required.

## Deployment

1. Push this directory as its own GitHub repository.
2. Import the repository into Vercel and choose the Next.js preset. Root directory is the repository root; use `npm run build`. No database or API keys are needed.
3. Set `SITE_URL` to the public production address if needed and redeploy. On Vercel, the production hostname is detected automatically when this is omitted.
4. Verify the post opens while logged out, then submit the direct `/blog/starting-my-capstone-journey` URL.

### Future custom domain

Add `dev.misfitsanctuary.art` in this project's Vercel Settings → Domains. At the DNS provider, add the exact record Vercel supplies for **dev**. Do not change the apex domain or existing Misfit Sanctuary records. Once Vercel verifies DNS and HTTPS, set `SITE_URL=https://dev.misfitsanctuary.art` and redeploy.

## Content and design

- Home, Blog, About, and GitHub navigation; active page indicators and a keyboard skip link.
- Responsive layouts with readable article typography and visible focus states.
- First post dated October 3, 2026, with the public author name Eric Reyes and a development-cycle visual.
- No tracking, external font requests, CMS, or runtime content API.
- `lib/site.ts` contains the author, GitHub profile, and URL configuration.
- Build-time Markdown only. Only publish trusted repository content.

The first entry follows the assignment's introduction exception: introduce yourself, your journey, and your goals before project work begins. Future posts should discuss a specific feature or problem and solution. Review personal wording before submitting to class.

## Interactive experience

The journal includes light/dark themes (saved locally in the browser), a moving hero with a pause control, an animated grid/orbit background with a separate pause control, hover feedback, journal search and category filters, reading progress, larger-text mode, copy-link feedback, and interactive development-cycle steps. All continuous and entrance animations respect the reader's reduced-motion setting. Public page text and author metadata use **Eric Reyes**.

## Fonts

Barlow Condensed (bold and bold italic), Space Grotesk, and IBM Plex Mono are served locally. Their SIL Open Font License files are included in `public/fonts/`.
