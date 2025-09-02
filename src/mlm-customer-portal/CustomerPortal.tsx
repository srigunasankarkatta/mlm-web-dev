import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import FAQPage from "./pages/FAQPage";
import NetworkPage from "./pages/NetworkPage";

import Footer from "./components/Footer";
import { ToastProvider } from "./components/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { CustomerAuthService } from "./api-services/auth-service";
import styles from "./CustomerPortal.module.scss";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    CustomerAuthService.isAuthenticated()
  );

  // Listen for authentication state changes
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(CustomerAuthService.isAuthenticated());
    };

    // Check auth status on mount and when location changes
    checkAuthStatus();

    // Listen for storage changes (when login/logout happens in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom auth events
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, [location.pathname]);

  const navItems = [
    { path: "/customer", label: "Home" },
    { path: "/customer/plans", label: "Plans" },
    ...(isAuthenticated
      ? [
          { path: "/customer/dashboard", label: "Dashboard" },
          { path: "/customer/network", label: "Network" },
          { path: "/customer/profile", label: "Profile" },
        ]
      : []),
    { path: "/customer/faq", label: "FAQ" },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/customer" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className={styles.logoText}>MLM Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navItems}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            {isAuthenticated ? (
              <>
                <Link to="/customer/dashboard" className={styles.loginBtn}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    CustomerAuthService.clearAuth();
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent("authStateChanged"));
                    window.location.reload();
                  }}
                  className={styles.getStartedBtn}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.loginBtn}>
                  Login
                </Link>
                <Link to="/register" className={styles.getStartedBtn}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileMenuButton}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileNavItems}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.mobileNavItem} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.mobileAuthButtons}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/customer/dashboard"
                      className={styles.mobileLoginBtn}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        CustomerAuthService.clearAuth();
                        // Dispatch custom event to notify other components
                        window.dispatchEvent(
                          new CustomEvent("authStateChanged")
                        );
                        window.location.reload();
                      }}
                      className={styles.mobileGetStartedBtn}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={styles.mobileLoginBtn}>
                      Login
                    </Link>
                    <Link to="/register" className={styles.mobileGetStartedBtn}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

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
      <div className={styles.customerPortalContainer}>
        <Navigation />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plans" element={<PlansPage />} />
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
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default CustomerPortal;
