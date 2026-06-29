import type { PathUnit } from "../lessonPathTypes";

export const cliScriptingUnits: PathUnit[] = [
  {
    id: "shell-scripting",
    title: "Shell Scripting",
    color: "#3ecf8e",
    lessons: [
      {
        id: "clis-1",
        title: "Variables & command substitution",
        content:
          "In bash, name=value sets a variable (no spaces around =), and $name or ${name} reads it. $(command) runs a command and substitutes its output as text — e.g. now=$(date) stores the current date in a variable.",
        question: "What does `files=$(ls)` do?",
        options: [
          "Runs ls in the background forever",
          "Stores the text output of the ls command into the variable files",
          "Deletes all files",
          "Creates a file named ls",
        ],
        correctIndex: 1,
        explanation: "$(...) is command substitution — it captures a command's stdout as a string you can assign or reuse.",
      },
      {
        id: "clis-2",
        title: "Conditionals",
        question: "Which bash snippet correctly checks if a file exists?",
        options: ["if exists myfile.txt", "if [ -f myfile.txt ]; then ...; fi", "if file(myfile.txt):", "check myfile.txt"],
        correctIndex: 1,
        explanation: "`[ -f file ]` (or `test -f file`) is the standard bash file-existence check used inside an if statement.",
      },
      {
        id: "clis-3",
        title: "Loops over files",
        content: "`for f in *.txt; do echo \"$f\"; done` loops over every .txt file in the current directory, running the loop body once per match.",
        question: "What does `for f in *.log; do rm \"$f\"; done` do?",
        options: [
          "Removes every file in the directory regardless of extension",
          "Removes every file ending in .log in the current directory, one at a time",
          "Renames all .log files",
          "Does nothing because *.log isn't valid syntax",
        ],
        correctIndex: 1,
        explanation: "The glob *.log expands to matching filenames, and the loop runs rm on each one in turn.",
      },
      {
        id: "clis-4",
        title: "Exit codes and && / ||",
        content:
          "Every command returns an exit code: 0 means success, nonzero means failure. `cmd1 && cmd2` runs cmd2 only if cmd1 succeeded. `cmd1 || cmd2` runs cmd2 only if cmd1 failed.",
        question: "What does `mkdir build && cd build` do?",
        options: [
          "Always runs both commands no matter what",
          "Only changes into the build directory if mkdir succeeded (e.g. it didn't already exist with an error)",
          "Deletes the build directory",
          "Runs cd first, then mkdir",
        ],
        correctIndex: 1,
        explanation: "&& chains a follow-up command that only runs after the first one exits with success (code 0).",
      },
      {
        id: "clis-5",
        title: "Writing a reusable script",
        question: "What does the shebang line `#!/usr/bin/env bash` at the top of a script file do?",
        options: [
          "It's just a comment with no effect",
          "It tells the OS which interpreter to use when the script is executed directly",
          "It deletes the script after running",
          "It only works on Windows",
        ],
        correctIndex: 1,
        explanation: "The shebang lets you run `./script.sh` directly — the OS reads this line to know to launch bash to interpret it.",
      },
    ],
  },
];

export const allCliScriptingLessons = cliScriptingUnits.flatMap((u) => u.lessons);
