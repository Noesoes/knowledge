import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLessonPathProgress } from "../useLessonPathProgress";
import { useSqlPathProgress } from "../useSqlPathProgress";
import { gitUnits } from "../content/gitPath";
import { gitBranchingUnits } from "../content/gitBranchingPath";
import { gitTeamsUnits } from "../content/gitTeamsPath";
import { pythonUnits } from "../content/pythonPath";
import { pythonDataStructuresUnits } from "../content/pythonDataStructuresPath";
import { pythonDebuggingUnits } from "../content/pythonDebuggingPath";
import { apisUnits } from "../content/apisPath";
import { apisDesignUnits } from "../content/apisDesignPath";
import { apisAuthUnits } from "../content/apisAuthPath";
import { cliUnits } from "../content/cliPath";
import { cliScriptingUnits } from "../content/cliScriptingPath";
import { cliPowerUserUnits } from "../content/cliPowerUserPath";
import { sqlJoinsUnits } from "../content/sqlJoinsPath";
import { sqlDesignUnits } from "../content/sqlDesignPath";
import { gitActionsUnits } from "../content/gitActionsPath";
import { gitInternalsUnits } from "../content/gitInternalsPath";
import { pythonOopUnits } from "../content/pythonOopPath";
import { pythonPerformanceUnits } from "../content/pythonPerformancePath";
import { sqlAdvancedUnits } from "../content/sqlAdvancedPath";
import { apisAdvancedUnits } from "../content/apisAdvancedPath";
import { claudeBasicsUnits } from "../content/claudeBasicsPath";
import { cursorBasicsUnits } from "../content/cursorBasicsPath";
import { jsBasicsUnits } from "../content/jsBasicsPath";
import { jsArraysUnits } from "../content/jsArraysPath";
import { jsAsyncUnits } from "../content/jsAsyncPath";
import { typescriptBasicsUnits } from "../content/typescriptBasicsPath";

interface CourseMeta {
  id: string;
  href: string;
  icon: string;
  title: string;
  tagline: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  rating: number;
  reviews: number;
  banner: string;
  isNew?: boolean;
}

interface Subject {
  id: string;
  title: string;
  blurb: string;
  courses: CourseMeta[];
}

const subjects: Subject[] = [
  {
    id: "git",
    title: "Git & GitHub",
    blurb: "Version control isn't optional — it's how all real software gets built.",
    courses: [
      {
        id: "git-core",
        href: "/git-path",
        icon: "🌱",
        title: "Git & GitHub Fundamentals",
        tagline: "Commits, staging, branching, and pull requests from the ground up.",
        level: "Beginner",
        minutes: 35,
        rating: 4.8,
        reviews: 1842,
        banner: "#5b9dff",
      },
      {
        id: "git-branching",
        href: "/git-branching-path",
        icon: "🌿",
        title: "Git Branching Deep Dive",
        tagline: "Rebase vs merge, conflict resolution, stashing, and cherry-picking.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.7,
        reviews: 612,
        banner: "#3ecf8e",
      },
      {
        id: "git-teams",
        href: "/git-teams-path",
        icon: "🤝",
        title: "Git for Teams: Workflows & Collaboration",
        tagline: "Branch protection, squash merges, force-pushes, and review etiquette.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.6,
        reviews: 388,
        banner: "#c792ea",
      },
      {
        id: "git-actions",
        href: "/git-actions-path",
        icon: "🤖",
        isNew: true,
        title: "GitHub Actions & CI Basics",
        tagline: "Workflow files, triggers, secrets, and caching for automated builds.",
        level: "Advanced",
        minutes: 25,
        rating: 4.7,
        reviews: 410,
        banner: "#ff8a8a",
      },
      {
        id: "git-internals",
        href: "/git-internals-path",
        icon: "🧠",
        isNew: true,
        title: "Advanced Git Internals",
        tagline: "Objects, the reflog, bisect, interactive rebase, and hooks.",
        level: "Advanced",
        minutes: 30,
        rating: 4.8,
        reviews: 290,
        banner: "#ffb454",
      },
    ],
  },
  {
    id: "cli",
    title: "Command Line Basics",
    blurb: "The terminal is the universal interface for working with servers and tools.",
    courses: [
      {
        id: "cli-core",
        href: "/cli-path",
        icon: "⌨️",
        title: "Command Line Basics",
        tagline: "Navigating the filesystem, files, pipes, and redirection.",
        level: "Beginner",
        minutes: 30,
        rating: 4.7,
        reviews: 1530,
        banner: "#3ecf8e",
      },
      {
        id: "cli-scripting",
        href: "/cli-scripting-path",
        icon: "📜",
        title: "Shell Scripting Essentials",
        tagline: "Variables, conditionals, loops, and writing your first real script.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.6,
        reviews: 524,
        banner: "#5b9dff",
      },
      {
        id: "cli-poweruser",
        href: "/cli-poweruser-path",
        icon: "⚡",
        title: "Power User CLI Tricks",
        tagline: "grep, xargs, background jobs, ssh, and aliases that save real time.",
        level: "Advanced",
        minutes: 25,
        rating: 4.8,
        reviews: 701,
        banner: "#ffb454",
      },
    ],
  },
  {
    id: "python",
    title: "Python Fundamentals",
    blurb: "A practical first language: readable syntax, huge ecosystem.",
    courses: [
      {
        id: "python-core",
        href: "/python-path",
        icon: "🐍",
        title: "Python Fundamentals",
        tagline: "Variables, control flow, functions, and core data structures.",
        level: "Beginner",
        minutes: 90,
        rating: 4.9,
        reviews: 2415,
        banner: "#ffb454",
      },
      {
        id: "python-datastructures",
        href: "/python-datastructures-path",
        icon: "📦",
        title: "Python Data Structures Deep Dive",
        tagline: "Lists, dicts, sets, comprehensions, and dataclasses.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.7,
        reviews: 689,
        banner: "#c792ea",
      },
      {
        id: "python-debugging",
        href: "/python-debugging-path",
        icon: "🐞",
        title: "Python Error Handling & Debugging",
        tagline: "try/except, custom exceptions, tracebacks, and real debugging.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.6,
        reviews: 433,
        banner: "#5b9dff",
      },
      {
        id: "python-oop",
        href: "/python-oop-path",
        icon: "🧱",
        isNew: true,
        title: "Object-Oriented Python",
        tagline: "Classes, inheritance, dunder methods, and composition vs inheritance.",
        level: "Intermediate",
        minutes: 30,
        rating: 4.7,
        reviews: 540,
        banner: "#3ecf8e",
      },
      {
        id: "python-performance",
        href: "/python-performance-path",
        icon: "🚀",
        isNew: true,
        title: "Python Performance & Best Practices",
        tagline: "Generators, decorators, Big O, profiling, and context managers.",
        level: "Advanced",
        minutes: 30,
        rating: 4.8,
        reviews: 360,
        banner: "#ff8a8a",
      },
    ],
  },
  {
    id: "sql",
    title: "SQL & Databases",
    blurb: "Almost every application stores data in a database — SQL is how you talk to it.",
    courses: [
      {
        id: "sql-design",
        href: "/sql-design-path",
        icon: "📐",
        title: "Database Design Basics",
        tagline: "Primary/foreign keys, normalization, data types, and indexes.",
        level: "Beginner",
        minutes: 25,
        rating: 4.6,
        reviews: 347,
        banner: "#ffb454",
      },
      {
        id: "sql-core",
        href: "/sql-path",
        icon: "🗄️",
        title: "SQL & Databases",
        tagline: "Querying, filtering, and joins — written against a real live database.",
        level: "Intermediate",
        minutes: 75,
        rating: 4.8,
        reviews: 1207,
        banner: "#c792ea",
      },
      {
        id: "sql-joins",
        href: "/sql-joins-path",
        icon: "🔗",
        title: "SQL Joins Deep Dive",
        tagline: "INNER vs LEFT, self joins, UNION, and avoiding duplicate rows.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.7,
        reviews: 502,
        banner: "#5b9dff",
      },
      {
        id: "sql-advanced",
        href: "/sql-advanced-path",
        icon: "📊",
        title: "Advanced SQL: Window Functions & Optimization",
        tagline: "Window functions, CTEs, execution plans, and transactions.",
        level: "Advanced",
        minutes: 30,
        rating: 4.7,
        reviews: 275,
        banner: "#ffb454",
      },
    ],
  },
  {
    id: "apis",
    title: "APIs & Web Services",
    blurb: "How software talks to other software — the connective tissue of every modern app.",
    courses: [
      {
        id: "apis-core",
        href: "/apis-path",
        icon: "🔌",
        title: "APIs & Web Services",
        tagline: "HTTP methods, status codes, REST, and authentication basics.",
        level: "Intermediate",
        minutes: 80,
        rating: 4.7,
        reviews: 968,
        banner: "#ff8a8a",
      },
      {
        id: "apis-design",
        href: "/apis-design-path",
        icon: "🧩",
        title: "REST API Design Best Practices",
        tagline: "Resource naming, pagination, versioning, and good error responses.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.6,
        reviews: 415,
        banner: "#5b9dff",
      },
      {
        id: "apis-auth",
        href: "/apis-auth-path",
        icon: "🔐",
        title: "Authentication & Security for APIs",
        tagline: "API keys vs tokens, JWTs, CORS, rate limiting, and HTTPS.",
        level: "Advanced",
        minutes: 25,
        rating: 4.8,
        reviews: 590,
        banner: "#c792ea",
      },
      {
        id: "apis-advanced",
        href: "/apis-advanced-path",
        icon: "🌐",
        title: "GraphQL, Webhooks & Scaling APIs",
        tagline: "REST vs GraphQL, webhooks, caching, load balancing, and gateways.",
        level: "Advanced",
        minutes: 30,
        rating: 4.6,
        reviews: 230,
        banner: "#3ecf8e",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    blurb: "The language of the web — from basic scripting to async APIs and typed codebases.",
    courses: [
      {
        id: "js-core",
        href: "/js-path",
        icon: "💛",
        title: "JavaScript Fundamentals",
        tagline: "Variables, functions, objects, arrays, and the quirks of JS equality.",
        level: "Beginner",
        minutes: 30,
        rating: 4.8,
        reviews: 1124,
        banner: "#ffb454",
        isNew: true,
      },
      {
        id: "js-arrays",
        href: "/js-arrays-path",
        icon: "🔄",
        title: "Arrays & Modern JS Syntax",
        tagline: "map/filter/reduce, destructuring, spread, optional chaining, Set, and Map.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.7,
        reviews: 638,
        banner: "#3ecf8e",
        isNew: true,
      },
      {
        id: "js-async",
        href: "/js-async-path",
        icon: "⏱️",
        title: "Async JavaScript",
        tagline: "The event loop, Promises, async/await, fetch, and Promise.all.",
        level: "Intermediate",
        minutes: 25,
        rating: 4.8,
        reviews: 720,
        banner: "#c792ea",
        isNew: true,
      },
      {
        id: "typescript-basics",
        href: "/typescript-basics-path",
        icon: "🔷",
        title: "TypeScript Basics",
        tagline: "Why TypeScript, annotations, interfaces, unions, and generics.",
        level: "Advanced",
        minutes: 25,
        rating: 4.7,
        reviews: 445,
        banner: "#5b9dff",
        isNew: true,
      },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Coding Tools",
    blurb: "Working with AI assistants and AI-native editors is now a core dev skill.",
    courses: [
      {
        id: "claude-basics",
        href: "/claude-basics-path",
        icon: "✨",
        isNew: true,
        title: "Claude Basics",
        tagline: "Prompting, system prompts, context windows, and verifying AI output.",
        level: "Beginner",
        minutes: 20,
        rating: 4.7,
        reviews: 312,
        banner: "#5b9dff",
      },
      {
        id: "cursor-basics",
        href: "/cursor-basics-path",
        icon: "🖱️",
        isNew: true,
        title: "Cursor Basics",
        tagline: "Inline AI edits, codebase-aware chat, and reviewing AI suggestions.",
        level: "Beginner",
        minutes: 20,
        rating: 4.6,
        reviews: 198,
        banner: "#c792ea",
      },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500 dark:text-amber-400 text-xs">
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

function CourseCard({ course, progress }: { course: CourseMeta; progress: { pct: number; done: number; total: number } }) {
  return (
    <Link
      to={course.href}
      className="shrink-0 w-64 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-900/40 shadow-sm hover:shadow-md transition-all group flex flex-col overflow-hidden"
    >
      <div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.25) 2px, transparent 0), linear-gradient(135deg, ${course.banner}, ${course.banner}99)`,
          backgroundSize: "28px 28px, 100% 100%",
        }}
      >
        <span className="text-6xl drop-shadow-sm select-none">{course.icon}</span>
        {course.isNew && progress.done === 0 && (
          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-semibold tracking-wide">
            NEW
          </span>
        )}
        {progress.done > 0 && (
          <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 font-medium">
            {progress.done}/{progress.total} done
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 leading-snug line-clamp-2 min-h-[2.5em]">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2 min-h-[2em]">{course.tagline}</p>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={course.rating} />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{course.rating}</span>
          <span className="text-xs text-slate-400">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto mb-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${levelColors[course.level]}`}>{course.level}</span>
          <span className="text-[10px] text-slate-400">~{course.minutes} min</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium ml-auto">
            Free
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {progress.done > 0 && <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />}
        </div>
      </div>
    </Link>
  );
}

function CourseRow({ subject, progressByCourse }: { subject: Subject; progressByCourse: Record<string, { pct: number; done: number; total: number }> }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    function checkScrollState() {
      if (!el) return;
      setCanScroll(el.scrollWidth > el.clientWidth + 1);
      setAtStart(el.scrollLeft <= 20);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 20);
    }
    checkScrollState();
    const observer = new ResizeObserver(checkScrollState);
    observer.observe(el);
    el.addEventListener("scroll", checkScrollState, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", checkScrollState);
    };
  }, [subject.courses.length]);

  return (
    <section className="mb-10">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{subject.title}</h2>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{subject.blurb}</p>
      <div className="relative">
        {canScroll && !atStart && (
          <>
            <div className="hidden sm:block pointer-events-none absolute left-0 top-0 bottom-2 w-12 z-10 bg-gradient-to-r from-slate-50 dark:from-[#0b0f17] to-transparent" />
            <button
              onClick={() => scrollBy(-280)}
              aria-label="Scroll left"
              className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md items-center justify-center text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 hover:scale-105 transition-transform"
            >
              ‹
            </button>
          </>
        )}
        {canScroll && !atEnd && (
          <>
            <div className="hidden sm:block pointer-events-none absolute right-0 top-0 bottom-2 w-12 z-10 bg-gradient-to-l from-slate-50 dark:from-[#0b0f17] to-transparent" />
            <button
              onClick={() => scrollBy(280)}
              aria-label="Scroll right"
              className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md items-center justify-center text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 hover:scale-105 transition-transform"
            >
              ›
            </button>
          </>
        )}
        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth snap-x">
          {subject.courses.map((course) => (
            <div key={course.id} className="snap-start">
              <CourseCard course={course} progress={progressByCourse[course.id] ?? { pct: 0, done: 0, total: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");

  const gitCoreProgress = useLessonPathProgress("gitpath", gitUnits);
  const gitBranchingProgress = useLessonPathProgress("gitbranchingpath", gitBranchingUnits);
  const gitTeamsProgress = useLessonPathProgress("gitteamspath", gitTeamsUnits);
  const cliCoreProgress = useLessonPathProgress("clipath", cliUnits);
  const cliScriptingProgress = useLessonPathProgress("cliscriptingpath", cliScriptingUnits);
  const cliPowerUserProgress = useLessonPathProgress("clipoweruserpath", cliPowerUserUnits);
  const pythonCoreProgress = useLessonPathProgress("pythonpath", pythonUnits);
  const pythonDataStructuresProgress = useLessonPathProgress("pythondatastructurespath", pythonDataStructuresUnits);
  const pythonDebuggingProgress = useLessonPathProgress("pythondebuggingpath", pythonDebuggingUnits);
  const sqlCoreProgress = useSqlPathProgress();
  const sqlJoinsProgress = useLessonPathProgress("sqljoinspath", sqlJoinsUnits);
  const sqlDesignProgress = useLessonPathProgress("sqldesignpath", sqlDesignUnits);
  const apisCoreProgress = useLessonPathProgress("apispath", apisUnits);
  const apisDesignProgress = useLessonPathProgress("apisdesignpath", apisDesignUnits);
  const apisAuthProgress = useLessonPathProgress("apisauthpath", apisAuthUnits);
  const gitActionsProgress = useLessonPathProgress("gitactionspath", gitActionsUnits);
  const gitInternalsProgress = useLessonPathProgress("gitinternalspath", gitInternalsUnits);
  const pythonOopProgress = useLessonPathProgress("pythonooppath", pythonOopUnits);
  const pythonPerformanceProgress = useLessonPathProgress("pythonperformancepath", pythonPerformanceUnits);
  const sqlAdvancedProgress = useLessonPathProgress("sqladvancedpath", sqlAdvancedUnits);
  const apisAdvancedProgress = useLessonPathProgress("apisadvancedpath", apisAdvancedUnits);
  const claudeBasicsProgress = useLessonPathProgress("claudebasicspath", claudeBasicsUnits);
  const cursorBasicsProgress = useLessonPathProgress("cursorbasicspath", cursorBasicsUnits);
  const jsBasicsProgress = useLessonPathProgress("jspath", jsBasicsUnits);
  const jsArraysProgress = useLessonPathProgress("jsarrayspath", jsArraysUnits);
  const jsAsyncProgress = useLessonPathProgress("jsasyncpath", jsAsyncUnits);
  const tsBasicsProgress = useLessonPathProgress("typescriptbasicspath", typescriptBasicsUnits);

  const progressByCourse: Record<string, { pct: number; xp: number; streak: number; done: number; total: number }> = {
    "git-core": { pct: gitCoreProgress.pct, xp: gitCoreProgress.xp, streak: gitCoreProgress.streak, done: gitCoreProgress.completedCount, total: gitCoreProgress.totalLessons },
    "git-branching": { pct: gitBranchingProgress.pct, xp: gitBranchingProgress.xp, streak: gitBranchingProgress.streak, done: gitBranchingProgress.completedCount, total: gitBranchingProgress.totalLessons },
    "git-teams": { pct: gitTeamsProgress.pct, xp: gitTeamsProgress.xp, streak: gitTeamsProgress.streak, done: gitTeamsProgress.completedCount, total: gitTeamsProgress.totalLessons },
    "git-actions": { pct: gitActionsProgress.pct, xp: gitActionsProgress.xp, streak: gitActionsProgress.streak, done: gitActionsProgress.completedCount, total: gitActionsProgress.totalLessons },
    "git-internals": { pct: gitInternalsProgress.pct, xp: gitInternalsProgress.xp, streak: gitInternalsProgress.streak, done: gitInternalsProgress.completedCount, total: gitInternalsProgress.totalLessons },
    "cli-core": { pct: cliCoreProgress.pct, xp: cliCoreProgress.xp, streak: cliCoreProgress.streak, done: cliCoreProgress.completedCount, total: cliCoreProgress.totalLessons },
    "cli-scripting": { pct: cliScriptingProgress.pct, xp: cliScriptingProgress.xp, streak: cliScriptingProgress.streak, done: cliScriptingProgress.completedCount, total: cliScriptingProgress.totalLessons },
    "cli-poweruser": { pct: cliPowerUserProgress.pct, xp: cliPowerUserProgress.xp, streak: cliPowerUserProgress.streak, done: cliPowerUserProgress.completedCount, total: cliPowerUserProgress.totalLessons },
    "python-core": { pct: pythonCoreProgress.pct, xp: pythonCoreProgress.xp, streak: pythonCoreProgress.streak, done: pythonCoreProgress.completedCount, total: pythonCoreProgress.totalLessons },
    "python-datastructures": { pct: pythonDataStructuresProgress.pct, xp: pythonDataStructuresProgress.xp, streak: pythonDataStructuresProgress.streak, done: pythonDataStructuresProgress.completedCount, total: pythonDataStructuresProgress.totalLessons },
    "python-debugging": { pct: pythonDebuggingProgress.pct, xp: pythonDebuggingProgress.xp, streak: pythonDebuggingProgress.streak, done: pythonDebuggingProgress.completedCount, total: pythonDebuggingProgress.totalLessons },
    "python-oop": { pct: pythonOopProgress.pct, xp: pythonOopProgress.xp, streak: pythonOopProgress.streak, done: pythonOopProgress.completedCount, total: pythonOopProgress.totalLessons },
    "python-performance": { pct: pythonPerformanceProgress.pct, xp: pythonPerformanceProgress.xp, streak: pythonPerformanceProgress.streak, done: pythonPerformanceProgress.completedCount, total: pythonPerformanceProgress.totalLessons },
    "sql-core": { pct: sqlCoreProgress.pct, xp: sqlCoreProgress.xp, streak: sqlCoreProgress.streak, done: sqlCoreProgress.completedCount, total: sqlCoreProgress.totalLessons },
    "sql-joins": { pct: sqlJoinsProgress.pct, xp: sqlJoinsProgress.xp, streak: sqlJoinsProgress.streak, done: sqlJoinsProgress.completedCount, total: sqlJoinsProgress.totalLessons },
    "sql-design": { pct: sqlDesignProgress.pct, xp: sqlDesignProgress.xp, streak: sqlDesignProgress.streak, done: sqlDesignProgress.completedCount, total: sqlDesignProgress.totalLessons },
    "sql-advanced": { pct: sqlAdvancedProgress.pct, xp: sqlAdvancedProgress.xp, streak: sqlAdvancedProgress.streak, done: sqlAdvancedProgress.completedCount, total: sqlAdvancedProgress.totalLessons },
    "apis-core": { pct: apisCoreProgress.pct, xp: apisCoreProgress.xp, streak: apisCoreProgress.streak, done: apisCoreProgress.completedCount, total: apisCoreProgress.totalLessons },
    "apis-design": { pct: apisDesignProgress.pct, xp: apisDesignProgress.xp, streak: apisDesignProgress.streak, done: apisDesignProgress.completedCount, total: apisDesignProgress.totalLessons },
    "apis-auth": { pct: apisAuthProgress.pct, xp: apisAuthProgress.xp, streak: apisAuthProgress.streak, done: apisAuthProgress.completedCount, total: apisAuthProgress.totalLessons },
    "apis-advanced": { pct: apisAdvancedProgress.pct, xp: apisAdvancedProgress.xp, streak: apisAdvancedProgress.streak, done: apisAdvancedProgress.completedCount, total: apisAdvancedProgress.totalLessons },
    "claude-basics": { pct: claudeBasicsProgress.pct, xp: claudeBasicsProgress.xp, streak: claudeBasicsProgress.streak, done: claudeBasicsProgress.completedCount, total: claudeBasicsProgress.totalLessons },
    "cursor-basics": { pct: cursorBasicsProgress.pct, xp: cursorBasicsProgress.xp, streak: cursorBasicsProgress.streak, done: cursorBasicsProgress.completedCount, total: cursorBasicsProgress.totalLessons },
    "js-core": { pct: jsBasicsProgress.pct, xp: jsBasicsProgress.xp, streak: jsBasicsProgress.streak, done: jsBasicsProgress.completedCount, total: jsBasicsProgress.totalLessons },
    "js-arrays": { pct: jsArraysProgress.pct, xp: jsArraysProgress.xp, streak: jsArraysProgress.streak, done: jsArraysProgress.completedCount, total: jsArraysProgress.totalLessons },
    "js-async": { pct: jsAsyncProgress.pct, xp: jsAsyncProgress.xp, streak: jsAsyncProgress.streak, done: jsAsyncProgress.completedCount, total: jsAsyncProgress.totalLessons },
    "typescript-basics": { pct: tsBasicsProgress.pct, xp: tsBasicsProgress.xp, streak: tsBasicsProgress.streak, done: tsBasicsProgress.completedCount, total: tsBasicsProgress.totalLessons },
  };

  const allCourses = subjects.flatMap((s) => s.courses);
  const totalXp = Object.values(progressByCourse).reduce((sum, p) => sum + p.xp, 0);
  const bestStreak = Math.max(...Object.values(progressByCourse).map((p) => p.streak));

  const inProgressCourse = allCourses.find((c) => {
    const pr = progressByCourse[c.id];
    return pr.done > 0 && pr.done < pr.total;
  });

  const q = query.trim().toLowerCase();
  const filteredSubjects = q
    ? subjects
        .map((s) => ({
          ...s,
          courses: s.courses.filter(
            (c) =>
              c.title.toLowerCase().includes(q) ||
              c.tagline.toLowerCase().includes(q) ||
              s.title.toLowerCase().includes(q)
          ),
        }))
        .filter((s) => s.courses.length > 0)
    : subjects;
  const filteredCount = filteredSubjects.reduce((sum, s) => sum + s.courses.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-12 grid md:grid-cols-[1fr_300px] gap-8 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Everything they don't teach you in a coding bootcamp.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-5">
            DevPath is a free catalog of Duolingo-style courses for people heading into software development —
            version control, the terminal, a first language, working with data, and how applications talk to each
            other. Bite-sized lessons, instant feedback, XP, and streaks.
          </p>
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses (e.g. Python, SQL, Git)"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        <div
          className="hidden md:flex relative rounded-2xl h-48 overflow-hidden items-center justify-center shadow-sm"
          style={{ backgroundImage: "linear-gradient(135deg, #5b9dff, #c792ea)" }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.5) 2px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative grid grid-cols-3 gap-3 text-4xl">
            <span>🌱</span>
            <span>🐍</span>
            <span>🗄️</span>
            <span>⌨️</span>
            <span>🔌</span>
            <span>⭐</span>
          </div>
        </div>
      </section>

      {totalXp > 0 && (
        <section className="mb-10 grid grid-cols-2 gap-3 sm:gap-5 max-w-md" id="stats">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 text-center shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-indigo-500 dark:text-indigo-300">⭐ {totalXp}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">total XP</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 text-center shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-300">🔥 {bestStreak}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">best day streak</p>
          </div>
        </section>
      )}
      {totalXp > 0 && (
        <div className="mb-8 -mt-4">
          <Link to="/progress" className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline">
            View full progress breakdown →
          </Link>
        </div>
      )}

      {inProgressCourse && (
        <section className="mb-10">
          <Link
            to={inProgressCourse.href}
            className="flex items-center justify-between gap-4 rounded-xl border border-indigo-300 dark:border-indigo-500/60 bg-indigo-50 dark:bg-indigo-500/10 p-4 hover:border-indigo-400 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{inProgressCourse.icon}</span>
              <div>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">Continue where you left off</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {inProgressCourse.title} — {progressByCourse[inProgressCourse.id].done}/{progressByCourse[inProgressCourse.id].total} lessons done
                </p>
              </div>
            </div>
            <span className="text-sm text-indigo-700 dark:text-indigo-300 shrink-0">Resume →</span>
          </Link>
        </section>
      )}

      <section className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">What to learn next</h2>
        <span className="text-xs text-slate-400">{filteredCount} courses</span>
      </section>

      {filteredCount === 0 && <p className="text-sm text-slate-500 py-8 text-center">No courses match "{query}".</p>}

      {filteredSubjects.map((subject) => (
        <div key={subject.id}>
          <CourseRow subject={subject} progressByCourse={progressByCourse} />
          {subject.id === "python" && (
            <Link
              to="/python-terminal"
              className="-mt-6 mb-10 flex items-center justify-between gap-4 rounded-xl border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 p-4 hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Python Practice Terminal</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Run real Python in your browser — no setup, no install. Great for trying out what you just learned.
                  </p>
                </div>
              </div>
              <span className="text-sm text-emerald-700 dark:text-emerald-300 shrink-0">Open terminal →</span>
            </Link>
          )}
        </div>
      ))}

      <section className="mt-6 text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-6">
        <p>
          More on the way: the dev mindset & soft skills, testing, deployment, and how to read a job description
          without panicking.
        </p>
      </section>
    </div>
  );
}
