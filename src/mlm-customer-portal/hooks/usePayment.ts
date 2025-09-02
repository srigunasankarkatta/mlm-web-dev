import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaymentService, CreateOrderRequest, ConfirmOrderRequest } from '../api-services';
import { CustomerAuthService } from '../api-services/auth-service';
import { usePackagePurchase } from './usePackagePurchase';

interface PackageDetails {
    id: number; // Changed from string to number for API compatibility
    name: string;
    price: number;
    description: string;
}

export const usePayment = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);

    // Package purchase mutation
    const packagePurchaseMutation = usePackagePurchase();

    // Create order mutation (for dummy Razorpay)
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

    // Confirm order mutation (for dummy Razorpay)
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
        if (!selectedPackage) {
            throw new Error('No package selected');
        }

        console.log('Payment successful, calling package purchase API...');

        // Call the package purchase API directly
        await packagePurchaseMutation.mutateAsync({
            package_id: selectedPackage.id,
        });

        console.log('Package purchase completed successfully');

        // Close modal and reset state
        setIsPaymentModalOpen(false);
        setSelectedPackage(null);
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
        isProcessing: createOrderMutation.isPending || confirmOrderMutation.isPending || packagePurchaseMutation.isPending,
        createOrderError: createOrderMutation.error,
        confirmOrderError: confirmOrderMutation.error,
        packagePurchaseError: packagePurchaseMutation.error,
        isPurchasingPackage: packagePurchaseMutation.isPending,
    };
};
