const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");
const { sendEmail } = require("../../services/auth");


const { BASE_URL, FRONT_DEV } = process.env;

const resendVerifyEmail = async (req, res) => {

    const { email } = req.body;

    console.log("email", email);

 const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    console.log("user", user);

  if (!user) throw httpError(401, "Email not found");

  if (user.rows[0].is_verified) throw httpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${FRONT_DEV}/api/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  };