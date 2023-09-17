const Joi = require("joi");

const loginDataValidation = (data) => {
    return Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().email().required().empty(false).messages({
            'string.base': 'The email must be a string',
            'any.required': 'The email field is required',
            'string.empty': 'The email must not be empty',
            'email.base': 'The email must be in format user@example.com',
        }),
        password: Joi.string().required().empty(false).messages({
            'string.base': 'The password must be a string',
            'any.required': 'The password field is required',
            'string.empty': 'The password must not be empty',
        }),
    })
    .validate(data);
};

module.exports = loginDataValidation;