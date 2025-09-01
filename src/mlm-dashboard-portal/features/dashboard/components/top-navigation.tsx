import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCurrentAdminUser,
  useAdminLogout,
} from "../../../queries/admin-auth";
import styles from "../styles/top-navigation.module.scss";

interface TopNavigationProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  onSidebarToggle,
  isSidebarOpen,
}) => {
  const navigate = useNavigate();
  const { user } = useCurrentAdminUser();
  const adminLogoutMutation = useAdminLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await adminLogoutMutation.mutateAsync();
      setShowUserMenu(false);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className={styles.topNavigation}>
      <div className={styles.navLeft}>
        <button
          className={styles.sidebarToggle}
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={styles.breadcrumbSection}>
          <span className={styles.breadcrumbIcon}>🏠</span>
          <span className={styles.breadcrumbText}>Admin Dashboard</span>
        </div>
      </div>

      <div className={styles.navCenter}>
        <div className={styles.searchContainer}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.searchIcon}
          >
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.navRight}>
        <button className={styles.notificationsBtn} aria-label="Notifications">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21C13.554 21.303 13.302 21.555 12.998 21.729C12.695 21.904 12.35 21.997 12 21.997C11.65 21.997 11.305 21.904 11.002 21.729C10.698 21.555 10.446 21.303 10.27 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.notificationBadge}>3</span>
        </button>

        <div className={styles.userSection} ref={userMenuRef}>
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user?.name || "Admin User"}
            </span>
            <span className={styles.userRole}>
              {user?.roles?.join(", ") || "Super Admin"}
            </span>
          </div>
          <button
            className={styles.userMenuBtn}
            aria-label="User menu"
            onClick={toggleUserMenu}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className={styles.userDropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>User Menu</span>
              </div>
              <div className={styles.dropdownItems}>
                <button className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>👤</span>
                  Profile
                </button>
                <button className={styles.dropdownItem}>
                  <span className={styles.dropdownIcon}>⚙️</span>
                  Settings
                </button>
                <div className={styles.dropdownDivider}></div>
                <button
                  className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  onClick={handleLogout}
                  disabled={adminLogoutMutation.isPending}
                >
                  <span className={styles.dropdownIcon}>🚪</span>
                  {adminLogoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
