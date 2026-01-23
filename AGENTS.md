# Repository Guidelines

## Project Structure & Module Organization
- Root backend entry: `index.ts` (Bun server entrypoint).
- Main page assets and styling live in `main/`.
- Project pages live in `project1/`, `project2/`, `project3/` (one folder per project page).
- If you add shared assets (images, fonts), prefer an `assets/` folder at the repo root and reference from page folders.
- Tests are not set up yet; if added, place them under `tests/` or alongside modules as `*.test.ts`.

## Build, Test, and Development Commands
- `bun install`: install dependencies from `package.json`.
- `bun index.ts`: run the Bun backend locally.
- `bun run <script>`: run a script once you add it to `package.json` (e.g., `dev`, `build`, `lint`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces for TypeScript, HTML, and CSS.
- Filenames: use kebab-case for static assets (e.g., `hero-image.png`) and page-specific files (e.g., `project-1.css`).
- CSS: prefer BEM-style class names for clarity (e.g., `project-card__title`).
- TypeScript: use explicit, descriptive names; keep server logic in `index.ts` and page logic in their folder.

## Testing Guidelines
- No test framework is configured yet.
- If tests are introduced, use `*.test.ts` naming and keep them in `tests/` or next to the module under test.
- Document the test command in `package.json` when added.

## Commit & Pull Request Guidelines
- Current Git history has only an initial commit, so no convention is established.
- Use short, imperative commit summaries (e.g., “Add project page layout”).
- PRs should include: a brief description, screenshots for UI changes, and a note about how to run or review the change.

## Configuration & Security Notes
- Avoid committing secrets; keep any future environment values in a local `.env` file and document required keys in `README.md`.
