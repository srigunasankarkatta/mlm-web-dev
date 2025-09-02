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
  subtitle: 'Join our MLM platform and unlock multiple income streams',
  description: 'Start with just ₹20 and build your network. Earn from direct referrals, level income, club benefits, and auto pool rewards.',
  benefits: [
    'Multiple Income Streams',
    'Fast Track Packages',
    'Professional Support',
    '24/7 Dashboard Access'
  ]
};

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
