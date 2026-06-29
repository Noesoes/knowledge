import type { PathUnit } from "../lessonPathTypes";

export const pythonDebuggingUnits: PathUnit[] = [
  {
    id: "errors-debugging",
    title: "Errors & Debugging",
    color: "#c792ea",
    lessons: [
      {
        id: "pydb-1",
        title: "try/except basics",
        content:
          "try wraps code that might fail; except catches a specific error type if it happens, letting the program continue instead of crashing. A bare `except:` catches everything, which is usually too broad — prefer catching specific exception types.",
        question: "Why is `except Exception` usually better than a bare `except:`?",
        options: [
          "They behave identically",
          "Bare except also catches things like KeyboardInterrupt and SystemExit, which you usually don't want to swallow",
          "except Exception runs faster",
          "Bare except is required by Python syntax rules",
        ],
        correctIndex: 1,
        explanation: "A bare except catches every possible exception, including ones that should usually propagate, like interrupts.",
      },
      {
        id: "pydb-2",
        title: "Catching specific exceptions",
        question: "What's the benefit of `except ValueError:` instead of catching all exceptions generically?",
        options: [
          "It's required syntax",
          "It only handles the error case you anticipated, letting unexpected bugs surface instead of being silently hidden",
          "It makes the code run in parallel",
          "There's no benefit, generic except is always better",
        ],
        correctIndex: 1,
        explanation: "Specific exception handling avoids accidentally hiding bugs you didn't anticipate or intend to handle.",
      },
      {
        id: "pydb-3",
        title: "raise and custom exceptions",
        content: "You can define your own exception by subclassing Exception, e.g. `class InsufficientFundsError(Exception): pass`, then `raise InsufficientFundsError(\"...\")` when that specific condition occurs.",
        question: "Why might you create a custom exception class instead of raising a generic Exception?",
        options: [
          "Custom exceptions run faster",
          "It lets calling code catch and handle that specific error case distinctly from other failures",
          "Python requires custom exceptions for all errors",
          "It prevents the program from ever crashing",
        ],
        correctIndex: 1,
        explanation: "A named exception type lets callers selectively catch just that failure mode with `except InsufficientFundsError:`.",
      },
      {
        id: "pydb-4",
        title: "Reading a traceback",
        content:
          "A traceback lists the chain of function calls leading to an error, ending with the actual exception type and message. Read it bottom-up: the last line tells you what went wrong, and the lines above show where in the call chain it happened.",
        question: "When reading a Python traceback, where is the actual error message usually shown?",
        options: [
          "At the very top of the traceback",
          "At the very bottom, after the full chain of calls that led there",
          "It's never shown, you have to guess",
          "In a separate log file always",
        ],
        correctIndex: 1,
        explanation: "Python prints the call chain first, then the actual exception type and message as the last line.",
      },
      {
        id: "pydb-5",
        title: "print/logging vs a debugger",
        question: "What's an advantage of using a debugger (like pdb or an IDE breakpoint) over sprinkling print statements?",
        options: [
          "Debuggers are always faster to run",
          "You can pause execution, inspect live variable state, and step through code without editing it repeatedly",
          "print statements are illegal in production code",
          "Debuggers automatically fix bugs",
        ],
        correctIndex: 1,
        explanation: "A debugger lets you inspect and step through live state interactively, instead of guessing what to print next.",
      },
    ],
  },
];

export const allPythonDebuggingLessons = pythonDebuggingUnits.flatMap((u) => u.lessons);
