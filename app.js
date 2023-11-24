const express = require('express');
const logger = require('morgan')
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

dotenv.config({ path: './.env' }); 

const authRouter = require("./routes/api/auth");
const transactionsRouter = require("./routes/api/transactions");
const { swaggerRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

const allowedOrigins = [
  'https://nmarkhotsky.github.io',
  'http://localhost:3000',
];

const allowedHeaders = [
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
]
  
const exposedHeaders = [
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
  ]

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: allowedHeaders,
  exposedHeaders: exposedHeaders,
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   // Дозволяємо доступ до куків з інших доменів
//   res.set('Access-Control-Allow-Credentials', true);

//   // Дозволяємо доступ з усіх доменів (можна точніше налаштувати для конкретних)
//   res.set('Access-Control-Allow-Origin', allowedOrigins[0] || allowedOrigins[1]);

//   next();
// });

app.use(express.json());

app.use(cookieParser());

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