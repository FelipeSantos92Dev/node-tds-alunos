import express from "express"; // Serve para escutar as requisições
import { config } from "dotenv"; // Serve para ler o arquivo .env

config(); // Lê o arquivo .env

const port = process.env.PORT || 5000; // Define a porta que será usada

const app = express(); // Cria o servidor
app.use(express.json()); // Permite que o servidor entenda requisições em JSON

app.get("/", (req, res) => {
  const nome = req.query.nome;
  const qualquerNome = req.query.anime;
  const page = req.query.page;
  const limit = req.query.limit;
  // Rota inicial
  res
    .status(200)
    .json({ message: nome, anime: qualquerNome, pagina: page, limite: limit });
});

app.get("/:nome/:sobrenome", (req, res) => {
  const nome = req.params.nome;
  const sobrenome = req.params.sobrenome;
  const qualquerNome = req.query.anime;
  // Rota inicial
  res
    .status(200)
    .json({ message: qualquerNome, sobrenome: sobrenome, nome: nome });
});

app.post("/", (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const idade = req.body.idade;

  // Rota inicial
  res
    .status(200)
    .json({
      nomeUsuario: nome,
      sobrenomeUsuario: sobrenome,
      idadeUsuario: idade,
    });
});

app.put("/", (req, res) => {
  // Rota inicial
  res.status(200).json({ message: "Hello, PUT!" });
});

app.delete("/", (req, res) => {
  // Rota inicial
  res.status(200).json({ message: "Hello, DELETE!" });
});

app.listen(port, () => {
  // Inicia o servidor
  console.log(`⚡ Server started on http://localhost:${port}`);
});
