import { defaultApiService } from './api-service-factory';

// Admin Wallet Types
export interface AdminWalletStatistics {
    overview: {
        total_wallets: number;
        active_wallets: number;
        total_balance: string;
        total_pending_balance: string;
        total_withdrawn_balance: string;
        total_transactions: number;
        total_withdrawals: number;
        pending_withdrawals: number;
    };
    by_wallet_type: {
        [key: string]: {
            count: number;
            total_balance: string;
            total_pending: string;
        };
    };
    by_transaction_type: {
        [key: string]: {
            count: number;
            total_amount: string;
        };
    };
    by_withdrawal_status: {
        [key: string]: {
            count: number;
            total_amount: string;
        };
    };
    daily_stats: Array<{
        date: string;
        transaction_count: number;
        total_amount: string;
    }>;
    top_users_by_balance: Array<{
        user_id: number;
        user_name: string;
        user_email: string;
        total_balance: string;
    }>;
    recent_activity: {
        recent_transactions: Array<{
            id: number;
            user_name: string;
            user_email: string;
            wallet_type: string;
            type: string;
            amount: string;
            description: string;
            created_at: string;
        }>;
        recent_withdrawals: Array<{
            id: number;
            user_name: string;
            user_email: string;
            amount: string;
            method: string;
            status: string;
            created_at: string;
        }>;
    };
}

export interface AdminWallet {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    type: string;
    display_name: string;
    balance: string;
    pending_balance: string;
    withdrawn_balance: string;
    available_balance: string;
    total_balance: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminWalletListResponse {
    wallets: AdminWallet[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        has_more_pages: boolean;
    };
}

export interface AdminWalletTransaction {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    wallet_id: number;
    wallet_type: string;
    wallet_display_name: string;
    type: 'credit' | 'debit' | 'transfer_in' | 'transfer_out';
    category: string;
    amount: string;
    balance_before: string;
    balance_after: string;
    reference_id: string;
    description: string;
    status: string;
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface AdminWalletTransactionsResponse {
    transactions: AdminWalletTransaction[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        has_more_pages: boolean;
    };
}

export interface AdminWithdrawal {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    wallet_id: number;
    wallet_type: string;
    wallet_display_name: string;
    withdrawal_id: string;
    amount: string;
    fee: string;
    net_amount: string;
    method: string;
    method_display_name: string;
    payment_details: {
        bank_name?: string;
        account_number?: string;
        account_holder_name?: string;
        upi_id?: string;
        wallet_address?: string;
    };
    status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed' | 'failed' | 'cancelled';
    status_display_name: string;
    user_notes?: string;
    admin_notes?: string;
    processed_by?: string;
    processed_at?: string;
    created_at: string;
    updated_at: string;
}

export interface AdminWithdrawalsResponse {
    withdrawals: AdminWithdrawal[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        has_more_pages: boolean;
    };
}

export interface ProcessWithdrawalRequest {
    status: 'approved' | 'rejected' | 'processing' | 'completed' | 'failed' | 'cancelled';
    admin_notes?: string;
}

export interface ProcessWithdrawalResponse {
    id: number;
    withdrawal_id: string;
    user_name: string;
    user_email: string;
    amount: string;
    status: string;
    status_display_name: string;
    admin_notes?: string;
    processed_by: string;
    processed_at: string;
}

export interface ManualWalletCreditRequest {
    user_id: number;
    wallet_type: string;
    amount: number;
    description: string;
}

export interface ManualWalletDebitRequest {
    user_id: number;
    wallet_type: string;
    amount: number;
    description: string;
}

export interface ManualWalletTransactionResponse {
    id: number;
    user_name: string;
    type: string;
    category: string;
    amount: string;
    description: string;
    balance_after: string;
    created_at: string;
}

export interface UserWalletDetails {
    user: {
        id: number;
        name: string;
        email: string;
        referral_code: string;
        package: {
            id: number;
            name: string;
            price: string;
        };
    };
    wallets: Array<{
        id: number;
        type: string;
        display_name: string;
        balance: string;
        pending_balance: string;
        withdrawn_balance: string;
        is_active: boolean;
        created_at: string;
    }>;
    recent_transactions: Array<{
        id: number;
        type: string;
        category: string;
        amount: string;
        description: string;
        created_at: string;
    }>;
    recent_withdrawals: Array<{
        id: number;
        amount: string;
        method: string;
        status: string;
        created_at: string;
    }>;
    summary: {
        total_balance: string;
        total_pending: string;
        total_withdrawn: string;
        total_transactions: number;
        total_withdrawals: number;
    };
}

export interface AdminWalletDashboard {
    summary: {
        total_wallets: number;
        total_balance: string;
        pending_withdrawals: number;
        total_transactions_today: number;
    };
    recent_activity: Array<{
        type: 'transaction' | 'withdrawal';
        user_name: string;
        description: string;
        amount: string;
        created_at: string;
    }>;
    charts: {
        daily_transactions: Array<{
            date: string;
            count: number;
            amount: string;
        }>;
        wallet_distribution: {
            [key: string]: string;
        };
    };
}

// Query Parameters
export interface AdminWalletListParams {
    page?: number;
    per_page?: number;
    user_id?: number;
    type?: string;
    is_active?: boolean;
    search?: string;
}

export interface AdminWalletTransactionsParams {
    page?: number;
    per_page?: number;
    user_id?: number;
    wallet_id?: number;
    type?: string;
    category?: string;
    status?: string;
    from_date?: string;
    to_date?: string;
    search?: string;
}

export interface AdminWithdrawalsParams {
    page?: number;
    per_page?: number;
    user_id?: number;
    status?: string;
    method?: string;
    from_date?: string;
    to_date?: string;
    search?: string;
}

// Admin Wallet API Service
export class AdminWalletService {
    // Get wallet statistics
    static async getWalletStatistics(): Promise<AdminWalletStatistics> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get('/admin/wallets/statistics');
            return response.data.data || {
                overview: {
                    total_wallets: 0,
                    active_wallets: 0,
                    total_balance: '0.00',
                    total_pending_balance: '0.00',
                    total_withdrawn_balance: '0.00',
                    total_transactions: 0,
                    total_withdrawals: 0,
                    pending_withdrawals: 0
                },
                by_wallet_type: {},
                by_transaction_type: {},
                by_withdrawal_status: {},
                daily_stats: [],
                top_users_by_balance: [],
                recent_activity: {
                    recent_transactions: [],
                    recent_withdrawals: []
                }
            };
        } catch (error) {
            console.error('Error fetching wallet statistics:', error);
            throw error;
        }
    }

    // Get wallet list
    static async getWallets(params?: AdminWalletListParams): Promise<AdminWalletListResponse> {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
            if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
            if (params?.type) queryParams.append('type', params.type);
            if (params?.is_active !== undefined) queryParams.append('is_active', params.is_active.toString());
            if (params?.search) queryParams.append('search', params.search);

            const url = `/admin/wallets${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(url);
            return response.data.data || { wallets: [], pagination: { current_page: 1, last_page: 1, per_page: 15, total: 0, from: 0, to: 0, has_more_pages: false } };
        } catch (error) {
            console.error('Error fetching wallets:', error);
            throw error;
        }
    }

    // Get wallet transactions
    static async getWalletTransactions(params?: AdminWalletTransactionsParams): Promise<AdminWalletTransactionsResponse> {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
            if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
            if (params?.wallet_id) queryParams.append('wallet_id', params.wallet_id.toString());
            if (params?.type) queryParams.append('type', params.type);
            if (params?.category) queryParams.append('category', params.category);
            if (params?.status) queryParams.append('status', params.status);
            if (params?.from_date) queryParams.append('from_date', params.from_date);
            if (params?.to_date) queryParams.append('to_date', params.to_date);
            if (params?.search) queryParams.append('search', params.search);

            const url = `/admin/wallet-transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(url);
            return response.data.data || { transactions: [], pagination: { current_page: 1, last_page: 1, per_page: 15, total: 0, from: 0, to: 0, has_more_pages: false } };
        } catch (error) {
            console.error('Error fetching wallet transactions:', error);
            throw error;
        }
    }

    // Get withdrawals
    static async getWithdrawals(params?: AdminWithdrawalsParams): Promise<AdminWithdrawalsResponse> {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
            if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
            if (params?.status) queryParams.append('status', params.status);
            if (params?.method) queryParams.append('method', params.method);
            if (params?.from_date) queryParams.append('from_date', params.from_date);
            if (params?.to_date) queryParams.append('to_date', params.to_date);
            if (params?.search) queryParams.append('search', params.search);

            const url = `/admin/withdrawals${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(url);
            return response.data.data || { withdrawals: [], pagination: { current_page: 1, last_page: 1, per_page: 15, total: 0, from: 0, to: 0, has_more_pages: false } };
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
            throw error;
        }
    }

    // Process withdrawal
    static async processWithdrawal(withdrawalId: number, data: ProcessWithdrawalRequest): Promise<ProcessWithdrawalResponse> {
        try {
            const response = await defaultApiService.put<{ data: ProcessWithdrawalResponse }>(`/admin/withdrawals/${withdrawalId}/process`, data);
            return response.data.data;
        } catch (error) {
            console.error('Error processing withdrawal:', error);
            throw error;
        }
    }

    // Manual wallet credit
    static async creditWallet(data: ManualWalletCreditRequest): Promise<ManualWalletTransactionResponse> {
        try {
            const response = await defaultApiService.post<{ data: ManualWalletTransactionResponse }>('/admin/wallets/credit', data);
            return response.data.data;
        } catch (error) {
            console.error('Error crediting wallet:', error);
            throw error;
        }
    }

    // Manual wallet debit
    static async debitWallet(data: ManualWalletDebitRequest): Promise<ManualWalletTransactionResponse> {
        try {
            const response = await defaultApiService.post<{ data: ManualWalletTransactionResponse }>('/admin/wallets/debit', data);
            return response.data.data;
        } catch (error) {
            console.error('Error debiting wallet:', error);
            throw error;
        }
    }

    // Get user wallet details
    static async getUserWalletDetails(userId: number): Promise<UserWalletDetails> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(`/admin/wallets/users/${userId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching user wallet details:', error);
            throw error;
        }
    }

    // Get specific wallet
    static async getWallet(walletId: number): Promise<AdminWallet> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(`/admin/wallets/${walletId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching wallet:', error);
            throw error;
        }
    }

    // Get specific transaction
    static async getTransaction(transactionId: number): Promise<AdminWalletTransaction> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(`/admin/wallet-transactions/${transactionId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching transaction:', error);
            throw error;
        }
    }

    // Get specific withdrawal
    static async getWithdrawal(withdrawalId: number): Promise<AdminWithdrawal> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get(`/admin/withdrawals/${withdrawalId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching withdrawal:', error);
            throw error;
        }
    }

    // Get wallet dashboard
    static async getWalletDashboard(): Promise<AdminWalletDashboard> {
        try {
            // Use raw axios to avoid the transformApiResponse wrapper
            const response = await defaultApiService.raw.get('/admin/wallets/dashboard');
            return response.data.data || {
                summary: {
                    total_wallets: 0,
                    total_balance: '0.00',
                    pending_withdrawals: 0,
                    total_transactions_today: 0
                },
                recent_activity: [],
                charts: {
                    daily_transactions: [],
                    wallet_distribution: {}
                }
            };
        } catch (error) {
            console.error('Error fetching wallet dashboard:', error);
            throw error;
        }
    }

    // Export transactions to CSV
    static exportTransactionsCSV(params?: AdminWalletTransactionsParams): string {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
        if (params?.wallet_id) queryParams.append('wallet_id', params.wallet_id.toString());
        if (params?.type) queryParams.append('type', params.type);
        if (params?.category) queryParams.append('category', params.category);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.from_date) queryParams.append('from_date', params.from_date);
        if (params?.to_date) queryParams.append('to_date', params.to_date);
        if (params?.search) queryParams.append('search', params.search);

        return `/admin/wallet-transactions/export/csv${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    }

    // Export withdrawals to CSV
    static exportWithdrawalsCSV(params?: AdminWithdrawalsParams): string {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params?.user_id) queryParams.append('user_id', params.user_id.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.method) queryParams.append('method', params.method);
        if (params?.from_date) queryParams.append('from_date', params.from_date);
        if (params?.to_date) queryParams.append('to_date', params.to_date);
        if (params?.search) queryParams.append('search', params.search);

        return `/admin/withdrawals/export/csv${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    }
}

export default AdminWalletService;
