# Projeto Inicial NodeJS

## Descrição

Ponto de partida para desenvolvimento em NodeJS, integrando Express, Nodemon e dotenv para otimizar a produtividade e permitir que desenvolvedores foquem na lógica do aplicativo.

## Objetivo

Encorajar boas práticas e fornecer uma base que promova a escalabilidade e manutenção, inspirando a criação de funcionalidades inovadoras e soluções para desafios complexos no ecossistema NodeJS.

## Tecnologias

- NodeJS
- NPM
- Express
- Nodemon
- Git

## Pré-requisitos

Para executar este projeto é necessário ter instalado:

- NodeJS
- NPM

## Etapas de criação do projeto

1. Criar o arquivo `package.json` com o comando `npm init -y`
2. Criar o arquivo `.gitignore` com o seguinte conteúdo:

```
node_modules
.env
```

3. Vincular o projeto ao repositório no Github
4. Instalar o Express, Nodemon e dotenv com o comando `npm install express nodemon dotenv`
5. Criação do arquivo `.env` com a variável `PORT=4000`
6. Criar a pasta `src` e o arquivo `server.js` dentro dela com o código abaixo:

```javascript
import express from "express"; // O express serve para criar o servidor
import { config } from "dotenv"; // O dotenv serve para ler as variáveis de ambiente

config(); // Carrega as variáveis de ambiente

const port = process.env.PORT || 5000; // Pega a porta do arquivo .env ou usa a porta 5000

const app = express(); // Cria o servidor e armazena na variável app
app.use(express.json()); // Configura o servidor para receber requisições com o formato JSON

// Configura o servidor para responder a requisições na rota /
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello World!" });
});

// Inicia o servidor na porta configurada
app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);
```

7. Adicionar o script `dev` no arquivo `package.json` com o comando `nodemon src/server.js`
8. Adicionar a informação `"type": "module"` no arquivo `package.json`
9. Executar o comando `npm run dev` para iniciar o projeto

Após a execução dos passos acima, o projeto estará pronto para ser utilizado e você poderá avançar para a próxima etapa.

## Criação dos arquivos de modelos

1. Criar a pasta `models` e o arquivo `Aluno.js` dentro dela com o código abaixo:

```javascript
class Aluno {
  constructor(nome, idade, curso) {
    this.id = this.gerarId();
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
  }

  gerarId() {
    return Math.floor(Math.random() * 1000);
  }
}

export default Aluno;
```

2. Criar a pasta `repositories` e o arquivo `AlunoRepository.js` dentro dela com o código abaixo:

```javascript
class AlunoRepository {
  constructor() {
    this.alunos = [];
  }

  cadastrar(aluno) {
    this.alunos.push(aluno);
  }

  listar() {
    return this.alunos;
  }

  buscarPorId(id) {
    return this.alunos.find((aluno) => aluno.id === id);
  }

  alterar(id, nome, idade, curso) {
    const aluno = this.buscarPorId(id);

    if (aluno) {
      aluno.nome = nome;
      aluno.idade = idade;
      aluno.curso = curso;
    }

    return aluno;
  }

  excluir(id) {
    const aluno = this.buscarPorId(id);

    if (aluno) {
      this.alunos = this.alunos.filter((aluno) => aluno.id !== id);
    }
  }
}

export default AlunoRepository;
```

## Criação dos arquivos de controllers

1. Criar a pasta `controllers` e o arquivo `aluno.controller.js` dentro dela com o código abaixo:

```javascript
import AlunoRepository from "../repositories/AlunoRepository.js";
import Aluno from "../models/Aluno.js";

const alunoRepository = new AlunoRepository();

export const cadastrar(req, res) => {
    const { nome, idade, curso } = req.body;

    const aluno = new Aluno(nome, idade, curso);

    alunoRepository.cadastrar(aluno);

    return res.status(201).send(aluno);
  }

export const listar(req, res) => {
    const alunos = alunoRepository.listar();

    return res.status(200).send(alunos);
  }

export const buscarPorId(req, res) => {
    const { id } = req.params;

    const aluno = alunoRepository.buscarPorId(Number(id));

    if (!aluno) {
      return res.status(404).send({ message: "Aluno não encontrado!" });
    }

    return res.status(200).send(aluno);
  }

export const alterar(req, res) => {
    const { id } = req.params;
    const { nome, idade, curso } = req.body;

    const aluno = alunoRepository.alterar(Number(id), nome, idade, curso);

    if (!aluno) {
      return res.status(404).send({ message: "Aluno não encontrado!" });
    }

    return res.status(200).send(aluno);
  }

export const excluir(req, res) => {
    const { id } = req.params;

    const aluno = alunoRepository.buscarPorId(Number(id));

    if (!aluno) {
      return res.status(404).send({ message: "Aluno não encontrado!" });
    }

    alunoRepository.excluir(Number(id));

    return res.status(204).send(aluno);
  }
```

## Criação dos arquivo de rotas

1. Criar a pasta `routes` e o arquivo `alunos.router.js` dentro dela com o código abaixo:

```javascript
import { Router } from "express"; // O Router serve para criar as rotas

import {
  cadastrar,
  listar,
  buscarPorId,
  alterar,
  excluir,
} from "../controllers/aluno.controller.js"; // Importa os controllers

const alunosRouter = Router(); // Cria o roteador do express

// Configura o roteador para responder a requisições na rota /
alunosRouter.post("/", cadastrar);
alunosRouter.get("/", listar);
alunosRouter.get("/:id", buscarPorId);
alunosRouter.put("/:id", alterar);
alunosRouter.delete("/:id", excluir);

export default alunosRouter; // Exporta o roteador
```

2. Criar o arquivo `index.router.js` dentro da pasta `routes` com o código abaixo:

```javascript
import express from "express"; // O express serve para criar o servidor
import { Router } from "express"; // O Router serve para criar as rotas
import alunosRouter from "./alunos.router.js"; // Importa o roteador de alunos

const indexRouter = Router(); // Cria o roteador do express

// Configura o roteador para responder a requisições na rota /
indexRouter.get("/", (req, res) => {
  return res.status(200).send({ message: "Servidor rodando! 🚀" });
});

// Configura o roteador para responder a requisições na rota /alunos
indexRouter.use("/alunos", alunosRouter);

export default indexRouter; // Exporta o roteador
```

3. Alterar o arquivo `server.js` para o código abaixo:

```javascript
import express from "express"; // O express serve para criar o servidor
import { config } from "dotenv"; // O dotenv serve para ler as variáveis de ambiente

import indexRouter from "./routes/index.router.js"; // Importa o roteador

config(); // Carrega as variáveis de ambiente

const port = process.env.PORT || 5000; // Pega a porta do arquivo .env ou usa a porta 5000

const app = express(); // Cria o servidor e armazena na variável app
app.use(express.json()); // Configura o servidor para receber requisições com o formato JSON
app.use(indexRouter); // Configura o servidor para usar o roteador

// Inicia o servidor na porta configurada
app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);
```

4. Executar o comando `npm run dev` para iniciar o projeto

## Instalação

Para instalar o projeto, siga os passos abaixo:

1. Clone o projeto para sua máquina
2. Execute o comando `npm install` para instalar as dependências do projeto
3. Execute o comando `npm run dev` para iniciar o projeto

## Autor

[Felipe Santos](https://github.com/FelipeSantos92Dev)

## Links Úteis

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Git](https://git-scm.com/)
