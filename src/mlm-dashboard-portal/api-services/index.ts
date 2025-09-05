// Core API client
export { default as apiService } from '../../app/api-client';
export { default as defaultApiService, createApiService } from './api-service-factory';

// Service instances
export {
    authApiService,
    usersApiService,
    dashboardApiService,
    uploadsApiService,
    mlmApiService,
    adminApiService
} from './api-service-factory';

// Service classes
export { default as AuthService } from './auth-service';
export { default as AdminAuthService } from './admin-auth-service';
export { default as UsersService } from './users-service';
export { default as MLMService } from './mlm-service';
export { default as DashboardService, dashboardService } from './dashboard-service';

// Configuration
export { API_CONFIG, getBaseURL, buildApiUrl } from './api-config';

// Types
export type {
    ValidationErrorResponse,
    ApiError,
    ApiResponse
} from '../../types/error-response';

// Re-export commonly used types
export type {
    LoginRequest,
    LoginResponse,
    User,
    CreateUserRequest
} from './auth-service';

export type {
    MLMMember,
    GenealogyNode,
    Commission,
    Product,
    Order,
    OrderItem
} from './mlm-service';
