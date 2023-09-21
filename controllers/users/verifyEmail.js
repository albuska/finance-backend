const { ctrlWrapper, httpError } = require("../../helpers");
const db = require("../../db");

const verifyEmail = async (req, res) => {
//     const { verificationToken } = req.params;

//     console.log(req.params);

//     console.log("verificationToken", verificationToken);

//     try {
//         const user = await db.oneOrNone('SELECT * FROM users WHERE token = $1', verificationToken);

// console.log("user ==>", user);

//         if (!user) {
//             throw httpError(404, "User not found");
//         }

//         await db.none('UPDATE users SET verify = true, token = $1 WHERE id = $2', ["", user.id]);

//         res.json({
//             message: "Verification successful",
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         throw httpError(500, "Internal Server Error");
//     }
};

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
};