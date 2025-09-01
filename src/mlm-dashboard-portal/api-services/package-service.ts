import { defaultApiService } from './api-service-factory';

// Types for Package API
export interface Package {
    id: number;
    code: string;
    name: string;
    price: string;
    rank: number;
    is_active: boolean;
    created_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface PackageDetail extends Package {
    creator: {
        id: number;
        name: string;
        email: string;
    };
    users: Array<{
        id: number;
        name: string;
        email: string;
        referral_code: string;
    }>;
    commissions: Array<{
        id: number;
        amount: string;
        type: string;
        created_at: string;
    }>;
}

export interface PackagesListParams {
    search?: string;
    rank?: number;
    is_active?: boolean;
    per_page?: number;
    page?: number;
}

export interface PackagesListResponse {
    success: boolean;
    message: string;
    data: Package[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface CreatePackageRequest {
    code: string;
    name: string;
    price: string;
    rank: number;
    is_active?: boolean;
}

export interface UpdatePackageRequest {
    code?: string;
    name?: string;
    price?: string;
    rank?: number;
    is_active?: boolean;
}

export interface CreatePackageResponse {
    success: boolean;
    message: string;
    data: Package;
}

export interface UpdatePackageResponse {
    success: boolean;
    message: string;
    data: Package;
}

export interface DeletePackageResponse {
    success: boolean;
    message: string;
}

class PackageService {
    private baseUrl = '/admin/packages';

    /**
     * Get packages list with pagination and filters
     */
    async getPackages(params: PackagesListParams = {}): Promise<PackagesListResponse> {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.rank) queryParams.append('rank', params.rank.toString());
        if (params.is_active !== undefined) queryParams.append('is_active', params.is_active.toString());
        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.page) queryParams.append('page', params.page.toString());

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<PackagesListResponse>(url);
        return response.data;
    }

    /**
     * Get package by ID
     */
    async getPackageById(id: number): Promise<PackageDetail> {
        const response = await defaultApiService.get<PackageDetail>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Create new package
     */
    async createPackage(packageData: CreatePackageRequest): Promise<CreatePackageResponse> {
        const response = await defaultApiService.post<CreatePackageResponse>(this.baseUrl, packageData);
        return response.data;
    }

    /**
     * Update package
     */
    async updatePackage(id: number, packageData: UpdatePackageRequest): Promise<UpdatePackageResponse> {
        const response = await defaultApiService.put<UpdatePackageResponse>(`${this.baseUrl}/${id}`, packageData);
        return response.data;
    }

    /**
     * Delete package
     */
    async deletePackage(id: number): Promise<DeletePackageResponse> {
        const response = await defaultApiService.delete<DeletePackageResponse>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Toggle package status
     */
    async togglePackageStatus(id: number, isActive: boolean): Promise<UpdatePackageResponse> {
        const response = await defaultApiService.patch<UpdatePackageResponse>(`${this.baseUrl}/${id}/status`, {
            is_active: isActive
        });
        return response.data;
    }

    /**
     * Get package statistics
     */
    async getPackageStats(): Promise<{
        total_packages: number;
        active_packages: number;
        inactive_packages: number;
        total_users: number;
        total_revenue: string;
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/stats`);
        return response.data;
    }
}

export const packageService = new PackageService();
export default packageService;
