import type { PathUnit } from "../lessonPathTypes";

export const gitBranchingUnits: PathUnit[] = [
  {
    id: "branching-deep-dive",
    title: "Branching Deep Dive",
    color: "#5b9dff",
    lessons: [
      {
        id: "gitb-1",
        title: "Fast-forward vs three-way merges",
        content:
          "If main hasn't moved since you branched, merging your branch back in is a 'fast-forward' — Git just slides the main pointer forward, no new commit needed. If main has moved, Git creates a new 'merge commit' that ties both histories together — a three-way merge.",
        question: "When does Git perform a fast-forward merge instead of creating a merge commit?",
        options: [
          "Whenever you use git merge",
          "When the target branch hasn't changed since you branched off it",
          "Only when there are no files in the repo",
          "Never — fast-forwards were removed from modern Git",
        ],
        correctIndex: 1,
        explanation: "A fast-forward just moves the branch pointer forward because there's no divergent history to reconcile.",
      },
      {
        id: "gitb-2",
        title: "Rebase vs merge",
        content:
          "git merge preserves both histories and adds a merge commit. git rebase replays your branch's commits on top of the latest target branch, producing a clean, linear history — but it rewrites commit hashes, which is risky on a branch others are also working from.",
        question: "What's the main tradeoff of using rebase instead of merge?",
        options: [
          "Rebase is always slower",
          "Rebase rewrites commit history, which can break things for collaborators already using the old commits",
          "Rebase deletes the original branch",
          "There is no tradeoff, rebase is strictly better",
        ],
        correctIndex: 1,
        explanation: "Rebase gives a cleaner history but rewrites hashes — safe on your own unpushed branch, risky on shared ones.",
      },
      {
        id: "gitb-3",
        title: "Resolving a conflict",
        content:
          "When Git can't auto-merge, it marks the file with conflict markers: <<<<<<<, =======, >>>>>>>. You edit the file to keep the correct content, remove the markers, then git add the file and continue the merge or rebase.",
        question: "After manually fixing the conflicting lines in a file, what's the next step?",
        options: [
          "Delete the file",
          "git add the resolved file, then continue/commit the merge",
          "Restart the entire repository",
          "Nothing else is needed",
        ],
        correctIndex: 1,
        explanation: "Staging the resolved file tells Git you've handled the conflict, allowing the merge/rebase to proceed.",
      },
      {
        id: "gitb-4",
        title: "Stashing work in progress",
        content:
          "git stash temporarily shelves uncommitted changes so you can switch branches with a clean working directory, then git stash pop brings them back later. Useful when you need to urgently switch context without committing half-finished work.",
        question: "What does git stash do?",
        options: [
          "Permanently deletes uncommitted changes",
          "Temporarily saves uncommitted changes so you can switch branches cleanly, restorable later",
          "Pushes your branch to GitHub",
          "Creates a new commit automatically",
        ],
        correctIndex: 1,
        explanation: "Stash is a scratch space for changes you're not ready to commit but don't want to lose.",
      },
      {
        id: "gitb-5",
        title: "Cherry-picking commits",
        question: "What does `git cherry-pick <commit>` do?",
        options: [
          "Deletes a specific commit from history",
          "Applies the changes from a specific commit on another branch onto your current branch",
          "Renames a commit",
          "Merges every branch in the repo at once",
        ],
        correctIndex: 1,
        explanation: "Cherry-pick copies one specific commit's changes onto your current branch, without merging the whole branch.",
      },
    ],
  },
];

export const allGitBranchingLessons = gitBranchingUnits.flatMap((u) => u.lessons);
