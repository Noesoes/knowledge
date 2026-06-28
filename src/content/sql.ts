import type { Course } from "../types";

export const sql: Course = {
  id: "sql",
  title: "SQL & Databases",
  tagline: "Almost every application stores data in a database — SQL is how you talk to it.",
  icon: "🗄️",
  description:
    "SQL (Structured Query Language) is how you read and write data in relational databases like PostgreSQL, MySQL, and SQLite. This course covers querying, filtering, joining, and aggregating data — skills used by backend devs, data analysts, and data scientists alike.",
  modules: [
    {
      id: "tables-and-select",
      title: "Tables and SELECT",
      summary: "How relational data is organized, and how to read it back out.",
      content: `
### Rows, columns, tables

A relational database stores data in **tables**, which look like spreadsheets: each **row** is one record (e.g., one customer), and each **column** is one attribute of that record (e.g., name, email, signup_date). A database is usually made of several related tables — \`customers\`, \`orders\`, \`products\` — linked together by shared IDs.

### SELECT — read data
\`\`\`sql
SELECT name, email FROM customers;
SELECT * FROM customers;             -- * means "all columns"
\`\`\`

### WHERE — filter rows
\`\`\`sql
SELECT * FROM customers WHERE country = 'Canada';
SELECT * FROM orders WHERE total > 100 AND status = 'shipped';
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
SELECT * FROM customers WHERE email LIKE '%@gmail.com';
\`\`\`

### ORDER BY and LIMIT
\`\`\`sql
SELECT * FROM orders ORDER BY total DESC LIMIT 10;   -- top 10 highest orders
\`\`\`

### A key mental model
SQL queries are usually read in this logical order even though they're *written* differently: **FROM** (which table) → **WHERE** (filter rows) → **SELECT** (which columns) → **ORDER BY** (sort) → **LIMIT** (cap results). Understanding this evaluation order explains a lot of SQL's quirks, like why you can't filter on a column alias inside WHERE.
      `,
      keyTakeaways: [
        "Relational databases organize data into tables of rows (records) and columns (attributes).",
        "SELECT chooses columns; WHERE filters rows; ORDER BY sorts; LIMIT caps the number of results.",
        "SQL is written as SELECT...FROM...WHERE but logically evaluated FROM → WHERE → SELECT → ORDER BY.",
        "LIKE with % wildcards lets you do partial text matches.",
      ],
      quiz: [
        {
          question: "What does a row represent in a database table?",
          options: [
            "A single column of data",
            "One individual record, e.g. one customer or one order",
            "The entire table",
            "A type of database error",
          ],
          correctIndex: 1,
          explanation: "Each row is one record; each column is one piece of data describing that record.",
        },
        {
          question: "Which clause filters which rows are returned, before selecting columns?",
          options: ["SELECT", "ORDER BY", "WHERE", "LIMIT"],
          correctIndex: 2,
          explanation: "WHERE filters rows based on a condition; it runs logically before the column selection happens.",
        },
        {
          question: "What does `WHERE email LIKE '%@gmail.com'` match?",
          options: [
            "Only the exact text '@gmail.com'",
            "Any email ending in '@gmail.com', regardless of what comes before it",
            "Any email containing the letter g",
            "Nothing — this is invalid SQL",
          ],
          correctIndex: 1,
          explanation: "% is a wildcard matching any sequence of characters, so this matches any string ending in @gmail.com.",
        },
      ],
    },
    {
      id: "joins",
      title: "JOINs — Combining Tables",
      summary: "How to pull related data out of multiple tables in a single query.",
      content: `
### Why JOINs exist

Relational databases avoid duplicating data by splitting it across tables — a \`customers\` table and a separate \`orders\` table, linked by a \`customer_id\` column in \`orders\` that refers back to the \`id\` in \`customers\`. A JOIN lets you query across that link and get combined results.

### INNER JOIN — only matching rows
\`\`\`sql
SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
\`\`\`
This returns only orders that have a matching customer (and vice versa). If an order's \`customer_id\` doesn't match any customer, that row is excluded.

### LEFT JOIN — keep everything from the left table
\`\`\`sql
SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
\`\`\`
This returns *every* customer, even ones with zero orders — for those, the order columns come back as \`NULL\`. LEFT JOIN is what you reach for when you specifically need to know about "things with no match," like customers who never ordered anything.

### A practical rule of thumb
If you want "only records that exist in both tables," use INNER JOIN. If you want "all records from table A, with details from table B where available," use LEFT JOIN (with A as the left table).

### Primary keys and foreign keys
A **primary key** uniquely identifies a row within its own table (\`customers.id\`). A **foreign key** is a column in one table that refers to a primary key in another (\`orders.customer_id\` referring to \`customers.id\`). This relationship is the backbone of relational design.
      `,
      keyTakeaways: [
        "JOINs combine rows from multiple tables based on a related column.",
        "INNER JOIN keeps only rows with a match in both tables.",
        "LEFT JOIN keeps all rows from the left table, filling in NULL where there's no match on the right.",
        "Primary keys uniquely identify rows; foreign keys reference a primary key in another table.",
      ],
      project:
        "Given a `students` table and an `enrollments` table (enrollments has a student_id foreign key), write a LEFT JOIN query that lists every student and the courses they're enrolled in, including students with zero enrollments.",
      quiz: [
        {
          question: "What's the key difference between INNER JOIN and LEFT JOIN?",
          options: [
            "They always return identical results",
            "INNER JOIN only returns matching rows from both tables; LEFT JOIN keeps all rows from the left table even without a match",
            "LEFT JOIN is faster but does the same thing as INNER JOIN",
            "INNER JOIN works on more than 2 tables, LEFT JOIN does not",
          ],
          correctIndex: 1,
          explanation: "INNER JOIN excludes unmatched rows entirely; LEFT JOIN preserves the left table's rows and fills unmatched columns with NULL.",
        },
        {
          question: "What is a foreign key?",
          options: [
            "A backup copy of the primary key",
            "A column in one table that refers to a primary key in another table, establishing a relationship",
            "A key used to encrypt the database",
            "A column that can never be NULL",
          ],
          correctIndex: 1,
          explanation: "Foreign keys are how relational databases express that a row in one table relates to a row in another.",
        },
      ],
    },
    {
      id: "aggregation",
      title: "GROUP BY and Aggregate Functions",
      summary: "Summarizing data: counts, sums, averages, grouped by category.",
      content: `
### Aggregate functions

These compute a single value from many rows:
\`\`\`sql
SELECT COUNT(*) FROM orders;                  -- total number of orders
SELECT SUM(total) FROM orders;                 -- total revenue
SELECT AVG(total) FROM orders;                  -- average order value
SELECT MAX(total), MIN(total) FROM orders;       -- highest and lowest order
\`\`\`

### GROUP BY — aggregate per category
Without GROUP BY, aggregates collapse the *entire* table into one row. GROUP BY lets you get one aggregate result *per group*:

\`\`\`sql
SELECT customer_id, COUNT(*) AS order_count, SUM(total) AS total_spent
FROM orders
GROUP BY customer_id;
\`\`\`
This returns one row per customer, with how many orders they placed and how much they spent in total.

### HAVING — filter on the aggregated result
WHERE filters rows *before* grouping; HAVING filters groups *after* aggregation:
\`\`\`sql
SELECT customer_id, SUM(total) AS total_spent
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 1000;     -- only customers who've spent over $1000
\`\`\`
You can't write \`WHERE SUM(total) > 1000\` — WHERE runs before the SUM exists, so SQL requires HAVING for filtering on aggregated values.

### Putting it together
A query can combine JOIN, WHERE, GROUP BY, and HAVING: join orders to customers, filter to a specific country with WHERE, group by customer, and use HAVING to only keep big spenders. This combination — filter, join, aggregate — covers the vast majority of real-world reporting queries.
      `,
      keyTakeaways: [
        "Aggregate functions (COUNT, SUM, AVG, MAX, MIN) collapse many rows into one summary value.",
        "GROUP BY produces one aggregate result per distinct value in the grouped column(s).",
        "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
        "Real reporting queries typically combine JOIN + WHERE + GROUP BY + HAVING.",
      ],
      project:
        "Write a query against an `orders` table (columns: id, customer_id, total, status) that returns each customer_id along with their total spend, but only for orders with status = 'completed', and only includes customers whose total spend exceeds $500.",
      quiz: [
        {
          question: "What does GROUP BY do?",
          options: [
            "Removes duplicate rows",
            "Produces one aggregated result per distinct value in the specified column(s)",
            "Sorts rows alphabetically",
            "Deletes rows that don't match a condition",
          ],
          correctIndex: 1,
          explanation: "GROUP BY buckets rows by shared column values so aggregate functions compute per-bucket results.",
        },
        {
          question: "Why can't you filter on an aggregate result using WHERE?",
          options: [
            "WHERE only works with text columns",
            "WHERE is evaluated before aggregation happens, so the aggregate value doesn't exist yet at that point",
            "WHERE is deprecated in modern SQL",
            "You actually can — HAVING is unnecessary",
          ],
          correctIndex: 1,
          explanation: "WHERE filters raw rows before GROUP BY runs; HAVING exists specifically to filter the aggregated groups afterward.",
        },
        {
          question: "What does `SELECT COUNT(*) FROM orders;` return?",
          options: [
            "The sum of all order totals",
            "The total number of rows in the orders table",
            "The number of columns in the orders table",
            "An error, because COUNT requires GROUP BY",
          ],
          correctIndex: 1,
          explanation: "COUNT(*) without GROUP BY collapses the whole table into a single row: the total row count.",
        },
      ],
    },
    {
      id: "modifying-data",
      title: "INSERT, UPDATE, DELETE, and Schema Basics",
      summary: "Writing data, not just reading it — and the basics of designing tables.",
      content: `
### Writing data
\`\`\`sql
INSERT INTO customers (name, email) VALUES ('Ada Lovelace', 'ada@example.com');

UPDATE customers SET email = 'ada@newdomain.com' WHERE id = 1;

DELETE FROM customers WHERE id = 1;
\`\`\`

**Always pair UPDATE and DELETE with a WHERE clause.** Running \`UPDATE customers SET email = 'x'\` with no WHERE updates every single row in the table — one of the most common and damaging real-world SQL mistakes.

### Creating tables
\`\`\`sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
- \`PRIMARY KEY\` marks the column that uniquely identifies each row
- \`NOT NULL\` means the column can't be left empty
- \`UNIQUE\` prevents duplicate values in that column
- \`DEFAULT\` provides a value automatically if none is given

### SQL injection — a security basics note
Never build SQL queries by directly concatenating user input into a string (\`"SELECT * FROM users WHERE name = '" + userInput + "'"\`). A malicious user could input text that changes the query's meaning entirely (SQL injection). Always use **parameterized queries** (placeholders that the database driver fills in safely), which every real database library supports.

### Transactions
A transaction groups multiple statements so they all succeed or all fail together (\`BEGIN\` ... \`COMMIT\`/\`ROLLBACK\`). This matters when, e.g., transferring money between two accounts: you never want the database to record the debit without also recording the credit.
      `,
      keyTakeaways: [
        "Always use WHERE with UPDATE and DELETE — omitting it affects every row in the table.",
        "CREATE TABLE defines columns and constraints like PRIMARY KEY, NOT NULL, and UNIQUE.",
        "Never concatenate raw user input into SQL strings — use parameterized queries to prevent SQL injection.",
        "Transactions (BEGIN/COMMIT/ROLLBACK) ensure a group of statements all succeed or all fail together.",
      ],
      quiz: [
        {
          question: "What happens if you run `UPDATE customers SET status = 'inactive';` with no WHERE clause?",
          options: [
            "Nothing happens, SQL requires a WHERE clause by default",
            "Only the first row is updated",
            "Every single row in the customers table gets updated",
            "It throws a syntax error",
          ],
          correctIndex: 2,
          explanation: "Without WHERE, UPDATE and DELETE apply to every row in the table — a frequent and costly real-world mistake.",
        },
        {
          question: "What is SQL injection?",
          options: [
            "A way to make queries run faster",
            "An attack where untrusted input is concatenated into a query, changing its intended meaning",
            "A type of database backup",
            "A SQL syntax error",
          ],
          correctIndex: 1,
          explanation: "SQL injection happens when raw, unsanitized user input is inserted directly into a query string, letting attackers manipulate the query.",
        },
        {
          question: "What does a database transaction guarantee?",
          options: [
            "Queries run faster",
            "A group of statements either all succeed together or all fail together",
            "Tables are automatically backed up",
            "Only one user can access the database at a time",
          ],
          correctIndex: 1,
          explanation: "Transactions provide atomicity — partial completion (e.g. debit without credit) is prevented.",
        },
      ],
    },
  ],
};
