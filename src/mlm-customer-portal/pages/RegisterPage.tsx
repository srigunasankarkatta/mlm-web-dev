import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegister } from "../queries/auth";
import styles from "./RegisterPage.module.scss";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  referral_code: Yup.string().optional(),
});

const RegisterPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    referral_code: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    try {
      console.log("Registering user with data:", values);

      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        referral_code: values.referral_code || undefined,
      });

      console.log("Registration successful");
      // Show success message and redirect to login page
      setErrorMessage(""); // Clear any errors
      setSuccessMessage("Registration successful! Redirecting to login...");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Handle specific error messages from the new API
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error?.response?.data?.errors?.referral_code) {
        // Handle referral code validation errors
        setErrorMessage(error.response.data.errors.referral_code[0]);
      } else if (error?.response?.data?.errors) {
        // Handle other validation errors
        const firstError = Object.values(error.response.data.errors)[0];
        if (Array.isArray(firstError)) {
          setErrorMessage(firstError[0]);
        } else {
          setErrorMessage(String(firstError));
        }
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                {errorMessage && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}
                {successMessage && (
                  <div className={styles.successMessage}>{successMessage}</div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>FULL NAME</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>EMAIL ADDRESS</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    REFERRAL CODE (Optional)
                  </label>
                  <Field
                    type="text"
                    name="referral_code"
                    placeholder="Enter your sponsor's referral code if you have one"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="referral_code"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>PASSWORD</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting || registerMutation.isPending}
                >
                  {isSubmitting || registerMutation.isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className={styles.formFooter}>
            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link to="/login" className={styles.footerLink}>
                Sign in here
              </Link>
            </p>
          </div>

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
