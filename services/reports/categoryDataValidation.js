const Joi = require("joi");
const { categoryOfExpensesEnum, categoryOfIncomeEnum, typeOfTransactionEnum } = require("../../constants");

const categoryDataValidation = (data) => {
    data = {...data, category: data.category.toLowerCase()}

    return Joi.object().options({ abortEarly: false }).keys({
        category: Joi.string().valid(...Object.values(
            data.type == typeOfTransactionEnum.EXPENSES ? categoryOfExpensesEnum : categoryOfIncomeEnum
        ).map(str => str.toLowerCase())).required().messages({
            'any.required': 'The category is required',
            'string.base': 'The category must be a string',
            'any.only': `The category must be one this list: ${Object.values(categoryOfExpensesEnum)} for expenses or ${Object.values(categoryOfIncomeEnum)} for income`
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

module.exports = categoryDataValidation;