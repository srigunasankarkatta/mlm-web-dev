import { defaultApiService } from './api-service-factory';

// Types for User API
export interface User {
    id: number;
    name: string;
    email: string;
    referral_code: string;
    sponsor: {
        id: number;
        name: string;
    } | null;
    package: {
        id: number;
        name: string;
        price: string;
    } | null;
    directs_count: number;
    total_income: string;
    roles: string[];
    created_at: string;
    updated_at: string;
}

export interface UsersListParams {
    search?: string;
    package_id?: number;
    role?: string;
    per_page?: number;
    page?: number;
}

export interface UsersListResponse {
    status: boolean;
    message: string;
    data: {
        users: User[];
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            has_more_pages: boolean;
        };
    };
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    sponsor_id?: number;
    package_id?: number;
    roles: string[];
}

export interface EditUserRequest {
    name: string;
    email: string;
    password?: string;
    sponsor_id?: number;
    package_id?: number;
    roles: string[];
}

export interface UpdateUserRequest {
    name?: string;
    package_id?: number;
    roles?: string[];
}

export interface FullUpdateUserRequest {
    name: string;
    email: string;
    password?: string;
    sponsor_id?: number;
    package_id?: number;
    roles: string[];
}

export interface CreateUserResponse {
    status: boolean;
    message: string;
    data: User;
}

export interface UpdateUserResponse {
    status: boolean;
    message: string;
    data: User;
}

export interface DeleteUserResponse {
    status: boolean;
    message: string;
    data: null;
}

class UserService {
    private baseUrl = '/admin/users';

    /**
     * Get users list with pagination and filters
     */
    async getUsers(params: UsersListParams = {}): Promise<UsersListResponse> {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.package_id) queryParams.append('package_id', params.package_id.toString());
        if (params.role) queryParams.append('role', params.role);
        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.page) queryParams.append('page', params.page.toString());

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<UsersListResponse>(url);
        return response;
    }

    /**
     * Get user by ID
     */
    async getUserById(id: number): Promise<{ status: boolean; message: string; data: User }> {
        const response = await defaultApiService.get<{ status: boolean; message: string; data: User }>(`${this.baseUrl}/${id}`);
        return response;
    }

    /**
     * Create new user
     */
    async createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
        const response = await defaultApiService.post<CreateUserResponse>(this.baseUrl, userData);
        return response;
    }

    /**
     * Update user
     */
    async updateUser(id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> {
        const response = await defaultApiService.put<UpdateUserResponse>(`${this.baseUrl}/${id}`, userData);
        return response;
    }

    /**
     * Full update user (with all fields)
     */
    async fullUpdateUser(id: number, userData: FullUpdateUserRequest): Promise<CreateUserResponse> {
        const response = await defaultApiService.put<CreateUserResponse>(`${this.baseUrl}/${id}`, userData);
        return response;
    }

    /**
     * Delete user
     */
    async deleteUser(id: number): Promise<DeleteUserResponse> {
        const response = await defaultApiService.delete<DeleteUserResponse>(`${this.baseUrl}/${id}`);
        return response;
    }

    /**
     * Activate/Deactivate user
     */
    async toggleUserStatus(id: number, isActive: boolean): Promise<UpdateUserResponse> {
        const response = await defaultApiService.patch<UpdateUserResponse>(`${this.baseUrl}/${id}/status`, {
            is_active: isActive
        });
        return response;
    }

    /**
     * Get user statistics
     */
    async getUserStats(): Promise<{
        status: boolean;
        message: string;
        data: {
            total_users: number;
            admin_users: number;
            customer_users: number;
            users_with_packages: number;
            users_without_packages: number;
            package_distribution: Array<{
                package_id: number;
                package_name: string;
                count: number;
            }>;
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}-stats`);
        return response;
    }

    /**
     * Get user's MLM tree (Admin View)
     */
    async getUserTree(id: number, maxLevel?: number): Promise<{
        status: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            referral_code: string;
            package: string;
            level: number;
            directs_count: number;
            children: any[];
        };
    }> {
        const queryParams = new URLSearchParams();
        if (maxLevel) queryParams.append('max_level', maxLevel.toString());

        const url = `${this.baseUrl}/${id}/tree${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await defaultApiService.get(url);
        return response;
    }

    /**
     * Get user's income history (Admin View)
     */
    async getUserIncomes(id: number, perPage?: number): Promise<{
        status: boolean;
        message: string;
        data: {
            incomes: Array<{
                id: number;
                type: string;
                amount: string;
                remark: string;
                date: string;
                formatted_date: string;
                time: string;
            }>;
            pagination: {
                current_page: number;
                last_page: number;
                per_page: number;
                total: number;
                has_more_pages: boolean;
            };
        };
    }> {
        const queryParams = new URLSearchParams();
        if (perPage) queryParams.append('per_page', perPage.toString());

        const url = `${this.baseUrl}/${id}/incomes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await defaultApiService.get(url);
        return response;
    }
}

export const userService = new UserService();
export default userService;
