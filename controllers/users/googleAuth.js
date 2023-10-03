const { catchAsync, getToken } = require('../../utils');
const db = require("../../db");

const { FRONTEND_URL, FRONT_PROD } = process.env;

exports.googleAuth = catchAsync(async (req, res) => {
  const { id } = req.user;
  const token = await getToken(id);

await db.query('UPDATE users SET token=$1 WHERE id=$2', [token, id]);

  // res.redirect(`${FRONTEND_URL}?token=${token}`);
  res.redirect(`https://nmarkhotsky.github.io/finance-front/?token=${token}`);
});