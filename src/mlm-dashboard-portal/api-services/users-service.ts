import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for user requests/responses
export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
    role: string;
    status?: 'active' | 'inactive';
}

export interface UpdateUserRequest {
    email?: string;
    name?: string;
    role?: string;
    status?: 'active' | 'inactive' | 'suspended';
}

export interface UsersListResponse {
    success: boolean;
    data: {
        users: User[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
}

export interface UserResponse {
    success: boolean;
    data: User;
}

export interface BulkDeleteRequest {
    userIds: number[];
}

// Users service class
export class UsersService {
    // Get users list with pagination
    static async getUsers(
        page: number = 1,
        limit: number = 10,
        search?: string,
        filters?: Record<string, any>
    ): Promise<UsersListResponse> {
        const params = {
            page,
            limit,
            ...(search && { search }),
            ...filters,
        };

        return defaultApiService.get<UsersListResponse>(
            API_CONFIG.endpoints.users.list,
            params
        );
    }

    // Get single user by ID
    static async getUser(id: number | string): Promise<UserResponse> {
        return defaultApiService.get<UserResponse>(
            API_CONFIG.endpoints.users.show(id)
        );
    }

    // Create new user
    static async createUser(userData: CreateUserRequest): Promise<UserResponse> {
        return defaultApiService.post<UserResponse>(
            API_CONFIG.endpoints.users.create,
            userData
        );
    }

    // Update user
    static async updateUser(
        id: number | string,
        userData: UpdateUserRequest
    ): Promise<UserResponse> {
        return defaultApiService.put<UserResponse>(
            API_CONFIG.endpoints.users.update(id),
            userData
        );
    }

    // Delete user
    static async deleteUser(id: number | string): Promise<{ message: string }> {
        return defaultApiService.delete<{ message: string }>(
            API_CONFIG.endpoints.users.delete(id)
        );
    }

    // Bulk delete users
    static async bulkDeleteUsers(userIds: number[]): Promise<{ message: string }> {
        return defaultApiService.post<{ message: string }>(
            API_CONFIG.endpoints.users.bulkDelete,
            { userIds }
        );
    }

    // Upload user avatar
    static async uploadAvatar(
        userId: number | string,
        file: File
    ): Promise<{ message: string; avatarUrl: string }> {
        return defaultApiService.uploadFile(
            `/users/${userId}/avatar`,
            file,
            'avatar'
        );
    }

    // Get users with custom transformer (example)
    static async getUsersRaw(): Promise<any> {
        // Using raw axios method for custom response handling
        const response = await defaultApiService.raw.get('/users');
        return response.data;
    }
}

export default UsersService;
