import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Resolver __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do client
const clientPath = path.join(__dirname, "..", "..", "client");

// Middleware
app.use(express.json());

// Servir arquivos estáticos (index.html)
app.use(express.static(clientPath));

// Rota raiz — IMPORTANTE
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

// Healthcheck
app.get("/health", (_req, res) => {
  res.send("OK");
});

// Start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
