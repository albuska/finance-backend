const authenticate = require("./authenticate");
const registerValidation = require("./registerValidation");
const loginValidation = require("./loginValidation");
const verifyValidation = require("./verifyValidation");
const passport = require('./googleAuthenticate');

module.exports = {
  authenticate,
  registerValidation,
  loginValidation,
  verifyValidation,
  passport
};