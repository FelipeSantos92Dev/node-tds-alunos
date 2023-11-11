# Projeto Inicial NodeJS

[![Capa do Projeto](https://i.imgur.com/E8YvzaC.png)](https://github.com/FelipeSantos92Dev/node-tds-2023-alunos)

## Descrição

Este projeto é um projeto inicial para NodeJS.

## Tecnologias

- NodeJS
- NPM
- Express
- Nodemon
- Git
- Github

## Objetivo

O objetivo deste projeto é criar um projeto inicial para NodeJS.

## Pré-requisitos

Para executar este projeto é necessário ter instalado:

- NodeJS
- NPM

## Etapas de criação do projeto

1. Criar o arquivo `package.json` com o comando `npm init -y`
2. Criar o arquivo `.gitignore`
3. Instalar o Express com o comando `npm install express`
4. Instalar o Nodemon com o comando `npm install nodemon`
5. Instalar o dotenv com o comando `npm install dotenv`
6. Criação do arquivo `.env` com a variável `PORT=5000`
7. Criar o arquivo `server.js` com o código abaixo:

```javascript
import express from "express";
import { config } from "dotenv";

config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello World!" });
});

app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);
```

8. Adicionar o script `dev` no arquivo `package.json` com o comando `nodemon src/server.js`
9. Adicionar a informação `type: module` no arquivo `package.json`
10. Executar o comando `npm run dev` para iniciar o projeto

## Instalação

Para instalar o projeto, siga os passos abaixo:

1. Clone o projeto para sua máquina
2. Execute o comando `npm install` para instalar as dependências do projeto
3. Execute o comando `npm start` para iniciar o projeto

## Licença

MIT License

## Autor

[Felipe Santos](https://github.com/FelipeSantos92Dev)

## Links Úteis

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Git](https://git-scm.com/)
