const db = require("../../db");

const reportCategoryPeriod = async (id, type, year, month) => {
    const { rows } = await db.query(`
        SELECT
            category, SUM(sum) as total_sum
        FROM
            transactions t
        WHERE  
            fk_user_id = $1
            AND "type" = $2
            AND  date_part('year', "date") = $3 
            AND  date_part('month', "date") = $4
        GROUP BY category
        ORDER BY total_sum DESC`,
            [id, type, year, month]);
    
    return rows;
    
};

module.exports = reportCategoryPeriod;