const {ctrlWrapper} = require("../../helpers"); 

const getGeneralBalance = async (req, res) => {
    const { start_balance, balance } = req.user;
    res.status(200).json({
        start_balance,
        balance
    })
};

module.exports = {
    getGeneralBalance: ctrlWrapper(getGeneralBalance),
};