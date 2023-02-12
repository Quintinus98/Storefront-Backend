CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100),
    quantity integer,
    status VARCHAR(64),
    user_id bigint REFERENCES users(id)
);