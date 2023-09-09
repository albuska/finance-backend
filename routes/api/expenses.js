const express = require("express");
// const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlExpenses } = require("../../controllers");

const router = express.Router();

router.get("/expenses", ctrlIncome.allIncomes);

router.get("/expenses/currentMonth", ctrlIncome.currentMonth); 

router.get("/expenses/summary", ctrlIncome.postNewIncome);
