const db = require("../../db");

const reportCurrentMonthDescription = async (id, type, category) => {
    const { rows } = await db.query(`
        SELECT
            description, SUM(sum) as total_sum
        FROM
            transactions t
        WHERE  
            fk_user_id = $1
            AND "type" = $2
            AND "category" = $3
            AND "date" BETWEEN DATE_TRUNC('month',
            CURRENT_DATE) AND DATE_TRUNC('month',
            CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day'
        GROUP BY description
        ORDER BY total_sum DESC
        LIMIT 10`,
            [id, type, category]);
    
    return rows;
    
};

module.exports = reportCurrentMonthDescription;