export type PathDiagramKind =
  | "client-server"
  | "rest-methods"
  | "status-codes"
  | "rest-url"
  | "bearer-token"
  | "oauth"
  | "websocket"
  | "webhook"
  | "rate-limit"
  | "redirect"
  | "pipe";

export interface PathMcLesson {
  id: string;
  title: string;
  content?: string;
  diagram?: PathDiagramKind;
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
