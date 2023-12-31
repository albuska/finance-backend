const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

        const user = await db.query('SELECT * FROM users WHERE token = $1', [verificationToken]);

        if (!user || user.length === 0) {
            throw httpError(404, "User not found");
        } 

            await db.query('UPDATE users SET is_verified = true, token = $1 WHERE id = $2', ["", user.rows[0].id]);

        res.json({
            message: "Verification successful",
        });
        // res.redirect(`https://nmarkhotsky.github.io/finance-front?token=${verificationToken}`);

};

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
};