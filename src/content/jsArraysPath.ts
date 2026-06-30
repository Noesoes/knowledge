import type { PathUnit } from "../lessonPathTypes";

export const jsArraysUnits: PathUnit[] = [
  {
    id: "js-arrays",
    title: "Arrays & Modern Syntax",
    color: "#3ecf8e",
    lessons: [
      {
        id: "jsarr-1",
        title: "map, filter, and reduce",
        content:
          "`map` transforms every element and returns a new array. `filter` returns only elements that pass a test. `reduce` folds an array into a single value. None of these mutate the original array — they return new ones.",
        question: "What does `[1, 2, 3, 4].filter(n => n > 2)` return?",
        options: ["[1, 2]", "[3, 4]", "true", "2"],
        correctIndex: 1,
        explanation: "filter returns a new array containing only elements for which the callback returns true — 3 and 4 are > 2.",
      },
      {
        id: "jsarr-2",
        title: "Destructuring assignments",
        content:
          "Destructuring unpacks values directly into variables: `const [first, second] = [10, 20]` or `const { name, age } = user`. You can rename: `const { name: userName } = user`, and set defaults: `const { role = 'guest' } = user`.",
        question: "What does `const { a, b } = { a: 1, b: 2, c: 3 }` result in?",
        options: [
          "An error because not all properties are destructured",
          "a = 1 and b = 2 — only the named properties are extracted; extra ones are ignored",
          "a = 1, b = 2, and c = 3 all become variables",
          "a and b are both undefined",
        ],
        correctIndex: 1,
        explanation: "Destructuring only extracts the named properties — extra ones on the object are silently ignored.",
      },
      {
        id: "jsarr-3",
        title: "Spread and rest operators",
        content:
          "The spread operator (`...`) expands an array/object into individual elements: `const combined = [...arr1, ...arr2]` merges arrays. Rest (`...rest`) in a function signature collects remaining arguments into an array: `function sum(...nums) {}`.",
        question: "What does `const merged = { ...objA, ...objB }` do when objA and objB have overlapping keys?",
        options: [
          "It throws an error for duplicate keys",
          "objB's values overwrite objA's for any shared keys, since objB is spread second",
          "objA always wins over objB",
          "The duplicate keys are removed entirely",
        ],
        correctIndex: 1,
        explanation: "Later spreads overwrite earlier ones for the same key — the order of spreading determines which value wins.",
      },
      {
        id: "jsarr-4",
        title: "Optional chaining and nullish coalescing",
        content:
          "`user?.address?.city` short-circuits to `undefined` instead of throwing if `user` or `address` is null/undefined. `??` returns the right side only when the left is `null` or `undefined`: `user.name ?? 'Anonymous'` (unlike `||`, it doesn't treat `0` or `''` as missing).",
        question: "Why is `value ?? 'default'` safer than `value || 'default'` when `value` could legitimately be `0` or `''`?",
        options: [
          "?? is newer so it always performs better",
          "?? only substitutes the default for null/undefined, while || also replaces falsy values like 0 and '' — which might be valid values you want to keep",
          "There's no difference between ?? and ||",
          "|| only works with strings",
        ],
        correctIndex: 1,
        explanation: "Nullish coalescing targets missing values specifically; logical OR can accidentally replace legitimate falsy values.",
      },
      {
        id: "jsarr-5",
        title: "Set and Map",
        content:
          "`Set` stores unique values — adding a duplicate has no effect. `Map` is like an object but any type can be a key (not just strings) and insertion order is preserved. `new Set([1,1,2,3])` gives `{1, 2, 3}`.",
        question: "Why might you use a `Set` instead of an array to track which items have been 'seen'?",
        options: [
          "Sets can only hold numbers",
          "Sets automatically enforce uniqueness and have O(1) `has()` lookup, while arrays require searching every element (O(n)) to check for membership",
          "Arrays can't hold duplicate values either",
          "Sets are always larger in memory than arrays",
        ],
        correctIndex: 1,
        explanation: "O(1) membership checks and automatic deduplication make Set the natural choice for tracking unique items.",
      },
    ],
  },
];

export const allJsArraysLessons = jsArraysUnits.flatMap((u) => u.lessons);
