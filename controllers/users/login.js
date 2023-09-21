const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const { httpError } = require('../../helpers');
const { getToken } = require("../../utils");

const login = async (req, res) => {
  const { email, id} = req.user;


  const token = await getToken(id);

  const { rows: updUser } = await db.query(`
  UPDATE users 
  SET token=$1
  WHERE email=$2
  RETURNING name, email, token, balance, is_verified`,
    [token, email]);

  const { name, email: dbEmail, token: dbToken, balance, is_verified } = updUser[0];

  if (!is_verified) throw httpError(401, "Email not verified");

  res.status(200).json({
    user: {
      name,
      email: dbEmail,
      balance
    },
    token: dbToken
  });
  

};

module.exports = {
  login: ctrlWrapper(login),
};