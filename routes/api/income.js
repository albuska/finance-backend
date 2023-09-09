const express = require("express");
// const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlIncome } = require("../../controllers");

const router = express.Router();

router.get("/income", ctrlIncome.allIncomes);

router.post("/income/:id", ctrlIncome.postNewIncome);

router.get("/income/currentMonth", ctrlIncome.currentMonth); 

router.get("/income/summary", ctrlIncome.summaryIncome);