import { existsSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = process.cwd();
const CV_TYP_PATH = join(ROOT, "CV - Joshua Davidov.typ");
const CV_CACHE_DIR = join(ROOT, "generated", "cv");
const CV_PDF_PATH = join(CV_CACHE_DIR, "Joshua-Davidov-CV.pdf");

function safeRelativePath(urlPath: string): string | null {
  const decoded = decodeURIComponent(urlPath);
  const normalized = normalize(decoded).replace(/^([/\\])+/, "");

  if (normalized.startsWith("..")) {
    return null;
  }

  return normalized;
}

async function resolveStaticFile(urlPath: string) {
  const relative = safeRelativePath(urlPath);
  if (relative === null) return null;

  const candidates: string[] = [];
  if (!relative || relative === ".") {
    candidates.push("index.html");
  } else {
    candidates.push(relative);

    if (!extname(relative)) {
      candidates.push(`${relative}.html`);
      candidates.push(join(relative, "index.html"));
    }
  }

  for (const candidate of candidates) {
    const absolute = join(ROOT, candidate);
    if (!absolute.startsWith(ROOT)) {
      continue;
    }

    const file = Bun.file(absolute);
    if (await file.exists()) {
      return file;
    }
  }

  return null;
}

async function ensureCvPdf(): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!existsSync(CV_TYP_PATH)) {
    return { ok: false, message: "CV source file was not found in the repository." };
  }

  await mkdir(CV_CACHE_DIR, { recursive: true });

  let needsCompile = true;
  try {
    const [sourceStat, outputStat] = await Promise.all([stat(CV_TYP_PATH), stat(CV_PDF_PATH)]);
    needsCompile = sourceStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    needsCompile = true;
  }

  if (!needsCompile) {
    return { ok: true };
  }

  const compile = Bun.spawnSync({
    cmd: ["typst", "compile", "--root", ROOT, CV_TYP_PATH, CV_PDF_PATH],
    stdout: "pipe",
    stderr: "pipe",
  });

  if (compile.exitCode !== 0) {
    const stderr = new TextDecoder().decode(compile.stderr).trim();
    const message = stderr || "Typst failed to compile the CV document.";
    return { ok: false, message };
  }

  if (!existsSync(CV_PDF_PATH)) {
    return { ok: false, message: "Typst completed, but no PDF output file was generated." };
  }

  return { ok: true };
}

const server = Bun.serve({
  port: Number(process.env.PORT || 3000),
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/cv") {
      const result = await ensureCvPdf();
      if (!result.ok) {
        return new Response(`Failed to generate CV PDF.\n\n${result.message}`, {
          status: 500,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const pdf = Bun.file(CV_PDF_PATH);
      if (!(await pdf.exists())) {
        return new Response("CV PDF output was not found after compilation.", {
          status: 500,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      return new Response(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="Joshua-Davidov-CV.pdf"',
          "Cache-Control": "no-store",
        },
      });
    }

    const file = await resolveStaticFile(url.pathname);
    if (file) {
      return new Response(file);
    }

    const notFound = await resolveStaticFile("/index.html");
    if (notFound) {
      return new Response(notFound, { status: 404 });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
