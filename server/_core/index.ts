import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Resolver __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto do frontend buildado
const clientPath = path.join(__dirname, "..", "public");

app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(clientPath));

// 🔥 SPA fallback — QUALQUER rota devolve index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Healthcheck
app.get("/health", (_req, res) => {
  res.send("OK");
});

// Start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
