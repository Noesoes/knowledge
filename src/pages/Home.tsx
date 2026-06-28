import { Link } from "react-router-dom";
import { courses } from "../content";
import { useProgress } from "../useProgress";

export default function Home() {
  const { courseProgress, totalCompleted, streakDays, dueForReview } = useProgress();
  const streak = streakDays();
  const due = dueForReview().length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Everything they don't teach you in a coding bootcamp.</h1>
        <p className="text-slate-400 max-w-2xl">
          DevPath is a free set of courses for people heading into software development — not just syntax, but
          how to learn technical skills effectively, version control, working with data, and how applications
          talk to each other. Every module ends with a quiz, because retrieval practice is how skills actually
          stick.
        </p>
      </section>

      {totalCompleted > 0 && (
        <section className="mb-12 grid grid-cols-3 gap-3 sm:gap-5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-indigo-300">{totalCompleted}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">modules done</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-amber-300">
              {streak}🔥
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">day streak</p>
          </div>
          <Link
            to="/review"
            className="rounded-xl border border-slate-800 hover:border-indigo-500 bg-slate-900/40 p-4 text-center transition-colors"
          >
            <p className="text-2xl sm:text-3xl font-bold text-green-300">{due}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">due for review</p>
          </Link>
        </section>
      )}

      <section className="grid sm:grid-cols-2 gap-5">
        {courses.map((course) => {
          const progress = courseProgress(course.id, course.modules.length);
          return (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="rounded-xl border border-slate-800 hover:border-indigo-500 bg-slate-900/40 p-5 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{course.icon}</span>
                {progress.done > 0 && (
                  <span className="text-xs text-slate-400">{progress.done}/{progress.total} done</span>
                )}
              </div>
              <h2 className="font-semibold text-lg mb-1 group-hover:text-indigo-300">{course.title}</h2>
              <p className="text-sm text-slate-400">{course.tagline}</p>
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
