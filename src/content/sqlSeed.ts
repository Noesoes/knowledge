export const sqlSeed = `
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL
);

INSERT INTO departments (id, name, location) VALUES
  (1, 'Engineering', 'Remote'),
  (2, 'Sales', 'New York'),
  (3, 'Support', 'Austin');

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  manager_id INTEGER,
  salary REAL NOT NULL,
  hire_date TEXT NOT NULL
);

INSERT INTO employees (id, name, department_id, manager_id, salary, hire_date) VALUES
  (1, 'Ada Lovelace', 1, NULL, 145000, '2019-03-01'),
  (2, 'Grace Hopper', 1, 1, 132000, '2020-06-15'),
  (3, 'Linus Torvalds', 1, 1, 128000, '2021-01-10'),
  (4, 'Margaret Hamilton', 2, NULL, 110000, '2018-09-23'),
  (5, 'Tim Berners-Lee', 2, 4, 95000, '2022-02-14'),
  (6, 'Katherine Johnson', 3, NULL, 88000, '2020-11-05'),
  (7, 'Yukihiro Matsumoto', 3, 6, 76000, '2023-04-18');

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO customers (id, name, city, country) VALUES
  (1, 'Ada Lovelace', 'London', 'UK'),
  (2, 'Grace Hopper', 'Arlington', 'USA'),
  (3, 'Linus Torvalds', 'Helsinki', 'Finland'),
  (4, 'Margaret Hamilton', 'Indianapolis', 'USA'),
  (5, 'Tim Berners-Lee', 'London', 'UK'),
  (6, 'Katherine Johnson', 'Hampton', 'USA'),
  (7, 'Yukihiro Matsumoto', 'Osaka', 'Japan'),
  (8, 'Radia Perlman', 'Toronto', 'Canada');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO products (id, name, category, price) VALUES
  (1, 'Keyboard', 'Accessories', 45.00),
  (2, 'Monitor', 'Displays', 220.00),
  (3, 'Webcam', 'Accessories', 60.00),
  (4, 'Laptop Stand', 'Accessories', 35.00);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  employee_id INTEGER,
  order_date TEXT NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO orders (id, customer_id, employee_id, order_date, status) VALUES
  (101, 1, 5, '2024-01-12', 'shipped'),
  (102, 1, 5, '2024-02-03', 'completed'),
  (103, 2, 5, '2024-01-20', 'completed'),
  (104, 3, NULL, '2024-03-01', 'pending'),
  (105, 4, 5, '2024-02-18', 'completed'),
  (106, 4, 5, '2024-03-22', 'shipped'),
  (107, 6, NULL, '2024-01-29', 'completed'),
  (108, 8, NULL, '2024-02-10', 'completed'),
  (109, 8, NULL, '2024-03-05', 'cancelled');

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
  (1, 101, 2, 1, 220.00),
  (2, 101, 1, 1, 45.00),
  (3, 102, 3, 1, 60.00),
  (4, 103, 2, 2, 220.00),
  (5, 105, 4, 3, 35.00),
  (6, 106, 1, 1, 45.00),
  (7, 107, 2, 1, 220.00),
  (8, 108, 3, 1, 60.00);
`;

export const sqlSchemaPreview = [
  { table: "departments", columns: ["id", "name", "location"] },
  { table: "employees", columns: ["id", "name", "department_id", "manager_id", "salary", "hire_date"] },
  { table: "customers", columns: ["id", "name", "city", "country"] },
  { table: "products", columns: ["id", "name", "category", "price"] },
  { table: "orders", columns: ["id", "customer_id", "employee_id", "order_date", "status"] },
  { table: "order_items", columns: ["id", "order_id", "product_id", "quantity", "unit_price"] },
];
