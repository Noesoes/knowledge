import type { PathUnit } from "../lessonPathTypes";

export const jsBasicsUnits: PathUnit[] = [
  {
    id: "js-basics",
    title: "JavaScript Basics",
    color: "#ffb454",
    lessons: [
      {
        id: "jsb-1",
        title: "Variables: let, const, and var",
        content:
          "`const` declares a value that won't be reassigned — prefer it by default. `let` is for values that will change. `var` is the old way with confusing scoping rules (function-scoped, not block-scoped) — avoid it in modern code.",
        question: "Why should you prefer `const` over `let` by default in modern JavaScript?",
        options: [
          "const runs faster than let at runtime",
          "It signals intent — this value won't be reassigned — making the code easier to reason about and preventing accidental reassignment",
          "let is only for strings",
          "const and let are identical in modern JavaScript",
        ],
        correctIndex: 1,
        explanation: "Using const by default makes the reader's job easier: if they see const, they know the binding won't change.",
      },
      {
        id: "jsb-2",
        title: "Functions: declarations vs arrow functions",
        content:
          "Function declarations (`function greet() {}`) are hoisted — you can call them before they appear in the file. Arrow functions (`const greet = () => {}`) are not hoisted and inherit `this` from the surrounding context instead of having their own — important for callbacks inside classes.",
        question: "What's a key behavioral difference between an arrow function and a regular function declaration?",
        options: [
          "Arrow functions can only return numbers",
          "Arrow functions don't have their own `this` — they inherit it from the surrounding scope, unlike regular functions which create their own `this`",
          "Arrow functions are always asynchronous",
          "There's no behavioral difference, only syntax",
        ],
        correctIndex: 1,
        explanation: "Arrow functions' lexical `this` is why they're preferred as callbacks inside class methods — they don't accidentally rebind `this`.",
      },
      {
        id: "jsb-3",
        title: "Objects and accessing properties",
        content:
          "An object is a collection of key-value pairs: `const user = { name: 'Alice', age: 30 }`. Access properties with dot notation (`user.name`) or bracket notation (`user['name']`). Bracket notation is needed when the key is dynamic or contains special characters.",
        question: "When would you need to use bracket notation (`obj['key']`) instead of dot notation (`obj.key`) to access a property?",
        options: [
          "You always need brackets; dot notation doesn't exist",
          "When the property name is stored in a variable, or contains characters that aren't valid in an identifier (like spaces or hyphens)",
          "Only when the value is a number",
          "Bracket notation is slower so it's never preferred",
        ],
        correctIndex: 1,
        explanation: "Dot notation requires the key to be a literal identifier; bracket notation accepts any string expression, including variables.",
      },
      {
        id: "jsb-4",
        title: "Arrays: creating and accessing",
        content:
          "Arrays store ordered lists: `const nums = [1, 2, 3]`. Access by zero-based index: `nums[0]` is `1`. Common methods: `.push()` adds to the end, `.pop()` removes from the end, `.length` gives the count, `.indexOf()` finds a value.",
        question: "What does `const arr = ['a', 'b', 'c']; arr[1]` evaluate to?",
        options: ["'a'", "'b'", "'c'", "undefined"],
        correctIndex: 1,
        explanation: "JavaScript arrays are zero-indexed — index 0 is 'a', index 1 is 'b', index 2 is 'c'.",
      },
      {
        id: "jsb-5",
        title: "Truthy, falsy, and loose vs strict equality",
        content:
          "JavaScript has 6 falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN` — everything else is truthy. `==` does type coercion (`0 == false` is true), while `===` checks value AND type (`0 === false` is false). Always use `===` in practice.",
        question: "Why does `0 == false` evaluate to `true` in JavaScript while `0 === false` evaluates to `false`?",
        options: [
          "== is a typo and shouldn't be used",
          "== coerces both sides to the same type before comparing, so false becomes 0; === compares value and type directly without coercion",
          "0 and false are the exact same value in JavaScript",
          "=== only works with numbers",
        ],
        correctIndex: 1,
        explanation: "Type coercion in == produces surprising results; === avoids this by requiring identical type and value.",
      },
    ],
  },
];

export const allJsBasicsLessons = jsBasicsUnits.flatMap((u) => u.lessons);
