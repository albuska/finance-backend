const { ctrlWrapper } = require("../../helpers");
const db = require("../../db");

const postTransaction = async (req, res) => {

    const {date, description, category, sum, type} = req.body

    const { rows } = await db.query(`
    INSERT INTO transactions (date, description, category, sum, type, fk_user_id)
    values ($1, $2, $3, $4, $5, $6)
    RETURNING id, date, description, category, sum, type, fk_user_id`,
        [date, description, category, sum, type, req.user.id]
    );

    const transaction  = rows[0];

    res.status(200).json({ transaction });
};

module.exports = {
    postTransaction: ctrlWrapper(postTransaction),
};