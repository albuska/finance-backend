const uuid = require("uuid");
const db = require("../../db");
const { httpError, ctrlWrapper } = require("../../helpers");
const { createHashPassword } = require("../../units");

const register = async (req, res) => {
  // const verificationToken = uuid(); 

  const { email, password } = req.body;

  const newPerson = await db.query(
    `INSERT INTO person (email, password) values ($1, $2) RETURNING *`,
    [email, password]
  );
  console.log(email, password);
  res.status(201).json(newPerson);
};

module.exports = {
  register: ctrlWrapper(register),
};
