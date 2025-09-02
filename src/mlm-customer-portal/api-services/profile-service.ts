import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for profile requests/responses
export interface UserProfile {
    id: number;
    name: string;
    email: string;
    package?: {
        id: number;
        name: string;
        price: string;
        level_unlock: number;
    } | null;
}

export interface DirectUser {
    id: number;
    name: string;
    email: string;
    package?: {
        id: number;
        name: string;
        price: string;
        level_unlock: number;
    } | null;
}

export interface IncomeLog {
    type: string;
    amount: string;
    remark: string;
    date: string;
}

export interface UserProfileResponse {
    status: boolean;
    message: string;
    data: {
        user: UserProfile;
        directs: DirectUser[];
        total_income: string;
        incomes: IncomeLog[];
    };
}

export interface TeamTreeNode {
    id: number;
    name: string;
    email: string;
    referral_code?: string;
    package: string | null;
    level: number;
    children: TeamTreeNode[];
}

export interface TeamTreeResponse {
    status: boolean;
    message: string;
    data: TeamTreeNode;
}

// Profile service class
export class ProfileService {
    // Get user profile with directs and incomes
    static async getUserProfile(): Promise<UserProfileResponse> {
        const response = await defaultApiService.get<UserProfileResponse>(
            API_CONFIG.endpoints.user.profile
        );
        return response.data;
    }

    // Get user team tree (4x4 matrix up to 10 levels)
    static async getUserTeamTree(): Promise<TeamTreeResponse> {
        const response = await defaultApiService.get<TeamTreeResponse>(
            API_CONFIG.endpoints.user.team
        );
        return response.data;
    }

    // Update user profile
    static async updateProfile(data: Partial<UserProfile>): Promise<UserProfileResponse> {
        const response = await defaultApiService.put<UserProfileResponse>(
            API_CONFIG.endpoints.user.updateProfile,
            data
        );
        return response.data;
    }
}

export default ProfileService;
