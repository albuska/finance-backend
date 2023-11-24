const { httpError } = require("../../helpers");
const db = require("../../db")
const jwt = require("jsonwebtoken");

const { SECRET_KEY_REFRESH_TOKEN } = process.env;

const refreshValidation = async (req, res, next) => {
    const { refreshToken = "" } = req.cookies;

    if (!refreshToken || refreshToken === "") next(httpError(401, "Not authorized: no token in cookie"));

        try {
            const { id, exp } = await jwt.verify(refreshToken, SECRET_KEY_REFRESH_TOKEN);
            if (exp*1000 < Date.now()) next(httpError(401, "Not authorized: old token"));

        const { rows } = await db.query(`
            SELECT id, email, refresh_token
            FROM users
            WHERE id=$1`, [id]
        )
            const user = rows[0]
            console.log(user, 'this is from refresh');
    
        if (!user || !user.refresh_token || user.refresh_token !== refreshToken) {
        next(httpError(401, "Not authorized: no such user or token is not valid"));
        }

        req.user = user;

        next();

    } catch(e) {
        next(httpError(401, "Not authorized: something went wrong, try again"));
    }

}

module.exports = refreshValidation;