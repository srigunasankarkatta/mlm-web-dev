import { useQuery } from '@tanstack/react-query';
import { customerPackageService, ApiPackagesResponse } from '../api-services/package-service';

// Query keys for API packages
export const apiPackagesKeys = {
    all: ['apiPackages'] as const,
    lists: () => [...apiPackagesKeys.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...apiPackagesKeys.lists(), { filters }] as const,
};

// Hook to fetch packages from the new API endpoint
export const useApiPackages = () => {
    return useQuery<ApiPackagesResponse, Error>({
        queryKey: apiPackagesKeys.lists(),
        queryFn: customerPackageService.getApiPackages,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        retry: 2,
        retryDelay: 1000,
    });
};

export default useApiPackages;
