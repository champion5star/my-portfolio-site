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

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`, or manually from the Actions tab.

1. Push this project to `https://github.com/champion5star/my-portfolio-site`.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** if the first push happened before Pages was enabled.
4. Use the website URL shown by the successful deployment.

The expected URL for this repository is `https://champion5star.github.io/my-portfolio-site/`. The workflow discovers the configured Pages base path, so assets and resume downloads work under the repository path. GitHub Pages builds use hash routing (for example, `/#/contact`) so page refreshes and direct links work without server rewrite rules. Local, Docker, and Sites builds retain normal URL paths.

To preview a GitHub Pages build in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/my-portfolio-site/'
$env:VITE_ROUTER_MODE = 'hash'
npm run build
npm run preview
```

Clear those two variables before a normal root-path build. GitHub Pages serves the built static files; the Docker image is for hosting elsewhere. The FormSubmit contact form works independently of the host; submit once from the new live domain and complete any activation requested by FormSubmit.

## Content

- Contact details and project data: `src/data.ts`
- Pages and layout: `src/main.tsx`
- Styles and animations: `src/styles.css`
- Downloadable resume: `public/ronnie-galindo-resume.pdf`

Project artwork is illustrative, generated directly in CSS. No repository screenshots or fabricated product demos are used. The contact form posts to FormSubmit, which delivers submissions to the configured recipient. Visitors complete the provider’s spam check and see delivery confirmation there. The recipient must activate the form once using the confirmation email triggered by the first submission. There are no email API credentials in the frontend. Header and footer contact actions route to this form. Google Fonts are optional and have local font fallbacks.
