import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import WalletService, {
    type WalletsData,
    type WalletTransactionsResponse,
    type WalletSummary,
    type DashboardStats,
    type WithdrawalRequest,
    type WithdrawalResponse,
    type WithdrawalsResponse,
    type WithdrawalLimits,
    type TransactionQueryParams,
    type WithdrawalQueryParams
} from '../api-services/wallet-service';

// Query Keys
export const WALLET_QUERY_KEYS = {
    balance: ['wallet', 'balance'] as const,
    transactions: (params?: TransactionQueryParams) => ['wallet', 'transactions', params] as const,
    summary: ['wallet', 'summary'] as const,
    dashboardStats: ['wallet', 'dashboard-stats'] as const,
    withdrawals: (params?: WithdrawalQueryParams) => ['wallet', 'withdrawals', params] as const,
    withdrawalLimits: ['wallet', 'withdrawal-limits'] as const,
};

// Wallet Balance Hook
export const useWalletBalance = () => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.balance,
        queryFn: WalletService.getWalletBalance,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });
};

// Wallet Transactions Hook
export const useWalletTransactions = (params?: TransactionQueryParams) => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.transactions(params),
        queryFn: () => WalletService.getWalletTransactions(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchOnWindowFocus: true,
    });
};

// Wallet Summary Hook
export const useWalletSummary = () => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.summary,
        queryFn: WalletService.getWalletSummary,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });
};

// Dashboard Stats Hook
export const useDashboardStats = () => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.dashboardStats,
        queryFn: WalletService.getDashboardStats,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });
};

// Withdrawals Hook
export const useWithdrawals = (params?: WithdrawalQueryParams) => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.withdrawals(params),
        queryFn: () => WalletService.getWithdrawals(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchOnWindowFocus: true,
    });
};

// Withdrawal Limits Hook
export const useWithdrawalLimits = () => {
    return useQuery({
        queryKey: WALLET_QUERY_KEYS.withdrawalLimits,
        queryFn: WalletService.getWithdrawalLimits,
        staleTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
    });
};

// Withdrawal Request Hook
export const useWithdrawalRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: WithdrawalRequest) => WalletService.requestWithdrawal(data),
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
        },
    });
};

// Wallet State Management Hook
export const useWalletState = () => {
    const [selectedWallet, setSelectedWallet] = useState<string>('earning');
    const [transactionFilters, setTransactionFilters] = useState<TransactionQueryParams>({});
    const [withdrawalFilters, setWithdrawalFilters] = useState<WithdrawalQueryParams>({});

    const walletBalance = useWalletBalance();
    const walletTransactions = useWalletTransactions(transactionFilters);
    const walletSummary = useWalletSummary();
    const dashboardStats = useDashboardStats();
    const withdrawals = useWithdrawals(withdrawalFilters);
    const withdrawalLimits = useWithdrawalLimits();

    const updateTransactionFilters = (filters: Partial<TransactionQueryParams>) => {
        setTransactionFilters(prev => ({ ...prev, ...filters }));
    };

    const updateWithdrawalFilters = (filters: Partial<WithdrawalQueryParams>) => {
        setWithdrawalFilters(prev => ({ ...prev, ...filters }));
    };

    const clearFilters = () => {
        setTransactionFilters({});
        setWithdrawalFilters({});
    };

    return {
        // State
        selectedWallet,
        setSelectedWallet,
        transactionFilters,
        withdrawalFilters,

        // Data
        walletBalance,
        walletTransactions,
        walletSummary,
        dashboardStats,
        withdrawals,
        withdrawalLimits,

        // Actions
        updateTransactionFilters,
        updateWithdrawalFilters,
        clearFilters,
    };
};

// Wallet Utility Hooks
export const useWalletUtils = () => {
    const formatCurrency = (amount: string | number): string => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(numAmount);
    };

    const formatNumber = (amount: string | number): string => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numAmount);
    };

    const getWalletIcon = (walletType: string): string => {
        const icons: Record<string, string> = {
            earning: 'dollar-sign',
            bonus: 'gift',
            reward: 'star',
            holding: 'lock',
            commission: 'percent',
        };
        return icons[walletType] || 'wallet';
    };

    const getWalletColor = (walletType: string): string => {
        const colors: Record<string, string> = {
            earning: 'green',
            bonus: 'blue',
            reward: 'yellow',
            holding: 'gray',
            commission: 'purple',
        };
        return colors[walletType] || 'gray';
    };

    const getTransactionIcon = (type: string): string => {
        const icons: Record<string, string> = {
            credit: 'arrow-up',
            debit: 'arrow-down',
            transfer_in: 'arrow-right',
            transfer_out: 'arrow-left',
        };
        return icons[type] || 'circle';
    };

    const getTransactionColor = (type: string): string => {
        const colors: Record<string, string> = {
            credit: 'green',
            debit: 'red',
            transfer_in: 'blue',
            transfer_out: 'orange',
        };
        return colors[type] || 'gray';
    };

    const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            completed: 'green',
            pending: 'yellow',
            processing: 'blue',
            failed: 'red',
            cancelled: 'gray',
        };
        return colors[status.toLowerCase()] || 'gray';
    };

    return {
        formatCurrency,
        formatNumber,
        getWalletIcon,
        getWalletColor,
        getTransactionIcon,
        getTransactionColor,
        getStatusColor,
    };
};
