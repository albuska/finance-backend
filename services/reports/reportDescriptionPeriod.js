const db = require("../../db");

const reportDescriptionPeriod = async (id, type, category, year, month) => {
    const { rows } = await db.query(`
        SELECT
            description, SUM(sum) as total_sum
        FROM
            transactions t
        WHERE  
            fk_user_id = $1
            AND "type" = $2
            AND "category" = $3
            AND  date_part('year', "date") = $4 
            AND  date_part('month', "date") = $5
        GROUP BY description
        ORDER BY total_sum DESC
        LIMIT 10`,
            [id, type, category, year, month]);
    
    return rows;
    
};

module.exports = reportDescriptionPeriod;