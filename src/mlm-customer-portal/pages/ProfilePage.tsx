import React, { useState } from "react";
import { useUserProfile } from "../hooks/useProfile";
import { useIncomeHistory, useIncomeSummary } from "../hooks/useIncomeHistory";
import { useTransactions } from "../hooks/useTransactions";
import type { TransactionsListResponse } from "../api-services";
import { TransactionsTable } from "../components";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user profile data from API
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useUserProfile();

  // Fetch income history data from separate API
  const {
    data: incomeHistoryData,
    isLoading: isIncomeLoading,
    error: incomeError,
  } = useIncomeHistory({ per_page: 20 });

  // Fetch income summary for overview
  const { data: incomeSummary } = useIncomeSummary();

  // Fetch transactions data
  const {
    data: transactionsData,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useTransactions({ per_page: 50 }) as {
    data: TransactionsListResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  // Fetch transaction summary
  // const { data: transactionSummary } = useTransactionSummary();

  // Debug log to check transaction data (remove in production)
  // console.log("Transaction Summary Data:", transactionSummary);
  // console.log("Transactions Data:", transactionsData);

  // Show loading state
  if (isProfileLoading) {
    return (
      <CustomerLayout>
        <div className={styles.profilePage}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  // Show error state
  if (profileError) {
    return (
      <CustomerLayout>
        <div className={styles.profilePage}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Error Loading Profile
              </h2>
              <p className="text-gray-600">
                Please try refreshing the page or contact support.
              </p>
            </div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  // Use API data or fallback to mock data
  const user = profileData?.data
    ? {
        id: profileData.data.user.id.toString(),
        name: profileData.data.user.name,
        email: profileData.data.user.email,
        mobile: "", // Not provided in API response
        purchasedPlans: profileData.data.user.package
          ? [
              {
                id: profileData.data.user.package.id.toString(),
                name: profileData.data.user.package.name,
                price: parseFloat(profileData.data.user.package.price),
                level: 1,
                benefits: [],
                unlocks: [],
                isRequired: true,
                description: "",
                features: [],
              },
            ]
          : [],
        walletBalance: 0, // Not provided in API response
        totalEarnings: parseFloat(profileData.data.total_income),
        joinDate: new Date(), // Not provided in API response
        referralCode: profileData.data.user.referralCode, // Not provided in API response
        uplineId: "", // Not provided in API response
      }
    : {};

  // Define tabs
  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "packages", label: "Packages", icon: "📦" },
    { id: "directs", label: "My Directs", icon: "👥" },
    { id: "income", label: "Income History", icon: "💰" },
    { id: "transactions", label: "Transactions", icon: "💳" },
    { id: "account", label: "Account Details", icon: "⚙️" },
  ];

  return (
    <CustomerLayout>
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          {/* Main Content Area */}
          <div className={styles.mainContent}>
            {/* Vertical Sidebar Navigation */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <h3>Navigation</h3>
              </div>
              <nav className={styles.sidebarNav}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.sidebarButton} ${
                      activeTab === tab.id ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className={styles.sidebarIcon}>{tab.icon}</span>
                    <span className={styles.sidebarLabel}>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className={styles.contentArea}>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className={styles.overviewTab}>
                  <div className={styles.overviewGrid}>
                    <div className={styles.overviewCard}>
                      <h3>Quick Stats</h3>
                      <div className={styles.quickStats}>
                        <div className={styles.quickStat}>
                          <span className={styles.quickStatValue}>
                            {user.purchasedPlans?.length || 0}
                          </span>
                          <span className={styles.quickStatLabel}>
                            Packages
                          </span>
                        </div>
                        <div className={styles.quickStat}>
                          <span className={styles.quickStatValue}>
                            {profileData?.data.directs?.length || 0}
                          </span>
                          <span className={styles.quickStatLabel}>Directs</span>
                        </div>
                        <div className={styles.quickStat}>
                          <span className={styles.quickStatValue}>
                            {incomeSummary?.total_transactions || 0}
                          </span>
                          <span className={styles.quickStatLabel}>
                            Transactions
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.overviewCard}>
                      <h3>Recent Activity</h3>
                      <div className={styles.recentActivity}>
                        {incomeHistoryData?.data?.incomes
                          ?.slice(0, 3)
                          .map((income) => (
                            <div
                              key={income.id}
                              className={styles.activityItem}
                            >
                              <div className={styles.activityIcon}>💰</div>
                              <div className={styles.activityDetails}>
                                <p className={styles.activityTitle}>
                                  {income.type.charAt(0).toUpperCase() +
                                    income.type.slice(1)}{" "}
                                  Income
                                </p>
                                <p className={styles.activityAmount}>
                                  +₹{income.amount}
                                </p>
                                <p className={styles.activityDate}>
                                  {income.formatted_date} at {income.time}
                                </p>
                              </div>
                            </div>
                          )) || (
                          <p className={styles.noActivity}>
                            No recent activity
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Packages Tab */}
              {activeTab === "packages" && (
                <div className={styles.packageHistory}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📦</span>
                    Package History
                  </h2>
                  <div className={styles.packagesList}>
                    {(user.purchasedPlans || []).map((plan) => (
                      <div key={plan.id} className={styles.packageItem}>
                        <div className={styles.packageInfo}>
                          <h3 className={styles.packageName}>{plan.name}</h3>
                          <p className={styles.packageLevel}>
                            Level {plan.level}
                          </p>
                        </div>
                        <div className={styles.packageDetails}>
                          <p className={styles.packagePrice}>₹{plan.price}</p>
                          <p className={styles.packageStatus}>Purchased</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={styles.upgradeButton}>
                    Upgrade Package
                  </button>
                </div>
              )}

              {/* Directs Tab */}
              {activeTab === "directs" && (
                <div className={styles.directsSection}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>👥</span>
                    My Directs ({profileData?.data.directs?.length || 0})
                  </h2>
                  {profileData?.data.directs &&
                  profileData.data.directs.length > 0 ? (
                    <div className={styles.directsList}>
                      {profileData.data.directs.map((direct) => (
                        <div key={direct.id} className={styles.directItem}>
                          <div className={styles.directInfo}>
                            <h3 className={styles.directName}>{direct.name}</h3>
                            <p className={styles.directEmail}>{direct.email}</p>
                          </div>
                          <div className={styles.directDetails}>
                            <p className={styles.directPackage}>
                              {direct.package
                                ? direct.package.name
                                : "No Package"}
                            </p>
                            {direct.package && (
                              <p className={styles.directPackageLevel}>
                                Level {direct.package.level_unlock}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>👥</div>
                      <h3>No Directs Yet</h3>
                      <p>
                        You haven't referred anyone yet. Start building your
                        network!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Income Tab */}
              {activeTab === "income" && (
                <div className={styles.incomeSection}>
                  <div className={styles.incomeHeader}>
                    <h2 className={styles.sectionTitle}>
                      <span className={styles.sectionIcon}>💰</span>
                      Income History
                    </h2>

                    {/* Income Summary */}
                    {incomeSummary && (
                      <div className={styles.incomeSummary}>
                        <div className={styles.summaryCard}>
                          <h4>Total Income</h4>
                          <p className={styles.summaryAmount}>
                            ₹{incomeSummary.total_income}
                          </p>
                        </div>
                        <div className={styles.summaryCard}>
                          <h4>Total Transactions</h4>
                          <p className={styles.summaryCount}>
                            {incomeSummary.total_transactions}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Loading State */}
                  {isIncomeLoading && (
                    <div className={styles.loadingState}>
                      <div className={styles.spinner}></div>
                      <p>Loading income history...</p>
                    </div>
                  )}

                  {/* Error State */}
                  {incomeError && (
                    <div className={styles.errorState}>
                      <div className={styles.errorIcon}>⚠️</div>
                      <h3>Error Loading Income History</h3>
                      <p>Please try refreshing the page or contact support.</p>
                    </div>
                  )}

                  {/* Income Table */}
                  {!isIncomeLoading &&
                  !incomeError &&
                  incomeHistoryData?.data?.incomes &&
                  incomeHistoryData.data?.incomes.length > 0 ? (
                    <>
                      <div className={styles.incomeTableContainer}>
                        <table className={styles.incomeTable}>
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Amount</th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {incomeHistoryData.data?.incomes.map(
                              (income: any) => (
                                <tr
                                  key={income.id}
                                  className={styles.incomeRow}
                                >
                                  <td>
                                    <span
                                      className={`${styles.incomeType} ${
                                        styles[income.type]
                                      }`}
                                    >
                                      {income.type.charAt(0).toUpperCase() +
                                        income.type.slice(1)}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={styles.amountValue}>
                                      ₹{income.amount}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={styles.incomeRemark}>
                                      {income.remark}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={styles.incomeDate}>
                                      {income.formatted_date}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={styles.incomeTime}>
                                      {income.time}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Info */}
                      {incomeHistoryData.data?.pagination && (
                        <div className={styles.paginationInfo}>
                          <p>
                            Showing {incomeHistoryData.data?.incomes.length} of{" "}
                            {incomeHistoryData.data?.pagination.total}{" "}
                            transactions
                            {incomeHistoryData.data?.pagination
                              .has_more_pages &&
                              " (Page " +
                                incomeHistoryData.data?.pagination
                                  .current_page +
                                ")"}
                          </p>
                        </div>
                      )}
                    </>
                  ) : !isIncomeLoading && !incomeError ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>💰</div>
                      <h3>No Income History</h3>
                      <p>
                        Your income transactions will appear here once you start
                        earning.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === "transactions" && (
                <div className={styles.transactionsSection}>
                  {/* Loading State */}
                  {isTransactionsLoading && (
                    <div className={styles.loadingState}>
                      <div className={styles.spinner}></div>
                      <p>Loading transactions...</p>
                    </div>
                  )}

                  {/* Error State */}
                  {transactionsError && (
                    <div className={styles.errorState}>
                      <div className={styles.errorIcon}>⚠️</div>
                      <h3>Error Loading Transactions</h3>
                      <p>Please try refreshing the page or contact support.</p>
                      <button
                        className={styles.retryButton}
                        onClick={() => window.location.reload()}
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex items-center justify-between bg-white shadow-sm rounded-lg px-4 py-3 my-4">
                    {/* Left Side */}
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Transaction Records
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                        {transactionsData?.data?.transactions?.length ||
                          transactionsData?.data?.pagination?.total ||
                          0}{" "}
                        records
                      </span>
                    </div>

                    {/* Right Side */}
                    <button
                      onClick={() => window.location.reload()}
                      disabled={isTransactionsLoading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isTransactionsLoading
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <span
                        className={`text-lg ${
                          isTransactionsLoading ? "animate-spin" : ""
                        }`}
                      >
                        🔄
                      </span>
                      {isTransactionsLoading ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>

                  {/* Transactions Table */}
                  {!isTransactionsLoading &&
                  !transactionsError &&
                  transactionsData?.data?.transactions &&
                  transactionsData.data.transactions.length > 0 ? (
                    <TransactionsTable
                      transactions={transactionsData.data.transactions}
                      loading={isTransactionsLoading}
                      onTransactionSelect={(transaction) => {
                        console.log("Selected transaction:", transaction);
                        // Handle transaction selection if needed
                      }}
                    />
                  ) : !isTransactionsLoading && !transactionsError ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>💳</div>
                      <h3>No Transactions Found</h3>
                      <p>
                        Your transaction history will appear here once you make
                        purchases or receive payments.
                      </p>
                      <div className={styles.emptyActions}>
                        <button
                          className={styles.primaryButton}
                          onClick={() => setActiveTab("packages")}
                        >
                          Browse Packages
                        </button>
                        <button
                          className={styles.secondaryButton}
                          onClick={() => setActiveTab("income")}
                        >
                          View Income History
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Account Tab */}
              {activeTab === "account" && (
                <div className={styles.accountDetails}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>⚙️</span>
                    Account Details
                  </h2>
                  <div className={styles.detailsList}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Wallet Balance</span>
                      <span
                        className={`${styles.detailValue} ${styles.walletBalance}`}
                      >
                        ₹{(user.walletBalance || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Total Earnings</span>
                      <span
                        className={`${styles.detailValue} ${styles.totalEarnings}`}
                      >
                        ₹{(user.totalEarnings || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Referral Code</span>
                      <span
                        className={`${styles.detailValue} ${styles.referralCode}`}
                      >
                        {user.referralCode}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Email</span>
                      <span className={styles.detailValue}>{user.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Mobile</span>
                      <span className={styles.detailValue}>
                        {user.mobile || "Not provided"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Upline ID</span>
                      <span className={styles.detailValue}>
                        {user.uplineId || "Not provided"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Join Date</span>
                      <span className={styles.detailValue}>
                        {user.joinDate?.toLocaleDateString() || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ProfilePage;
