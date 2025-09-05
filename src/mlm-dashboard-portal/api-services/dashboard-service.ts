import { apiService } from './api-service-factory';
import { API_CONFIG, getAdminBaseURL } from './api-config';

// Dashboard API Response Types
export interface DashboardOverview {
    total_users: number;
    total_packages: number;
    total_income_distributed: string;
    active_users: number;
    inactive_users: number;
    today: {
        new_users: number;
        income_distributed: string;
    };
    this_month: {
        new_users: number;
        income_distributed: string;
    };
}

export interface UserAnalytics {
    by_role: any[];
    by_package: Array<{
        package_id: number;
        package_name: string;
        count: number;
    }>;
    without_package: number;
    registration_trend: Array<{
        date: string;
        count: number;
    }>;
}

export interface PackageAnalytics {
    package_usage: Array<{
        id: number;
        name: string;
        price: string;
        level_unlock: number;
        users_count: number;
        revenue: string;
    }>;
    total_revenue: string;
}

export interface IncomeAnalytics {
    by_type: Array<{
        type: string;
        count: number;
        total: string;
    }>;
    trend: Array<{
        date: string;
        amount: string;
    }>;
    top_earners: Array<{
        id: number;
        name: string;
        email: string;
        total_income: string;
        package: string;
    }>;
}

export interface RecentActivities {
    recent_users: Array<{
        id: number;
        name: string;
        email: string;
        package: string;
        sponsor: string;
        created_at: string;
    }>;
    recent_incomes: Array<{
        id: number;
        user_name: string;
        type: string;
        amount: string;
        remark: string;
        created_at: string;
    }>;
}

export interface MLMTreeStats {
    root_users: number;
    users_with_directs: number;
    average_directs: string;
    tree_depth: {
        max_depth: number;
        average_depth: string;
    };
    top_performers: Array<{
        id: number;
        name: string;
        email: string;
        directs_count: number;
        package: string;
    }>;
}

export interface GrowthMetrics {
    user_growth: {
        this_month: number;
        last_month: number;
        growth_rate: string;
    };
    income_growth: {
        this_month: string;
        last_month: string;
        growth_rate: string;
    };
}

export interface DashboardData {
    overview: DashboardOverview;
    user_analytics: UserAnalytics;
    package_analytics: PackageAnalytics;
    income_analytics: IncomeAnalytics;
    recent_activities: RecentActivities;
    mlm_tree_stats: MLMTreeStats;
    growth_metrics: GrowthMetrics;
}

export interface DashboardResponse {
    status: boolean;
    message: string;
    data: DashboardData;
}

// Dashboard Service
class DashboardService {
    private api = apiService(getAdminBaseURL());

    /**
     * Get dashboard overview data
     */
    async getDashboardData(): Promise<DashboardResponse> {
        const response = await this.api.get<DashboardResponse>(API_CONFIG.endpoints.dashboard.overview);
        return response;
    }
}

// Export singleton instance
export const dashboardService = new DashboardService();
export default dashboardService;
