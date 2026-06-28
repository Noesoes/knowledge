import type { PathUnit } from "../lessonPathTypes";

export const gitUnits: PathUnit[] = [
  {
    id: "what-is-git",
    title: "What Git Actually Is",
    color: "#5b9dff",
    lessons: [
      {
        id: "git-what-1",
        title: "Commits & snapshots",
        content:
          "Git takes snapshots of your project over time, called commits. Each commit records exactly what changed, who changed it, and why (via a commit message) — you can jump back to any snapshot at any time. Files move through three areas: working directory -> staging area (git add) -> repository history (git commit). This two-step design lets you commit part of your changes while leaving unfinished work unstaged.",
        question: "What is a 'commit' in Git?",
        options: [
          "A backup of your entire hard drive",
          "A snapshot of your project's files at a specific point in time, with a message describing the change",
          "A live, real-time sync between two computers",
          "Another name for a GitHub account",
        ],
        correctIndex: 1,
        explanation: "A commit is a saved snapshot in the project's history — you can always return to it later.",
      },
      {
        id: "git-what-2",
        title: "The staging area",
        question: "What's the purpose of the staging area?",
        options: [
          "It permanently deletes unstaged files",
          "It lets you choose exactly which changes will be included in the next commit",
          "It automatically pushes code to GitHub",
          "It has no real purpose, it's a legacy feature",
        ],
        correctIndex: 1,
        explanation: "Staging (git add) is a deliberate checkpoint — you decide what's ready to be committed versus still in progress.",
      },
      {
        id: "git-what-3",
        title: "Git vs GitHub",
        content:
          "Git is the tool that runs locally on your machine and tracks history. GitHub is a website/service that hosts a copy of your Git repository in the cloud so others can collaborate and you have a backup off your laptop. You could use Git your entire career without ever touching GitHub.",
        question: "What is the relationship between Git and GitHub?",
        options: [
          "They are the same product with two names",
          "Git is the local version-control tool; GitHub is a cloud service that hosts Git repositories",
          "GitHub replaced Git entirely in 2015",
          "Git only works inside GitHub's website",
        ],
        correctIndex: 1,
        explanation: "Git runs locally and tracks history regardless of GitHub. GitHub adds hosting, collaboration, and a web UI on top of Git.",
      },
    ],
  },
  {
    id: "core-commands",
    title: "Core Commands",
    color: "#3ecf8e",
    lessons: [
      {
        id: "git-cmd-1",
        title: "init and clone",
        content:
          "git init turns the current folder into a Git repository. git clone <url> copies an existing remote repository to your machine. The daily loop is: git status (see what's changed) -> git add (stage) -> git commit -m \"message\" (save a snapshot).",
        question: "Which command turns the current folder into a new Git repository?",
        options: ["git start", "git init", "git new", "git create"],
        correctIndex: 1,
        explanation: "git init initializes a new, empty Git repository in the current directory.",
      },
      {
        id: "git-cmd-2",
        title: "push and pull",
        question: "Which command uploads your local commits to a remote repository like GitHub?",
        options: ["git pull", "git fetch", "git push", "git clone"],
        correctIndex: 2,
        explanation: "git push sends your local commits up to the remote so others (and GitHub) can see them.",
      },
      {
        id: "git-cmd-3",
        title: "Undoing things",
        content:
          "git restore <file> discards uncommitted changes to a file. git reset HEAD~1 undoes the last commit but keeps the changes unstaged. git revert <commit> creates a new commit that undoes a previous one — this is safe for shared history because it doesn't rewrite anything.",
        question: "Why is `git revert` generally safer than `git reset` on shared history?",
        options: [
          "Revert is faster to type",
          "Revert creates a new commit undoing changes, instead of rewriting history others may have already pulled",
          "Reset doesn't actually work on shared repositories",
          "There's no real difference",
        ],
        correctIndex: 1,
        explanation: "Reset rewrites history, which causes conflicts for anyone who already pulled the old commits. Revert adds a new, honest commit instead.",
      },
      {
        id: "git-cmd-4",
        title: "Commit messages",
        question: "What's wrong with the commit message 'fix bug'?",
        options: [
          "It's too long",
          "It doesn't explain what the bug was or why the fix matters, so it's not useful to future readers",
          "Git doesn't allow lowercase commit messages",
          "Nothing, it's a perfectly fine commit message",
        ],
        correctIndex: 1,
        explanation: "Good commit messages explain why a change was made, which is information the diff itself can't convey.",
      },
    ],
  },
  {
    id: "branching",
    title: "Branching & Merging",
    color: "#c792ea",
    lessons: [
      {
        id: "git-branch-1",
        title: "Why branches exist",
        content:
          "A branch is an independent line of development. The default branch (usually main) represents the stable, working version of the project. Instead of editing main directly, you create a branch, make changes there, and merge back into main once the work is done and reviewed.",
        question: "Why do teams avoid committing directly to the main branch?",
        options: [
          "Git doesn't allow it",
          "It keeps main stable and deployable while work-in-progress happens on separate branches",
          "It's slower to commit to main",
          "Branches are required for git to function at all",
        ],
        correctIndex: 1,
        explanation: "Isolating work on branches means main always reflects a working, reviewed state of the project.",
      },
      {
        id: "git-branch-2",
        title: "Creating branches",
        question: "Which command creates AND switches to a new branch in a single step?",
        options: ["git branch feature/x", "git switch -c feature/x", "git log feature/x", "git status -b feature/x"],
        correctIndex: 1,
        explanation: "git switch -c (or the older git checkout -b) creates a branch and switches to it in one command.",
      },
      {
        id: "git-branch-3",
        title: "Merge conflicts",
        content:
          "Merging brings a branch's commits into another branch. If the same lines of code were changed in both branches, Git can't automatically decide which version is correct — this produces a merge conflict, resolved by manually editing the file to keep the right version, then committing the result. Merge conflicts are a normal, expected part of collaborative work.",
        question: "What causes a merge conflict?",
        options: [
          "Two branches having different names",
          "The same lines of a file being changed differently in two branches being merged",
          "Forgetting to run git pull",
          "Having more than 2 branches in a repo",
        ],
        correctIndex: 1,
        explanation: "Git can automatically merge changes to different lines, but when the same lines diverge, it asks a human to decide.",
      },
    ],
  },
  {
    id: "github-workflow",
    title: "GitHub Workflow",
    color: "#ffb454",
    lessons: [
      {
        id: "git-gh-1",
        title: "Pull requests",
        content:
          "A pull request is a request to merge your branch into another branch (usually main), opened on GitHub so teammates can review the changes before they land. A PR shows the full diff, lets people leave comments on specific lines, and tracks whether automated checks pass.",
        question: "What's the main purpose of a pull request?",
        options: [
          "To delete a branch",
          "To request that your changes be reviewed and then merged into another branch",
          "To download someone else's code",
          "To create a new GitHub account",
        ],
        correctIndex: 1,
        explanation: "A PR is both a request to merge and a structured space for review/discussion before that merge happens.",
      },
      {
        id: "git-gh-2",
        title: "Forks vs branches",
        question: "When should you fork a repository instead of just creating a branch?",
        options: [
          "Always, forking is required for every change",
          "When you don't have write access to the original repository",
          "Only when the repository is private",
          "Forks and branches are the same thing",
        ],
        correctIndex: 1,
        explanation: "Forking creates your own copy you control. It's specifically for contributing to projects where you lack direct write/branch access.",
      },
      {
        id: "git-gh-3",
        title: "Issues",
        content:
          "GitHub Issues track bugs, feature requests, and tasks. Good practice: reference an issue number in your PR description (e.g. \"Closes #42\") so GitHub automatically links and closes it when the PR merges.",
        question: "What happens if a PR description includes 'Closes #42'?",
        options: [
          "Nothing, it's just a comment",
          "GitHub automatically links and closes issue #42 when the PR merges",
          "It deletes issue #42 immediately",
          "It blocks the PR from merging",
        ],
        correctIndex: 1,
        explanation: "GitHub recognizes 'Closes #N' (and similar phrasing) and auto-closes the referenced issue on merge.",
      },
      {
        id: "git-gh-4",
        title: "Code review etiquette",
        question: "What's the best practice for giving code review feedback?",
        options: [
          "Focus comments on the code's behavior, not the person who wrote it",
          "Avoid leaving any comments to save time",
          "Only approve PRs without reading them",
          "Criticize the author's general skill level",
        ],
        correctIndex: 0,
        explanation: "Review comments should target the code ('this could cause a null pointer...') rather than the person.",
      },
    ],
  },
];

export const allGitLessons = gitUnits.flatMap((u) => u.lessons);
