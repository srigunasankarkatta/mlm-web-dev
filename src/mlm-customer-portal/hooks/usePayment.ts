import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaymentService, CreateOrderRequest, ConfirmOrderRequest } from '../api-services';
import { CustomerAuthService } from '../api-services/auth-service';

interface PackageDetails {
    id: number; // Changed from string to number for API compatibility
    name: string;
    price: number;
    description: string;
}

export const usePayment = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);

    // Create order mutation
    const createOrderMutation = useMutation({
        mutationFn: ({ orderData, userId }: { orderData: CreateOrderRequest; userId?: string }) =>
            PaymentService.createOrder(orderData, userId),
        onSuccess: (data) => {
            console.log('Order created successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to create order:', error);
        },
    });

    // Confirm order mutation
    const confirmOrderMutation = useMutation({
        mutationFn: ({ orderId, confirmationData }: { orderId: string; confirmationData: ConfirmOrderRequest }) =>
            PaymentService.confirmOrder(orderId, confirmationData),
        onSuccess: (data) => {
            console.log('Order confirmed successfully:', data);
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('paymentSuccess', { detail: data }));
        },
        onError: (error) => {
            console.error('Failed to confirm order:', error);
        },
    });

    const initiatePayment = (packageDetails: PackageDetails) => {
        setSelectedPackage(packageDetails);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = async (paymentToken: string) => {
        if (!selectedPackage) return;

        try {
            // Get current user ID for idempotency key
            const currentUser = CustomerAuthService.getCurrentUser();
            const userId = currentUser?.id?.toString() || currentUser?.email;

            // Step 1: Create order
            const orderData: CreateOrderRequest = {
                package_id: selectedPackage.id,
                payment_provider: 'razorpay',
            };

            const orderResponse = await createOrderMutation.mutateAsync({ orderData, userId });
            console.log('Order created:', orderResponse);

            // Step 2: Confirm order with payment token
            const confirmationData: ConfirmOrderRequest = {
                confirmation_token: paymentToken,
                payment_status: 'success',
            };

            await confirmOrderMutation.mutateAsync({
                orderId: orderResponse.order_id,
                confirmationData,
            });

            // Close modal and reset state
            setIsPaymentModalOpen(false);
            setSelectedPackage(null);

        } catch (error) {
            console.error('Payment process failed:', error);
            // Handle error - could show error message to user
        }
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setSelectedPackage(null);
    };

    return {
        isPaymentModalOpen,
        selectedPackage,
        initiatePayment,
        handlePaymentSuccess,
        closePaymentModal,
        isCreatingOrder: createOrderMutation.isPending,
        isConfirmingOrder: confirmOrderMutation.isPending,
        isProcessing: createOrderMutation.isPending || confirmOrderMutation.isPending,
        createOrderError: createOrderMutation.error,
        confirmOrderError: confirmOrderMutation.error,
    };
};
