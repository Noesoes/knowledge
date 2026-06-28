import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sqlUnits, allSqlLessons, type SqlLesson } from "../content/sqlPath";
import { sqlSchemaPreview } from "../content/sqlSeed";
import { getDb, resetDb } from "../sqlEngine";
import { useSqlPathProgress } from "../useSqlPathProgress";
import Lesson from "../components/Lesson";

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        color: ["#5b9dff", "#3ecf8e", "#c792ea", "#ffb454", "#ff8a8a"][i % 5],
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 w-2 h-2 rounded-sm animate-[confetti-fall_1.1s_ease-in_forwards]"
          style={{ left: `${p.left}%`, backgroundColor: p.color, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}

function SqlExecLessonView({
  lesson,
  onPassed,
}: {
  lesson: Extract<SqlLesson, { type: "sql" }>;
  onPassed: () => void;
}) {
  const [query, setQuery] = useState(lesson.starter ?? "");
  const [result, setResult] = useState<{ columns: string[]; values: unknown[][] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<"pass" | "fail" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setQuery(lesson.starter ?? "");
    setResult(null);
    setError(null);
    setChecked(null);
    setShowHint(false);
    setShowSolution(false);
  }, [lesson.id, lesson.starter]);

  async function run() {
    try {
      const db = await getDb();
      const res = db.exec(query);
      setError(null);
      setResult(res[0] ?? { columns: [], values: [] });
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    }
  }

  function check() {
    const ok = lesson.checks.every((re) => re.test(query));
    setChecked(ok ? "pass" : "fail");
    if (ok) onPassed();
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-indigo-300">Exercise</h3>
      <p className="text-sm text-slate-300">{lesson.task}</p>
      <textarea
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setChecked(null);
        }}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") run();
        }}
        spellCheck={false}
        rows={4}
        className="w-full font-mono text-sm rounded-md border border-slate-700 focus:border-indigo-500 bg-slate-950 text-slate-100 p-3 outline-none"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={run} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium">
          ▶ Run
        </button>
        <button onClick={check} className="px-3 py-1.5 rounded-md border border-slate-600 text-sm text-slate-300">
          ✓ Check Answer
        </button>
        <button onClick={() => setShowHint((s) => !s)} className="text-sm text-slate-400 hover:text-slate-200">
          {showHint ? "Hide hint" : "Show hint"}
        </button>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="text-sm text-slate-400 hover:text-slate-200 sm:ml-auto"
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
      </div>

      {showHint && lesson.hint && <p className="text-xs text-amber-300">Hint: {lesson.hint}</p>}
      {showSolution && (
        <pre className="text-xs bg-slate-950 border border-slate-800 rounded-md p-3 overflow-x-auto">
          <code>{lesson.solution}</code>
        </pre>
      )}

      {error && <p className="text-sm font-mono text-red-400 whitespace-pre-wrap">⚠ {error}</p>}

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

      {checked && (
        <div
          className={
            "rounded-md px-3 py-2 text-sm " +
            (checked === "pass" ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300")
          }
        >
          {checked === "pass" ? "✓ Correct! Nice work." : "✗ Not quite — compare your output to the task and try again."}
        </div>
      )}
    </div>
  );
}

function McLessonView({ lesson, onPassed }: { lesson: Extract<SqlLesson, { type: "mc" }>; onPassed: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => setSelected(null), [lesson.id]);

  function select(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === lesson.correctIndex) onPassed();
  }

  return (
    <div className="space-y-3">
      <p className="font-medium">{lesson.question}</p>
      <div className="space-y-2">
        {lesson.options.map((opt, i) => {
          const isCorrect = selected !== null && i === lesson.correctIndex;
          const isWrong = selected === i && i !== lesson.correctIndex;
          return (
            <button
              key={i}
              onClick={() => select(i)}
              className={[
                "mc-option w-full text-left px-3 py-2 rounded-md border text-sm transition-colors",
                isCorrect ? "border-green-500 bg-green-500/10 text-green-300" : "",
                isWrong ? "border-red-500 bg-red-500/10 text-red-300" : "",
                selected === null ? "border-slate-700 hover:border-slate-500" : "",
                selected !== null && !isCorrect && !isWrong ? "border-slate-800 opacity-60" : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && <p className="quiz-explain text-xs text-slate-400">{lesson.explanation}</p>}
    </div>
  );
}

function FillLessonView({ lesson, onPassed }: { lesson: Extract<SqlLesson, { type: "fill" }>; onPassed: () => void }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValue("");
    setSubmitted(false);
  }, [lesson.id]);

  const correct = lesson.answers.some((a) => a.toLowerCase() === value.trim().toLowerCase());

  function submit() {
    setSubmitted(true);
    if (correct) onPassed();
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">{lesson.promptHtml}</p>
      <div className="fill-row flex flex-wrap items-center gap-2 font-mono text-sm bg-slate-950 border border-slate-800 rounded-md p-3">
        <span>{lesson.before}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSubmitted(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className={[
            "fill-input px-2 py-1 rounded-md border bg-slate-900 text-slate-100 outline-none w-32",
            submitted ? (correct ? "border-green-500" : "border-red-500") : "border-slate-700 focus:border-indigo-500",
          ].join(" ")}
        />
        <span>{lesson.after}</span>
      </div>
      <button onClick={submit} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium">
        Submit
      </button>
      {submitted && (
        <p className={correct ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
          {correct ? "✓ Correct!" : "✗ Not quite."} {lesson.explanation}
        </p>
      )}
    </div>
  );
}

export default function SqlCoursePage() {
  const progress = useSqlPathProgress();
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const firstUnstarted = allSqlLessons.find((l) => !progress.isLessonComplete(l.id));
    return firstUnstarted?.id ?? allSqlLessons[0].id;
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const [previewTable, setPreviewTable] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<{ columns: string[]; values: unknown[][] } | null>(null);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lesson = allSqlLessons.find((l) => l.id === activeLessonId) ?? allSqlLessons[0];
  const lessonIndex = allSqlLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = allSqlLessons[lessonIndex - 1];
  const nextLesson = allSqlLessons[lessonIndex + 1];

  function xpFor(l: SqlLesson) {
    return l.type === "sql" ? 10 : 5;
  }

  function handlePassed() {
    const wasComplete = progress.isLessonComplete(lesson.id);
    progress.completeLesson(lesson.id, xpFor(lesson));
    if (!wasComplete) {
      setShowConfetti(true);
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
      confettiTimeout.current = setTimeout(() => setShowConfetti(false), 1200);
    }
  }

  function selectLesson(id: string) {
    if (!progress.isUnlocked(id)) return;
    setActiveLessonId(id);
    setShowSidebar(false);
  }

  async function viewTable(table: string) {
    if (previewTable === table) {
      setPreviewTable(null);
      setPreviewRows(null);
      return;
    }
    const db = await getDb();
    const res = db.exec(`SELECT * FROM ${table} LIMIT 100;`);
    setPreviewTable(table);
    setPreviewRows(res[0] ?? { columns: [], values: [] });
  }

  useEffect(() => {
    // ensure DB is warmed up on mount
    getDb();
    return () => {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {showConfetti && <ConfettiBurst />}

      <Link to="/course/sql" className="text-sm text-slate-500 hover:text-slate-300">
        ← Back to SQL course overview
      </Link>

      <div className="flex items-center justify-between mt-3 mb-4 md:hidden">
        <button
          onClick={() => setShowSidebar((s) => !s)}
          className="px-3 py-1.5 rounded-md border border-slate-700 text-sm text-slate-300"
        >
          ☰ Lessons
        </button>
        <button
          onClick={() => setShowSchema((s) => !s)}
          className="px-3 py-1.5 rounded-md border border-slate-700 text-sm text-slate-300"
        >
          🗄 Schema
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside
          className={[
            "shrink-0 w-full md:w-72 space-y-4",
            showSidebar ? "block" : "hidden",
            "md:block",
          ].join(" ")}
        >
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
            <p className="font-semibold mb-2">📘 SQL Interactive Course</p>
            <div className="flex gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-300">
                🔥 {progress.streak} day streak
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300">
                ⭐ {progress.xp} XP
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />
            </div>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {sqlUnits.map((unit) => (
              <div key={unit.id}>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2 px-2 py-1 rounded-md"
                  style={{ color: unit.color, backgroundColor: `${unit.color}1a` }}
                >
                  {unit.title}
                </p>
                <div className="space-y-1">
                  {unit.lessons.map((l, i) => {
                    const done = progress.isLessonComplete(l.id);
                    const unlocked = progress.isUnlocked(l.id);
                    const active = l.id === activeLessonId;
                    return (
                      <button
                        key={l.id}
                        onClick={() => selectLesson(l.id)}
                        disabled={!unlocked}
                        className={[
                          "path-node w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-md text-sm transition-transform",
                          active ? "bg-indigo-500/10 border border-indigo-500" : "border border-transparent",
                          unlocked ? "hover:scale-[1.02] cursor-pointer" : "opacity-40 cursor-not-allowed",
                        ].join(" ")}
                      >
                        <span
                          className={
                            "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold " +
                            (done ? "bg-green-600 text-white" : unlocked ? "bg-slate-800 text-slate-300" : "bg-slate-900 text-slate-600")
                          }
                        >
                          {done ? "✓" : unlocked ? i + 1 : "🔒"}
                        </span>
                        <span className={unlocked ? "text-slate-200" : "text-slate-600"}>{l.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{lesson.title}</h2>

          {lesson.type === "sql" && <Lesson content={lesson.body} />}

          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/40 p-4">
            {lesson.type === "sql" && <SqlExecLessonView lesson={lesson} onPassed={handlePassed} />}
            {lesson.type === "mc" && <McLessonView lesson={lesson} onPassed={handlePassed} />}
            {lesson.type === "fill" && <FillLessonView lesson={lesson} onPassed={handlePassed} />}
          </div>

          <div className="flex items-center justify-between mt-6">
            {prevLesson ? (
              <button
                onClick={() => selectLesson(prevLesson.id)}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                ← Prev
              </button>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <button
                onClick={() => selectLesson(nextLesson.id)}
                disabled={!progress.isUnlocked(nextLesson.id)}
                className="text-sm px-4 py-2 rounded-md bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium"
              >
                Next →
              </button>
            ) : (
              <span />
            )}
          </div>
        </main>

        {/* Schema panel */}
        <aside
          className={[
            "shrink-0 space-y-3",
            showSchema ? "block w-full md:w-72" : "hidden",
            "md:block md:w-72",
            previewTable ? "md:w-[420px]" : "",
          ].join(" ")}
        >
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
            <p className="font-semibold text-indigo-300 mb-2">Schema</p>
            <div className="space-y-2">
              {sqlSchemaPreview.map((t) => (
                <div key={t.table} className="rounded-md border border-slate-800 p-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-indigo-300">{t.table}</p>
                    <button
                      onClick={() => viewTable(t.table)}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      👁 view data
                    </button>
                  </div>
                  <p className="text-slate-400">{t.columns.join(", ")}</p>
                  {previewTable === t.table && previewRows && (
                    <div className="mt-2 overflow-x-auto rounded-md border border-slate-800 max-h-48 overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-slate-800/50">
                          <tr>
                            {previewRows.columns.map((c) => (
                              <th key={c} className="text-left px-2 py-1 font-mono text-indigo-300">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewRows.values.map((row, ri) => (
                            <tr key={ri} className="border-t border-slate-800">
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-2 py-1 font-mono text-slate-300">
                                  {String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={async () => {
                await resetDb();
                setPreviewTable(null);
                setPreviewRows(null);
              }}
              className="mt-3 w-full px-3 py-1.5 rounded-md border border-slate-600 text-xs text-slate-300"
            >
              Reset data
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
