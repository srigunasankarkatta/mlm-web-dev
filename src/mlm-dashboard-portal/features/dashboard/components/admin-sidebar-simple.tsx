import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/admin-sidebar.module.scss";
import clsx from "clsx";

/** ---- Types ---- */
type Role = "SUPER_ADMIN" | "ADMIN" | "USER";
type MenuItem = {
  id: string;
  labelKey: string; // i18n key or plain text
  to: string;
  icon: React.ReactNode; // keep your existing SVGs
  roles?: Role[]; // who can see this
  permissions?: string[]; // optional fine-grained gate
};
type MenuSection = {
  id: string;
  titleKey: string;
  items: MenuItem[];
  roles?: Role[];
  permissions?: string[];
};

type AdminSidebarProps = {
  roles: Role[]; // current user's roles
  permissions?: string[]; // current user's permissions (optional)
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
const IconFeatures = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 12C6 10.8954 6.89543 10 8 10M6 12C6 13.1046 6.89543 14 8 14M6 12H4M12 12V14M12 12H10M12 12H14M18 12C18 13.1046 17.1046 14 16 14M18 12C18 10.8954 17.1046 10 16 10M18 12H20M12 18V16M12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconCal = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3V7M16 3V7M3 11H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z"
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
const IconShield = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C3 16.9706 3 7.02944 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconReports = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13H8M16 17H8M10 9H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconInsights = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3V21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9L12 6L16 10L21 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconMetrics = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 20V10M12 20V4M6 20V14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconSystem = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 10H20C21.1046 10 22 10.8954 22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12C2 10.8954 2.89543 10 4 10H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2V6M8 2V6M3 10H21"
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
      {
        id: "statistics",
        labelKey: "Statistics",
        to: "/admin/analytics",
        icon: IconMetrics,
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
      {
        id: "recent-activity",
        labelKey: "Recent Activity",
        to: "/admin/activity",
        icon: IconInsights,
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
      {
        id: "network-tree",
        labelKey: "Network Tree",
        to: "/admin/team",
        icon: IconCal,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "user-stats",
        labelKey: "User Stats",
        to: "/admin/analytics",
        icon: IconMetrics,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "add-user",
        labelKey: "Add User",
        to: "/admin/users/new",
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
      {
        id: "add-package",
        labelKey: "Add Package",
        to: "/admin/packages/new",
        icon: IconPlans,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "edit-package",
        labelKey: "Edit Package",
        to: "/admin/packages/edit",
        icon: IconPlans,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "package-ranks",
        labelKey: "Package Ranks",
        to: "/admin/packages/ranks",
        icon: IconPlans,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    id: "rule-sets",
    titleKey: "⚙️ Rule Sets",
    items: [
      {
        id: "all-rules",
        labelKey: "All Rules",
        to: "/admin/rules",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "create-rule",
        labelKey: "Create Rule",
        to: "/admin/rules/create",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "direct-slabs",
        labelKey: "Direct Slabs",
        to: "/admin/rules/direct-slabs",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "level-percentages",
        labelKey: "Level Percentages",
        to: "/admin/rules/level-percentages",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "club-rules",
        labelKey: "Club Rules",
        to: "/admin/rules/club-rules",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "autopool-slabs",
        labelKey: "Autopool Slabs",
        to: "/admin/rules/autopool-slabs",
        icon: IconShield,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    id: "mlm-simulator",
    titleKey: "🎮 MLM Simulator",
    items: [
      {
        id: "join-simulation",
        labelKey: "Join Simulation",
        to: "/admin/simulator/join",
        icon: IconReports,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "upgrade-simulation",
        labelKey: "Upgrade Simulation",
        to: "/admin/simulator/upgrade",
        icon: IconReports,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "simulation-stats",
        labelKey: "Simulation Stats",
        to: "/admin/simulator/stats",
        icon: IconMetrics,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    id: "settings",
    titleKey: "⚙️ Settings",
    items: [
      {
        id: "authentication",
        labelKey: "🔐 Authentication",
        to: "/admin/settings",
        icon: IconSystem,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: "system-config",
        labelKey: "🗄️ System Config",
        to: "/admin/settings/system",
        icon: IconSystem,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  roles,
  permissions = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.to);
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
    </aside>
  );
};

export default AdminSidebar;
