const { ctrlWrapper } = require("../../helpers"); 
const { countBalance } = require("../../services/transaction");
const { deleteTransactionDB } = require("../../services/transaction");

const deleteTransaction = async (req, res) => {
    const { id: userId } = req.user;
    const { id: transactionId } = req.params;

    await deleteTransactionDB(userId, transactionId);

    await countBalance(userId);

    res.status(200).json('Transaction was deleted successfully');
};

module.exports = {
    deleteTransaction: ctrlWrapper(deleteTransaction),
};