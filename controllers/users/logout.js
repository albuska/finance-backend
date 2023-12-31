const { ctrlWrapper } = require("../../helpers"); 
const db = require('../../db');

const logout = async (req, res) => {
  const { id } = req.user;

  const { rows } = await db.query(`
    UPDATE users
    SET token=NULL, refresh_token=NULL
    WHERE id=$1
    RETURNING id, name, email, token, refresh_token`,
    [id]
  );

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });

  res.status(204).json({ rows });
};

module.exports = {
  logout: ctrlWrapper(logout),
};