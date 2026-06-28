import type { Course } from "../types";

export const python: Course = {
  id: "python",
  title: "Python Fundamentals",
  tagline: "A practical first language: readable syntax, huge ecosystem, used everywhere from scripts to AI.",
  icon: "🐍",
  description:
    "Python is consistently one of the most in-demand languages because it reads close to plain English and has libraries for nearly everything — web backends, data analysis, automation, and machine learning. This course covers the core language you need before specializing.",
  modules: [
    {
      id: "variables-and-types",
      title: "Variables, Types, and Operators",
      summary: "How Python stores and labels data.",
      content: `
### Variables

A variable is a name bound to a value. Python doesn't require declaring a type up front — it figures the type out from the value itself:

\`\`\`python
name = "Ada"        # str (text)
age = 36             # int (whole number)
height = 1.7          # float (decimal number)
is_active = True       # bool (True/False)
\`\`\`

### Core types
- \`str\` — text, written in quotes: \`"hello"\`
- \`int\` — whole numbers: \`42\`
- \`float\` — decimal numbers: \`3.14\`
- \`bool\` — \`True\` or \`False\`
- \`None\` — represents "no value," similar to null in other languages

### Operators
\`\`\`python
3 + 4      # 7   addition
10 % 3     # 1   modulo (remainder)
2 ** 8     # 256 exponent
"a" + "b"  # "ab" string concatenation
5 == 5     # True  equality check
5 != 4     # True  inequality check
\`\`\`

### f-strings — the modern way to build text
\`\`\`python
name = "Ada"
print(f"Hello, {name}!")     # Hello, Ada!
\`\`\`
The \`f\` before the quote lets you embed variables directly inside \`{}\` braces, instead of manually concatenating strings.
      `,
      keyTakeaways: [
        "Python infers a variable's type from its value — no manual type declaration required.",
        "Core built-in types: str, int, float, bool, None.",
        "== checks equality; = assigns a value — they are not interchangeable.",
        "f-strings (f\"text {variable}\") are the standard way to build strings with embedded values.",
      ],
      codeChallenges: [
        {
          id: "fstring-greeting",
          language: "python",
          prompt: 'Create a variable `name` set to a string, then print an f-string greeting: "Hello, <name>!"',
          checks: [/name\s*=\s*["']/, /f["']/, /print\(/, /hello/i],
          solution: 'name = "Ada"\nprint(f"Hello, {name}!")',
          hint: 'Set name = "..." then print(f"Hello, {name}!")',
        },
      ],
      quiz: [
        {
          question: "What type is the value produced by `1.7`?",
          options: ["int", "float", "str", "bool"],
          correctIndex: 1,
          explanation: "Any number written with a decimal point is a float in Python.",
        },
        {
          question: "What does `10 % 3` evaluate to?",
          options: ["3", "3.33", "1", "0"],
          correctIndex: 2,
          explanation: "% is the modulo operator — it returns the remainder of the division, and 10 divided by 3 leaves a remainder of 1.",
        },
        {
          question: "What is the difference between `=` and `==` in Python?",
          options: [
            "There is no difference",
            "= assigns a value to a variable; == checks if two values are equal",
            "= is for numbers, == is for strings",
            "== assigns a value; = checks equality",
          ],
          correctIndex: 1,
          explanation: "= is the assignment operator. == is a comparison operator that returns True or False.",
        },
      ],
    },
    {
      id: "control-flow",
      title: "Control Flow: Conditionals & Loops",
      summary: "Making decisions and repeating work — the two building blocks of all program logic.",
      content: `
### Conditionals

\`\`\`python
age = 20

if age < 13:
    print("child")
elif age < 20:
    print("teenager")
else:
    print("adult")
\`\`\`

Python uses **indentation** (not curly braces) to define which lines belong to a block. This is not just a style choice — incorrect indentation is a syntax error in Python.

### for loops — iterate over a known sequence
\`\`\`python
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

for i in range(5):   # 0, 1, 2, 3, 4
    print(i)
\`\`\`

### while loops — repeat until a condition is false
\`\`\`python
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`

### break and continue
\`break\` exits a loop entirely. \`continue\` skips to the next iteration without finishing the current one.

\`\`\`python
for n in range(10):
    if n == 5:
        break        # stop the loop completely at 5
    if n % 2 == 0:
        continue      # skip even numbers, go to next iteration
    print(n)
\`\`\`
      `,
      keyTakeaways: [
        "Python uses indentation, not braces, to define code blocks — incorrect indentation causes errors.",
        "for loops iterate over a known sequence (a list, a range, etc.).",
        "while loops repeat as long as a condition stays true.",
        "break exits a loop entirely; continue skips just the current iteration.",
      ],
      project:
        "Write a script that loops from 1 to 50 and prints 'fizz' if the number is divisible by 3, 'buzz' if divisible by 5, 'fizzbuzz' if divisible by both, and the number otherwise (the classic FizzBuzz exercise).",
      codeChallenges: [
        {
          id: "for-range",
          language: "python",
          prompt: "Write a for loop that prints the numbers 0 through 4 using range().",
          checks: [/for\s+\w+\s+in\s+range\(\s*5\s*\)/, /print\(/],
          solution: "for i in range(5):\n    print(i)",
          hint: "for i in range(5):\\n    print(i)",
        },
        {
          id: "while-loop",
          language: "python",
          prompt: "Write a while loop that prints 0, 1, 2 — starting a counter at 0, printing it, then incrementing by 1 until it reaches 3.",
          checks: [/while\s+\w+\s*<\s*3/, /print\(/, /\+=\s*1/],
          solution: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
          hint: "while count < 3: print(count); count += 1",
        },
      ],
      quiz: [
        {
          question: "What defines a code block in Python (instead of curly braces)?",
          options: ["Semicolons", "Indentation", "Parentheses", "The word 'block'"],
          correctIndex: 1,
          explanation: "Python relies on consistent indentation to know which lines belong inside an if/for/while block.",
        },
        {
          question: "What does `continue` do inside a loop?",
          options: [
            "Ends the loop immediately",
            "Skips the rest of the current iteration and moves to the next one",
            "Pauses the program",
            "Restarts the loop from the beginning",
          ],
          correctIndex: 1,
          explanation: "continue jumps straight to the next iteration, skipping any remaining code for the current one.",
        },
        {
          question: "What does `range(5)` produce when looped over?",
          options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "5 only", "0, 1, 2, 3, 4, 5"],
          correctIndex: 1,
          explanation: "range(5) generates 5 numbers starting at 0, so 0 through 4.",
        },
      ],
    },
    {
      id: "data-structures",
      title: "Lists, Dictionaries, and Functions",
      summary: "The data structures and reusable code blocks you'll use in nearly every Python program.",
      content: `
### Lists — ordered, changeable collections
\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")     # add to the end
fruits[0]                  # "apple" — access by index, starting at 0
fruits[-1]                  # "date" — negative index counts from the end
len(fruits)                 # 4
\`\`\`

### Dictionaries — key/value pairs
\`\`\`python
person = {"name": "Ada", "age": 36}
person["name"]              # "Ada"
person["job"] = "engineer"   # add a new key
person.get("missing", "n/a") # "n/a" — safe lookup with a default
\`\`\`

### Functions — reusable blocks of logic
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Ada")                  # "Hello, Ada!"
greet("Ada", "Hi")              # "Hi, Ada!"
\`\`\`

Functions take **parameters** (here, \`name\` and \`greeting\`), can have **default values** (\`greeting\` defaults to \`"Hello"\`), and **return** a value with the \`return\` keyword. A function with no \`return\` statement implicitly returns \`None\`.

### Why this matters
Almost every real program is some combination of: store data in a list or dictionary, loop over it, and apply functions to transform it. Mastering these three things covers a surprising amount of day-to-day programming.
      `,
      keyTakeaways: [
        "Lists are ordered and indexed starting at 0; negative indices count from the end.",
        "Dictionaries store key/value pairs and support safe lookups with .get(key, default).",
        "Functions are defined with def, can have default parameter values, and return a value with return.",
        "A function without an explicit return returns None.",
      ],
      project:
        "Write a function `word_count(text)` that takes a sentence (string), splits it into words, and returns a dictionary mapping each word to how many times it appears.",
      codeChallenges: [
        {
          id: "dict-get-default",
          language: "python",
          prompt: 'Given person = {"name": "Ada"}, safely look up "job" with a default of "unknown" using .get().',
          checks: [/\.get\(\s*["']job["']\s*,\s*["']unknown["']\s*\)/i],
          solution: 'person.get("job", "unknown")',
          hint: 'person.get("job", "unknown")',
        },
        {
          id: "function-default-param",
          language: "python",
          prompt: 'Define a function greet(name, greeting="Hello") that returns f"{greeting}, {name}!"',
          checks: [/def\s+greet\(/, /greeting\s*=\s*["']Hello["']/, /return/, /f["']/],
          solution: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"',
          hint: 'def greet(name, greeting="Hello"):\\n    return f"{greeting}, {name}!"',
        },
      ],
      quiz: [
        {
          question: "What does `fruits[-1]` return for the list `[\"apple\", \"banana\", \"cherry\"]`?",
          options: ["apple", "banana", "cherry", "An error"],
          correctIndex: 2,
          explanation: "Negative indices count from the end, so -1 refers to the last element, 'cherry'.",
        },
        {
          question: "What's the advantage of `dict.get('key', default)` over `dict['key']`?",
          options: [
            "It's faster to type",
            "It returns a fallback value instead of raising an error when the key doesn't exist",
            "It deletes the key afterwards",
            "There is no difference",
          ],
          correctIndex: 1,
          explanation: "Using .get() with a default avoids a KeyError crash when the key might not be present.",
        },
        {
          question: "What does a Python function return if it has no `return` statement?",
          options: ["0", "An empty string", "None", "It causes an error"],
          correctIndex: 2,
          explanation: "Without an explicit return, Python functions implicitly return None.",
        },
      ],
    },
    {
      id: "errors-and-modules",
      title: "Handling Errors & Using Modules",
      summary: "How to deal with things going wrong, and how to use code other people already wrote.",
      content: `
### Try / except
Errors ("exceptions") happen — a file might not exist, a user might type text where you expected a number. \`try\`/\`except\` lets your program handle that gracefully instead of crashing:

\`\`\`python
try:
    number = int(input("Enter a number: "))
    print(100 / number)
except ValueError:
    print("That wasn't a valid number.")
except ZeroDivisionError:
    print("Can't divide by zero.")
\`\`\`

Catch *specific* exception types rather than a bare \`except:\` — catching everything blindly hides real bugs along with the expected errors.

### Modules and imports
Python's standard library and the broader package ecosystem (installed via \`pip\`) provide huge amounts of pre-written functionality:

\`\`\`python
import math
math.sqrt(16)          # 4.0

from datetime import date
date.today()             # today's date

import requests           # third-party package, installed via: pip install requests
requests.get("https://api.example.com")
\`\`\`

\`pip\` is Python's package installer. \`pip install <package>\` downloads a library and makes it importable. Most real Python projects track their dependencies in a \`requirements.txt\` file so the exact same packages can be installed elsewhere.

### Virtual environments
A virtual environment (\`python -m venv .venv\`) creates an isolated set of installed packages per project, so Project A needing version 1 of a library doesn't conflict with Project B needing version 2. This is a near-universal practice in real Python development.
      `,
      keyTakeaways: [
        "try/except handles errors without crashing the whole program — catch specific exception types, not everything blindly.",
        "import brings in standard library or third-party code; pip install adds third-party packages.",
        "requirements.txt records a project's exact dependencies so they can be reinstalled elsewhere.",
        "Virtual environments isolate each project's packages to avoid version conflicts.",
      ],
      codeChallenges: [
        {
          id: "try-except",
          language: "python",
          prompt: 'Write a try/except block that converts user input to int() and catches ValueError, printing "invalid" if it fails.',
          checks: [/try:/, /except\s+ValueError/, /print\(/],
          solution: 'try:\n    number = int(input())\nexcept ValueError:\n    print("invalid")',
          hint: "try: ... except ValueError: print(...)",
        },
      ],
      quiz: [
        {
          question: "Why is catching a specific exception type (like `ValueError`) better than a bare `except:`?",
          options: [
            "It runs faster",
            "It avoids accidentally hiding unrelated bugs that you didn't expect or intend to catch",
            "Bare except blocks are not valid Python syntax",
            "There's no real difference",
          ],
          correctIndex: 1,
          explanation: "A bare except swallows every error, including ones you didn't anticipate, making bugs much harder to find.",
        },
        {
          question: "What does `pip install requests` do?",
          options: [
            "Deletes the requests package",
            "Downloads and installs the third-party 'requests' package so it can be imported",
            "Runs the requests package's test suite",
            "Updates Python itself",
          ],
          correctIndex: 1,
          explanation: "pip is Python's package manager; pip install fetches a package from PyPI and makes it available to import.",
        },
        {
          question: "What problem do virtual environments solve?",
          options: [
            "They make code run faster",
            "They isolate per-project dependencies so different projects can use different package versions without conflict",
            "They automatically write your code for you",
            "They replace the need for Git",
          ],
          correctIndex: 1,
          explanation: "Without isolation, installing different versions of the same package for different projects would conflict globally.",
        },
      ],
    },
  ],
};
