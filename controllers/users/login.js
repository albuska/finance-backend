const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const { getToken } = require("../../utils");
const { REFRESH_TOKEN_COOKIE } = require('../../constants');

const login = async (req, res) => {
  const { email, id} = req.user;


  const { token, refreshToken } = await getToken(id);

  const { rows: updUser } = await db.query(`
  UPDATE users 
  SET token=$1, refresh_token=$2
  WHERE email=$3
  RETURNING name, email, token, refresh_token, balance`,
    [token, refreshToken, email]);

  const { name, email: dbEmail, token: dbToken, refresh_token, balance } = updUser[0];
  
  res.cookie('refreshToken', refresh_token, REFRESH_TOKEN_COOKIE);

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