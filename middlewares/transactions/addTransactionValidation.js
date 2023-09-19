const { transactionDataValidation } = require("../../services/transaction");
const { httpError } = require("../../helpers");

const addTransactionValidation = async (req, res, next) => {

    const { error } = transactionDataValidation(req.body);

    if (error) next(httpError(400, error.message));

    next()
}

module.exports = addTransactionValidation;