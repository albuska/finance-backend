const { ctrlWrapper } = require("../../helpers"); 
const { reportTypeYearMonthDetail } = require("../../services/reports");


const monthIncome = async (req, res) => {
    const { id } = req.user;
    const { year, month } = req.query;

    const type = 'income';

    const report = await reportTypeYearMonthDetail(id, type, year, month);

    res.status(200).json({
        report
    })
};

module.exports = {
    monthIncome: ctrlWrapper(monthIncome),
};