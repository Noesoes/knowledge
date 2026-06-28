import { Link } from "react-router-dom";
import { getModule } from "../content";
import { useProgress } from "../useProgress";

export default function ReviewPage() {
  const { dueForReview } = useProgress();
  const due = dueForReview()
    .map(({ courseId, moduleId }) => getModule(courseId, moduleId))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-300">← All courses</Link>

      <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-1">Review queue</h1>
      <p className="text-slate-400 mb-8">
        Spaced repetition works because memory fades — revisiting material a few days after you first learned it is
        far more effective than re-reading it immediately. These modules are ready for a refresher quiz.
      </p>

      {due.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400">
          Nothing due for review yet. Completed modules show up here a few days after you finish them.
        </div>
      ) : (
        <ol className="space-y-3">
          {due.map(({ course, module }) => (
            <li key={`${course.id}/${module.id}`}>
              <Link
                to={`/course/${course.id}/module/${module.id}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 hover:border-indigo-500 bg-slate-900/40 px-4 py-3 transition-colors"
              >
                <div>
                  <p className="font-medium">{module.title}</p>
                  <p className="text-sm text-slate-500">{course.title}</p>
                </div>
                <span className="shrink-0 text-sm px-3 py-1.5 rounded-md bg-indigo-600 text-white font-medium">
                  Review →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
