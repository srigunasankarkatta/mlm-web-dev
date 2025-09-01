import React, { useState } from 'react';
import type { CustomerProfile, MLMPlan } from '../types';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
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

  return (
    <div className={styles.profilePage}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              <span className={styles.avatarText}>{user.name.charAt(0)}</span>
            </div>
            <h1 className={styles.profileName}>{user.name}</h1>
            <p className={styles.memberSince}>Member since {user.joinDate.toLocaleDateString()}</p>
          </div>

          <div className={styles.profileStats}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Wallet Balance</p>
              <p className={styles.statValue + ' ' + styles.walletBalance}>${user.walletBalance.toFixed(2)}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Total Earnings</p>
              <p className={styles.statValue + ' ' + styles.totalEarnings}>${user.totalEarnings.toFixed(2)}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Referral Code</p>
              <p className={styles.statValue + ' ' + styles.referralCode}>{user.referralCode}</p>
            </div>
          </div>
        </div>

        {/* Package History */}
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
          <button className={styles.upgradeButton}>
            Upgrade Package
          </button>
        </div>

        {/* Account Details */}
        <div className={styles.accountDetails}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>👤</span>
            Account Details
          </h2>
          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{user.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Mobile</span>
              <span className={styles.detailValue}>{user.mobile}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Upline ID</span>
              <span className={styles.detailValue}>{user.uplineId}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Join Date</span>
              <span className={styles.detailValue}>{user.joinDate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
