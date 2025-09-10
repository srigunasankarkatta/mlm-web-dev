import React, { useState } from "react";
import type {
  WalletTransaction,
  TransactionQueryParams,
} from "../api-services/wallet-service";
import { useWalletUtils } from "../hooks/useWallet";
import styles from "./TransactionList.module.scss";

interface TransactionListProps {
  transactions: WalletTransaction[];
  isLoading?: boolean;
  onFilterChange?: (filters: TransactionQueryParams) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading = false,
  onFilterChange,
  onLoadMore,
  hasMore = false,
  className = "",
}) => {
  const {
    formatCurrency,
    getTransactionIcon,
    getTransactionColor,
    getStatusColor,
  } = useWalletUtils();
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(
    null
  );

  const handleTransactionClick = (transactionId: number) => {
    setSelectedTransaction(
      selectedTransaction === transactionId ? null : transactionId
    );
  };

  const handleFilterChange = (type: string, value: string) => {
    if (onFilterChange) {
      onFilterChange({ [type]: value || undefined });
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.transactionList} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.transactionList} ${className}`}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="type-filter">Type:</label>
          <select
            id="type-filter"
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="transfer_in">Transfer In</option>
            <option value="transfer_out">Transfer Out</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Categories</option>
            <option value="direct_income">Direct Income</option>
            <option value="level_income">Level Income</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="bonus">Bonus</option>
            <option value="commission">Commission</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="from-date">From Date:</label>
          <input
            id="from-date"
            type="date"
            onChange={(e) => handleFilterChange("from_date", e.target.value)}
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="to-date">To Date:</label>
          <input
            id="to-date"
            type="date"
            onChange={(e) => handleFilterChange("to_date", e.target.value)}
            className={styles.filterInput}
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className={styles.transactionContainer}>
        {transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="icon-inbox"></i>
            </div>
            <h3>No transactions found</h3>
            <p>There are no transactions matching your current filters.</p>
          </div>
        ) : (
          <div className={styles.transactionItems}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`${styles.transactionItem} ${
                  selectedTransaction === transaction.id ? styles.selected : ""
                }`}
                onClick={() => handleTransactionClick(transaction.id)}
              >
                <div className={styles.transactionMain}>
                  <div className={styles.transactionIcon}>
                    <i
                      className={`icon-${getTransactionIcon(transaction.type)}`}
                    ></i>
                  </div>

                  <div className={styles.transactionDetails}>
                    <div className={styles.transactionHeader}>
                      <h4 className={styles.transactionDescription}>
                        {transaction.description || "No description"}
                      </h4>
                      <div className={styles.transactionAmount}>
                        <span
                          className={`${styles.amount} ${
                            transaction.type === "credit"
                              ? styles.credit
                              : styles.debit
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {(transaction.amount)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.transactionMeta}>
                      <div className={styles.transactionInfo}>
                        <span className={styles.walletName}>
                          {transaction.wallet_display_name || "Unknown Wallet"}
                        </span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.category}>
                          {transaction.category
                            ? transaction.category
                                .replace("_", " ")
                                .toUpperCase()
                            : "N/A"}
                        </span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.referenceId}>
                          {transaction.reference_id || "N/A"}
                        </span>
                      </div>
                      <div className={styles.transactionTime}>
                        <span className={styles.date}>
                          {transaction.formatted_date || "N/A"}
                        </span>
                        <span className={styles.time}>
                          {transaction.formatted_time || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.transactionStatus}>
                    <span
                      className={`${styles.status} ${
                        styles[getStatusColor(transaction.status)]
                      }`}
                    >
                      {(transaction.status || "unknown").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedTransaction === transaction.id && (
                  <div className={styles.transactionExpanded}>
                    <div className={styles.expandedDetails}>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                          Balance Before:
                        </span>
                        <span className={styles.detailValue}>
                          {formatCurrency(transaction.balance_before || "0")}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                          Balance After:
                        </span>
                        <span className={styles.detailValue}>
                          {formatCurrency(transaction.balance_after || "0")}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                          Transaction Type:
                        </span>
                        <span className={styles.detailValue}>
                          {(transaction.type || "unknown").toUpperCase()}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>
                          Reference ID:
                        </span>
                        <span className={styles.detailValue}>
                          {transaction.reference_id || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button
              className={styles.loadMoreButton}
              onClick={onLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
