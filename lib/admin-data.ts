import type { Course, Instructor } from './marketing-data';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  country: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalSpent: number;
  lastActive: string;
};

export type AdminOrder = {
  id: string;
  user: string;
  userEmail: string;
  item: string;
  amount: number;
  currency: string;
  method: 'card' | 'paypal' | 'mobile-money';
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  date: string;
  invoice: string;
};

export type AdminBooking = {
  id: string;
  student: string;
  studentEmail: string;
  mentor: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
};

export type AdminBlogPost = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  date: string;
  views: number;
  excerpt: string;
};

export type AdminEnrollment = {
  id: string;
  user: string;
  course: string;
  courseId: string;
  progress: number;
  enrolledDate: string;
  status: 'in-progress' | 'completed' | 'not-started';
  certificate: boolean;
};

export type AdminStat = {
  label: string;
  value: number;
  change: number;
  format: 'number' | 'currency' | 'percent';
};

export const adminStats: AdminStat[] = [
  { label: 'Total Revenue', value: 84720, change: 12.5, format: 'currency' },
  { label: 'Active Students', value: 1248, change: 8.2, format: 'number' },
  { label: 'Course Enrollments', value: 3420, change: 15.3, format: 'number' },
  { label: 'Completion Rate', value: 78, change: 4.1, format: 'percent' },
];

export const revenueData = [
  { month: 'Apr', revenue: 4200, enrollments: 180 },
  { month: 'May', revenue: 5100, enrollments: 210 },
  { month: 'Jun', revenue: 4800, enrollments: 195 },
  { month: 'Jul', revenue: 6200, enrollments: 240 },
  { month: 'Aug', revenue: 7100, enrollments: 280 },
  { month: 'Sep', revenue: 8500, enrollments: 320 },
  { month: 'Oct', revenue: 9200, enrollments: 360 },
];

export const topicDistribution = [
  { topic: 'Banking', count: 1120, percentage: 33 },
  { topic: 'Capital Markets', count: 680, percentage: 20 },
  { topic: 'Ethics & Aqeedah', count: 520, percentage: 15 },
  { topic: 'Takaful', count: 410, percentage: 12 },
  { topic: 'Wealth Management', count: 380, percentage: 11 },
  { topic: 'Fintech', count: 310, percentage: 9 },
];

export const adminUsers: AdminUser[] = [
  { id: 'u1', name: 'Aisha Johari', email: 'aisha.j@email.com', avatar: 'https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'active', joinedDate: 'Jan 2026', country: 'Tanzania', coursesEnrolled: 4, coursesCompleted: 2, totalSpent: 380, lastActive: '2 hours ago' },
  { id: 'u2', name: 'Khalid Mahmoud', email: 'khalid.m@email.com', avatar: 'https://images.pexels.com/photos/12311572/pexels-photo-12311572.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'active', joinedDate: 'Dec 2025', country: 'UAE', coursesEnrolled: 6, coursesCompleted: 4, totalSpent: 720, lastActive: '1 day ago' },
  { id: 'u3', name: 'Maryam Omar', email: 'maryam.o@email.com', avatar: 'https://images.pexels.com/photos/31833805/pexels-photo-31833805.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'active', joinedDate: 'Feb 2026', country: 'Kenya', coursesEnrolled: 3, coursesCompleted: 1, totalSpent: 260, lastActive: '5 hours ago' },
  { id: 'u4', name: 'Dr. Yusuf Al-Kabir', email: 'yusuf@taqseem.com', avatar: 'https://images.pexels.com/photos/8430352/pexels-photo-8430352.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'instructor', status: 'active', joinedDate: 'Nov 2025', country: 'Saudi Arabia', coursesEnrolled: 0, coursesCompleted: 0, totalSpent: 0, lastActive: '3 hours ago' },
  { id: 'u5', name: 'Dr. Amina Hassan', email: 'amina@taqseem.com', avatar: 'https://images.pexels.com/photos/8430352/pexels-photo-8430352.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'instructor', status: 'active', joinedDate: 'Nov 2025', country: 'Nigeria', coursesEnrolled: 0, coursesCompleted: 0, totalSpent: 0, lastActive: '1 hour ago' },
  { id: 'u6', name: 'Ibrahim Sani', email: 'ibrahim.s@email.com', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'pending', joinedDate: 'Oct 2026', country: 'Nigeria', coursesEnrolled: 1, coursesCompleted: 0, totalSpent: 89, lastActive: 'Just now' },
  { id: 'u7', name: 'Fatima Zahra', email: 'fatima.z@email.com', avatar: 'https://images.pexels.com/photos/1138819/pexels-photo-1138819.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'active', joinedDate: 'Mar 2026', country: 'Morocco', coursesEnrolled: 5, coursesCompleted: 3, totalSpent: 540, lastActive: '12 hours ago' },
  { id: 'u8', name: 'Omar Diallo', email: 'omar.d@email.com', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&h=80&w=80', role: 'student', status: 'suspended', joinedDate: 'Aug 2025', country: 'Senegal', coursesEnrolled: 2, coursesCompleted: 0, totalSpent: 180, lastActive: '2 weeks ago' },
];

export const adminOrders: AdminOrder[] = [
  { id: 'ORD-2401', user: 'Aisha Johari', userEmail: 'aisha.j@email.com', item: 'Foundations of Islamic Banking', amount: 89, currency: 'USD', method: 'card', status: 'completed', date: 'Oct 14, 2026', invoice: 'INV-2401' },
  { id: 'ORD-2402', user: 'Khalid Mahmoud', userEmail: 'khalid.m@email.com', item: 'Sukuk: Capital Market Instruments', amount: 129, currency: 'USD', method: 'paypal', status: 'completed', date: 'Oct 13, 2026', invoice: 'INV-2402' },
  { id: 'ORD-2403', user: 'Maryam Omar', userEmail: 'maryam.o@email.com', item: 'Private Session - Dr. Al-Kabir', amount: 150, currency: 'USD', method: 'card', status: 'completed', date: 'Oct 13, 2026', invoice: 'INV-2403' },
  { id: 'ORD-2404', user: 'Ibrahim Sani', userEmail: 'ibrahim.s@email.com', item: 'Foundations of Islamic Banking', amount: 89, currency: 'USD', method: 'mobile-money', status: 'pending', date: 'Oct 15, 2026', invoice: 'INV-2404' },
  { id: 'ORD-2405', user: 'Fatima Zahra', userEmail: 'fatima.z@email.com', item: 'Takaful Insurance Fundamentals', amount: 99, currency: 'USD', method: 'card', status: 'completed', date: 'Oct 12, 2026', invoice: 'INV-2405' },
  { id: 'ORD-2406', user: 'Khalid Mahmoud', userEmail: 'khalid.m@email.com', item: 'Pro Membership (Monthly)', amount: 29, currency: 'USD', method: 'card', status: 'completed', date: 'Oct 11, 2026', invoice: 'INV-2406' },
  { id: 'ORD-2407', user: 'Aisha Johari', userEmail: 'aisha.j@email.com', item: 'Islamic Wealth Management', amount: 119, currency: 'USD', method: 'paypal', status: 'refunded', date: 'Oct 10, 2026', invoice: 'INV-2407' },
  { id: 'ORD-2408', user: 'Omar Diallo', userEmail: 'omar.d@email.com', item: 'Ethics in Islamic Finance', amount: 79, currency: 'USD', method: 'card', status: 'failed', date: 'Oct 09, 2026', invoice: 'INV-2408' },
];

export const adminBookings: AdminBooking[] = [
  { id: 'BK-101', student: 'Maryam Omar', studentEmail: 'maryam.o@email.com', mentor: 'Dr. Yusuf Al-Kabir', topic: 'Sukuk Structures Review', date: 'Oct 16, 2026', time: '10:00 AM', duration: '60 min', price: 150, status: 'upcoming' },
  { id: 'BK-102', student: 'Khalid Mahmoud', studentEmail: 'khalid.m@email.com', mentor: 'Dr. Amina Hassan', topic: 'Career Guidance in Islamic Finance', date: 'Oct 17, 2026', time: '2:00 PM', duration: '45 min', price: 120, status: 'upcoming' },
  { id: 'BK-103', student: 'Aisha Johari', studentEmail: 'aisha.j@email.com', mentor: 'Dr. Yusuf Al-Kabir', topic: 'Murabaha Contract Deep Dive', date: 'Oct 14, 2026', time: '11:00 AM', duration: '60 min', price: 150, status: 'completed' },
  { id: 'BK-104', student: 'Fatima Zahra', studentEmail: 'fatima.z@email.com', mentor: 'Dr. Amina Hassan', topic: 'Portfolio Review', date: 'Oct 12, 2026', time: '3:00 PM', duration: '45 min', price: 120, status: 'completed' },
  { id: 'BK-105', student: 'Ibrahim Sani', studentEmail: 'ibrahim.s@email.com', mentor: 'Dr. Yusuf Al-Kabir', topic: 'Course Q&A', date: 'Oct 18, 2026', time: '9:00 AM', duration: '30 min', price: 80, status: 'upcoming' },
  { id: 'BK-106', student: 'Omar Diallo', studentEmail: 'omar.d@email.com', mentor: 'Dr. Amina Hassan', topic: 'Intro Consultation', date: 'Oct 08, 2026', time: '4:00 PM', duration: '30 min', price: 80, status: 'cancelled' },
];

export const adminBlogPosts: AdminBlogPost[] = [
  { id: 'b1', title: 'The Future of Islamic Fintech in Africa', author: 'Dr. Yusuf Al-Kabir', category: 'Fintech', status: 'published', date: 'Oct 12, 2026', views: 1240, excerpt: 'Exploring how mobile money and blockchain are reshaping Shariah-compliant financial services across East and West Africa.' },
  { id: 'b2', title: 'Understanding Sukuk: A Beginner\'s Guide', author: 'Dr. Amina Hassan', category: 'Capital Markets', status: 'published', date: 'Oct 08, 2026', views: 890, excerpt: 'A clear introduction to Sukuk structures, how they work, and why they matter for Islamic capital markets.' },
  { id: 'b3', title: 'Ethical Investment: Halal Portfolio Strategies', author: 'Dr. Yusuf Al-Kabir', category: 'Wealth Management', status: 'draft', date: 'Oct 15, 2026', views: 0, excerpt: 'Practical strategies for building a Shariah-compliant investment portfolio with diversification.' },
  { id: 'b4', title: 'Takaful: Islamic Insurance Explained', author: 'Dr. Amina Hassan', category: 'Takaful', status: 'scheduled', date: 'Oct 20, 2026', views: 0, excerpt: 'How Takaful differs from conventional insurance and why it matters for the Islamic finance ecosystem.' },
  { id: 'b5', title: 'The Role of the Shariah Board', author: 'Dr. Yusuf Al-Kabir', category: 'Governance', status: 'published', date: 'Sep 28, 2026', views: 2100, excerpt: 'Understanding the critical function of Shariah boards in Islamic financial institutions.' },
];

export const adminEnrollments: AdminEnrollment[] = [
  { id: 'e1', user: 'Aisha Johari', course: 'Foundations of Islamic Banking', courseId: 'c1', progress: 65, enrolledDate: 'Jan 2026', status: 'in-progress', certificate: false },
  { id: 'e2', user: 'Khalid Mahmoud', course: 'Sukuk: Capital Market Instruments', courseId: 'c2', progress: 100, enrolledDate: 'Dec 2025', status: 'completed', certificate: true },
  { id: 'e3', user: 'Maryam Omar', course: 'Foundations of Islamic Banking', courseId: 'c1', progress: 30, enrolledDate: 'Feb 2026', status: 'in-progress', certificate: false },
  { id: 'e4', user: 'Fatima Zahra', course: 'Takaful Insurance Fundamentals', courseId: 'c4', progress: 100, enrolledDate: 'Mar 2026', status: 'completed', certificate: true },
  { id: 'e5', user: 'Khalid Mahmoud', course: 'Foundations of Islamic Banking', courseId: 'c1', progress: 100, enrolledDate: 'Nov 2025', status: 'completed', certificate: true },
  { id: 'e6', user: 'Ibrahim Sani', course: 'Foundations of Islamic Banking', courseId: 'c1', progress: 0, enrolledDate: 'Oct 2026', status: 'not-started', certificate: false },
];

export const adminCourses: (Course & { status: 'published' | 'draft'; enrollments: number; revenue: number })[] = [
  { id: 'c1', title: 'Foundations of Islamic Banking & Finance', instructor: 'Dr. Yusuf Al-Kabir', instructorId: 'i1', level: 'Beginner', rating: 4.9, reviews: 312, lessons: 48, hours: 12, price: 89, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Banking', language: 'English', lastUpdated: 'Jan 2026', status: 'published', enrollments: 842, revenue: 74938, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
  { id: 'c2', title: 'Sukuk: Islamic Capital Market Instruments', instructor: 'Dr. Amina Hassan', instructorId: 'i2', level: 'Intermediate', rating: 4.8, reviews: 187, lessons: 36, hours: 9, price: 129, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/19989050/pexels-photo-19989050.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Capital Markets', language: 'English', lastUpdated: 'Feb 2026', status: 'published', enrollments: 456, revenue: 58824, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
  { id: 'c3', title: 'Islamic Wealth Management & Estate Planning', instructor: 'Dr. Yusuf Al-Kabir', instructorId: 'i1', level: 'Intermediate', rating: 4.7, reviews: 98, lessons: 30, hours: 8, price: 119, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Wealth Management', language: 'English', lastUpdated: 'Mar 2026', status: 'published', enrollments: 312, revenue: 37128, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
  { id: 'c4', title: 'Takaful: Islamic Insurance Fundamentals', instructor: 'Dr. Amina Hassan', instructorId: 'i2', level: 'Beginner', rating: 4.6, reviews: 76, lessons: 24, hours: 6, price: 99, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/19989050/pexels-photo-19989050.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Takaful', language: 'English', lastUpdated: 'Apr 2026', status: 'published', enrollments: 284, revenue: 28116, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
  { id: 'c5', title: 'Ethics & Aqeedah in Islamic Finance', instructor: 'Dr. Yusuf Al-Kabir', instructorId: 'i1', level: 'Beginner', rating: 4.8, reviews: 64, lessons: 20, hours: 5, price: 79, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Ethics & Aqeedah', language: 'English', lastUpdated: 'May 2026', status: 'published', enrollments: 198, revenue: 15642, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
  { id: 'c6', title: 'Fintech & Digital Islamic Banking', instructor: 'Dr. Amina Hassan', instructorId: 'i2', level: 'Advanced', rating: 0, reviews: 0, lessons: 0, hours: 0, price: 149, currency: 'USD', thumbnail: 'https://images.pexels.com/photos/19989050/pexels-photo-19989050.jpeg?auto=compress&cs=tinysrgb&h=200&w=320', topic: 'Fintech', language: 'English', lastUpdated: 'Oct 2026', status: 'draft', enrollments: 0, revenue: 0, description: '', whatYouLearn: [], requirements: [], sections: [], courseReviews: [] },
];

export const adminInstructors: Instructor[] = [
  { id: 'i1', name: 'Dr. Yusuf Al-Kabir', title: 'Professor of Islamic Finance', bio: 'Former Shariah board member at Al Rajhi Bank with 20+ years in Islamic finance academia.', avatar: 'https://images.pexels.com/photos/8430352/pexels-photo-8430352.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', expertise: ['Banking', 'Sukuk', 'Governance'], students: 1240, courses: 3, rating: 4.9, languages: ['English', 'Arabic'], sessionPrice: 150 },
  { id: 'i2', name: 'Dr. Amina Hassan', title: 'Islamic Finance Consultant', bio: 'Advisor to multiple central banks on Islamic finance regulation. PhD from INCEIF.', avatar: 'https://images.pexels.com/photos/8430352/pexels-photo-8430352.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', expertise: ['Capital Markets', 'Takaful', 'Fintech'], students: 890, courses: 2, rating: 4.8, languages: ['English', 'Swahili'], sessionPrice: 120 },
];
