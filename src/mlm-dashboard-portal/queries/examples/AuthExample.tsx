import React, { useState } from "react";
import { useLogin, useLogout, useCurrentUser, useUserProfile } from "../auth";

// Example component demonstrating authentication queries usage
export const AuthExample: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Authentication hooks
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const { user, isLoading: userLoading, isAuthenticated } = useCurrentUser();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Login successful:", data);
          setEmail("");
          setPassword("");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Logout successful");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  if (userLoading) {
    return <div className="p-4">Loading user...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

          {loginMutation.error && (
            <div className="text-red-600 text-sm text-center">
              {loginMutation.error.message}
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            User Info (useCurrentUser)
          </h3>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
            <p>
              <strong>Status:</strong> {user?.status}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Profile Data (useUserProfile)
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
                <strong>Role:</strong> {profile.data.role}
              </p>
              <p>
                <strong>Status:</strong> {profile.data.status}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(profile.data.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(profile.data.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>No profile data available</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">
          Query States
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
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
              {loginMutation.isPending ? "Yes" : "No"}
            </p>
            <p>
              <strong>Logout Pending:</strong>{" "}
              {logoutMutation.isPending ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthExample;
