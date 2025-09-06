import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../queries/auth";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  // Get the intended destination from location state, default to /customer
  const from = (location.state as any)?.from?.pathname || "/customer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Starting login process...");
      const result = await loginMutation.mutateAsync({
        email,
        password,
        rememberMe: true,
      });

      console.log("Login successful:", result);
      console.log("Attempting to navigate to:", from);

      // Navigate to intended destination or customer portal home on success
      navigate(from, { replace: true });

      console.log("Navigation called");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <CustomerLayout>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          {/* Login Form */}
          <div className={styles.loginForm}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Welcome Back</h2>
              <p className={styles.formSubtitle}>
                Sign in to access your dashboard and start earning
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={styles.formInput}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Header */}
            <div className={styles.loginHeader}>
              <Link to="/customer" className={styles.backLink}>
                <svg
                  className={styles.backIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </Link>

              <div className={styles.logoSection}>
                <div className={styles.logoIcon}>
                  <span>M</span>
                </div>
                <h1 className={styles.logoText}>MLM Portal</h1>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className={styles.sidePanel}>
            <div className={styles.panelContent}>
              <h3 className={styles.panelTitle}>Start Your MLM Journey</h3>
              <p className={styles.panelSubtitle}>
                Join thousands of successful members who are already earning
                through our platform
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>💰</div>
                  <div className={styles.featureText}>
                    <h4>Multiple Income Streams</h4>
                    <p>Direct, Level, Club, and Auto Pool earnings</p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🚀</div>
                  <div className={styles.featureText}>
                    <h4>Fast Track Packages</h4>
                    <p>Start with just ₹20 and unlock higher levels</p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <div className={styles.featureIcon}>📱</div>
                  <div className={styles.featureText}>
                    <h4>Mobile First</h4>
                    <p>Manage your business from anywhere</p>
                  </div>
                </div>
              </div>

              <Link to="/register" className={styles.ctaButton}>
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default LoginPage;
