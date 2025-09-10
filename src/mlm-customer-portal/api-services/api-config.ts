// API Configuration for MLM Customer Portal
export const API_CONFIG = {
    // Base URLs for different environments
    baseURL: {
        development: import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.16:8000/api/v1',
        staging: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.mlmportal.com/api/v1',
        production: import.meta.env.VITE_API_BASE_URL || 'https://api.mlmportal.com/api/v1',
    },

    // Customer API Base URL
    customerBaseURL: import.meta.env.VITE_CUSTOMER_API_BASE_URL || 'http://192.168.1.16:8000/api',

    // API endpoints
    endpoints: {
        auth: {
            login: '/customer/login',
            register: '/customer/register',
            logout: '/customer/logout',
            refresh: '/customer/refresh',
            forgotPassword: '/customer/forgot-password',
            resetPassword: '/customer/reset-password',
            profile: '/customer/profile',
            verifyOtp: '/customer/verify-otp',
            resendOtp: '/customer/resend-otp',
        },
        user: {
            profile: '/me',
            team: '/my-tree',
            updateProfile: '/profile/update',
            incomeHistory: '/income-history',
        },
        packages: {
            list: '/packages',
            details: (id: string | number) => `/packages/${id}`,
            purchase: '/packages/purchase',
            userPackages: '/packages/user',
            upgrade: (id: string | number) => `/packages/${id}/upgrade`,
        },
        dashboard: {
            stats: '/dashboard/stats',
            income: '/dashboard/income',
            network: '/dashboard/network',
            recentActivity: '/dashboard/recent-activity',
        },
        profile: {
            update: '/profile/update',
            changePassword: '/profile/change-password',
            uploadAvatar: '/profile/upload-avatar',
        },
        wallet: {
            balance: '/wallet/balance',
            transactions: '/wallet/transactions',
            withdraw: '/wallet/withdraw',
            deposit: '/wallet/deposit',
        },
        mlm: {
            genealogy: '/mlm/genealogy',
            referrals: '/mlm/referrals',
            commissions: '/mlm/commissions',
            network: '/mlm/network',
        },
        transactions: {
            list: '/transactions',
            package: (packageId: string | number) => `/transactions/package/${packageId}`,
            details: (id: string | number) => `/transactions/${id}`,
            summary: '/transactions/summary',
            export: '/transactions/export',
            types: '/transactions/types',
            paymentMethods: '/transactions/payment-methods',
            statuses: '/transactions/statuses',
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
        name: import.meta.env.VITE_APP_NAME || 'MLM Customer Portal',
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

// Get customer base URL
export const getCustomerBaseURL = (): string => {
    return API_CONFIG.customerBaseURL;
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    const baseURL = getBaseURL();
    return `${baseURL}${endpoint}`;
};

// Helper function to build full customer API URLs
export const buildCustomerApiUrl = (endpoint: string): string => {
    const baseURL = getCustomerBaseURL();
    return `${baseURL}${endpoint}`;
};
