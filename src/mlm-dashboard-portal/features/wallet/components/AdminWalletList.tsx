import React, { useState, useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { FiEye, FiEdit2, FiDollarSign, FiUser } from "react-icons/fi";
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
  const { formatCurrency, getWalletTypeIcon } =
    useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
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

  // Column definitions for AgGrid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "User",
        field: "user_name",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
    return (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <FiUser className={styles.userIcon} />
              </div>
              <div className={styles.userDetails}>
                <h4>{wallet.user_name}</h4>
                <p>{wallet.user_email}</p>
        </div>
      </div>
    );
        },
        width: 200,
        pinned: "left",
      },
      {
        headerName: "Wallet Type",
        field: "display_name",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <div className={styles.walletType}>
              <div className={styles.walletTypeIcon}>
                <FiDollarSign className={styles.walletIcon} />
              </div>
              <span>{wallet.display_name}</span>
            </div>
          );
        },
        width: 150,
      },
      {
        headerName: "Balance",
        field: "balance",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <div className={styles.balanceInfo}>
              <span className={styles.balanceAmount}>
                {formatCurrency(wallet.balance)}
              </span>
              <span className={styles.balanceTotal}>
                Total: {formatCurrency(wallet.total_balance)}
              </span>
            </div>
          );
        },
        width: 150,
      },
      {
        headerName: "Available",
        field: "available_balance",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className={styles.availableBalance}>
              {formatCurrency(wallet.available_balance)}
            </span>
          );
        },
        width: 120,
      },
      {
        headerName: "Pending",
        field: "pending_balance",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className={styles.pendingBalance}>
              {formatCurrency(wallet.pending_balance)}
            </span>
          );
        },
        width: 120,
      },
      {
        headerName: "Withdrawn",
        field: "withdrawn_balance",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span className={styles.withdrawnBalance}>
              {formatCurrency(wallet.withdrawn_balance)}
            </span>
          );
        },
        width: 120,
      },
      {
        headerName: "Status",
        field: "is_active",
        cellRenderer: (params: any) => {
          const wallet = params.data as AdminWallet;
          return (
            <span
              className={`${styles.status} ${
                styles[wallet.is_active ? "active" : "inactive"]
              }`}
            >
              {wallet.is_active ? "Active" : "Inactive"}
            </span>
          );
        },
        width: 100,
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: () => {
          return (
            <div className={styles.actions}>
              <button className={styles.actionButton} title="View Details">
                <FiEye className={styles.actionIcon} />
              </button>
              <button className={styles.actionButton} title="Edit Wallet">
                <FiEdit2 className={styles.actionIcon} />
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
    [formatCurrency, getWalletTypeIcon, styles]
  );

  const walletData = wallets?.data?.wallets || [];
  const pagination = wallets?.data?.pagination;

  if (wallets?.error) {
    return (
      <div className={styles.walletList}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error Loading Wallets</h3>
          <p>There was an error loading the wallet data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.walletList}>
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

      {/* AgGrid Table */}
      <div className={styles.tableContainer}>
        <AgGridTable
          rowData={walletData}
          columnDefs={columnDefs}
          loading={wallets?.isLoading || false}
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
          loading={wallets?.isLoading || false}
        />
      )}
    </div>
  );
};

export default AdminWalletList;
