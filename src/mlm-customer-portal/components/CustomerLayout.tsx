import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import styles from "./CustomerLayout.module.scss";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={styles.customerLayout}>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className={styles.mainContent}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
