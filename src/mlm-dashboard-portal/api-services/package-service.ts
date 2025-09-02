import { defaultApiService } from './api-service-factory';

// Types for Package API
export interface Package {
    id: number;
    name: string;
    price: string;
    level_unlock: number;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface PackageDetail extends Package {
    // Additional details can be added here if needed
}

export interface PackagesListParams {
    per_page?: number;
    page?: number;
}

export interface PackagesListResponse {
    status: boolean;
    message: string;
    data: {
        packages: Package[];
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            has_more_pages: boolean;
        };
    };
}

export interface CreatePackageRequest {
    name: string;
    price: number;
    level_unlock: number;
    description?: string;
}

export interface UpdatePackageRequest {
    name?: string;
    price?: number;
    level_unlock?: number;
    description?: string;
}

export interface CreatePackageResponse {
    status: boolean;
    message: string;
    data: Package;
}

export interface UpdatePackageResponse {
    status: boolean;
    message: string;
    data: Package;
}

export interface DeletePackageResponse {
    status: boolean;
    message: string;
    data: null;
}

export interface PackageStatsResponse {
    status: boolean;
    message: string;
    data: {
        total_packages: number;
        total_users_with_packages: number;
        package_usage: Array<{
            id: number;
            name: string;
            users_count: number;
        }>;
    };
}

class PackageService {
    private baseUrl = '/admin/packages';

    /**
     * Get packages list with pagination
     */
    async getPackages(params: PackagesListParams = {}): Promise<PackagesListResponse> {
        const queryParams = new URLSearchParams();

        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.page) queryParams.append('page', params.page.toString());

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<PackagesListResponse>(url);
        return response;
    }

    /**
     * Get package by ID
     */
    async getPackageById(id: number): Promise<{ status: boolean; message: string; data: Package }> {
        const response = await defaultApiService.get<{ status: boolean; message: string; data: Package }>(`${this.baseUrl}/${id}`);
        return response;
    }

    /**
     * Create new package
     */
    async createPackage(packageData: CreatePackageRequest): Promise<CreatePackageResponse> {
        const response = await defaultApiService.post<CreatePackageResponse>(this.baseUrl, packageData);
        return response;
    }

    /**
     * Update package
     */
    async updatePackage(id: number, packageData: UpdatePackageRequest): Promise<UpdatePackageResponse> {
        const response = await defaultApiService.put<UpdatePackageResponse>(`${this.baseUrl}/${id}`, packageData);
        return response;
    }

    /**
     * Delete package
     */
    async deletePackage(id: number): Promise<DeletePackageResponse> {
        const response = await defaultApiService.delete<DeletePackageResponse>(`${this.baseUrl}/${id}`);
        return response;
    }

    /**
     * Get package statistics
     */
    async getPackageStats(): Promise<PackageStatsResponse> {
        const response = await defaultApiService.get<PackageStatsResponse>('/admin/packages-stats');
        return response;
    }
}

export const packageService = new PackageService();
export default packageService;
