import React, { useState } from "react";
import {
  useAdminWalletState,
  useAdminWalletUtils,
} from "../../../hooks/useAdminWallet";
import AdminWalletStatistics from "./AdminWalletStatistics";
import AdminWalletList from "./AdminWalletList";
import AdminWalletTransactions from "./AdminWalletTransactions";
import AdminWithdrawals from "./AdminWithdrawals";
import AdminManualTransactions from "./AdminManualTransactions";
import styles from "./AdminWalletDashboard.module.scss";

interface AdminWalletDashboardProps {
  className?: string;
}

const AdminWalletDashboard: React.FC<AdminWalletDashboardProps> = ({
  className = "",
}) => {
  const {
    walletStatistics,
    wallets,
    transactions,
    withdrawals,
    walletDashboard,
    updateWalletFilters,
    updateTransactionFilters,
    updateWithdrawalFilters,
    clearFilters,
  } = useAdminWalletState();

  const { formatCurrency, exportTransactions, exportWithdrawals } =
    useAdminWalletUtils();
  const [activeTab, setActiveTab] = useState<
    "overview" | "wallets" | "transactions" | "withdrawals" | "manual"
  >("overview");

  const handleRefresh = () => {
    // Refresh all data
    window.location.reload();
  };

  if (walletStatistics.isLoading || walletDashboard.isLoading) {
    return (
      <div className={`${styles.walletDashboard} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (walletStatistics.error || walletDashboard.error) {
    return (
      <div className={`${styles.walletDashboard} ${className}`}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Error Loading Wallet Data</h3>
          <p>
            There was an error loading the wallet dashboard. Please try again.
          </p>
          <button onClick={handleRefresh} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = walletStatistics.data;
  const dashboard = walletDashboard.data;

  return (
    <div className={`${styles.walletDashboard} ${className}`}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1>Wallet Management</h1>
          <p>Manage user wallets, transactions, and withdrawals</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleRefresh} className={styles.refreshButton}>
            <i className="icon-refresh-cw"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className={styles.quickStats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="icon-wallet"></i>
            </div>
            <div className={styles.statContent}>
              <h3>Total Wallets</h3>
              <p className={styles.statValue}>{stats.overview.total_wallets}</p>
              <span className={styles.statSubtext}>
                {stats.overview.active_wallets} active
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="icon-dollar-sign"></i>
            </div>
            <div className={styles.statContent}>
              <h3>Total Balance</h3>
              <p className={styles.statValue}>
                {formatCurrency(stats.overview.total_balance)}
              </p>
              <span className={styles.statSubtext}>
                {formatCurrency(stats.overview.total_pending_balance)} pending
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="icon-arrow-up-right"></i>
            </div>
            <div className={styles.statContent}>
              <h3>Total Transactions</h3>
              <p className={styles.statValue}>
                {stats.overview.total_transactions}
              </p>
              <span className={styles.statSubtext}>
                {dashboard?.summary.total_transactions_today || 0} today
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="icon-clock"></i>
            </div>
            <div className={styles.statContent}>
              <h3>Pending Withdrawals</h3>
              <p className={styles.statValue}>
                {stats.overview.pending_withdrawals}
              </p>
              <span className={styles.statSubtext}>
                {formatCurrency(stats.overview.total_withdrawn_balance)}{" "}
                withdrawn
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "overview" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <i className="icon-bar-chart-3"></i>
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "wallets" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("wallets")}
        >
          <i className="icon-wallet"></i>
          Wallets
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "transactions" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          <i className="icon-credit-card"></i>
          Transactions
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "withdrawals" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("withdrawals")}
        >
          <i className="icon-arrow-up-right"></i>
          Withdrawals
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "manual" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("manual")}
        >
          <i className="icon-edit"></i>
          Manual Transactions
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && stats && (
          <AdminWalletStatistics
            statistics={stats}
            dashboard={dashboard}
            onExportTransactions={() => exportTransactions()}
            onExportWithdrawals={() => exportWithdrawals()}
          />
        )}

        {activeTab === "wallets" && (
          <AdminWalletList
            wallets={wallets}
            onFiltersChange={updateWalletFilters}
            onClearFilters={clearFilters}
          />
        )}

        {activeTab === "transactions" && (
          <AdminWalletTransactions
            transactions={transactions}
            onFiltersChange={updateTransactionFilters}
            onClearFilters={clearFilters}
            onExport={() => exportTransactions(transactionFilters)}
          />
        )}

        {activeTab === "withdrawals" && (
          <AdminWithdrawals
            withdrawals={withdrawals}
            onFiltersChange={updateWithdrawalFilters}
            onClearFilters={clearFilters}
            onExport={() => exportWithdrawals(withdrawalFilters)}
          />
        )}

        {activeTab === "manual" && <AdminManualTransactions />}
      </div>
    </div>
  );
};

export default AdminWalletDashboard;
