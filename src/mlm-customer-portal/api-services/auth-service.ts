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
    status: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            sponsor_id: number | null;
            package_id: number | null;
            created_at: string;
            updated_at: string;
        };
    };
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    referral_code?: string;
}

export interface RegisterResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        referral_code: string;
        sponsor_referral_code: string;
    };
}

export interface OtpRequest {
    identifier: string; // email or mobile
    type: 'login' | 'register' | 'forgot-password';
}

export interface OtpResponse {
    status: boolean;
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
    status: boolean;
    message: string;
    data?: {
        user?: {
            id: number;
            name: string;
            email: string;
            sponsor_id: number | null;
            package_id: number | null;
            created_at: string;
            updated_at: string;
        };
        token?: string;
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
    status: boolean;
    data: {
        id: number;
        name: string;
        email: string;
        sponsor_id: number | null;
        package_id: number | null;
        created_at: string;
        updated_at: string;
        avatar?: string;
        walletBalance?: number;
        totalEarnings?: number;
        purchasedPlans?: Array<{
            id: number;
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
        const response = await defaultApiService.post<LoginResponse>(
            API_CONFIG.endpoints.auth.login,
            credentials
        );
        return response.data;
    }

    // Register user
    static async register(userData: RegisterRequest): Promise<RegisterResponse> {
        try {
            console.log('Registering user with data:', userData);

            const response = await defaultApiService.post<RegisterResponse>(
                '/register',
                userData
            );

            console.log('Registration successful:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Registration failed:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw error;
        }
    }

    // Send OTP
    static async sendOtp(data: OtpRequest): Promise<OtpResponse> {
        const response = await defaultApiService.post<OtpResponse>(
            API_CONFIG.endpoints.auth.resendOtp,
            data
        );
        return response.data;
    }

    // Verify OTP
    static async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
        const response = await defaultApiService.post<VerifyOtpResponse>(
            API_CONFIG.endpoints.auth.verifyOtp,
            data
        );
        return response.data;
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
        localStorage.removeItem('user');
    }

    // Refresh access token
    static async refreshToken(): Promise<{ token: string }> {
        return defaultApiService.post('/customer/refresh');
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
        const response = await defaultApiService.get<ProfileResponse>(
            API_CONFIG.endpoints.auth.profile
        );
        return response.data;
    }

    // Update user profile
    static async updateProfile(data: Partial<ProfileResponse['data']>): Promise<ProfileResponse> {
        const response = await defaultApiService.put<ProfileResponse>(
            API_CONFIG.endpoints.auth.profile,
            data
        );
        return response.data;
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
        localStorage.removeItem('user');
    }

    // Get network tree data
    static async getNetworkTree(userId?: string): Promise<any> {
        // TODO: Replace with actual API endpoint
        return defaultApiService.get('/mlm/network-tree', {
            params: userId ? { userId } : {}
        });
    }
}

export default CustomerAuthService;
