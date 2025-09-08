import { defaultApiService } from './api-service-factory';

// Types for Transactions API
export interface Transaction {
    id: number;
    user_id: number;
    package_id: number;
    amount: string;
    type: 'purchase' | 'commission' | 'bonus' | 'withdrawal' | 'refund';
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    payment_method: 'bank_transfer' | 'razorpay' | 'cashfree' | 'wallet' | 'cash';
    transaction_id: string;
    description: string;
    metadata?: {
        package_name: string;
        level_unlock: number;
        previous_package_id?: number;
        purchase_date: string;
    };
    created_at: string;
    updated_at: string;
    package: {
        id: number;
        name: string;
        price: string;
        level_unlock: number;
        created_at: string;
        updated_at: string;
    };
}

export interface TransactionsResponse {
    status: boolean;
    message: string;
    data: {
        transactions: Transaction[];
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
}

export interface TransactionsParams {
    package_id?: number;
    type?: string;
    status?: string;
    payment_method?: string;
    per_page?: number;
    page?: number;
    start_date?: string;
    end_date?: string;
}

export interface TransactionsListResponse {
    status: boolean;
    message: string;
    data: {
        transactions: Transaction[];
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
}

class TransactionsService {
    private baseUrl = '/transactions';

    /**
     * Get transactions for a specific package
     */
    async getPackageTransactions(packageId: number): Promise<TransactionsResponse> {
        const response = await defaultApiService.get<TransactionsResponse>(
            `${this.baseUrl}/package/${packageId}`
        );
        return response.data;
    }

    /**
     * Get all user transactions with filters and pagination
     */
    async getTransactions(params: TransactionsParams = {}): Promise<TransactionsListResponse> {
        const queryParams = new URLSearchParams();

        if (params.package_id) queryParams.append('package_id', params.package_id.toString());
        if (params.type) queryParams.append('type', params.type);
        if (params.status) queryParams.append('status', params.status);
        if (params.payment_method) queryParams.append('payment_method', params.payment_method);
        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.start_date) queryParams.append('start_date', params.start_date);
        if (params.end_date) queryParams.append('end_date', params.end_date);

        const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get<TransactionsListResponse>(url);
        return response.data;
    }

    /**
     * Get transaction by ID
     */
    async getTransactionById(transactionId: number): Promise<{
        success: boolean;
        message: string;
        data: Transaction;
    }> {
        const response = await defaultApiService.get<{
            success: boolean;
            message: string;
            data: Transaction;
        }>(`${this.baseUrl}/${transactionId}`);
        return response.data;
    }

    /**
     * Get transaction summary/statistics
     */
    async getTransactionSummary(): Promise<{
        success: boolean;
        message: string;
        data: {
            total_transactions: number;
            total_amount: string;
            completed_transactions: number;
            pending_transactions: number;
            failed_transactions: number;
            total_purchases: string;
            total_commissions: string;
            total_bonuses: string;
            total_withdrawals: string;
            by_payment_method: Array<{
                method: string;
                count: number;
                total_amount: string;
            }>;
            by_status: Array<{
                status: string;
                count: number;
                total_amount: string;
            }>;
            by_type: Array<{
                type: string;
                count: number;
                total_amount: string;
            }>;
        };
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/summary`);
        return response.data;
    }

    /**
     * Export transactions to CSV
     */
    async exportTransactions(params: TransactionsParams = {}): Promise<Blob> {
        const queryParams = new URLSearchParams();

        if (params.package_id) queryParams.append('package_id', params.package_id.toString());
        if (params.type) queryParams.append('type', params.type);
        if (params.status) queryParams.append('status', params.status);
        if (params.payment_method) queryParams.append('payment_method', params.payment_method);
        if (params.start_date) queryParams.append('start_date', params.start_date);
        if (params.end_date) queryParams.append('end_date', params.end_date);

        const url = `${this.baseUrl}/export${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await defaultApiService.get(url, {
            responseType: 'blob',
        });
        return response.data;
    }

    /**
     * Get transaction types for filter dropdown
     */
    async getTransactionTypes(): Promise<{
        success: boolean;
        message: string;
        data: Array<{
            value: string;
            label: string;
            count: number;
        }>;
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/types`);
        return response.data;
    }

    /**
     * Get payment methods for filter dropdown
     */
    async getPaymentMethods(): Promise<{
        success: boolean;
        message: string;
        data: Array<{
            value: string;
            label: string;
            count: number;
        }>;
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/payment-methods`);
        return response.data;
    }

    /**
     * Get transaction statuses for filter dropdown
     */
    async getTransactionStatuses(): Promise<{
        success: boolean;
        message: string;
        data: Array<{
            value: string;
            label: string;
            count: number;
        }>;
    }> {
        const response = await defaultApiService.get(`${this.baseUrl}/statuses`);
        return response.data;
    }
}

export const transactionsService = new TransactionsService();
export default transactionsService;
