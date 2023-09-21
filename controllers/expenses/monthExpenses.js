const { ctrlWrapper } = require("../../helpers"); 
const { reportTypeYearMonthDetail } = require("../../services/reports");

const monthExpenses = async (req, res) => {
    const { id } = req.user;
    const { year, month } = req.query;

    const type = 'expense';

    const report = await reportTypeYearMonthDetail(id, type, year, month);

    res.status(200).json({
        report
    })
};

module.exports = {
    monthExpenses: ctrlWrapper(monthExpenses),
};