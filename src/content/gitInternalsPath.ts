import type { PathUnit } from "../lessonPathTypes";

export const gitInternalsUnits: PathUnit[] = [
  {
    id: "git-internals",
    title: "Git Internals",
    color: "#5b9dff",
    lessons: [
      {
        id: "giti-1",
        title: "Git's object model",
        content:
          "Git stores everything as objects in a content-addressed database: blobs (file contents), trees (directory listings), and commits (a tree snapshot plus metadata and a pointer to the parent commit). A branch is just a movable pointer to a commit.",
        question: "What does a Git 'commit' object actually point to?",
        options: [
          "A list of every commit ever made",
          "A snapshot tree of the project's files at that point, plus metadata and a pointer to its parent commit(s)",
          "Only the lines that changed, with no reference to the rest of the project",
          "The remote server's IP address",
        ],
        correctIndex: 1,
        explanation: "Each commit references a full tree snapshot and its parent, which is how Git reconstructs history by walking pointers.",
      },
      {
        id: "giti-2",
        title: "The reflog: recovering lost commits",
        content:
          "The reflog (`git reflog`) records every place HEAD has pointed, even after a hard reset or an abandoned rebase. Commits aren't actually deleted immediately — you can often recover a 'lost' commit by finding its hash in the reflog and checking it out.",
        question: "You accidentally ran `git reset --hard` and lost a commit. What's the most direct way to try to recover it?",
        options: [
          "It's permanently gone with no way to recover it",
          "Check `git reflog` for the commit's hash, then `git checkout` or `git cherry-pick` that hash",
          "Reinstall git",
          "Ask GitHub support to restore your local disk",
        ],
        correctIndex: 1,
        explanation: "The reflog tracks HEAD movements locally, so a recently 'lost' commit is usually still recoverable by hash for a while.",
      },
      {
        id: "giti-3",
        title: "git bisect to find a bad commit",
        content:
          "`git bisect` does a binary search through commit history: you mark a known-good and known-bad commit, and Git checks out commits in between for you to test as good or bad, narrowing down the exact commit that introduced a bug in O(log n) steps.",
        question: "Why is `git bisect` faster than manually checking out commits one by one to find a regression?",
        options: [
          "It automatically writes the fix for you",
          "It performs a binary search, halving the range of suspect commits each round instead of checking them sequentially",
          "It only checks the most recent 10 commits",
          "It doesn't actually run any code, just reads commit messages",
        ],
        correctIndex: 1,
        explanation: "Binary search narrows down a bad commit in log₂(n) steps instead of a linear scan through every commit.",
      },
      {
        id: "giti-4",
        title: "Interactive rebase: squash, reorder, edit",
        question: "What does squashing two commits during `git rebase -i` accomplish?",
        options: [
          "It deletes both commits with no trace",
          "It combines them into a single commit, useful for cleaning up a messy work-in-progress history before merging",
          "It pushes them directly to production",
          "It converts them into a new branch",
        ],
        correctIndex: 1,
        explanation: "Squashing merges multiple small/WIP commits into one clean commit, which is a common practice before opening or merging a PR.",
      },
      {
        id: "giti-5",
        title: "Git hooks",
        content:
          "Git hooks are scripts that run automatically at points in the Git workflow — e.g. a `pre-commit` hook can run a linter before allowing a commit, and a `pre-push` hook can run tests before allowing a push.",
        question: "What's a practical use of a `pre-commit` git hook?",
        options: [
          "Automatically deploying to production on every commit",
          "Running a linter or formatter and blocking the commit if it fails, enforcing code quality before code even enters history",
          "Sending the commit to every team member's email",
          "Deleting the .git folder",
        ],
        correctIndex: 1,
        explanation: "Pre-commit hooks let you enforce checks (lint, format, tests) locally before a commit is even created.",
      },
    ],
  },
];

export const allGitInternalsLessons = gitInternalsUnits.flatMap((u) => u.lessons);
