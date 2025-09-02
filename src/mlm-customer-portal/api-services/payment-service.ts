import { defaultApiService } from './api-service-factory';

export interface CreateOrderRequest {
    package_id: number;
    payment_provider: string;
}

export interface CreateOrderResponse {
    order_id: string;
    status: string;
    amount: number;
    currency: string;
    created_at: string;
}

export interface ConfirmOrderRequest {
    confirmation_token: string;
    payment_status: string;
}

export interface ConfirmOrderResponse {
    order_id: string;
    status: string;
    payment_status: string;
    confirmed_at: string;
}

export class PaymentService {
    /**
     * Generate a simple UUID-like string
     */
    private static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Generate a unique idempotency key for order creation
     * Format: order-{timestamp}-{packageId}-{userId}-{uuid}
     * This ensures uniqueness even if the same user tries to create the same order multiple times
     */
    private static generateIdempotencyKey(packageId: number, userId?: string): string {
        const timestamp = Date.now();
        const userIdentifier = userId || 'anonymous';
        const uuid = this.generateUUID();

        // Use multiple approaches for maximum uniqueness
        return `order-${timestamp}-${packageId}-${userIdentifier}-${uuid}`;
    }

    /**
     * Create a new order for package purchase
     */
    static async createOrder(orderData: CreateOrderRequest, userId?: string): Promise<CreateOrderResponse> {
        try {
            // Generate unique idempotency key
            const idempotencyKey = this.generateIdempotencyKey(orderData.package_id, userId);

            console.log('Creating order with:', {
                orderData,
                userId,
                idempotencyKey,
                headers: {
                    'Idempotency-Key': idempotencyKey
                }
            });

            const response = await defaultApiService.post('/orders', orderData, {
                headers: {
                    'Idempotency-Key': idempotencyKey
                }
            });

            console.log('Order creation response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw error;
        }
    }

    /**
     * Confirm payment for an order
     */
    static async confirmOrder(
        orderId: string,
        confirmationData: ConfirmOrderRequest
    ): Promise<ConfirmOrderResponse> {
        try {
            console.log('Confirming order with:', {
                orderId,
                confirmationData
            });

            const response = await defaultApiService.post(
                `/orders/${orderId}/confirm`,
                confirmationData
            );

            console.log('Order confirmation response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error confirming order:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw error;
        }
    }

    /**
     * Get order details by ID
     */
    static async getOrder(orderId: string): Promise<CreateOrderResponse> {
        try {
            const response = await defaultApiService.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }

    /**
     * Get user's order history
     */
    static async getOrderHistory(): Promise<CreateOrderResponse[]> {
        try {
            const response = await defaultApiService.get('/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
    }
}
