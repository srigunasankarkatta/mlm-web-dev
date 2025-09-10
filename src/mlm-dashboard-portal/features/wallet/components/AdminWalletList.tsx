import React, { useState, useMemo, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import {
  FiEye,
  FiEdit2,
  FiDollarSign,
  FiUser,
  FiCreditCard,
} from "react-icons/fi";
import AgGridTable from "../../../components/ui/AgGridTable";
import ServerPagination from "../../../components/ui/ServerPagination";
import type {
  AdminWalletListParams,
  AdminWallet,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWallets,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletList.module.scss";

const AdminWalletList: React.FC = () => {
  const { formatCurrency } = useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Partial<AdminWalletListParams>>({});

  const wallets = useAdminWallets(filters);

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

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setFilters({
      ...filters,
      is_active:
        status === "active" ? true : status === "inactive" ? false : undefined,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedStatus("");
    setCurrentPage(1);
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({ ...filters, page });
  };

  // Event handlers
  const handleViewWallet = useCallback((wallet: AdminWallet) => {
    console.log("View wallet:", wallet);
    // TODO: Implement view wallet functionality
  }, []);

  const handleEditWallet = useCallback((wallet: AdminWallet) => {
    console.log("Edit wallet:", wallet);
    // TODO: Implement edit wallet functionality
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
          const wallet = params.data as AdminWallet;
          return (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-blue-900 truncate">
                  {wallet.user_name}
                </div>
                <div className="text-xs text-blue-600">{wallet.user_email}</div>
              </div>
            </div>
          );
        },
        sortable: true,
        resizable: true,
        pinned: "left",
      },
      {
        field: "display_name",
        headerName: "Wallet Type",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <div className="flex items-center space-x-2">
              <FiDollarSign className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">
                {wallet.display_name}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "balance",
        headerName: "Balance",
        width: 150,
        minWidth: 120,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <div className="flex flex-col">
              <span className="font-semibold text-green-600">
                {formatCurrency(wallet.balance)}
              </span>
              <span className="text-xs text-gray-500">
                Total: {formatCurrency(wallet.total_balance)}
              </span>
            </div>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "available_balance",
        headerName: "Available",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className="text-sm font-medium text-green-600">
              {formatCurrency(wallet.available_balance)}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "pending_balance",
        headerName: "Pending",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className="text-sm font-medium text-yellow-600">
              {formatCurrency(wallet.pending_balance)}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "withdrawn_balance",
        headerName: "Withdrawn",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className="text-sm font-medium text-gray-600">
              {formatCurrency(wallet.withdrawn_balance)}
            </span>
          );
        },
        sortable: true,
        resizable: true,
      },
      {
        field: "is_active",
        headerName: "Status",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                wallet.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {wallet.is_active ? "Active" : "Inactive"}
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
          const wallet = params.data as AdminWallet;
          return (
            <div className="action-buttons-container">
              <button
                onClick={() => handleViewWallet(wallet)}
                title="View Details"
              >
                <FiEye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleEditWallet(wallet)}
                title="Edit Wallet"
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
    [formatCurrency, handleViewWallet, handleEditWallet]
  );

  const walletData = wallets?.data?.wallets || [];
  const pagination = wallets?.data?.pagination;

  if (wallets?.isLoading) {
    return (
      <div className={styles.walletContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading wallets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (wallets?.error) {
    return (
      <div className={styles.walletContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading wallets</p>
            <p className={styles.errorMessage}>{wallets.error.message}</p>
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
    <div className={styles.walletContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.headerTitle}>All Wallets</h1>
                <p className={styles.headerSubtitle}>
                  Manage and monitor all user wallets in your MLM network.
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
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Wallet Type</label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Types</option>
              <option value="earning">Earning</option>
              <option value="bonus">Bonus</option>
              <option value="reward">Reward</option>
              <option value="holding">Holding</option>
              <option value="commission">Commission</option>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </button>
        </div>

        {/* Wallets Table */}
        <div className="bg-white rounded-lg shadow">
          <div className={styles.tableContainer}>
            <AgGridTable
              rowData={walletData}
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
              loading={wallets?.isLoading || false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWalletList;
