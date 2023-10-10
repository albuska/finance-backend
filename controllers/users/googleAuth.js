const { catchAsync, getToken } = require("../../utils");
const db = require("../../db");

const { FRONTEND_URL, FRONT_PROD } = process.env;

exports.googleAuth = catchAsync(async (req, res) => {
  const { id } = req.user;
  console.log("id", id);
  const { token, refreshToken } = await getToken(id);

  // let URL = process.env.NODE_ENV === "development" ? FRONTEND_URL :  FRONT_PROD;


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


  res.redirect(`https://nmarkhotsky.github.io/finance-front?token=${token}`);

});
