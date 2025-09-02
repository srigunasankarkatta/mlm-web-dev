import React, { useState, useEffect } from "react";
import type { CustomerProfile, MLMPlan } from "../types";
import { useUserProfile, useCurrentUser } from "../queries/auth";
import { CustomerAuthService } from "../api-services/auth-service";
import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to get user data from React Query cache first
  const { data: profileData, isLoading: isProfileLoading } = useUserProfile();

  // Fallback to localStorage if React Query doesn't have data
  const currentUser = useCurrentUser();

  useEffect(() => {
    const loadUserData = () => {
      try {
        console.log("ProfilePage: Loading user data...");
        console.log("ProfilePage: profileData from React Query:", profileData);
        console.log("ProfilePage: currentUser from localStorage:", currentUser);
        console.log(
          "ProfilePage: isAuthenticated:",
          CustomerAuthService.isAuthenticated()
        );

        // First try to get from React Query cache
        if (profileData?.data) {
          console.log(
            "ProfilePage: Using profile data from React Query:",
            profileData.data
          );
          setUser({
            id: profileData.data.id,
            name: profileData.data.name,
            email: profileData.data.email,
            mobile: profileData.data.mobile || "",
            purchasedPlans: profileData.data.purchasedPlans || [],
            walletBalance: profileData.data.walletBalance || 0,
            totalEarnings: profileData.data.totalEarnings || 0,
            joinDate: new Date(profileData.data.joinDate),
            referralCode: profileData.data.referralCode,
            uplineId: profileData.data.uplineId,
          });
        }
        // Fallback to localStorage
        else if (currentUser) {
          console.log(
            "ProfilePage: Using user data from localStorage:",
            currentUser
          );
          setUser({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            mobile: currentUser.mobile || "",
            purchasedPlans: [],
            walletBalance: 0,
            totalEarnings: 0,
            joinDate: new Date(),
            referralCode: currentUser.referralCode || "",
            uplineId: currentUser.uplineId,
          });
        }
        // If no data available, show default
        else {
          console.log("ProfilePage: No user data available, showing default");
          setUser({
            id: "1",
            name: "Guest User",
            email: "guest@example.com",
            mobile: "",
            purchasedPlans: [],
            walletBalance: 0,
            totalEarnings: 0,
            joinDate: new Date(),
            referralCode: "",
            uplineId: "",
          });
        }
      } catch (error) {
        console.error("ProfilePage: Error loading user data:", error);
        setUser({
          id: "1",
          name: "Error Loading",
          email: "error@example.com",
          mobile: "",
          purchasedPlans: [],
          walletBalance: 0,
          totalEarnings: 0,
          joinDate: new Date(),
          referralCode: "",
          uplineId: "",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [profileData, currentUser]);

  // Show loading state
  if (isLoading || isProfileLoading) {
    return (
      <div className={styles.profilePage}>
        <div className="max-w-4xl mx-auto px-4">
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no user data
  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className="max-w-4xl mx-auto px-4">
          <div className={styles.errorContainer}>
            <h2>Unable to load profile</h2>
            <p>Please try logging in again.</p>
          </div>
        </div>
      </div>
    );
  }

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
              <span className={styles.detailValue}>
                {user.joinDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Debug Section - Remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className={styles.debugSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🐛</span>
              Debug Info
            </h2>
            <div className={styles.debugInfo}>
              <div className={styles.debugItem}>
                <span className={styles.debugLabel}>
                  Authentication Status:
                </span>
                <span className={styles.debugValue}>
                  {CustomerAuthService.isAuthenticated()
                    ? "Authenticated"
                    : "Not Authenticated"}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.debugLabel}>Profile Data Source:</span>
                <span className={styles.debugValue}>
                  {profileData ? "React Query" : "localStorage"}
                </span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.debugLabel}>Current User ID:</span>
                <span className={styles.debugValue}>{user.id}</span>
              </div>
              <div className={styles.debugItem}>
                <span className={styles.debugLabel}>User Name:</span>
                <span className={styles.debugValue}>{user.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
