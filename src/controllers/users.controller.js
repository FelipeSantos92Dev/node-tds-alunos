import { hash } from "bcrypt";

import User from "../models/users/User.js";
import UsersRepository from "../models/users/UsersRepository.js";

const usersRepository = new UsersRepository();

export const getUsers = (req, res) => {
  const users = usersRepository.getUsers();

  if (!users) {
    return res.status(404).send({ message: "Não há usuários cadastrados" });
  }
  return res.status(200).send({ totalUsers: users.length, users });
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  const user = usersRepository.getUserById(id);

  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado" });
  }

  return res.status(200).send({ message: "Usuário encontrado", user });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExists = usersRepository.getUserByEmail(email);

  if (userAlreadyExists) {
    return res.status(409).send({ message: "Usuário já cadastrado" });
  }

  const passwordHash = await hash(password, 8);

  const user = new User(name, email, passwordHash);

  usersRepository.createUser(user);

  return res.status(201).send({ message: "Usuário criado com sucesso", user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const userById = usersRepository.getUserById(id);
  const userByEmail = usersRepository.getUserByEmail(email);

  if (!userById) {
    return res.status(404).send({ message: "Usuário não encontrado" });
  }

  if (userByEmail && userByEmail.id !== id) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  const passwordHash = await hash(password, 8);

  const user = usersRepository.updateUser(id, name, email, passwordHash);

  return res
    .status(200)
    .send({ message: "Usuário atualizado com sucesso", user });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = usersRepository.getUserById(id);

  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado" });
  }

  usersRepository.deleteUser(id);

  return res
    .status(200)
    .send({ message: "Usuário deletado com sucesso", user });
};
