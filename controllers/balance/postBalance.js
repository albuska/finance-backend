const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");

const postBalance = async (req, res) => {
    const { id } = req.user;
    const { start_balance } = req.body;

    const { rows } = await db.query(`
    UPDATE users
    SET start_balance=$2, balance=$2
    WHERE id=$1
    RETURNING name, email, balance`,
        [id, start_balance]
    );

    const updUser = rows[0];

    res.status(200).json({ user: updUser });

};

module.exports = {
    postBalance: ctrlWrapper(postBalance),
};