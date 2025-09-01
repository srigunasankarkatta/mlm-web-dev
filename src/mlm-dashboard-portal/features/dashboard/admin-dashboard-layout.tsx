import React, { useState } from "react";
import clsx from "clsx";
import styles from "../../features/dashboard/styles/admin-layout.module.scss";
import AdminSidebar from "./components/admin-sidebar";
import TopNavigation from "./components/top-navigation";
import BreadcrumbV2 from "../../../shared/components/bread-crumb-v2";
import { useCurrentAdminUser } from "../../queries/admin-auth";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useCurrentAdminUser();

  // Default breadcrumb items for the admin dashboard
  const defaultBreadcrumbs = [
    { label: "Home", path: "/", active: false },
    { label: "Admin Dashboard", path: "/admin", active: true },
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Convert admin roles to the format expected by AdminSidebar
  const getAdminRoles = () => {
    if (!user?.roles) return ["ADMIN"];

    return user.roles.map((role: string) => {
      switch (role) {
        case "super_admin":
          return "SUPER_ADMIN";
        case "admin":
          return "ADMIN";
        case "manager":
          return "ADMIN";
        case "support":
          return "ADMIN";
        case "viewer":
          return "USER";
        default:
          return "ADMIN";
      }
    });
  };

  return (
    <div className={styles["admin-layout-container"]}>
      <div className={styles["admin-main-content"]} data-id="dashboard-main">
        <div
          className={clsx(
            styles["admin-sidebar-container"],
            !isSidebarOpen && styles["admin-sidebar-collapsed"]
          )}
          data-id="admin-sidebar"
        >
          <AdminSidebar roles={getAdminRoles()} />
        </div>
        <div
          className={styles["admin-page-content"]}
          data-id="dashboard-content"
        >
          {/* Top Navigation Card */}
          <div className={styles["navbar-card"]}>
            <TopNavigation
              onSidebarToggle={handleSidebarToggle}
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          {/* Breadcrumb Card */}
          <div className={styles["breadcrumb-card"]}>
            <BreadcrumbV2 items={defaultBreadcrumbs} />
          </div>

          {/* Main Content Card */}
          <div className={styles["content-card"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
