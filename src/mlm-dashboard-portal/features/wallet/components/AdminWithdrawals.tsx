import React, { useState, useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { FiEye, FiEdit2, FiUser, FiDollarSign, FiCreditCard, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import AgGridTable from "../../../components/ui/AgGridTable";
import ServerPagination from "../../../components/ui/ServerPagination";
import type {
  AdminWithdrawalsParams,
  ProcessWithdrawalRequest,
  AdminWithdrawal,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
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
    setCurrentPage(1);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setFilters({ ...filters, status: status || undefined, page: 1 });
  };

  const handleMethodFilter = (method: string) => {
    setSelectedMethod(method);
    setCurrentPage(1);
    setFilters({ ...filters, method: method || undefined, page: 1 });
  };

  const handleDateFilter = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
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
    setCurrentPage(1);
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({ ...filters, page });
  };

  const handleProcessWithdrawal = (withdrawal: any) => {
    setSelectedWithdrawal(withdrawal);
    setProcessData({
      status: "approved",
      admin_notes: "",
    });
    setShowProcessModal(true);
  };

  // Column definitions for AgGrid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "User",
        field: "user_name",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <FiUser className={styles.userIcon} />
              </div>
              <div className={styles.userDetails}>
                <h4>{withdrawal.user_name}</h4>
                <p>{withdrawal.user_email}</p>
              </div>
            </div>
          );
        },
        width: 200,
        pinned: "left",
      },
      {
        headerName: "Withdrawal ID",
        field: "withdrawal_id",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <span className={styles.withdrawalId}>
              {withdrawal.withdrawal_id}
            </span>
          );
        },
        width: 150,
      },
      {
        headerName: "Amount",
        field: "amount",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
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
          );
        },
        width: 180,
      },
      {
        headerName: "Method",
        field: "method_display_name",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className={styles.methodInfo}>
              <div className={styles.methodIcon}>
                <FiCreditCard className={styles.methodIconSvg} />
              </div>
              <span className={styles.method}>
                {withdrawal.method_display_name}
              </span>
            </div>
          );
        },
        width: 120,
      },
      {
        headerName: "Payment Details",
        field: "payment_details",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
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
          );
        },
        width: 200,
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          const getStatusIcon = (status: string) => {
            switch (status) {
              case 'approved':
              case 'completed':
                return <FiCheckCircle className={styles.statusIcon} />;
              case 'rejected':
              case 'failed':
                return <FiXCircle className={styles.statusIcon} />;
              case 'pending':
              case 'processing':
                return <FiClock className={styles.statusIcon} />;
              default:
                return <FiClock className={styles.statusIcon} />;
            }
          };
          
          return (
            <span
              className={`${styles.status} ${styles[withdrawal.status]}`}
            >
              {getStatusIcon(withdrawal.status)}
              {withdrawal.status_display_name}
            </span>
          );
        },
        width: 120,
      },
      {
        headerName: "Date",
        field: "created_at",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <span className={styles.withdrawalDate}>
              {new Date(withdrawal.created_at).toLocaleString()}
            </span>
          );
        },
        width: 150,
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className={styles.actions}>
              <button
                onClick={() => handleProcessWithdrawal(withdrawal)}
                className={styles.actionButton}
                disabled={withdrawal.status !== "pending"}
                title="Process Withdrawal"
              >
                <FiEdit2 className={styles.actionIcon} />
              </button>
              <button className={styles.actionButton} title="View Details">
                <FiEye className={styles.actionIcon} />
              </button>
            </div>
          );
        },
        width: 120,
        pinned: "right",
        sortable: false,
        filter: false,
      },
    ],
    [formatCurrency, getStatusIcon, styles, handleProcessWithdrawal]
  );

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export withdrawals");
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

      {/* AgGrid Table */}
      <div className={styles.tableContainer}>
        <AgGridTable
          rowData={withdrawalData}
          columnDefs={columnDefs}
          loading={withdrawals?.isLoading || false}
          enablePagination={false}
          enableSorting={true}
          enableFiltering={false}
          enableSelection={false}
          height={600}
          className={styles.agGridTable}
        />
      </div>

      {/* Server-side Pagination */}
      {pagination && pagination.total > 0 && (
        <ServerPagination
          currentPage={currentPage}
          totalPages={pagination.last_page}
          totalItems={pagination.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          loading={withdrawals?.isLoading || false}
        />
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
