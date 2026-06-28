import { Link } from "react-router-dom";
import { useLessonPathProgress } from "../useLessonPathProgress";
import { useSqlPathProgress } from "../useSqlPathProgress";
import { gitUnits } from "../content/gitPath";
import { pythonUnits } from "../content/pythonPath";
import { apisUnits } from "../content/apisPath";
import { cliUnits } from "../content/cliPath";

const paths = [
  {
    id: "git",
    href: "/git-path",
    icon: "🌱",
    title: "Git & GitHub",
    tagline: "Version control isn't optional — it's how all real software gets built.",
    level: "Beginner",
    minutes: 35,
    learn: ["Commits, staging, and history", "Branching and merge conflicts", "Pull requests and code review"],
  },
  {
    id: "cli",
    href: "/cli-path",
    icon: "⌨️",
    title: "Command Line Basics",
    tagline: "The terminal is the universal interface for working with servers and tools.",
    level: "Beginner",
    minutes: 30,
    learn: ["Navigating the filesystem", "Files, pipes, and redirection", "Everyday productivity tricks"],
  },
  {
    id: "python",
    href: "/python-path",
    icon: "🐍",
    title: "Python Fundamentals",
    tagline: "A practical first language: readable syntax, huge ecosystem.",
    level: "Beginner",
    minutes: 90,
    learn: ["Variables, control flow, and functions", "Lists, dicts, and data structures", "Errors and debugging"],
  },
  {
    id: "sql",
    href: "/sql-path",
    icon: "🗄️",
    title: "SQL & Databases",
    tagline: "Almost every application stores data in a database — SQL is how you talk to it.",
    level: "Intermediate",
    minutes: 75,
    learn: ["Querying and filtering data", "Joins across tables", "Writing real SQL against a live database"],
  },
  {
    id: "apis",
    href: "/apis-path",
    icon: "🔌",
    title: "APIs & Web Services",
    tagline: "How software talks to other software — the connective tissue of every modern app.",
    level: "Intermediate",
    minutes: 80,
    learn: ["HTTP methods, status codes, and REST", "Authentication: API keys, tokens, OAuth", "Webhooks, rate limits, and reliability"],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-300",
  Intermediate: "bg-amber-500/10 text-amber-300",
};

export default function Home() {
  const gitProgress = useLessonPathProgress("gitpath", gitUnits);
  const cliProgress = useLessonPathProgress("clipath", cliUnits);
  const pythonProgress = useLessonPathProgress("pythonpath", pythonUnits);
  const apisProgress = useLessonPathProgress("apispath", apisUnits);
  const sqlProgress = useSqlPathProgress();

  const progressById: Record<string, { pct: number; xp: number; streak: number; done: number; total: number }> = {
    git: { pct: gitProgress.pct, xp: gitProgress.xp, streak: gitProgress.streak, done: gitProgress.completedCount, total: gitProgress.totalLessons },
    cli: { pct: cliProgress.pct, xp: cliProgress.xp, streak: cliProgress.streak, done: cliProgress.completedCount, total: cliProgress.totalLessons },
    python: { pct: pythonProgress.pct, xp: pythonProgress.xp, streak: pythonProgress.streak, done: pythonProgress.completedCount, total: pythonProgress.totalLessons },
    sql: { pct: sqlProgress.pct, xp: sqlProgress.xp, streak: sqlProgress.streak, done: sqlProgress.completedCount, total: sqlProgress.totalLessons },
    apis: { pct: apisProgress.pct, xp: apisProgress.xp, streak: apisProgress.streak, done: apisProgress.completedCount, total: apisProgress.totalLessons },
  };

  const totalXp = gitProgress.xp + cliProgress.xp + pythonProgress.xp + sqlProgress.xp + apisProgress.xp;
  const bestStreak = Math.max(gitProgress.streak, cliProgress.streak, pythonProgress.streak, sqlProgress.streak, apisProgress.streak);

  const inProgress = paths.find((p) => {
    const pr = progressById[p.id];
    return pr.done > 0 && pr.done < pr.total;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Everything they don't teach you in a coding bootcamp.</h1>
        <p className="text-slate-400 max-w-2xl">
          DevPath is a free catalog of Duolingo-style courses for people heading into software development —
          version control, the terminal, a first language, working with data, and how applications talk to each
          other. Bite-sized lessons, instant feedback, XP, and streaks.
        </p>
      </section>

      {totalXp > 0 && (
        <section className="mb-10 grid grid-cols-2 gap-3 sm:gap-5">
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

      {inProgress && (
        <section className="mb-10">
          <Link
            to={inProgress.href}
            className="flex items-center justify-between gap-4 rounded-xl border border-indigo-500/60 bg-indigo-500/10 p-4 hover:border-indigo-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{inProgress.icon}</span>
              <div>
                <p className="text-sm text-indigo-300 font-medium">Continue where you left off</p>
                <p className="text-xs text-slate-400">
                  {inProgress.title} — {progressById[inProgress.id].done}/{progressById[inProgress.id].total} lessons done
                </p>
              </div>
            </div>
            <span className="text-sm text-indigo-300 shrink-0">Resume →</span>
          </Link>
        </section>
      )}

      <section className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Course catalog</h2>
      </section>

      <section className="grid sm:grid-cols-2 gap-5">
        {paths.map((path) => {
          const progress = progressById[path.id];
          return (
            <Link
              key={path.id}
              to={path.href}
              className="rounded-xl border border-slate-800 hover:border-indigo-500 bg-slate-900/40 p-5 transition-colors group flex flex-col"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{path.icon}</span>
                {progress.done > 0 && (
                  <span className="text-xs text-slate-400">{progress.done}/{progress.total} done</span>
                )}
              </div>
              <h2 className="font-semibold text-lg mb-1 group-hover:text-indigo-300">{path.title}</h2>
              <p className="text-sm text-slate-400 mb-3">{path.tagline}</p>

              <ul className="text-xs text-slate-400 space-y-1 mb-3">
                {path.learn.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 mt-auto mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${levelColors[path.level]}`}>
                  {path.level}
                </span>
                <span className="text-[10px] text-slate-500">~{path.minutes} min</span>
              </div>

              {progress.done > 0 && (
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />
                </div>
              )}
            </Link>
          );
        })}
      </section>

      <section className="mt-16 text-sm text-slate-500 border-t border-slate-800 pt-6">
        <p>
          More on the way: the dev mindset & soft skills, testing, deployment, and how to read a job description
          without panicking.
        </p>
      </section>
    </div>
  );
}
