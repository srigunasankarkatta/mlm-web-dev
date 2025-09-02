import React, { useState } from "react";
import { useUserProfile } from "../hooks/useProfile";
import { useIncomeHistory, useIncomeSummary } from "../hooks/useIncomeHistory";
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

  // Show loading state
  if (isProfileLoading) {
    return (
      <div className={styles.profilePage}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (profileError) {
    return (
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
    { id: "account", label: "Account Details", icon: "⚙️" },
  ];

  return (
    <div className={styles.profilePage}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              <span className={styles.avatarText}>{user.name.charAt(0)}</span>
            </div>
            <h1 className={styles.profileName}>{user.name}</h1>
            <p className={styles.memberSince}>
              Member since {user.joinDate.toLocaleDateString()}
            </p>
          </div>

          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Wallet Balance</p>
              <p className={styles.statValue + " " + styles.walletBalance}>
                ${user.walletBalance.toFixed(2)}
              </p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Total Earnings</p>
              <p className={styles.statValue + " " + styles.totalEarnings}>
                ${user.totalEarnings.toFixed(2)}
              </p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Referral Code</p>
              <p className={styles.statValue + " " + styles.referralCode}>
                {user.referralCode}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className={styles.overviewTab}>
              <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                  <h3>Quick Stats</h3>
                  <div className={styles.quickStats}>
                    <div className={styles.quickStat}>
                      <span className={styles.quickStatValue}>
                        {user.purchasedPlans.length}
                      </span>
                      <span className={styles.quickStatLabel}>Packages</span>
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
                        <div key={income.id} className={styles.activityItem}>
                          <div className={styles.activityIcon}>💰</div>
                          <div className={styles.activityDetails}>
                            <p className={styles.activityTitle}>
                              {income.type.charAt(0).toUpperCase() +
                                income.type.slice(1)}{" "}
                              Income
                            </p>
                            <p className={styles.activityAmount}>
                              +${income.amount}
                            </p>
                            <p className={styles.activityDate}>
                              {income.formatted_date} at {income.time}
                            </p>
                          </div>
                        </div>
                      )) || (
                      <p className={styles.noActivity}>No recent activity</p>
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
                {user.purchasedPlans.map((plan) => (
                  <div key={plan.id} className={styles.packageItem}>
                    <div className={styles.packageInfo}>
                      <h3 className={styles.packageName}>{plan.name}</h3>
                      <p className={styles.packageLevel}>Level {plan.level}</p>
                    </div>
                    <div className={styles.packageDetails}>
                      <p className={styles.packagePrice}>${plan.price}</p>
                      <p className={styles.packageStatus}>Purchased</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.upgradeButton}>Upgrade Package</button>
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
                          {direct.package ? direct.package.name : "No Package"}
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
                        ${incomeSummary.total_income}
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
              incomeHistoryData?.data?.data?.incomes &&
              incomeHistoryData.data?.data?.incomes.length > 0 ? (
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
                        {incomeHistoryData.data?.data?.incomes.map((income) => (
                          <tr key={income.id} className={styles.incomeRow}>
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
                                ${income.amount}
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
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Info */}
                  {incomeHistoryData.data?.pagination && (
                    <div className={styles.paginationInfo}>
                      <p>
                        Showing {incomeHistoryData.data?.incomes.length} of{" "}
                        {incomeHistoryData.data?.pagination.total} transactions
                        {incomeHistoryData.data?.pagination.has_more_pages &&
                          " (Page " +
                            incomeHistoryData.data?.pagination.current_page +
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

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className={styles.accountDetails}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⚙️</span>
                Account Details
              </h2>
              <div className={styles.detailsList}>
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
                    {user.joinDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
