import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { PathUnit } from "../lessonPathTypes";
import { useLessonPathProgress } from "../useLessonPathProgress";

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

export default function LessonPathPage({
  title,
  icon,
  units,
  storagePrefix,
  backHref,
  backLabel,
}: {
  title: string;
  icon: string;
  units: PathUnit[];
  storagePrefix: string;
  backHref: string;
  backLabel: string;
}) {
  const allLessons = useMemo(() => units.flatMap((u) => u.lessons), [units]);
  const progress = useLessonPathProgress(storagePrefix, units);
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const firstUnstarted = allLessons.find((l) => !progress.isLessonComplete(l.id));
    return firstUnstarted?.id ?? allLessons[0].id;
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lesson = allLessons.find((l) => l.id === activeLessonId) ?? allLessons[0];
  const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = allLessons[lessonIndex - 1];
  const nextLesson = allLessons[lessonIndex + 1];

  function selectLesson(id: string) {
    if (!progress.isUnlocked(id)) return;
    setActiveLessonId(id);
    setSelected(null);
    setShowSidebar(false);
  }

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === lesson.correctIndex) {
      const wasComplete = progress.isLessonComplete(lesson.id);
      progress.completeLesson(lesson.id, 5);
      if (!wasComplete) {
        setShowConfetti(true);
        if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
        confettiTimeout.current = setTimeout(() => setShowConfetti(false), 1200);
      }
    }
  }

  function retry() {
    setSelected(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {showConfetti && <ConfettiBurst />}

      <Link to={backHref} className="text-sm text-slate-500 hover:text-slate-300">
        ← {backLabel}
      </Link>

      <div className="flex items-center justify-between mt-3 mb-4 md:hidden">
        <button
          onClick={() => setShowSidebar((s) => !s)}
          className="px-3 py-1.5 rounded-md border border-slate-700 text-sm text-slate-300"
        >
          ☰ Lessons
        </button>
      </div>

      <div className="flex gap-6">
        <aside className={["shrink-0 w-full md:w-72 space-y-4", showSidebar ? "block" : "hidden", "md:block"].join(" ")}>
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
            <p className="font-semibold mb-2">
              {icon} {title}
            </p>
            <div className="flex gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-300">
                🔥 {progress.streak} day streak
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300">⭐ {progress.xp} XP</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />
            </div>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {units.map((unit) => (
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

        <main className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{lesson.title}</h2>

          <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 space-y-3">
            <p className="font-medium">{lesson.question}</p>
            <div className="space-y-2">
              {lesson.options.map((opt, i) => {
                const isCorrect = selected !== null && i === lesson.correctIndex;
                const isWrong = selected === i && i !== lesson.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
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
            {selected !== null && <p className="text-xs text-slate-400">{lesson.explanation}</p>}
            {selected !== null && selected !== lesson.correctIndex && (
              <button onClick={retry} className="px-3 py-1.5 rounded-md border border-slate-600 text-sm text-slate-300">
                Retry
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            {prevLesson ? (
              <button onClick={() => selectLesson(prevLesson.id)} className="text-sm text-slate-400 hover:text-slate-200">
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
      </div>
    </div>
  );
}
