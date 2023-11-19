const { ctrlWrapper } = require("../../helpers"); 
const { reportCurrentMonthDescription, reportDescriptionPeriod } = require("../../services/reports");

const currentMonthDescIncome = async (req, res) => {
    const { id } = req.user;
    const { type, category } = req.data;
    const { year, month } = req.query;

    let report;

    !year || !month ? report = await reportCurrentMonthDescription(id, type, category) : report = await reportDescriptionPeriod(id, type, category, year, month);

    res.status(200).json({
        report
    })

};

module.exports = {
    currentMonthDescIncome: ctrlWrapper(currentMonthDescIncome),
};