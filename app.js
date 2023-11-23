const express = require('express');
const logger = require('morgan')
const cors = require("cors");
// const passport = require("passport"); 
// const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
// require("./middlewares/auth/googleAuthenticate.js");

dotenv.config({ path: './.env' }); 

const authRouter = require("./routes/api/auth");
const transactionsRouter = require("./routes/api/transactions");
const { swaggerRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}));


// ['http://localhost:3000', 'https://nmarkhotsky.github.io/finance-front/']

app.use(express.json());

app.use(cookieParser());

// app.use(session({
//   secret: process.env.COOKIE_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }))

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", authRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/api-docs", swaggerRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });
  
  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });
  
  module.exports = app;