import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboardLayout from "../components/layouts/admin-dashboard-layout";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import AllUsers from "../features/user-management/AllUsers";
import CreateUser from "../features/user-management/CreateUser";
import EditUser from "../features/user-management/EditUser";
import UserDetail from "../features/user-management/UserDetail";
import { useCurrentAdminUser } from "../queries/admin-auth";

const AdminRouter: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useCurrentAdminUser();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Routes>
      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminDashboardLayout>
            <AdminDashboard />
          </AdminDashboardLayout>
        }
      />

      {/* Users Management */}
      <Route
        path="/admin/users"
        element={
          <AdminDashboardLayout>
            <AllUsers />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <AdminDashboardLayout>
            <CreateUser />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/:id"
        element={
          <AdminDashboardLayout>
            <UserDetail />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <AdminDashboardLayout>
            <EditUser />
          </AdminDashboardLayout>
        }
      />

      {/* Team Management */}
      <Route
        path="/admin/team"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Team Management
              </h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* Support */}
      <Route
        path="/admin/support"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Support</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* Permissions */}
      <Route
        path="/admin/permissions"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Permissions</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* User Roles */}
      <Route
        path="/admin/roles"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">User Roles</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* Analytics */}
      <Route
        path="/admin/analytics"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* Settings */}
      <Route
        path="/admin/settings"
        element={
          <AdminDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </AdminDashboardLayout>
        }
      />

      {/* Default admin route - redirect to dashboard */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Catch all admin routes - redirect to dashboard */}
      <Route
        path="/admin/*"
        element={<Navigate to="/admin/dashboard" replace />}
      />
    </Routes>
  );
};

export default AdminRouter;
