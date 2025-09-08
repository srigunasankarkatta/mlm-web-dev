import React, { useState } from "react";
import { useWalletState, useWithdrawalRequest } from "../hooks/useWallet";
import WalletCard from "./WalletCard";
import TransactionList from "./TransactionList";
import WithdrawalForm from "./WithdrawalForm";
import styles from "./WalletDashboard.module.scss";

interface WalletDashboardProps {
  className?: string;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({
  className = "",
}) => {
  const {
    selectedWallet,
    setSelectedWallet,
    transactionFilters,
    withdrawalFilters,
    walletBalance,
    walletTransactions,
    walletSummary,
    dashboardStats,
    withdrawals,
    withdrawalLimits,
    updateTransactionFilters,
    updateWithdrawalFilters,
    clearFilters,
  } = useWalletState();

  const withdrawalRequest = useWithdrawalRequest();
  const [activeTab, setActiveTab] = useState<
    "overview" | "transactions" | "withdrawals" | "withdraw"
  >("overview");

  const handleWithdrawalSubmit = (data: any) => {
    withdrawalRequest.mutate(data, {
      onSuccess: () => {
        setActiveTab("withdrawals");
      },
    });
  };

  const handleTransactionFilterChange = (filters: any) => {
    updateTransactionFilters(filters);
  };

  const handleWithdrawalFilterChange = (filters: any) => {
    updateWithdrawalFilters(filters);
  };

  const handleLoadMoreTransactions = () => {
    // Implement pagination logic
    updateTransactionFilters({
      page: (transactionFilters.page || 1) + 1,
    });
  };

  const handleLoadMoreWithdrawals = () => {
    // Implement pagination logic
    updateWithdrawalFilters({
      page: (withdrawalFilters.page || 1) + 1,
    });
  };

  if (walletBalance.isLoading || dashboardStats.isLoading) {
    return (
      <div className={`${styles.walletDashboard} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (walletBalance.error || dashboardStats.error) {
    return (
      <div className={`${styles.walletDashboard} ${className}`}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <i className="icon-alert-circle"></i>
          </div>
          <h3>Error Loading Wallet Data</h3>
          <p>
            There was an error loading your wallet information. Please try
            again.
          </p>
          <button
            className={styles.retryButton}
            onClick={() => {
              walletBalance.refetch();
              dashboardStats.refetch();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const wallets = walletBalance.data?.wallets || {
    earning: {
      display_name: "Earning",
      balance: "0.00",
      available_balance: "0.00",
      withdrawal_enabled: true,
      icon: "dollar-sign",
      color: "green",
    },
    bonus: {
      display_name: "Bonus",
      balance: "0.00",
      available_balance: "0.00",
      withdrawal_enabled: true,
      icon: "gift",
      color: "blue",
    },
    reward: {
      display_name: "Reward",
      balance: "0.00",
      available_balance: "0.00",
      withdrawal_enabled: true,
      icon: "star",
      color: "yellow",
    },
    holding: {
      display_name: "Holding",
      balance: "0.00",
      available_balance: "0.00",
      withdrawal_enabled: false,
      icon: "lock",
      color: "gray",
    },
    commission: {
      display_name: "Commission",
      balance: "0.00",
      available_balance: "0.00",
      withdrawal_enabled: true,
      icon: "percent",
      color: "purple",
    },
  };
  const stats = {
    overview: dashboardStats.data?.overview || {
      total_balance: "0.00",
      total_earnings: "0.00",
      total_withdrawals: "0.00",
      net_worth: "0.00",
    },
    recent_activity: dashboardStats.data?.recent_activity || [],
  };

  return (
    <div className={`${styles.walletDashboard} ${className}`}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1>Wallet Dashboard</h1>
          <p>Manage your earnings, transactions, and withdrawals</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.refreshButton}
            onClick={() => {
              walletBalance.refetch();
              dashboardStats.refetch();
            }}
          >
            <i className="icon-refresh-cw"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "overview" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <i className="icon-layout-dashboard"></i>
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "transactions" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          <i className="icon-list"></i>
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
            activeTab === "withdraw" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("withdraw")}
        >
          <i className="icon-plus"></i>
          Withdraw
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className={styles.overviewTab}>
            {/* Wallet Cards */}
            <div className={styles.walletCards}>
              {wallets &&
                Object.entries(wallets).map(([type, wallet]) => (
                  <WalletCard
                    key={type}
                    walletType={type}
                    wallet={wallet}
                    isSelected={selectedWallet === type}
                    onClick={() => setSelectedWallet(type)}
                  />
                ))}
            </div>

            {/* Summary Stats */}
            <div className={styles.summaryStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="icon-wallet"></i>
                </div>
                <div className={styles.statContent}>
                  <h3>Total Balance</h3>
                  <p className={styles.statValue}>
                    {stats.overview.total_balance}
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="icon-trending-up"></i>
                </div>
                <div className={styles.statContent}>
                  <h3>Total Earnings</h3>
                  <p className={styles.statValue}>
                    {stats.overview.total_earnings}
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="icon-arrow-down"></i>
                </div>
                <div className={styles.statContent}>
                  <h3>Total Withdrawals</h3>
                  <p className={styles.statValue}>
                    {stats.overview.total_withdrawals}
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="icon-pie-chart"></i>
                </div>
                <div className={styles.statContent}>
                  <h3>Net Worth</h3>
                  <p className={styles.statValue}>{stats.overview.net_worth}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {stats?.recent_activity && stats.recent_activity.length > 0 && (
              <div className={styles.recentActivity}>
                <h3>Recent Activity</h3>
                <div className={styles.activityList}>
                  {stats.recent_activity.map((activity, index) => (
                    <div key={index} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        <i className={`icon-${activity.icon}`}></i>
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityDescription}>
                          {activity.description}
                        </p>
                        <p className={styles.activityAmount}>
                          {activity.amount}
                        </p>
                      </div>
                      <div className={styles.activityDate}>{activity.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className={styles.transactionsTab}>
            <TransactionList
              transactions={walletTransactions.data?.transactions || []}
              isLoading={walletTransactions.isLoading}
              onFilterChange={handleTransactionFilterChange}
              onLoadMore={handleLoadMoreTransactions}
              hasMore={
                walletTransactions.data?.pagination.has_more_pages || false
              }
            />
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === "withdrawals" && (
          <div className={styles.withdrawalsTab}>
            <TransactionList
              transactions={withdrawals.data?.withdrawals || []}
              isLoading={withdrawals.isLoading}
              onFilterChange={handleWithdrawalFilterChange}
              onLoadMore={handleLoadMoreWithdrawals}
              hasMore={withdrawals.data?.pagination.has_more_pages || false}
            />
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === "withdraw" && (
          <div className={styles.withdrawTab}>
            <WithdrawalForm
              limits={withdrawalLimits.data}
              onSubmit={handleWithdrawalSubmit}
              isLoading={withdrawalRequest.isPending}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
