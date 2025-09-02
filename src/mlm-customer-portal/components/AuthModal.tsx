import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { MLMPlan } from "../types";
import { MLM_PLANS } from "../data/mockData";
import styles from "./AuthModal.module.scss";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (identifier: string, otp: string) => void;
  onRegister?: (data: any) => void;
  isRegistering?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isRegistering = false,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    referral_code: "",
  });
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");

  const resetForm = () => {
    setStep("form");
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      referral_code: "",
    });
    setIdentifier("");
    setOtp("");
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (step === "form") {
        setStep("otp");
      } else {
        console.log("Login attempt:", { identifier, otp });
        if (onLogin) {
          onLogin(identifier, otp);
        }
        onClose();
      }
    } else {
      console.log("Register attempt:", formData);
      if (onRegister) {
        onRegister(formData);
      }
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return createPortal(
    <div className={styles.authModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              {isLogin ? "Welcome Back" : "Join Our Platform"}
            </h2>
            <p className={styles.modalSubtitle}>
              {isLogin
                ? "Sign in to access your dashboard"
                : "Create your account and start earning"}
            </p>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Toggle Buttons */}
          <div className={styles.toggleButtons}>
            <button
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`${styles.toggleButton} ${
                isLogin ? styles.active : ""
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              className={`${styles.toggleButton} ${
                !isLogin ? styles.active : ""
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {isLogin ? (
              // Login Form
              <>
                {step === "form" ? (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email or Mobile</label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Enter email or mobile"
                      className={styles.formInput}
                      required
                    />
                  </div>
                ) : (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>OTP Code</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className={styles.formInput}
                      maxLength={6}
                      required
                    />
                    <p className={styles.helpText}>
                      We've sent a 6-digit code to your{" "}
                      {identifier.includes("@") ? "email" : "mobile"}
                    </p>
                  </div>
                )}
              </>
            ) : (
              // Register Form
              <>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
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
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Enter your password"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm Password</label>
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
                    placeholder="Enter referral code"
                    className={styles.formInput}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isLogin && isRegistering}
            >
              {!isLogin && isRegistering
                ? "Registering..."
                : isLogin
                ? step === "form"
                  ? "Send OTP"
                  : "Login"
                : "Register"}
            </button>
          </form>

          {isLogin && step === "otp" && (
            <button
              onClick={() => setStep("form")}
              className={styles.backButton}
            >
              ← Back to email/mobile
            </button>
          )}

          <div className={styles.toggleLink}>
            <p className={styles.toggleText}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
                className={styles.toggleButton}
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
