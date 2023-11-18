const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthDescription } = require("../../services/reports");

const currentMonthDescIncome = async (req, res) => {
    const { id } = req.user;
    const { type, category } = req.data;

    const report = await reportCurrentMonthDescription(id, type, category);
    
    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthDescIncome: ctrlWrapper(currentMonthDescIncome),
};