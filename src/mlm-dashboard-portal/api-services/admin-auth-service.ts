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
            '/admin/login',
            credentials
        );
    }

    // Admin logout
    static async logout(): Promise<void> {
        try {
            await adminApiService.post('/admin/logout');
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
        return adminApiService.get<AdminProfileResponse>('/admin/profile');
    }

    // Update admin profile
    static async updateProfile(data: Partial<AdminProfileResponse['data']>): Promise<AdminProfileResponse> {
        return adminApiService.put<AdminProfileResponse>('/admin/profile', data);
    }

    // Change admin password
    static async changePassword(data: {
        currentPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
    }): Promise<{ status: boolean; message: string }> {
        return adminApiService.post('/admin/change-password', data);
    }
}

export default AdminAuthService;
