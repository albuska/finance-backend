const db = require("../../db");
const { httpError } = require("../../helpers");


const deleteTransactionDB = async (userId, transactionId) => {

    const { rowCount } = await db.query(`
    DELETE from transactions
    WHERE id = $1 AND fk_user_id = $2`,
        [transactionId, userId]);

    if (rowCount < 1) throw httpError(400, 'Ooops something wrong'); 
};

module.exports = deleteTransactionDB;