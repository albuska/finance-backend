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

const { FRONT_PROD, FRONT_DEV } = process.env;

app.use(logger(formatsLogger));
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://nmarkhotsky.github.io/finance-front'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
// }));

// app.use(cors({
//   origin: ['https://nmarkhotsky.github.io/finance-front', 'http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   exposedHeaders: ['Access-Control-Allow-Origin',
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token',
//     'X-Requested-With',
//     'Accept',
//     'Accept-Version',
//     'Content-Length',
//     'Content-MD5',
//     'Content-Type',
//     'Date',
//     'X-Api-Version',
//     'Authorization'],
//   credentials: true,
// }));

// app.options('*', cors());

const allowedOrigins = [
  'https://nmarkhotsky.github.io',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization'
  ],
  exposedHeaders: [
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization'
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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