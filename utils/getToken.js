const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY_TOKEN, TOKEN_EXPIRES_IN } = process.env;

const getToken = async (id) => {
  const payload = {
    id,
  };
  const token = await jwt.sign(payload, SECRET_KEY_TOKEN, {expiresIn: `${TOKEN_EXPIRES_IN}`});
  return token;
};

module.exports = getToken;