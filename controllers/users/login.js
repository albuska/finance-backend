const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const bcrypt = require('bcrypt');
const { httpError } = require('../../helpers');
const { getToken } = require("../../units");
const { v4: uuidv4 } = require("uuid");

const login = async (req, res) => {
  const { email, password } = req.body

  const { rows: user } = await db.query(`
    SELECT email, password 
    FROM users 
    WHERE email=$1`,
    [email]
  )

  if (user.length === 0) throw httpError(401, 'Email or password is wrong');

  const comparedPassword = await bcrypt.compare(password, user[0].password);

  if (!comparedPassword) throw httpError(401, 'Email or password is wrong');

  const token = await getToken(uuidv4())

  const { rows: updUser } = await db.query(`
  UPDATE users 
  SET token=$1
  WHERE email=$2
  RETURNING email, token, balance`,
    [token, email]);

  const { email: dbEmail, token: dbToken, balance } = updUser[0];

  res.status(200).json({
    user: {
      email: dbEmail,
      balance
    },
    token: dbToken
  })
};

module.exports = {
  login: ctrlWrapper(login),
};