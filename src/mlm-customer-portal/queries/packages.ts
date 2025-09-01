import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPackageService } from '../api-services/package-service';
import type {
  MLMPackage,
  PackageDetail,
  PackagesListParams,
  PackagesListResponse,
  PurchasePackageRequest,
  PurchasePackageResponse,
  UserPackagesResponse,
  UpgradePackageRequest,
  UpgradePackageResponse,
  PackageComparisonResponse,
} from '../api-services/package-service';

// Query keys for packages
export const packageQueryKeys = {
  all: ['packages'] as const,
  lists: () => [...packageQueryKeys.all, 'list'] as const,
  list: (params: PackagesListParams) => [...packageQueryKeys.lists(), params] as const,
  details: () => [...packageQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...packageQueryKeys.details(), id] as const,
  userPackages: () => [...packageQueryKeys.all, 'user'] as const,
  recommendations: () => [...packageQueryKeys.all, 'recommendations'] as const,
  stats: () => [...packageQueryKeys.all, 'stats'] as const,
  comparison: () => [...packageQueryKeys.all, 'comparison'] as const,
  eligibility: () => [...packageQueryKeys.all, 'eligibility'] as const,
  paymentMethods: () => [...packageQueryKeys.all, 'payment-methods'] as const,
};

// Hook to get packages list
export const usePackages = (params: PackagesListParams = {}) => {
  return useQuery({
    queryKey: packageQueryKeys.list(params),
    queryFn: async (): Promise<PackagesListResponse> => {
      return customerPackageService.getPackages(params);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get package by ID
export const usePackage = (id: string) => {
  return useQuery({
    queryKey: packageQueryKeys.detail(id),
    queryFn: async (): Promise<PackageDetail> => {
      return customerPackageService.getPackageById(id);
    },
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get user's purchased packages
export const useUserPackages = () => {
  return useQuery({
    queryKey: packageQueryKeys.userPackages(),
    queryFn: async (): Promise<UserPackagesResponse> => {
      return customerPackageService.getUserPackages();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get package recommendations
export const usePackageRecommendations = () => {
  return useQuery({
    queryKey: packageQueryKeys.recommendations(),
    queryFn: async () => {
      return customerPackageService.getPackageRecommendations();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get package statistics
export const usePackageStats = () => {
  return useQuery({
    queryKey: packageQueryKeys.stats(),
    queryFn: async () => {
      return customerPackageService.getPackageStats();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to purchase a package
export const usePurchasePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (packageData: PurchasePackageRequest): Promise<PurchasePackageResponse> => {
      return customerPackageService.purchasePackage(packageData);
    },
    onSuccess: () => {
      // Invalidate user packages and stats
      queryClient.invalidateQueries({ queryKey: packageQueryKeys.userPackages() });
      queryClient.invalidateQueries({ queryKey: packageQueryKeys.stats() });
      
      // Invalidate auth profile to update user data
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
    onError: (error: any) => {
      console.error('Package purchase failed:', error);
    },
  });
};

// Hook to upgrade a package
export const useUpgradePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (upgradeData: UpgradePackageRequest): Promise<UpgradePackageResponse> => {
      return customerPackageService.upgradePackage(upgradeData);
    },
    onSuccess: () => {
      // Invalidate user packages and stats
      queryClient.invalidateQueries({ queryKey: packageQueryKeys.userPackages() });
      queryClient.invalidateQueries({ queryKey: packageQueryKeys.stats() });
      
      // Invalidate auth profile to update user data
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
    onError: (error: any) => {
      console.error('Package upgrade failed:', error);
    },
  });
};

// Hook to compare packages
export const useComparePackages = (packageIds: string[]) => {
  return useQuery({
    queryKey: packageQueryKeys.comparison(),
    queryFn: async (): Promise<PackageComparisonResponse> => {
      return customerPackageService.comparePackages(packageIds);
    },
    enabled: packageIds.length > 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to verify package eligibility
export const usePackageEligibility = (packageId: string) => {
  return useQuery({
    queryKey: packageQueryKeys.eligibility(),
    queryFn: async () => {
      return customerPackageService.verifyEligibility(packageId);
    },
    enabled: !!packageId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get payment methods for a package
export const usePackagePaymentMethods = (packageId: string) => {
  return useQuery({
    queryKey: packageQueryKeys.paymentMethods(),
    queryFn: async () => {
      return customerPackageService.getPaymentMethods(packageId);
    },
    enabled: !!packageId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get all available packages (for comparison, etc.)
export const useAllPackages = () => {
  return useQuery({
    queryKey: packageQueryKeys.list({ perPage: 100 }), // Get all packages
    queryFn: async (): Promise<PackagesListResponse> => {
      return customerPackageService.getPackages({ perPage: 100 });
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get required packages (Package-1, etc.)
export const useRequiredPackages = () => {
  return useQuery({
    queryKey: packageQueryKeys.list({ isRequired: true }),
    queryFn: async (): Promise<PackagesListResponse> => {
      return customerPackageService.getPackages({ isRequired: true });
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to get packages by rank range
export const usePackagesByRank = (minRank: number, maxRank: number) => {
  return useQuery({
    queryKey: packageQueryKeys.list({ rank: minRank }),
    queryFn: async (): Promise<PackagesListResponse> => {
      const packages = await customerPackageService.getPackages({ perPage: 100 });
      // Filter by rank range
      const filteredPackages = packages.data.filter(
        pkg => pkg.rank >= minRank && pkg.rank <= maxRank
      );
      return {
        ...packages,
        data: filteredPackages,
        pagination: {
          ...packages.pagination,
          total: filteredPackages.length,
        },
      };
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
