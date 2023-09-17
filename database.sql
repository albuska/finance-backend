create TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    balance NUMERIC(10, 2)
);

create TABLE transactions(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    sum NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES users (id)
);

