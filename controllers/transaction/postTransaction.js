const { ctrlWrapper } = require("../../helpers");
const { addTransactionDB, countBalance } = require("../../services/transaction");

const postTransaction = async (req, res) => {

    const { id } = req.user;

    const transaction = await addTransactionDB(req.body, id);

    const { balance }  = await countBalance(id);

    res.status(200).json({
        transaction,
        balance
    });
};

module.exports = {
    postTransaction: ctrlWrapper(postTransaction),
};