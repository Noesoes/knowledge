import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="border-b border-slate-800 sticky top-0 bg-[#0b0f17]/90 backdrop-blur z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <Link to="/" className="font-bold text-lg flex items-center gap-2 shrink-0">
          <span>🧭</span> DevPath
        </Link>
        <p className="text-xs text-slate-500 hidden md:block">
          Learn to be a developer — not just to write code.
        </p>
        <Link
          to="/review"
          className="shrink-0 text-xs sm:text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          Review
        </Link>
      </div>
    </header>
  );
}
