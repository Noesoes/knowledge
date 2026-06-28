import type { PathUnit } from "../lessonPathTypes";

export const cliUnits: PathUnit[] = [
  {
    id: "cli-basics",
    title: "Getting Around",
    color: "#5b9dff",
    lessons: [
      {
        id: "cli-basics-1",
        title: "What is a shell?",
        content:
          "The shell is a program that reads commands you type and runs them. On Mac/Linux you'll usually use bash or zsh; on Windows, PowerShell or WSL. The terminal is just the window — the shell is what's actually interpreting your input.",
        question: "What is the 'shell' in command-line terms?",
        options: [
          "The window the terminal is displayed in",
          "The program that reads and executes the commands you type",
          "A type of file extension",
          "Another name for the operating system",
        ],
        correctIndex: 1,
        explanation: "The shell parses your input and runs the corresponding programs — the terminal is just the window hosting it.",
      },
      {
        id: "cli-basics-2",
        title: "pwd and the prompt",
        question: "What does `pwd` print?",
        options: [
          "A random password",
          "The full path of the directory you're currently in",
          "The list of files in the current directory",
          "Your username",
        ],
        correctIndex: 1,
        explanation: "pwd = 'print working directory' — it shows exactly where you are in the filesystem.",
      },
      {
        id: "cli-basics-3",
        title: "Listing files",
        question: "Which command lists the contents of the current directory?",
        options: ["cd", "ls", "rm", "touch"],
        correctIndex: 1,
        explanation: "ls lists files and folders in the current directory; `ls -la` shows hidden files and details too.",
      },
      {
        id: "cli-basics-4",
        title: "Changing directories",
        content:
          "cd moves you between directories. `cd ..` goes up one level (to the parent folder), `cd ~` jumps to your home directory, and `cd -` returns you to the previous directory you were in.",
        question: "What does `cd ..` do?",
        options: [
          "Deletes the current directory",
          "Moves you up one level, into the parent directory",
          "Creates a new directory",
          "Lists hidden files",
        ],
        correctIndex: 1,
        explanation: "`..` always refers to the parent of the current directory.",
      },
      {
        id: "cli-basics-5",
        title: "Absolute vs relative paths",
        question: "What's the difference between an absolute and a relative path?",
        options: [
          "There is no difference",
          "An absolute path starts from the filesystem root (e.g. /home/user); a relative path starts from where you currently are",
          "Relative paths only work on Windows",
          "Absolute paths can't contain folders",
        ],
        correctIndex: 1,
        explanation: "Absolute paths always point to the same place regardless of your current directory; relative paths depend on where you are.",
      },
    ],
  },
  {
    id: "cli-files",
    title: "Working with Files",
    color: "#3ecf8e",
    lessons: [
      {
        id: "cli-files-1",
        title: "Creating files and folders",
        content:
          "`touch file.txt` creates an empty file (or updates its timestamp if it exists). `mkdir folder` creates a new directory. `mkdir -p a/b/c` creates nested directories in one go, even if the parent folders don't exist yet.",
        question: "Which command creates a new, empty file?",
        options: ["mkdir", "touch", "cd", "cat"],
        correctIndex: 1,
        explanation: "touch creates an empty file if it doesn't exist (or just updates its modified time if it does).",
      },
      {
        id: "cli-files-2",
        title: "Copying and moving",
        question: "Which command both renames AND moves files in Unix-like shells?",
        options: ["cp", "mv", "rm", "ls"],
        correctIndex: 1,
        explanation: "mv handles both renaming (mv old.txt new.txt) and moving (mv file.txt folder/) — they're the same operation.",
      },
      {
        id: "cli-files-3",
        title: "Removing files — carefully",
        content:
          "`rm file.txt` deletes a file permanently — there's no trash can to recover it from. `rm -r folder/` removes a directory and everything inside it. Because of how permanent and silent this is, always double check the path before running rm, especially with wildcards.",
        question: "Why is `rm` considered more dangerous than dragging a file to the trash?",
        options: [
          "It isn't, they're identical",
          "rm deletes immediately and permanently, with no recovery step",
          "rm only works on text files",
          "rm requires admin permissions every time",
        ],
        correctIndex: 1,
        explanation: "There's no undo or trash bin for rm — the file is gone the moment the command runs.",
      },
      {
        id: "cli-files-4",
        title: "Viewing file contents",
        question: "Which command prints a file's entire contents to the terminal?",
        options: ["cat file.txt", "mkdir file.txt", "cd file.txt", "rm file.txt"],
        correctIndex: 0,
        explanation: "cat ('concatenate') dumps a file's contents straight to standard output.",
      },
      {
        id: "cli-files-5",
        title: "Wildcards",
        question: "What does `rm *.log` do?",
        options: [
          "Deletes a single file literally named '*.log'",
          "Deletes every file in the current directory ending in .log",
          "Lists all .log files without deleting them",
          "Creates new .log files",
        ],
        correctIndex: 1,
        explanation: "* is a wildcard matching any characters — *.log matches every filename ending in .log.",
      },
    ],
  },
  {
    id: "cli-pipes",
    title: "Pipes & Redirection",
    color: "#c792ea",
    lessons: [
      {
        id: "cli-pipes-1",
        title: "Standard output",
        content:
          "Every command writes its normal output to 'standard output' (stdout), which by default prints to your terminal. The real power of the command line comes from being able to redirect or chain that output instead of just reading it on screen.",
        question: "By default, where does a command's standard output go?",
        options: ["Nowhere, it's discarded", "To your terminal screen", "Directly to a file always", "To another computer"],
        correctIndex: 1,
        explanation: "stdout prints to the terminal unless you explicitly redirect or pipe it elsewhere.",
      },
      {
        id: "cli-pipes-2",
        title: "Redirecting to a file",
        diagram: "redirect",
        content:
          "`>` redirects a command's output into a file, overwriting it. `>>` appends to the end of a file instead of overwriting. Both replace the terminal as the destination for stdout.",
        question: "What does `echo \"hello\" > notes.txt` do?",
        options: [
          "Prints 'hello' to the terminal only",
          "Writes 'hello' into notes.txt, overwriting any existing content",
          "Appends 'hello' to the end of notes.txt",
          "Deletes notes.txt",
        ],
        correctIndex: 1,
        explanation: "> overwrites the target file with the command's output; >> would append instead.",
      },
      {
        id: "cli-pipes-3",
        title: "The pipe operator",
        diagram: "pipe",
        question: "What does the pipe operator `|` do?",
        options: [
          "It runs two unrelated commands in sequence",
          "It feeds the output of one command in as the input to the next",
          "It splits a file into two files",
          "It comments out a line",
        ],
        correctIndex: 1,
        explanation: "Piping chains commands together: `cat file.txt | grep \"error\"` feeds file.txt's contents into grep.",
      },
      {
        id: "cli-pipes-4",
        title: "grep",
        content:
          "grep searches text for lines matching a pattern. `grep \"error\" log.txt` prints every line in log.txt containing 'error'. Combined with pipes, it's one of the most-used commands for filtering output, e.g. `ls -la | grep \".js\"`.",
        question: "What does `cat server.log | grep \"500\"` do?",
        options: [
          "Deletes all lines containing 500 from server.log",
          "Prints only the lines of server.log that contain '500'",
          "Counts the total lines in server.log",
          "Replaces 500 with another number",
        ],
        correctIndex: 1,
        explanation: "grep filters its input down to only the lines matching the given pattern.",
      },
      {
        id: "cli-pipes-5",
        title: "Combining tools",
        question: "Why is chaining small commands together with pipes considered powerful?",
        options: [
          "It makes commands run slower on purpose",
          "Each tool does one thing well, and pipes let you combine them into custom workflows without writing new programs",
          "It's required, single commands don't work alone",
          "Pipes only work with grep",
        ],
        correctIndex: 1,
        explanation: "This 'small tools, composed together' philosophy is core to how Unix-style command lines are designed.",
      },
    ],
  },
  {
    id: "cli-power",
    title: "Everyday Power Tools",
    color: "#ffb454",
    lessons: [
      {
        id: "cli-power-1",
        title: "Tab completion",
        question: "What is tab completion used for in a shell?",
        options: [
          "Deleting the current line",
          "Auto-completing file/folder names and commands as you type, reducing typos",
          "Switching between open terminal tabs",
          "It's purely cosmetic",
        ],
        correctIndex: 1,
        explanation: "Pressing Tab auto-completes paths/commands, saving time and avoiding typos in long names.",
      },
      {
        id: "cli-power-2",
        title: "Command history",
        content:
          "Pressing the up arrow cycles through previously run commands. `history` lists recent commands with numbers, and `!42` re-runs command #42. Ctrl+R lets you search your history interactively.",
        question: "How can you quickly re-run a command you used a few minutes ago?",
        options: [
          "You must retype it from scratch every time",
          "Press the up arrow to cycle through previous commands, or search with Ctrl+R",
          "Restart the terminal",
          "It's not possible",
        ],
        correctIndex: 1,
        explanation: "Shells keep a history of past commands — up-arrow and Ctrl+R are the fastest ways to reuse them.",
      },
      {
        id: "cli-power-3",
        title: "Environment variables",
        question: "What is an environment variable like `PATH` used for?",
        options: [
          "Storing a single file's contents",
          "Holding configuration values (like which folders to search for executable programs) available to every process in that shell",
          "Naming a directory",
          "It's a Windows-only concept",
        ],
        correctIndex: 1,
        explanation: "PATH tells the shell which directories to search when you type a command name like `git` or `python`.",
      },
      {
        id: "cli-power-4",
        title: "Killing a stuck process",
        content:
          "If a running program hangs or you started it by mistake, Ctrl+C sends an interrupt signal that stops it. For a process running in the background, `kill <pid>` (after finding its process ID with `ps` or `top`) does the same thing.",
        question: "What does pressing Ctrl+C do to a running terminal command?",
        options: [
          "Copies the command to your clipboard",
          "Sends an interrupt signal that typically stops the running program",
          "Closes the entire terminal application",
          "Pauses the command, to be resumed later automatically",
        ],
        correctIndex: 1,
        explanation: "Ctrl+C interrupts the foreground process — the standard way to stop something that's hung or running too long.",
      },
      {
        id: "cli-power-5",
        title: "Why the CLI matters",
        question: "Why do developers rely on the command line instead of only using graphical file managers?",
        options: [
          "GUIs don't exist on developer machines",
          "The CLI is faster for repetitive tasks, scriptable, and is how you interact with servers that have no GUI at all",
          "The command line is purely a relic with no real advantage today",
          "It's required by law for software developers",
        ],
        correctIndex: 1,
        explanation: "Most servers are headless (no GUI), and CLI workflows can be scripted/automated in ways clicking through folders can't.",
      },
    ],
  },
];

export const allCliLessons = cliUnits.flatMap((u) => u.lessons);
