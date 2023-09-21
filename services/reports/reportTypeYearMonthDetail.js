const db = require("../../db");

const reportTypeYearMonthDetail = async (id, type, year, month) => {
    
    const { rows } = await db.query(`
    select date, description, category, sum
    from transactions t 
    where 
        fk_user_id = $1
        and "type" = $2
        and  date_part('year', "date") = $3 
        and  date_part('month', "date") = $4 
    order by "date" desc
    `,
        [id, type, year, month])
    
    return rows
};

module.exports = reportTypeYearMonthDetail;