import type { PathUnit } from "../lessonPathTypes";

export const sqlJoinsUnits: PathUnit[] = [
  {
    id: "joins-deep-dive",
    title: "Joins Deep Dive",
    color: "#c792ea",
    lessons: [
      {
        id: "sqlj-1",
        title: "INNER JOIN vs LEFT JOIN",
        content:
          "INNER JOIN only returns rows that have a match in both tables. LEFT JOIN returns every row from the left table, with NULLs filled in for unmatched columns from the right table — useful when you want to keep rows even if they have no related record.",
        question: "If you LEFT JOIN customers to orders, what happens to a customer with zero orders?",
        options: [
          "They're excluded from the results entirely",
          "They still appear once, with NULLs in the order-related columns",
          "The query throws an error",
          "They appear once per other customer in the table",
        ],
        correctIndex: 1,
        explanation: "LEFT JOIN guarantees every left-table row appears, filling unmatched right-table columns with NULL.",
      },
      {
        id: "sqlj-2",
        title: "Joining on multiple conditions",
        question: "What does `JOIN b ON a.id = b.a_id AND a.year = b.year` do differently from a single-condition join?",
        options: [
          "It joins twice as many rows automatically",
          "It only matches rows where both conditions hold, narrowing the join to rows aligned on id and year",
          "It's invalid SQL syntax",
          "AND inside ON is ignored by every database",
        ],
        correctIndex: 1,
        explanation: "Multiple ON conditions combined with AND require all of them to be true for rows to be matched together.",
      },
      {
        id: "sqlj-3",
        title: "Self joins",
        content:
          "A self join joins a table to itself, useful for comparing rows within the same table — e.g. finding employees and their managers when both are stored in the same employees table with a manager_id column referencing employees.id.",
        question: "When would you use a self join?",
        options: [
          "Never, it's not valid SQL",
          "When rows in a table need to be compared to or related to other rows in that same table",
          "Only when a table has just one column",
          "Only for deleting duplicate rows",
        ],
        correctIndex: 1,
        explanation: "Self joins let you relate rows in the same table, like employees to their own managers.",
      },
      {
        id: "sqlj-4",
        title: "UNION vs JOIN",
        question: "What's the difference between UNION and JOIN?",
        options: [
          "They're identical operations with different names",
          "JOIN combines columns from two tables side by side; UNION stacks rows from two queries vertically",
          "UNION only works with one table",
          "JOIN always returns fewer rows than UNION",
        ],
        correctIndex: 1,
        explanation: "JOIN widens rows by combining matched columns; UNION lengthens results by stacking compatible result sets.",
      },
      {
        id: "sqlj-5",
        title: "Avoiding duplicate rows from joins",
        content:
          "Joining a 'one' table to a 'many' table multiplies rows — e.g. joining orders to order_items returns one row per item, so an order with 3 items appears 3 times. If you then sum a column from the 'one' side without grouping carefully, you'll overcount.",
        question: "Why might joining orders to order_items cause an order's total to be overcounted if you're not careful?",
        options: [
          "Joins always return wrong totals",
          "The join produces one row per item, so any value taken from the orders side gets duplicated across those rows",
          "SQL doesn't support joins with totals",
          "It only happens with LEFT JOIN, never INNER JOIN",
        ],
        correctIndex: 1,
        explanation: "Row multiplication from a one-to-many join means values from the 'one' side repeat once per matching row, inflating naive sums.",
      },
    ],
  },
];

export const allSqlJoinsLessons = sqlJoinsUnits.flatMap((u) => u.lessons);
