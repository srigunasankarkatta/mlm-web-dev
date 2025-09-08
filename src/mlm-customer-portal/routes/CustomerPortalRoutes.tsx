import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PlansPage from "../pages/PlansPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import FAQPage from "../pages/FAQPage";
import WalletPage from "../pages/WalletPage";
import WalletDemoPage from "../pages/WalletDemoPage";

const CustomerPortalRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/wallet-demo" element={<WalletDemoPage />} />
    </Routes>
  );
};

export default CustomerPortalRoutes;
