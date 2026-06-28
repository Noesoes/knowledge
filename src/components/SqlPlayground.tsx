import { useEffect, useRef, useState } from "react";
import initSqlJs, { type Database } from "sql.js";
import { sqlSeed, sqlSchemaPreview } from "../content/sqlSeed";

let sqlJsPromise: ReturnType<typeof initSqlJs> | null = null;
function loadSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({
      locateFile: (file: string) => `${import.meta.env.BASE_URL}${file}`,
    });
  }
  return sqlJsPromise;
}

function freshDb(SQL: Awaited<ReturnType<typeof initSqlJs>>) {
  const db = new SQL.Database();
  db.run(sqlSeed);
  return db;
}

export default function SqlPlayground() {
  const dbRef = useRef<Database | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("SELECT * FROM customers;");
  const [result, setResult] = useState<{ columns: string[]; values: unknown[][] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSchema, setShowSchema] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadSqlJs()
      .then((SQL) => {
        if (cancelled) return;
        dbRef.current = freshDb(SQL);
        setReady(true);
      })
      .catch((e) => setLoadError((e as Error).message));
    return () => {
      cancelled = true;
      dbRef.current?.close();
    };
  }, []);

  function run() {
    if (!dbRef.current) return;
    try {
      const res = dbRef.current.exec(query);
      setError(null);
      setResult(res[0] ?? { columns: [], values: [] });
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    }
  }

  function resetData() {
    loadSqlJs().then((SQL) => {
      dbRef.current?.close();
      dbRef.current = freshDb(SQL);
      setResult(null);
      setError(null);
    });
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-indigo-300">SQL playground — real mock data, runs in your browser</p>
        <button onClick={() => setShowSchema((s) => !s)} className="text-sm text-slate-400 hover:text-slate-200">
          {showSchema ? "Hide tables" : "Show tables"}
        </button>
      </div>

      {showSchema && (
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          {sqlSchemaPreview.map((t) => (
            <div key={t.table} className="rounded-md border border-slate-800 p-2">
              <p className="font-mono text-indigo-300 mb-1">{t.table}</p>
              <p className="text-slate-400">{t.columns.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {loadError && <p className="text-red-400 text-sm">Failed to load SQL engine: {loadError}</p>}

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
        rows={4}
        placeholder="Write any SQL query against customers, orders, or products…"
        className="w-full font-mono text-sm rounded-md border border-slate-700 focus:border-indigo-500 bg-slate-950 text-slate-100 p-3 outline-none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={run}
          disabled={!ready || query.trim() === ""}
          className="px-3 py-1.5 rounded-md bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium"
        >
          {ready ? "Run query" : "Loading engine…"}
        </button>
        <button onClick={resetData} className="px-3 py-1.5 rounded-md border border-slate-600 text-sm text-slate-300">
          Reset data
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm font-mono whitespace-pre-wrap">{error}</p>
      )}

      {result && (
        <div className="overflow-x-auto rounded-md border border-slate-800">
          {result.columns.length === 0 ? (
            <p className="text-sm text-slate-400 p-3">Query ran successfully — no rows returned.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  {result.columns.map((c) => (
                    <th key={c} className="text-left px-3 py-1.5 font-mono text-indigo-300">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.values.map((row, ri) => (
                  <tr key={ri} className="border-t border-slate-800">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-1.5 font-mono text-slate-300">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
