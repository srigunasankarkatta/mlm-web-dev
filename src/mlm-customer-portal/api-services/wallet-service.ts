import { defaultApiService } from './api-service-factory';

// Wallet Types
export interface WalletBalance {
    type: string;
    display_name: string;
    balance: string;
    pending_balance: string;
    withdrawn_balance: string;
    available_balance: string;
    total_balance: string;
    is_active: boolean;
    withdrawal_enabled: boolean;
    icon: string;
    color: string;
}

export interface WalletsData {
    wallets: {
        earning: WalletBalance;
        bonus: WalletBalance;
        reward: WalletBalance;
        holding: WalletBalance;
        commission: WalletBalance;
    };
    total_balance: string;
    total_available: string;
}

export interface WalletTransaction {
    id: number;
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
    formatted_date: string;
    formatted_time: string;
    icon: string;
    color: string;
}

export interface WalletTransactionsResponse {
    transactions: WalletTransaction[];
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

export interface WalletSummary {
    total_balance: string;
    total_available: string;
    total_pending: string;
    total_withdrawn: string;
    wallet_breakdown: {
        earning: string;
        bonus: string;
        reward: string;
        holding: string;
        commission: string;
    };
    monthly_summary: {
        current_month_credits: string;
        current_month_debits: string;
        net_change: string;
    };
    transaction_counts: {
        total_transactions: number;
        credit_transactions: number;
        debit_transactions: number;
    };
}

export interface DashboardStats {
    overview: {
        total_balance: string;
        total_earnings: string;
        total_withdrawals: string;
        net_worth: string;
    };
    recent_activity: Array<{
        type: string;
        description: string;
        amount: string;
        date: string;
        icon: string;
        color: string;
    }>;
    monthly_trends: {
        current_month: string;
        last_month: string;
        growth_percentage: string;
    };
    wallet_distribution: Array<{
        type: string;
        name: string;
        amount: string;
        percentage: string;
        color: string;
    }>;
}

export interface WithdrawalRequest {
    wallet_type: string;
    amount: number;
    method: string;
    payment_details: {
        account_name: string;
        account_number: string;
        bank_name: string;
        routing_number: string;
    };
    user_notes?: string;
}

export interface WithdrawalResponse {
    withdrawal_id: string;
    amount: string;
    fee: string;
    net_amount: string;
    method_display_name: string;
    status_display_name: string;
    formatted_date: string;
    icon: string;
    color: string;
}

export interface Withdrawal {
    id: number;
    withdrawal_id: string;
    wallet_type: string;
    wallet_display_name: string;
    amount: string;
    fee: string;
    net_amount: string;
    method: string;
    method_display_name: string;
    status: string;
    status_display_name: string;
    user_notes?: string;
    admin_notes?: string;
    processed_at: string;
    formatted_date: string;
    icon: string;
    color: string;
}

export interface WithdrawalsResponse {
    withdrawals: Withdrawal[];
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

export interface WithdrawalLimits {
    daily_limit: string;
    monthly_limit: string;
    minimum_withdrawal: string;
    maximum_withdrawal: string;
    withdrawal_fee_percentage: string;
    available_for_withdrawal: string;
    daily_used: string;
    monthly_used: string;
    remaining_daily: string;
    remaining_monthly: string;
}

// API Response Types
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// Query Parameters
export interface TransactionQueryParams {
    page?: number;
    per_page?: number;
    type?: string;
    category?: string;
    from_date?: string;
    to_date?: string;
}

export interface WithdrawalQueryParams {
    page?: number;
    per_page?: number;
    status?: string;
    from_date?: string;
    to_date?: string;
}

// Wallet API Service
export class WalletService {
    // Get wallet balances
    static async getWalletBalance(): Promise<WalletsData> {
        try {
            const response = await defaultApiService.get<ApiResponse<WalletsData>>('/wallet/balance');
            return response.data.data || {
                wallets: {
                    earning: { display_name: 'Earning', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'dollar-sign', color: 'green' },
                    bonus: { display_name: 'Bonus', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'gift', color: 'blue' },
                    reward: { display_name: 'Reward', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'star', color: 'yellow' },
                    holding: { display_name: 'Holding', balance: '0.00', available_balance: '0.00', withdrawal_enabled: false, icon: 'lock', color: 'gray' },
                    commission: { display_name: 'Commission', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'percent', color: 'purple' }
                },
                total_balance: '0.00',
                total_available: '0.00'
            };
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
            return {
                wallets: {
                    earning: { display_name: 'Earning', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'dollar-sign', color: 'green' },
                    bonus: { display_name: 'Bonus', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'gift', color: 'blue' },
                    reward: { display_name: 'Reward', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'star', color: 'yellow' },
                    holding: { display_name: 'Holding', balance: '0.00', available_balance: '0.00', withdrawal_enabled: false, icon: 'lock', color: 'gray' },
                    commission: { display_name: 'Commission', balance: '0.00', available_balance: '0.00', withdrawal_enabled: true, icon: 'percent', color: 'purple' }
                },
                total_balance: '0.00',
                total_available: '0.00'
            };
        }
    }

    // Get wallet transactions
    static async getWalletTransactions(params?: TransactionQueryParams): Promise<WalletTransactionsResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params?.type) queryParams.append('type', params.type);
        if (params?.category) queryParams.append('category', params.category);
        if (params?.from_date) queryParams.append('from_date', params.from_date);
        if (params?.to_date) queryParams.append('to_date', params.to_date);

        const url = `/wallet/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await defaultApiService.get<ApiResponse<WalletTransactionsResponse>>(url);
        return response.data.data;
    }

    // Get wallet summary
    static async getWalletSummary(): Promise<WalletSummary> {
        const response = await defaultApiService.get<ApiResponse<WalletSummary>>('/wallet/summary');
        return response.data.data;
    }

    // Get dashboard stats
    static async getDashboardStats(): Promise<DashboardStats> {
        try {
            const response = await defaultApiService.get<ApiResponse<DashboardStats>>('/wallet/dashboard-stats');
            return response.data.data || {
                overview: {
                    total_balance: '0.00',
                    total_earnings: '0.00',
                    total_withdrawals: '0.00',
                    net_worth: '0.00'
                },
                recent_activity: []
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return {
                overview: {
                    total_balance: '0.00',
                    total_earnings: '0.00',
                    total_withdrawals: '0.00',
                    net_worth: '0.00'
                },
                recent_activity: []
            };
        }
    }

    // Request withdrawal
    static async requestWithdrawal(data: WithdrawalRequest): Promise<WithdrawalResponse> {
        const response = await defaultApiService.post<ApiResponse<WithdrawalResponse>>('/wallet/withdraw', data);
        return response.data.data;
    }

    // Get withdrawal history
    static async getWithdrawals(params?: WithdrawalQueryParams): Promise<WithdrawalsResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.from_date) queryParams.append('from_date', params.from_date);
        if (params?.to_date) queryParams.append('to_date', params.to_date);

        const url = `/wallet/withdrawals${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await defaultApiService.get<ApiResponse<WithdrawalsResponse>>(url);
        return response.data.data;
    }

    // Get withdrawal limits
    static async getWithdrawalLimits(): Promise<WithdrawalLimits> {
        const response = await defaultApiService.get<ApiResponse<WithdrawalLimits>>('/wallet/withdrawal-limits');
        return response.data.data;
    }
}

export default WalletService;
