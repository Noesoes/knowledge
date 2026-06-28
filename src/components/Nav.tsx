import { Link } from "react-router-dom";
import { useTheme } from "../useTheme";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-[#0b0f17]/90 backdrop-blur z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <Link to="/" className="font-bold text-lg flex items-center gap-2 shrink-0 text-slate-900 dark:text-slate-100">
          <span>🧭</span> DevPath
        </Link>
        <p className="text-xs text-slate-500 hidden md:block">
          Learn to be a developer — not just to write code.
        </p>
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="shrink-0 w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm hover:border-indigo-400 transition-colors"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
