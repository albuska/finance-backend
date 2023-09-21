const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");
const { sendEmail } = require("../../services/auth");


const resendVerifyEmail = async (req, res) => {
  //   console.log("reqBody", req.body);
  //   console.log("db-->", db);

  //   const { BASE_URL } = process.env;

  //   const { email } = req.body;

  //   let user;

  //   db.query('SELECT * FROM users WHERE email = $3', [email], (error, result) => {
  //       if (error) {
  //         console.error('Помилка запиту:', error);
  //         return;
  //       }

  //       const user = result.rows[0];
  //       return user; 
  //   });

  //   console.log(user);

  // if (!user) throw httpError(401, "Email not found");

  // if (user.verify) throw httpError(400, "Verification has already been passed");

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  // res.json({
  //   message: "Verification email sent",
  // });
}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  };