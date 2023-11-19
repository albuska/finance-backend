const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthCategory, reportCategoryPeriod } = require("../../services/reports");

const currentMonthCategoryExpenses = async (req, res) => {
    const { id } = req.user;
    const { year, month } = req.query;

    const type = 'expense';

    !year || !month ? report = await reportCurrentMonthCategory(id, type) : report = await reportCategoryPeriod(id, type, year, month);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthCategoryExpenses: ctrlWrapper(currentMonthCategoryExpenses),
};