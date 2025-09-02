import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService, UserProfileResponse, TeamTreeResponse, UserProfile } from '../api-services';

// Query keys
export const profileKeys = {
    all: ['profile'] as const,
    userProfile: () => [...profileKeys.all, 'user'] as const,
    teamTree: () => [...profileKeys.all, 'team'] as const,
};

// Hook to get user profile with directs and incomes
export const useUserProfile = () => {
    return useQuery({
        queryKey: profileKeys.userProfile(),
        queryFn: () => ProfileService.getUserProfile(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        refetchOnWindowFocus: false,
    });
};

// Hook to get user team tree
export const useUserTeamTree = () => {
    return useQuery({
        queryKey: profileKeys.teamTree(),
        queryFn: () => ProfileService.getUserTeamTree(),
        staleTime: 10 * 60 * 1000, // 10 minutes (team tree changes less frequently)
        retry: 2,
        refetchOnWindowFocus: false,
    });
};

// Hook to update user profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<UserProfile>) => ProfileService.updateProfile(data),
        onSuccess: () => {
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({ queryKey: profileKeys.userProfile() });
        },
        onError: (error) => {
            console.error('Failed to update profile:', error);
        },
    });
};

// Hook to refresh profile data
export const useRefreshProfile = () => {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({ queryKey: profileKeys.userProfile() });
        queryClient.invalidateQueries({ queryKey: profileKeys.teamTree() });
    };
};

export default {
    useUserProfile,
    useUserTeamTree,
    useUpdateProfile,
    useRefreshProfile,
};
