const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");
const { sendEmail } = require("../../services/auth");


const { BASE_URL, FRONT_DEV } = process.env;

const resendVerifyEmail = async (req, res) => {

    const { email } = req.body;

 const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user) throw httpError(401, "Email not found");

  if (user.rows[0].is_verified) throw httpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
    <div style="text-align: center;">
      <img src="https://cdn.pnghd.pics/data/907/welcome-pic-11.jpg" alt="Welcome Image" style="max-width: 100%; height: auto;">
      <h1>Welcome to Our Website!</h1>
      <p>Thank you for signing up. To get started, please click the button below to verify your email:</p>
      <a href="${BASE_URL}/api/verify/${user.token}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none;">Verify Email</a>
    </div>
  `,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  };