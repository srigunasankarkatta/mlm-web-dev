import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/admin-sidebar.module.scss";
import clsx from "clsx";
import { useAdminLogout } from "../../../queries/admin-auth";

/** ---- Types ---- */
type Role = "SUPER_ADMIN" | "ADMIN" | "USER";
type MenuItem = {
  id: string;
  labelKey: string; // i18n key or plain text
  to: string;
  icon: React.ReactNode; // keep your existing SVGs
  roles?: Role[]; // who can see this
};
type MenuSection = {
  id: string;
  titleKey: string;
  items: MenuItem[];
};

type AdminSidebarProps = {
  roles: Role[]; // current user's roles
};

/** ---- Icons (same SVGs you had) ---- */
const IconDashboard = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconPlans = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconRolesUsers = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 4.79086 5 7C5 4.79086 6.79086 3 9 3C11.2091 13 13 9.20914 13 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWallet = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11V13H18V11H16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconOverview = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconList = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTransaction = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWithdrawal = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 1V23M6 5H17.5C18.4283 5 19.3185 5.36875 19.9749 6.02513C20.6312 6.6815 21 7.57174 21 8.5C21 9.42826 20.6312 10.3185 19.9749 10.9749C19.3185 11.6312 18.4283 12 17.5 12H9.5C8.57174 12 7.6815 12.3687 7.02513 13.0251C6.36875 13.6815 6 14.5717 6 15.5C6 16.4283 6.36875 17.3185 7.02513 17.9749C7.6815 18.6312 8.57174 19 9.5 19H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconManual = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** ---- Menu Config ---- */
const MENU: MenuSection[] = [
  {
    id: "dashboard",
    titleKey: "📊 Dashboard",
    items: [
      {
        id: "overview",
        labelKey: "Overview",
        to: "/admin/dashboard",
        icon: IconDashboard,
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
    ],
  },
  {
    id: "user-management",
    titleKey: "👥 User Management",
    items: [
      {
        id: "all-users",
        labelKey: "All Users",
        to: "/admin/users",
        icon: IconRolesUsers,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    id: "package-management",
    titleKey: "📦 Package Management",
    items: [
      {
        id: "all-packages",
        labelKey: "All Packages",
        to: "/admin/packages",
        icon: IconPlans,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    id: "wallet-management",
    titleKey: "💰 Wallet Management",
    items: [
      {
        id: "wallet-overview",
        labelKey: "Overview",
        to: "/admin/wallets/overview",
        icon: IconOverview,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "wallet-list",
        labelKey: "Wallet List",
        to: "/admin/wallets/list",
        icon: IconList,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "wallet-transactions",
        labelKey: "Transactions",
        to: "/admin/wallets/transactions",
        icon: IconTransaction,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "wallet-withdrawals",
        labelKey: "Withdrawals",
        to: "/admin/wallets/withdrawals",
        icon: IconWithdrawal,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "wallet-manual",
        labelKey: "Manual Transactions",
        to: "/admin/wallets/manual",
        icon: IconManual,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ roles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminLogoutMutation = useAdminLogout();

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.to);
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    adminLogoutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Logout successful, navigating to login");
        navigate("/admin/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  const filteredMenu = useMemo(() => {
    return MENU.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.roles || item.roles.some((role) => roles.includes(role))
      ),
    })).filter((section) => section.items.length > 0);
  }, [roles]);

  return (
    <aside className={styles.adminSidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Admin Panel</h3>
      </div>

      <div className={styles.sidebarContent}>
        <nav className={styles.sidebarNav}>
          {filteredMenu.map((section) => (
            <div key={section.id} className={styles.menuSection}>
              <h4 className={styles.sectionTitle}>{section.titleKey}</h4>
              <ul className={styles.menuList}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <li key={item.id}>
                      <button
                        className={clsx(
                          styles.menuItem,
                          isActive && styles.menuItemActive
                        )}
                        onClick={() => handleMenuClick(item)}
                      >
                        <span className={styles.menuIcon}>{item.icon}</span>
                        <span className={styles.menuLabel}>
                          {item.labelKey}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button - Sticky at bottom */}
      <div className={styles.logoutSection}>
        <button
          onClick={handleLogout}
          disabled={adminLogoutMutation.isPending}
          className={styles.logoutButton}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoutIcon}
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12L16 7M21 12H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {adminLogoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
