const { ctrlWrapper } = require("../../helpers"); 
const { reportTypeMonthSum } = require("../../services/reports");

const summaryIncome = async (req, res) => {
    const { id } = req.user;

    const type = 'income';

    const report = await reportTypeMonthSum(id, type);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    summaryIncome: ctrlWrapper(summaryIncome),
};