const Joi = require("joi");
const { regex } = require("../../constants");

const verifyDataValidation = (data) => {

    return Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().email().required().empty(false).messages({
            'string.base': 'The email must be a string',
            'any.required': 'The email field is required',
            'string.empty': 'The email must not be empty',
            'string.email': 'The email must be in format user@example.com',
        })
    })
        .validate(data)
};

module.exports = verifyDataValidation;