import React, { useState } from "react";
import {
  AdminWalletTransactionsResponse,
  AdminWalletTransactionsParams,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWalletTransactions,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletTransactions.module.scss";

const AdminWalletTransactions: React.FC = () => {
  const {
    formatCurrency,
    getTransactionTypeIcon,
    getTransactionTypeColor,
    getWalletTypeIcon,
  } = useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filters, setFilters] = useState<
    Partial<AdminWalletTransactionsParams>
  >({});

  const transactions = useAdminWalletTransactions(filters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setFilters({ ...filters, type: type || undefined, page: 1 });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setFilters({ ...filters, category: category || undefined, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setFilters({ ...filters, status: status || undefined, page: 1 });
  };

  const handleDateFilter = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    setFilters({
      ...filters,
      from_date: from || undefined,
      to_date: to || undefined,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCategory("");
    setSelectedStatus("");
    setDateFrom("");
    setDateTo("");
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export transactions");
  };

  if (!transactions || transactions.isLoading) {
    return (
      <div className={styles.transactionsList}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (!transactions || transactions.error) {
    return (
      <div className={styles.transactionsList}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error Loading Transactions</h3>
          <p>
            There was an error loading the transaction data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const transactionData = transactions?.data?.transactions || [];
  const pagination = transactions?.data?.pagination;

  // Debug logging
  console.log("AdminWalletTransactions Debug:", {
    transactions,
    transactionData,
    pagination,
    isLoading: transactions?.isLoading,
    error: transactions?.error,
  });

  return (
    <div className={styles.transactionsList}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by reference ID or description..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Type</label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeFilter(e.target.value)}
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
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Categories</option>
            <option value="direct_income">Direct Income</option>
            <option value="level_income">Level Income</option>
            <option value="club_income">Club Income</option>
            <option value="auto_pool">Auto Pool</option>
            <option value="admin_credit">Admin Credit</option>
            <option value="admin_debit">Admin Debit</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>From Date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateFilter(e.target.value, dateTo)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>To Date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => handleDateFilter(dateFrom, e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterActions}>
          <button
            onClick={handleClearFilters}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </button>
          <button onClick={handleExport} className={styles.exportButton}>
            <i className="icon-download"></i>
            Export CSV
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={styles.transactionsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>User</div>
            <div className={styles.tableCell}>Wallet</div>
            <div className={styles.tableCell}>Type</div>
            <div className={styles.tableCell}>Amount</div>
            <div className={styles.tableCell}>Balance</div>
            <div className={styles.tableCell}>Reference</div>
            <div className={styles.tableCell}>Description</div>
            <div className={styles.tableCell}>Status</div>
            <div className={styles.tableCell}>Date</div>
            <div className={styles.tableCell}>Actions</div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {transactionData.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="icon-credit-card"></i>
              </div>
              <h3>No Transactions Found</h3>
              <p>No transactions match your current filters.</p>
            </div>
          ) : (
            transactionData.map((transaction: any) => (
              <div key={transaction.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {transaction.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                      <h4>{transaction.user_name}</h4>
                      <p>{transaction.user_email}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.walletInfo}>
                    <div className={styles.walletTypeIcon}>
                      <i
                        className={`icon-${getWalletTypeIcon(
                          transaction.wallet_type
                        )}`}
                      ></i>
                    </div>
                    <span>{transaction.wallet_display_name}</span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div
                    className={`${styles.transactionType} ${
                      styles[transaction.type]
                    }`}
                  >
                    <i
                      className={`icon-${getTransactionTypeIcon(
                        transaction.type
                      )}`}
                    ></i>
                    <span>{transaction.type}</span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <span
                    className={`${styles.amount} ${styles[transaction.type]}`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.balanceInfo}>
                    <span className={styles.balanceBefore}>
                      Before: {formatCurrency(transaction.balance_before)}
                    </span>
                    <span className={styles.balanceAfter}>
                      After: {formatCurrency(transaction.balance_after)}
                    </span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.referenceId}>
                    {transaction.reference_id}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.description}>
                    {transaction.description}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span
                    className={`${styles.status} ${styles[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.transactionDate}>
                    {new Date(transaction.created_at).toLocaleString()}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button className={styles.actionButton}>
                      <i className="icon-eye"></i>
                    </button>
                    <button className={styles.actionButton}>
                      <i className="icon-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {pagination.from} to {pagination.to} of {pagination.total}{" "}
            transactions
          </div>
          <div className={styles.paginationControls}>
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <div className={styles.paginationNumbers}>
              {Array.from(
                { length: Math.min(5, pagination.last_page) },
                (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`${styles.paginationButton} ${
                        pagination.current_page === page ? styles.active : ""
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}
            </div>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWalletTransactions;
