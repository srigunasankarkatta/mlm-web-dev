// MLM Plan Types
export interface MLMPlan {
  id: string;
  name: string;
  price: number;
  level: number;
  benefits: string[];
  unlocks: IncomeType[];
  isRequired: boolean;
  description: string;
  features: string[];
}

// Income Types
export type IncomeType = 'Direct' | 'Level' | 'Club' | 'AutoPool';

export interface IncomeBreakdown {
  type: IncomeType;
  percentage?: number;
  amount?: number;
  description: string;
  maxDirects?: number;
  levels?: number[];
}

// User Profile
export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  purchasedPlans: MLMPlan[];
  walletBalance: number;
  totalEarnings: number;
  joinDate: Date;
  referralCode: string;
  uplineId?: string;
}

// Purchase Flow
export interface PurchaseRequest {
  planId: string;
  userId: string;
  amount: number;
  paymentMethod: 'razorpay' | 'cashfree';
}

export interface PurchaseResponse {
  success: boolean;
  transactionId: string;
  plan: MLMPlan;
  message: string;
}

// Dashboard Data
export interface IncomeSummary {
  directIncome: {
    total: number;
    breakdown: { level: number; percentage: number; amount: number }[];
  };
  levelIncome: {
    total: number;
    breakdown: { level: number; percentage: number; amount: number }[];
  };
  clubIncome: {
    total: number;
    perJoin: number;
    totalJoins: number;
  };
  autoPoolIncome: {
    total: number;
    currentLevel: number;
    members: number;
    nextLevelMembers: number;
  };
}

// Auth Types
export interface LoginRequest {
  identifier: string; // email or mobile
  otp: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile: string;
  referralCode?: string;
  planId: string; // Must purchase Package-1 first
}

export interface AuthResponse {
  success: boolean;
  user?: CustomerProfile;
  token?: string;
  message: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'income' | 'member' | 'upgrade' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}
