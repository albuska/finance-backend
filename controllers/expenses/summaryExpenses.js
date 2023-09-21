const { ctrlWrapper } = require("../../helpers"); 
const { reportTypeMonthSum } = require("../../services/reports");

const summaryExpenses = async (req, res) => {
    const { id } = req.user;
    const type = 'expense'

    const report = await reportTypeMonthSum(id, type);
    
    res.status(200).json({
        report
    })
};

module.exports = {
    summaryExpenses: ctrlWrapper(summaryExpenses),
};