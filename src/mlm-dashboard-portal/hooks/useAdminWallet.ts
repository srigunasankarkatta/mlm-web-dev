import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminWalletService, {
    type ProcessWithdrawalRequest,
    type ManualWalletCreditRequest,
    type ManualWalletDebitRequest,
    type AdminWallet,
    type AdminWalletTransaction,
    type AdminWithdrawal,
    type AdminWalletListParams,
    type AdminWalletTransactionsParams,
    type AdminWithdrawalsParams
} from '../api-services/admin-wallet-service';

// Query Keys
export const ADMIN_WALLET_QUERY_KEYS = {
    statistics: ['admin', 'wallet', 'statistics'] as const,
    wallets: (params?: AdminWalletListParams) => ['admin', 'wallet', 'wallets', params] as const,
    transactions: (params?: AdminWalletTransactionsParams) => ['admin', 'wallet', 'transactions', params] as const,
    withdrawals: (params?: AdminWithdrawalsParams) => ['admin', 'wallet', 'withdrawals', params] as const,
    wallet: (id: number) => ['admin', 'wallet', 'wallet', id] as const,
    transaction: (id: number) => ['admin', 'wallet', 'transaction', id] as const,
    withdrawal: (id: number) => ['admin', 'wallet', 'withdrawal', id] as const,
    userDetails: (userId: number) => ['admin', 'wallet', 'user', userId] as const,
    dashboard: ['admin', 'wallet', 'dashboard'] as const,
};

// Wallet Statistics Hook
export const useAdminWalletStatistics = () => {
    return useQuery({
        queryKey: ADMIN_WALLET_QUERY_KEYS.statistics,
        queryFn: AdminWalletService.getWalletStatistics,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};

// Wallet List Hook
export const useAdminWallets = (params?: AdminWalletListParams) => {
    return useQuery({
        queryKey: ADMIN_WALLET_QUERY_KEYS.wallets(params),
        queryFn: () => AdminWalletService.getWallets(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchOnWindowFocus: false,
    });
};

// Wallet Transactions Hook
export const useAdminWalletTransactions = (params?: AdminWalletTransactionsParams) => {
    return useQuery({
        queryKey: ADMIN_WALLET_QUERY_KEYS.transactions(params),
        queryFn: () => AdminWalletService.getWalletTransactions(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchOnWindowFocus: false,
    });
};

// Withdrawals Hook
export const useAdminWithdrawals = (params?: AdminWithdrawalsParams) => {
    return useQuery({
        queryKey: ADMIN_WALLET_QUERY_KEYS.withdrawals(params),
        queryFn: () => AdminWalletService.getWithdrawals(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchOnWindowFocus: false,
    });
};

// Wallet Dashboard Hook
export const useAdminWalletDashboard = () => {
    return useQuery({
        queryKey: ADMIN_WALLET_QUERY_KEYS.dashboard,
        queryFn: AdminWalletService.getWalletDashboard,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};

// Process Withdrawal Mutation
export const useProcessWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ withdrawalId, data }: { withdrawalId: number; data: ProcessWithdrawalRequest }) =>
            AdminWalletService.processWithdrawal(withdrawalId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.withdrawals() });
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.statistics });
        },
    });
};

// Manual Credit Mutation
export const useManualWalletCredit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ManualWalletCreditRequest) => AdminWalletService.creditWallet(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.wallets() });
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.transactions() });
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.statistics });
        },
    });
};

// Manual Debit Mutation
export const useManualWalletDebit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ManualWalletDebitRequest) => AdminWalletService.debitWallet(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.wallets() });
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.transactions() });
            queryClient.invalidateQueries({ queryKey: ADMIN_WALLET_QUERY_KEYS.statistics });
        },
    });
};

// Utility functions
export const useAdminWalletUtils = () => {
    const formatCurrency = (amount: string | number): string => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(numAmount);
    };

    const formatNumber = (num: string | number): string => {
        const number = typeof num === 'string' ? parseFloat(num) : num;
        return new Intl.NumberFormat('en-US').format(number);
    };

    const getWalletTypeIcon = (type: string): string => {
        const iconMap: { [key: string]: string } = {
            earning: 'wallet',
            bonus: 'gift',
            reward: 'star',
            holding: 'lock',
            commission: 'trending-up',
        };
        return iconMap[type] || 'wallet';
    };

    const getWalletTypeColor = (type: string): string => {
        const colorMap: { [key: string]: string } = {
            earning: '#10B981',
            bonus: '#F59E0B',
            reward: '#8B5CF6',
            holding: '#6B7280',
            commission: '#3B82F6',
        };
        return colorMap[type] || '#6B7280';
    };

    const getTransactionTypeIcon = (type: string): string => {
        const iconMap: { [key: string]: string } = {
            credit: 'arrow-up',
            debit: 'arrow-down',
            deposit: 'plus',
            withdrawal: 'minus',
            transfer: 'arrow-right',
            refund: 'refresh',
        };
        return iconMap[type] || 'transaction';
    };

    const getTransactionTypeColor = (type: string): string => {
        const colorMap: { [key: string]: string } = {
            credit: '#10B981',
            debit: '#EF4444',
            deposit: '#3B82F6',
            withdrawal: '#F59E0B',
            transfer: '#8B5CF6',
            refund: '#6B7280',
        };
        return colorMap[type] || '#6B7280';
    };

    const getTransactionCategoryIcon = (category: string): string => {
        const iconMap: { [key: string]: string } = {
            direct_income: 'user-plus',
            level_income: 'layers',
            club_income: 'users',
            package_purchase: 'shopping-cart',
            withdrawal: 'arrow-up',
            refund: 'refresh',
        };
        return iconMap[category] || 'transaction';
    };

    const getTransactionCategoryColor = (category: string): string => {
        const colorMap: { [key: string]: string } = {
            direct_income: '#10B981',
            level_income: '#3B82F6',
            club_income: '#8B5CF6',
            package_purchase: '#F59E0B',
            withdrawal: '#EF4444',
            refund: '#6B7280',
        };
        return colorMap[category] || '#6B7280';
    };

    return {
        formatCurrency,
        formatNumber,
        getWalletTypeIcon,
        getWalletTypeColor,
        getTransactionTypeIcon,
        getTransactionTypeColor,
        getTransactionCategoryIcon,
        getTransactionCategoryColor,
    };
};

// Main state hook
export const useAdminWalletState = () => {
    const [walletFilters, setWalletFilters] = useState<AdminWalletListParams>({ page: 1, per_page: 15 });
    const [transactionFilters, setTransactionFilters] = useState<AdminWalletTransactionsParams>({ page: 1, per_page: 15 });
    const [withdrawalFilters, setWithdrawalFilters] = useState<AdminWithdrawalsParams>({ page: 1, per_page: 15 });
    const [selectedWallet, setSelectedWallet] = useState<AdminWallet | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<AdminWalletTransaction | null>(null);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<AdminWithdrawal | null>(null);

    const walletStatisticsQuery = useAdminWalletStatistics();
    const walletsQuery = useAdminWallets(walletFilters);
    const transactionsQuery = useAdminWalletTransactions(transactionFilters);
    const withdrawalsQuery = useAdminWithdrawals(withdrawalFilters);
    const walletDashboardQuery = useAdminWalletDashboard();

    const updateWalletFilters = (newFilters: Partial<AdminWalletListParams>) => {
        setWalletFilters(prev => ({ ...prev, ...newFilters }));
    };

    const updateTransactionFilters = (newFilters: Partial<AdminWalletTransactionsParams>) => {
        setTransactionFilters(prev => ({ ...prev, ...newFilters }));
    };

    const updateWithdrawalFilters = (newFilters: Partial<AdminWithdrawalsParams>) => {
        setWithdrawalFilters(prev => ({ ...prev, ...newFilters }));
    };

    const clearFilters = () => {
        setWalletFilters({ page: 1, per_page: 15 });
        setTransactionFilters({ page: 1, per_page: 15 });
        setWithdrawalFilters({ page: 1, per_page: 15 });
    };

    // Export functions (placeholder implementations)
    const exportTransactions = (filters?: AdminWalletTransactionsParams) => {
        console.log('Exporting transactions with filters:', filters);
        // Implement actual export logic here
    };

    const exportWithdrawals = (filters?: AdminWithdrawalsParams) => {
        console.log('Exporting withdrawals with filters:', filters);
        // Implement actual export logic here
    };

    return {
        // State
        selectedWallet,
        setSelectedWallet,
        selectedTransaction,
        setSelectedTransaction,
        selectedWithdrawal,
        setSelectedWithdrawal,
        walletFilters,
        transactionFilters,
        withdrawalFilters,

        // Data - Extract the actual data from the API response
        walletStatistics: walletStatisticsQuery.data || null,
        wallets: walletsQuery.data || null,
        transactions: transactionsQuery.data || null,
        withdrawals: withdrawalsQuery.data || null,
        walletDashboard: walletDashboardQuery.data || null,

        // Loading states
        isLoadingStatistics: walletStatisticsQuery.isLoading,
        isLoadingWallets: walletsQuery.isLoading,
        isLoadingTransactions: transactionsQuery.isLoading,
        isLoadingWithdrawals: withdrawalsQuery.isLoading,
        isLoadingDashboard: walletDashboardQuery.isLoading,

        // Error states
        statisticsError: walletStatisticsQuery.error,
        walletsError: walletsQuery.error,
        transactionsError: transactionsQuery.error,
        withdrawalsError: withdrawalsQuery.error,
        dashboardError: walletDashboardQuery.error,

        // Actions
        updateWalletFilters,
        updateTransactionFilters,
        updateWithdrawalFilters,
        clearFilters,
        exportTransactions,
        exportWithdrawals,
    };
};
