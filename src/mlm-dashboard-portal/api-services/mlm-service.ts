import { defaultApiService } from './api-service-factory';
import { API_CONFIG } from './api-config';

// Types for MLM requests/responses
export interface MLMMember {
    id: number;
    userId: number;
    sponsorId?: number;
    uplineId?: number;
    level: number;
    position: 'left' | 'right';
    status: 'active' | 'inactive' | 'suspended';
    joinDate: string;
    totalSales: number;
    totalCommissions: number;
    rank: string;
    createdAt: string;
    updatedAt: string;
}

export interface GenealogyNode {
    id: number;
    userId: number;
    name: string;
    email: string;
    level: number;
    position: 'left' | 'right';
    status: string;
    children: GenealogyNode[];
    totalSales: number;
    totalCommissions: number;
}

export interface Commission {
    id: number;
    memberId: number;
    amount: number;
    type: 'direct' | 'indirect' | 'level' | 'bonus';
    level: number;
    description: string;
    status: 'pending' | 'approved' | 'paid';
    date: string;
    createdAt: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pv: number; // Point Value
    category: string;
    status: 'active' | 'inactive';
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: number;
    memberId: number;
    orderNumber: string;
    totalAmount: number;
    totalPV: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    pv: number;
}

// MLM service class
export class MLMService {
    // Get MLM members
    static async getMembers(
        page: number = 1,
        limit: number = 10,
        search?: string,
        filters?: Record<string, any>
    ): Promise<{ success: boolean; data: { members: MLMMember[]; pagination: any } }> {
        const params = {
            page,
            limit,
            ...(search && { search }),
            ...filters,
        };

        return defaultApiService.get(
            API_CONFIG.endpoints.mlm.members,
            params
        );
    }

    // Get single MLM member
    static async getMember(id: number | string): Promise<{ success: boolean; data: MLMMember }> {
        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.members}/${id}`
        );
    }

    // Get genealogy tree
    static async getGenealogy(
        memberId: number,
        levels: number = 3
    ): Promise<{ success: boolean; data: GenealogyNode }> {
        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.genealogy}/${memberId}`,
            { levels }
        );
    }

    // Get member commissions
    static async getCommissions(
        memberId: number,
        page: number = 1,
        limit: number = 20,
        filters?: Record<string, any>
    ): Promise<{ success: boolean; data: { commissions: Commission[]; pagination: any } }> {
        const params = {
            page,
            limit,
            ...filters,
        };

        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.commissions}/${memberId}`,
            params
        );
    }

    // Get products
    static async getProducts(
        page: number = 1,
        limit: number = 20,
        category?: string,
        search?: string
    ): Promise<{ success: boolean; data: { products: Product[]; pagination: any } }> {
        const params = {
            page,
            limit,
            ...(category && { category }),
            ...(search && { search }),
        };

        return defaultApiService.get(
            API_CONFIG.endpoints.mlm.products,
            params
        );
    }

    // Get single product
    static async getProduct(id: number | string): Promise<{ success: boolean; data: Product }> {
        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.products}/${id}`
        );
    }

    // Get member orders
    static async getOrders(
        memberId: number,
        page: number = 1,
        limit: number = 20,
        status?: string
    ): Promise<{ success: boolean; data: { orders: Order[]; pagination: any } }> {
        const params = {
            page,
            limit,
            ...(status && { status }),
        };

        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.orders}/${memberId}`,
            params
        );
    }

    // Get single order
    static async getOrder(id: number | string): Promise<{ success: boolean; data: Order }> {
        return defaultApiService.get(
            `${API_CONFIG.endpoints.mlm.orders}/${id}`
        );
    }

    // Create new order
    static async createOrder(orderData: {
        memberId: number;
        items: Array<{ productId: number; quantity: number }>;
    }): Promise<{ success: boolean; data: Order }> {
        return defaultApiService.post(
            API_CONFIG.endpoints.mlm.orders,
            orderData
        );
    }

    // Get dashboard statistics
    static async getDashboardStats(): Promise<{
        success: boolean;
        data: {
            totalMembers: number;
            activeMembers: number;
            totalSales: number;
            totalCommissions: number;
            newMembersThisMonth: number;
            salesThisMonth: number;
        };
    }> {
        return defaultApiService.get(API_CONFIG.endpoints.dashboard.stats);
    }

    // Get recent activity
    static async getRecentActivity(
        limit: number = 10
    ): Promise<{
        success: boolean;
        data: Array<{
            id: number;
            type: 'member_joined' | 'order_placed' | 'commission_earned';
            description: string;
            date: string;
            memberId?: number;
            orderId?: number;
        }>;
    }> {
        return defaultApiService.get(
            API_CONFIG.endpoints.dashboard.recentActivity,
            { limit }
        );
    }
}

export default MLMService;
