create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    balance NUMERIC(10, 2)
);

create TABLE transaction(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    sum NUMERIC(10, 2) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id)
);

