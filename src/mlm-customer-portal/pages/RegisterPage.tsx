import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegister } from "../queries/auth";
import styles from "./RegisterPage.module.scss";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    referral_code: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const registerMutation = useRegister();

  // Get the intended destination from location state, default to /customer
  const from = (location.state as any)?.from?.pathname || "/customer";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.password_confirmation
      ) {
        setErrorMessage("Please fill in all required fields");
        return;
      }

      // Validate password confirmation
      if (formData.password !== formData.password_confirmation) {
        setErrorMessage("Password confirmation does not match");
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return;
      }

      console.log("Registering user with data:", formData);

      await registerMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        referral_code: formData.referral_code || undefined,
      });

      console.log("Registration successful");
      // Navigate to intended destination or customer portal home on success
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Handle specific error messages
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error?.response?.data?.error?.message) {
        setErrorMessage(error.response.data.error.message);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        {/* Registration Form */}
        <div className={styles.registerForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Create Account</h2>
            <p className={styles.formSubtitle}>
              Join our MLM platform and start earning
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>FULL NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>EMAIL ADDRESS</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={formData.referral_code}
                onChange={(e) =>
                  handleInputChange("referral_code", e.target.value)
                }
                placeholder="Enter referral code if you have one"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PASSWORD</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  handleInputChange("password_confirmation", e.target.value)
                }
                placeholder="Confirm your password"
                className={styles.formInput}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* Header */}
          <div className={styles.registerHeader}>
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
            <h3 className={styles.panelTitle}>Why Choose Our Platform?</h3>
            <p className={styles.panelSubtitle}>
              Join thousands of successful members who are already earning
              through our proven MLM system
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
                  <h4>Easy Registration</h4>
                  <p>Quick signup process to get started</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>📱</div>
                <div className={styles.featureText}>
                  <h4>Mobile First</h4>
                  <p>Manage your business from anywhere</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎯</div>
                <div className={styles.featureText}>
                  <h4>Proven System</h4>
                  <p>Tested and verified MLM structure</p>
                </div>
              </div>
            </div>

            <div className={styles.benefits}>
              <h4>What You Get:</h4>
              <ul>
                <li>Personal dashboard to track earnings</li>
                <li>Network building tools</li>
                <li>24/7 support system</li>
                <li>Training materials</li>
                <li>Package selection after registration</li>
                <li>Secure payment processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
