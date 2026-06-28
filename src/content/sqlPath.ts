export interface SqlExecLesson {
  type: "sql";
  id: string;
  title: string;
  body: string; // lightweight markdown, rendered by Lesson component
  task: string;
  starter?: string;
  solution: string;
  checks: RegExp[];
  hint?: string;
}

export interface McLesson {
  type: "mc";
  id: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FillLesson {
  type: "fill";
  id: string;
  title: string;
  promptHtml: string;
  before: string;
  after: string;
  answers: string[]; // case-insensitive accepted answers
  explanation: string;
}

export type SqlLesson = SqlExecLesson | McLesson | FillLesson;

export interface SqlUnit {
  id: string;
  title: string;
  color: string;
  lessons: SqlLesson[];
}

export const sqlUnits: SqlUnit[] = [
  {
    id: "intro",
    title: "Introduction",
    color: "#5b9dff",
    lessons: [
      {
        type: "sql",
        id: "first-select",
        title: "Your First Query",
        body: `### SELECT — read data out of a table\n\nA database stores data in **tables**: rows are records, columns are attributes. \`SELECT\` reads data back out.\n\n\`\`\`sql\nSELECT * FROM customers;        -- every column, every row\nSELECT name, city FROM customers; -- only the columns you ask for\n\`\`\``,
        task: "Select the name and country columns from the customers table.",
        starter: "SELECT ",
        solution: "SELECT name, country FROM customers;",
        checks: [/select/i, /name/i, /country/i, /from\s+customers/i],
        hint: "SELECT name, country FROM customers;",
      },
      {
        type: "mc",
        id: "what-is-sql-check",
        title: "Quick Check",
        question: "Which keyword tells the database which table to read from?",
        options: ["SELECT", "FROM", "TABLE", "WHERE"],
        correctIndex: 1,
        explanation: "SELECT picks the columns you want back; FROM picks the table they come from.",
      },
      {
        type: "sql",
        id: "limit-rows",
        title: "Limiting Results",
        body: `### LIMIT — cap how many rows come back\n\n\`\`\`sql\nSELECT * FROM products LIMIT 2;\n\`\`\`\nUseful when you just want a quick peek at a big table.`,
        task: "Select all columns from products, but only return the first 2 rows.",
        starter: "SELECT * FROM products",
        solution: "SELECT * FROM products LIMIT 2;",
        checks: [/select/i, /from\s+products/i, /limit\s+2/i],
        hint: "Add LIMIT 2 to the end of the query.",
      },
    ],
  },
  {
    id: "filtering",
    title: "Filtering",
    color: "#3ecf8e",
    lessons: [
      {
        type: "sql",
        id: "where-basic",
        title: "Filtering with WHERE",
        body: `### WHERE — keep only the rows you want\n\n\`\`\`sql\nSELECT * FROM employees WHERE department_id = 1;\nSELECT * FROM employees WHERE salary > 100000;\n\`\`\`\nYou can combine conditions with **AND** / **OR**.`,
        task: "Find all employees in department 1 with a salary greater than 130000.",
        starter: "SELECT name, salary\nFROM employees\nWHERE ",
        solution: "SELECT name, salary FROM employees WHERE department_id = 1 AND salary > 130000;",
        checks: [/select/i, /from\s+employees/i, /where/i, /department_id\s*=\s*1/i, /salary\s*>\s*130000/i, /and/i],
        hint: "Combine two conditions with AND: department_id = 1 AND salary > 130000.",
      },
      {
        type: "fill",
        id: "where-fill",
        title: "Quick Check",
        promptHtml: "Fill in the missing keyword that filters rows:",
        before: "SELECT name FROM employees ",
        after: " salary > 90000;",
        answers: ["where"],
        explanation: "WHERE filters which rows come back, based on a condition.",
      },
      {
        type: "sql",
        id: "like-in-between",
        title: "LIKE, IN, BETWEEN",
        body: `### Pattern and set matching\n\n\`\`\`sql\nSELECT * FROM customers WHERE country IN ('UK', 'USA');\nSELECT * FROM products WHERE price BETWEEN 30 AND 60;\nSELECT * FROM customers WHERE name LIKE 'A%';   -- starts with A\n\`\`\``,
        task: "Find all products priced between 30 and 60 (inclusive).",
        starter: "SELECT * FROM products\nWHERE ",
        solution: "SELECT * FROM products WHERE price BETWEEN 30 AND 60;",
        checks: [/select/i, /from\s+products/i, /between\s+30\s+and\s+60/i],
        hint: "price BETWEEN 30 AND 60",
      },
      {
        type: "sql",
        id: "order-limit",
        title: "ORDER BY & LIMIT",
        body: `### Sorting results\n\n\`\`\`sql\nSELECT * FROM employees ORDER BY salary DESC LIMIT 3;  -- top 3 highest paid\n\`\`\``,
        task: "Return the 3 highest-paid employees, sorted by salary descending.",
        starter: "SELECT name, salary FROM employees\n",
        solution: "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;",
        checks: [/select/i, /from\s+employees/i, /order\s+by\s+salary\s+desc/i, /limit\s+3/i],
        hint: "ORDER BY salary DESC LIMIT 3",
      },
    ],
  },
  {
    id: "aggregation",
    title: "Aggregation",
    color: "#c792ea",
    lessons: [
      {
        type: "sql",
        id: "aggregate-functions",
        title: "Aggregate Functions",
        body: `### Collapsing many rows into one number\n\n\`\`\`sql\nSELECT COUNT(*) FROM orders;\nSELECT SUM(salary) FROM employees;\nSELECT AVG(price) FROM products;\n\`\`\``,
        task: "Return the total number of rows in the orders table.",
        starter: "SELECT ",
        solution: "SELECT COUNT(*) FROM orders;",
        checks: [/select/i, /count\(\*\)/i, /from\s+orders/i],
        hint: "SELECT COUNT(*) FROM orders;",
      },
      {
        type: "sql",
        id: "group-by",
        title: "GROUP BY",
        body: `### One result per group\n\n\`\`\`sql\nSELECT department_id, COUNT(*) AS headcount\nFROM employees\nGROUP BY department_id;\n\`\`\`\nWithout GROUP BY, an aggregate collapses the *entire* table into one row.`,
        task: "Return each department_id from employees along with how many employees are in it.",
        starter: "SELECT department_id, COUNT(*)\nFROM employees\n",
        solution: "SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id;",
        checks: [/select/i, /count\(\*\)/i, /from\s+employees/i, /group\s+by\s+department_id/i],
        hint: "GROUP BY department_id",
      },
      {
        type: "mc",
        id: "group-by-check",
        title: "Quick Check",
        question: "What does GROUP BY do?",
        options: [
          "Removes duplicate rows",
          "Produces one aggregated result per distinct value in the grouped column(s)",
          "Sorts rows alphabetically",
          "Deletes rows that don't match a condition",
        ],
        correctIndex: 1,
        explanation: "GROUP BY buckets rows by shared column values so aggregate functions compute one result per bucket.",
      },
      {
        type: "sql",
        id: "having",
        title: "HAVING",
        body: `### Filtering aggregated groups\n\nWHERE filters rows *before* grouping. HAVING filters groups *after* aggregation:\n\n\`\`\`sql\nSELECT department_id, SUM(salary) AS total_payroll\nFROM employees\nGROUP BY department_id\nHAVING SUM(salary) > 200000;\n\`\`\``,
        task: "Return each department_id and total salary from employees, only for departments whose total salary exceeds 200000.",
        starter: "SELECT department_id, SUM(salary)\nFROM employees\nGROUP BY department_id\n",
        solution: "SELECT department_id, SUM(salary) AS total_payroll FROM employees GROUP BY department_id HAVING SUM(salary) > 200000;",
        checks: [/select/i, /sum\(salary\)/i, /group\s+by\s+department_id/i, /having/i, /200000/],
        hint: "HAVING SUM(salary) > 200000",
      },
    ],
  },
  {
    id: "joins",
    title: "Joins",
    color: "#ffb454",
    lessons: [
      {
        type: "sql",
        id: "inner-join",
        title: "INNER JOIN",
        body: `### Combining two tables\n\n\`\`\`sql\nSELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;\n\`\`\`\nOnly rows with a match in *both* tables come back.`,
        task: "Return each order's id and the matching customer's name from orders and customers.",
        starter: "SELECT orders.id, customers.name\nFROM orders\n",
        solution: "SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;",
        checks: [/select/i, /inner\s+join/i, /orders/i, /customers/i, /\bon\b/i],
        hint: "INNER JOIN customers ON orders.customer_id = customers.id",
      },
      {
        type: "fill",
        id: "join-fill",
        title: "Quick Check",
        promptHtml: "Fill in the join type that keeps only rows matching in both tables:",
        before: "SELECT * FROM orders ",
        after: " JOIN customers ON orders.customer_id = customers.id;",
        answers: ["inner"],
        explanation: "INNER JOIN excludes rows that don't have a match on both sides.",
      },
      {
        type: "sql",
        id: "left-join",
        title: "LEFT JOIN",
        body: `### Keeping everything from the left table\n\n\`\`\`sql\nSELECT customers.name, orders.id\nFROM customers\nLEFT JOIN orders ON customers.id = orders.customer_id;\n\`\`\`\nThis returns *every* customer, even ones with zero orders — unmatched columns come back NULL.`,
        task: "List every customer's name plus any order id, including customers with zero orders.",
        starter: "SELECT customers.name, orders.id\nFROM customers\n",
        solution: "SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;",
        checks: [/select/i, /left\s+join/i, /customers/i, /orders/i, /\bon\b/i],
        hint: "LEFT JOIN orders ON customers.id = orders.customer_id",
      },
      {
        type: "sql",
        id: "three-table-join",
        title: "Joining 3+ Tables",
        body: `### Chaining joins\n\n\`\`\`sql\nSELECT orders.id, products.name, order_items.quantity\nFROM orders\nJOIN order_items ON orders.id = order_items.order_id\nJOIN products ON order_items.product_id = products.id;\n\`\`\`\nEach JOIN adds one more related table to the result.`,
        task: "Return order id, product name, and quantity by joining orders, order_items, and products.",
        starter: "SELECT orders.id, products.name, order_items.quantity\nFROM orders\n",
        solution: "SELECT orders.id, products.name, order_items.quantity FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id;",
        checks: [/select/i, /join/i, /order_items/i, /products/i, /\bon\b/i],
        hint: "Join orders to order_items, then order_items to products.",
      },
    ],
  },
  {
    id: "subqueries",
    title: "Subqueries & CASE",
    color: "#ff8a8a",
    lessons: [
      {
        type: "sql",
        id: "subquery-basic",
        title: "Subqueries",
        body: `### A query inside a query\n\n\`\`\`sql\nSELECT name FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n\`\`\`\nThe inner query runs first and produces a value the outer query can use.`,
        task: "Find employees whose salary is greater than the average salary across all employees.",
        starter: "SELECT name FROM employees\nWHERE salary > (",
        solution: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
        checks: [/select/i, /from\s+employees/i, /salary\s*>/i, /\(\s*select\s+avg\(salary\)\s+from\s+employees\s*\)/i],
        hint: "WHERE salary > (SELECT AVG(salary) FROM employees)",
      },
      {
        type: "mc",
        id: "subquery-check",
        title: "Quick Check",
        question: "What runs first when a query contains a subquery in its WHERE clause?",
        options: [
          "The outer query",
          "The inner (sub)query — its result is used by the outer query",
          "Both run at the exact same time",
          "Neither runs unless wrapped in a transaction",
        ],
        correctIndex: 1,
        explanation: "The database evaluates the subquery first to get a value or set of values the outer query can filter against.",
      },
      {
        type: "sql",
        id: "case-expr",
        title: "CASE Expressions",
        body: `### Conditional logic inside a query\n\n\`\`\`sql\nSELECT name,\n  CASE\n    WHEN salary > 120000 THEN 'senior'\n    ELSE 'standard'\n  END AS tier\nFROM employees;\n\`\`\``,
        task: "Select each employee's name and a column 'tier' that is 'senior' if salary > 120000, else 'standard'.",
        starter: "SELECT name,\n  CASE\n    WHEN salary > 120000 THEN ",
        solution: "SELECT name, CASE WHEN salary > 120000 THEN 'senior' ELSE 'standard' END AS tier FROM employees;",
        checks: [/select/i, /case/i, /when\s+salary\s*>\s*120000/i, /then/i, /else/i, /end/i],
        hint: "CASE WHEN salary > 120000 THEN 'senior' ELSE 'standard' END AS tier",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    color: "#52d4d0",
    lessons: [
      {
        type: "sql",
        id: "insert-update-delete",
        title: "INSERT, UPDATE, DELETE",
        body: `### Writing data\n\n\`\`\`sql\nINSERT INTO customers (name, city, country) VALUES ('New Person', 'Berlin', 'Germany');\nUPDATE customers SET city = 'Paris' WHERE id = 1;\nDELETE FROM customers WHERE id = 99;\n\`\`\`\n**Always pair UPDATE/DELETE with a WHERE clause** — omitting it touches every row.`,
        task: "Insert a new customer named 'Ship It' from 'Berlin', 'Germany' into the customers table.",
        starter: "INSERT INTO customers (name, city, country) VALUES (",
        solution: "INSERT INTO customers (name, city, country) VALUES ('Ship It', 'Berlin', 'Germany');",
        checks: [/insert\s+into\s+customers/i, /ship it/i, /berlin/i, /germany/i, /values/i],
        hint: "INSERT INTO customers (name, city, country) VALUES ('Ship It', 'Berlin', 'Germany');",
      },
      {
        type: "sql",
        id: "union",
        title: "UNION",
        body: `### Stacking results from two queries\n\n\`\`\`sql\nSELECT name FROM customers\nUNION\nSELECT name FROM employees;\n\`\`\`\nUNION combines rows from two SELECTs with the same column shape, removing duplicates (UNION ALL keeps duplicates).`,
        task: "Return a combined list of names from both customers and employees using UNION.",
        starter: "SELECT name FROM customers\n",
        solution: "SELECT name FROM customers UNION SELECT name FROM employees;",
        checks: [/select\s+name\s+from\s+customers/i, /union/i, /select\s+name\s+from\s+employees/i],
        hint: "SELECT name FROM customers UNION SELECT name FROM employees;",
      },
      {
        type: "fill",
        id: "union-fill",
        title: "Quick Check",
        promptHtml: "Fill in the keyword that stacks two SELECT results and removes duplicates:",
        before: "SELECT name FROM customers ",
        after: " SELECT name FROM employees;",
        answers: ["union"],
        explanation: "UNION combines two result sets vertically and removes duplicate rows; UNION ALL keeps them.",
      },
      {
        type: "sql",
        id: "window-functions",
        title: "Window Functions",
        body: `### Ranking without collapsing rows\n\n\`\`\`sql\nSELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS salary_rank\nFROM employees;\n\`\`\`\nUnlike GROUP BY, window functions keep every row while adding a computed column based on a window of rows.`,
        task: "Select name, salary, and a RANK() OVER (ORDER BY salary DESC) column called salary_rank from employees.",
        starter: "SELECT name, salary,\n  RANK() OVER (",
        solution: "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS salary_rank FROM employees;",
        checks: [/select/i, /rank\(\)\s+over\s*\(\s*order\s+by\s+salary\s+desc\s*\)/i, /from\s+employees/i],
        hint: "RANK() OVER (ORDER BY salary DESC) AS salary_rank",
      },
      {
        type: "sql",
        id: "sandbox",
        title: "Free-Play Sandbox",
        body: `### You've covered the core of SQL\n\nUse this space to write any query you want against the full schema — explore, break things, try ideas. There's no wrong answer here.`,
        task: "Write any query against the schema on the right.",
        starter: "SELECT * FROM employees;",
        solution: "SELECT * FROM employees;",
        checks: [/select/i],
        hint: "Anything that starts with SELECT and runs without an error passes this one.",
      },
    ],
  },
];

export const allSqlLessons: SqlLesson[] = sqlUnits.flatMap((u) => u.lessons);
