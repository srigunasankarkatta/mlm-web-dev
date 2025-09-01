export interface ValidationErrorResponse {
    title: string;
    message: string;
    errors: Record<string, string[]>;
    statusCode: number;
}

export interface ApiError {
    type: 'validation' | 'network' | 'server';
    fieldErrors?: Record<string, string>;
    message: string;
    statusCode: number;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    statusCode?: number;
}
