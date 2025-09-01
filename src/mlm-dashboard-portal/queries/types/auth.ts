// Authentication types for React Query hooks

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      avatar?: string;
      status: 'active' | 'inactive' | 'suspended';
    };
    token: string;
    refreshToken: string;
    expiresAt: string;
  };
  message: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  data: UserProfile;
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    expiresAt: string;
  };
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthError {
  type: 'validation' | 'network' | 'server' | 'unauthorized';
  message: string;
  fieldErrors?: Record<string, string>;
  statusCode?: number;
}
