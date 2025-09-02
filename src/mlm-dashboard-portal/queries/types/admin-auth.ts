// Admin Authentication types for React Query hooks

export interface AdminLoginCredentials {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    status: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
            password: string;
            remember_token: string | null;
            created_at: string;
            updated_at: string;
            sponsor_id: number | null;
            package_id: number | null;
            roles: Array<{
                id: number;
                name: string;
                guard_name: string;
                created_at: string;
                updated_at: string;
                pivot: {
                    model_type: string;
                    model_id: number;
                    role_id: number;
                };
            }>;
        };
    };
}

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    sponsor_id: number | null;
    package_id: number | null;
    roles: Array<{
        id: number;
        name: string;
        guard_name: string;
        created_at: string;
        updated_at: string;
        pivot: {
            model_type: string;
            model_id: number;
            role_id: number;
        };
    }>;
    avatar?: string;
    status?: 'active' | 'inactive' | 'suspended';
}

export interface AdminProfileResponse {
    status: boolean;
    data: AdminUser;
    message?: string;
}

export interface AdminAuthState {
    isAuthenticated: boolean;
    user: AdminUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface AdminAuthError {
    type: 'validation' | 'network' | 'server' | 'unauthorized';
    message: string;
    fieldErrors?: Record<string, string>;
    statusCode?: number;
}

// Admin role types
export type AdminRole = 'admin' | 'super_admin' | 'manager' | 'support' | 'viewer';

// Helper function to check if user has specific role
export const hasRole = (user: AdminUser | null, role: AdminRole): boolean => {
    return user?.roles?.some(userRole => userRole.name === role) || false;
};

// Helper function to check if user has any of the specified roles
export const hasAnyRole = (user: AdminUser | null, roles: AdminRole[]): boolean => {
    return user?.roles?.some(userRole => roles.includes(userRole.name as AdminRole)) || false;
};

// Helper function to check if user has all of the specified roles
export const hasAllRoles = (user: AdminUser | null, roles: AdminRole[]): boolean => {
    return roles.every(role => hasRole(user, role));
};

// Helper function to get default route based on user role
export const getDefaultRouteByRole = (user: AdminUser | null): string => {
    if (!user || !user.roles || user.roles.length === 0) {
        return '/admin/dashboard'; // Default fallback
    }

    const primaryRole = user.roles[0]?.name; // Get the first/primary role

    switch (primaryRole) {
        case 'super_admin':
            return '/admin/dashboard';
        case 'admin':
            return '/admin/dashboard';
        case 'manager':
            return '/admin/team';
        case 'support':
            return '/admin/support';
        case 'viewer':
            return '/admin/dashboard';
        default:
            return '/admin/dashboard';
    }
};

// Helper function to get default route for admin users (simplified)
export const getDefaultRoute = (user: AdminUser | null): string => {
    return getDefaultRouteByRole(user);
};
