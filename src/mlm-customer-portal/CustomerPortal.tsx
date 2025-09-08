import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import FAQPage from "./pages/FAQPage";
import NetworkPage from "./pages/NetworkPage";
import IncomeCalculatorPage from "./pages/IncomeCalculatorPage";
import WalletPage from "./pages/WalletPage";
import WalletDemoPage from "./pages/WalletDemoPage";

import { ToastProvider } from "./components/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import styles from "./CustomerPortal.module.scss";

const CustomerPortal: React.FC = () => {
  // Force scrolling to work when component mounts
  React.useEffect(() => {
    // Remove any problematic body styles
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";

    return () => {
      // Clean up when component unmounts
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    };
  }, []);

  return (
    <ToastProvider>
      <ScrollToTop />
      <div className={styles.customerPortalContainer}>
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/calculator" element={<IncomeCalculatorPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/network"
              element={
                <ProtectedRoute>
                  <NetworkPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute>
                  <WalletPage />
                </ProtectedRoute>
              }
            />
            <Route path="/wallet-demo" element={<WalletDemoPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </ToastProvider>
  );
};

export default CustomerPortal;
