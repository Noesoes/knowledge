import type { Course } from "../types";

export const gitGithub: Course = {
  id: "git-github",
  title: "Git & GitHub",
  tagline: "Version control isn't optional — it's how all real software gets built.",
  icon: "🌱",
  description:
    "Git tracks every change to your code; GitHub is where that history lives and where teams collaborate. This course covers the commands you'll use daily and the workflow (branches, pull requests, code review) that every dev job expects you to know.",
  modules: [
    {
      id: "what-is-git",
      title: "What Git Actually Is",
      summary: "A mental model for version control before touching a single command.",
      content: `
### The problem Git solves

Without version control, "saving your work" means overwriting the previous version, hoping you don't need it back, and emailing zip files named \`project_final_v3_REAL.zip\`. Git solves this by taking **snapshots** of your project over time, called **commits**. Each commit records exactly what changed, who changed it, and why (via a commit message) — and you can jump back to any snapshot at any time.

### Three areas you're always moving files between

- **Working directory** — the actual files on your disk, as you edit them
- **Staging area (the "index")** — a holding area where you choose exactly which changes will go into the next commit (\`git add\`)
- **Repository (history)** — the permanent, committed snapshots (\`git commit\`)

\`\`\`
working directory  --git add-->  staging area  --git commit-->  repository history
\`\`\`

This two-step "stage, then commit" design is intentional: it lets you commit *part* of your changes (e.g., one finished file) while leaving unfinished work unstaged.

### Git vs. GitHub
Git is the *tool* that runs locally on your machine and tracks history. GitHub is a *website/service* that hosts a copy of your Git repository in the cloud so others can see it, collaborate on it, and so you have a backup off your laptop. You could use Git your entire career without ever touching GitHub — but in practice, almost every team uses GitHub (or a near-identical competitor like GitLab) as the shared source of truth.
      `,
      keyTakeaways: [
        "Git takes snapshots (commits) of your project so you can always go back in time.",
        "Files move through: working directory → staging area (git add) → repository (git commit).",
        "Staging lets you choose exactly what goes into each commit, instead of committing everything at once.",
        "Git is the local tool; GitHub is the cloud service that hosts and shares your Git repository.",
      ],
      quiz: [
        {
          question: "What is a 'commit' in Git?",
          options: [
            "A backup of your entire hard drive",
            "A snapshot of your project's files at a specific point in time, with a message describing the change",
            "A live, real-time sync between two computers",
            "Another name for a GitHub account",
          ],
          correctIndex: 1,
          explanation:
            "A commit is a saved snapshot in the project's history — you can always return to it later.",
        },
        {
          question: "What's the purpose of the staging area?",
          options: [
            "It permanently deletes unstaged files",
            "It lets you choose exactly which changes will be included in the next commit",
            "It automatically pushes code to GitHub",
            "It has no real purpose, it's a legacy feature",
          ],
          correctIndex: 1,
          explanation:
            "Staging (git add) is a deliberate checkpoint — you decide what's ready to be committed versus what's still a work in progress.",
        },
        {
          question: "What is the relationship between Git and GitHub?",
          options: [
            "They are the same product with two names",
            "Git is the local version-control tool; GitHub is a cloud service that hosts Git repositories",
            "GitHub replaced Git entirely in 2015",
            "Git only works inside GitHub's website",
          ],
          correctIndex: 1,
          explanation:
            "Git runs locally and tracks history regardless of GitHub. GitHub adds hosting, collaboration tools, and a web UI on top of Git.",
        },
      ],
    },
    {
      id: "core-commands",
      title: "The Commands You'll Actually Use",
      summary: "init, clone, status, add, commit, push, pull — the daily-driver command set.",
      content: `
### Starting a repository
\`\`\`
git init                  # turn the current folder into a Git repository
git clone <url>            # copy an existing remote repository to your machine
\`\`\`

### The daily loop
\`\`\`
git status                 # see what's changed, staged, or untracked
git add <file>              # stage a specific file
git add .                   # stage everything changed
git commit -m "message"     # save a snapshot with a description
git log                     # view commit history
\`\`\`

### Working with a remote (e.g., GitHub)
\`\`\`
git push                   # upload your local commits to the remote repository
git pull                   # download and merge new commits from the remote
git remote -v              # see which remote(s) you're connected to
\`\`\`

### Undoing things (the part everyone Googles)
\`\`\`
git restore <file>          # discard uncommitted changes to a file
git reset HEAD~1            # undo the last commit, keep the changes unstaged
git revert <commit>          # create a new commit that undoes a previous one (safe for shared history)
\`\`\`

### Writing good commit messages
A commit message should explain **why**, not just restate the diff. "Fix bug" tells a future reader nothing. "Fix off-by-one error in pagination that skipped the last page" tells them exactly what to expect when they read the diff.
      `,
      keyTakeaways: [
        "git init starts a new repo; git clone copies an existing remote one.",
        "The daily loop is: status → add → commit, repeated constantly.",
        "git push uploads local commits; git pull downloads and merges remote ones.",
        "Prefer git revert over git reset on shared/pushed history — revert is non-destructive.",
      ],
      project:
        "Create a new folder, run `git init`, add a README.md file, stage it, and commit it with a meaningful message. Then make a small edit and create a second commit. Run `git log` and read both commit messages back.",
      quiz: [
        {
          question: "Which command uploads your local commits to a remote repository like GitHub?",
          options: ["git pull", "git fetch", "git push", "git clone"],
          correctIndex: 2,
          explanation: "git push sends your local commits up to the remote so others (and GitHub) can see them.",
        },
        {
          question: "Why is `git revert` generally safer than `git reset` on shared history?",
          options: [
            "Revert is faster to type",
            "Revert creates a new commit undoing changes, instead of rewriting history others may have already pulled",
            "Reset doesn't actually work on shared repositories",
            "There's no real difference",
          ],
          correctIndex: 1,
          explanation:
            "Reset rewrites history, which causes conflicts for anyone who already pulled the old commits. Revert adds a new, honest commit instead.",
        },
        {
          question: "What's wrong with the commit message 'fix bug'?",
          options: [
            "It's too long",
            "It doesn't explain what the bug was or why the fix matters, so it's not useful to future readers",
            "Git doesn't allow lowercase commit messages",
            "Nothing, it's a perfectly fine commit message",
          ],
          correctIndex: 1,
          explanation:
            "Good commit messages explain why a change was made, which is information the diff itself can't convey.",
        },
      ],
    },
    {
      id: "branching",
      title: "Branching & Merging",
      summary: "How to work on a feature without breaking the main codebase.",
      content: `
### Why branches exist

A branch is an independent line of development. The default branch (usually \`main\`) represents the stable, working version of the project. Instead of editing \`main\` directly, you create a branch, make your changes there, and only merge back into \`main\` once the work is done and reviewed. This means \`main\` is always deployable, and broken or half-finished work never threatens it.

\`\`\`
git branch feature/login-page     # create a new branch
git checkout feature/login-page    # switch to it
git checkout -b feature/login-page # create AND switch in one step
git switch -c feature/login-page   # modern equivalent of the line above
\`\`\`

### Merging back in
\`\`\`
git checkout main
git merge feature/login-page
\`\`\`

This brings the commits from your feature branch into \`main\`. If the same lines of code were changed in both branches, Git can't automatically decide which version is correct — this produces a **merge conflict**, which you resolve by manually editing the file to keep the right version, then committing the result.

### Merge conflicts are normal
Every developer hits merge conflicts regularly. They are not a sign you did something wrong — they're Git correctly refusing to silently guess which change you wanted when two people edited the same lines. Resolving one is just: open the file, find the \`<<<<<<<\` / \`=======\` / \`>>>>>>>\` markers, decide what the final code should look like, delete the markers, save, and commit.
      `,
      keyTakeaways: [
        "Branches let you build features in isolation without breaking the stable main branch.",
        "git switch -c (or git checkout -b) creates and switches to a new branch in one step.",
        "Merging brings a branch's commits into another branch.",
        "Merge conflicts happen when the same lines change in two branches — resolving them is a normal, expected part of the job.",
      ],
      project:
        "In your practice repo, create a branch called `feature/test`, edit README.md, commit the change, switch back to `main`, and merge the feature branch in. Then intentionally edit the same line on two different branches to trigger a merge conflict, and resolve it.",
      quiz: [
        {
          question: "Why do teams avoid committing directly to the main branch?",
          options: [
            "Git doesn't allow it",
            "It keeps main stable and deployable while work-in-progress happens on separate branches",
            "It's slower to commit to main",
            "Branches are required for git to function at all",
          ],
          correctIndex: 1,
          explanation:
            "Isolating work on branches means main always reflects a working, reviewed state of the project.",
        },
        {
          question: "What causes a merge conflict?",
          options: [
            "Two branches having different names",
            "The same lines of a file being changed differently in two branches being merged",
            "Forgetting to run git pull",
            "Having more than 2 branches in a repo",
          ],
          correctIndex: 1,
          explanation:
            "Git can automatically merge changes to different lines, but when the same lines diverge, it asks a human to decide.",
        },
      ],
    },
    {
      id: "github-workflow",
      title: "The GitHub Collaboration Workflow",
      summary: "Forks, pull requests, and code review — how real teams ship code together.",
      content: `
### Pull Requests (PRs)

A pull request is a request to merge your branch into another branch (usually \`main\`), opened on GitHub so teammates can review the changes before they land. A PR shows the full diff, lets people leave comments on specific lines, and tracks whether automated checks (tests, linters) pass.

The typical flow:
1. Create a branch, commit your changes, push the branch to GitHub
2. Open a pull request comparing your branch to \`main\`
3. Teammates review, leave comments, request changes
4. You push more commits addressing feedback (the PR updates automatically)
5. Once approved and checks pass, the PR is merged

### Forks vs. branches

If you don't have write access to a repository (e.g., contributing to an open-source project you don't own), you **fork** it — creating your own copy under your account — then open a pull request from your fork back to the original project. If you *do* have write access (e.g., your own team's repo), you just create a branch directly, no fork needed.

### Issues
GitHub Issues track bugs, feature requests, and tasks. Good practice: reference an issue number in your PR description (e.g., "Closes #42") so GitHub automatically links and closes it when the PR merges.

### Code review etiquette
Review comments should focus on the code, not the person — "this could cause a null pointer if the list is empty" rather than "you always forget edge cases." As the author, treat review comments as free debugging help, not personal criticism.
      `,
      keyTakeaways: [
        "A pull request (PR) proposes merging a branch and gives teammates a place to review before it lands.",
        "Fork when you don't own the repo; branch directly when you do.",
        "Issues track bugs/features; referencing them in PRs (e.g. 'Closes #42') auto-links and closes them.",
        "Code review feedback targets the code, not the person who wrote it.",
      ],
      quiz: [
        {
          question: "When should you fork a repository instead of just creating a branch?",
          options: [
            "Always, forking is required for every change",
            "When you don't have write access to the original repository",
            "Only when the repository is private",
            "Forks and branches are the same thing",
          ],
          correctIndex: 1,
          explanation:
            "Forking creates your own copy you control. It's specifically for contributing to projects where you lack direct write/branch access.",
        },
        {
          question: "What's the main purpose of a pull request?",
          options: [
            "To delete a branch",
            "To request that your changes be reviewed and then merged into another branch",
            "To download someone else's code",
            "To create a new GitHub account",
          ],
          correctIndex: 1,
          explanation:
            "A PR is both a request to merge and a structured space for review/discussion before that merge happens.",
        },
      ],
    },
  ],
};
