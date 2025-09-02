import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IncomeService, IncomeHistoryResponse, IncomeHistoryRequest } from '../api-services/income-service';

// Hook for fetching income history
export const useIncomeHistory = (
    params: IncomeHistoryRequest = {}
): UseQueryResult<IncomeHistoryResponse, Error> => {
    return useQuery({
        queryKey: ['incomeHistory', params],
        queryFn: () => IncomeService.getIncomeHistory(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });
};

// Hook for fetching income summary
export const useIncomeSummary = (): UseQueryResult<IncomeHistoryResponse['data']['summary'], Error> => {
    return useQuery({
        queryKey: ['incomeSummary'],
        queryFn: async () => {
            const response = await IncomeService.getIncomeHistory({ per_page: 1 });
            return response.data.summary;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });
};

// Hook for fetching income by type
export const useIncomeByType = (
    type: string,
    params: IncomeHistoryRequest = {}
): UseQueryResult<IncomeHistoryResponse, Error> => {
    return useQuery({
        queryKey: ['incomeByType', type, params],
        queryFn: () => IncomeService.getIncomeByType(type, params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: !!type, // Only run if type is provided
    });
};

// Hook for fetching income by date range
export const useIncomeByDateRange = (
    dateFrom: string,
    dateTo: string,
    params: IncomeHistoryRequest = {}
): UseQueryResult<IncomeHistoryResponse, Error> => {
    return useQuery({
        queryKey: ['incomeByDateRange', dateFrom, dateTo, params],
        queryFn: () => IncomeService.getIncomeByDateRange(dateFrom, dateTo, params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: !!(dateFrom && dateTo), // Only run if both dates are provided
    });
};

export default useIncomeHistory;
