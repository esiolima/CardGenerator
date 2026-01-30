import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// rota principal
app.get("/", (_req, res) => {
  res.send("Backend do CardGenerator rodando");
});

// rota de processamento (tipo Manus)
app.post("/processar", (req, res) => {
  const { input } = req.body;

  // aqui futuramente entra a lógica real
  const resultado = `
=== RESULTADO GERADO ===

Entrada recebida:
${input}

(Processamento simulado com sucesso)
`;

  res.json({ resultado });
});

// healthcheck
app.get("/health", (_req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
