import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomerAuthService } from "../api-services/auth-service";
import styles from "../CustomerPortal.module.scss";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    CustomerAuthService.isAuthenticated()
  );
  const [user, setUser] = useState(CustomerAuthService.getCurrentUser());

  // Listen for authentication state changes
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(CustomerAuthService.isAuthenticated());
      setUser(CustomerAuthService.getCurrentUser());
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
          { path: "/customer/wallet", label: "Wallet" },
          { path: "/customer/profile", label: "Profile" },
        ]
      : []),
    { path: "/customer/faq", label: "FAQ" },
  ];

  const handleLogout = () => {
    CustomerAuthService.clearAuth();
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("authStateChanged"));
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.navigation} ${className || ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link
            to="/customer"
            className={styles.logo}
            onClick={closeMobileMenu}
          >
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
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {user?.name || "User"}
                  </span>
                </div>
                <button onClick={handleLogout} className={styles.getStartedBtn}>
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
            onClick={toggleMobileMenu}
            className={styles.mobileMenuButton}
            aria-label="Toggle mobile menu"
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
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.mobileAuthButtons}>
                {isAuthenticated ? (
                  <>
                    <div className={styles.mobileUserInfo}>
                      <span className={styles.mobileUserName}>
                        {user?.name || "User"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className={styles.mobileGetStartedBtn}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={styles.mobileLoginBtn}
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={styles.mobileGetStartedBtn}
                      onClick={closeMobileMenu}
                    >
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

export default Navigation;
