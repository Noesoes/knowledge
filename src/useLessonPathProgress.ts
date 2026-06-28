import { useCallback, useEffect, useState } from "react";
import type { PathUnit } from "./lessonPathTypes";

type ProgressMap = Record<string, true>;
interface StreakData {
  count: number;
  lastDate: string;
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useLessonPathProgress(storagePrefix: string, units: PathUnit[]) {
  const allLessons = units.flatMap((u) => u.lessons);
  const progressKey = `${storagePrefix}_progress_v1`;
  const xpKey = `${storagePrefix}_xp_v1`;
  const streakKey = `${storagePrefix}_streak_v1`;

  const [completed, setCompleted] = useState<ProgressMap>(() => loadJson(progressKey, {}));
  const [xp, setXp] = useState<number>(() => loadJson(xpKey, 0));
  const [streak, setStreak] = useState<StreakData>(() => loadJson(streakKey, { count: 0, lastDate: "" }));

  useEffect(() => localStorage.setItem(progressKey, JSON.stringify(completed)), [completed, progressKey]);
  useEffect(() => localStorage.setItem(xpKey, JSON.stringify(xp)), [xp, xpKey]);
  useEffect(() => localStorage.setItem(streakKey, JSON.stringify(streak)), [streak, streakKey]);

  const isLessonComplete = useCallback((id: string) => Boolean(completed[id]), [completed]);

  const isUnlocked = useCallback(
    (lessonId: string) => {
      const idx = allLessons.findIndex((l) => l.id === lessonId);
      if (idx <= 0) return true;
      const prev = allLessons[idx - 1];
      return Boolean(completed[prev.id]);
    },
    [completed, allLessons]
  );

  const bumpStreak = useCallback(() => {
    setStreak((prev) => {
      const today = todayStr();
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const count = prev.lastDate === yesterday ? prev.count + 1 : 1;
      return { count, lastDate: today };
    });
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, xpAmount: number) => {
      setCompleted((prev) => {
        if (prev[lessonId]) return prev;
        setXp((x) => x + xpAmount);
        bumpStreak();
        return { ...prev, [lessonId]: true };
      });
    },
    [bumpStreak]
  );

  const totalLessons = allLessons.length;
  const completedCount = Object.keys(completed).length;
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return {
    isLessonComplete,
    isUnlocked,
    completeLesson,
    xp,
    streak: streak.count,
    completedCount,
    totalLessons,
    pct,
  };
}
