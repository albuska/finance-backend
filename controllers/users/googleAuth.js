const { catchAsync, getToken } = require("../../utils");
const db = require("../../db");

const { FRONTEND_URL } = process.env;

exports.googleAuth = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { token, refreshToken } = await getToken(id);

  await db.query("UPDATE users SET token=$1, refresh_token=$2 WHERE id=$3", [
    token,
    refreshToken,
    id,
  ]);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  });

  // res.redirect(`https://nmarkhotsky.github.io/finance-front/?token=${token}`);

  res.redirect(`${FRONTEND_URL}?token=${token}`);
});
