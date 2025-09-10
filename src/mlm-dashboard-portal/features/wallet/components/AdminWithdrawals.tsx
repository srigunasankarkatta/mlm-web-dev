import React, { useState, useMemo, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import {
  FiEye,
  FiEdit2,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDownload,
} from "react-icons/fi";
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
  const { formatCurrency } = useAdminWalletUtils();
  const processWithdrawal = useProcessWithdrawal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  // Event handlers
  const handleViewWithdrawal = useCallback((withdrawal: AdminWithdrawal) => {
    console.log("View withdrawal:", withdrawal);
    // TODO: Implement view withdrawal functionality
  }, []);

  const handleProcessWithdrawal = useCallback((withdrawal: any) => {
    setSelectedWithdrawal(withdrawal);
    setProcessData({
      status: "approved",
      admin_notes: "",
    });
    setShowProcessModal(true);
  }, []);

  const handleExport = useCallback(() => {
    console.log("Export withdrawals");
    // TODO: Implement export functionality
  }, []);

  // Column definitions for AgGrid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "user_name",
        headerName: "User",
        width: 250,
        minWidth: 200,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-blue-900 truncate">
                  {withdrawal.user_name}
                </div>
                <div className="text-xs text-blue-600">
                  {withdrawal.user_email}
                </div>
              </div>
            </div>
          );
        },
        sortable: true,
        resizable: true,
        pinned: "left",
      },
      {
        field: "withdrawal_id",
        headerName: "Withdrawal ID",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {withdrawal.withdrawal_id}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 180,
        minWidth: 150,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-green-600">
                {formatCurrency(withdrawal.amount)}
              </span>
              <span className="text-xs text-gray-500">
                Fee: {formatCurrency(withdrawal.fee)}
              </span>
              <span className="text-xs font-medium text-blue-600">
                Net: {formatCurrency(withdrawal.net_amount)}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "method_display_name",
        headerName: "Method",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className="flex items-center space-x-2">
              <FiCreditCard className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">
                {withdrawal.method_display_name}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "payment_details",
        headerName: "Payment Details",
        width: 200,
        minWidth: 150,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className="flex flex-col space-y-1">
              {withdrawal.payment_details.bank_name && (
                <span className="text-sm font-medium text-gray-900">
                  {withdrawal.payment_details.bank_name}
                </span>
              )}
              {withdrawal.payment_details.account_number && (
                <span className="text-xs text-gray-600">
                  ****{withdrawal.payment_details.account_number.slice(-4)}
                </span>
              )}
              {withdrawal.payment_details.upi_id && (
                <span className="text-xs text-gray-600">
                  {withdrawal.payment_details.upi_id}
                </span>
              )}
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          const getStatusIcon = (status: string) => {
            switch (status) {
              case "approved":
              case "completed":
                return <FiCheckCircle className="w-3 h-3" />;
              case "rejected":
              case "failed":
                return <FiXCircle className="w-3 h-3" />;
              case "pending":
              case "processing":
                return <FiClock className="w-3 h-3" />;
              default:
                return <FiClock className="w-3 h-3" />;
            }
          };

          const getStatusColor = (status: string) => {
            switch (status) {
              case "approved":
              case "completed":
                return "bg-green-100 text-green-800";
              case "rejected":
              case "failed":
                return "bg-red-100 text-red-800";
              case "pending":
              case "processing":
                return "bg-yellow-100 text-yellow-800";
              case "cancelled":
                return "bg-gray-100 text-gray-800";
              default:
                return "bg-gray-100 text-gray-800";
            }
          };

          return (
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                withdrawal.status
              )}`}
            >
              {getStatusIcon(withdrawal.status)}
              <span className="ml-1">{withdrawal.status_display_name}</span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "created_at",
        headerName: "Date",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <span className="text-xs text-gray-600">
              {new Date(withdrawal.created_at).toLocaleString()}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        minWidth: 160,
        pinned: "right",
        cellRenderer: (params: any) => {
          const withdrawal = params.data as AdminWithdrawal;
          return (
            <div className="action-buttons-container">
              <button
                onClick={() => handleProcessWithdrawal(withdrawal)}
                disabled={withdrawal.status !== "pending"}
                title="Process Withdrawal"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleViewWithdrawal(withdrawal)}
                title="View Details"
              >
                <FiEye className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
        sortable: false,
        filter: false,
        resizable: false,
        lockPosition: "right",
        cellClass: "action-cell",
      },
    ],
    [formatCurrency, handleProcessWithdrawal, handleViewWithdrawal]
  );

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

  const withdrawalData = withdrawals?.data?.withdrawals || [];
  const pagination = withdrawals?.data?.pagination;

  if (withdrawals?.isLoading) {
    return (
      <div className={styles.withdrawalsContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading withdrawals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (withdrawals?.error) {
    return (
      <div className={styles.withdrawalsContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading withdrawals</p>
            <p className={styles.errorMessage}>{withdrawals.error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.withdrawalsContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.headerTitle}>Withdrawal Requests</h1>
                <p className={styles.headerSubtitle}>
                  Review and process withdrawal requests from your MLM network.
                </p>
              </div>
              <div className={styles.headerIcon}>
                <FiDollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

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
              <FiDownload className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Withdrawals Table */}
        <div className="bg-white rounded-lg shadow">
          <div className={styles.tableContainer}>
            <AgGridTable
              rowData={withdrawalData}
              columnDefs={columnDefs}
              enablePagination={false}
              enableSorting={true}
              enableFiltering={false}
              enableSelection={false}
              autoSizeRows={true}
              height={400}
              className={styles.agGridTable}
              gridOptions={{
                suppressHorizontalScroll: false,
                alwaysShowHorizontalScroll: true,
                suppressColumnVirtualisation: false,
                suppressRowVirtualisation: false,
              }}
            />
          </div>

          {/* Server-side Pagination */}
          {pagination && pagination.total > 0 && (
            <ServerPagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              totalItems={pagination.total}
              itemsPerPage={pagination.per_page}
              onPageChange={handlePageChange}
              loading={withdrawals?.isLoading || false}
            />
          )}
        </div>

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
    </div>
  );
};

export default AdminWithdrawals;
