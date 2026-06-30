import type { PathUnit } from "../lessonPathTypes";

export const jsAsyncUnits: PathUnit[] = [
  {
    id: "js-async",
    title: "Async JavaScript",
    color: "#c792ea",
    lessons: [
      {
        id: "jsas-1",
        title: "The event loop",
        content:
          "JavaScript runs on a single thread, but it handles asynchronous work (timers, network requests) without blocking by offloading it to the browser/runtime and processing callbacks via an event queue once the current synchronous code finishes.",
        question: "Why can JavaScript handle a network request without freezing the whole page, despite running on a single thread?",
        options: [
          "JavaScript secretly uses multiple threads",
          "The network request is handled outside the JS thread (by the browser), and a callback is placed in the event queue to run once the current synchronous code finishes",
          "Network requests in JavaScript always run instantly",
          "Browsers cache every possible network response",
        ],
        correctIndex: 1,
        explanation: "The event loop picks up callbacks from the queue only when the call stack is empty, allowing async work without blocking the main thread.",
      },
      {
        id: "jsas-2",
        title: "Promises",
        content:
          "A Promise represents a value that will be available in the future. It's either pending, fulfilled (with a value), or rejected (with an error). Chain `.then()` for success and `.catch()` for errors: `fetch(url).then(res => res.json()).catch(err => console.error(err))`.",
        question: "What does `.catch()` do in a Promise chain?",
        options: [
          "It cancels the Promise",
          "It handles a rejection (error) from any earlier step in the chain, similar to a catch block in try/catch",
          "It runs before .then() always",
          "It forces the Promise to resolve successfully",
        ],
        correctIndex: 1,
        explanation: ".catch() is the Promise equivalent of a catch block — it handles errors from anywhere earlier in the chain.",
      },
      {
        id: "jsas-3",
        title: "async / await",
        content:
          "`async` functions always return a Promise. Inside them, `await` pauses execution until the awaited Promise resolves, making async code read almost like synchronous code: `const data = await fetch(url).then(r => r.json())`. Wrap in try/catch to handle errors.",
        question: "What's the main readability benefit of `async/await` over chaining `.then()` calls?",
        options: [
          "async/await is faster than .then()",
          "async/await lets you write asynchronous code that reads top-to-bottom like synchronous code, without deeply nested .then() chains",
          "async/await doesn't require Promises",
          ".then() doesn't actually work without async/await",
        ],
        correctIndex: 1,
        explanation: "Flattening async logic into sequential-looking code eliminates callback/then nesting and makes error handling straightforward with try/catch.",
      },
      {
        id: "jsas-4",
        title: "fetch: making HTTP requests",
        content:
          "`fetch(url)` returns a Promise that resolves to a Response. The response body isn't automatically parsed — you call `.json()` (or `.text()`) on it, which is also async: `const res = await fetch(url); const data = await res.json()`. Always check `res.ok` before parsing.",
        question: "Why do you need to call `await res.json()` as a separate step after `await fetch(url)`?",
        options: [
          "fetch() automatically parses the response for you",
          "Parsing the response body is itself asynchronous (it streams the body), so it returns a Promise that you also need to await",
          "res.json() only works with GET requests",
          "You can skip it if you know the response is JSON",
        ],
        correctIndex: 1,
        explanation: "fetch() resolves as soon as headers arrive, not when the full body is received — reading the body is a second async step.",
      },
      {
        id: "jsas-5",
        title: "Promise.all for parallel requests",
        content:
          "`Promise.all([p1, p2, p3])` runs all Promises in parallel and resolves when all complete, returning an array of results. If any one rejects, the whole thing rejects. Use it when you have multiple independent async operations and want them to run simultaneously.",
        question: "Why use `Promise.all([fetchA(), fetchB()])` instead of `await fetchA(); await fetchB();`?",
        options: [
          "Promise.all is required for all async code",
          "Promise.all runs both requests in parallel, so total wait time ≈ the slower request, while awaiting sequentially waits for each to finish before starting the next",
          "await fetchA(); await fetchB(); runs them simultaneously anyway",
          "Promise.all can only handle exactly 2 Promises",
        ],
        correctIndex: 1,
        explanation: "Sequential awaits add latency; Promise.all fires all requests simultaneously and waits only as long as the slowest one.",
      },
    ],
  },
];

export const allJsAsyncLessons = jsAsyncUnits.flatMap((u) => u.lessons);
