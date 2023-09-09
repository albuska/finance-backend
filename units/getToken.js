const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY_TOKEN } = process.env;

const getToken = async (id) => {
  const payload = {
    id,
  };
  const token = await jwt.sign(payload, SECRET_KEY_TOKEN, {expiresIn: "23h"});
  return token;
};

module.exports = getToken;