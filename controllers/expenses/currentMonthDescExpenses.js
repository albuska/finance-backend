const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthDescription } = require("../../services/reports");

const currentMonthDescExpenses = async (req, res) => {
    const { id } = req.user;

    const type = 'expense';

    const report = await reportCurrentMonthDescription(id, type);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthDescExpenses: ctrlWrapper(currentMonthDescExpenses),
};