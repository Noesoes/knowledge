import type { PathUnit } from "../lessonPathTypes";

export const sqlDesignUnits: PathUnit[] = [
  {
    id: "database-design",
    title: "Database Design",
    color: "#5b9dff",
    lessons: [
      {
        id: "sqld-1",
        title: "Primary keys",
        content:
          "A primary key uniquely identifies each row in a table — no two rows can share one, and it can't be NULL. Most tables use an auto-incrementing id column as their primary key.",
        question: "What must always be true of a primary key column?",
        options: [
          "It can repeat across multiple rows",
          "It must be unique for every row and can never be NULL",
          "It must always be named 'id'",
          "It must be a text column",
        ],
        correctIndex: 1,
        explanation: "Uniqueness and non-nullability are the defining requirements of a primary key — that's how rows stay identifiable.",
      },
      {
        id: "sqld-2",
        title: "Foreign keys & referential integrity",
        question: "What does a foreign key constraint enforce?",
        options: [
          "That a column's values must reference an existing row in another table",
          "That a table can have only one column",
          "That all queries run faster",
          "That a table cannot be deleted",
        ],
        correctIndex: 0,
        explanation: "Foreign keys prevent orphaned references — you can't insert a value that doesn't exist in the referenced table's key.",
      },
      {
        id: "sqld-3",
        title: "Normalization basics",
        content:
          "Normalization splits data into related tables to avoid storing the same fact redundantly. E.g. instead of repeating a customer's address on every order row, store it once in a customers table and reference it via customer_id.",
        question: "What problem does normalization primarily solve?",
        options: [
          "It makes databases run on more hardware",
          "It reduces redundant data, so updating a fact in one place doesn't require updating it everywhere it's duplicated",
          "It removes the need for primary keys",
          "It guarantees faster queries in all cases",
        ],
        correctIndex: 1,
        explanation: "Avoiding duplicated data means a single update keeps everything consistent, instead of risking stale copies.",
      },
      {
        id: "sqld-4",
        title: "Choosing data types",
        question: "Why would you store a price as a fixed-point DECIMAL type instead of a floating-point FLOAT?",
        options: [
          "FLOAT is always slower",
          "Floating-point types can introduce small rounding errors, which is dangerous for exact monetary values",
          "DECIMAL takes up less storage in every database",
          "There's no real difference between them",
        ],
        correctIndex: 1,
        explanation: "Floats trade exactness for range/speed, which can cause subtle off-by-a-cent rounding errors on money — DECIMAL avoids that.",
      },
      {
        id: "sqld-5",
        title: "Indexes and why they speed up reads",
        content:
          "An index is a separate data structure (often a B-tree) that lets the database find rows matching a column's value quickly, instead of scanning every row. Indexes speed up reads on that column but add a small cost to writes, since the index has to be updated too.",
        question: "What's the tradeoff of adding an index to a frequently-queried column?",
        options: [
          "Indexes have no downside at all",
          "Faster lookups on that column, at the cost of slightly slower writes since the index must be maintained",
          "Indexes make every column slower to read",
          "Indexes only work on primary keys",
        ],
        correctIndex: 1,
        explanation: "Indexes accelerate reads on the indexed column but every insert/update/delete now also has to update the index.",
      },
    ],
  },
];

export const allSqlDesignLessons = sqlDesignUnits.flatMap((u) => u.lessons);
