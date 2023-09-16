const { v4: uuidv4 } = require("uuid");
const db = require("../../db");
const { httpError, ctrlWrapper } = require("../../helpers");
const { createHashPassword, getToken } = require("../../units");

const register = async (req, res) => {

  const { email, password } = req.body;

  const { rowCount: user } = await db.query(
    `SELECT FROM users WHERE email=$1`, [email]
  );

  if (user > 0) return res.status(409).json(`${email} in use`);
  
  const hashPassword = await createHashPassword(password);

  const verificationToken = await getToken(uuidv4()); 

  const {rows: newUser} = await db.query(
    `INSERT INTO users (email, password, token) values ($1, $2, $3) RETURNING *`,
    [email, hashPassword, verificationToken]
  );

  const {email: userEmail, password: userPassword, token} = newUser[0]

  //add name to DB, return name in res, add bool isNewUser

  res.status(201).json({
    user: {
      email: userEmail,
      password: userPassword,
      token
    }
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
