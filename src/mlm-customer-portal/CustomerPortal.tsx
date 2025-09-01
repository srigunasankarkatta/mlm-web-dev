import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FAQPage from './pages/FAQPage';

import Footer from './components/Footer';
import { ToastProvider } from './components/ToastContext';
import styles from './CustomerPortal.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/customer', label: 'Home' },
    { path: '/customer/plans', label: 'Plans' },
    { path: '/customer/dashboard', label: 'Dashboard' },
    { path: '/customer/profile', label: 'Profile' },
    { path: '/customer/faq', label: 'FAQ' }
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
                  location.pathname === item.path ? styles.active : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link to="/register" className={styles.getStartedBtn}>
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileMenuButton}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                    location.pathname === item.path ? styles.active : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.mobileAuthButtons}>
                <Link to="/login" className={styles.mobileLoginBtn}>
                  Login
                </Link>
                <Link to="/register" className={styles.mobileGetStartedBtn}>
                  Get Started
                </Link>
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
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    
    return () => {
      // Clean up when component unmounts
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default CustomerPortal;
