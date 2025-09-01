// Admin Authentication types for React Query hooks

export interface AdminLoginCredentials {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            referral_code: string;
            roles: string[]; // Array of roles for admin users
        };
        token: string; // No refreshToken in admin response
    };
}

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    referral_code: string;
    roles: string[];
    avatar?: string;
    status?: 'active' | 'inactive' | 'suspended';
    createdAt?: string;
    updatedAt?: string;
}

export interface AdminProfileResponse {
    success: boolean;
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
export type AdminRole =
    | 'super_admin'
    | 'admin'
    | 'manager'
    | 'support'
    | 'viewer';

// Helper function to check if user has specific role
export const hasRole = (user: AdminUser | null, role: AdminRole): boolean => {
    return user?.roles?.includes(role) || false;
};

// Helper function to check if user has any of the specified roles
export const hasAnyRole = (user: AdminUser | null, roles: AdminRole[]): boolean => {
    return user?.roles?.some(userRole => roles.includes(userRole as AdminRole)) || false;
};

// Helper function to check if user has all of the specified roles
export const hasAllRoles = (user: AdminUser | null, roles: AdminRole[]): boolean => {
    return user?.roles?.every(userRole => roles.includes(userRole as AdminRole)) || false;
};

// Helper function to get default route based on user role
export const getDefaultRouteByRole = (user: AdminUser | null): string => {
    if (!user || !user.roles || user.roles.length === 0) {
        return '/dashboard'; // Default fallback
    }

    const primaryRole = user.roles[0]; // Get the first/primary role

    switch (primaryRole) {
        case 'super_admin':
            return '/dashboard';
        case 'admin':
            return '/users/all';
        case 'manager':
            return '/team';
        case 'support':
            return '/support';
        case 'viewer':
            return '/dashboard';
        default:
            return '/dashboard';
    }
};
