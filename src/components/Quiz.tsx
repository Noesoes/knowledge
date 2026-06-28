import { useState } from "react";
import type { QuizQuestion } from "../types";

export default function Quiz({ questions, onPassed }: { questions: QuizQuestion[]; onPassed: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const correctCount = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const passed = submitted && correctCount === questions.length;

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (questions.filter((q, i) => answers[i] === q.correctIndex).length === questions.length) {
      onPassed();
    }
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const selected = answers[qi];
        return (
          <div key={qi} className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
            <p className="font-medium mb-3">{qi + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = submitted && oi === q.correctIndex;
                const isWrongSelected = submitted && isSelected && oi !== q.correctIndex;
                return (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(qi, oi)}
                    className={[
                      "w-full text-left px-3 py-2 rounded-md border text-sm transition-colors",
                      isCorrect ? "border-green-500 bg-green-500/10 text-green-300" : "",
                      isWrongSelected ? "border-red-500 bg-red-500/10 text-red-300" : "",
                      !submitted && isSelected ? "border-indigo-400 bg-indigo-500/10" : "",
                      !submitted && !isSelected ? "border-slate-700 hover:border-slate-500" : "",
                      submitted && !isCorrect && !isWrongSelected ? "border-slate-800 opacity-60" : "",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-xs text-slate-400 mt-2">{q.explanation}</p>
            )}
          </div>
        );
      })}

      {!submitted && (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium"
        >
          Check answers
        </button>
      )}

      {submitted && (
        <div className="flex items-center gap-4">
          <p className={passed ? "text-green-400" : "text-amber-400"}>
            {correctCount} / {questions.length} correct
            {passed ? " — module complete." : " — review and try again to mark this module complete."}
          </p>
          {!passed && (
            <button onClick={retry} className="px-3 py-1.5 rounded-md border border-slate-600 text-sm">
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}
