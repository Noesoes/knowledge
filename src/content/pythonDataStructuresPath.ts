import type { PathUnit } from "../lessonPathTypes";

export const pythonDataStructuresUnits: PathUnit[] = [
  {
    id: "data-structures",
    title: "Data Structures",
    color: "#ffb454",
    lessons: [
      {
        id: "pyds-1",
        title: "Lists vs tuples",
        content:
          "Lists ([1, 2, 3]) are mutable — you can change, add, or remove items. Tuples ((1, 2, 3)) are immutable — once created, their contents can't change. Use tuples for fixed groupings of values, lists for collections that grow or change.",
        question: "What's the key difference between a list and a tuple in Python?",
        options: [
          "Tuples can only hold numbers",
          "Lists are mutable (can change after creation); tuples are immutable",
          "There is no difference, they're aliases for the same type",
          "Tuples are always faster to search",
        ],
        correctIndex: 1,
        explanation: "Mutability is the defining difference — once a tuple is built, its elements can't be reassigned.",
      },
      {
        id: "pyds-2",
        title: "Dictionaries and hashing",
        content:
          "A dict stores key-value pairs and looks up values by key in roughly constant time, using a hash of the key internally. Keys must be hashable (immutable), so you can use strings, numbers, or tuples as keys, but not lists.",
        question: "Why can't you use a list as a dictionary key?",
        options: [
          "Lists are too big",
          "Lists are mutable and therefore not hashable, which dict keys require",
          "Python doesn't allow lists inside dicts at all",
          "Dictionaries only accept string keys",
        ],
        correctIndex: 1,
        explanation: "Dict keys must be hashable, and a value's hash must not change — mutable types like lists can't guarantee that.",
      },
      {
        id: "pyds-3",
        title: "Sets and uniqueness",
        question: "What happens when you add a duplicate value to a Python set?",
        options: [
          "It raises an error",
          "Nothing — the set silently ignores it, since sets only store unique values",
          "It doubles the value",
          "It converts the set into a list",
        ],
        correctIndex: 1,
        explanation: "Sets automatically enforce uniqueness — adding a value already present is a no-op.",
      },
      {
        id: "pyds-4",
        title: "List comprehensions",
        content: "`[x * 2 for x in nums if x > 0]` builds a new list by doubling each positive number in nums — a concise alternative to writing a for-loop with .append().",
        question: "What does `[n for n in range(10) if n % 2 == 0]` produce?",
        options: [
          "All odd numbers from 0 to 9",
          "All even numbers from 0 to 9 (0, 2, 4, 6, 8)",
          "The numbers 0 through 9 unchanged",
          "An empty list",
        ],
        correctIndex: 1,
        explanation: "The comprehension filters with `if n % 2 == 0`, keeping only even numbers from the range.",
      },
      {
        id: "pyds-5",
        title: "When to use a dataclass",
        question: "What's the main benefit of `@dataclass` over a plain class for storing structured data?",
        options: [
          "It makes the class run faster than any other class",
          "It auto-generates __init__, __repr__, and equality methods based on declared fields, reducing boilerplate",
          "It prevents the class from ever being modified",
          "It's required for any class with more than one attribute",
        ],
        correctIndex: 1,
        explanation: "@dataclass saves you from hand-writing constructor/repr/equality code for simple data-holding classes.",
      },
    ],
  },
];

export const allPythonDataStructuresLessons = pythonDataStructuresUnits.flatMap((u) => u.lessons);
