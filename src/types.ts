export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  content: string; // lightweight markdown-ish, rendered by our own renderer
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  project?: string;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  modules: Module[];
}
