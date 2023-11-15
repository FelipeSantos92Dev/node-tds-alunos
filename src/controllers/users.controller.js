export const getUsers = (req, res) => {
  return res.status(200).send("GET /users");
};

export const getUserById = (req, res) => {
  return res.status(200).send("GET /users/:id");
};

export const createUser = (req, res) => {
  return res.status(201).send("POST /users");
};

export const updateUser = (req, res) => {
  return res.status(200).send("PUT /users/:id");
};

export const deleteUser = (req, res) => {
  return res.status(200).send("DELETE /users/:id");
};
