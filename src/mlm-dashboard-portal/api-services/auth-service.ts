import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for auth requests/responses
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
        token: string;
        refreshToken: string;
    };
    message: string;
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
        id: number;
        email: string;
        name: string;
        role: string;
        avatar?: string;
        createdAt: string;
        updatedAt: string;
    };
}

// Auth service class
export class AuthService {
    // Login user
    static async login(credentials: LoginRequest): Promise<LoginResponse> {
        return defaultApiService.post<LoginResponse>(
            API_CONFIG.endpoints.auth.login,
            credentials
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
}

export default AuthService;
