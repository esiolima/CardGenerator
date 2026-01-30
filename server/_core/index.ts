import express from "express";

const app = express();

// Railway injeta PORT automaticamente
const PORT = Number(process.env.PORT) || 3000;

// Middleware básico
app.use(express.json());

// Rota raiz (IMPORTANTE)
app.get("/", (_req, res) => {
  res.status(200).send("CardGenerator API está rodando 🚀");
});

// Healthcheck (Railway gosta disso)
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
