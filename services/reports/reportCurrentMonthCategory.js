const db = require("../../db");

const reportCurrentMonthCategory = async (id, type) => {
    const { rows } = await db.query(`
        SELECT
            category, SUM(sum) as total_sum
        FROM
            transactions t
        WHERE  
            fk_user_id = $1
            AND "type" = $2
            AND "date" BETWEEN DATE_TRUNC('month',
            CURRENT_DATE) AND DATE_TRUNC('month',
            CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day'
        GROUP BY category
        ORDER BY total_sum`,
            [id, type]);
    
    return rows;
    
};

module.exports = reportCurrentMonthCategory;