// WritePro Local Server — talks to Ollama, no API key needed
// Run: node server.js
// Then open: http://localhost:3000

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const OLLAMA_URL = "http://localhost:11434"; // default Ollama port

const server = http.createServer(async (req, res) => {
  // CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── Serve the HTML file ──
  if (req.method === "GET" && req.url === "/") {
    try {
      const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(404);
      res.end("index.html not found. Make sure it's in the same folder as server.js");
    }
    return;
  }

  // ── List available Ollama models ──
  if (req.method === "GET" && req.url === "/api/models") {
    try {
      const data = await ollamaRequest("GET", "/api/tags");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Cannot connect to Ollama. Is it running? Run: ollama serve" }));
    }
    return;
  }

  // ── Proxy AI generation to Ollama ──
  if (req.method === "POST" && req.url === "/api/generate") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const { prompt, system, model } = JSON.parse(body);
        const ollamaBody = JSON.stringify({
          model: model || "llama3.2",
          prompt: system ? `${system}\n\nUser request: ${prompt}` : prompt,
          stream: false,
          options: { temperature: 0.8, num_predict: 800 }
        });

        const data = await ollamaRequest("POST", "/api/generate", ollamaBody);
        const parsed = JSON.parse(data);

        // Format response to match what the frontend expects
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text: parsed.response || "" }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

function ollamaRequest(method, urlPath, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 11434,
      path: urlPath,
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (body) options.headers["Content-Length"] = Buffer.byteLength(body);

    const req = http.request(options, res => {
      let data = "";
      res.on("data", chunk => (data += chunk));
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

server.listen(PORT, () => {
  console.log("\n🚀 WritePro server running!");
  console.log(`   Open: http://localhost:${PORT}`);
  console.log("\n📋 Make sure Ollama is running: ollama serve");
  console.log("📦 Recommended model: ollama pull llama3.2\n");
});