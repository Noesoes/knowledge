import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "devlearn-progress-v2";
const DAY_MS = 24 * 60 * 60 * 1000;
const REVIEW_AFTER_DAYS = 3;

type ProgressMap = Record<string, number>; // key: `${courseId}/${moduleId}` -> completion epoch ms

function load(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    // migrate from the old true-only format if present
    const legacy = localStorage.getItem("devlearn-progress-v1");
    if (legacy) {
      const parsed = JSON.parse(legacy) as Record<string, true>;
      const migrated: ProgressMap = {};
      for (const key of Object.keys(parsed)) migrated[key] = Date.now();
      return migrated;
    }
    return {};
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
    setCompleted((prev) => ({ ...prev, [`${courseId}/${moduleId}`]: Date.now() }));
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

  const totalCompleted = Object.keys(completed).length;

  const streakDays = useCallback(() => {
    const days = new Set(
      Object.values(completed).map((ts) => Math.floor(ts / DAY_MS))
    );
    if (days.size === 0) return 0;
    const today = Math.floor(Date.now() / DAY_MS);
    let streak = 0;
    let cursor = today;
    // allow today to be "not yet done" without breaking the streak
    if (!days.has(cursor)) cursor -= 1;
    while (days.has(cursor)) {
      streak++;
      cursor--;
    }
    return streak;
  }, [completed]);

  const dueForReview = useCallback(() => {
    const now = Date.now();
    return Object.entries(completed)
      .filter(([, ts]) => now - ts >= REVIEW_AFTER_DAYS * DAY_MS)
      .map(([key]) => {
        const [courseId, moduleId] = key.split("/");
        return { courseId, moduleId };
      });
  }, [completed]);

  return { markComplete, isComplete, courseProgress, totalCompleted, streakDays, dueForReview };
}
