const {ctrlWrapper} = require("../../helpers"); 

const currentMonthExpenses = async (req, res) => {
  
};

module.exports = {
    currentMonthExpenses: ctrlWrapper(currentMonthExpenses),
};