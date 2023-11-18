const express = require("express");
const { authenticate } = require("../../middlewares/auth");
const { balanceValidation } = require("../../middlewares/balance");
const { addTransactionValidation, categoryValidation } = require("../../middlewares/transactions");

const { ctrlBalance, ctrlIncome, ctrlExpenses, ctrlTransaction } = require("../../controllers");

const router = express.Router();

// balance
router.get("/balance", authenticate, ctrlBalance.getGeneralBalance); 
router.post("/balance", authenticate, balanceValidation, ctrlBalance.postBalance); 

// expenses
router.get("/expenses", authenticate, ctrlExpenses.getAllExpenses);
router.get("/expenses/month", authenticate, ctrlExpenses.monthExpenses); 
router.get("/expenses/summary", authenticate, ctrlExpenses.summaryExpenses);
router.get("/expenses/category", authenticate, ctrlExpenses.currentMonthCategoryExpenses);
router.get("/expenses/description", authenticate, categoryValidation, ctrlExpenses.currentMonthDescExpenses);

// income
router.get("/income", authenticate, ctrlIncome.getAllIncomes);
router.get("/income/month", authenticate, ctrlIncome.monthIncome); 
router.get("/income/summary", authenticate, ctrlIncome.summaryIncome);
router.get("/income/category", authenticate, ctrlIncome.currentMonthCategoryIncome);
router.get("/income/description", authenticate, categoryValidation, ctrlIncome.currentMonthDescIncome);

// transaction
router.post("/", authenticate, addTransactionValidation, ctrlTransaction.postTransaction); 
router.delete("/:id", authenticate, ctrlTransaction.deleteTransaction);


module.exports = router; 