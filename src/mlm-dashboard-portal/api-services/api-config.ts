// API Configuration for MLM Dashboard Portal
export const API_CONFIG = {
    // Base URLs for different environments
    baseURL: {
        development: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
        staging: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.mlmportal.com/api',
        production: import.meta.env.VITE_API_BASE_URL || 'https://api.mlmportal.com/api',
    },

    // Admin API Base URL
    adminBaseURL: import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://127.0.0.1:8000/api',

    // API endpoints
    endpoints: {
        auth: {
            login: '/admin/login',
            logout: '/admin/logout',
            refresh: '/admin/refresh',
            forgotPassword: '/admin/forgot-password',
            resetPassword: '/admin/reset-password',
            profile: '/admin/profile',
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
        mlm: {
            members: '/mlm/members',
            genealogy: '/mlm/genealogy',
            commissions: '/mlm/commissions',
            products: '/mlm/products',
            orders: '/mlm/orders',
        },
    },

    // Request timeouts
    timeout: {
        default: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'), // 30 seconds
        upload: parseInt(import.meta.env.VITE_API_UPLOAD_TIMEOUT || '60000'),  // 60 seconds for file uploads
        download: 120000, // 2 minutes for file downloads
    },

    // Retry configuration
    retry: {
        maxRetries: 3,
        retryDelay: 1000, // 1 second
    },

    // App configuration
    app: {
        name: import.meta.env.VITE_APP_NAME || 'Quadra Core MLM Portal',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
    },

    // Feature flags
    features: {
        debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
        logging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
        analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
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

// Get admin base URL
export const getAdminBaseURL = (): string => {
    return API_CONFIG.adminBaseURL;
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    const baseURL = getBaseURL();
    return `${baseURL}${endpoint}`;
};

// Helper function to build full admin API URLs
export const buildAdminApiUrl = (endpoint: string): string => {
    const adminBaseURL = getAdminBaseURL();
    return `${adminBaseURL}${endpoint}`;
};
