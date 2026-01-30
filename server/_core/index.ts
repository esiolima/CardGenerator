import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// frontend buildado pelo Vite
const clientPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(clientPath));

// rota simples tipo Manus (SEM upload ainda)
app.post("/processar", (req, res) => {
  res.json({
    ok: true,
    mensagem: "Backend estável funcionando"
  });
});

app.get("/health", (_req, res) => {
  res.send("OK");
});

// SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
