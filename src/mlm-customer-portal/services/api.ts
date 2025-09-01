import { 
  MLMPlan, 
  CustomerProfile, 
  IncomeSummary, 
  PurchaseRequest, 
  PurchaseResponse, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  Notification 
} from '../types';
import { MLM_PLANS } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers: CustomerProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+1234567890',
    purchasedPlans: [MLM_PLANS[0], MLM_PLANS[1]], // Package-1 and Package-2
    walletBalance: 125.50,
    totalEarnings: 342.75,
    joinDate: new Date('2024-01-15'),
    referralCode: 'JOHN001',
    uplineId: 'UPLINE001'
  }
];

// Mock income summary
const mockIncomeSummary: IncomeSummary = {
  directIncome: {
    total: 156.25,
    breakdown: [
      { level: 1, percentage: 6, amount: 45.00 },
      { level: 2, percentage: 9, amount: 67.50 },
      { level: 3, percentage: 12, amount: 43.75 }
    ]
  },
  levelIncome: {
    total: 89.50,
    breakdown: [
      { level: 2, percentage: 2, amount: 32.00 },
      { level: 3, percentage: 3, amount: 57.50 }
    ]
  },
  clubIncome: {
    total: 45.00,
    perJoin: 0.5,
    totalJoins: 90
  },
  autoPoolIncome: {
    total: 52.00,
    currentLevel: 2,
    members: 16,
    nextLevelMembers: 64
  }
};

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'income',
    title: 'New Direct Referral',
    message: 'You earned $12.50 from a new direct referral',
    timestamp: new Date(),
    isRead: false
  },
  {
    id: '2',
    type: 'member',
    title: 'Network Growth',
    message: 'Your network has grown to 25 members',
    timestamp: new Date(Date.now() - 86400000),
    isRead: false
  },
  {
    id: '3',
    type: 'upgrade',
    title: 'Package Upgrade Available',
    message: 'You can now upgrade to Package-3 for $60',
    timestamp: new Date(Date.now() - 172800000),
    isRead: true
  }
];

// API Service Class
export class CustomerPortalAPI {
  // Authentication
  static async login(request: LoginRequest): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay
    
    // Mock validation - in real app, this would validate against backend
    if (request.identifier.includes('@') && request.otp === '123456') {
      const user = mockUsers[0];
      return {
        success: true,
        user,
        token: 'mock-jwt-token-' + Date.now(),
        message: 'Login successful'
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials or OTP'
    };
  }

  static async register(request: RegisterRequest): Promise<AuthResponse> {
    await delay(1500);
    
    // Mock validation
    if (request.planId !== 'package-1') {
      return {
        success: false,
        message: 'Package-1 is required for registration'
      };
    }
    
    // Create new user
    const newUser: CustomerProfile = {
      id: Date.now().toString(),
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      purchasedPlans: [MLM_PLANS[0]], // Start with Package-1
      walletBalance: 0,
      totalEarnings: 0,
      joinDate: new Date(),
      referralCode: request.name.toUpperCase().substring(0, 4) + Date.now().toString().slice(-3),
      uplineId: request.referralCode || undefined
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
      message: 'Registration successful'
    };
  }

  // Plans
  static async getPlans(): Promise<MLMPlan[]> {
    await delay(500);
    return MLM_PLANS;
  }

  static async getPlanById(planId: string): Promise<MLMPlan | null> {
    await delay(300);
    return MLM_PLANS.find(plan => plan.id === planId) || null;
  }

  // User Profile
  static async getUserProfile(userId: string): Promise<CustomerProfile | null> {
    await delay(600);
    return mockUsers.find(user => user.id === userId) || null;
  }

  static async updateUserProfile(userId: string, updates: Partial<CustomerProfile>): Promise<CustomerProfile | null> {
    await delay(800);
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  }

  // Income & Dashboard
  static async getIncomeSummary(userId: string): Promise<IncomeSummary | null> {
    await delay(700);
    return mockIncomeSummary;
  }

  static async getNotifications(userId: string): Promise<Notification[]> {
    await delay(400);
    return mockNotifications;
  }

  static async markNotificationAsRead(userId: string, notificationId: string): Promise<boolean> {
    await delay(300);
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      return true;
    }
    return false;
  }

  // Purchase Flow
  static async purchasePlan(request: PurchaseRequest): Promise<PurchaseResponse> {
    await delay(2000); // Simulate payment processing
    
    const plan = MLM_PLANS.find(p => p.id === request.planId);
    if (!plan) {
      return {
        success: false,
        transactionId: '',
        plan: MLM_PLANS[0],
        message: 'Plan not found'
      };
    }
    
    // Mock payment success
    const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Update user's purchased plans
    const user = mockUsers.find(u => u.id === request.userId);
    if (user) {
      user.purchasedPlans.push(plan);
      user.walletBalance += plan.price * 0.1; // Add 10% of plan price as bonus
    }
    
    return {
      success: true,
      transactionId,
      plan,
      message: 'Purchase successful! Plan has been activated.'
    };
  }

  // Referral System
  static async getReferralStats(userId: string): Promise<{
    totalReferrals: number;
    directReferrals: number;
    networkSize: number;
    referralEarnings: number;
  }> {
    await delay(600);
    return {
      totalReferrals: 25,
      directReferrals: 3,
      networkSize: 25,
      referralEarnings: 156.25
    };
  }

  // Withdrawal
  static async requestWithdrawal(userId: string, amount: number): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }> {
    await delay(1500);
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }
    
    if (amount > user.walletBalance) {
      return {
        success: false,
        message: 'Insufficient wallet balance'
      };
    }
    
    const transactionId = 'WD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    user.walletBalance -= amount;
    
    return {
      success: true,
      transactionId,
      message: `Withdrawal request of $${amount} submitted successfully`
    };
  }
}

// Export individual functions for convenience
export const {
  login,
  register,
  getPlans,
  getPlanById,
  getUserProfile,
  updateUserProfile,
  getIncomeSummary,
  getNotifications,
  markNotificationAsRead,
  purchasePlan,
  getReferralStats,
  requestWithdrawal
} = CustomerPortalAPI;
