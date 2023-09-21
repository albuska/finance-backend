const express = require("express");
const { authenticate } = require("../../middlewares/auth");
const { balanceValidation } = require("../../middlewares/balance");
const { addTransactionValidation } = require("../../middlewares/transactions");

const { ctrlBalance, ctrlIncome, ctrlExpenses, ctrlTransaction } = require("../../controllers");

const router = express.Router();

// balance
router.get("/balance", authenticate, ctrlBalance.getGeneralBalance); 
router.post("/balance", authenticate, balanceValidation, ctrlBalance.postBalance); 

router.get("/balance/details", ctrlBalance.detailsBalance); // only for testing

// expenses
router.get("/expenses", authenticate, ctrlExpenses.getAllExpenses);
router.get("/expenses/month", authenticate, ctrlExpenses.monthExpenses); 
router.get("/expenses/summary", authenticate, ctrlExpenses.summaryExpenses);

// income
router.get("/income", authenticate, ctrlIncome.getAllIncomes);

// router.post("/income/:id", ctrlIncome.postNewIncome);

router.get("/income/month", authenticate, ctrlIncome.monthIncome); 

router.get("/income/summary", authenticate, ctrlIncome.summaryIncome);

// transaction
router.post("/", authenticate, addTransactionValidation, ctrlTransaction.postTransaction); 
router.delete("/:id", authenticate, ctrlTransaction.deleteTransaction);

module.exports = router; 