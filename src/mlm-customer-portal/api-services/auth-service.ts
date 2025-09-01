import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for auth requests/responses
export interface LoginRequest {
    email?: string;
    mobile?: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: {
            id: string;
            email: string;
            mobile: string;
            name: string;
            role: string;
            referralCode: string;
            uplineId?: string;
        };
        token: string;
        refreshToken: string;
    };
    message: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    mobile: string;
    referralCode?: string;
    planId: string;
    password: string;
    passwordConfirmation: string;
}

export interface RegisterResponse {
    success: boolean;
    data: {
        user: {
            id: string;
            email: string;
            mobile: string;
            name: string;
            role: string;
            referralCode: string;
        };
        token: string;
        refreshToken: string;
        message: string;
    };
    message: string;
}

export interface OtpRequest {
    identifier: string; // email or mobile
    type: 'login' | 'register' | 'forgot-password';
}

export interface OtpResponse {
    success: boolean;
    message: string;
    data?: {
        otpId: string;
        expiresAt: string;
    };
}

export interface VerifyOtpRequest {
    identifier: string;
    otp: string;
    otpId?: string;
    type: 'login' | 'register' | 'forgot-password';
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
    data?: {
        user?: {
            id: string;
            email: string;
            mobile: string;
            name: string;
            role: string;
        };
        token?: string;
        refreshToken?: string;
    };
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    passwordConfirmation: string;
}

export interface ProfileResponse {
    success: boolean;
    data: {
        id: string;
        email: string;
        mobile: string;
        name: string;
        role: string;
        avatar?: string;
        referralCode: string;
        uplineId?: string;
        joinDate: string;
        walletBalance: number;
        totalEarnings: number;
        purchasedPlans: Array<{
            id: string;
            name: string;
            price: number;
            purchaseDate: string;
        }>;
    };
}

// Auth service class
export class CustomerAuthService {
    // Login user
    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        return defaultApiService.post<LoginResponse>(
            API_CONFIG.endpoints.auth.login,
            credentials
        );
    }

    // Register user
    static async register(userData: RegisterRequest): Promise<RegisterResponse> {
        return defaultApiService.post<RegisterResponse>(
            API_CONFIG.endpoints.auth.register,
            userData
        );
    }

    // Send OTP
    static async sendOtp(data: OtpRequest): Promise<OtpResponse> {
        return defaultApiService.post<OtpResponse>(
            API_CONFIG.endpoints.auth.resendOtp,
            data
        );
    }

    // Verify OTP
    static async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
        return defaultApiService.post<VerifyOtpResponse>(
            API_CONFIG.endpoints.auth.verifyOtp,
            data
        );
    }

    // Logout user
    static async logout(): Promise<void> {
        try {
            await defaultApiService.post(API_CONFIG.endpoints.auth.logout);
        } catch (error) {
            // Even if logout fails, we should clear local storage
            console.warn('Logout API call failed, but clearing local storage');
        }

        // Clear local storage regardless of API response
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    // Refresh access token
    static async refreshToken(): Promise<{ token: string }> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        return defaultApiService.post('/auth/refresh', { refreshToken });
    }

    // Forgot password
    static async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
        return defaultApiService.post(
            API_CONFIG.endpoints.auth.forgotPassword,
            data
        );
    }

    // Reset password
    static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
        return defaultApiService.post(
            API_CONFIG.endpoints.auth.resetPassword,
            data
        );
    }

    // Get user profile
    static async getProfile(): Promise<ProfileResponse> {
        return defaultApiService.get<ProfileResponse>(
            API_CONFIG.endpoints.auth.profile
        );
    }

    // Update user profile
    static async updateProfile(data: Partial<ProfileResponse['data']>): Promise<ProfileResponse> {
        return defaultApiService.put<ProfileResponse>(
            API_CONFIG.endpoints.auth.profile,
            data
        );
    }

    // Check if user is authenticated
    static isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    // Get current user from localStorage
    static getCurrentUser(): any {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                return null;
            }
        }
        return null;
    }

    // Set current user in localStorage
    static setCurrentUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Clear all auth data
    static clearAuth(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
}

export default CustomerAuthService;
