import { Link, Navigate, useParams } from "react-router-dom";
import { getModule } from "../content";
import { useProgress } from "../useProgress";
import Lesson from "../components/Lesson";
import Quiz from "../components/Quiz";
import CodeChallengeBlock from "../components/CodeChallenge";

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const result = courseId && moduleId ? getModule(courseId, moduleId) : undefined;
  const { markComplete, isComplete } = useProgress();

  if (!result) return <Navigate to="/" replace />;
  const { course, module, next, prev } = result;
  const done = isComplete(course.id, module.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to={`/course/${course.id}`} className="text-sm text-slate-500 hover:text-slate-300">
        ← {course.title}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-1">{module.title}</h1>
      <p className="text-slate-400 mb-8">{module.summary}</p>

      <Lesson content={module.content} />

      <div className="my-8 rounded-lg border border-indigo-800 bg-indigo-950/30 p-4">
        <p className="font-semibold mb-2 text-indigo-300">Key takeaways</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
          {module.keyTakeaways.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {module.project && (
        <div className="mb-8 rounded-lg border border-amber-800 bg-amber-950/20 p-4">
          <p className="font-semibold mb-2 text-amber-300">Practice project</p>
          <p className="text-sm text-slate-300">{module.project}</p>
        </div>
      )}

      {module.codeChallenges && module.codeChallenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Try it yourself</h2>
          <div className="space-y-4">
            {module.codeChallenges.map((c) => (
              <CodeChallengeBlock key={c.id} challenge={c} />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Check your understanding</h2>
      <Quiz key={module.id} questions={module.quiz} onPassed={() => markComplete(course.id, module.id)} />

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800">
        {prev ? (
          <Link to={`/course/${course.id}/module/${prev.id}`} className="text-sm text-slate-400 hover:text-slate-200">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/course/${course.id}/module/${next.id}`}
            className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white font-medium"
          >
            Next: {next.title} →
          </Link>
        ) : (
          done && (
            <Link to={`/course/${course.id}`} className="text-sm px-4 py-2 rounded-md bg-green-600 text-white font-medium">
              Course complete →
            </Link>
          )
        )}
      </div>
    </div>
  );
}
