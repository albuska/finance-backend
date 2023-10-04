const { v4: uuidv4 } = require("uuid");
const db = require("../../db");
const { ctrlWrapper } = require("../../helpers");
const { sendEmail } = require("../../services/auth");
const { createHashPassword, getToken } = require("../../utils");


const { BASE_URL, FRONT_DEV } = process.env;

const register = async (req, res) => {

  const { name, email, password} = req.body;

  const id = uuidv4(); 
  
  const hashPassword = await createHashPassword(password);

  const {token: verificationToken, refreshToken} = await getToken(id);  

  const { rows: newUser } = await db.query(`
  INSERT INTO users (id, name, email, password, token, refresh_token) 
  values ($1, $2, $3, $4, $5, $6) 
  RETURNING id, name, email, password, token, refresh_token, balance`,
    [id, name, email, hashPassword, verificationToken, refreshToken]
  );

  const { name: dbName, email: dbEmail, token, refresh_token, balance } = newUser[0];

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<div style="text-align: center;">
    <img src="https://cdn.pnghd.pics/data/907/welcome-pic-11.jpg" alt="Welcome Image" style="max-width: 100%; height: auto;">
    <h1>Welcome to Our Website!</h1>
    <p>Thank you for signing up. To get started, please click the button below to verify your email:</p>
    <a href="${BASE_URL}/api/verify/${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none;">Verify Email</a>
  </div>`,
  };

  await sendEmail(verifyEmail);
  
  res.cookie('refreshToken', refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

  res.status(201).json({
    user: {
      name: dbName,
      email: dbEmail,
      balance
    },
    token
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
