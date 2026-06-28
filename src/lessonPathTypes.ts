export interface PathMcLesson {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PathUnit {
  id: string;
  title: string;
  color: string;
  lessons: PathMcLesson[];
}
