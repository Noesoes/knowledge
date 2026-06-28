export const sqlSeed = `
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO customers (id, name, email, country) VALUES
  (1, 'Ada Lovelace', 'ada@example.com', 'UK'),
  (2, 'Grace Hopper', 'grace@example.com', 'USA'),
  (3, 'Linus Torvalds', 'linus@example.com', 'Finland'),
  (4, 'Margaret Hamilton', 'margaret@example.com', 'USA'),
  (5, 'Tim Berners-Lee', 'tim@example.com', 'UK'),
  (6, 'Katherine Johnson', 'katherine@example.com', 'USA'),
  (7, 'Yukihiro Matsumoto', 'matz@example.com', 'Japan'),
  (8, 'Radia Perlman', 'radia@example.com', 'Canada');

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO orders (id, customer_id, total, status) VALUES
  (101, 1, 250.00, 'shipped'),
  (102, 1, 75.50, 'completed'),
  (103, 2, 1200.00, 'completed'),
  (104, 3, 40.00, 'pending'),
  (105, 4, 899.99, 'completed'),
  (106, 4, 15.00, 'shipped'),
  (107, 6, 300.00, 'completed'),
  (108, 8, 60.00, 'completed'),
  (109, 8, 20.00, 'cancelled');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO products (id, name, price) VALUES
  (1, 'Keyboard', 45.00),
  (2, 'Monitor', 220.00),
  (3, 'Webcam', 60.00),
  (4, 'Laptop Stand', 35.00);
`;

export const sqlSchemaPreview = [
  {
    table: "customers",
    columns: ["id", "name", "email", "country"],
  },
  {
    table: "orders",
    columns: ["id", "customer_id", "total", "status"],
  },
  {
    table: "products",
    columns: ["id", "name", "price"],
  },
];
