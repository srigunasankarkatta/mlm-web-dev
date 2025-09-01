import React, { useState } from 'react';
import type { CustomerProfile, IncomeSummary, Notification } from '../types';
import DashboardCharts from '../components/DashboardCharts';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
  // Mock data - in real app this would come from API
  const [user] = useState<CustomerProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+1234567890',
    purchasedPlans: [
      { id: 'package-1', name: 'Package-1', price: 20, level: 1, benefits: [], unlocks: [], isRequired: true, description: '', features: [] },
      { id: 'package-2', name: 'Package-2', price: 40, level: 2, benefits: [], unlocks: [], isRequired: false, description: '', features: [] }
    ],
    walletBalance: 125.50,
    totalEarnings: 342.75,
    joinDate: new Date('2024-01-15'),
    referralCode: 'JOHN001',
    uplineId: 'UPLINE001'
  });

  const [incomeSummary] = useState<IncomeSummary>({
    directIncome: {
      total: 156.25,
      breakdown: [
        { level: 1, percentage: 6, amount: 45.00 },
        { level: 2, percentage: 9, amount: 67.50 },
        { level: 3, percentage: 12, amount: 43.75 }
      ]
    },
    levelIncome: {
      total: 89.50,
      breakdown: [
        { level: 2, percentage: 2, amount: 32.00 },
        { level: 3, percentage: 3, amount: 57.50 }
      ]
    },
    clubIncome: {
      total: 45.00,
      perJoin: 0.5,
      totalJoins: 90
    },
    autoPoolIncome: {
      total: 52.00,
      currentLevel: 2,
      members: 16,
      nextLevelMembers: 64
    }
  });

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'income',
      title: 'New Direct Referral',
      message: 'You earned $12.50 from a new direct referral',
      timestamp: new Date(),
      isRead: false
    },
    {
      id: '2',
      type: 'member',
      title: 'Network Growth',
      message: 'Your network has grown to 25 members',
      timestamp: new Date(Date.now() - 86400000),
      isRead: false
    },
    {
      id: '3',
      type: 'upgrade',
      title: 'Package Upgrade Available',
      message: 'You can now upgrade to Package-3 for $60',
      timestamp: new Date(Date.now() - 172800000),
      isRead: true
    }
  ]);

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
                Member since {user.joinDate.toLocaleDateString()} • Referral Code: {user.referralCode}
              </p>
            </div>
            <div className={styles.financialStats}>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Wallet Balance</p>
                <p className={styles.statValue + ' ' + styles.walletBalance}>${user.walletBalance.toFixed(2)}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Total Earnings</p>
                <p className={styles.statValue + ' ' + styles.totalEarnings}>${user.totalEarnings.toFixed(2)}</p>
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
              <div className={styles.statIcon + ' ' + styles.plansIcon}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Direct Referrals</p>
                <p className={styles.statValue}>
                  {incomeSummary.directIncome.breakdown.length}/4
                </p>
              </div>
              <div className={styles.statIcon + ' ' + styles.referralsIcon}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Network Size</p>
                <p className={styles.statValue}>25</p>
              </div>
              <div className={styles.statIcon + ' ' + styles.networkIcon}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Auto Pool Level</p>
                <p className={styles.statValue}>
                  {incomeSummary.autoPoolIncome.currentLevel}/3
                </p>
              </div>
              <div className={styles.statIcon + ' ' + styles.poolIcon}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainContent}>
          {/* Charts Section */}
          <div className={styles.chartsSection}>
            <DashboardCharts incomeSummary={incomeSummary} />
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
              <button className={styles.upgradeButton}>
                Upgrade Plan
              </button>
            </div>

            {/* Notifications */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.cardTitle}>Recent Notifications</h3>
              <div className={styles.notificationsList}>
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${
                      notification.type === 'income'
                        ? styles.incomeNotification
                        : notification.type === 'member'
                        ? styles.memberNotification
                        : notification.type === 'upgrade'
                        ? styles.upgradeNotification
                        : styles.defaultNotification
                    }`}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationText}>
                        <p className={styles.notificationTitle}>{notification.title}</p>
                        <p className={styles.notificationMessage}>{notification.message}</p>
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
                    <div className={styles.actionIcon + ' ' + styles.inviteIcon}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className={styles.actionText}>Invite Friends</span>
                  </div>
                </button>
                <button className={styles.actionButton}>
                  <div className={styles.actionContent}>
                    <div className={styles.actionIcon + ' ' + styles.reportsIcon}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className={styles.actionText}>View Reports</span>
                  </div>
                </button>
                <button className={styles.actionButton}>
                  <div className={styles.actionContent}>
                    <div className={styles.actionIcon + ' ' + styles.withdrawIcon}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
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
