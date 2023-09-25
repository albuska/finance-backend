const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    console.log(verificationToken);

        const user = await db.query('SELECT * FROM users WHERE token = $1', [verificationToken]);
        console.log("BeforeUser", user);

        if (!user || user.length === 0) {
            throw httpError(404, "User not found");
        } 

            await db.query('UPDATE users SET is_verified = true, token = $1 WHERE id = $2', ["", user.rows[0].id]);
           
console.log("user", user.rows);

        res.json({
            message: "Verification successful",
        });

};

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
};