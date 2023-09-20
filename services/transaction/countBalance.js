const db = require("../../db");

const countBalance = async (id) => {


    const { rows } = await db.query(`
        UPDATE users
        SET balance = (
            SELECT
                u.start_balance + COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.sum ELSE -t.sum END), 0) AS total_balance
            FROM
                users u
            LEFT JOIN
                transactions t ON u.id = t.fk_user_id
            WHERE
                u.id = $1
            GROUP BY
                u.start_balance
        )
        WHERE
            id = $1
        RETURNING
            balance`,
        [id]
    );

    const balance = rows[0];

    return balance;
};

module.exports = countBalance;