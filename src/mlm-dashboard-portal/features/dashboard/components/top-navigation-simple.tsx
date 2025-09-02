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
      adminLogoutMutation.mutate(undefined, {
        onSuccess: () => {
          setShowUserMenu(false);
          navigate("/admin/login");
        },
      });
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
          <span className={styles.breadcrumbIcon}>hb</span>
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
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user?.name || "Admin User"}
            </span>
            <span className={styles.userRole}>
              {user?.roles?.[0]?.name?.replace("_", " ") || "Admin"}
            </span>
          </div>

          <div className={styles.userAvatar} ref={userMenuRef}>
            <button
              className={styles.avatarButton}
              onClick={toggleUserMenu}
              aria-label="User menu"
            >
              <div className={styles.avatar}>
                {user?.name?.charAt(0) || "A"}
              </div>
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.dropdownAvatar}>
                    {user?.name?.charAt(0) || "A"}
                  </div>
                  <div className={styles.dropdownUserInfo}>
                    <span className={styles.dropdownUserName}>
                      {user?.name || "Admin User"}
                    </span>
                    <span className={styles.dropdownUserEmail}>
                      {user?.email || "admin@example.com"}
                    </span>
                  </div>
                </div>

                <div className={styles.dropdownDivider}></div>

                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                  disabled={adminLogoutMutation.isPending}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.dropdownIcon}
                  >
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {adminLogoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
