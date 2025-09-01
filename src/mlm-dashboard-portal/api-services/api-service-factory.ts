import apiService from '../../app/api-client';
import { getBaseURL, getAdminBaseURL } from './api-config';

// Create default API service instance
export const defaultApiService = apiService(getBaseURL());

// Create API service with custom base URL
export const createApiService = (baseURL: string) => apiService(baseURL);

// Create API service for specific modules
export const authApiService = apiService(getBaseURL());
export const usersApiService = apiService(getBaseURL());
export const dashboardApiService = apiService(getBaseURL());
export const uploadsApiService = apiService(getBaseURL());
export const mlmApiService = apiService(getBaseURL());

// Create admin API service instance
export const adminApiService = apiService(getAdminBaseURL());

// Export the factory function
export { apiService };

// Export default instance
export default defaultApiService;
