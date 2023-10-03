const { catchAsync, getToken } = require('../../utils');
const db = require("../../db");

exports.googleAuth = catchAsync(async (req, res) => {
  const { id } = req.user;
  const token = await getToken(id);

await db.query('UPDATE users SET token=$1 WHERE id=$2', [token, id]);

  res.redirect(`https://nmarkhotsky.github.io/finance-front/finance-front/?token=${token}`);
});