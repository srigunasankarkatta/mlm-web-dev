import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for Package API
export interface MLMPackage {
    id: string;
    code: string;
    name: string;
    price: number;
    rank: number;
    description: string;
    features: string[];
    isActive: boolean;
    isRequired: boolean;
    maxLevel: number;
    directCommission: number;
    levelCommissions: Array<{
        level: number;
        percentage: number;
    }>;
    clubCommission: number;
    autoPoolCommission: number;
    createdAt: string;
    updatedAt: string;
}

export interface PackageDetail extends MLMPackage {
    eligibility: {
        minRank: number;
        requiredPackages: string[];
        maxPurchase: number;
    };
    benefits: {
        directReferrals: number;
        levelDepth: number;
        clubMembers: number;
        autoPoolLevels: number;
    };
}

export interface PackagesListParams {
    search?: string;
    rank?: number;
    isActive?: boolean;
    isRequired?: boolean;
    perPage?: number;
    page?: number;
}

export interface PackagesListResponse {
    success: boolean;
    message: string;
    data: MLMPackage[];
    pagination: {
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

export interface ApiPackage {
    id: number;
    name: string;
    price: string;
    level_unlock: number;
}

export interface ApiPackagesResponse {
    status: boolean;
    message: string;
    data: ApiPackage[];
}

export interface ApiPackagesErrorResponse {
    status: false;
    message: string;
    errors: null;
}

export interface PurchasePackageRequest {
    package_id: number;
}

export interface PurchasePackageResponse {
    status: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            package_id: number;
        };
        package: {
            id: number;
            name: string;
            price: string;
            level_unlock: number;
        };
    };
}

export interface PurchasePackageErrorResponse {
    status: false;
    message: string;
    errors?: {
        package_id?: string[];
    } | null;
}

export interface UserPackagesResponse {
    success: boolean;
    message: string;
    data: Array<{
        id: string;
        package: MLMPackage;
        purchaseDate: string;
        status: 'active' | 'inactive' | 'expired';
        totalEarnings: number;
        directReferrals: number;
        networkSize: number;
    }>;
}

export interface UpgradePackageRequest {
    fromPackageId: string;
    toPackageId: string;
    paymentMethod: 'razorpay' | 'cashfree' | 'bank_transfer';
    termsAccepted: boolean;
}

export interface UpgradePackageResponse {
    success: boolean;
    message: string;
    data: {
        orderId: string;
        paymentUrl?: string;
        upgradeDetails: {
            fromPackage: MLMPackage;
            toPackage: MLMPackage;
            upgradeFee: number;
            currency: string;
        };
    };
}

export interface PackageComparisonResponse {
    success: boolean;
    message: string;
    data: {
        packages: MLMPackage[];
        comparison: {
            features: string[];
            pricing: Array<{
                packageId: string;
                price: number;
                value: number;
            }>;
            commissions: Array<{
                packageId: string;
                direct: number;
                level: number;
                club: number;
                autoPool: number;
            }>;
        };
    };
}

class CustomerPackageService {
    private baseUrl = '/packages';

    /**
     * Get available packages from the new API endpoint
     */
    async getApiPackages(): Promise<ApiPackagesResponse> {
        const response = await defaultApiService.get<ApiPackagesResponse>('/packages');
        return response.data;
    }

    /**
     * Get available packages list with pagination and filters
     */
    async getPackages(params: PackagesListParams = {}): Promise<PackagesListResponse> {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.rank) queryParams.append('rank', params.rank.toString());
        if (params.isActive !== undefined) queryParams.append('is_active', params.isActive.toString());
        if (params.isRequired !== undefined) queryParams.append('is_required', params.isRequired.toString());
        if (params.perPage) queryParams.append('per_page', params.perPage.toString());
        if (params.page) queryParams.append('page', params.page.toString());

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<PackagesListResponse>(url);
        return response.data;
    }

    /**
     * Get package by ID with detailed information
     */
    async getPackageById(id: string): Promise<PackageDetail> {
        const response = await defaultApiService.get<PackageDetail>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Purchase a package
     */
    async purchasePackage(packageData: PurchasePackageRequest): Promise<PurchasePackageResponse> {
        const response = await defaultApiService.post<PurchasePackageResponse>(
            '/purchase-package',
            packageData
        );
        return response.data;
    }

    /**
     * Get user's purchased packages
     */
    async getUserPackages(): Promise<UserPackagesResponse> {
        const response = await defaultApiService.get<UserPackagesResponse>(
            API_CONFIG.endpoints.packages.userPackages
        );
        return response.data;
    }

    /**
     * Upgrade to a higher package
     */
    async upgradePackage(upgradeData: UpgradePackageRequest): Promise<UpgradePackageResponse> {
        const response = await defaultApiService.post<UpgradePackageResponse>(
            API_CONFIG.endpoints.packages.upgrade(upgradeData.toPackageId),
            upgradeData
        );
        return response.data;
    }

    /**
     * Compare packages
     */
    async comparePackages(packageIds: string[]): Promise<PackageComparisonResponse> {
        const response = await defaultApiService.post<PackageComparisonResponse>(
            `${this.baseUrl}/compare`,
            { packageIds }
        );
        return response.data;
    }

    /**
     * Get package recommendations based on user's current level
     */
    async getPackageRecommendations(): Promise<{
        success: boolean;
        message: string;
        data: {
            currentLevel: number;
            recommendations: MLMPackage[];
            nextSteps: string[];
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/recommendations`);
        return response.data;
    }

    /**
     * Get package statistics for user
     */
    async getPackageStats(): Promise<{
        success: boolean;
        message: string;
        data: {
            totalPackages: number;
            activePackages: number;
            totalInvestment: number;
            totalEarnings: number;
            networkSize: number;
            directReferrals: number;
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/stats`);
        return response.data;
    }

    /**
     * Verify package eligibility
     */
    async verifyEligibility(packageId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            eligible: boolean;
            requirements: string[];
            missingRequirements: string[];
            upgradePath?: string[];
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/${packageId}/eligibility`);
        return response.data;
    }

    /**
     * Get payment methods for package purchase
     */
    async getPaymentMethods(packageId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            methods: Array<{
                id: string;
                name: string;
                type: 'razorpay' | 'cashfree' | 'bank_transfer';
                isActive: boolean;
                processingFee: number;
                processingTime: string;
            }>;
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/${packageId}/payment-methods`);
        return response.data;
    }
}

export const customerPackageService = new CustomerPackageService();
export default customerPackageService;
