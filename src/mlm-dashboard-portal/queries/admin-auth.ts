import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminAuthService } from '../api-services/admin-auth-service';
import type {
    AdminLoginCredentials,
    AdminLoginResponse,
    AdminProfileResponse,
    AdminAuthError,
    AdminRole,
} from './types/admin-auth';

// Query keys for admin authentication
export const adminAuthQueryKeys = {
    all: ['admin-auth'] as const,
    profile: () => [...adminAuthQueryKeys.all, 'profile'] as const,
    user: (id: number) => [...adminAuthQueryKeys.all, 'user', id] as const,
    isAuthenticated: () => [...adminAuthQueryKeys.all, 'isAuthenticated'] as const,
};

// Hook to get admin profile
export const useAdminProfile = () => {
    return useQuery({
        queryKey: adminAuthQueryKeys.profile(),
        queryFn: async (): Promise<AdminProfileResponse> => {
            return AdminAuthService.getProfile();
        },
        enabled: !!localStorage.getItem('adminToken'), // Only run if admin token exists
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on 401/403 errors
            if (error?.statusCode === 401 || error?.statusCode === 403) {
                return false;
            }
            return failureCount < 3;
        },
    });
};

// Hook to check if admin is authenticated
export const useAdminIsAuthenticated = () => {
    return useQuery({
        queryKey: adminAuthQueryKeys.isAuthenticated(),
        queryFn: async (): Promise<boolean> => {
            const token = localStorage.getItem('adminToken');
            if (!token) return false;

            try {
                await AdminAuthService.getProfile();
                return true;
            } catch (error: any) {
                if (error.statusCode === 401 || error.statusCode === 403) {
                    // Clear invalid tokens
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                    return false;
                }
                throw error;
            }
        },
        enabled: !!localStorage.getItem('adminToken'),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for admin login
export const useAdminLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: AdminLoginCredentials): Promise<AdminLoginResponse> => {
            return AdminAuthService.login(credentials);
        },
        onSuccess: (data: AdminLoginResponse) => {
            // Store admin token and user data
            localStorage.setItem('adminToken', data.data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.data.user));

            // Invalidate and refetch admin auth queries
            queryClient.invalidateQueries({ queryKey: adminAuthQueryKeys.all });

            // Set admin profile data
            queryClient.setQueryData(adminAuthQueryKeys.profile(), {
                status: true,
                data: data.data.user,
                message: 'Admin login successful',
            });

            // Set authentication status
            queryClient.setQueryData(adminAuthQueryKeys.isAuthenticated(), true);
        },
        onError: (error: AdminAuthError) => {
            // Handle login errors
            console.error('Admin login failed:', error.message);

            // Clear any existing admin tokens
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            // Reset admin auth queries
            queryClient.setQueryData(adminAuthQueryKeys.profile(), null);
            queryClient.setQueryData(adminAuthQueryKeys.isAuthenticated(), false);
        },
    });
};

// Hook for admin logout
export const useAdminLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<void> => {
            return AdminAuthService.logout();
        },
        onSuccess: () => {
            // Clear local storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            // Reset all admin auth queries
            queryClient.setQueryData(adminAuthQueryKeys.profile(), null);
            queryClient.setQueryData(adminAuthQueryKeys.isAuthenticated(), false);

            // Remove all admin auth queries from cache
            queryClient.removeQueries({ queryKey: adminAuthQueryKeys.all });
        },
        onError: (error: AdminAuthError) => {
            // Even if logout API fails, clear local data
            console.warn('Admin logout API failed, but clearing local data:', error.message);

            // Clear local storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            // Reset all admin auth queries
            queryClient.setQueryData(adminAuthQueryKeys.profile(), null);
            queryClient.setQueryData(adminAuthQueryKeys.isAuthenticated(), false);

            // Remove all admin auth queries from cache
            queryClient.removeQueries({ queryKey: adminAuthQueryKeys.all });
        },
    });
};

// Hook for admin profile update
export const useAdminUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<AdminProfileResponse['data']>): Promise<AdminProfileResponse> => {
            return AdminAuthService.updateProfile(data);
        },
        onSuccess: (data: AdminProfileResponse) => {
            // Update profile in cache
            queryClient.setQueryData(adminAuthQueryKeys.profile(), data);

            // Update user in localStorage
            const currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
            const updatedUser = { ...currentUser, ...data.data };
            localStorage.setItem('adminUser', JSON.stringify(updatedUser));
        },
        onError: (error: AdminAuthError) => {
            console.error('Admin profile update failed:', error.message);
        },
    });
};

// Hook for admin password change
export const useAdminChangePassword = () => {
    return useMutation({
        mutationFn: async (data: {
            currentPassword: string;
            newPassword: string;
            newPasswordConfirmation: string;
        }): Promise<{ status: boolean; message: string }> => {
            return AdminAuthService.changePassword(data);
        },
        onError: (error: AdminAuthError) => {
            console.error('Admin password change failed:', error.message);
        },
    });
};



// Simple hook to get current admin user from localStorage
export const useCurrentAdminUser = () => {
    const user = localStorage.getItem('adminUser')
        ? JSON.parse(localStorage.getItem('adminUser') || '{}')
        : null;

    const token = localStorage.getItem('adminToken');
    const isAuthenticated = !!(user && token);

    return {
        user,
        isLoading: false,
        error: null,
        isAuthenticated,
    };
};

// Hook for role-based access control
export const useAdminRoleAccess = (requiredRoles: AdminRole[]) => {
    const { user } = useCurrentAdminUser();

    const hasAccess = user?.roles?.some((userRole: { name: string }) =>
        requiredRoles.includes(userRole.name as AdminRole)
    ) || false;

    return {
        hasAccess,
        user,
        requiredRoles,
    };
};
