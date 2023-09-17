const { v4: uuidv4 } = require("uuid");
const db = require("../../db");
const { ctrlWrapper } = require("../../helpers");
const { createHashPassword, getToken } = require("../../utils");

const register = async (req, res) => {

  const { name, email, password } = req.body;

  const id = uuidv4()
  
  const hashPassword = await createHashPassword(password);

  const verificationToken = await getToken(id); 

  const { rows: newUser } = await db.query(`
  INSERT INTO users (id, name, email, password, token) 
  values ($1, $2, $3, $4, $5) 
  RETURNING id, name, email, password, token, balance`,
    [id, name, email, hashPassword, verificationToken]
  );

  const { name: dbName, email: dbEmail, token, balance } = newUser[0];

  res.status(201).json({
    user: {
      name: dbName,
      email: dbEmail,
      balance
    },
    token
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
