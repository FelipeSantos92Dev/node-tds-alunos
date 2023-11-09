import express from "express"; // Serve para escutar as requisições
import { config } from "dotenv"; // Serve para ler o arquivo .env

config(); // Lê o arquivo .env

const port = process.env.PORT || 5000; // Define a porta que será usada

const app = express(); // Cria o servidor
app.use(express.json()); // Permite que o servidor entenda requisições em JSON

app.get("/", (req, res) => {
  // Rota inicial
  res.status(200).json({ message: "Hello, World!" });
});

app.listen(port, () => {
  // Inicia o servidor
  console.log(`⚡ Server started
  on http://localhost:${port}`);
});
