import { Link } from "react-router-dom";
import { useLessonPathProgress } from "../useLessonPathProgress";
import { useSqlPathProgress } from "../useSqlPathProgress";
import { gitUnits } from "../content/gitPath";
import { gitBranchingUnits } from "../content/gitBranchingPath";
import { gitTeamsUnits } from "../content/gitTeamsPath";
import { gitActionsUnits } from "../content/gitActionsPath";
import { gitInternalsUnits } from "../content/gitInternalsPath";
import { cliUnits } from "../content/cliPath";
import { cliScriptingUnits } from "../content/cliScriptingPath";
import { cliPowerUserUnits } from "../content/cliPowerUserPath";
import { pythonUnits } from "../content/pythonPath";
import { pythonDataStructuresUnits } from "../content/pythonDataStructuresPath";
import { pythonDebuggingUnits } from "../content/pythonDebuggingPath";
import { pythonOopUnits } from "../content/pythonOopPath";
import { pythonPerformanceUnits } from "../content/pythonPerformancePath";
import { sqlDesignUnits } from "../content/sqlDesignPath";
import { sqlJoinsUnits } from "../content/sqlJoinsPath";
import { sqlAdvancedUnits } from "../content/sqlAdvancedPath";
import { apisUnits } from "../content/apisPath";
import { apisDesignUnits } from "../content/apisDesignPath";
import { apisAuthUnits } from "../content/apisAuthPath";
import { apisAdvancedUnits } from "../content/apisAdvancedPath";
import { jsBasicsUnits } from "../content/jsBasicsPath";
import { jsArraysUnits } from "../content/jsArraysPath";
import { jsAsyncUnits } from "../content/jsAsyncPath";
import { typescriptBasicsUnits } from "../content/typescriptBasicsPath";
import { claudeBasicsUnits } from "../content/claudeBasicsPath";
import { cursorBasicsUnits } from "../content/cursorBasicsPath";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
};

type Level = "Beginner" | "Intermediate" | "Advanced";

interface CourseDef {
  id: string; icon: string; title: string; subject: string;
  level: Level; href: string; banner: string;
}

const COURSES: CourseDef[] = [
  { id: "git-core",          icon: "🌱", title: "Git & GitHub Fundamentals",          subject: "Git & GitHub",           level: "Beginner",     href: "/git-path",                banner: "#5b9dff" },
  { id: "git-branching",     icon: "🌿", title: "Git Branching Deep Dive",             subject: "Git & GitHub",           level: "Intermediate", href: "/git-branching-path",      banner: "#3ecf8e" },
  { id: "git-teams",         icon: "🤝", title: "Git for Teams",                       subject: "Git & GitHub",           level: "Intermediate", href: "/git-teams-path",          banner: "#c792ea" },
  { id: "git-actions",       icon: "🤖", title: "GitHub Actions & CI Basics",          subject: "Git & GitHub",           level: "Advanced",     href: "/git-actions-path",        banner: "#ff8a8a" },
  { id: "git-internals",     icon: "🧠", title: "Advanced Git Internals",              subject: "Git & GitHub",           level: "Advanced",     href: "/git-internals-path",      banner: "#ffb454" },
  { id: "cli-core",          icon: "⌨️", title: "Command Line Basics",                 subject: "Command Line",           level: "Beginner",     href: "/cli-path",                banner: "#3ecf8e" },
  { id: "cli-scripting",     icon: "📜", title: "Shell Scripting Essentials",          subject: "Command Line",           level: "Intermediate", href: "/cli-scripting-path",      banner: "#5b9dff" },
  { id: "cli-poweruser",     icon: "⚡", title: "Power User CLI Tricks",               subject: "Command Line",           level: "Advanced",     href: "/cli-poweruser-path",      banner: "#ffb454" },
  { id: "python-core",       icon: "🐍", title: "Python Fundamentals",                 subject: "Python",                 level: "Beginner",     href: "/python-path",             banner: "#ffb454" },
  { id: "python-datastructures", icon: "📦", title: "Python Data Structures Deep Dive", subject: "Python",               level: "Intermediate", href: "/python-datastructures-path", banner: "#c792ea" },
  { id: "python-debugging",  icon: "🐞", title: "Python Error Handling & Debugging",   subject: "Python",                 level: "Intermediate", href: "/python-debugging-path",   banner: "#5b9dff" },
  { id: "python-oop",        icon: "🧱", title: "Object-Oriented Python",              subject: "Python",                 level: "Intermediate", href: "/python-oop-path",         banner: "#3ecf8e" },
  { id: "python-performance",icon: "🚀", title: "Python Performance & Best Practices", subject: "Python",                 level: "Advanced",     href: "/python-performance-path", banner: "#ff8a8a" },
  { id: "sql-design",        icon: "📐", title: "Database Design Basics",              subject: "SQL & Databases",        level: "Beginner",     href: "/sql-design-path",         banner: "#ffb454" },
  { id: "sql-core",          icon: "🗄️", title: "SQL & Databases",                    subject: "SQL & Databases",        level: "Intermediate", href: "/sql-path",                banner: "#c792ea" },
  { id: "sql-joins",         icon: "🔗", title: "SQL Joins Deep Dive",                 subject: "SQL & Databases",        level: "Intermediate", href: "/sql-joins-path",          banner: "#5b9dff" },
  { id: "sql-advanced",      icon: "📊", title: "Advanced SQL: Window Functions",      subject: "SQL & Databases",        level: "Advanced",     href: "/sql-advanced-path",       banner: "#ffb454" },
  { id: "apis-core",         icon: "🔌", title: "APIs & Web Services",                 subject: "APIs",                   level: "Intermediate", href: "/apis-path",               banner: "#ff8a8a" },
  { id: "apis-design",       icon: "🧩", title: "REST API Design Best Practices",      subject: "APIs",                   level: "Intermediate", href: "/apis-design-path",        banner: "#5b9dff" },
  { id: "apis-auth",         icon: "🔐", title: "Authentication & Security for APIs",  subject: "APIs",                   level: "Advanced",     href: "/apis-auth-path",          banner: "#c792ea" },
  { id: "apis-advanced",     icon: "🌐", title: "GraphQL, Webhooks & Scaling APIs",   subject: "APIs",                   level: "Advanced",     href: "/apis-advanced-path",      banner: "#3ecf8e" },
  { id: "js-core",           icon: "💛", title: "JavaScript Fundamentals",             subject: "JavaScript",             level: "Beginner",     href: "/js-path",                 banner: "#ffb454" },
  { id: "js-arrays",         icon: "🔄", title: "Arrays & Modern JS Syntax",           subject: "JavaScript",             level: "Intermediate", href: "/js-arrays-path",          banner: "#3ecf8e" },
  { id: "js-async",          icon: "⏱️", title: "Async JavaScript",                   subject: "JavaScript",             level: "Intermediate", href: "/js-async-path",           banner: "#c792ea" },
  { id: "typescript-basics", icon: "🔷", title: "TypeScript Basics",                   subject: "JavaScript",             level: "Advanced",     href: "/typescript-basics-path",  banner: "#5b9dff" },
  { id: "claude-basics",     icon: "✨", title: "Claude Basics",                        subject: "AI Coding Tools",        level: "Beginner",     href: "/claude-basics-path",      banner: "#5b9dff" },
  { id: "cursor-basics",     icon: "🖱️", title: "Cursor Basics",                      subject: "AI Coding Tools",        level: "Beginner",     href: "/cursor-basics-path",      banner: "#c792ea" },
];

function ProgressBar({ pct, done, total }: { pct: number; done: number; total: number }) {
  const isComplete = done === total && total > 0;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
        <span>{done}/{total} lessons</span>
        <span>{isComplete ? "✓ Complete" : done > 0 ? `${Math.round(pct)}%` : "Not started"}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isComplete ? "bg-emerald-500" : "bg-indigo-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const gitCore = useLessonPathProgress("gitpath", gitUnits);
  const gitBranching = useLessonPathProgress("gitbranchingpath", gitBranchingUnits);
  const gitTeams = useLessonPathProgress("gitteamspath", gitTeamsUnits);
  const gitActions = useLessonPathProgress("gitactionspath", gitActionsUnits);
  const gitInternals = useLessonPathProgress("gitinternalspath", gitInternalsUnits);
  const cliCore = useLessonPathProgress("clipath", cliUnits);
  const cliScripting = useLessonPathProgress("cliscriptingpath", cliScriptingUnits);
  const cliPowerUser = useLessonPathProgress("clipoweruserpath", cliPowerUserUnits);
  const pythonCore = useLessonPathProgress("pythonpath", pythonUnits);
  const pythonDs = useLessonPathProgress("pythondatastructurespath", pythonDataStructuresUnits);
  const pythonDebug = useLessonPathProgress("pythondebuggingpath", pythonDebuggingUnits);
  const pythonOop = useLessonPathProgress("pythonooppath", pythonOopUnits);
  const pythonPerf = useLessonPathProgress("pythonperformancepath", pythonPerformanceUnits);
  const sqlDesign = useLessonPathProgress("sqldesignpath", sqlDesignUnits);
  const sqlCore = useSqlPathProgress();
  const sqlJoins = useLessonPathProgress("sqljoinspath", sqlJoinsUnits);
  const sqlAdv = useLessonPathProgress("sqladvancedpath", sqlAdvancedUnits);
  const apisCore = useLessonPathProgress("apispath", apisUnits);
  const apisDesign = useLessonPathProgress("apisdesignpath", apisDesignUnits);
  const apisAuth = useLessonPathProgress("apisauthpath", apisAuthUnits);
  const apisAdv = useLessonPathProgress("apisadvancedpath", apisAdvancedUnits);
  const jsBasics = useLessonPathProgress("jspath", jsBasicsUnits);
  const jsArrays = useLessonPathProgress("jsarrayspath", jsArraysUnits);
  const jsAsync = useLessonPathProgress("jsasyncpath", jsAsyncUnits);
  const tsBasics = useLessonPathProgress("typescriptbasicspath", typescriptBasicsUnits);
  const claudeBasics = useLessonPathProgress("claudebasicspath", claudeBasicsUnits);
  const cursorBasics = useLessonPathProgress("cursorbasicspath", cursorBasicsUnits);

  const progressMap: Record<string, ReturnType<typeof useLessonPathProgress>> = {
    "git-core": gitCore, "git-branching": gitBranching, "git-teams": gitTeams,
    "git-actions": gitActions, "git-internals": gitInternals,
    "cli-core": cliCore, "cli-scripting": cliScripting, "cli-poweruser": cliPowerUser,
    "python-core": pythonCore, "python-datastructures": pythonDs, "python-debugging": pythonDebug,
    "python-oop": pythonOop, "python-performance": pythonPerf,
    "sql-design": sqlDesign, "sql-core": sqlCore, "sql-joins": sqlJoins, "sql-advanced": sqlAdv,
    "apis-core": apisCore, "apis-design": apisDesign, "apis-auth": apisAuth, "apis-advanced": apisAdv,
    "js-core": jsBasics, "js-arrays": jsArrays, "js-async": jsAsync, "typescript-basics": tsBasics,
    "claude-basics": claudeBasics, "cursor-basics": cursorBasics,
  };

  const totalXp = Object.values(progressMap).reduce((s, p) => s + p.xp, 0);
  const completed = COURSES.filter((c) => {
    const p = progressMap[c.id];
    return p && p.completedCount === p.totalLessons && p.totalLessons > 0;
  }).length;
  const started = COURSES.filter((c) => {
    const p = progressMap[c.id];
    return p && p.completedCount > 0 && p.completedCount < p.totalLessons;
  }).length;
  const totalLessons = Object.values(progressMap).reduce((s, p) => s + p.totalLessons, 0);
  const doneLessons = Object.values(progressMap).reduce((s, p) => s + p.completedCount, 0);

  const subjects = Array.from(new Set(COURSES.map((c) => c.subject)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline">
        ← Back to all paths
      </Link>
      <h1 className="text-2xl font-bold mt-3 mb-1 text-slate-900 dark:text-slate-100">Your Progress</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        {doneLessons} of {totalLessons} total lessons completed across all courses.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Total XP", value: `⭐ ${totalXp}`, color: "text-indigo-500 dark:text-indigo-300" },
          { label: "Courses complete", value: `✓ ${completed}`, color: "text-emerald-500 dark:text-emerald-300" },
          { label: "In progress", value: `▶ ${started}`, color: "text-amber-500 dark:text-amber-300" },
          { label: "Lessons done", value: `${doneLessons}`, color: "text-slate-700 dark:text-slate-200" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 text-center shadow-sm"
          >
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {subjects.map((subject) => (
        <section key={subject} className="mb-10">
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            {subject}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.filter((c) => c.subject === subject).map((course) => {
              const p = progressMap[course.id];
              const pct = p?.pct ?? 0;
              const done = p?.completedCount ?? 0;
              const total = p?.totalLessons ?? 0;
              const xp = p?.xp ?? 0;
              return (
                <Link
                  key={course.id}
                  to={course.href}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-1">
                    <span
                      className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${course.banner}33` }}
                    >
                      {course.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 line-clamp-2 leading-snug">
                        {course.title}
                      </p>
                      <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${levelColors[course.level]}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <ProgressBar pct={pct} done={done} total={total} />
                  {xp > 0 && <p className="text-[10px] text-indigo-500 dark:text-indigo-400 mt-2">⭐ {xp} XP earned</p>}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
