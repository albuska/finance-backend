const db = require("../../db");
const format = require('date-format');


const addTransactionDB = async (data, userID) => {

    const { description, category, sum, type } = data;
    
    const timestamp = format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date());

    const { rows } = await db.query(`
    INSERT INTO 
        transactions (date, description, category, sum, type, fk_user_id)
        values ($1, $2, $3, $4, $5, $6)
    RETURNING
        id, date, description, category, sum, type, fk_user_id`,
        [timestamp, description, category, sum, type, userID]
    );

    const transaction = rows[0];
    
    return transaction;
};

module.exports = addTransactionDB;