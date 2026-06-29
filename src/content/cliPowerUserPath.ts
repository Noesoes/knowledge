import type { PathUnit } from "../lessonPathTypes";

export const cliPowerUserUnits: PathUnit[] = [
  {
    id: "power-user-tricks",
    title: "Power User Tricks",
    color: "#5b9dff",
    lessons: [
      {
        id: "clip-1",
        title: "grep -r and regex basics",
        diagram: "pipe",
        content:
          "grep -r \"TODO\" . recursively searches every file under the current directory for the text TODO. Adding -i ignores case, -n shows line numbers, and you can use basic regex patterns like ^ (start of line) or .* (any characters).",
        question: "What does `grep -rn \"error\" ./logs` do?",
        options: [
          "Deletes lines containing 'error'",
          "Recursively searches the logs directory for 'error', printing matching lines with their line numbers",
          "Renames files containing 'error'",
          "Only checks one file named logs",
        ],
        correctIndex: 1,
        explanation: "-r searches recursively through directories, and -n prefixes each match with its line number.",
      },
      {
        id: "clip-2",
        title: "xargs for batch operations",
        content:
          "xargs takes lines of input and turns them into arguments for another command. `find . -name \"*.tmp\" | xargs rm` finds all .tmp files and passes each as an argument to rm, deleting them all in one pipeline.",
        question: "What does `find . -name \"*.bak\" | xargs rm` do?",
        options: [
          "Lists .bak files without doing anything else",
          "Finds every .bak file under the current directory and deletes each one via rm",
          "Creates new .bak files",
          "Only works on a single file at a time, ignoring the rest",
        ],
        correctIndex: 1,
        explanation: "xargs converts the list of filenames from find into individual rm arguments, deleting them all.",
      },
      {
        id: "clip-3",
        title: "Background jobs & job control",
        content:
          "Appending & runs a command in the background, freeing up your terminal. `jobs` lists background jobs, `fg` brings one to the foreground, and Ctrl+Z suspends the current foreground process.",
        question: "What does appending `&` to a command do?",
        options: [
          "Runs the command twice",
          "Runs the command in the background so you can keep using the terminal immediately",
          "Cancels the command",
          "Pipes the command's output to another program",
        ],
        correctIndex: 1,
        explanation: "& detaches the process to run in the background, returning control of the shell prompt right away.",
      },
      {
        id: "clip-4",
        title: "ssh and remote commands",
        question: "What does `ssh user@server \"ls /var/log\"` do?",
        options: [
          "Lists /var/log on your local machine",
          "Connects to the remote server and runs the ls command there, printing the result back to you",
          "Copies /var/log to your machine",
          "Only opens an interactive shell with no commands",
        ],
        correctIndex: 1,
        explanation: "ssh can run a single remote command non-interactively and stream its output back, without opening a full session.",
      },
      {
        id: "clip-5",
        title: "Aliases and shell config",
        question: "Where would you put `alias gs=\"git status\"` so it's available in every new terminal session?",
        options: [
          "Nowhere — aliases can't persist between sessions",
          "In your shell config file (e.g. ~/.bashrc or ~/.zshrc), which runs on every new shell",
          "In the system's root crontab",
          "Inside the git executable itself",
        ],
        correctIndex: 1,
        explanation: "Shell startup files are sourced for every new interactive shell, which is exactly where persistent aliases belong.",
      },
    ],
  },
];

export const allCliPowerUserLessons = cliPowerUserUnits.flatMap((u) => u.lessons);
