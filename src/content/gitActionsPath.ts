import type { PathUnit } from "../lessonPathTypes";

export const gitActionsUnits: PathUnit[] = [
  {
    id: "github-actions",
    title: "GitHub Actions & CI",
    color: "#3ecf8e",
    lessons: [
      {
        id: "gita-1",
        title: "What CI/CD automates",
        content:
          "Continuous Integration (CI) automatically builds and tests your code every time you push, catching bugs before they reach reviewers. Continuous Deployment (CD) goes further and automatically ships passing code to production or staging.",
        question: "What's the main benefit of running CI on every push instead of testing manually before merging?",
        options: [
          "It makes the code run faster in production",
          "It catches breakages automatically and consistently, instead of relying on someone remembering to test manually",
          "It replaces the need for code review entirely",
          "It only matters for very large teams",
        ],
        correctIndex: 1,
        explanation: "Automated, consistent checks on every push remove the risk of a human forgetting to run tests before merging.",
      },
      {
        id: "gita-2",
        title: "Anatomy of a workflow file",
        content:
          "A GitHub Actions workflow is a YAML file in .github/workflows/. It has a `name`, an `on` trigger, and one or more `jobs`, each made of sequential `steps` that run commands or reusable `actions` (like checkout or setup-node).",
        question: "In a GitHub Actions workflow YAML file, what does a `job`'s `steps` list represent?",
        options: [
          "A list of contributors to the repository",
          "The sequential commands or actions that run, in order, to complete that job",
          "The branches the workflow is allowed to run on",
          "A changelog of past workflow runs",
        ],
        correctIndex: 1,
        explanation: "Steps run in order within a job — checking out code, installing dependencies, running tests, etc.",
      },
      {
        id: "gita-3",
        title: "Triggers: on push, pull_request, schedule",
        question: "Why might a workflow use `on: schedule` with a cron expression instead of `on: push`?",
        options: [
          "Scheduled triggers run faster than push triggers",
          "To run a job on a recurring time basis (like a nightly build) rather than in response to a code change",
          "Schedule triggers are required for all workflows",
          "Push triggers don't actually exist in GitHub Actions",
        ],
        correctIndex: 1,
        explanation: "Cron-based schedule triggers are for time-based jobs — nightly builds, periodic cleanup — independent of any commit.",
      },
      {
        id: "gita-4",
        title: "Secrets and environment variables",
        question: "Why should an API key used in a workflow be stored as a GitHub Actions secret instead of hardcoded in the YAML file?",
        options: [
          "Secrets make the workflow run faster",
          "Hardcoded values in a YAML file are visible to anyone who can read the repo's history, while secrets are encrypted and masked in logs",
          "YAML files can't contain strings at all",
          "There's no actual difference, it's just a style preference",
        ],
        correctIndex: 1,
        explanation: "Secrets are encrypted at rest and automatically redacted from workflow logs, unlike plain text committed to a YAML file.",
      },
      {
        id: "gita-5",
        title: "Caching dependencies and matrix builds",
        content:
          "Caching (e.g. caching node_modules) skips redundant downloads on repeat runs, speeding up CI. A build matrix runs the same job across multiple combinations (e.g. Node 18 and 20, on Ubuntu and Windows) to catch environment-specific bugs.",
        question: "What problem does a CI build matrix help catch that a single-environment run would miss?",
        options: [
          "Typos in commit messages",
          "Bugs that only appear on certain OS/runtime version combinations, by testing several combinations in parallel",
          "Merge conflicts between branches",
          "Slow database queries",
        ],
        correctIndex: 1,
        explanation: "A matrix runs the same tests across multiple environment combinations, surfacing bugs specific to one OS or runtime version.",
      },
    ],
  },
];

export const allGitActionsLessons = gitActionsUnits.flatMap((u) => u.lessons);
