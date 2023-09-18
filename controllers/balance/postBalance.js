const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");

const postBalance = async (req, res) => {
    const { id, balance } = req.user;

    const { rows } = await db.query(`
    UPDATE users
    SET balance=$2
    WHERE id=$1
    RETURNING id, name, email, balance`,
        [id, balance]
    );

    const updUser = rows[0];

    res.status(200).json({ user: updUser });

};

module.exports = {
    postBalance: ctrlWrapper(postBalance),
};