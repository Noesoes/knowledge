import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "devlearn-progress-v1";

type ProgressMap = Record<string, true>; // key: `${courseId}/${moduleId}`

function load(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [completed, setCompleted] = useState<ProgressMap>(load);

  useEffect(() => {
    save(completed);
  }, [completed]);

  const markComplete = useCallback((courseId: string, moduleId: string) => {
    setCompleted((prev) => ({ ...prev, [`${courseId}/${moduleId}`]: true }));
  }, []);

  const isComplete = useCallback(
    (courseId: string, moduleId: string) => Boolean(completed[`${courseId}/${moduleId}`]),
    [completed]
  );

  const courseProgress = useCallback(
    (courseId: string, totalModules: number) => {
      const done = Object.keys(completed).filter((k) => k.startsWith(`${courseId}/`)).length;
      return { done, total: totalModules, pct: totalModules === 0 ? 0 : Math.round((done / totalModules) * 100) };
    },
    [completed]
  );

  return { markComplete, isComplete, courseProgress };
}
