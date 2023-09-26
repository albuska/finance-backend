const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { verifyEmail } = require("./verifyEmail.js"); 
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { googleAuth } = require("./googleAuth");

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
  googleAuth
};