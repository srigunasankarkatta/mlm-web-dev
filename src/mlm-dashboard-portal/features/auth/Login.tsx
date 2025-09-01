import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAdminLogin } from "../../queries/admin-auth";
import { getDefaultRouteByRole } from "../../queries/types/admin-auth";
import {
  COLOR_CLASSES,
  COMMON_COMBINATIONS,
} from "../../../constants/colorClasses";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const adminLoginMutation = useAdminLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    adminLoginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: (data) => {
          console.log("Admin login successful:", data);
          console.log("User roles:", data.data.user.roles);
          console.log("User referral code:", data.data.user.referral_code);

          // Clear any previous errors
          setErrors({});
          setSuccessMessage(
            `Welcome back, ${data.data.user.name}! Redirecting...`
          );

          // Store user data in localStorage for role-based routing
          localStorage.setItem("adminUser", JSON.stringify(data.data.user));
          localStorage.setItem("adminToken", data.data.token);

          // Get default route based on user role and redirect
          const defaultRoute = getDefaultRouteByRole(data.data.user);
          console.log(
            `Redirecting ${data.data.user.roles.join(", ")} to ${defaultRoute}`
          );

          // Small delay to show success message before redirect
          setTimeout(() => {
            // Always redirect to admin dashboard for admin users
            navigate("/admin/dashboard");
          }, 1000);
        },
        onError: (error: any) => {
          console.error("Admin login failed:", error);
          setErrors({
            general:
              error.message || "Invalid email or password. Please try again.",
          });
        },
      }
    );
  };

  const handleForgotPassword = () => {
    navigate("/admin/forgot-password");
  };

  return (
    <div
      className={`min-h-screen ${COLOR_CLASSES.gradient.secondary} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div
            className={`mx-auto h-16 w-16 ${COLOR_CLASSES.gradient.primary} rounded-full flex items-center justify-center mb-6`}
          >
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2
            className={`text-3xl font-bold ${COLOR_CLASSES.text.primary} mb-2`}
          >
            Admin Login
          </h2>
          <p className={COLOR_CLASSES.text.secondary}>
            Sign in to your MLM Dashboard Admin Panel
          </p>
        </div>

        {/* Login Form */}
        <div className={`${COMMON_COMBINATIONS.card} rounded-2xl p-8`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${COLOR_CLASSES.text.primary} mb-2`}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${
                  errors.email
                    ? COLOR_CLASSES.input.error
                    : COLOR_CLASSES.input.default
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className={`mt-1 text-sm ${COLOR_CLASSES.text.error}`}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${COLOR_CLASSES.text.primary} mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${
                    errors.password
                      ? COLOR_CLASSES.input.error
                      : COLOR_CLASSES.input.default
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-teal-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-teal-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={`mt-1 text-sm ${COLOR_CLASSES.text.error}`}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={`h-4 w-4 ${COLOR_CLASSES.ring.primary} border-gray-300 rounded`}
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm ${COLOR_CLASSES.text.primary}`}
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`text-sm ${COLOR_CLASSES.text.info} hover:text-teal-600 font-medium ${COLOR_CLASSES["transition-colors"]}`}
              >
                Forgot password?
              </button>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className={`${COLOR_CLASSES.alert.error} rounded-lg p-3`}>
                <p className={`text-sm ${COLOR_CLASSES.text.error}`}>
                  {errors.general}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">{successMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={adminLoginMutation.isPending}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${COLOR_CLASSES.gradient.primary} hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed ${COLOR_CLASSES.transition}`}
            >
              {adminLoginMutation.isPending ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Admin Signing in...
                </div>
              ) : (
                "Admin Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${COLOR_CLASSES.border.light}`}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${COLOR_CLASSES.background.card} ${COLOR_CLASSES.text.tertiary}`}
                >
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`w-full inline-flex justify-center py-2 px-4 ${COLOR_CLASSES.border.light} rounded-lg shadow-sm ${COLOR_CLASSES.background.card} text-sm font-medium ${COLOR_CLASSES.text.tertiary} hover:bg-teal-50 ${COLOR_CLASSES["transition-colors"]}`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className={`w-full inline-flex justify-center py-2 px-4 ${COLOR_CLASSES.border.light} rounded-lg shadow-sm ${COLOR_CLASSES.background.card} text-sm font-medium ${COLOR_CLASSES.text.tertiary} hover:bg-teal-50 ${COLOR_CLASSES["transition-colors"]}`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              <span className="ml-2">Twitter</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className={`text-sm ${COLOR_CLASSES.text.secondary}`}>
            Don't have an account?{" "}
            <button
              type="button"
              className={`font-medium ${COLOR_CLASSES.text.info} hover:text-teal-600 ${COLOR_CLASSES["transition-colors"]}`}
            >
              Contact your administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
