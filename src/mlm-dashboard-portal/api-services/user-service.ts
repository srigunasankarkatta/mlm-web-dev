import { defaultApiService } from './api-service-factory';

// Types for User API
export interface User {
    id: number;
    name: string;
    email: string;
    referral_code: string;
    sponsor_id: number | null;
    current_package_id: number;
    is_active: boolean;
    created_at: string;
    current_package: {
        id: number;
        name: string;
        price: number;
    };
    wallet: {
        id: number;
        balance: number;
        currency: string;
    };
    sponsor: User | null;
    referrals_count: number;
    commissions_count: number;
    transactions_count: number;
}

export interface UsersListParams {
    search?: string;
    package_id?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

export interface UsersListResponse {
    success: boolean;
    message: string;
    data: User[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    referral_code?: string;
    sponsor_id?: number;
    current_package_id: number;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    is_active?: boolean;
    current_package_id?: number;
}

export interface CreateUserResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface UpdateUserResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface DeleteUserResponse {
    success: boolean;
    message: string;
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
        if (params.sort_by) queryParams.append('sort_by', params.sort_by);
        if (params.sort_order) queryParams.append('sort_order', params.sort_order);
        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.page) queryParams.append('page', params.page.toString());

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<UsersListResponse>(url);
        return response.data;
    }

    /**
     * Get user by ID
     */
    async getUserById(id: number): Promise<User> {
        const response = await defaultApiService.get<User>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Create new user
     */
    async createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
        const response = await defaultApiService.post<CreateUserResponse>(this.baseUrl, userData);
        return response.data;
    }

    /**
     * Update user
     */
    async updateUser(id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> {
        const response = await defaultApiService.put<UpdateUserResponse>(`${this.baseUrl}/${id}`, userData);
        return response.data;
    }

    /**
     * Delete user
     */
    async deleteUser(id: number): Promise<DeleteUserResponse> {
        const response = await defaultApiService.delete<DeleteUserResponse>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Activate/Deactivate user
     */
    async toggleUserStatus(id: number, isActive: boolean): Promise<UpdateUserResponse> {
        const response = await defaultApiService.patch<UpdateUserResponse>(`${this.baseUrl}/${id}/status`, {
            is_active: isActive
        });
        return response.data;
    }

    /**
     * Get user statistics
     */
    async getUserStats(): Promise<{
        total_users: number;
        active_users: number;
        inactive_users: number;
        new_users_today: number;
        new_users_this_week: number;
        new_users_this_month: number;
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/stats`);
        return response.data;
    }
}

export const userService = new UserService();
export default userService;
