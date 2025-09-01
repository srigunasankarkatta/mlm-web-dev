import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './api-config';

// Create axios instance with default configuration
const createApiService = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: API_CONFIG.timeout.default,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    // Request interceptor to add auth token
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle common errors
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // Handle 401 Unauthorized - try to refresh token
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const response = await instance.post('/auth/refresh', {
                            refreshToken,
                        });

                        const { token } = response.data.data;
                        localStorage.setItem('token', token);

                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return instance(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed, clear tokens and redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    
                    // Redirect to login page
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

// Create default API service for customer portal
export const defaultApiService = createApiService(API_CONFIG.customerBaseURL);

// Create general API service for main API endpoints
export const generalApiService = createApiService(API_CONFIG.baseURL.development);

// Export the factory function for creating custom services
export const createCustomApiService = (baseURL: string): AxiosInstance => {
    return createApiService(baseURL);
};

// Export axios for direct use if needed
export { axios };
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
