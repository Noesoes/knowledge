import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    loadPyodide?: (options?: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  setStdout: (options: { batched: (s: string) => void }) => void;
  setStderr: (options: { batched: (s: string) => void }) => void;
  runPythonAsync: (code: string) => Promise<unknown>;
}

const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/";

const DEFAULT_CODE = `# Try writing real Python here, then hit Run.
def greet(name):
    return f"Hello, {name}!"

for n in ["world", "Python"]:
    print(greet(n))
`;

type Status = "loading" | "ready" | "running" | "error";

export default function PythonTerminal() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("loading");
  const pyodideRef = useRef<PyodideInterface | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        if (!window.loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `${PYODIDE_BASE}pyodide.js`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide"));
            document.body.appendChild(script);
          });
        }
        if (cancelled || !window.loadPyodide) return;
        const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE });
        if (cancelled) return;
        pyodideRef.current = pyodide;
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function run() {
    const pyodide = pyodideRef.current;
    if (!pyodide) return;
    setStatus("running");
    setOutput("");
    try {
      pyodide.setStdout({ batched: (s) => setOutput((prev) => prev + s + "\n") });
      pyodide.setStderr({ batched: (s) => setOutput((prev) => prev + s + "\n") });
      await pyodide.runPythonAsync(code);
    } catch (err) {
      setOutput((prev) => prev + String(err) + "\n");
    } finally {
      setStatus("ready");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline">
        ← Back to all paths
      </Link>
      <h1 className="text-2xl font-bold mt-3 mb-1 text-slate-900 dark:text-slate-100">🧪 Python Practice Terminal</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        A real Python interpreter running in your browser (via Pyodide / WebAssembly) — write and run any code, no
        setup required.
      </p>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">script.py</span>
          <button
            onClick={run}
            disabled={status === "loading" || status === "running"}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Loading Python…" : status === "running" ? "Running…" : "▶ Run"}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none resize-y"
        />
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 p-4 font-mono text-sm min-h-32 whitespace-pre-wrap">
        {status === "loading" && (
          <span className="text-slate-400">Loading the Python runtime, this can take a few seconds the first time…</span>
        )}
        {status === "error" && (
          <span className="text-red-400">Couldn't load the Python runtime. Check your connection and reload the page.</span>
        )}
        {status !== "loading" && status !== "error" && (output || <span className="text-slate-500">Output will appear here.</span>)}
      </div>
    </div>
  );
}
