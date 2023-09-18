const Joi = require("joi");

const balanceDataValidation = (data) => {
    // return Joi.object().options({ abortEarly: false }).keys({
    //     balance: Joi.number().positive().greater(0).required().empty(false).messages({
    //         'number.base': 'The balance must be a number',
    //         'any.required': 'The balance field is required',
    //         'number.empty': 'The balance must not be empty',
    //         'number.negative': 'The balance must greater then 0'
    //     }),
    // })
    // .validate(data);
        return Joi.object().options({ abortEarly: false }).keys({
            balance: Joi.number().min(0.01).required()
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