import { useState, useEffect, useCallback } from 'react';
import { MLMPlan, PurchaseRequest, PurchaseResponse } from '../types';
import { getPlans, getPlanById, purchasePlan } from '../services/api';

interface UsePlansReturn {
  plans: MLMPlan[];
  selectedPlan: MLMPlan | null;
  isLoading: boolean;
  error: string | null;
  purchaseLoading: boolean;
  purchaseError: string | null;
  fetchPlans: () => Promise<void>;
  selectPlan: (plan: MLMPlan) => void;
  clearSelection: () => void;
  purchaseSelectedPlan: (userId: string, paymentMethod: 'razorpay' | 'cashfree') => Promise<PurchaseResponse | null>;
  clearErrors: () => void;
}

export const usePlans = (): UsePlansReturn => {
  const [plans, setPlans] = useState<MLMPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MLMPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedPlans = await getPlans();
      setPlans(fetchedPlans);
    } catch (err) {
      setError('Failed to fetch plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectPlan = useCallback((plan: MLMPlan) => {
    setSelectedPlan(plan);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPlan(null);
  }, []);

  const purchaseSelectedPlan = useCallback(async (
    userId: string, 
    paymentMethod: 'razorpay' | 'cashfree'
  ): Promise<PurchaseResponse | null> => {
    if (!selectedPlan) {
      setPurchaseError('No plan selected');
      return null;
    }

    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      const request: PurchaseRequest = {
        planId: selectedPlan.id,
        userId,
        amount: selectedPlan.price,
        paymentMethod
      };

      const response = await purchasePlan(request);
      
      if (response.success) {
        // Clear selection after successful purchase
        setSelectedPlan(null);
        return response;
      } else {
        setPurchaseError(response.message || 'Purchase failed');
        return null;
      }
    } catch (err) {
      setPurchaseError('Network error occurred. Please try again.');
      return null;
    } finally {
      setPurchaseLoading(false);
    }
  }, [selectedPlan]);

  const clearErrors = useCallback(() => {
    setError(null);
    setPurchaseError(null);
  }, []);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    selectedPlan,
    isLoading,
    error,
    purchaseLoading,
    purchaseError,
    fetchPlans,
    selectPlan,
    clearSelection,
    purchaseSelectedPlan,
    clearErrors
  };
};
