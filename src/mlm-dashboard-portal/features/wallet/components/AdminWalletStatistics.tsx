import React from "react";
import {
  AdminWalletStatistics as WalletStatistics,
  AdminWalletDashboard,
} from "../../../api-services/admin-wallet-service";
import { useAdminWalletUtils } from "../../../hooks/useAdminWallet";
import styles from "./AdminWalletStatistics.module.scss";

interface AdminWalletStatisticsProps {
  statistics?: WalletStatistics | null;
  dashboard?: AdminWalletDashboard | null;
  onExportTransactions?: () => void;
  onExportWithdrawals?: () => void;
}

const AdminWalletStatistics: React.FC<AdminWalletStatisticsProps> = ({
  statistics,
  dashboard,
  onExportTransactions,
  onExportWithdrawals,
}) => {
  const {
    formatCurrency,
    formatNumber,
    getWalletTypeIcon,
    getWalletTypeColor,
  } = useAdminWalletUtils();

  // Add error handling for undefined statistics
  if (!statistics) {
    return (
      <div className={styles.statisticsContainer}>
        <div className={styles.loadingContainer}>
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  // Add error handling for missing by_wallet_type
  if (!statistics.by_wallet_type) {
    return (
      <div className={styles.statisticsContainer}>
        <div className={styles.errorContainer}>
          <p>No wallet type data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statisticsContainer}>
      {/* Header Section */}
      <div className={styles.statisticsHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Wallet Statistics</h2>
          <p className={styles.subtitle}>
            Comprehensive overview of wallet performance and metrics
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={onExportTransactions}
            className={styles.exportButton}
          >
            <i className="icon-download"></i>
            Export Transactions
          </button>
          <button onClick={onExportWithdrawals} className={styles.exportButton}>
            <i className="icon-download"></i>
            Export Withdrawals
          </button>
        </div>
      </div>

      {/* Wallet Type Grid */}
      <div className={styles.walletTypeGrid}>
        {Object.entries(statistics.by_wallet_type).map(([type, data]) => (
          <div key={type} className={styles.walletTypeCard}>
            <div className={styles.walletTypeIcon}>
              <i className={`icon-${getWalletTypeIcon(type)}`}></i>
            </div>
            <div className={styles.walletTypeContent}>
              <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
              <p className={styles.walletTypeBalance}>
                {formatCurrency(data.total_balance)}
              </p>
              <div className={styles.walletTypeStats}>
                <span className={styles.walletTypeCount}>
                  {formatNumber(data.count)} wallets
                </span>
                <span className={styles.walletTypeTransactions}>
                  {formatCurrency(data.total_balance)} balance
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="icon-wallet"></i>
          </div>
          <div className={styles.summaryContent}>
            <h3>Total Wallets</h3>
            <p className={styles.summaryValue}>
              {formatNumber(statistics.overview?.total_wallets || 0)}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="icon-transaction"></i>
          </div>
          <div className={styles.summaryContent}>
            <h3>Total Transactions</h3>
            <p className={styles.summaryValue}>
              {formatNumber(statistics.overview?.total_transactions || 0)}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="icon-money"></i>
          </div>
          <div className={styles.summaryContent}>
            <h3>Total Balance</h3>
            <p className={styles.summaryValue}>
              {formatCurrency(statistics.overview?.total_balance || 0)}
            </p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <i className="icon-trending-up"></i>
          </div>
          <div className={styles.summaryContent}>
            <h3>Active Wallets</h3>
            <p className={styles.summaryValue}>
              {formatNumber(statistics.overview?.active_wallets || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {statistics.recent_activity &&
        statistics.recent_activity.recent_transactions && (
          <div className={styles.recentActivity}>
            <h3>Recent Activity</h3>
            <div className={styles.activityList}>
              {statistics.recent_activity.recent_transactions
                .slice(0, 5)
                .map((transaction, index) => (
                  <div key={index} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      <i className="icon-transaction"></i>
                    </div>
                    <div className={styles.activityContent}>
                      <p className={styles.activityDescription}>
                        {transaction.description || "Transaction"}
                      </p>
                      <p className={styles.activityAmount}>
                        {formatCurrency(transaction.amount || 0)}
                      </p>
                    </div>
                    <div className={styles.activityTime}>
                      {new Date(
                        transaction.created_at || Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminWalletStatistics;
