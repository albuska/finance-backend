const { categoryDataValidation, getTypeTransaction } = require("../../services/reports");
const { httpError } = require("../../helpers");
const { categoryOfExpensesEnum, categoryOfIncomeEnum, typeOfTransactionEnum } = require("../../constants");

const categoryValidation = async (req, res, next) => {

    const type = getTypeTransaction(req.path)
    const { category } = req.query;

    const { error, value } = categoryDataValidation({category, type});

    if (error) next(httpError(400, error.message));

    const formatCategory = (value) => {
        return value.type === typeOfTransactionEnum.EXPENSES
            ? Object.values(categoryOfExpensesEnum).find(cat => cat.toLowerCase() === value.category.toLowerCase())
            : Object.values(categoryOfIncomeEnum).find(cat => cat.toLowerCase() === value.category.toLowerCase());
    }

    const formatedCategory = formatCategory(value)

    req.data = { category: formatedCategory, type };

    next();
}

module.exports = categoryValidation;