const { ctrlWrapper } = require("../../helpers"); 
const db = require('../../db');

const logout = async (req, res) => {
  const { id } = req.user;

  const { rows } = await db.query(`
    UPDATE users
    SET token=NULL
    WHERE id=$1
    RETURNING id, name, email, token`,
    [id]
  );

  res.status(204).json({ rows });
};

module.exports = {
  logout: ctrlWrapper(logout),
};