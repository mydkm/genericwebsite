# genericwebsite

## Run locally

```bash
bun install
bun run dev
```

Server starts at `http://localhost:3000`.

## CV PDF route

- Click the `CV` button in the top nav, or open `http://localhost:3000/cv`.
- The server compiles `CV - Joshua Davidov.typ` with `typst` and returns an inline PDF.
- Ensure `typst` is installed and available on your PATH.
