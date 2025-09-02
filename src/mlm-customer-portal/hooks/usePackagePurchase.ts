import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPackageService, PurchasePackageRequest, PurchasePackageResponse } from '../api-services/package-service';

export const usePackagePurchase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: PurchasePackageRequest): Promise<PurchasePackageResponse> => {
            return customerPackageService.purchasePackage(data);
        },
        onSuccess: (data: PurchasePackageResponse) => {
            console.log('Package purchased successfully:', data);

            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
            queryClient.invalidateQueries({ queryKey: ['packages'] });
            queryClient.invalidateQueries({ queryKey: ['user-packages'] });

            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('packagePurchased', { detail: data }));
        },
        onError: (error: any) => {
            console.error('Package purchase failed:', error);
        },
    });
};