export type Course = {
  id: string;
  title: string;
  instructor: string;
  instructorId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviews: number;
  lessons: number;
  hours: number;
  price: number;
  originalPrice?: number;
  currency: string;
  thumbnail: string;
  topic: string;
  language: string;
  lastUpdated: string;
  description: string;
  whatYouLearn: string[];
  requirements: string[];
  sections: CourseSection[];
  courseReviews: CourseReview[];
  videoUrl?: string;
};

export type CourseSection = {
  id: string;
  title: string;
  lessonsCount: number;
  duration: string;
  previewCount: number;
  lessons: { id: string; title: string; duration: string; preview: boolean }[];
};

export type CourseReview = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
};

export type Instructor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string[];
  students: number;
  courses: number;
  rating: number;
  languages: string[];
  sessionPrice?: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar: string;
  text: string;
  rating: number;
};

export type LiveClass = {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  topic: string;
  date: string;
  duration: string;
  seatsTotal: number;
  seatsLeft: number;
  price: number;
  status: 'upcoming' | 'live' | 'recorded';
  recordingUrl?: string;
  description: string;
};

export type MentorSlot = {
  day: string;
  slots: string[];
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Foundations of Islamic Banking & Finance',
    instructor: 'Dr. Yusuf Al-Kabir',
    instructorId: 'i1',
    level: 'Beginner',
    rating: 4.9,
    reviews: 312,
    lessons: 48,
    hours: 12,
    price: 89,
    originalPrice: 129,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/13431445/pexels-photo-13431445.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Banking',
    language: 'English',
    lastUpdated: 'Jan 2026',
    description:
      'A comprehensive introduction to the principles and practice of Islamic finance. Understand how Shariah-compliant banking differs from conventional banking, the key contracts that underpin Islamic financial products, and how these are applied in modern banking institutions worldwide.',
    whatYouLearn: [
      'The fundamental principles of Islamic finance and Shariah compliance',
      'Key contracts: Murabaha, Musharaka, Mudaraba, and Ijara',
      'How Islamic banks differ from conventional banks',
      'The role of the Shariah board and governance frameworks',
      'Practical case studies from real Islamic banking institutions',
      'Regulatory landscape across GCC, Africa, and Southeast Asia',
    ],
    requirements: [
      'No prior finance or banking knowledge required',
      'Basic understanding of English',
      'Curiosity about ethical and faith-based finance',
    ],
    sections: [
      {
        id: 's1',
        title: 'Introduction to Islamic Finance',
        lessonsCount: 6,
        duration: '1h 20m',
        previewCount: 2,
        lessons: [
          { id: 'l1', title: 'What is Islamic Finance?', duration: '12m', preview: true },
          { id: 'l2', title: 'Key Principles: Riba, Gharar, Maysir', duration: '15m', preview: true },
          { id: 'l3', title: 'The Shariah Framework', duration: '14m', preview: false },
          { id: 'l4', title: 'History of Islamic Banking', duration: '18m', preview: false },
          { id: 'l5', title: 'Modern Islamic Finance Landscape', duration: '11m', preview: false },
          { id: 'l6', title: 'Quiz: Foundations', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Core Islamic Financial Contracts',
        lessonsCount: 8,
        duration: '2h 15m',
        previewCount: 0,
        lessons: [
          { id: 'l7', title: 'Murabaha: Cost-Plus Financing', duration: '16m', preview: false },
          { id: 'l8', title: 'Musharaka: Partnership Contracts', duration: '18m', preview: false },
          { id: 'l9', title: 'Mudaraba: Profit-Sharing', duration: '15m', preview: false },
          { id: 'l10', title: 'Ijara: Leasing', duration: '14m', preview: false },
          { id: 'l11', title: 'Salam & Istisna: Forward Contracts', duration: '17m', preview: false },
          { id: 'l12', title: 'Qard Hasan: Benevolent Loans', duration: '10m', preview: false },
          { id: 'l13', title: 'Contract Combinations & Structures', duration: '20m', preview: false },
          { id: 'l14', title: 'Quiz: Contracts', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Islamic Banking in Practice',
        lessonsCount: 10,
        duration: '2h 40m',
        previewCount: 0,
        lessons: [
          { id: 'l15', title: 'How an Islamic Bank Operates', duration: '22m', preview: false },
          { id: 'l16', title: 'Deposit Products', duration: '16m', preview: false },
          { id: 'l17', title: 'Financing Products', duration: '18m', preview: false },
          { id: 'l18', title: 'Trade Finance', duration: '14m', preview: false },
          { id: 'l19', title: 'Treasury Operations', duration: '16m', preview: false },
          { id: 'l20', title: 'Risk Management', duration: '15m', preview: false },
          { id: 'l21', title: 'Case Study: Dubai Islamic Bank', duration: '20m', preview: false },
          { id: 'l22', title: 'Case Study: East African Markets', duration: '18m', preview: false },
          { id: 'l23', title: 'Fintech & Digital Islamic Banking', duration: '14m', preview: false },
          { id: 'l24', title: 'Quiz: Banking Practice', duration: '12m', preview: false },
        ],
      },
      {
        id: 's4',
        title: 'Governance & Regulation',
        lessonsCount: 8,
        duration: '2h 10m',
        previewCount: 0,
        lessons: [
          { id: 'l25', title: 'Shariah Board: Role & Composition', duration: '16m', preview: false },
          { id: 'l26', title: 'AAOIFI Standards', duration: '18m', preview: false },
          { id: 'l27', title: 'IFSB Prudential Standards', duration: '15m', preview: false },
          { id: 'l28', title: 'Audit & Compliance', duration: '14m', preview: false },
          { id: 'l29', title: 'Shariah Audit Process', duration: '16m', preview: false },
          { id: 'l30', title: 'Regulatory Comparison: GCC vs Africa', duration: '18m', preview: false },
          { id: 'l31', title: 'Ethical Considerations', duration: '12m', preview: false },
          { id: 'l32', title: 'Final Assessment', duration: '20m', preview: false },
        ],
      },
      {
        id: 's5',
        title: 'Resources & Next Steps',
        lessonsCount: 4,
        duration: '55m',
        previewCount: 0,
        lessons: [
          { id: 'l33', title: 'Recommended Reading List', duration: '15m', preview: false },
          { id: 'l34', title: 'Career Paths in Islamic Finance', duration: '12m', preview: false },
          { id: 'l35', title: 'Professional Certifications', duration: '14m', preview: false },
          { id: 'l36', title: 'Final Project: Product Analysis', duration: '14m', preview: false },
        ],
      },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBigBuckBunny.mp4',
    courseReviews: [
      {
        id: 'r1',
        name: 'Aisha J.',
        avatar: 'https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '2 weeks ago',
        text: 'Perfect starting point. I came in with zero finance background and now feel confident discussing Islamic banking concepts. The contract section is excellent.',
      },
      {
        id: 'r2',
        name: 'Khalid M.',
        avatar: 'https://images.pexels.com/photos/12311572/pexels-photo-12311572.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '1 month ago',
        text: 'Dr. Al-Kabir explains complex topics with remarkable clarity. The case studies from real banks make the theory practical. Highly recommend.',
      },
      {
        id: 'r3',
        name: 'Maryam O.',
        avatar: 'https://images.pexels.com/photos/31833805/pexels-photo-31833805.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 4,
        date: '1 month ago',
        text: 'Great course overall. Would have liked more on microfinance, but the banking sections are thorough. The certificate helped my CV.',
      },
    ],
  },
  {
    id: 'c2',
    title: 'Sukuk: Islamic Capital Market Instruments',
    instructor: 'Dr. Amina Hassan',
    instructorId: 'i2',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 187,
    lessons: 36,
    hours: 9,
    price: 129,
    originalPrice: 179,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/19989050/pexels-photo-19989050.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Capital Markets',
    language: 'English',
    lastUpdated: 'Feb 2026',
    description:
      'Master Sukuk — the Islamic equivalent of bonds. Learn how Sukuk are structured, priced, rated, and traded. Covers Ijarah, Musharaka, and Mudaraba Sukuk structures, secondary markets, and real-world issuance case studies.',
    whatYouLearn: [
      'What Sukuk are and how they differ from conventional bonds',
      'Structuring Ijarah, Musharaka, and Mudaraba Sukuk',
      'Sukuk pricing and yield analysis',
      'Credit ratings and risk assessment',
      'Secondary market trading mechanics',
      'Case studies of major Sukuk issuances',
    ],
    requirements: [
      'Basic understanding of finance concepts',
      'Familiarity with Islamic finance principles (or complete our Foundations course first)',
    ],
    sections: [
      {
        id: 's1',
        title: 'Sukuk Fundamentals',
        lessonsCount: 5,
        duration: '1h 10m',
        previewCount: 1,
        lessons: [
          { id: 'l1', title: 'Introduction to Sukuk', duration: '14m', preview: true },
          { id: 'l2', title: 'Sukuk vs Bonds', duration: '12m', preview: false },
          { id: 'l3', title: 'Legal Framework', duration: '15m', preview: false },
          { id: 'l4', title: 'Shariah Compliance in Sukuk', duration: '14m', preview: false },
          { id: 'l5', title: 'Quiz: Fundamentals', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Sukuk Structures',
        lessonsCount: 8,
        duration: '2h 20m',
        previewCount: 0,
        lessons: [
          { id: 'l6', title: 'Ijarah Sukuk', duration: '18m', preview: false },
          { id: 'l7', title: 'Musharaka Sukuk', duration: '16m', preview: false },
          { id: 'l8', title: 'Mudaraba Sukuk', duration: '15m', preview: false },
          { id: 'l9', title: 'Salam & Istisna Sukuk', duration: '14m', preview: false },
          { id: 'l10', title: 'Hybrid Structures', duration: '17m', preview: false },
          { id: 'l11', title: 'Sukuk al-Wakala', duration: '16m', preview: false },
          { id: 'l12', title: 'Structuring Case Study', duration: '20m', preview: false },
          { id: 'l13', title: 'Quiz: Structures', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Pricing, Rating & Trading',
        lessonsCount: 7,
        duration: '1h 50m',
        previewCount: 0,
        lessons: [
          { id: 'l14', title: 'Pricing Methodology', duration: '16m', preview: false },
          { id: 'l15', title: 'Yield Analysis', duration: '15m', preview: false },
          { id: 'l16', title: 'Credit Ratings', duration: '14m', preview: false },
          { id: 'l17', title: 'Secondary Markets', duration: '16m', preview: false },
          { id: 'l18', title: 'Liquidity Management', duration: '12m', preview: false },
          { id: 'l19', title: 'Risk Assessment', duration: '14m', preview: false },
          { id: 'l20', title: 'Quiz: Pricing & Trading', duration: '10m', preview: false },
        ],
      },
      {
        id: 's4',
        title: 'Real-World Issuances',
        lessonsCount: 6,
        duration: '1h 40m',
        previewCount: 0,
        lessons: [
          { id: 'l21', title: 'Sovereign Sukuk: Malaysia', duration: '18m', preview: false },
          { id: 'l22', title: 'Corporate Sukuk: Saudi Aramco', duration: '16m', preview: false },
          { id: 'l23', title: 'Sukuk in Africa', duration: '15m', preview: false },
          { id: 'l24', title: 'Green Sukuk', duration: '14m', preview: false },
          { id: 'l25', title: 'Final Assessment', duration: '20m', preview: false },
          { id: 'l26', title: 'Course Wrap-Up', duration: '10m', preview: false },
        ],
      },
    ],
    courseReviews: [
      {
        id: 'r1',
        name: 'Khalid M.',
        avatar: 'https://images.pexels.com/photos/12311572/pexels-photo-12311572.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '3 weeks ago',
        text: 'Dr. Hassan breaks down Sukuk structures better than any textbook. The Aramco case study alone was worth the price.',
      },
      {
        id: 'r2',
        name: 'Rahman S.',
        avatar: 'https://images.pexels.com/photos/17049771/pexels-photo-17049771.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '2 months ago',
        text: 'As an entrepreneur looking to raise capital Islamically, this course gave me exactly what I needed. Excellent.',
      },
    ],
  },
  {
    id: 'c3',
    title: 'Takaful: Shariah-Compliant Insurance',
    instructor: 'Omar Abdullatif',
    instructorId: 'i3',
    level: 'Intermediate',
    rating: 4.7,
    reviews: 156,
    lessons: 28,
    hours: 7,
    price: 99,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/8566288/pexels-photo-8566288.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Takaful',
    language: 'English',
    lastUpdated: 'Dec 2025',
    description:
      'Understand Takaful — the Islamic alternative to conventional insurance. Learn the principles of mutual risk-sharing, the Wakala and Mudaraba models, retakaful, and how Takaful operators compete in the global insurance market.',
    whatYouLearn: [
      'Why conventional insurance is prohibited under Shariah',
      'Takaful principles: mutual cooperation and shared responsibility',
      'Wakala and Mudaraba operating models',
      'Takaful product design: family and general',
      'Retakaful (reinsurance) mechanics',
      'Regulatory frameworks for Takaful operators',
    ],
    requirements: [
      'Basic understanding of insurance concepts',
      'Foundations of Islamic finance recommended',
    ],
    sections: [
      {
        id: 's1',
        title: 'Takaful Principles',
        lessonsCount: 5,
        duration: '1h 05m',
        previewCount: 1,
        lessons: [
          { id: 'l1', title: 'Why Conventional Insurance is Prohibited', duration: '14m', preview: true },
          { id: 'l2', title: 'Principles of Mutual Risk-Sharing', duration: '12m', preview: false },
          { id: 'l3', title: 'Tabarru Concept', duration: '11m', preview: false },
          { id: 'l4', title: 'Shariah Rulings on Insurance', duration: '15m', preview: false },
          { id: 'l5', title: 'Quiz: Principles', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Operating Models',
        lessonsCount: 6,
        duration: '1h 30m',
        previewCount: 0,
        lessons: [
          { id: 'l6', title: 'Wakala Model', duration: '15m', preview: false },
          { id: 'l7', title: 'Mudaraba Model', duration: '14m', preview: false },
          { id: 'l8', title: 'Wakala-Mudaraba Hybrid', duration: '16m', preview: false },
          { id: 'l9', title: 'Surplus Distribution', duration: '13m', preview: false },
          { id: 'l10', title: 'Participant Investment Fund', duration: '15m', preview: false },
          { id: 'l11', title: 'Quiz: Models', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Products & Retakaful',
        lessonsCount: 7,
        duration: '1h 45m',
        previewCount: 0,
        lessons: [
          { id: 'l12', title: 'Family Takaful', duration: '15m', preview: false },
          { id: 'l13', title: 'General Takaful', duration: '14m', preview: false },
          { id: 'l14', title: 'Product Pricing', duration: '16m', preview: false },
          { id: 'l15', title: 'Underwriting', duration: '14m', preview: false },
          { id: 'l16', title: 'Retakaful Overview', duration: '15m', preview: false },
          { id: 'l17', title: 'Retakaful Structures', duration: '16m', preview: false },
          { id: 'l18', title: 'Final Assessment', duration: '18m', preview: false },
        ],
      },
    ],
    courseReviews: [
      {
        id: 'r1',
        name: 'Maryam O.',
        avatar: 'https://images.pexels.com/photos/31833805/pexels-photo-31833805.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '1 month ago',
        text: 'Finally a course that explains Takaful clearly without oversimplifying. The operating models section is excellent.',
      },
    ],
  },
  {
    id: 'c4',
    title: 'Islamic Wealth Management & Estate Planning',
    instructor: 'Dr. Yusuf Al-Kabir',
    instructorId: 'i1',
    level: 'Advanced',
    rating: 4.9,
    reviews: 98,
    lessons: 42,
    hours: 11,
    price: 149,
    originalPrice: 199,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/4056856/pexels-photo-4056856.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Wealth Management',
    language: 'English',
    lastUpdated: 'Feb 2026',
    description:
      'Advanced course covering Shariah-compliant wealth management, portfolio construction, zakat optimization, and Islamic estate planning including wasiyya, faraid, and waqf structures.',
    whatYouLearn: [
      'Shariah-compliant portfolio construction',
      'Zakat calculation and optimization strategies',
      'Islamic estate planning: wasiyya, faraid, waqf',
      'Halal investment screening methodologies',
      'Retirement planning within Islamic finance',
      'Family wealth transfer structures',
    ],
    requirements: [
      'Strong understanding of Islamic finance fundamentals',
      'Familiarity with investment concepts',
      'Recommended: complete Foundations course first',
    ],
    sections: [
      {
        id: 's1',
        title: 'Wealth Management Principles',
        lessonsCount: 6,
        duration: '1h 40m',
        previewCount: 0,
        lessons: [
          { id: 'l1', title: 'Islamic View on Wealth', duration: '16m', preview: false },
          { id: 'l2', title: 'Halal Investment Screening', duration: '18m', preview: false },
          { id: 'l3', title: 'Portfolio Construction', duration: '17m', preview: false },
          { id: 'l4', title: 'Risk-Return in Halal Portfolios', duration: '15m', preview: false },
          { id: 'l5', title: 'ESG & Islamic Finance', duration: '14m', preview: false },
          { id: 'l6', title: 'Quiz: Principles', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Zakat & Tax Optimization',
        lessonsCount: 5,
        duration: '1h 20m',
        previewCount: 0,
        lessons: [
          { id: 'l7', title: 'Zakat on Investments', duration: '16m', preview: false },
          { id: 'l8', title: 'Zakat on Business Assets', duration: '15m', preview: false },
          { id: 'l9', title: 'Zakat Calculation Methods', duration: '18m', preview: false },
          { id: 'l10', title: 'Tax-Zakat Interaction', duration: '14m', preview: false },
          { id: 'l11', title: 'Quiz: Zakat', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Estate Planning',
        lessonsCount: 8,
        duration: '2h 15m',
        previewCount: 0,
        lessons: [
          { id: 'l12', title: 'Faraid: Islamic Inheritance', duration: '18m', preview: false },
          { id: 'l13', title: 'Wasiyya: Bequests', duration: '15m', preview: false },
          { id: 'l14', title: 'Waqf: Endowments', duration: '17m', preview: false },
          { id: 'l15', title: 'Trusts in Islamic Planning', duration: '16m', preview: false },
          { id: 'l16', title: 'Cross-Border Estate Issues', duration: '18m', preview: false },
          { id: 'l17', title: 'Case Study: Family Wealth Transfer', duration: '20m', preview: false },
          { id: 'l18', title: 'Hiba: Lifetime Gifts', duration: '14m', preview: false },
          { id: 'l19', title: 'Quiz: Estate Planning', duration: '10m', preview: false },
        ],
      },
      {
        id: 's4',
        title: 'Practical Application',
        lessonsCount: 6,
        duration: '1h 50m',
        previewCount: 0,
        lessons: [
          { id: 'l20', title: 'Retirement Planning', duration: '18m', preview: false },
          { id: 'l21', title: 'Education Funds', duration: '15m', preview: false },
          { id: 'l22', title: 'Real Estate Investment', duration: '17m', preview: false },
          { id: 'l23', title: 'Business Succession', duration: '16m', preview: false },
          { id: 'l24', title: 'Final Project', duration: '20m', preview: false },
          { id: 'l25', title: 'Course Wrap-Up', duration: '10m', preview: false },
        ],
      },
    ],
    courseReviews: [
      {
        id: 'r1',
        name: 'Rahman S.',
        avatar: 'https://images.pexels.com/photos/17049771/pexels-photo-17049771.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '2 weeks ago',
        text: 'The estate planning section is a game-changer for any Muslim with assets. Dr. Al-Kabir covers faraid and waqf in a way that is both scholarly and practical.',
      },
    ],
  },
  {
    id: 'c5',
    title: 'Shariah Governance & Compliance Frameworks',
    instructor: 'Dr. Amina Hassan',
    instructorId: 'i2',
    level: 'Advanced',
    rating: 4.8,
    reviews: 74,
    lessons: 32,
    hours: 8,
    price: 159,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/10885433/pexels-photo-10885433.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Compliance',
    language: 'English',
    lastUpdated: 'Jan 2026',
    description:
      'Deep dive into Shariah governance frameworks for Islamic financial institutions. Learn about board composition, fatwa processes, Shariah audit, and regulatory standards from AAOIFI and IFSB.',
    whatYouLearn: [
      'Shariah board structure and governance',
      'AAOIFI and IFSB standards in depth',
      'Shariah audit methodology and process',
      'Compliance risk management',
      'Internal Shariah control frameworks',
      'Cross-jurisdictional governance challenges',
    ],
    requirements: [
      'Intermediate knowledge of Islamic finance',
      'Understanding of banking operations helpful',
    ],
    sections: [
      {
        id: 's1',
        title: 'Governance Frameworks',
        lessonsCount: 5,
        duration: '1h 15m',
        previewCount: 0,
        lessons: [
          { id: 'l1', title: 'Shariah Board Composition', duration: '15m', preview: false },
          { id: 'l2', title: 'Fatwa Process', duration: '14m', preview: false },
          { id: 'l3', title: 'Governance Documentation', duration: '16m', preview: false },
          { id: 'l4', title: 'Board Independence', duration: '12m', preview: false },
          { id: 'l5', title: 'Quiz: Frameworks', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Standards & Regulation',
        lessonsCount: 6,
        duration: '1h 35m',
        previewCount: 0,
        lessons: [
          { id: 'l6', title: 'AAOIFI Standards', duration: '17m', preview: false },
          { id: 'l7', title: 'IFSB Standards', duration: '16m', preview: false },
          { id: 'l8', title: 'National Regulators', duration: '14m', preview: false },
          { id: 'l9', title: 'Cross-Border Issues', duration: '15m', preview: false },
          { id: 'l10', title: 'Regulatory Arbitrage', duration: '13m', preview: false },
          { id: 'l11', title: 'Quiz: Standards', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Shariah Audit & Compliance',
        lessonsCount: 5,
        duration: '1h 25m',
        previewCount: 0,
        lessons: [
          { id: 'l12', title: 'Shariah Audit Process', duration: '18m', preview: false },
          { id: 'l13', title: 'Internal Controls', duration: '15m', preview: false },
          { id: 'l14', title: 'Non-Compliance Resolution', duration: '16m', preview: false },
          { id: 'l15', title: 'Reporting & Disclosure', duration: '14m', preview: false },
          { id: 'l16', title: 'Final Assessment', duration: '20m', preview: false },
        ],
      },
    ],
    courseReviews: [
      {
        id: 'r1',
        name: 'Khalid M.',
        avatar: 'https://images.pexels.com/photos/12311572/pexels-photo-12311572.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '1 month ago',
        text: 'As a compliance officer, this is the reference course I needed. The AAOIFI and IFSB sections are comprehensive.',
      },
    ],
  },
  {
    id: 'c6',
    title: 'Islamic Microfinance & Development',
    instructor: 'Fatima Noor',
    instructorId: 'i4',
    level: 'Beginner',
    rating: 4.6,
    reviews: 203,
    lessons: 24,
    hours: 6,
    price: 69,
    currency: 'USD',
    thumbnail:
      'https://images.pexels.com/photos/39274072/pexels-photo-39274072.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topic: 'Microfinance',
    language: 'English',
    lastUpdated: 'Nov 2025',
    description:
      'Discover how Islamic microfinance is transforming communities across Africa and Asia. Learn about Qard Hasan, Murabaha microloans, group lending models, and the social impact of faith-based financial inclusion.',
    whatYouLearn: [
      'Principles of Islamic microfinance',
      'Qard Hasan and benevolent loan funds',
      'Group lending: Shariah-compliant models',
      'Mobile money and Islamic microfinance',
      'Measuring social impact',
      'Case studies from East Africa and South Asia',
    ],
    requirements: [
      'No prior knowledge required',
      'Interest in social impact and development',
    ],
    sections: [
      {
        id: 's1',
        title: 'Introduction to Islamic Microfinance',
        lessonsCount: 4,
        duration: '55m',
        previewCount: 1,
        lessons: [
          { id: 'l1', title: 'What is Islamic Microfinance?', duration: '15m', preview: true },
          { id: 'l2', title: 'Financial Inclusion & Faith', duration: '12m', preview: false },
          { id: 'l3', title: 'Serving the Unbanked', duration: '14m', preview: false },
          { id: 'l4', title: 'Quiz: Introduction', duration: '10m', preview: false },
        ],
      },
      {
        id: 's2',
        title: 'Products & Models',
        lessonsCount: 6,
        duration: '1h 30m',
        previewCount: 0,
        lessons: [
          { id: 'l5', title: 'Qard Hasan Microloans', duration: '15m', preview: false },
          { id: 'l6', title: 'Murabaha Microfinance', duration: '14m', preview: false },
          { id: 'l7', title: 'Group Lending Models', duration: '16m', preview: false },
          { id: 'l8', title: 'Savings Products', duration: '13m', preview: false },
          { id: 'l9', title: 'Mobile Money Integration', duration: '15m', preview: false },
          { id: 'l10', title: 'Quiz: Products', duration: '10m', preview: false },
        ],
      },
      {
        id: 's3',
        title: 'Impact & Case Studies',
        lessonsCount: 5,
        duration: '1h 20m',
        previewCount: 0,
        lessons: [
          { id: 'l11', title: 'Measuring Social Impact', duration: '16m', preview: false },
          { id: 'l12', title: 'Case Study: Tanzania', duration: '18m', preview: false },
          { id: 'l13', title: 'Case Study: Bangladesh', duration: '16m', preview: false },
          { id: 'l14', title: 'Sustainability Challenges', duration: '14m', preview: false },
          { id: 'l15', title: 'Final Assessment', duration: '15m', preview: false },
        ],
      },
    ],
    courseReviews: [
      {
        id: 'r1',
        name: 'Aisha J.',
        avatar: 'https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        rating: 5,
        date: '2 weeks ago',
        text: 'Inspiring course. The case studies from Tanzania are eye-opening. Fatima Noor is a great teacher.',
      },
    ],
  },
];

export const instructors: Instructor[] = [
  {
    id: 'i1',
    name: 'Dr. Yusuf Al-Kabir',
    title: 'Former Shariah Board Member, IFSB',
    bio: '20+ years in Islamic banking regulation and advisory across GCC and East Africa. PhD in Islamic Economics from Al-Azhar University. Author of three textbooks on Islamic finance. Former advisor to central banks in Saudi Arabia, UAE, and Tanzania.',
    avatar:
      'https://images.pexels.com/photos/39974547/pexels-photo-39974547.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    expertise: ['Banking', 'Wealth Management', 'Governance'],
    students: 8400,
    courses: 6,
    rating: 4.9,
    languages: ['English', 'Arabic'],
    sessionPrice: 120,
  },
  {
    id: 'i2',
    name: 'Dr. Amina Hassan',
    title: 'Sukuk Structurer & Capital Markets Expert',
    bio: 'Structured over $2B in Sukuk issuances across GCC and Southeast Asia. Former director at a leading Islamic investment bank. LSE alumna with a PhD in Financial Engineering. Published researcher in Islamic capital markets.',
    avatar:
      'https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    expertise: ['Sukuk', 'Capital Markets', 'Governance'],
    students: 6200,
    courses: 4,
    rating: 4.8,
    languages: ['English', 'Arabic', 'Swahili'],
    sessionPrice: 95,
  },
  {
    id: 'i3',
    name: 'Omar Abdullatif',
    title: 'Takaful & Risk Management Specialist',
    bio: '15 years building Takaful products across Africa and the Middle East. ACII certified. Led product development at two of the largest Takaful operators in the GCC. Regular speaker at international Islamic insurance conferences.',
    avatar:
      'https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    expertise: ['Takaful', 'Risk Management', 'Re-Takaful'],
    students: 4100,
    courses: 3,
    rating: 4.7,
    languages: ['English', 'Arabic'],
    sessionPrice: 75,
  },
  {
    id: 'i4',
    name: 'Fatima Noor',
    title: 'Microfinance & Social Impact Leader',
    bio: 'Pioneer of Islamic microfinance in East Africa. Reached 50,000+ beneficiaries through Qard Hasan programs. TEDx speaker. Featured in BBC and Al Jazeera for her work on faith-based financial inclusion.',
    avatar:
      'https://images.pexels.com/photos/7468194/pexels-photo-7468194.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    expertise: ['Microfinance', 'Social Finance', 'Development'],
    students: 5300,
    courses: 2,
    rating: 4.6,
    languages: ['English', 'Swahili'],
    sessionPrice: 60,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Khalid M.',
    role: 'Compliance Officer',
    country: 'UAE',
    avatar:
      'https://images.pexels.com/photos/12311572/pexels-photo-12311572.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'The Sukuk course transformed how I approach structuring. Dr. Hassan explains complex instruments with rare clarity. I now apply these frameworks daily at my bank.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Aisha J.',
    role: 'Banking Trainee',
    country: 'Tanzania',
    avatar:
      'https://images.pexels.com/photos/13801472/pexels-photo-13801472.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'I started with zero background in finance. The beginner course was perfect — clear, engaging, and the certificate helped me land an internship at an Islamic bank.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Rahman S.',
    role: 'Entrepreneur',
    country: 'UK',
    avatar:
      'https://images.pexels.com/photos/17049771/pexels-photo-17049771.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'The private sessions with Dr. Al-Kabir were invaluable for structuring my halal investment portfolio. Worth every penny.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Maryam O.',
    role: 'Graduate Student',
    country: 'Nigeria',
    avatar:
      'https://images.pexels.com/photos/31833805/pexels-photo-31833805.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'The live classes fit my schedule perfectly, and the recordings mean I never miss anything. The quality is better than my university lectures.',
    rating: 5,
  },
];

export const pricingPlans = [
  {
    id: 'course',
    name: 'Per Course',
    price: 89,
    period: 'one-time',
    description: 'Buy individual courses as you go',
    features: [
      'Lifetime access to one course',
      'Video lessons & resources',
      'Quizzes & assessments',
      'Certificate of completion',
      'Community discussion access',
    ],
    highlighted: false,
    cta: 'Browse Courses',
  },
  {
    id: 'pro',
    name: 'Pro Membership',
    price: 29,
    period: 'per month',
    description: 'Unlimited access to all courses',
    features: [
      'All courses included',
      'Live class recordings',
      'Downloadable resources',
      'Verifiable certificates',
      'Priority community support',
      '10% off private sessions',
    ],
    highlighted: true,
    cta: 'Start Pro Membership',
  },
  {
    id: 'mentor',
    name: 'Mentor Sessions',
    price: 75,
    period: 'per session',
    description: '1-to-1 guidance from experts',
    features: [
      'Private 1-hour session',
      'Personalized learning plan',
      'Direct expert guidance',
      'Session recording provided',
      'Flexible scheduling',
    ],
    highlighted: false,
    cta: 'Book a Session',
  },
];

export const faqs = [
  {
    question: 'Do I need a finance background to start?',
    answer:
      'Not at all. Our beginner courses assume no prior knowledge. We start from first principles — what Riba is, why it matters, and how Islamic finance differs from conventional banking. Many of our most successful learners came from non-finance backgrounds.',
  },
  {
    question: 'Are the certificates recognized?',
    answer:
      'Yes. Taqseem certificates are verifiable and recognized by employers across the Gulf, East Africa, and South Asia. Our courses are designed and taught by practicing Shariah board members and industry professionals.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit/debit cards, PayPal, and mobile money (M-Pesa, Tigo Pesa, Airtel Money) for learners in East Africa. You can also pay in your local currency where supported.',
  },
  {
    question: 'Can I access courses on my phone?',
    answer:
      'Yes. The entire platform is mobile-optimized. Course videos stream adaptively based on your connection speed, and you can download resources for offline study. We specifically design for low-bandwidth environments.',
  },
  {
    question: 'What if I am not satisfied with a course?',
    answer:
      'We offer a 14-day money-back guarantee on all individual course purchases. If you are not satisfied for any reason, contact us within 14 days for a full refund — no questions asked.',
  },
  {
    question: 'How do live classes work?',
    answer:
      'Live classes are scheduled, instructor-led sessions held via our integrated video platform. You join from your dashboard, participate in real time, and receive a recording afterwards. All times are shown in your local time zone.',
  },
];

export const stats = [
  { label: 'Active learners', value: 25000, suffix: '+' },
  { label: 'Expert instructors', value: 18, suffix: '' },
  { label: 'Countries served', value: 34, suffix: '' },
  { label: 'Certificates issued', value: 9800, suffix: '+' },
];

export const liveClasses: LiveClass[] = [
  {
    id: 'lc1',
    title: 'Sukuk Structuring Masterclass',
    instructor: 'Dr. Amina Hassan',
    instructorAvatar: 'https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Capital Markets',
    date: 'Oct 18, 2026 · 14:00 GMT',
    duration: '90 min',
    seatsTotal: 50,
    seatsLeft: 12,
    price: 35,
    status: 'upcoming',
    description: 'Live walkthrough of a real Sukuk issuance from concept to pricing. Includes Q&A and downloadable structuring templates.',
  },
  {
    id: 'lc2',
    title: 'Zakat Calculation Workshop',
    instructor: 'Dr. Yusuf Al-Kabir',
    instructorAvatar: 'https://images.pexels.com/photos/39974547/pexels-photo-39974547.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Wealth Management',
    date: 'Oct 20, 2026 · 16:00 GMT',
    duration: '60 min',
    seatsTotal: 100,
    seatsLeft: 47,
    price: 25,
    status: 'upcoming',
    description: 'Practical workshop on calculating zakat for various asset types: cash, stocks, real estate, and business inventory. Bring your questions.',
  },
  {
    id: 'lc3',
    title: 'Takaful Product Design Lab',
    instructor: 'Omar Abdullatif',
    instructorAvatar: 'https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Takaful',
    date: 'Oct 22, 2026 · 13:00 GMT',
    duration: '75 min',
    seatsTotal: 40,
    seatsLeft: 8,
    price: 30,
    status: 'upcoming',
    description: 'Design a family Takaful product from scratch. Covers pricing, surplus distribution, and participant fund management.',
  },
  {
    id: 'lc4',
    title: 'Islamic Fintech & Digital Banking',
    instructor: 'Dr. Amina Hassan',
    instructorAvatar: 'https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Fintech',
    date: 'Oct 25, 2026 · 15:00 GMT',
    duration: '90 min',
    seatsTotal: 80,
    seatsLeft: 55,
    price: 35,
    status: 'upcoming',
    description: 'Explore how blockchain, AI, and digital platforms are transforming Islamic finance. Case studies from Wahed, Marqeta, and East African mobile money.',
  },
  {
    id: 'lc5',
    title: 'Islamic Microfinance in Practice',
    instructor: 'Fatima Noor',
    instructorAvatar: 'https://images.pexels.com/photos/7468194/pexels-photo-7468194.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Microfinance',
    date: 'Oct 28, 2026 · 12:00 GMT',
    duration: '60 min',
    seatsTotal: 60,
    seatsLeft: 30,
    price: 20,
    status: 'upcoming',
    description: 'Real-world case study of a Qard Hasan microfinance program serving 12,000 beneficiaries in rural Tanzania.',
  },
  {
    id: 'lc6',
    title: 'Shariah Audit Process Deep Dive',
    instructor: 'Dr. Yusuf Al-Kabir',
    instructorAvatar: 'https://images.pexels.com/photos/39974547/pexels-photo-39974547.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    topic: 'Compliance',
    date: 'Oct 15, 2026 · 10:00 GMT',
    duration: '90 min',
    seatsTotal: 50,
    seatsLeft: 0,
    price: 35,
    status: 'recorded',
    recordingUrl: '#',
    description: 'Walkthrough of a complete Shariah audit cycle. Recording available with Pro membership.',
  },
];

export const mentorAvailability: Record<string, MentorSlot[]> = {
  i1: [
    { day: 'Mon Oct 20', slots: ['09:00', '10:00', '14:00', '15:00'] },
    { day: 'Tue Oct 21', slots: ['09:00', '11:00', '13:00'] },
    { day: 'Wed Oct 22', slots: ['10:00', '14:00', '15:00', '16:00'] },
    { day: 'Thu Oct 23', slots: ['09:00', '10:00', '11:00'] },
  ],
  i2: [
    { day: 'Mon Oct 20', slots: ['13:00', '14:00', '15:00', '16:00'] },
    { day: 'Wed Oct 22', slots: ['09:00', '10:00', '11:00', '14:00'] },
    { day: 'Fri Oct 24', slots: ['10:00', '11:00', '13:00'] },
  ],
  i3: [
    { day: 'Tue Oct 21', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    { day: 'Thu Oct 23', slots: ['13:00', '14:00', '15:00'] },
  ],
  i4: [
    { day: 'Mon Oct 20', slots: ['08:00', '09:00', '10:00', '11:00'] },
    { day: 'Wed Oct 22', slots: ['08:00', '12:00', '13:00'] },
    { day: 'Fri Oct 24', slots: ['08:00', '09:00', '10:00'] },
  ],
};
