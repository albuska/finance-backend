const Joi = require("joi");
const { categoryOfExpensesEnum, categoryOfIncomeEnum, typeOfTransactionEnum } = require("../../constants");

const transactionDataValidation = (data) => {
    console.log(data);
    return Joi.object().options({ abortEarly: false }).keys({
        // date: Joi.date().required().messages({
        //     'any.required': 'The date field is required',
        // }),
        description: Joi.string().required().messages({
            'any.required': 'The description field is required',
        }),
        category: Joi.string().valid(...Object.values(
            data.type == typeOfTransactionEnum.EXPENSES ? categoryOfExpensesEnum : categoryOfIncomeEnum
        )).required().messages({
            'any.required': 'The category is required',
            'string.base': 'The category must be a string',
            'any.only': `The category must be one this list: ${Object.values(categoryOfExpensesEnum)} for expenses or ${Object.values(categoryOfIncomeEnum)} for income`
        }),
        sum: Joi.number().greater(0).required().messages({
            'number.base': 'The sum must be a number',
            'any.required': 'The sum field is required',
            'number.negative': 'The sum must greater then 0'
        }),
        type: Joi.string().valid(...Object.values(typeOfTransactionEnum)).required().messages({
            'any.required': 'The type is required',
            'string.base': 'The type must be a string',
            'any.only': 'The type must be in allow list'
        })
    }).validate(data)
};

const getTypeOfEnum = (type) => {
    if (type === typeOfTransactionEnum.INCOME) return categoryOfIncomeEnum;
    if (type === typeOfTransactionEnum.EXPENSES) return categoryOfExpensesEnum;
}

module.exports = transactionDataValidation;