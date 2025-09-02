import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerAuthService } from '../api-services/auth-service';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  OtpRequest,
  OtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ProfileResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../api-services/auth-service';

// Query keys for authentication
export const authQueryKeys = {
  all: ['auth'] as const,
  profile: () => [...authQueryKeys.all, 'profile'] as const,
  user: (id: string) => [...authQueryKeys.all, 'user', id] as const,
  isAuthenticated: () => [...authQueryKeys.all, 'isAuthenticated'] as const,
};

// Hook to get user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: async (): Promise<ProfileResponse> => {
      return CustomerAuthService.getProfile();
    },
    enabled: CustomerAuthService.isAuthenticated(), // Only run if authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },

  });
};

// Hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authQueryKeys.isAuthenticated(),
    queryFn: async (): Promise<boolean> => {
      if (!CustomerAuthService.isAuthenticated()) return false;

      try {
        await CustomerAuthService.getProfile();
        return true;
      } catch (error: any) {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          // Clear invalid tokens
          CustomerAuthService.clearAuth();
          return false;
        }
        throw error;
      }
    },
    enabled: CustomerAuthService.isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      return CustomerAuthService.login(credentials);
    },
    onSuccess: (data: LoginResponse) => {
      // Store tokens and user data
      localStorage.setItem('token', data.data.token);
      CustomerAuthService.setCurrentUser(data.data.user);
      console.log('Login successful:', data);
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });

      // Set user profile data
      queryClient.setQueryData(authQueryKeys.profile(), {
        status: true,
        data: {
          id: data.data.user.id,
          name: data.data.user.name,
          email: data.data.user.email,
          sponsor_id: data.data.user.sponsor_id,
          package_id: data.data.user.package_id,
          created_at: data.data.user.created_at,
          updated_at: data.data.user.updated_at,
          walletBalance: 0,
          totalEarnings: 0,
          purchasedPlans: [],
        },
      });

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

// Hook for user registration
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<RegisterResponse> => {
      return CustomerAuthService.register(userData);
    },
    onSuccess: (data: RegisterResponse) => {
      console.log('Registration successful:', data);

      // Note: The new API doesn't return a token or user object
      // User will need to login after registration
      // We just show success message and redirect to login

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });
};

// Hook for sending OTP
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: OtpRequest): Promise<OtpResponse> => {
      return CustomerAuthService.sendOtp(data);
    },
    onError: (error: any) => {
      console.error('Send OTP failed:', error);
    },
  });
};

// Hook for verifying OTP
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
      return CustomerAuthService.verifyOtp(data);
    },
    onSuccess: (data: VerifyOtpResponse) => {
      if (data.data?.token && data.data?.user) {
        // Store tokens and user data
        localStorage.setItem('token', data.data.token);
        CustomerAuthService.setCurrentUser(data.data.user);

        // Invalidate and refetch auth queries
        queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      }
    },
    onError: (error: any) => {
      console.error('OTP verification failed:', error);
    },
  });
};

// Hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      return CustomerAuthService.logout();
    },
    onSuccess: () => {
      // Clear all auth data from cache
      queryClient.clear();

      // Clear localStorage
      CustomerAuthService.clearAuth();

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    },
    onError: (error: any) => {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local data
      queryClient.clear();
      CustomerAuthService.clearAuth();

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    },
  });
};

// Hook for forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
      return CustomerAuthService.forgotPassword(data);
    },
    onError: (error: any) => {
      console.error('Forgot password failed:', error);
    },
  });
};

// Hook for reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
      return CustomerAuthService.resetPassword(data);
    },
    onError: (error: any) => {
      console.error('Reset password failed:', error);
    },
  });
};

// Hook for updating profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<ProfileResponse['data']>): Promise<ProfileResponse> => {
      return CustomerAuthService.updateProfile(data);
    },
    onSuccess: (data: ProfileResponse) => {
      // Update profile data in cache
      queryClient.setQueryData(authQueryKeys.profile(), data);

      // Update user in localStorage
      CustomerAuthService.setCurrentUser(data.data);
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error);
    },
  });
};

// Hook to get current user from localStorage
export const useCurrentUser = () => {
  return CustomerAuthService.getCurrentUser();
};

// Hook to check authentication status
export const useAuthStatus = () => {
  return {
    isAuthenticated: CustomerAuthService.isAuthenticated(),
    currentUser: CustomerAuthService.getCurrentUser(),
  };
};
