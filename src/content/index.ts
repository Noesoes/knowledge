import { learningScience } from "./learning-science";
import { gitGithub } from "./git-github";
import { python } from "./python";
import { sql } from "./sql";
import { apis } from "./apis";
import type { Course } from "../types";

export const courses: Course[] = [learningScience, gitGithub, python, sql, apis];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getModule(courseId: string, moduleId: string) {
  const course = getCourse(courseId);
  const moduleIndex = course?.modules.findIndex((m) => m.id === moduleId) ?? -1;
  if (!course || moduleIndex === -1) return undefined;
  return {
    course,
    module: course.modules[moduleIndex],
    moduleIndex,
    next: course.modules[moduleIndex + 1],
    prev: course.modules[moduleIndex - 1],
  };
}
