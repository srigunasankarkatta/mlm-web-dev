import { useAuth } from '../../contexts/AuthContext';

export const performLogout = (): void => {
    try {
        // Clear any stored tokens
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');

        // Clear any other auth-related data
        localStorage.removeItem('user');
        localStorage.removeItem('authState');

        // Reset auth context if available
        // Note: This will be handled by the context when the component unmounts
        // or when the page redirects

        console.log('Logout completed successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

// Alternative logout function that can be used outside of React components
export const performLogoutExternal = (): void => {
    performLogout();

    // Force redirect to login page
    if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
    }
};
