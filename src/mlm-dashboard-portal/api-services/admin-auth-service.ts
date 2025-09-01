import { adminApiService } from './api-service-factory';
import type {
    AdminLoginCredentials,
    AdminLoginResponse,
    AdminProfileResponse,
} from '../queries/types/admin-auth';

// Admin Auth service class
export class AdminAuthService {
    // Admin login
    static async login(credentials: AdminLoginCredentials): Promise<AdminLoginResponse> {
        return adminApiService.post<AdminLoginResponse>(
            '/login',
            credentials
        );
    }

    // Admin logout
    static async logout(): Promise<void> {
        try {
            await adminApiService.post('/logout');
        } catch (error) {
            // Even if logout fails, we should clear local storage
            console.warn('Admin logout API call failed, but clearing local storage');
        }

        // Clear admin-specific local storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    }

    // Get admin profile
    static async getProfile(): Promise<AdminProfileResponse> {
        return adminApiService.get<AdminProfileResponse>('/profile');
    }

    // Update admin profile
    static async updateProfile(data: Partial<AdminProfileResponse['data']>): Promise<AdminProfileResponse> {
        return adminApiService.put<AdminProfileResponse>('/profile', data);
    }

    // Change admin password
    static async changePassword(data: {
        currentPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
    }): Promise<{ success: boolean; message: string }> {
        return adminApiService.post('/change-password', data);
    }

    // Get admin permissions
    static async getPermissions(): Promise<{
        success: boolean;
        data: {
            permissions: string[];
            roles: string[];
        };
    }> {
        return adminApiService.get('/permissions');
    }

    // Check if admin has specific permission
    static async checkPermission(permission: string): Promise<{
        success: boolean;
        data: { hasPermission: boolean };
    }> {
        return adminApiService.get(`/permissions/check/${permission}`);
    }
}

export default AdminAuthService;
