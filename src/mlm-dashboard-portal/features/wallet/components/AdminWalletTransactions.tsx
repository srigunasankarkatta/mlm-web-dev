import React, { useState, useMemo, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import {
  FiEye,
  FiEdit2,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import AgGridTable from "../../../components/ui/AgGridTable";
import ServerPagination from "../../../components/ui/ServerPagination";
import type {
  AdminWalletTransactionsParams,
  AdminWalletTransaction,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWalletTransactions,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletTransactions.module.scss";

const AdminWalletTransactions: React.FC = () => {
  const { formatCurrency } = useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<
    Partial<AdminWalletTransactionsParams>
  >({});

  const transactions = useAdminWalletTransactions(filters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
    setFilters({ ...filters, type: type || undefined, page: 1 });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFilters({ ...filters, category: category || undefined, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setFilters({ ...filters, status: status || undefined, page: 1 });
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
    setSelectedType("");
    setSelectedCategory("");
    setSelectedStatus("");
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
  const handleViewTransaction = useCallback(
    (transaction: AdminWalletTransaction) => {
      console.log("View transaction:", transaction);
      // TODO: Implement view transaction functionality
    },
    []
  );

  const handleEditTransaction = useCallback(
    (transaction: AdminWalletTransaction) => {
      console.log("Edit transaction:", transaction);
      // TODO: Implement edit transaction functionality
    },
    []
  );

  const handleExport = useCallback(() => {
    console.log("Export transactions");
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
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-blue-900 truncate">
                  {transaction.user_name}
                </div>
                <div className="text-xs text-blue-600">
                  {transaction.user_email}
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
        field: "wallet_display_name",
        headerName: "Wallet",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className="flex items-center space-x-2">
              <FiDollarSign className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">
                {transaction.wallet_display_name}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          const getTypeIcon = (type: string) => {
            switch (type) {
              case "credit":
              case "transfer_in":
                return <FiArrowUp className="w-3 h-3" />;
              case "debit":
              case "transfer_out":
                return <FiArrowDown className="w-3 h-3" />;
              default:
                return <FiRefreshCw className="w-3 h-3" />;
            }
          };

          const getTypeColor = (type: string) => {
            switch (type) {
              case "credit":
              case "transfer_in":
                return "bg-green-100 text-green-800";
              case "debit":
              case "transfer_out":
                return "bg-red-100 text-red-800";
              default:
                return "bg-gray-100 text-gray-800";
            }
          };

          return (
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                transaction.type
              )}`}
            >
              {getTypeIcon(transaction.type)}
              <span className="ml-1">
                {transaction.type.replace("_", " ").toUpperCase()}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          const isCredit =
            transaction.type === "credit" || transaction.type === "transfer_in";
          return (
            <span
              className={`text-sm font-semibold ${
                isCredit ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCredit ? "+" : "-"}
              {(transaction.amount)}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "balance_after",
        headerName: "Balance",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-green-600">
                {formatCurrency(transaction.balance_after)}
              </span>
              <span className="text-xs text-gray-500">
                Before: {formatCurrency(transaction.balance_before)}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "reference_id",
        headerName: "Reference",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {transaction.reference_id}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        minWidth: 150,
        cellRenderer: (params: any) => {
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className="text-sm text-gray-900 truncate">
              {transaction.description}
            </span>
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
          const transaction = params.data as AdminWalletTransaction;
          const getStatusColor = (status: string) => {
            switch (status) {
              case "completed":
                return "bg-green-100 text-green-800";
              case "pending":
                return "bg-yellow-100 text-yellow-800";
              case "failed":
                return "bg-red-100 text-red-800";
              case "cancelled":
                return "bg-gray-100 text-gray-800";
              default:
                return "bg-gray-100 text-gray-800";
            }
          };

          return (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                transaction.status
              )}`}
            >
              {transaction.status.toUpperCase()}
            </span>
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
          const transaction = params.data as AdminWalletTransaction;
          return (
            <span className="text-xs text-gray-600">
              {new Date(transaction.created_at).toLocaleString()}
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
          const transaction = params.data as AdminWalletTransaction;
          return (
            <div className="action-buttons-container">
              <button
                onClick={() => handleViewTransaction(transaction)}
                title="View Details"
              >
                <FiEye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleEditTransaction(transaction)}
                title="Edit Transaction"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
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
    [formatCurrency, handleViewTransaction, handleEditTransaction]
  );

  const transactionData = transactions?.data?.transactions || [];
  const pagination = transactions?.data?.pagination;

  if (transactions?.isLoading) {
    return (
      <div className={styles.transactionsContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading transactions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (transactions?.error) {
    return (
      <div className={styles.transactionsContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading transactions</p>
            <p className={styles.errorMessage}>{transactions.error.message}</p>
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
    <div className={styles.transactionsContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.headerTitle}>Wallet Transactions</h1>
                <p className={styles.headerSubtitle}>
                  Monitor and manage all wallet transactions across your MLM
                  network.
                </p>
              </div>
              <div className={styles.headerIcon}>
                <FiCreditCard className="w-6 h-6" />
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
              <FiDownload className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow">
          <div className={styles.tableContainer}>
            <AgGridTable
              rowData={transactionData}
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
              loading={transactions?.isLoading || false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWalletTransactions;
