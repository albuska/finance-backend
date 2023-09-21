const { getAllIncomes } = require("./getAllIncomes");
const { monthIncome } = require("./monthIncome");
const { postNewIncome } = require("./postNewIncome");
const { summaryIncome } = require("./summaryIncome");
const { currentMonthCategoryIncome } = require("./currentMonthCategoryIncome");


module.exports = {
    getAllIncomes,
    monthIncome,
    postNewIncome,
    summaryIncome,
    currentMonthCategoryIncome
};