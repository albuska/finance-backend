const { ctrlWrapper } = require("../../helpers"); 
const db = require("../../db");

const detailsBalance = async (req, res) => {
    const transactions = await db.query(`

    CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    sum NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    fk_user_id VARCHAR(255),
    FOREIGN KEY (fk_user_id) REFERENCES users (id)
);

    SELECT *
    FROM transactions
    `);

    console.log(transactions);

    res.status(200).json({transactions})
};

module.exports = {
    detailsBalance: ctrlWrapper(detailsBalance),
};