import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api-services/dashboard-service';
import type { DashboardData } from '../api-services/dashboard-service';

/**
 * Hook to fetch dashboard data
 */
export const useDashboardData = () => {
    return useQuery<DashboardData>({
        queryKey: ['dashboard', 'overview'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch dashboard overview stats only
 */
export const useDashboardOverview = () => {
    return useQuery({
        queryKey: ['dashboard', 'overview'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.overview;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch user analytics
 */
export const useUserAnalytics = () => {
    return useQuery({
        queryKey: ['dashboard', 'user-analytics'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.user_analytics;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch package analytics
 */
export const usePackageAnalytics = () => {
    return useQuery({
        queryKey: ['dashboard', 'package-analytics'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.package_analytics;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch income analytics
 */
export const useIncomeAnalytics = () => {
    return useQuery({
        queryKey: ['dashboard', 'income-analytics'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.income_analytics;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch recent activities
 */
export const useRecentActivities = () => {
    return useQuery({
        queryKey: ['dashboard', 'recent-activities'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.recent_activities;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
        cacheTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 3,
    });
};

/**
 * Hook to fetch MLM tree stats
 */
export const useMLMTreeStats = () => {
    return useQuery({
        queryKey: ['dashboard', 'mlm-tree-stats'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.mlm_tree_stats;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};

/**
 * Hook to fetch growth metrics
 */
export const useGrowthMetrics = () => {
    return useQuery({
        queryKey: ['dashboard', 'growth-metrics'],
        queryFn: async () => {
            const response = await dashboardService.getDashboardData();
            return response.data.growth_metrics;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
    });
};



