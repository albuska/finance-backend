const { httpError } = require("../../helpers");
const db = require("../../db")
const jwt = require("jsonwebtoken");

const { SECRET_KEY_TOKEN } = process.env;

const authenticate = async (req, res, next) => {
    
    const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(httpError(401, "Not authorized"));
    }

    try {
        const { id, exp } = await jwt.verify(token, SECRET_KEY_TOKEN);
        if (exp*1000 < Date.now()) next(httpError(401, "Not authorized"));

        const { rows } = await db.query(`
            SELECT id, name, email, token, balance
            FROM users
            WHERE id=$1`, [id]
        )
        const user = rows[0]
    
        if (!user || !user.token || user.token !== token) {
        next(httpError(401, "Not authorized"));
        }

        req.user = user;

        next();

    } catch(e) {
        next(httpError(401, "Not authorized"));

    }


    
};

module.exports = authenticate;