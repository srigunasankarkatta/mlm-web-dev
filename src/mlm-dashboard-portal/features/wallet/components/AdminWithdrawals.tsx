import React, { useState } from "react";
import {
  AdminWithdrawalsResponse,
  AdminWithdrawalsParams,
  ProcessWithdrawalRequest,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWithdrawals,
  useAdminWalletUtils,
  useProcessWithdrawal,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWithdrawals.module.scss";

const AdminWithdrawals: React.FC = () => {
  const { formatCurrency, getStatusColor, getStatusIcon } =
    useAdminWalletUtils();
  const processWithdrawal = useProcessWithdrawal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filters, setFilters] = useState<Partial<AdminWithdrawalsParams>>({});

  const withdrawals = useAdminWithdrawals(filters);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processData, setProcessData] = useState<ProcessWithdrawalRequest>({
    status: "approved",
    admin_notes: "",
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setFilters({ ...filters, status: status || undefined, page: 1 });
  };

  const handleMethodFilter = (method: string) => {
    setSelectedMethod(method);
    setFilters({ ...filters, method: method || undefined, page: 1 });
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
    setSelectedStatus("");
    setSelectedMethod("");
    setDateFrom("");
    setDateTo("");
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export withdrawals");
  };

  const handleProcessWithdrawal = (withdrawal: any) => {
    setSelectedWithdrawal(withdrawal);
    setProcessData({
      status: "approved",
      admin_notes: "",
    });
    setShowProcessModal(true);
  };

  const handleProcessSubmit = async () => {
    if (selectedWithdrawal) {
      try {
        await processWithdrawal.mutateAsync({
          withdrawalId: selectedWithdrawal.id,
          data: processData,
        });
        setShowProcessModal(false);
        setSelectedWithdrawal(null);
      } catch (error) {
        console.error("Error processing withdrawal:", error);
      }
    }
  };

  if (!withdrawals || withdrawals.isLoading) {
    return (
      <div className={styles.withdrawalsList}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading withdrawals...</p>
        </div>
      </div>
    );
  }

  if (!withdrawals || withdrawals.error) {
    return (
      <div className={styles.withdrawalsList}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error Loading Withdrawals</h3>
          <p>
            There was an error loading the withdrawal data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const withdrawalData = withdrawals?.data?.withdrawals || [];
  const pagination = withdrawals?.data?.pagination;

  return (
    <div className={styles.withdrawalsList}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by withdrawal ID or user..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Method</label>
          <select
            value={selectedMethod}
            onChange={(e) => handleMethodFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Methods</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="upi">UPI</option>
            <option value="wallet">Wallet</option>
            <option value="crypto">Cryptocurrency</option>
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

      {/* Withdrawals Table */}
      <div className={styles.withdrawalsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>User</div>
            <div className={styles.tableCell}>Withdrawal ID</div>
            <div className={styles.tableCell}>Amount</div>
            <div className={styles.tableCell}>Method</div>
            <div className={styles.tableCell}>Payment Details</div>
            <div className={styles.tableCell}>Status</div>
            <div className={styles.tableCell}>Date</div>
            <div className={styles.tableCell}>Actions</div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {withdrawalData.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="icon-arrow-up-right"></i>
              </div>
              <h3>No Withdrawals Found</h3>
              <p>No withdrawals match your current filters.</p>
            </div>
          ) : (
            withdrawalData.map((withdrawal: any) => (
              <div key={withdrawal.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {withdrawal.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                      <h4>{withdrawal.user_name}</h4>
                      <p>{withdrawal.user_email}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.withdrawalId}>
                    {withdrawal.withdrawal_id}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.amountInfo}>
                    <span className={styles.amount}>
                      {formatCurrency(withdrawal.amount)}
                    </span>
                    <span className={styles.fee}>
                      Fee: {formatCurrency(withdrawal.fee)}
                    </span>
                    <span className={styles.netAmount}>
                      Net: {formatCurrency(withdrawal.net_amount)}
                    </span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.methodInfo}>
                    <span className={styles.method}>
                      {withdrawal.method_display_name}
                    </span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.paymentDetails}>
                    {withdrawal.payment_details.bank_name && (
                      <span>{withdrawal.payment_details.bank_name}</span>
                    )}
                    {withdrawal.payment_details.account_number && (
                      <span>
                        ****
                        {withdrawal.payment_details.account_number.slice(-4)}
                      </span>
                    )}
                    {withdrawal.payment_details.upi_id && (
                      <span>{withdrawal.payment_details.upi_id}</span>
                    )}
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <span
                    className={`${styles.status} ${styles[withdrawal.status]}`}
                  >
                    <i
                      className={`icon-${getStatusIcon(withdrawal.status)}`}
                    ></i>
                    {withdrawal.status_display_name}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.withdrawalDate}>
                    {new Date(withdrawal.created_at).toLocaleString()}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleProcessWithdrawal(withdrawal)}
                      className={styles.actionButton}
                      disabled={withdrawal.status !== "pending"}
                    >
                      <i className="icon-edit"></i>
                    </button>
                    <button className={styles.actionButton}>
                      <i className="icon-eye"></i>
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
            withdrawals
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

      {/* Process Withdrawal Modal */}
      {showProcessModal && selectedWithdrawal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Process Withdrawal</h3>
              <button
                onClick={() => setShowProcessModal(false)}
                className={styles.modalClose}
              >
                <i className="icon-x"></i>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.withdrawalInfo}>
                <h4>Withdrawal Details</h4>
                <p>
                  <strong>User:</strong> {selectedWithdrawal.user_name}
                </p>
                <p>
                  <strong>Amount:</strong>{" "}
                  {formatCurrency(selectedWithdrawal.amount)}
                </p>
                <p>
                  <strong>Method:</strong>{" "}
                  {selectedWithdrawal.method_display_name}
                </p>
                <p>
                  <strong>Withdrawal ID:</strong>{" "}
                  {selectedWithdrawal.withdrawal_id}
                </p>
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={processData.status}
                  onChange={(e) =>
                    setProcessData({
                      ...processData,
                      status: e.target.value as any,
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Admin Notes</label>
                <textarea
                  value={processData.admin_notes}
                  onChange={(e) =>
                    setProcessData({
                      ...processData,
                      admin_notes: e.target.value,
                    })
                  }
                  placeholder="Add notes about this withdrawal..."
                  className={styles.formTextarea}
                  rows={4}
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowProcessModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleProcessSubmit}
                className={styles.submitButton}
                disabled={processWithdrawal.isPending}
              >
                {processWithdrawal.isPending
                  ? "Processing..."
                  : "Process Withdrawal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawals;
