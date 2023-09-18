const { balanceDataValidation } = require("../../services/balance");
const { httpError } = require("../../helpers");

const balanceValidation = async (req, res, next) => {
    const { value, error } = balanceDataValidation(req.body);

    if (error) next(httpError(400, error.message));

    req.user.balance = value.balance;
    
    next();

};

module.exports = balanceValidation;