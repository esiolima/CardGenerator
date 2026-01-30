import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Resolver __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ EM PRODUÇÃO, o frontend está em dist/public
const clientPath = path.join(__dirname, "..", "public");

// Middleware
app.use(express.json());

// Servir frontend buildado pelo Vite
app.use(express.static(clientPath));

// Rota raiz
app.get("/", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Rota tipo Manus
app.post("/processar", (req, res) => {
  const { input } = req.body;

  const resultado = `
=== RESULTADO GERADO ===

Entrada recebida:
${input}

(Processamento simulado com sucesso)
`;

  res.json({ resultado });
});

// Healthcheck (Railway usa isso)
app.get("/health", (_req, res) => {
  res.send("OK");
});

// Start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
