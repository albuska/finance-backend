const express = require('express');
const logger = require('morgan')
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config({ path: './.env' }); 

const authRouter = require("./routes/api/auth");
const transactionsRouter = require("./routes/api/transactions");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { FRONT_PROD, FRONT_DEV } = process.env;

app.use(logger(formatsLogger));
app.use(cors({origin: [FRONT_PROD, FRONT_DEV], methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}));

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/transactions", transactionsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });
  
  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });
  
  module.exports = app;