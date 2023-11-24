const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY_TOKEN, SECRET_KEY_REFRESH_TOKEN, TOKEN_EXPIRES_IN, TOKEN_REFRESH_EXPIRES_IN } = process.env;

const getToken = async (id) => {
  const payload = {
    id,
  };
  const token = await jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: `${TOKEN_EXPIRES_IN}` });
  // const token = await jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: `1m` });
  const refreshToken = await jwt.sign(payload, SECRET_KEY_REFRESH_TOKEN, { expiresIn: `${TOKEN_REFRESH_EXPIRES_IN}` });
  return {
    token,
    refreshToken
  };
};

module.exports = getToken;