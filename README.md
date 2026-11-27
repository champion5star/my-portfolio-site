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

The workflow in `.github/workflows/deploy.yml` runs quality checks on every branch push, pull requests targeting `main`, and manual runs. Only successful checks on `main` can proceed to GitHub Pages packaging and deployment. Feature branches such as `update-1` and pull requests run checks without publishing.

1. Push this project to `https://github.com/champion5star/my-portfolio-site`.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Open **Actions → Portfolio CI and GitHub Pages → Run workflow**, selecting `main`, if the first push happened before Pages was enabled.
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

## Automated tests and CI/CD

The test suite uses Vitest, React Testing Library, and JSDOM. Tests are colocated with the components and pages they exercise; shared setup and rendering helpers live in `src/test/`. `vitest.config.ts` controls test environments and coverage thresholds.

```sh
npm test                # Run tests once in browser-routing mode
npm run test:watch      # Run tests interactively while editing
npm run test:coverage   # Run tests and produce coverage reports
npm run test:pages      # Run the suite with hash routing and a repository base path
npm run test:ci         # Run coverage checks and both routing modes
npm run typecheck      # Check TypeScript, including test files
```

The tests cover all page routes and project detail routes, missing-page recovery, navigation state, skip navigation, category and text filtering, reset behavior, contact-form validation and submission state, visitor return from the delivery provider, direct route loading, and resume paths. Native form navigation is intercepted by the tests: no messages are sent to FormSubmit or email recipients. Inbox delivery and CAPTCHA completion require a separate manual check after activation.

CI checks formatting, TypeScript, both test modes, coverage thresholds, and production builds for both hosting modes. The coverage report is available as a `coverage-report` artifact for 14 days, and locally at `coverage/index.html`. Minimum coverage is 80% for lines and statements and 75% for functions and branches; falling below a threshold fails CI.

The deployment jobs depend on passing quality checks. They discover the configured Pages base path, build the site, upload the `dist` artifact, and publish it using the built-in GitHub token. No personal access token or email credentials are needed in repository secrets. The deploy job alone receives Pages write and OIDC permissions. Configure **Settings → Pages → Source → GitHub Actions** once in GitHub. To prevent merging failing code, add the **Quality checks** status as a required check in the repository’s branch rules.

## Content

- Contact details and navigation: `src/data/site.ts`
- Projects: `src/data/projects.ts`
- Skills and professional experience: `src/data/profile.ts`, `src/data/experience.ts`
- Route definitions: `src/routes/AppRoutes.tsx`
- Pages: `src/pages/`
- Shared layout, sections, and UI: `src/components/`
- Route effects and project filtering: `src/hooks/`
- Shared TypeScript models: `src/types/`
- CSS entry point: `src/styles/index.css` (imports the focused stylesheets in cascade order)
- Downloadable resume: `public/ronnie-galindo-resume.pdf`

Project artwork is illustrative, generated directly in CSS. No repository screenshots or fabricated product demos are used. The contact form posts to FormSubmit, which delivers submissions to the configured recipient. Visitors complete the provider’s spam check and see delivery confirmation there. The recipient must activate the form once using the confirmation email triggered by the first submission. There are no email API credentials in the frontend. Header and footer contact actions route to this form. Google Fonts are optional and have local font fallbacks.

## Source structure

`main.tsx` only mounts React and loads CSS. `App.tsx` selects browser or hash routing, and `AppRoutes.tsx` maps URLs to page components within the shared `SiteLayout`. Each page composes reusable components and reads content from data modules. UI state and browser effects live in focused hooks or in the component that owns the interaction.

The header, footer, logo, links, project cards, tags, contact form, experience entries, animated artwork, and home-page sections each have their own component. CSS files separate base rules, layout, artwork, pages, forms, animations, and responsive overrides; their import order preserves the existing cascade.

Run `npm run format` to format source files and `npm run format:check` to check formatting. Run `npm run build` for TypeScript and production build validation.
