import { useSyncExternalStore } from 'react';
import { adminCourses } from './admin-data';
import type { Course } from './marketing-data';

export type AdminCourse = Course & {
  status: 'published' | 'draft';
  enrollments: number;
  revenue: number;
};

let coursesStore: AdminCourse[] = adminCourses.map((c) => ({ ...c }));
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): AdminCourse[] {
  return coursesStore;
}

function getServerSnapshot(): AdminCourse[] {
  return coursesStore;
}

export function useAdminCourses(): AdminCourse[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getCourseById(id: string): AdminCourse | undefined {
  return coursesStore.find((c) => c.id === id);
}

export function saveCourse(course: AdminCourse) {
  const idx = coursesStore.findIndex((c) => c.id === course.id);
  if (idx >= 0) {
    const next = [...coursesStore];
    next[idx] = course;
    coursesStore = next;
  } else {
    coursesStore = [course, ...coursesStore];
  }
  emit();
}

export function deleteCourse(id: string) {
  coursesStore = coursesStore.filter((c) => c.id !== id);
  emit();
}

export function duplicateCourse(id: string): AdminCourse | undefined {
  const src = coursesStore.find((c) => c.id === id);
  if (!src) return undefined;
  const copy: AdminCourse = {
    ...src,
    id: `c${Date.now()}`,
    title: `${src.title} (Copy)`,
    status: 'draft',
    enrollments: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
  };
  coursesStore = [copy, ...coursesStore];
  emit();
  return copy;
}
