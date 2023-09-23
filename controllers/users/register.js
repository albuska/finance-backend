const { v4: uuidv4 } = require("uuid");
const db = require("../../db");
const { ctrlWrapper } = require("../../helpers");
const { sendEmail } = require("../../services/auth");
const { createHashPassword, getToken } = require("../../utils")


const { BASE_URL, FRONT_DEV } = process.env;

const register = async (req, res) => {

  const { name, email, password} = req.body;

  const id = uuidv4(); 
  
  const hashPassword = await createHashPassword(password);

  const verificationToken = await getToken(id);  

  const { rows: newUser } = await db.query(`
  INSERT INTO users (id, name, email, password, token) 
  values ($1, $2, $3, $4, $5) 
  RETURNING id, name, email, password, token, balance, isVerified`,
    [id, name, email, hashPassword, verificationToken]
  );

  const { name: dbName, email: dbEmail, token, isVerified, balance } = newUser[0];

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${FRONT_DEV}/api/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail); 

  res.status(201).json({
    user: {
      name: dbName,
      email: dbEmail,
      isVerified,
      balance
    },
    token
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
