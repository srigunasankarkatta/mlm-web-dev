import React, { useState } from "react";
import {
  useAdminLogin,
  useAdminLogout,
  useCurrentAdminUser,
  useAdminProfile,
} from "../admin-auth";

// Example component demonstrating admin authentication queries usage
export const AdminLoginExample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Admin authentication hooks
  const adminLoginMutation = useAdminLogin();
  const adminLogoutMutation = useAdminLogout();
  const {
    user,
    isLoading: userLoading,
    isAuthenticated,
  } = useCurrentAdminUser();
  const { data: profile, isLoading: profileLoading } = useAdminProfile();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    adminLoginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Admin login successful:", data);
          setEmail("");
          setPassword("");
        },
        onError: (error) => {
          console.error("Admin login failed:", error);
        },
      }
    );
  };

  const handleLogout = () => {
    adminLogoutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Admin logout successful");
      },
      onError: (error) => {
        console.error("Admin logout failed:", error);
      },
    });
  };

  if (userLoading) {
    return <div className="p-4">Loading admin user...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-800">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="admin@mlm.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Password
            </label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={adminLoginMutation.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adminLoginMutation.isPending ? "Logging in..." : "Admin Login"}
          </button>

          {adminLoginMutation.error && (
            <div className="text-red-600 text-sm text-center">
              {adminLoginMutation.error.message}
            </div>
          )}
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Test Credentials:</strong>
            <br />
            Email: admin@mlm.com
            <br />
            Password: password
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-800">
          Welcome, {user?.name}!
        </h2>
        <button
          onClick={handleLogout}
          disabled={adminLogoutMutation.isPending}
          className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {adminLogoutMutation.isPending ? "Logging out..." : "Admin Logout"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin User Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-teal-700">
            Admin Info (useCurrentAdminUser)
          </h3>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Roles:</strong>
            </p>
            <ul className="ml-4 space-y-1">
              {user?.roles?.map((role, index) => (
                <li key={index} className="text-sm">
                  •{" "}
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs">
                    {role.name}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Created:</strong>{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Admin Profile Data */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-teal-700">
            Profile Data (useAdminProfile)
          </h3>
          {profileLoading ? (
            <p>Loading profile...</p>
          ) : profile?.data ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {profile.data.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.data.email}
              </p>
              <p>
                <strong>ID:</strong> {profile.data.id}
              </p>
              <p>
                <strong>Roles:</strong>
              </p>
              <ul className="ml-4 space-y-1">
                {profile.data.roles?.map((role, index) => (
                  <li key={index} className="text-sm">
                    •{" "}
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {role.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                <strong>Sponsor ID:</strong> {profile.data.sponsor_id || "None"}
              </p>
              <p>
                <strong>Package ID:</strong> {profile.data.package_id || "None"}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(profile.data.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(profile.data.updated_at).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>No profile data available</p>
          )}
        </div>
      </div>

      {/* Query States */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">
          Query States
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p>
              <strong>User Loading:</strong> {userLoading ? "Yes" : "No"}
            </p>
            <p>
              <strong>Profile Loading:</strong> {profileLoading ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p>
              <strong>Login Pending:</strong>{" "}
              {adminLoginMutation.isPending ? "Yes" : "No"}
            </p>
            <p>
              <strong>Logout Pending:</strong>{" "}
              {adminLogoutMutation.isPending ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p>
              <strong>Is Authenticated:</strong>{" "}
              {isAuthenticated ? "Yes" : "No"}
            </p>
            <p>
              <strong>Has User Data:</strong> {!!user ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p>
              <strong>Token Exists:</strong>{" "}
              {!!localStorage.getItem("adminToken") ? "Yes" : "No"}
            </p>
            <p>
              <strong>User in Storage:</strong>{" "}
              {!!localStorage.getItem("adminUser") ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginExample;
