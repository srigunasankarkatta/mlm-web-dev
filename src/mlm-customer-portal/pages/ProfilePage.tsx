import React from "react";
import { useUserProfile } from "../hooks/useProfile";
import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  // Fetch user profile data from API
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useUserProfile();

  // Show loading state
  if (isProfileLoading) {
    return (
      <div className={styles.profilePage}>
        <div className="max-w-4xl mx-auto px-4">
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
        <div className="max-w-4xl mx-auto px-4">
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
        referralCode: "", // Not provided in API response
        uplineId: "", // Not provided in API response
      }
    : {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        mobile: "+1234567890",
        purchasedPlans: [
          {
            id: "package-1",
            name: "Package-1",
            price: 20,
            level: 1,
            benefits: [],
            unlocks: [],
            isRequired: true,
            description: "",
            features: [],
          },
          {
            id: "package-2",
            name: "Package-2",
            price: 40,
            level: 2,
            benefits: [],
            unlocks: [],
            isRequired: false,
            description: "",
            features: [],
          },
        ],
        walletBalance: 125.5,
        totalEarnings: 342.75,
        joinDate: new Date("2024-01-15"),
        referralCode: "JOHN001",
        uplineId: "UPLINE001",
      };

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
          <button className={styles.upgradeButton}>Upgrade Package</button>
        </div>

        {/* Directs Section */}
        {profileData?.data.directs && profileData.data.directs.length > 0 && (
          <div className={styles.directsSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>👥</span>
              My Directs ({profileData.data.directs.length})
            </h2>
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
          </div>
        )}

        {/* Income History */}
        {profileData?.data.incomes && profileData.data.incomes.length > 0 && (
          <div className={styles.incomeSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💰</span>
              Income History
            </h2>
            <div className={styles.incomesList}>
              {profileData.data.incomes.map((income, index) => (
                <div key={index} className={styles.incomeItem}>
                  <div className={styles.incomeInfo}>
                    <h3 className={styles.incomeType}>
                      {income.type.charAt(0).toUpperCase() +
                        income.type.slice(1)}{" "}
                      Income
                    </h3>
                    <p className={styles.incomeRemark}>{income.remark}</p>
                    <p className={styles.incomeDate}>
                      {new Date(income.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={styles.incomeAmount}>
                    <p className={styles.amountValue}>${income.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default ProfilePage;
