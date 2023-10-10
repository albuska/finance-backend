const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { verifyEmail } = require("./verifyEmail.js"); 
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { googleAuth } = require('./googleAuth');
const { refreshTokens } = require("./refreshTokens");
const { getCurrent } = require("./getCurrent");

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
  googleAuth,
  refreshTokens,
  getCurrent
};