import React, { useState, useMemo } from "react";
import {
  useUserProfile,
  useUserTeamTree,
  useIncomeHistory,
  useIncomeSummary,
} from "../hooks";
import DashboardCharts from "../components/DashboardCharts";
import styles from "./DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  // Fetch real API data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useUserProfile();
  const { data: teamTreeData, isLoading: isTeamLoading } = useUserTeamTree();
  const { data: incomeHistoryData, isLoading: isIncomeLoading } =
    useIncomeHistory({ per_page: 10 });
  const { data: incomeSummaryData } = useIncomeSummary();

  // Transform API data to match component expectations
  const user = useMemo(() => {
    if (!profileData?.data) return null;

    const profile = profileData.data;
    return {
      id: profile.user.id.toString(),
      name: profile.user.name,
      email: profile.user.email,
      mobile: profile.user.mobile || "Not provided",
      purchasedPlans: profile.user.package
        ? [
            {
              id: profile.user.package.id.toString(),
              name: profile.user.package.name,
              price: parseFloat(profile.user.package.price),
              level: 1, // Default level
              benefits: [],
              unlocks: [],
              isRequired: true,
              description: "",
              features: [],
            },
          ]
        : [],
      walletBalance: 0, // Not provided in API
      totalEarnings: parseFloat(profile.total_income || "0"),
      joinDate: new Date(), // Not provided in API
      referralCode: "N/A", // Not provided in API
      uplineId: "N/A", // Not provided in API
    };
  }, [profileData]);

  // Transform income summary data
  const incomeSummary = useMemo(() => {
    if (!incomeSummaryData) return null;

    const summary = incomeSummaryData;
    return {
      directIncome: {
        total: parseFloat(summary.income_by_type?.direct?.total_amount || "0"),
        breakdown: [
          {
            level: 1,
            percentage: 6,
            amount: parseFloat(
              summary.income_by_type?.direct?.total_amount || "0"
            ),
          },
        ],
      },
      levelIncome: {
        total: parseFloat(summary.income_by_type?.level?.total_amount || "0"),
        breakdown: [
          {
            level: 2,
            percentage: 2,
            amount: parseFloat(
              summary.income_by_type?.level?.total_amount || "0"
            ),
          },
        ],
      },
      clubIncome: {
        total: parseFloat(summary.income_by_type?.club?.total_amount || "0"),
        perJoin: 0.5,
        totalJoins: summary.income_by_type?.club?.count || 0,
      },
      autoPoolIncome: {
        total: parseFloat(
          summary.income_by_type?.autopool?.total_amount || "0"
        ),
        currentLevel: 1,
        members: 0,
        nextLevelMembers: 0,
      },
    };
  }, [incomeSummaryData]);

  // Create notifications from recent income data
  const notifications = useMemo(() => {
    if (!incomeHistoryData?.data?.incomes) return [];

    return incomeHistoryData.data.incomes.slice(0, 3).map((income, index) => ({
      id: income.id.toString(),
      type: "income" as const,
      title: `${
        income.type.charAt(0).toUpperCase() + income.type.slice(1)
      } Income`,
      message: income.remark,
      timestamp: new Date(income.date),
      isRead: index > 0,
    }));
  }, [incomeHistoryData]);

  // Calculate network size from team tree
  const networkSize = useMemo(() => {
    if (!teamTreeData?.data) return 0;

    const countMembers = (node: any): number => {
      let count = 1; // Count the current node
      if (node.children) {
        count += node.children.reduce(
          (sum: number, child: any) => sum + countMembers(child),
          0
        );
      }
      return count;
    };

    return countMembers(teamTreeData.data);
  }, [teamTreeData]);

  // Show loading state
  if (isProfileLoading) {
    return (
      <div className={styles.dashboardPage}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (profileError || !user) {
    return (
      <div className={styles.dashboardPage}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3>Error Loading Dashboard</h3>
            <p>Please try refreshing the page or contact support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <div className={styles.userInfo}>
              <h1 className={styles.welcomeTitle}>
                Welcome back, {user.name}! 👋
              </h1>
              <p className={styles.userDetails}>
                Member since {user.joinDate.toLocaleDateString()} • Referral
                Code: {user.referralCode}
              </p>
            </div>
            <div className={styles.financialStats}>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Wallet Balance</p>
                <p className={styles.statValue + " " + styles.walletBalance}>
                  ${user.walletBalance.toFixed(2)}
                </p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Total Earnings</p>
                <p className={styles.statValue + " " + styles.totalEarnings}>
                  ${user.totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Purchased Plans</p>
                <p className={styles.statValue}>{user.purchasedPlans.length}</p>
              </div>
              <div className={styles.statIcon + " " + styles.plansIcon}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Direct Referrals</p>
                <p className={styles.statValue}>
                  {profileData?.data?.directs?.length || 0}/4
                </p>
              </div>
              <div className={styles.statIcon + " " + styles.referralsIcon}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Network Size</p>
                <p className={styles.statValue}>{networkSize}</p>
              </div>
              <div className={styles.statIcon + " " + styles.networkIcon}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Total Transactions</p>
                <p className={styles.statValue}>
                  {incomeSummaryData?.total_transactions || 0}
                </p>
              </div>
              <div className={styles.statIcon + " " + styles.poolIcon}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainContent}>
          {/* Charts Section */}
          <div className={styles.chartsSection}>
            {incomeSummary ? (
              <DashboardCharts incomeSummary={incomeSummary} />
            ) : (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading charts...</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Purchased Plans */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.cardTitle}>Your Plans</h3>
              <div className={styles.plansList}>
                {user.purchasedPlans.map((plan) => (
                  <div key={plan.id} className={styles.planItem}>
                    <div className={styles.planInfo}>
                      <p className={styles.planName}>{plan.name}</p>
                      <p className={styles.planLevel}>Level {plan.level}</p>
                    </div>
                    <span className={styles.planPrice}>${plan.price}</span>
                  </div>
                ))}
              </div>
              <button className={styles.upgradeButton}>Upgrade Plan</button>
            </div>

            {/* Notifications */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.cardTitle}>Recent Notifications</h3>
              <div className={styles.notificationsList}>
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${
                      notification.type === "income"
                        ? styles.incomeNotification
                        : notification.type === "member"
                        ? styles.memberNotification
                        : notification.type === "upgrade"
                        ? styles.upgradeNotification
                        : styles.defaultNotification
                    }`}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationText}>
                        <p className={styles.notificationTitle}>
                          {notification.title}
                        </p>
                        <p className={styles.notificationMessage}>
                          {notification.message}
                        </p>
                        <p className={styles.notificationTime}>
                          {notification.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className={styles.unreadIndicator}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.viewAllButton}>
                View All Notifications
              </button>
            </div>

            {/* Quick Actions */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.cardTitle}>Quick Actions</h3>
              <div className={styles.quickActions}>
                <button className={styles.actionButton}>
                  <div className={styles.actionContent}>
                    <div
                      className={styles.actionIcon + " " + styles.inviteIcon}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className={styles.actionText}>Invite Friends</span>
                  </div>
                </button>
                <button className={styles.actionButton}>
                  <div className={styles.actionContent}>
                    <div
                      className={styles.actionIcon + " " + styles.reportsIcon}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <span className={styles.actionText}>View Reports</span>
                  </div>
                </button>
                <button className={styles.actionButton}>
                  <div className={styles.actionContent}>
                    <div
                      className={styles.actionIcon + " " + styles.withdrawIcon}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <span className={styles.actionText}>Withdraw Earnings</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
