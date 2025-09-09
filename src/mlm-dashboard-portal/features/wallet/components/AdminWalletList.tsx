import React, { useState } from "react";
import {
  AdminWalletListResponse,
  AdminWalletListParams,
} from "../../../api-services/admin-wallet-service";
import {
  useAdminWallets,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletList.module.scss";

const AdminWalletList: React.FC = () => {
  const { formatCurrency, getWalletTypeIcon, getWalletTypeColor } =
    useAdminWalletUtils();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filters, setFilters] = useState<Partial<AdminWalletListParams>>({});

  const wallets = useAdminWallets(filters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setFilters({ ...filters, type: type || undefined, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
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
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  if (!wallets || wallets.isLoading) {
    return (
      <div className={styles.walletList}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading wallets...</p>
        </div>
      </div>
    );
  }

  if (!wallets || wallets.error) {
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

  const walletData = wallets?.data?.wallets || [];
  const pagination = wallets?.data?.pagination;

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

      {/* Wallet Table */}
      <div className={styles.walletTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>User</div>
            <div className={styles.tableCell}>Wallet Type</div>
            <div className={styles.tableCell}>Balance</div>
            <div className={styles.tableCell}>Available</div>
            <div className={styles.tableCell}>Pending</div>
            <div className={styles.tableCell}>Withdrawn</div>
            <div className={styles.tableCell}>Status</div>
            <div className={styles.tableCell}>Actions</div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {walletData.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="icon-wallet"></i>
              </div>
              <h3>No Wallets Found</h3>
              <p>No wallets match your current filters.</p>
            </div>
          ) : (
            walletData.map((wallet: any) => (
              <div key={wallet.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {wallet.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                      <h4>{wallet.user_name}</h4>
                      <p>{wallet.user_email}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.walletType}>
                    <div className={styles.walletTypeIcon}>
                      <i
                        className={`icon-${getWalletTypeIcon(wallet.type)}`}
                      ></i>
                    </div>
                    <span>{wallet.display_name}</span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <div className={styles.balanceInfo}>
                    <span className={styles.balanceAmount}>
                      {formatCurrency(wallet.balance)}
                    </span>
                    <span className={styles.balanceTotal}>
                      Total: {formatCurrency(wallet.total_balance)}
                    </span>
                  </div>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.availableBalance}>
                    {formatCurrency(wallet.available_balance)}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.pendingBalance}>
                    {formatCurrency(wallet.pending_balance)}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span className={styles.withdrawnBalance}>
                    {formatCurrency(wallet.withdrawn_balance)}
                  </span>
                </div>

                <div className={styles.tableCell}>
                  <span
                    className={`${styles.status} ${
                      styles[wallet.is_active ? "active" : "inactive"]
                    }`}
                  >
                    {wallet.is_active ? "Active" : "Inactive"}
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
            wallets
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

export default AdminWalletList;
