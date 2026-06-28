import { useState } from "react";
import type { CodeChallenge } from "../types";

function check(input: string, challenge: CodeChallenge) {
  return challenge.checks.every((re) => re.test(input));
}

export default function CodeChallengeBlock({ challenge }: { challenge: CodeChallenge }) {
  const [value, setValue] = useState(challenge.starter ?? "");
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const passed = checked && check(value, challenge);

  function run() {
    setChecked(true);
  }

  function reset() {
    setValue(challenge.starter ?? "");
    setChecked(false);
    setShowSolution(false);
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 space-y-3">
      <p className="text-sm text-slate-300">{challenge.prompt}</p>

      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setChecked(false);
        }}
        spellCheck={false}
        rows={4}
        placeholder={`Type your ${challenge.language.toUpperCase()} here…`}
        className={[
          "w-full font-mono text-sm rounded-md border bg-slate-950 text-slate-100 p-3 outline-none",
          checked
            ? passed
              ? "border-green-500"
              : "border-red-500"
            : "border-slate-700 focus:border-indigo-500",
        ].join(" ")}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={run}
          disabled={value.trim() === ""}
          className="px-3 py-1.5 rounded-md bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium"
        >
          Check my code
        </button>
        <button onClick={reset} className="px-3 py-1.5 rounded-md border border-slate-600 text-sm text-slate-300">
          Reset
        </button>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="text-sm text-slate-400 hover:text-slate-200 sm:ml-auto"
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
      </div>

      {checked && (
        <p className={passed ? "text-green-400 text-sm" : "text-amber-400 text-sm"}>
          {passed
            ? "✓ That works."
            : challenge.hint
              ? `Not quite. Hint: ${challenge.hint}`
              : "Not quite — check the syntax and try again."}
        </p>
      )}

      {showSolution && (
        <pre className="text-xs bg-slate-950 border border-slate-800 rounded-md p-3 overflow-x-auto">
          <code>{challenge.solution}</code>
        </pre>
      )}
    </div>
  );
}
