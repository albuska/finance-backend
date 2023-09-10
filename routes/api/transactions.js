const express = require("express");
// const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlBalance, ctrlIncome, ctrlExpenses, ctrlTransaction } = require("../../controllers");

const router = express.Router();

// balance
router.get("/balance", ctrlBalance.getGeneralBalance) 

router.post("/balance", ctrlBalance.postBalance) 

router.get("/balance/details", ctrlBalance.detailsBalance); 

// expenses
router.get("/expenses", ctrlExpenses.getAllExpenses);

router.get("/expenses/currentMonth", ctrlExpenses.currentMonthExpenses); 

router.get("/expenses/summary", ctrlExpenses.summaryExpenses);

// income
router.get("/income", ctrlIncome.allIncomes);

router.post("/income/:id", ctrlIncome.postNewIncome);

router.get("/income/currentMonth", ctrlIncome.currentMonth); 

router.get("/income/summary", ctrlIncome.summaryIncome);

// transaction
router.post("/transaction/:id", ctrlTransaction.postTransaction) 

router.delete("/transaction/:id", ctrlTransaction.deleteTransaction)

module.exports = router; 