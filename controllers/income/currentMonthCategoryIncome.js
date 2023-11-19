const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthCategory, reportCategoryPeriod } = require("../../services/reports");

const currentMonthCategoryIncome = async (req, res) => {
    const { id } = req.user;
    const { year, month } = req.query;

    const type = 'income';

    let report;

    !year || !month ? report = await reportCurrentMonthCategory(id, type) : report = await reportCategoryPeriod(id, type, year, month);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthCategoryIncome: ctrlWrapper(currentMonthCategoryIncome),
};