const { httpError } = require("../helpers");
const db = require("../db")
// const jwt = require("jsonwebtoken");
// const {
//   UserModel: { User },
// } = require("../models");

// const { SECRET_KEY_TOKEN } = process.env;

const authenticate = async (req, res, next) => {
    
    const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(httpError(401, "Not authorized"));
    }

    // try {
    //     const verifiedToken = await jwt.verify(token, SECRET_KEY_TOKEN);
    //     console.log(verifiedToken, 'verifiedToken');
    //     // const user = await User.findById(id);

    // } catch {
    //     next(httpError(401, "Not authorized"));
    // }

        const { rows } = await db.query(`
            SELECT id, email, token, balance
            FROM users
            WHERE token=$1`, [token]
        )
        const user = rows[0]
    
        if (!user || !user.token || user.token !== token) {
        next(httpError(401, "Not authorized"));
        }

        req.user = user;

        next();
    
};

module.exports = authenticate;