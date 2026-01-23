const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    const root = new URL("./main/", import.meta.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const fileUrl = new URL(`.${path}`, root);
    const file = Bun.file(fileUrl);

    if (!file.size) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(file, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
