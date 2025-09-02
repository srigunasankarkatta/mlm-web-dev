import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Income History Types
export interface IncomeTransaction {
    id: number;
    type: string;
    amount: string;
    remark: string;
    date: string;
    formatted_date: string;
    time: string;
}

export interface IncomeByType {
    count: number;
    total_amount: string;
}

export interface IncomeSummary {
    total_income: string;
    total_transactions: number;
    income_by_type: Record<string, IncomeByType>;
}

export interface PaginationInfo {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more_pages: boolean;
}

export interface IncomeHistoryResponse {
    status: boolean;
    message: string;
    data: {
        incomes: IncomeTransaction[];
        pagination: PaginationInfo;
        summary: IncomeSummary;
    };
}

export interface IncomeHistoryRequest {
    page?: number;
    per_page?: number;
    type?: string;
    date_from?: string;
    date_to?: string;
}

// Income Service
export class IncomeService {
    /**
     * Fetch income history with pagination and filters
     */
    static async getIncomeHistory(params: IncomeHistoryRequest = {}): Promise<IncomeHistoryResponse> {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.per_page) queryParams.append('per_page', params.per_page.toString());
        if (params.type) queryParams.append('type', params.type);
        if (params.date_from) queryParams.append('date_from', params.date_from);
        if (params.date_to) queryParams.append('date_to', params.date_to);

        const endpoint = `${API_CONFIG.endpoints.user.incomeHistory}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return defaultApiService.get(endpoint);
    }

    /**
     * Get income summary only
     */
    static async getIncomeSummary(): Promise<IncomeSummary> {
        const response = await this.getIncomeHistory({ per_page: 1 });
        return response.data.summary;
    }

    /**
     * Get income by type
     */
    static async getIncomeByType(type: string, params: IncomeHistoryRequest = {}): Promise<IncomeHistoryResponse> {
        return this.getIncomeHistory({ ...params, type });
    }

    /**
     * Get income for date range
     */
    static async getIncomeByDateRange(
        dateFrom: string,
        dateTo: string,
        params: IncomeHistoryRequest = {}
    ): Promise<IncomeHistoryResponse> {
        return this.getIncomeHistory({ ...params, date_from: dateFrom, date_to: dateTo });
    }
}

export default IncomeService;
