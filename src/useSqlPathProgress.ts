import { useCallback, useEffect, useState } from "react";
import { allSqlLessons } from "./content/sqlPath";

const PROGRESS_KEY = "sqlpath_progress_v1";
const XP_KEY = "sqlpath_xp_v1";
const STREAK_KEY = "sqlpath_streak_v1";

type ProgressMap = Record<string, true>;
interface StreakData {
  count: number;
  lastDate: string; // YYYY-MM-DD
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

export function useSqlPathProgress() {
  const [completed, setCompleted] = useState<ProgressMap>(() => loadJson(PROGRESS_KEY, {}));
  const [xp, setXp] = useState<number>(() => loadJson(XP_KEY, 0));
  const [streak, setStreak] = useState<StreakData>(() => loadJson(STREAK_KEY, { count: 0, lastDate: "" }));

  useEffect(() => localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed)), [completed]);
  useEffect(() => localStorage.setItem(XP_KEY, JSON.stringify(xp)), [xp]);
  useEffect(() => localStorage.setItem(STREAK_KEY, JSON.stringify(streak)), [streak]);

  const isLessonComplete = useCallback((id: string) => Boolean(completed[id]), [completed]);

  const isUnlocked = useCallback(
    (lessonId: string) => {
      const idx = allSqlLessons.findIndex((l) => l.id === lessonId);
      if (idx <= 0) return true;
      const prev = allSqlLessons[idx - 1];
      return Boolean(completed[prev.id]);
    },
    [completed]
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

  const totalLessons = allSqlLessons.length - 1; // exclude sandbox from progress denominator
  const completedCount = Object.keys(completed).filter((id) => id !== "sandbox").length;
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return {
    completed,
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
