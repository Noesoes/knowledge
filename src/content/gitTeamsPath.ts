import type { PathUnit } from "../lessonPathTypes";

export const gitTeamsUnits: PathUnit[] = [
  {
    id: "team-workflows",
    title: "Team Workflows",
    color: "#c792ea",
    lessons: [
      {
        id: "gitt-1",
        title: "Trunk-based vs Git flow",
        content:
          "Trunk-based development keeps everyone merging small, frequent changes into main. Git flow uses long-lived develop/release/feature branches with more structure. Most fast-moving teams favor trunk-based with short-lived feature branches and CI gating.",
        question: "What's the main appeal of trunk-based development over a heavier branching model?",
        options: [
          "It requires no testing",
          "Small, frequent merges into main reduce integration pain and keep main always close to releasable",
          "It avoids using branches entirely",
          "It only works for solo developers",
        ],
        correctIndex: 1,
        explanation: "Frequent small merges minimize the painful 'big bang' integration that long-lived branches cause.",
      },
      {
        id: "gitt-2",
        title: "Protected branches & required reviews",
        question: "What does a 'protected branch' setting like 'require pull request reviews' accomplish?",
        options: [
          "It hides the branch from other contributors",
          "It blocks direct pushes to that branch, forcing changes through a reviewed pull request",
          "It automatically deletes old branches",
          "It encrypts the branch's contents",
        ],
        correctIndex: 1,
        explanation: "Branch protection enforces process — no one (including admins, often) can bypass review before merging.",
      },
      {
        id: "gitt-3",
        title: "Squash vs merge commits",
        content:
          "'Squash and merge' collapses every commit in a PR into one clean commit on main. 'Merge commit' keeps every individual commit plus a merge commit. Squashing keeps main's history readable; full merges preserve fine-grained history for debugging.",
        question: "Why might a team choose 'squash and merge' for pull requests?",
        options: [
          "It's the only option GitHub provides",
          "It keeps main's commit history clean — one commit per feature/PR instead of many WIP commits",
          "It deletes the pull request",
          "It prevents merging entirely",
        ],
        correctIndex: 1,
        explanation: "Squashing trades fine-grained commit history for a simpler, more readable main branch log.",
      },
      {
        id: "gitt-4",
        title: "Handling force-pushes safely",
        content:
          "git push --force overwrites the remote branch with your local history, even if it deletes others' commits. git push --force-with-lease is safer — it fails if the remote has commits you haven't seen yet, preventing accidental data loss.",
        question: "Why is `--force-with-lease` generally preferred over plain `--force`?",
        options: [
          "It pushes faster",
          "It refuses to overwrite remote commits you haven't fetched yet, preventing accidental loss of teammates' work",
          "It force-pushes to every branch at once",
          "There's no difference between them",
        ],
        correctIndex: 1,
        explanation: "force-with-lease adds a safety check so you don't blindly clobber commits you didn't know existed.",
      },
      {
        id: "gitt-5",
        title: "Resolving PR review feedback",
        question: "After pushing new commits in response to review feedback, what should you typically do?",
        options: [
          "Open a brand new pull request",
          "Reply to the relevant review comments and re-request review so the reviewer knows to look again",
          "Delete the original commits",
          "Ignore the feedback since the PR is already open",
        ],
        correctIndex: 1,
        explanation: "Acknowledging feedback and re-requesting review keeps the conversation clear and signals you've addressed it.",
      },
    ],
  },
];

export const allGitTeamsLessons = gitTeamsUnits.flatMap((u) => u.lessons);
