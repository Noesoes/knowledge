import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [pathsOpen, setPathsOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 sticky top-0 bg-[#0b0f17]/90 backdrop-blur z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <Link to="/" className="font-bold text-lg flex items-center gap-2 shrink-0">
          <span>🧭</span> DevPath
        </Link>
        <p className="text-xs text-slate-500 hidden md:block">
          Learn to be a developer — not just to write code.
        </p>
        <div className="flex items-center gap-2 shrink-0 relative">
          <button
            onClick={() => setPathsOpen((o) => !o)}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300"
          >
            Paths ▾
          </button>
          {pathsOpen && (
            <div
              className="absolute top-full right-0 mt-1 w-44 rounded-md border border-slate-700 bg-[#0b0f17] shadow-lg overflow-hidden z-20"
              onMouseLeave={() => setPathsOpen(false)}
            >
              <Link
                to="/sql-path"
                onClick={() => setPathsOpen(false)}
                className="block px-3 py-2 text-xs sm:text-sm text-slate-300 hover:bg-slate-800"
              >
                🗄 SQL Path
              </Link>
              <Link
                to="/python-path"
                onClick={() => setPathsOpen(false)}
                className="block px-3 py-2 text-xs sm:text-sm text-slate-300 hover:bg-slate-800"
              >
                🐍 Python Path
              </Link>
              <Link
                to="/apis-path"
                onClick={() => setPathsOpen(false)}
                className="block px-3 py-2 text-xs sm:text-sm text-slate-300 hover:bg-slate-800"
              >
                🔌 APIs Path
              </Link>
            </div>
          )}
          <Link
            to="/review"
            className="text-xs sm:text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300"
          >
            Review
          </Link>
        </div>
      </div>
    </header>
  );
}
