# Ronnie Galindo — Portfolio

A multi-page React and TypeScript portfolio, styled with CSS. Includes animated procedural artwork, responsive navigation, project search and category filters, individual project pages, experience, contact links, clipboard copying, and a downloadable resume. Animations respect reduced-motion preferences.

## Local development

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

## Docker

```sh
docker compose up --build -d
```

Open http://localhost:8080. The multi-stage Docker image builds the app and serves it with Nginx. Nginx falls back to index.html so nested project links work on refresh.

## Content

- Contact details and project data: `src/data.ts`
- Pages and layout: `src/main.tsx`
- Styles and animations: `src/styles.css`
- Downloadable resume: `public/ronnie-galindo-resume.pdf`

Project artwork is illustrative, generated directly in CSS. No repository screenshots or fabricated product demos are used. Email actions open the visitor’s email app; no form backend is required. Google Fonts are optional and have local font fallbacks.
