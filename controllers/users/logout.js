const { ctrlWrapper } = require("../../helpers"); 
const db = require('../../db')

const logout = async (req, res) => {

  await db.query(`
    UPDATE users
    SET token=NULL
    WHERE token=$1`,
    [req.user.token]
  )

  res.status(204)
};

module.exports = {
  logout: ctrlWrapper(logout),
};