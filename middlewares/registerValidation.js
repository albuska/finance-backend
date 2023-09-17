const { registerDataValidation } = require("../services/auth");
const { httpError } = require("../helpers");
const db = require("../db");

const registerValidation = async (req, res, next) => {
    const { value, error } = registerDataValidation(req.body);

    if (error) next(httpError(400, error.message));

    const { rowCount: user } = await db.query(`
        SELECT
        FROM users
        WHERE email=$1`,
        [value.email]
    );

    if (user > 0) next(httpError(409, `Email ${value.email} is already in use`));
    
    next();
};

module.exports = registerValidation;