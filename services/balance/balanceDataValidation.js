const Joi = require("joi");

const balanceDataValidation = (data) => {
        return Joi.object().options({ abortEarly: false }).keys({
            start_balance: Joi.number().greater(0).required()
        .messages({
            'number.base': 'The balance must be a number',
            'any.required': 'The balance field is required',
            'number.empty': 'The balance must not be empty',
            'number.negative': 'The balance must greater then 0'
        }),
    })
    .validate(data);
};

module.exports = balanceDataValidation;