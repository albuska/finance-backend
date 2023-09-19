CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    balance NUMERIC(10, 2)
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    date TIMESTAMPTZ NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255)NOT NULL,
    sum NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense'))NOT NULL,
    fk_user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (fk_user_id) REFERENCES users (id)
);

