// Shared demo data for the student dashboard.
// Single source of truth so numbers match across all dashboard pages.

export type EnrolledCourse = {
  courseId: string;
  progress: number;
  status: 'in-progress' | 'completed';
  lastLessonSection: string;
  lastLessonTitle: string;
  lastLessonIndex: number; // lesson number within the course, 1-based
  totalLessons: number;
  minutesPerWeek: number;
};

export type StudentBooking = {
  id: string;
  title: string;
  mentor: string;
  date: string; // ISO date
  time: string;
  duration: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
};

export type StudentOrder = {
  id: string;
  date: string;
  item: string;
  amount: number;
  method: string;
  status: 'paid' | 'pending' | 'refunded';
};

export type LiveClass = {
  id: string;
  title: string;
  date: string; // ISO datetime
  instructor: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'flame' | 'clock' | 'star';
  unlocked: boolean;
};

export const studentProfile = {
  name: 'Aisha Juma',
  firstName: 'Aisha',
  avatar: 'https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  streakDays: 12,
  weeklyGoalDays: 5,
  daysThisWeek: 3,
  hoursLearned: 47.5,
};

export const weeklyActivity = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 0 },
  { day: 'Wed', minutes: 50 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 45 },
  { day: 'Sat', minutes: 0 },
  { day: 'Sun', minutes: 15 },
];

export const enrolledCourses: EnrolledCourse[] = [
  { courseId: 'c1', progress: 65, status: 'in-progress', lastLessonSection: 'Module 4 · Sukuk Structures', lastLessonTitle: 'Asset-backed vs asset-based Sukuk', lastLessonIndex: 22, totalLessons: 48, minutesPerWeek: 95 },
  { courseId: 'c2', progress: 30, status: 'in-progress', lastLessonSection: 'Module 2 · Issuance Process', lastLessonTitle: 'Role of the Shariah board in issuance', lastLessonIndex: 11, totalLessons: 36, minutesPerWeek: 40 },
  { courseId: 'c6', progress: 100, status: 'completed', lastLessonSection: 'Final Module', lastLessonTitle: 'Course wrap-up and next steps', lastLessonIndex: 24, totalLessons: 24, minutesPerWeek: 0 },
];

export const liveClasses: LiveClass[] = [
  { id: 'lc1', title: 'Zakat Calculation Workshop', date: '2026-10-20T16:00:00Z', instructor: 'Dr. Yusuf Al-Kabir' },
  { id: 'lc2', title: 'Takaful Product Design Lab', date: '2026-10-22T13:00:00Z', instructor: 'Omar Abdullatif' },
];

export const studentBookings: StudentBooking[] = [
  { id: 'b1', title: 'Private session with Dr. Al-Kabir', mentor: 'Dr. Yusuf Al-Kabir', date: '2026-10-21', time: '10:00 GMT', duration: '60 min', type: 'Wealth Management', status: 'upcoming', price: 120 },
  { id: 'b2', title: 'Private session with Fatima Noor', mentor: 'Fatima Noor', date: '2026-10-24', time: '09:00 GMT', duration: '60 min', type: 'Microfinance', status: 'upcoming', price: 60 },
  { id: 'b3', title: 'Private session with Dr. Amina Hassan', mentor: 'Dr. Amina Hassan', date: '2026-10-05', time: '14:00 GMT', duration: '60 min', type: 'Sukuk', status: 'completed', price: 95 },
  { id: 'b4', title: 'Private session with Omar Abdullatif', mentor: 'Omar Abdullatif', date: '2026-09-28', time: '13:00 GMT', duration: '60 min', type: 'Takaful', status: 'cancelled', price: 75 },
];

export const studentOrders: StudentOrder[] = [
  { id: 'TQS-2026-1042', date: 'Oct 15, 2026', item: 'Foundations of Islamic Banking', amount: 89, method: 'Visa •••• 4242', status: 'paid' },
  { id: 'TQS-2026-1038', date: 'Oct 12, 2026', item: 'Pro Membership — Monthly', amount: 29, method: 'PayPal', status: 'paid' },
  { id: 'TQS-2026-1031', date: 'Oct 05, 2026', item: 'Private session — Dr. Amina Hassan', amount: 95, method: 'Visa •••• 4242', status: 'paid' },
  { id: 'TQS-2026-1025', date: 'Sep 28, 2026', item: 'Private session — Omar Abdullatif', amount: 75, method: 'M-Pesa', status: 'refunded' },
  { id: 'TQS-2026-1019', date: 'Sep 12, 2026', item: 'Pro Membership — Monthly', amount: 29, method: 'PayPal', status: 'paid' },
  { id: 'TQS-2026-1010', date: 'Aug 28, 2026', item: 'Islamic Microfinance & Development', amount: 69, method: 'Visa •••• 4242', status: 'paid' },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first lesson', icon: 'star', unlocked: true },
  { id: 'a2', title: 'Course Conqueror', description: 'Complete your first course', icon: 'award', unlocked: true },
  { id: 'a3', title: 'On Fire', description: 'Reach a 7-day learning streak', icon: 'flame', unlocked: true },
  { id: 'a4', title: 'Marathon Mind', description: 'Learn for 10 total hours', icon: 'clock', unlocked: true },
];

export const certificates = [
  { id: 'cert1', course: 'Fintech & Digital Islamic Banking', instructor: 'Dr. Amina Hassan', date: 'Oct 10, 2026', certId: 'TQS-CERT-2026-1042', grade: 'A' },
  { id: 'cert2', course: 'Islamic Microfinance & Development', instructor: 'Fatima Noor', date: 'Sep 15, 2026', certId: 'TQS-CERT-2026-1010', grade: 'A+' },
];

export function formatCountdown(target: string, now = new Date()): string {
  const diff = new Date(target).getTime() - now.getTime();
  if (diff <= 0) return 'Live now';
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${mins}m`;
  return `Starts in ${mins}m`;
}
