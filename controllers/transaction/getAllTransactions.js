const { ctrlWrapper } = require("../../helpers"); 
const getAllTypesTransactions = require("../../services/reports/getAllTypesTransactions")

const getAllTransactions = async (req, res) => {
    const { id } = req.user;
    const { year, month } = req.query;
    
    const transactions = await getAllTypesTransactions(id, year, month)
    
    res.status(200).json({transactions})
};

module.exports = {
    getAllTransactions: ctrlWrapper(getAllTransactions),
};