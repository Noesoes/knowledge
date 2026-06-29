import type { PathUnit } from "../lessonPathTypes";

export const pythonPerformanceUnits: PathUnit[] = [
  {
    id: "python-performance",
    title: "Performance & Best Practices",
    color: "#c792ea",
    lessons: [
      {
        id: "pyperf-1",
        title: "Generators and lazy evaluation",
        content:
          "A generator (using `yield`) produces values one at a time, on demand, instead of building the whole sequence in memory up front like a list does. `(x*x for x in range(1000000))` is a generator expression — nothing is computed until you iterate it.",
        question: "Why might you use a generator instead of a list to process a huge file line by line?",
        options: [
          "Generators are required by Python syntax for loops",
          "A generator yields one item at a time, so you never hold the whole dataset in memory at once",
          "Lists can't be iterated over",
          "Generators always run instantly with zero CPU cost",
        ],
        correctIndex: 1,
        explanation: "Lazy evaluation means only one item exists in memory at a time, which is critical for very large or unbounded data.",
      },
      {
        id: "pyperf-2",
        title: "Decorators",
        content:
          "A decorator wraps a function to add behavior without modifying its code: `@timer\\ndef slow_function(): ...` runs `timer`'s wrapping logic (like timing or logging) around the original function automatically.",
        question: "What problem do decorators solve?",
        options: [
          "They make functions run in parallel automatically",
          "They let you add reusable behavior (logging, timing, caching, auth checks) around a function without duplicating that logic inside every function",
          "They convert functions into classes",
          "They are required for every Python function to run",
        ],
        correctIndex: 1,
        explanation: "Decorators factor out cross-cutting behavior so it can be applied to many functions without repeating code in each one.",
      },
      {
        id: "pyperf-3",
        title: "Big O: why algorithm choice matters",
        content:
          "Checking if an item exists in a list is O(n) — it may scan every element. Checking if a key exists in a dict or set is O(1) on average thanks to hashing. As data grows, that difference can mean milliseconds vs. minutes.",
        question: "Why is `item in my_set` typically much faster than `item in my_list` for a large collection?",
        options: [
          "Sets are stored on a faster part of the disk",
          "Set membership checks use hashing for average O(1) lookup, while list membership checks scan elements one by one (O(n))",
          "Lists can only hold numbers",
          "There's no actual performance difference",
        ],
        correctIndex: 1,
        explanation: "Hash-based lookup avoids scanning every element, which is why sets/dicts vastly outperform lists for membership checks at scale.",
      },
      {
        id: "pyperf-4",
        title: "Profiling before optimizing",
        content:
          "Don't guess where your code is slow — measure it. Python's `cProfile` module (or simple timing with `time.perf_counter()`) shows exactly which functions consume the most time, so you optimize the actual bottleneck instead of a hunch.",
        question: "Why is profiling recommended before optimizing code for performance?",
        options: [
          "Profiling automatically rewrites slow code for you",
          "It identifies the actual bottleneck with data, preventing wasted effort optimizing code that wasn't actually slow",
          "Profiling is required by Python's syntax",
          "It makes the code run faster just by being imported",
        ],
        correctIndex: 1,
        explanation: "Intuition about 'slow code' is often wrong; profiling data tells you where time is actually being spent.",
      },
      {
        id: "pyperf-5",
        title: "Context managers (the `with` statement)",
        content:
          "`with open('file.txt') as f:` guarantees the file is closed automatically, even if an exception happens inside the block. This pattern — acquire a resource, guarantee cleanup — is what context managers are for.",
        question: "What's the main advantage of using `with open(...) as f:` instead of manually calling `f.close()` at the end?",
        options: [
          "It reads the file faster",
          "It guarantees the file is closed even if an exception is raised partway through, preventing resource leaks",
          "It automatically converts the file to JSON",
          "There's no real benefit, it's just shorter to type",
        ],
        correctIndex: 1,
        explanation: "Context managers run cleanup code (like closing a file) even when an exception interrupts the block, which manual calls can miss.",
      },
    ],
  },
];

export const allPythonPerformanceLessons = pythonPerformanceUnits.flatMap((u) => u.lessons);
