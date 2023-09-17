const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const bcrypt = require('bcrypt');
const { httpError } = require('../../helpers');
const { getToken } = require("../../units");
const { v4: uuidv4 } = require("uuid");

const login = async (req, res) => {
  const { email, password } = req.body

  const { rows: user } = await db.query(`
    SELECT id, email, password 
    FROM users 
    WHERE email=$1`,
    [email]
  )

  if (user.length === 0) throw httpError(401, 'Email or password is wrong');

  const {id, password: dbPassword} = user[0]

  const comparedPassword = await bcrypt.compare(password, dbPassword);

  if (!comparedPassword) throw httpError(401, 'Email or password is wrong');

  const token = await getToken(id)

  const { rows: updUser } = await db.query(`
  UPDATE users 
  SET token=$1
  WHERE email=$2
  RETURNING name, email, token, balance`,
    [token, email]);

  const { name, email: dbEmail, token: dbToken, balance } = updUser[0];

  res.status(200).json({
    user: {
      name,
      email: dbEmail,
      balance
    },
    token: dbToken
  })
  

};

module.exports = {
  login: ctrlWrapper(login),
};