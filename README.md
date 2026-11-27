# Ronnie Galindo — Portfolio

A multi-page React and TypeScript portfolio, styled with CSS. Includes animated procedural artwork, responsive navigation, project search and category filters, individual project pages, experience, contact links, a contact form, and a downloadable resume. Animations respect reduced-motion preferences.

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

Project artwork is illustrative, generated directly in CSS. No repository screenshots or fabricated product demos are used. The contact form posts to FormSubmit, which delivers submissions to the configured recipient. Visitors complete the provider’s spam check and see delivery confirmation there. The recipient must activate the form once using the confirmation email triggered by the first submission. There are no email API credentials in the frontend. Header and footer contact actions route to this form. Google Fonts are optional and have local font fallbacks.
# my-portfolio-site
