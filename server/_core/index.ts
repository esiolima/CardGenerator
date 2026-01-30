import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import * as XLSX from "xlsx";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Resolver __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do frontend buildado
const clientPath = path.join(__dirname, "public");

// Upload em memória (Excel)
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.static(clientPath));

/**
 * 🔥 Upload de Excel e processamento
 * Espera um arquivo .xlsx no campo "file"
 */
app.post("/processar", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  try {
    // Ler o Excel
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Converter para JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    // 🔧 Aqui futuramente entra a lógica real dos cards
    const resultado = data.map((row, index) => ({
      id: index + 1,
      ...row,
    }));

    res.json({
      sucesso: true,
      totalLinhas: data.length,
      cards: resultado,
    });
  } catch (err) {
    res.status(500).json({
      error: "Erro ao processar o arquivo",
      detalhe: String(err),
    });
  }
});

// Healthcheck
app.get("/health", (_req, res) => {
  res.send("OK");
});

// SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
