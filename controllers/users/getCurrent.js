const { ctrlWrapper } = require("../../helpers"); 
const db = require('../../db');

const getCurrent = async (req, res) => {

  const {name, email, token, balance, start_balance} = req.user

  res.status(200).json({
    user: {
      name,
      email,
      balance
    },
    token
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};