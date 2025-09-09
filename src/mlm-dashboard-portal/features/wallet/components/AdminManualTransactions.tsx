import React, { useState } from "react";
import {
  useManualWalletCredit,
  useManualWalletDebit,
} from "../../../hooks/useAdminWallet";
import { useAdminWalletUtils } from "../../../hooks/useAdminWallet";
import styles from "./AdminManualTransactions.module.scss";

const AdminManualTransactions: React.FC = () => {
  const creditWallet = useManualWalletCredit();
  const debitWallet = useManualWalletDebit();
  const { formatCurrency } = useAdminWalletUtils();

  const [activeTab, setActiveTab] = useState<"credit" | "debit">("credit");
  const [formData, setFormData] = useState({
    user_id: "",
    wallet_type: "earning",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const walletTypes = [
    { value: "earning", label: "Earning" },
    { value: "bonus", label: "Bonus" },
    { value: "reward", label: "Reward" },
    { value: "holding", label: "Holding" },
    { value: "commission", label: "Commission" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.user_id) {
      newErrors.user_id = "User ID is required";
    } else if (isNaN(Number(formData.user_id))) {
      newErrors.user_id = "User ID must be a number";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      user_id: Number(formData.user_id),
      wallet_type: formData.wallet_type,
      amount: Number(formData.amount),
      description: formData.description,
    };

    try {
      if (activeTab === "credit") {
        await creditWallet.mutateAsync(submitData);
      } else {
        await debitWallet.mutateAsync(submitData);
      }

      // Reset form
      setFormData({
        user_id: "",
        wallet_type: "earning",
        amount: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className={styles.manualTransactions}>
      <div className={styles.header}>
        <h2>Manual Wallet Transactions</h2>
        <p>Manually credit or debit user wallets</p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "credit" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("credit")}
        >
          <i className="icon-plus"></i>
          Credit Wallet
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "debit" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("debit")}
        >
          <i className="icon-minus"></i>
          Debit Wallet
        </button>
      </div>

      {/* Transaction Form */}
      <div className={styles.transactionForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="user_id">User ID *</label>
              <input
                type="number"
                id="user_id"
                value={formData.user_id}
                onChange={(e) => handleInputChange("user_id", e.target.value)}
                placeholder="Enter user ID"
                className={`${styles.formInput} ${
                  errors.user_id ? styles.error : ""
                }`}
              />
              {errors.user_id && (
                <span className={styles.errorText}>{errors.user_id}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="wallet_type">Wallet Type *</label>
              <select
                id="wallet_type"
                value={formData.wallet_type}
                onChange={(e) =>
                  handleInputChange("wallet_type", e.target.value)
                }
                className={styles.formSelect}
              >
                {walletTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="amount">Amount *</label>
              <div className={styles.amountInput}>
                <span className={styles.currencySymbol}>₹</span>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`${styles.formInput} ${
                    errors.amount ? styles.error : ""
                  }`}
                />
              </div>
              {errors.amount && (
                <span className={styles.errorText}>{errors.amount}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter transaction description..."
                rows={3}
                className={`${styles.formTextarea} ${
                  errors.description ? styles.error : ""
                }`}
              />
              {errors.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  user_id: "",
                  wallet_type: "earning",
                  amount: "",
                  description: "",
                });
                setErrors({});
              }}
              className={styles.resetButton}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`${styles.submitButton} ${styles[activeTab]}`}
              disabled={creditWallet.isPending || debitWallet.isPending}
            >
              {creditWallet.isPending || debitWallet.isPending ? (
                "Processing..."
              ) : (
                <>
                  <i
                    className={`icon-${
                      activeTab === "credit" ? "plus" : "minus"
                    }`}
                  ></i>
                  {activeTab === "credit" ? "Credit Wallet" : "Debit Wallet"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Transaction History */}
      <div className={styles.transactionHistory}>
        <h3>Recent Manual Transactions</h3>
        <div className={styles.historyList}>
          {/* This would typically show recent manual transactions */}
          <div className={styles.historyItem}>
            <div className={styles.historyIcon}>
              <i className="icon-plus"></i>
            </div>
            <div className={styles.historyContent}>
              <h4>Manual Credit</h4>
              <p>User ID: 123 - Earning Wallet</p>
              <span className={styles.historyAmount}>+₹500.00</span>
            </div>
            <div className={styles.historyDate}>
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className={styles.guidelines}>
        <h3>Guidelines</h3>
        <ul>
          <li>Always verify the user ID before processing transactions</li>
          <li>Provide clear descriptions for audit purposes</li>
          <li>Double-check amounts before submitting</li>
          <li>
            Use appropriate wallet types for different transaction purposes
          </li>
          <li>Keep records of all manual transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminManualTransactions;
