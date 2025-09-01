import React, { useState } from 'react';
import { MLMPlan } from '../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: MLMPlan | null;
  onConfirm: (paymentMethod: 'razorpay' | 'cashfree') => void;
  isLoading?: boolean;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ 
  isOpen, 
  onClose, 
  plan, 
  onConfirm, 
  isLoading = false 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'razorpay' | 'cashfree'>('razorpay');

  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    onConfirm(selectedPaymentMethod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Confirm Purchase
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Plan Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-teal-600 mb-2">${plan.price}</div>
              {plan.isRequired && (
                <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">
                  Required
                </span>
              )}
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">What you'll get:</h4>
              <ul className="space-y-2">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Select Payment Method</h4>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-teal-300 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={selectedPaymentMethod === 'razorpay'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value as 'razorpay' | 'cashfree')}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">R</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Razorpay</p>
                      <p className="text-sm text-gray-600">Credit/Debit Cards, UPI, Net Banking</p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-teal-300 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashfree"
                  checked={selectedPaymentMethod === 'cashfree'}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value as 'razorpay' | 'cashfree')}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">C</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Cashfree</p>
                      <p className="text-sm text-gray-600">Cards, UPI, Wallets, Net Banking</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">Total Amount:</span>
              <span className="text-2xl font-bold text-teal-600">${plan.price}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              * No additional charges or hidden fees
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Pay $${plan.price}`
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure payment powered by {selectedPaymentMethod === 'razorpay' ? 'Razorpay' : 'Cashfree'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
