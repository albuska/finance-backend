const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  secureConnection: false,
  auth: {
    user: "alagrisenko3@gmail.com",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnAuthorized: true,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "alagrisenko3@gmail.com" };
  await transport.sendMail(email);

  return true;
};

module.exports = sendEmail;