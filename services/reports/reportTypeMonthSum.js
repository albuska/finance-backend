const db = require("../../db");

const reportTypeMonthSum = async (id, type) => {
    const { rows } = await db.query(`
        select date_trunc('month', "date") as month ,  sum(sum) as total_sum
        from transactions t 
        where fk_user_id=$1 and "type"=$2
        group by month
        order by month`,
        [id, type]);
    
    return rows;
    
};

module.exports = reportTypeMonthSum;