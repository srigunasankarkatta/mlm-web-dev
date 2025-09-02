import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import {
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  UserCheck,
  Building2,
  HeadphonesIcon,
  Eye,
} from "lucide-react";
import { useCurrentAdminUser, useAdminLogout } from "../../queries/admin-auth";
import { hasRole, AdminRole } from "../../queries/types/admin-auth";

const AdminDashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, isAuthenticated } = useCurrentAdminUser();
  const adminLogoutMutation = useAdminLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    console.log("Logout button clicked");
    adminLogoutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Logout successful, navigating to login");
        navigate("/admin/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  // Navigation items based on user roles
  const getNavigationItems = () => {
    const items = [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: BarChart3,
        roles: ["super_admin", "admin", "manager", "support", "viewer"],
        description: "Overview and statistics",
      },
      {
        name: "Users Management",
        href: "/admin/users",
        icon: Users,
        roles: ["super_admin", "admin"],
        description: "Manage system users",
      },
      {
        name: "Team Management",
        href: "/admin/team",
        icon: Building2,
        roles: ["super_admin", "admin", "manager"],
        description: "Manage team structure",
      },
      {
        name: "Support",
        href: "/admin/support",
        icon: HeadphonesIcon,
        roles: ["super_admin", "admin", "support"],
        description: "Support tickets and issues",
      },
      {
        name: "Permissions",
        href: "/admin/permissions",
        icon: Shield,
        roles: ["super_admin"],
        description: "Manage user permissions",
      },
      {
        name: "User Roles",
        href: "/admin/roles",
        icon: UserCheck,
        roles: ["super_admin", "admin"],
        description: "Manage user roles",
      },
      {
        name: "Analytics",
        href: "/admin/analytics",
        icon: Eye,
        roles: ["super_admin", "admin", "manager"],
        description: "View detailed analytics",
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
        roles: ["super_admin"],
        description: "System configuration",
      },
    ];

    // Filter items based on user roles
    return items.filter((item) =>
      item.roles.some((role) => hasRole(user, role as AdminRole))
    );
  };

  const navigationItems = getNavigationItems();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-teal-800">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user?.roles?.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {role.name?.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 min-h-0">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700 border-r-2 border-teal-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? "text-teal-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout button - Sticky at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50 mt-auto">
          <button
            onClick={handleLogout}
            disabled={adminLogoutMutation.isPending}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {adminLogoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome back,{" "}
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-teal-800">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
