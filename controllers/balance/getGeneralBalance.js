const {ctrlWrapper} = require("../../helpers"); 

const getGeneralBalance = async (req, res) => {
    const { balance } = req.user;
    res.status(200).json({
        balance
    })
};

module.exports = {
    getGeneralBalance: ctrlWrapper(getGeneralBalance),
};