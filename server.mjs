import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;
const allowedFiles = new Set([
  "/index.html", "/styles.css", "/src/app.js", "/src/inventory.js", "/src/storage.js",
]);
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };

createServer(async (request, response) => {
  if (request.method !== "GET") {
    response.writeHead(405).end("Method not allowed");
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const urlPath = pathname === "/" ? "/index.html" : pathname;
  if (!allowedFiles.has(urlPath)) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const file = await readFile(path.join(root, urlPath));
    response.writeHead(200, { "content-type": contentTypes[path.extname(urlPath)], "cache-control": "no-store" });
    response.end(file);
  } catch {
    response.writeHead(500).end("Internal server error");
  }
}).listen(port, () => {
  console.log(`KasirKu Mini: http://localhost:${port}`);
  console.log("Biarkan terminal ini terbuka selama aplikasi digunakan. Ctrl+C untuk berhenti.");
});
