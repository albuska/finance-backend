const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");

const getAllIncomes = async (req, res) => {
    const { id } = req.user;

    const { rows: transactions } = await db.query(`
        SELECT id, date, category, description, type, sum
        FROM transactions
        WHERE fk_user_id=$1 AND type=$2
        ORDER BY date DESC`,
            [id, 'income']);
    
    res.status(200).json({transactions})
};

module.exports = {
    getAllIncomes: ctrlWrapper(getAllIncomes),
};