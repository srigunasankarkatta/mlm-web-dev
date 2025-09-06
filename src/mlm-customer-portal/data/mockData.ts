import { MLMPlan, IncomeBreakdown } from '../types';

// MLM Plans Data
export const MLM_PLANS: MLMPlan[] = [
  {
    id: 'package-1',
    name: 'Package-1',
    price: 20,
    level: 1,
    benefits: ['Direct Income', 'Level-1 Income', 'Club Income', 'Auto Pool Access'],
    unlocks: ['Direct', 'Level', 'Club', 'AutoPool'],
    isRequired: true,
    description: 'Entry level package to start your MLM journey',
    features: ['Basic MLM features', 'Direct referral income', 'Club benefits', 'Auto pool entry']
  },
  {
    id: 'package-2',
    name: 'Package-2',
    price: 40,
    level: 2,
    benefits: ['Level-2 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-2 income streams',
    features: ['Level-2 income at 2%', 'Enhanced earning potential']
  },
  {
    id: 'package-3',
    name: 'Package-3',
    price: 60,
    level: 3,
    benefits: ['Level-3 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-3 income streams',
    features: ['Level-3 income at 3%', 'Higher earning potential']
  },
  {
    id: 'package-4',
    name: 'Package-4',
    price: 80,
    level: 4,
    benefits: ['Level-4 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-4 income streams',
    features: ['Level-4 income at 4%', 'Premium earning potential']
  },
  {
    id: 'package-5',
    name: 'Package-5',
    price: 100,
    level: 5,
    benefits: ['Level-5 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-5 income streams',
    features: ['Level-5 income at 5%', 'Advanced earning potential']
  },
  {
    id: 'package-6',
    name: 'Package-6',
    price: 120,
    level: 6,
    benefits: ['Level-6 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-6 income streams',
    features: ['Level-6 income at 6%', 'Professional earning potential']
  },
  {
    id: 'package-7',
    name: 'Package-7',
    price: 140,
    level: 7,
    benefits: ['Level-7 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-7 income streams',
    features: ['Level-7 income at 7%', 'Expert earning potential']
  },
  {
    id: 'package-8',
    name: 'Package-8',
    price: 160,
    level: 8,
    benefits: ['Level-8 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-8 income streams',
    features: ['Level-8 income at 8%', 'Master earning potential']
  },
  {
    id: 'package-9',
    name: 'Package-9',
    price: 180,
    level: 9,
    benefits: ['Level-9 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-9 income streams',
    features: ['Level-9 income at 9%', 'Elite earning potential']
  },
  {
    id: 'package-10',
    name: 'Package-10',
    price: 200,
    level: 10,
    benefits: ['Level-10 Income Unlock'],
    unlocks: ['Level'],
    isRequired: false,
    description: 'Unlock Level-10 income streams',
    features: ['Level-10 income at 10%', 'Ultimate earning potential']
  }
];

// Income Breakdown Data
export const INCOME_BREAKDOWN: IncomeBreakdown[] = [
  {
    type: 'Direct',
    percentage: 6,
    description: 'Direct referral income (6%, 9%, 12%, 15%)',
    maxDirects: 4
  },
  {
    type: 'Level',
    percentage: 2,
    description: 'Level income from L2 to L10 (2% to 10%)',
    levels: [2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    type: 'Club',
    amount: 0.5,
    description: '₹0.5 per new member join'
  },
  {
    type: 'AutoPool',
    description: 'Auto pool progression (4 → 16 → 64 members)'
  }
];

// Hero Section Content
export const HERO_CONTENT = {
  title: 'Fast Track to Financial Freedom',
  subtitle: 'Join India\'s Most Trusted MLM Platform',
  description: 'Start with just ₹20 and build your network. Earn from direct referrals, level income, club benefits, and auto pool rewards. Join 10,000+ successful members earning ₹50L+ monthly.',
  benefits: [
    'Multiple Income Streams',
    'Fast Track Packages',
    'Professional Support',
    '24/7 Dashboard Access'
  ],
  cta: {
    primary: 'Start Earning Today',
    secondary: 'Watch Demo',
    tertiary: 'Download App'
  },
  trustIndicators: [
    'SSL Secured',
    'Instant Payouts',
    '24/7 Support',
    'Mobile App Available'
  ]
};

// Statistics Data
export const STATISTICS = [
  {
    number: '10,000+',
    label: 'Active Members',
    icon: 'Users'
  },
  {
    number: '₹50L+',
    label: 'Total Payouts',
    icon: 'DollarSign'
  },
  {
    number: '99.9%',
    label: 'Uptime Guarantee',
    icon: 'Shield'
  },
  {
    number: '24/7',
    label: 'Support Available',
    icon: 'Headphones'
  }
];

// Features Data
export const FEATURES = [
  {
    title: 'Multiple Income Streams',
    description: 'Earn from 4 different income types: Direct, Level, Club, and Auto Pool rewards',
    icon: 'TrendingUp',
    benefits: ['Direct referral income up to 15%', 'Level income from 2% to 10%', 'Club benefits on new joins', 'Auto pool progression rewards']
  },
  {
    title: 'Fast Track Packages',
    description: '10 carefully designed packages from ₹20 to ₹200 to unlock different earning levels',
    icon: 'Package',
    benefits: ['Start with just ₹20', 'Progressive package system', 'Unlock higher income levels', 'Flexible upgrade options']
  },
  {
    title: 'Real-time Dashboard',
    description: 'Track your earnings, network growth, and income streams in real-time',
    icon: 'BarChart3',
    benefits: ['Live earnings tracking', 'Network visualization', 'Income breakdown charts', 'Performance analytics']
  },
  {
    title: 'Secure & Reliable',
    description: 'Bank-grade security with 99.9% uptime guarantee and instant payouts',
    icon: 'Shield',
    benefits: ['SSL encryption', 'Secure payment processing', 'Instant withdrawals', '24/7 monitoring']
  },
  {
    title: 'Professional Support',
    description: 'Dedicated support team to help you succeed in your MLM journey',
    icon: 'Users',
    benefits: ['24/7 customer support', 'Training materials', 'Mentorship programs', 'Community forums']
  },
  {
    title: 'Mobile Optimized',
    description: 'Access your dashboard and manage your business from anywhere, anytime',
    icon: 'Smartphone',
    benefits: ['Mobile-first design', 'Offline capabilities', 'Push notifications', 'Cross-platform sync']
  }
];

// Testimonials Data
export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    earnings: '₹25,000/month',
    duration: '6 months',
    rating: 5,
    text: 'This platform has completely changed my life. I started with just ₹20 and now I\'m earning ₹25,000 monthly. The support team is amazing and the dashboard is so easy to use.',
    image: '/testimonials/priya-sharma.jpg'
  },
  {
    id: 'testimonial-2',
    name: 'Rajesh Kumar',
    location: 'Delhi, NCR',
    earnings: '₹45,000/month',
    duration: '1 year',
    rating: 5,
    text: 'The multiple income streams are incredible. I love how I can earn from different sources and the auto pool feature is a game-changer. Highly recommended!',
    image: '/testimonials/rajesh-kumar.jpg'
  },
  {
    id: 'testimonial-3',
    name: 'Sunita Patel',
    location: 'Ahmedabad, Gujarat',
    earnings: '₹18,000/month',
    duration: '4 months',
    rating: 5,
    text: 'As a working mother, this platform gives me the flexibility I need. I can manage my business from my phone and the income is consistent. Thank you!',
    image: '/testimonials/sunita-patel.jpg'
  },
  {
    id: 'testimonial-4',
    name: 'Vikram Singh',
    location: 'Pune, Maharashtra',
    earnings: '₹60,000/month',
    duration: '1.5 years',
    rating: 5,
    text: 'The best MLM platform I\'ve ever used. The transparency, instant payouts, and professional support make it stand out from the rest.',
    image: '/testimonials/vikram-singh.jpg'
  }
];

// How It Works Steps
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Sign Up & Choose Package',
    description: 'Create your account and select your starting package (minimum ₹20)',
    icon: 'UserPlus'
  },
  {
    step: 2,
    title: 'Build Your Network',
    description: 'Invite friends and family to join your network and start earning',
    icon: 'Users'
  },
  {
    step: 3,
    title: 'Earn Multiple Incomes',
    description: 'Start earning from direct referrals, level income, and club benefits',
    icon: 'DollarSign'
  },
  {
    step: 4,
    title: 'Grow & Scale',
    description: 'Upgrade packages to unlock higher income levels and maximize earnings',
    icon: 'TrendingUp'
  }
];

// Trust Indicators Data
export const TRUST_INDICATORS = [
  {
    title: 'Bank-Grade Security',
    description: '256-bit SSL encryption and secure payment processing',
    icon: 'Shield',
    badge: 'SSL Secured'
  },
  {
    title: 'Instant Payouts',
    description: 'Withdraw your earnings instantly to your bank account',
    icon: 'Zap',
    badge: 'Real-time'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support in multiple languages',
    icon: 'Headphones',
    badge: 'Always Online'
  },
  {
    title: 'Mobile App',
    description: 'Manage your business on-the-go with our mobile app',
    icon: 'Smartphone',
    badge: 'Download Now'
  },
  {
    title: 'Transparent System',
    description: 'Complete transparency in earnings and payouts',
    icon: 'Eye',
    badge: '100% Transparent'
  },
  {
    title: 'Regulatory Compliance',
    description: 'Fully compliant with Indian financial regulations',
    icon: 'CheckCircle',
    badge: 'Compliant'
  }
];

// FAQ Preview Data
export const FAQ_PREVIEW = [
  {
    question: 'What is the minimum investment required?',
    answer: 'Package-1 (₹20) is mandatory to start. This unlocks Direct Income, Level-1 Income, Club Income, and Auto Pool access.'
  },
  {
    question: 'How quickly can I start earning?',
    answer: 'You can start earning immediately after your first referral joins. Direct income is credited instantly upon successful referrals.'
  },
  {
    question: 'Are there any hidden charges?',
    answer: 'No hidden charges. All fees are transparent and clearly mentioned. You only pay for the packages you choose to purchase.'
  }
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: 'What is the minimum investment required?',
    answer: 'Package-1 (₹20) is mandatory to start. This unlocks Direct Income, Level-1 Income, Club Income, and Auto Pool access.',
    telugu: 'మీరు ప్రారంభించడానికి Package-1 (₹20) తప్పనిసరి. ఇది Direct Income, Level-1 Income, Club Income మరియు Auto Pool access ని అన్లాక్ చేస్తుంది.'
  },
  {
    question: 'How does Direct Income work?',
    answer: 'Direct Income has 4 slabs: 6%, 9%, 12%, and 15%. You can have maximum 4 direct referrals.',
    telugu: 'Direct Income కి 4 slabs ఉన్నాయి: 6%, 9%, 12%, మరియు 15%. మీరు గరిష్టంగా 4 direct referrals కలిగి ఉండవచ్చు.'
  },
  {
    question: 'What is Level Income?',
    answer: 'Level Income ranges from 2% (Level-2) to 10% (Level-10). Higher packages unlock higher levels.',
    telugu: 'Level Income 2% (Level-2) నుండి 10% (Level-10) వరకు ఉంటుంది. ఎక్కువ packages ఎక్కువ levels ని అన్లాక్ చేస్తాయి.'
  },
  {
    question: 'How does Auto Pool work?',
    answer: 'Auto Pool progresses automatically: 4 → 16 → 64 members. Each level provides additional rewards.',
    telugu: 'Auto Pool స్వయంచాలకంగా ముందుకు వెళుతుంది: 4 → 16 → 64 members. ప్రతి level అదనపు rewards ని అందిస్తుంది.'
  }
];
