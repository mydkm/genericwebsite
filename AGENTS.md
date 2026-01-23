# Repository Guidelines

## Project Structure & Module Organization
- Repository root: `/home/mydkm/Projects/joshdavidov.github.io`.
- Backend entrypoint: `index.ts` (Bun server for static pages).
- Main landing page: `main/` (HTML/CSS/JS for the homepage).
- Project pages: `project1/`, `project2/`, `project3/` (one folder per project page).
- Shared assets (images, fonts, icons): `assets/` at the repo root if needed.
- Tests are not configured yet; if added, use `tests/` or `*.test.ts` next to modules.

## Build, Test, and Development Commands
- `bun install`: install dependencies from `package.json`.
- `bun index.ts`: run the Bun server locally.
- `bun run <script>`: run a script once added (e.g., `dev`, `build`, `lint`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces for TypeScript, HTML, and CSS.
- Filenames: kebab-case for assets and page files (e.g., `hero-bg.jpg`, `project-1.css`).
- CSS: use component-style class names (e.g., `hero-title`, `project-card__title`).
- Keep page-specific JS and CSS inside its folder; keep server logic in `index.ts`.

## Testing Guidelines
- No test framework is configured.
- If tests are introduced, name files `*.test.ts` and document the command in `package.json`.

## Commit & Pull Request Guidelines
- Git history is minimal; use short, imperative commit titles (e.g., “Add tokamak hero animation”).
- PRs should include a brief summary, screenshots for UI changes, and any manual test notes.

## Configuration & Security Notes
- Do not commit secrets. If env vars are required later, use a local `.env` and document required keys in `README.md`.
