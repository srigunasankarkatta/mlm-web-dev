import { useQuery } from '@tanstack/react-query';
import { transactionsService, TransactionsParams, TransactionsListResponse } from '../api-services';

/**
 * Hook to fetch transactions for a specific package
 */
export const usePackageTransactions = (packageId: number) => {
    return useQuery({
        queryKey: ['transactions', 'package', packageId],
        queryFn: () => transactionsService.getPackageTransactions(packageId),
        enabled: !!packageId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch all user transactions with filters and pagination
 */
export const useTransactions = (params: TransactionsParams = {}) => {
    return useQuery<TransactionsListResponse>({
        queryKey: ['transactions', 'list', params],
        queryFn: () => transactionsService.getTransactions(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch transaction by ID
 */
export const useTransaction = (transactionId: number) => {
    return useQuery({
        queryKey: ['transactions', 'detail', transactionId],
        queryFn: () => transactionsService.getTransactionById(transactionId),
        enabled: !!transactionId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch transaction summary/statistics
 */
export const useTransactionSummary = () => {
    return useQuery({
        queryKey: ['transactions', 'summary'],
        queryFn: () => transactionsService.getTransactionSummary(),
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch transaction types for filter dropdown
 */
export const useTransactionTypes = () => {
    return useQuery({
        queryKey: ['transactions', 'types'],
        queryFn: () => transactionsService.getTransactionTypes(),
        staleTime: 30 * 60 * 1000, // 30 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch payment methods for filter dropdown
 */
export const usePaymentMethods = () => {
    return useQuery({
        queryKey: ['transactions', 'payment-methods'],
        queryFn: () => transactionsService.getPaymentMethods(),
        staleTime: 30 * 60 * 1000, // 30 minutes
        retry: 2,
    });
};

/**
 * Hook to fetch transaction statuses for filter dropdown
 */
export const useTransactionStatuses = () => {
    return useQuery({
        queryKey: ['transactions', 'statuses'],
        queryFn: () => transactionsService.getTransactionStatuses(),
        staleTime: 30 * 60 * 1000, // 30 minutes
        retry: 2,
    });
};
