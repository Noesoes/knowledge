import type { PathUnit } from "../lessonPathTypes";

export const typescriptBasicsUnits: PathUnit[] = [
  {
    id: "typescript-basics",
    title: "TypeScript Basics",
    color: "#5b9dff",
    lessons: [
      {
        id: "tsb-1",
        title: "Why TypeScript?",
        content:
          "TypeScript adds static types to JavaScript. The types only exist at development/compile time — the output is plain JavaScript. The benefit: the compiler and your editor catch type mismatches (passing a string where a number is expected) before the code runs, instead of discovering them as runtime bugs.",
        question: "What's the main practical benefit of TypeScript's type checking compared to plain JavaScript?",
        options: [
          "TypeScript programs run faster than JavaScript",
          "Type errors are caught at compile time in your editor, before the code runs — instead of appearing as runtime crashes or bugs in production",
          "TypeScript adds new runtime features JavaScript doesn't have",
          "TypeScript is required for all modern web development",
        ],
        correctIndex: 1,
        explanation: "Catching mismatches before runtime is the core value — the earlier a bug is caught, the cheaper it is to fix.",
      },
      {
        id: "tsb-2",
        title: "Basic types and annotations",
        content:
          "Type annotations use a colon: `let count: number = 0`, `function greet(name: string): string { ... }`. Common primitives: `string`, `number`, `boolean`. Arrays: `string[]` or `Array<string>`. Optional properties/params use `?`: `function foo(x?: number) {}`.",
        question: "In TypeScript, what does the `?` in `function log(message?: string)` mean?",
        options: [
          "The function might not exist",
          "The `message` parameter is optional — the function can be called with or without it, and TypeScript treats the type as `string | undefined`",
          "The return type is unknown",
          "It's a ternary operator",
        ],
        correctIndex: 1,
        explanation: "Optional parameters (`?`) can be omitted at call sites; TypeScript widens their type to `T | undefined` inside the function.",
      },
      {
        id: "tsb-3",
        title: "Interfaces and type aliases",
        content:
          "Both describe the shape of an object. `interface User { id: number; name: string }` and `type User = { id: number; name: string }` are often interchangeable. A key difference: interfaces can be extended with `extends` and reopened (declaration merging); types can express unions and intersections more flexibly.",
        question: "What's a key difference between an `interface` and a `type` alias in TypeScript?",
        options: [
          "type aliases can't describe objects, only primitives",
          "Interfaces support declaration merging (multiple declarations of the same name merge together) and are more natural for defining object shapes that get extended; type aliases are more flexible for unions and computed types",
          "interface and type are completely identical in all cases",
          "Interfaces run slower at runtime",
        ],
        correctIndex: 1,
        explanation: "In practice both work for most object shapes; interfaces have declaration merging which makes them better for library/API contracts that others extend.",
      },
      {
        id: "tsb-4",
        title: "Union and literal types",
        content:
          "A union type says a value can be one of several types: `type Status = 'loading' | 'success' | 'error'`. TypeScript then enforces you handle all possible values. Narrowing (e.g. checking `if (status === 'loading')`) lets you work with the specific type inside that branch.",
        question: "What does TypeScript's type narrowing let you do inside an `if (typeof x === 'string')` block?",
        options: [
          "Nothing special — TypeScript ignores runtime checks",
          "TypeScript knows `x` is specifically a `string` within that block, so it allows string-only methods like `.toUpperCase()` without error",
          "It converts x to a string permanently",
          "It only works with numbers, not strings",
        ],
        correctIndex: 1,
        explanation: "Narrowing uses the runtime check as evidence — TypeScript refines the type within the branch so you get correct autocomplete and type-safety.",
      },
      {
        id: "tsb-5",
        title: "Generics basics",
        content:
          "Generics let you write reusable code that works with different types while still being type-safe: `function first<T>(arr: T[]): T { return arr[0]; }` works on any array and returns the correct element type. The `T` is a type parameter that gets filled in at the call site.",
        question: "What problem do generics solve that using `any` doesn't?",
        options: [
          "Generics run faster than any",
          "Generics preserve the specific type through the function — the return type is known — while `any` discards type information, removing all type safety for the result",
          "any is forbidden in TypeScript so generics are required",
          "Generics only work with arrays",
        ],
        correctIndex: 1,
        explanation: "Using `any` throws away type info; a generic preserves it, so callers know the return type matches the input type.",
      },
    ],
  },
];

export const allTypescriptBasicsLessons = typescriptBasicsUnits.flatMap((u) => u.lessons);
