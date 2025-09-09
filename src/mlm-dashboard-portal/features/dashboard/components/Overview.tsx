import React from "react";
import styles from "./DashboardOverview.module.scss";

const DashboardOverview: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Dashboard Overview</h1>
          <p className={styles.headerSubtitle}>
            Welcome back! Here's what's happening with your MLM business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg
                className={styles.icon}
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
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Total Users</p>
              <p className={styles.statValue}>2,847</p>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+12%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Active Users</p>
              <p className={styles.statValue}>1,234</p>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+8%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Revenue</p>
              <p className={styles.statValue}>$45,231</p>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+8.2%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Growth Rate</p>
              <p className={styles.statValue}>23.5%</p>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+2.1%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className={styles.analyticsGrid}>
          <div className={styles.analyticsCard}>
            <h3 className={styles.cardTitle}>User Analytics</h3>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>New Users</span>
              <span className={styles.analyticsValue}>342</span>
            </div>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>Income Distributed</span>
              <span className={styles.analyticsValue}>$12,450</span>
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <h3 className={styles.cardTitle}>Package Analytics</h3>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>New Users</span>
              <span className={styles.analyticsValue}>156</span>
            </div>
            <div className={styles.analyticsItem}>
              <span className={styles.analyticsLabel}>Income Distributed</span>
              <span className={styles.analyticsValue}>$8,230</span>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className={styles.packagesCard}>
          <h3 className={styles.cardTitle}>Package Performance</h3>
          <div className={styles.packagesList}>
            <div className={styles.packageItem}>
              <h4 className={styles.packageName}>Starter Package</h4>
              <p className={styles.packageLevel}>Level 1</p>
              <div className={styles.packageDetails}>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Price:</span>
                  <span className={styles.packageValue}>$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Users:</span>
                  <span className={styles.packageValue}>1,234</span>
                </div>
              </div>
            </div>
            <div className={styles.packageItem}>
              <h4 className={styles.packageName}>Premium Package</h4>
              <p className={styles.packageLevel}>Level 2</p>
              <div className={styles.packageDetails}>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Price:</span>
                  <span className={styles.packageValue}>$500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Users:</span>
                  <span className={styles.packageValue}>567</span>
                </div>
              </div>
            </div>
            <div className={styles.packageItem}>
              <h4 className={styles.packageName}>Elite Package</h4>
              <p className={styles.packageLevel}>Level 3</p>
              <div className={styles.packageDetails}>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Price:</span>
                  <span className={styles.packageValue}>$1,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={styles.packageLabel}>Users:</span>
                  <span className={styles.packageValue}>89</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.packagesSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Revenue:</span>
              <span className={styles.summaryValue}>$234,567</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Users:</span>
              <span className={styles.summaryValue}>1,890</span>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className={styles.recentUsersCard}>
          <h3 className={styles.cardTitle}>Recent Users</h3>
          <div className={styles.usersList}>
            <div className={styles.userItem}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>John Doe</p>
                <p className={styles.userEmail}>john@example.com</p>
              </div>
              <div className={styles.userStats}>
                <p className={styles.userBalance}>$1,250</p>
                <p className={styles.userDate}>2 hours ago</p>
              </div>
            </div>
            <div className={styles.userItem}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>Jane Smith</p>
                <p className={styles.userEmail}>jane@example.com</p>
              </div>
              <div className={styles.userStats}>
                <p className={styles.userBalance}>$850</p>
                <p className={styles.userDate}>4 hours ago</p>
              </div>
            </div>
            <div className={styles.userItem}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>Mike Johnson</p>
                <p className={styles.userEmail}>mike@example.com</p>
              </div>
              <div className={styles.userStats}>
                <p className={styles.userBalance}>$2,100</p>
                <p className={styles.userDate}>6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className={styles.recentActivitiesCard}>
          <h3 className={styles.cardTitle}>Recent Activities</h3>
          <div className={styles.activitiesList}>
            <div className={styles.activityItem}>
              <div className={styles.activityInfo}>
                <p className={styles.activityDescription}>
                  New user registration
                </p>
                <p className={styles.activityType}>Registration</p>
              </div>
              <div className={styles.activityStats}>
                <p className={styles.activityAmount}>+$100</p>
                <p className={styles.activityDate}>1 hour ago</p>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityInfo}>
                <p className={styles.activityDescription}>Package purchase</p>
                <p className={styles.activityType}>Purchase</p>
              </div>
              <div className={styles.activityStats}>
                <p className={styles.activityAmount}>+$500</p>
                <p className={styles.activityDate}>3 hours ago</p>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityInfo}>
                <p className={styles.activityDescription}>Commission payout</p>
                <p className={styles.activityType}>Payout</p>
              </div>
              <div className={styles.activityStats}>
                <p className={styles.activityAmount}>+$75</p>
                <p className={styles.activityDate}>5 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* MLM Tree Stats */}
        <div className={styles.mlmStatsCard}>
          <h3 className={styles.cardTitle}>MLM Tree Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <p className={styles.statValue}>1,234</p>
              <p className={styles.statLabel}>Root Users</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statValue}>5,678</p>
              <p className={styles.statLabel}>Users with Directs</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statValue}>4.6</p>
              <p className={styles.statLabel}>Avg Directs</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statValue}>12</p>
              <p className={styles.statLabel}>Max Depth</p>
            </div>
          </div>
        </div>

        {/* Growth Metrics */}
        <div className={styles.growthMetricsCard}>
          <h3 className={styles.cardTitle}>Growth Metrics</h3>
          <div className={styles.metricsGrid}>
            <div className={styles.metricSection}>
              <h4 className={styles.metricTitle}>User Growth</h4>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>This Month:</span>
                <span className={styles.metricValue}>+342</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Last Month:</span>
                <span className={styles.metricValue}>+298</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Growth Rate:</span>
                <span className={styles.metricValue}>+14.8%</span>
              </div>
            </div>
            <div className={styles.metricSection}>
              <h4 className={styles.metricTitle}>Income Growth</h4>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>This Month:</span>
                <span className={styles.metricValue}>$12,450</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Last Month:</span>
                <span className={styles.metricValue}>$10,230</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Growth Rate:</span>
                <span className={styles.metricValue}>+21.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
