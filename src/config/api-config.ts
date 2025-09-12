// API Configuration
export const API_CONFIG = {
    // Base URLs for different environments
    baseURL: {
        development: 'https://trust.fylo.life/api',
        staging: 'https://staging-api.yourapp.com/api',
        production: 'https://api.yourapp.com/api',
    },

    // API endpoints
    endpoints: {
        auth: {
            login: '/auth/login',
            logout: '/auth/logout',
            refresh: '/auth/refresh',
            forgotPassword: '/auth/forgot-password',
            resetPassword: '/auth/reset-password',
            profile: '/auth/profile',
        },
        users: {
            list: '/users',
            create: '/users',
            update: (id: string | number) => `/users/${id}`,
            delete: (id: string | number) => `/users/${id}`,
            show: (id: string | number) => `/users/${id}`,
            bulkDelete: '/users/bulk-delete',
        },
        dashboard: {
            stats: '/dashboard/stats',
            recentActivity: '/dashboard/recent-activity',
            charts: '/dashboard/charts',
        },
        uploads: {
            profilePicture: '/uploads/profile-picture',
            documents: '/uploads/documents',
            images: '/uploads/images',
        },
    },

    // Request timeouts
    timeout: {
        default: 30000, // 30 seconds
        upload: 60000,  // 60 seconds for file uploads
        download: 120000, // 2 minutes for file downloads
    },

    // Retry configuration
    retry: {
        maxRetries: 3,
        retryDelay: 1000, // 1 second
    },
} as const;

// Get current environment
export const getCurrentEnvironment = (): keyof typeof API_CONFIG.baseURL => {
    const env = import.meta.env.MODE || 'development';
    return env as keyof typeof API_CONFIG.baseURL;
};

// Get base URL for current environment
export const getBaseURL = (): string => {
    const env = getCurrentEnvironment();
    return API_CONFIG.baseURL[env];
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    const baseURL = getBaseURL();
    return `${baseURL}${endpoint}`;
};
