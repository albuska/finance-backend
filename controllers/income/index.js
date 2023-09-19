const { getAllIncomes } = require("./getAllIncomes");
const { currentMonth } = require("./currentMonth");
const { postNewIncome } = require("./postNewIncome");
const { summaryIncome } = require("./summaryIncome");


module.exports = {
    getAllIncomes,
    currentMonth,
    postNewIncome,
    summaryIncome
};