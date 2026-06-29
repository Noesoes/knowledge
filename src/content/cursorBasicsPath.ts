import type { PathUnit } from "../lessonPathTypes";

export const cursorBasicsUnits: PathUnit[] = [
  {
    id: "cursor-basics",
    title: "Cursor Basics",
    color: "#c792ea",
    lessons: [
      {
        id: "cursor-1",
        title: "What Cursor is",
        content:
          "Cursor is a code editor (built on the same foundation as VS Code) with AI assistance built directly into the editing experience — so instead of copy-pasting code into a separate chat window, the AI can read your open files and edit code in place.",
        question: "What's the key difference between using Cursor and copy-pasting code into a separate AI chat window?",
        options: [
          "There's no real difference, they work identically",
          "Cursor's AI is integrated into the editor itself, so it has direct access to your project's files and can apply edits in place instead of you manually copying code back and forth",
          "Cursor only works without an internet connection",
          "Cursor can't see any of your code at all",
        ],
        correctIndex: 1,
        explanation: "In-editor integration means the AI can read relevant files directly and write changes back into them, removing manual copy/paste steps.",
      },
      {
        id: "cursor-2",
        title: "Inline AI edits",
        content:
          "Cursor lets you select code and describe a change in plain language (e.g. 'add error handling here'), and it proposes an edit directly inline as a diff you can accept or reject — instead of regenerating the whole file or pasting from a chat.",
        question: "What's the benefit of an inline AI edit proposing a diff, rather than just dumping a full rewritten file?",
        options: [
          "It guarantees the AI is always correct",
          "A diff shows exactly what would change, so you can review and accept/reject precisely instead of having to compare an entire rewritten file by eye",
          "Diffs run automatically without any review",
          "It removes the need to ever read the code",
        ],
        correctIndex: 1,
        explanation: "A focused diff makes the proposed change easy to review at a glance, rather than re-diffing a whole file manually.",
      },
      {
        id: "cursor-3",
        title: "Chat with codebase context",
        content:
          "Cursor's chat can be pointed at specific files or the whole project so the AI's answers are grounded in your actual code rather than generic guesses — useful for questions like 'where is this function used?' or 'why might this test be failing?'",
        question: "Why does giving the AI chat access to relevant files in your project produce better answers than a generic chat with no code context?",
        options: [
          "It doesn't change anything about answer quality",
          "Grounding the answer in your actual code lets the AI reason about your specific implementation, naming, and structure instead of guessing generically",
          "It makes the AI respond in a different programming language",
          "Codebase context is only used for formatting, not reasoning",
        ],
        correctIndex: 1,
        explanation: "Real project context lets the model reference your actual functions, types, and patterns instead of producing generic, possibly mismatched code.",
      },
      {
        id: "cursor-4",
        title: "Reviewing and accepting/rejecting suggestions",
        content:
          "AI-suggested edits in Cursor are proposals, not automatic commits — you stay in control by reviewing each suggested change before accepting it, the same way you'd review a teammate's suggested edit, rather than blindly trusting every suggestion.",
        question: "Why should you still review an AI-suggested code edit before accepting it, even in an AI-native editor?",
        options: [
          "Suggestions are always perfectly correct so review is pointless",
          "The AI can misunderstand intent or introduce subtle bugs, so reviewing the diff before accepting keeps you responsible for what actually ships",
          "Cursor doesn't allow you to reject suggestions",
          "Review is only necessary for very large files",
        ],
        correctIndex: 1,
        explanation: "Treating AI suggestions like a pull request from a collaborator — reviewed before merging — catches mistakes before they land in your codebase.",
      },
      {
        id: "cursor-5",
        title: "Project-level rules for consistent style",
        content:
          "Many AI editors let you define project-level instructions (like a rules file) describing your conventions — naming style, preferred libraries, testing patterns — so AI suggestions across the whole project stay consistent instead of varying by random prompt phrasing.",
        question: "What problem do project-level AI instructions/rules files solve?",
        options: [
          "They make the AI generate code faster",
          "They give the AI consistent context about your team's conventions, so suggestions stay aligned with your codebase's style instead of varying randomly per prompt",
          "They are required for the editor to function at all",
          "They replace the need for code review entirely",
        ],
        correctIndex: 1,
        explanation: "Persistent project conventions act like a standing system prompt for that codebase, keeping AI output consistent with how the team actually writes code.",
      },
    ],
  },
];

export const allCursorBasicsLessons = cursorBasicsUnits.flatMap((u) => u.lessons);
