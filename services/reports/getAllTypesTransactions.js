const db = require("../../db");

const getAllTypesTransactions = async (id, year, month) => {

    if (!year || !month) {
        const { rows } = await db.query(`
            SELECT id, date, category, description, type, sum
            FROM transactions
            WHERE fk_user_id=$1
            ORDER BY date DESC`,
            [id]);
        
        return rows
    }

    const { rows } = await db.query(`
        SELECT id, date, category, description, type, sum
        FROM transactions
        WHERE fk_user_id=$1
            AND  date_part('year', "date") = $2 
            AND  date_part('month', "date") = $3
        ORDER BY date DESC`,
            [id, year, month]);
    
    return rows
};

module.exports = getAllTypesTransactions;