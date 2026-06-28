export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeChallenge {
  id: string;
  language: "sql" | "python" | "bash";
  prompt: string;
  starter?: string;
  checks: RegExp[]; // every check must match the typed answer for it to pass
  solution: string;
  hint?: string;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  content: string; // lightweight markdown-ish, rendered by our own renderer
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  project?: string;
  codeChallenges?: CodeChallenge[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  modules: Module[];
}
