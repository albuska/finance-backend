const { loginDataValidation } = require("../../services/auth");
const { httpError } = require("../../helpers");
const db = require("../../db");
const bcrypt = require('bcrypt');

const loginValidation = async (req, res, next) => {
    const { value, error } = loginDataValidation(req.body);

    if (error) next(httpError(400, error.message));

    const { rows: user } = await db.query(`
        SELECT id, name, email, password 
        FROM users 
        WHERE email=$1`,
        [value.email]
    )

    if (user.length === 0) next(httpError(401, 'Email or password is wrong'));

    const {password: dbPassword} = user[0]

    const comparedPassword = await bcrypt.compare(req.body.password, dbPassword);

    if (!comparedPassword) next(httpError(401, 'Email or password is wrong'));

    req.user = user[0];

    next()
}

module.exports = loginValidation