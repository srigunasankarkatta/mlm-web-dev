import { defaultApiService } from './api-service-factory';

// Top Earners Types
export interface TopEarnerPackage {
    id: number;
    name: string;
    level: number;
}

export interface TopEarner {
    id: number;
    name: string;
    package: TopEarnerPackage;
    total_earnings: string;
    total_earnings_raw: number;
    directs_count: number;
    rank: number;
}

export interface TopEarnersResponse {
    success: boolean;
    message: string;
    data: {
        top_earners: TopEarner[];
        period: string;
        total_count: number;
        showing: number;
    };
}

export interface TopEarnersParams {
    limit?: number;
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Top Earners Service
class TopEarnersService {
    private readonly baseUrl = '/top-earners';

    /**
     * Get top earners
     */
    async getTopEarners(params?: TopEarnersParams): Promise<TopEarnersResponse> {
        const queryParams = new URLSearchParams();

        if (params?.limit) {
            queryParams.append('limit', params.limit.toString());
        }

        if (params?.period) {
            queryParams.append('period', params.period);
        }

        const url = queryParams.toString()
            ? `${this.baseUrl}?${queryParams.toString()}`
            : this.baseUrl;

        const response = await defaultApiService.get<TopEarnersResponse>(url);
        return response.data;
    }
}

export default new TopEarnersService();
