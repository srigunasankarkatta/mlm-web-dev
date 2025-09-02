import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packageService, type Package, type PackagesListParams, type CreatePackageRequest, type UpdatePackageRequest } from '../api-services/package-service';

// Query keys
export const packageKeys = {
    all: ['packages'] as const,
    lists: () => [...packageKeys.all, 'list'] as const,
    list: (params: PackagesListParams) => [...packageKeys.lists(), params] as const,
    details: () => [...packageKeys.all, 'detail'] as const,
    detail: (id: number) => [...packageKeys.details(), id] as const,
    stats: () => [...packageKeys.all, 'stats'] as const,
};

// Get packages list with pagination
export const usePackages = (params: PackagesListParams = {}) => {
    return useQuery({
        queryKey: packageKeys.list(params),
        queryFn: async () => {
            const response = await packageService.getPackages(params);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Get package by ID
export const usePackage = (id: number) => {
    return useQuery({
        queryKey: packageKeys.detail(id),
        queryFn: async () => {
            const response = await packageService.getPackageById(id);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Get package statistics
export const usePackageStats = () => {
    return useQuery({
        queryKey: packageKeys.stats(),
        queryFn: async () => {
            const response = await packageService.getPackageStats();
            return response.data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create package mutation
export const useCreatePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (packageData: CreatePackageRequest) => packageService.createPackage(packageData),
        onSuccess: () => {
            // Invalidate and refetch packages list
            queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
            queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
        },
    });
};

// Update package mutation
export const useUpdatePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, packageData }: { id: number; packageData: UpdatePackageRequest }) =>
            packageService.updatePackage(id, packageData),
        onSuccess: (data, { id }) => {
            // Update package in cache
            queryClient.setQueryData(packageKeys.detail(id), data.data);
            // Invalidate packages list
            queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
        },
    });
};

// Delete package mutation
export const useDeletePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => packageService.deletePackage(id),
        onSuccess: () => {
            // Invalidate and refetch packages list and stats
            queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
            queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
        },
    });
};


