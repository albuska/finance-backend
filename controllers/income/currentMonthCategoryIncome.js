const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthCategory } = require("../../services/reports");

const currentMonthCategoryIncome = async (req, res) => {
    const { id } = req.user;

    const type = 'income';

    const report = await reportCurrentMonthCategory(id, type);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthCategoryIncome: ctrlWrapper(currentMonthCategoryIncome),
};