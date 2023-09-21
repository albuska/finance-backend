const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");

const summaryIncome = async (req, res) => {
    const { id } = req.user;

    const { rows } = await db.query(`
    select date_trunc('month', "date") as mounth ,  sum(sum) as total_sum
    from transactions t 
    where "type"='income' and fk_user_id=$1
    group by mounth
    order by mounth`,
        [id]);
    
    res.status(200).json({
        rows
    })

};

module.exports = {
    summaryIncome: ctrlWrapper(summaryIncome),
};