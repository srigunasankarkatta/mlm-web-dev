import { useState, useEffect, useCallback } from 'react';
import { CustomerProfile, LoginRequest, RegisterRequest, AuthResponse } from '../types';
import { login as apiLogin, register as apiRegister } from '../services/api';

interface UseAuthReturn {
  user: CustomerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (request: LoginRequest) => Promise<boolean>;
  register: (request: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('mlm-auth-token');
    const userData = localStorage.getItem('mlm-user-data');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        // Clear invalid data
        localStorage.removeItem('mlm-auth-token');
        localStorage.removeItem('mlm-user-data');
      }
    }
  }, []);

  const login = useCallback(async (request: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AuthResponse = await apiLogin(request);

      if ((response.status || response.success) && response.data?.user && response.data?.token) {
        setUser(response.data.user);
        localStorage.setItem('mlm-auth-token', response.data.token);
        localStorage.setItem('mlm-user-data', JSON.stringify(response.data.user));
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (request: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AuthResponse = await apiRegister(request);

      if ((response.status || response.success) && response.data?.user && response.data?.token) {
        setUser(response.data.user);
        localStorage.setItem('mlm-auth-token', response.data.token);
        localStorage.setItem('mlm-user-data', JSON.stringify(response.data.user));
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mlm-auth-token');
    localStorage.removeItem('mlm-user-data');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };
};
