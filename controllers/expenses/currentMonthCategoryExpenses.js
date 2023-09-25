const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthCategory } = require("../../services/reports");

const currentMonthCategoryExpenses = async (req, res) => {
    const { id } = req.user;

    const type = 'expense';

    const report = await reportCurrentMonthCategory(id, type);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthCategoryExpenses: ctrlWrapper(currentMonthCategoryExpenses),
};