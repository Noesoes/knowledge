import type { PathUnit } from "../lessonPathTypes";

export const sqlAdvancedUnits: PathUnit[] = [
  {
    id: "sql-advanced",
    title: "Advanced SQL",
    color: "#ff8a8a",
    lessons: [
      {
        id: "sqladv-1",
        title: "Window functions: ROW_NUMBER and RANK",
        content:
          "Window functions compute a value across a set of rows related to the current row, without collapsing them like GROUP BY does. `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` numbers employees within each department by salary, while still returning every row.",
        question: "How does a window function like `RANK() OVER (...)` differ from a regular `GROUP BY` aggregate?",
        options: [
          "They're identical, just different syntax for the same result",
          "A window function computes a per-row value across a related set of rows while still returning every individual row, instead of collapsing rows into one summary row per group",
          "Window functions can only be used with DELETE statements",
          "GROUP BY is always faster than window functions",
        ],
        correctIndex: 1,
        explanation: "Window functions preserve row-level detail while still computing aggregate-like context per row — GROUP BY discards that detail.",
      },
      {
        id: "sqladv-2",
        title: "Common Table Expressions (CTEs)",
        content:
          "A CTE (`WITH recent_orders AS (SELECT ...) SELECT * FROM recent_orders WHERE ...`) names a temporary result set you can reference later in the query, making complex queries with multiple steps far more readable than deeply nested subqueries.",
        question: "What's the main readability benefit of a CTE over a deeply nested subquery?",
        options: [
          "CTEs run on a separate database server",
          "A CTE gives a name to an intermediate result, letting you build a query in clear, readable steps instead of nesting subqueries inside each other",
          "CTEs eliminate the need for JOINs",
          "CTEs are only usable in DELETE statements",
        ],
        correctIndex: 1,
        explanation: "Naming an intermediate step and referencing it later reads top-to-bottom, unlike subqueries nested several levels deep.",
      },
      {
        id: "sqladv-3",
        title: "Reading a query execution plan",
        content:
          "`EXPLAIN` (or `EXPLAIN ANALYZE`) shows how the database actually plans to execute a query — whether it uses an index scan or a full table scan, the estimated number of rows, and the order joins happen in. It's the primary tool for diagnosing a slow query.",
        question: "If `EXPLAIN` shows a 'sequential scan' on a large table for a query filtering on one column, what does that suggest?",
        options: [
          "The query is already perfectly optimized",
          "The database is likely scanning every row instead of using an index, which an index on that column could speed up",
          "The table is corrupted and needs to be rebuilt",
          "Sequential scans are always faster than index scans",
        ],
        correctIndex: 1,
        explanation: "A sequential scan reading every row on a large filtered query is a common red flag that a missing index could fix.",
      },
      {
        id: "sqladv-4",
        title: "Transactions and isolation basics",
        content:
          "A transaction groups multiple statements so they either all succeed (`COMMIT`) or all roll back (`ROLLBACK`) together — critical for operations like transferring money between two accounts, where a partial failure would leave data inconsistent.",
        question: "Why wrap a 'transfer $100 from account A to account B' operation (debit + credit) in a single transaction?",
        options: [
          "Transactions make the two updates run in parallel",
          "If the credit step fails after the debit succeeds, the transaction rolls back both, preventing money from disappearing",
          "Transactions are only relevant for SELECT statements",
          "It has no effect on data consistency",
        ],
        correctIndex: 1,
        explanation: "Atomicity guarantees both halves of a transfer succeed or neither does, avoiding a state where money vanished mid-operation.",
      },
      {
        id: "sqladv-5",
        title: "Running totals with aggregate window functions",
        content:
          "`SUM(amount) OVER (ORDER BY date)` computes a running total as it walks through ordered rows, useful for cumulative sales, balances over time, etc. — something a plain `SUM()` with `GROUP BY` can't produce since it would collapse all rows into one total.",
        question: "Why can't a plain `SUM(amount) GROUP BY` produce a 'running total per day' column alongside each row?",
        options: [
          "GROUP BY collapses rows into one summary row per group, losing the per-row running progression that a window function preserves",
          "SUM() can only be used once per query",
          "Running totals require a separate programming language entirely",
          "GROUP BY and window functions are exactly the same thing",
        ],
        correctIndex: 0,
        explanation: "A windowed SUM keeps every row while accumulating a running value in order, which GROUP BY's row-collapsing can't do.",
      },
    ],
  },
];

export const allSqlAdvancedLessons = sqlAdvancedUnits.flatMap((u) => u.lessons);
