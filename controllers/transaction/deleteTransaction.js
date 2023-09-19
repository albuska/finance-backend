const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");
const { httpError } = require("../../helpers");

const deleteTransaction = async (req, res) => {
    const { id: userId } = req.user;
    const { id: transactionId } = req.params;

    const {rowCount} = await db.query(`
    DELETE from transactions
    WHERE id = $1 AND fk_user_id = $2`,
        [transactionId, userId]);
    
    if (rowCount < 1) throw httpError(400, 'Ooops something wrong'); 

    res.status(200).json('Transaction was deleted successfully');
};

module.exports = {
    deleteTransaction: ctrlWrapper(deleteTransaction),
};