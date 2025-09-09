import React from "react";
import DashboardOverview from "./components/Overview";

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard-content">
      <DashboardOverview />
    </div>
  );
};

export default AdminDashboard;
