const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const { date } = require("joi");



const detailsBalance = async (req, res) => {

    const transaction = {
    date: Date.now(),
    description: 'fish',
    category: 'some category',
    sum: 25.00,
    type: 'income',
    fk_user_id: user.id
}
    const transactions = await db.query(`

    INSERT INTO transactions (date, description, category, sum, type, fk_user_id)
    values ($1, $2, $3, $4, $5, $6),
        [transaction.date, transaction.description, transaction.category, transaction.sum, transaction.type, fk_user_id.user.id]
    RETURNING id, date, description, category, sum, type, fk_user_id

    SELECT *
    FROM transactions
    `);

    console.log(transactions);

    res.status(200).json({transactions})
};

module.exports = {
    detailsBalance: ctrlWrapper(detailsBalance),
};