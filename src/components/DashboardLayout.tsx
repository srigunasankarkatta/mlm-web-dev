import React from "react";
import { useLocation } from "react-router-dom";
import MLMDashboardNav from "./MLMDashboardNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentUserRole: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentUserRole,
}) => {
  const location = useLocation();

  // Check if we're in the MLM dashboard area
  const isMLMDashboard =
    location.pathname.startsWith("/users") ||
    location.pathname.startsWith("/packages") ||
    location.pathname.startsWith("/rules") ||
    location.pathname.startsWith("/dashboard");

  if (!isMLMDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MLM Dashboard Navigation */}
      <MLMDashboardNav currentUserRole={currentUserRole} />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
