import { useQuery } from '@tanstack/react-query';
import TopEarnersService, { type TopEarnersParams } from '../api-services/top-earners-service';

// Query Keys
export const TOP_EARNERS_QUERY_KEYS = {
    topEarners: (params?: TopEarnersParams) => ['top-earners', params] as const,
};

// Top Earners Hook
export const useTopEarners = (params?: TopEarnersParams) => {
    return useQuery({
        queryKey: TOP_EARNERS_QUERY_KEYS.topEarners(params),
        queryFn: () => TopEarnersService.getTopEarners(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });
};
