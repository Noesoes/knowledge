import { Link } from "react-router-dom";
import { useLessonPathProgress } from "../useLessonPathProgress";
import { useSqlPathProgress } from "../useSqlPathProgress";
import { gitUnits } from "../content/gitPath";
import { pythonUnits } from "../content/pythonPath";
import { apisUnits } from "../content/apisPath";

const paths = [
  { id: "git", href: "/git-path", icon: "🌱", title: "Git & GitHub", tagline: "Version control isn't optional — it's how all real software gets built." },
  { id: "python", href: "/python-path", icon: "🐍", title: "Python Fundamentals", tagline: "A practical first language: readable syntax, huge ecosystem." },
  { id: "sql", href: "/sql-path", icon: "🗄️", title: "SQL & Databases", tagline: "Almost every application stores data in a database — SQL is how you talk to it." },
  { id: "apis", href: "/apis-path", icon: "🔌", title: "APIs & Web Services", tagline: "How software talks to other software — the connective tissue of every modern app." },
];

export default function Home() {
  const gitProgress = useLessonPathProgress("gitpath", gitUnits);
  const pythonProgress = useLessonPathProgress("pythonpath", pythonUnits);
  const apisProgress = useLessonPathProgress("apispath", apisUnits);
  const sqlProgress = useSqlPathProgress();

  const progressById: Record<string, { pct: number; xp: number; streak: number; done: number; total: number }> = {
    git: { pct: gitProgress.pct, xp: gitProgress.xp, streak: gitProgress.streak, done: gitProgress.completedCount, total: gitProgress.totalLessons },
    python: { pct: pythonProgress.pct, xp: pythonProgress.xp, streak: pythonProgress.streak, done: pythonProgress.completedCount, total: pythonProgress.totalLessons },
    sql: { pct: sqlProgress.pct, xp: sqlProgress.xp, streak: sqlProgress.streak, done: sqlProgress.completedCount, total: sqlProgress.totalLessons },
    apis: { pct: apisProgress.pct, xp: apisProgress.xp, streak: apisProgress.streak, done: apisProgress.completedCount, total: apisProgress.totalLessons },
  };

  const totalXp = gitProgress.xp + pythonProgress.xp + sqlProgress.xp + apisProgress.xp;
  const bestStreak = Math.max(gitProgress.streak, pythonProgress.streak, sqlProgress.streak, apisProgress.streak);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Everything they don't teach you in a coding bootcamp.</h1>
        <p className="text-slate-400 max-w-2xl">
          DevPath is a free set of Duolingo-style lesson paths for people heading into software development —
          version control, a first language, working with data, and how applications talk to each other. Bite-sized
          lessons, instant feedback, XP, and streaks.
        </p>
      </section>

      {totalXp > 0 && (
        <section className="mb-12 grid grid-cols-2 gap-3 sm:gap-5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-indigo-300">⭐ {totalXp}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">total XP</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-amber-300">🔥 {bestStreak}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">best day streak</p>
          </div>
        </section>
      )}

      <section className="grid sm:grid-cols-2 gap-5">
        {paths.map((path) => {
          const progress = progressById[path.id];
          return (
            <Link
              key={path.id}
              to={path.href}
              className="rounded-xl border border-slate-800 hover:border-indigo-500 bg-slate-900/40 p-5 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{path.icon}</span>
                {progress.done > 0 && (
                  <span className="text-xs text-slate-400">{progress.done}/{progress.total} done</span>
                )}
              </div>
              <h2 className="font-semibold text-lg mb-1 group-hover:text-indigo-300">{path.title}</h2>
              <p className="text-sm text-slate-400">{path.tagline}</p>
              {progress.done > 0 && (
                <div className="mt-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />
                </div>
              )}
            </Link>
          );
        })}
      </section>

      <section className="mt-16 text-sm text-slate-500 border-t border-slate-800 pt-6">
        <p>
          More on the way: the dev mindset & soft skills, command line basics, testing, deployment, and how to
          read a job description without panicking.
        </p>
      </section>
    </div>
  );
}
