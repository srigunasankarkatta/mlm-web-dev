import React, { useState, useEffect } from "react";
import type {
  WithdrawalRequest,
  WithdrawalLimits,
} from "../api-services/wallet-service";
import { useWalletUtils } from "../hooks/useWallet";
import styles from "./WithdrawalForm.module.scss";

interface WithdrawalFormProps {
  limits?: WithdrawalLimits;
  onSubmit: (data: WithdrawalRequest) => void;
  isLoading?: boolean;
  className?: string;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  limits,
  onSubmit,
  isLoading = false,
  className = "",
}) => {
  const { formatCurrency } = useWalletUtils();

  const [formData, setFormData] = useState<WithdrawalRequest>({
    wallet_type: "earning",
    amount: 0,
    method: "bank_transfer",
    payment_details: {
      account_name: "",
      account_number: "",
      bank_name: "",
      routing_number: "",
    },
    user_notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calculatedFee, setCalculatedFee] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  // Calculate fee and net amount when amount changes
  useEffect(() => {
    if (limits && formData.amount > 0) {
      const feePercentage =
        parseFloat(limits.withdrawal_fee_percentage || "0") / 100;
      const fee = formData.amount * feePercentage;
      const net = formData.amount - fee;

      setCalculatedFee(fee);
      setNetAmount(net);
    }
  }, [formData.amount, limits]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Debug: Log limits data to understand what we're receiving
    if (limits) {
      console.log("Withdrawal limits data:", limits);
    }

    // Amount validation
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount is required and must be greater than 0";
    } else if (limits) {
      const minAmount = limits.minimum_withdrawal
        ? parseFloat(limits.minimum_withdrawal)
        : null;
      const maxAmount = limits.maximum_withdrawal
        ? parseFloat(limits.maximum_withdrawal)
        : null;
      const availableAmount = limits.available_for_withdrawal
        ? parseFloat(limits.available_for_withdrawal)
        : null;

      if (minAmount && !isNaN(minAmount) && formData.amount < minAmount) {
        newErrors.amount = `Minimum withdrawal amount is ${formatCurrency(
          minAmount
        )}`;
      } else if (
        maxAmount &&
        !isNaN(maxAmount) &&
        formData.amount > maxAmount
      ) {
        newErrors.amount = `Maximum withdrawal amount is ${formatCurrency(
          maxAmount
        )}`;
      } else if (
        availableAmount &&
        !isNaN(availableAmount) &&
        formData.amount > availableAmount
      ) {
        newErrors.amount = `Insufficient balance. Available: ${formatCurrency(
          availableAmount
        )}`;
      }
    }

    // Payment details validation
    if (!formData.payment_details.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!formData.payment_details.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    } else if (!/^\d{9,18}$/.test(formData.payment_details.account_number)) {
      newErrors.account_number = "Account number must be 9-18 digits";
    }

    if (!formData.payment_details.account_name.trim()) {
      newErrors.account_name = "Account holder name is required";
    }

    if (!formData.payment_details.routing_number.trim()) {
      newErrors.routing_number = "Routing number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handlePaymentDetailChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      payment_details: {
        ...prev.payment_details,
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      wallet_type: "earning",
      amount: 0,
      method: "bank_transfer",
      payment_details: {
        bank_name: "",
        account_number: "",
        account_name: "",
        routing_number: "",
      },
      user_notes: "",
    });
    setErrors({});
    setCalculatedFee(0);
    setNetAmount(0);
  };

  return (
    <div className={`${styles.withdrawalForm} ${className}`}>
      <div className={styles.formHeader}>
        <h2>Request Withdrawal</h2>
        <p>Withdraw funds from your wallet to your bank account</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Wallet Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="wallet_type">Select Wallet</label>
          <select
            id="wallet_type"
            value={formData.wallet_type}
            onChange={(e) => handleInputChange("wallet_type", e.target.value)}
            className={styles.formSelect}
          >
            <option value="earning">Earning Wallet</option>
            <option value="bonus">Bonus Wallet</option>
            <option value="reward">Reward Wallet</option>
            <option value="commission">Commission Wallet</option>
          </select>
          {errors.wallet_type && (
            <span className={styles.errorText}>{errors.wallet_type}</span>
          )}
        </div>

        {/* Amount */}
        <div className={styles.formGroup}>
          <label htmlFor="amount">Withdrawal Amount</label>
          <div className={styles.amountInput}>
            <span className={styles.currencySymbol}>₹</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount || ""}
              onChange={(e) =>
                handleInputChange("amount", parseFloat(e.target.value) || 0)
              }
              className={`${styles.formInput} ${
                errors.amount ? styles.error : ""
              }`}
              placeholder="Enter amount"
            />
          </div>
          {errors.amount && (
            <span className={styles.errorText}>{errors.amount}</span>
          )}
          {limits ? (
            <div className={styles.amountLimits}>
              <span>
                Min:{" "}
                {limits.minimum_withdrawal
                  ? formatCurrency(limits.minimum_withdrawal)
                  : "Not set"}
              </span>
              <span>
                Max:{" "}
                {limits.maximum_withdrawal
                  ? formatCurrency(limits.maximum_withdrawal)
                  : "Not set"}
              </span>
              <span>
                Available:{" "}
                {limits.available_for_withdrawal
                  ? formatCurrency(limits.available_for_withdrawal)
                  : "Not available"}
              </span>
            </div>
          ) : (
            <div className={styles.amountLimits}>
              <span>Loading withdrawal limits...</span>
            </div>
          )}
        </div>

        {/* Fee Calculation */}
        {limits && formData.amount > 0 && limits.withdrawal_fee_percentage && (
          <div className={styles.feeCalculation}>
            <div className={styles.feeRow}>
              <span>Withdrawal Amount:</span>
              <span>{formatCurrency(formData.amount)}</span>
            </div>
            <div className={styles.feeRow}>
              <span>
                Processing Fee ({limits.withdrawal_fee_percentage || "0"}%):
              </span>
              <span>-{formatCurrency(calculatedFee)}</span>
            </div>
            <div className={styles.feeRowTotal}>
              <span>Net Amount:</span>
              <span>{formatCurrency(netAmount)}</span>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className={styles.formGroup}>
          <label htmlFor="method">Payment Method</label>
          <select
            id="method"
            value={formData.method}
            onChange={(e) => handleInputChange("method", e.target.value)}
            className={styles.formSelect}
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="upi">UPI</option>
            <option value="wallet">Digital Wallet</option>
          </select>
        </div>

        {/* Bank Details */}
        <div className={styles.paymentDetails}>
          <h3>Payment Details</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bank_name">Bank Name</label>
              <input
                id="bank_name"
                type="text"
                value={formData.payment_details.bank_name}
                onChange={(e) =>
                  handlePaymentDetailChange("bank_name", e.target.value)
                }
                className={`${styles.formInput} ${
                  errors.bank_name ? styles.error : ""
                }`}
                placeholder="Enter bank name"
              />
              {errors.bank_name && (
                <span className={styles.errorText}>{errors.bank_name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="account_number">Account Number</label>
              <input
                id="account_number"
                type="text"
                value={formData.payment_details.account_number}
                onChange={(e) =>
                  handlePaymentDetailChange("account_number", e.target.value)
                }
                className={`${styles.formInput} ${
                  errors.account_number ? styles.error : ""
                }`}
                placeholder="Enter account number"
              />
              {errors.account_number && (
                <span className={styles.errorText}>
                  {errors.account_number}
                </span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="account_name">Account Holder Name</label>
              <input
                id="account_name"
                type="text"
                value={formData.payment_details.account_name}
                onChange={(e) =>
                  handlePaymentDetailChange("account_name", e.target.value)
                }
                className={`${styles.formInput} ${
                  errors.account_name ? styles.error : ""
                }`}
                placeholder="Enter account holder name"
              />
              {errors.account_name && (
                <span className={styles.errorText}>{errors.account_name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="routing_number">Routing Number</label>
              <input
                id="routing_number"
                type="text"
                value={formData.payment_details.routing_number}
                onChange={(e) =>
                  handlePaymentDetailChange("routing_number", e.target.value)
                }
                className={`${styles.formInput} ${
                  errors.routing_number ? styles.error : ""
                }`}
                placeholder="Enter routing number"
              />
              {errors.routing_number && (
                <span className={styles.errorText}>
                  {errors.routing_number}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.formGroup}>
          <label htmlFor="user_notes">Notes (Optional)</label>
          <textarea
            id="user_notes"
            value={formData.user_notes}
            onChange={(e) => handleInputChange("user_notes", e.target.value)}
            className={styles.formTextarea}
            placeholder="Add any additional notes..."
            rows={3}
          />
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit Withdrawal Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;
