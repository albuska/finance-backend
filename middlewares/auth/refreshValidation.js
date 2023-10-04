const { httpError } = require("../../helpers");
const db = require("../../db")
const jwt = require("jsonwebtoken");

const { SECRET_KEY_REFRESH_TOKEN } = process.env;

const refreshValidation = async (req, res, next) => {
    const { refreshToken = "" } = req.cookies;

    if (!refreshToken || refreshToken === "") next(httpError(401, "Not authorized"));


        try {
            const { id, exp } = await jwt.verify(refreshToken, SECRET_KEY_REFRESH_TOKEN);
            if (exp*1000 < Date.now()) next(httpError(401, "Not authorized"));

        const { rows } = await db.query(`
            SELECT id, email, refresh_token
            FROM users
            WHERE id=$1`, [id]
        )
            const user = rows[0]
            console.log(user);
    
        if (!user || !user.refresh_token || user.refresh_token !== refreshToken) {
        next(httpError(401, "Not authorized"));
        }

        req.user = user;

        next();

    } catch(e) {
        next(httpError(401, "Not authorized"));
    }

}

module.exports = refreshValidation;