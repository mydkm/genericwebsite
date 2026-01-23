# joshdavidov.github.io

## Local preview
- `bun install`
- `bun index.ts`
- Open `http://localhost:3000`

## GitHub Pages deployment
This repository is set up to publish directly via GitHub Pages.

1) Ensure the repository name is `joshdavidov.github.io` (user site).
2) Commit and push to the `main` branch.
3) In GitHub: Settings → Pages → Source: `main` branch, `/root` folder.

The site entrypoint is `index.html` at the repo root, which loads assets from `main/`.
