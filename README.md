# Aditi Kumari, portfolio

Personal portfolio site for Aditi Kumari, a full-stack developer. It is a single page with
About, Skills, Projects, Experience and education, and Contact sections, plus a resume download.
The original static HTML/CSS site is kept in `legacy/`.

## Stack

- Next.js 15 (App Router), React 19, TypeScript (strict)
- Tailwind CSS 3
- `next/font` (Inter), metadata with Open Graph tags, `robots.ts`, `sitemap.ts`, SVG favicon
- Jest, React Testing Library, jest-dom
- ESLint (`next/core-web-vitals`, `next/typescript`)
- GitHub Actions CI

The page is fully static and ships no custom client-side JavaScript (only the Next.js runtime).

## Run

Requires Node 20 (`.nvmrc`).

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build
npm start
```

## Check

```bash
npm run lint
npm run typecheck
npm test
npm run test:coverage
```

Last run: 27 tests in 3 suites passed; `tsc --noEmit`, `next lint` and `next build` pass without warnings.
The tests cover the components (project card, skills list, navigation, contact links, page structure),
data integrity (required fields, https URLs, non-empty skill groups, resume file exists in `public/`,
no phone number in profile data), and a check that no data string contains "lorem" or "todo".

## Structure

```
app/              layout, page, globals.css, robots.ts, sitemap.ts, icon.svg
components/       one component per section, plus ProjectCard and SkillsList
data/             typed content: profile, projects, skills, background, nav, types
public/           Aditi-Kumari-Resume.pdf
__tests__/        Jest tests
docs/             screenshots and the Lighthouse summary
legacy/           the original static site, unchanged
.github/workflows/ci.yml
```

## Add a project

Append an object to the array in `data/projects.ts`. The `Project` type is in `data/types.ts`:
`slug`, `name`, `summary`, `stack` and `codeUrl` are required; `liveUrl` and `features` are optional.
The data tests check that URLs are https and slugs are unique.

## Deploy on Vercel

Import the GitHub repository in Vercel. The framework preset is detected as Next.js and no
environment variables are needed. Then set `siteUrl` in `data/profile.ts` to the real domain, because
it is used for canonical, Open Graph and sitemap URLs (the current value is a placeholder).

## Lighthouse

Measured on 2026-11-01 against the production build (`npm run build && npx next start -p 5500`),
Lighthouse 12.8.2, mobile emulation (default), system Chrome:

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npx lighthouse http://localhost:5500 --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo --output=json
```

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

FCP 0.8 s, LCP 1.9 s, TBT 0 ms, CLS 0, Speed Index 0.8 s. Lighthouse still lists three small
opportunities that come from the Next.js runtime and CSS: render-blocking CSS (about 130 ms),
legacy JavaScript (12 KiB) and unused JavaScript (42 KiB). These were measured on localhost, so
real-world numbers on Vercel will differ. Summary: `docs/lighthouse-summary.json`.

## Screenshots

Desktop (1440 px wide, full page):

![Desktop](docs/desktop.png)

Mobile (390 px wide, full page):

![Mobile](docs/mobile.png)

A script run with playwright-core at 390 px width found no horizontal overflow
(scroll width 390, client width 390), all five nav anchors point to existing sections, and the resume
link downloads `Aditi-Kumari-Resume.pdf` (served as `application/pdf`).

## Limitations

- No photo is used. The images in the old site were template placeholders, a photo of someone
  else, or a photo with an edited background, so none were reused. There are therefore no `next/image` usages.
- The resume PDF is the owner's existing file. It still contains a phone number, which the site itself
  does not show. Replace `public/Aditi-Kumari-Resume.pdf` with a version without it if you do not want it public.
  The resume lists older skills than the Skills section, which follows the owner's current list.
- Contact is a `mailto:` link only; there is no form or backend.
- Light theme only.
- GitHub Actions has not been run on GitHub; the workflow was only linted with actionlint.
- The `legacy/` site has known bugs; it is excluded from lint, typecheck and tests.
