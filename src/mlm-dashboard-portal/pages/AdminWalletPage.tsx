import React from "react";
import { Navigate } from "react-router-dom";

const AdminWalletPage: React.FC = () => {
  return <Navigate to="/admin/wallets/overview" replace />;
};

export default AdminWalletPage;
