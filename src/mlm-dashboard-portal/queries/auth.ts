import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../api-services/auth-service';
import type {
  LoginCredentials,
  LoginResponse,
  ProfileResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  AuthError,
} from './types/auth';

// Query keys for authentication
export const authQueryKeys = {
  all: ['auth'] as const,
  profile: () => [...authQueryKeys.all, 'profile'] as const,
  user: (id: number) => [...authQueryKeys.all, 'user', id] as const,
  isAuthenticated: () => [...authQueryKeys.all, 'isAuthenticated'] as const,
};

// Hook to get user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: async (): Promise<ProfileResponse> => {
      return AuthService.getProfile();
    },
    enabled: !!localStorage.getItem('token'), // Only run if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        return false;
      }
      return failureCount < 3;
    },
    onError: (error: AuthError) => {
      // Handle authentication errors
      if (error.statusCode === 401 || error.statusCode === 403) {
        // Clear invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    },
  });
};

// Hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authQueryKeys.isAuthenticated(),
    queryFn: async (): Promise<boolean> => {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      try {
        await AuthService.getProfile();
        return true;
      } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
          // Clear invalid tokens
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          return false;
        }
        throw error;
      }
    },
    enabled: !!localStorage.getItem('token'),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      return AuthService.login(credentials);
    },
    onSuccess: (data: LoginResponse) => {
      // Store tokens and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      
      // Set user profile data
      queryClient.setQueryData(authQueryKeys.profile(), {
        success: true,
        data: data.data.user,
        message: 'Login successful',
      });
      
      // Set authentication status
      queryClient.setQueryData(authQueryKeys.isAuthenticated(), true);
    },
    onError: (error: AuthError) => {
      // Handle login errors
      console.error('Login failed:', error.message);
      
      // Clear any existing tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset auth queries
      queryClient.setQueryData(authQueryKeys.profile(), null);
      queryClient.setQueryData(authQueryKeys.isAuthenticated(), false);
    },
  });
};

// Hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (): Promise<void> => {
      return AuthService.logout();
    },
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset all auth queries
      queryClient.setQueryData(authQueryKeys.profile(), null);
      queryClient.setQueryData(authQueryKeys.isAuthenticated(), false);
      
      // Remove all auth queries from cache
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
    onError: (error: AuthError) => {
      // Even if logout API fails, clear local data
      console.warn('Logout API failed, but clearing local data:', error.message);
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset all auth queries
      queryClient.setQueryData(authQueryKeys.profile(), null);
      queryClient.setQueryData(authQueryKeys.isAuthenticated(), false);
      
      // Remove all auth queries from cache
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
};

// Hook for refreshing token
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (): Promise<RefreshTokenResponse> => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      return AuthService.refreshToken();
    },
    onSuccess: (data: RefreshTokenResponse) => {
      // Update tokens
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Invalidate auth queries to refetch with new token
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
    },
    onError: (error: AuthError) => {
      // Handle refresh token errors
      console.error('Token refresh failed:', error.message);
      
      // Clear tokens and user data
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset auth queries
      queryClient.setQueryData(authQueryKeys.profile(), null);
      queryClient.setQueryData(authQueryKeys.isAuthenticated(), false);
      
      // Remove all auth queries from cache
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
};

// Hook for forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
      return AuthService.forgotPassword(data);
    },
    onError: (error: AuthError) => {
      console.error('Forgot password failed:', error.message);
    },
  });
};

// Hook for reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
      return AuthService.resetPassword(data);
    },
    onError: (error: AuthError) => {
      console.error('Reset password failed:', error.message);
    },
  });
};

// Hook for updating user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<ProfileResponse['data']>): Promise<ProfileResponse> => {
      return AuthService.updateProfile(data);
    },
    onSuccess: (data: ProfileResponse) => {
      // Update profile in cache
      queryClient.setQueryData(authQueryKeys.profile(), data);
      
      // Update user in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    },
    onError: (error: AuthError) => {
      console.error('Profile update failed:', error.message);
    },
  });
};

// Utility hook to get current user from cache or localStorage
export const useCurrentUser = () => {
  const { data: profile, isLoading, error } = useUserProfile();
  
  // Fallback to localStorage if query hasn't loaded yet
  const fallbackUser = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;
  
  return {
    user: profile?.data || fallbackUser,
    isLoading,
    error,
    isAuthenticated: !!(profile?.data || fallbackUser),
  };
};
