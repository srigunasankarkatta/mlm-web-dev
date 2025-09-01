import { useState, useEffect, useCallback } from 'react';
import { IncomeSummary, Notification } from '../types';
import { getIncomeSummary, getNotifications, markNotificationAsRead } from '../services/api';

interface UseDashboardReturn {
  incomeSummary: IncomeSummary | null;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  markNotificationRead: (notificationId: string) => Promise<void>;
  clearError: () => void;
}

export const useDashboard = (userId: string): UseDashboardReturn => {
  const [incomeSummary, setIncomeSummary] = useState<IncomeSummary | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [incomeData, notificationData] = await Promise.all([
        getIncomeSummary(userId),
        getNotifications(userId)
      ]);
      
      if (incomeData) {
        setIncomeSummary(incomeData);
      }
      
      setNotifications(notificationData);
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const refreshData = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  const markNotificationRead = useCallback(async (notificationId: string) => {
    try {
      await markNotificationAsRead(userId, notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, [userId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch data on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId, fetchDashboardData]);

  return {
    incomeSummary,
    notifications,
    isLoading,
    error,
    refreshData,
    markNotificationRead,
    clearError
  };
};
