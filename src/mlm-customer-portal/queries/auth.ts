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
    onError: (error: any) => {
      // Handle authentication errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        // Clear invalid tokens
        CustomerAuthService.clearAuth();
      }
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
      localStorage.setItem('refreshToken', data.data.refreshToken);
      CustomerAuthService.setCurrentUser(data.data.user);
      
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      
      // Set user profile data
      queryClient.setQueryData(authQueryKeys.profile(), {
        success: true,
        data: {
          id: data.data.user.id,
          email: data.data.user.email,
          mobile: data.data.user.mobile,
          name: data.data.user.name,
          role: data.data.user.role,
          referralCode: data.data.user.referralCode,
          uplineId: data.data.user.uplineId,
          joinDate: new Date().toISOString(),
          walletBalance: 0,
          totalEarnings: 0,
          purchasedPlans: [],
        },
      });
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

// Hook for user registration
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<RegisterResponse> => {
      return CustomerAuthService.register(userData);
    },
    onSuccess: (data: RegisterResponse) => {
      // Store tokens and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      CustomerAuthService.setCurrentUser(data.data.user);
      
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
      
      // Set user profile data
      queryClient.setQueryData(authQueryKeys.profile(), {
        success: true,
        data: {
          id: data.data.user.id,
          email: data.data.user.email,
          mobile: data.data.user.mobile,
          name: data.data.user.name,
          role: data.data.user.role,
          referralCode: data.data.user.referralCode,
          joinDate: new Date().toISOString(),
          walletBalance: 0,
          totalEarnings: 0,
          purchasedPlans: [],
        },
      });
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
        localStorage.setItem('refreshToken', data.data.refreshToken!);
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
    },
    onError: (error: any) => {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local data
      queryClient.clear();
      CustomerAuthService.clearAuth();
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
