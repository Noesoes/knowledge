import { Link, Navigate, useParams } from "react-router-dom";
import { getCourse } from "../content";
import { useProgress } from "../useProgress";

export default function CoursePage() {
  const { courseId } = useParams();
  const course = courseId ? getCourse(courseId) : undefined;
  const { isComplete, courseProgress } = useProgress();

  if (!course) return <Navigate to="/" replace />;

  const progress = courseProgress(course.id, course.modules.length);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-300">← All courses</Link>

      <div className="flex items-center gap-3 mt-4 mb-2">
        <span className="text-3xl">{course.icon}</span>
        <h1 className="text-2xl sm:text-3xl font-bold">{course.title}</h1>
      </div>
      <p className="text-slate-400 mb-6">{course.description}</p>

      <div className="mb-8 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full bg-indigo-500" style={{ width: `${progress.pct}%` }} />
      </div>

      {course.id === "sql" && (
        <Link
          to="/sql-path"
          className="block mb-8 rounded-lg border border-indigo-700 bg-indigo-950/30 px-4 py-3 hover:border-indigo-500 transition-colors"
        >
          <p className="font-semibold text-indigo-300">🧭 Try the interactive SQL path instead</p>
          <p className="text-sm text-slate-400">
            A Duolingo-style lesson path with XP, streaks, and a live schema you can query against.
          </p>
        </Link>
      )}

      {course.id === "python" && (
        <Link
          to="/python-path"
          className="block mb-8 rounded-lg border border-indigo-700 bg-indigo-950/30 px-4 py-3 hover:border-indigo-500 transition-colors"
        >
          <p className="font-semibold text-indigo-300">🧭 Try the interactive Python path instead</p>
          <p className="text-sm text-slate-400">
            45 bite-sized multiple-choice lessons, simple to challenging, with XP and streaks.
          </p>
        </Link>
      )}

      {course.id === "apis" && (
        <Link
          to="/apis-path"
          className="block mb-8 rounded-lg border border-indigo-700 bg-indigo-950/30 px-4 py-3 hover:border-indigo-500 transition-colors"
        >
          <p className="font-semibold text-indigo-300">🧭 Try the interactive APIs path instead</p>
          <p className="text-sm text-slate-400">
            45 bite-sized multiple-choice lessons, simple to challenging, with XP and streaks.
          </p>
        </Link>
      )}

      <ol className="space-y-3">
        {course.modules.map((mod, idx) => {
          const done = isComplete(course.id, mod.id);
          return (
            <li key={mod.id}>
              <Link
                to={`/course/${course.id}/module/${mod.id}`}
                className="flex items-center gap-4 rounded-lg border border-slate-800 hover:border-indigo-500 bg-slate-900/40 px-4 py-3 transition-colors"
              >
                <span
                  className={
                    "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold " +
                    (done ? "bg-green-600 text-white" : "bg-slate-800 text-slate-400")
                  }
                >
                  {done ? "✓" : idx + 1}
                </span>
                <div>
                  <p className="font-medium">{mod.title}</p>
                  <p className="text-sm text-slate-500">{mod.summary}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
