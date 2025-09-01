import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Package, Settings, BarChart3, LogOut } from "lucide-react";

interface MLMDashboardNavProps {
  currentUserRole: string;
}

const MLMDashboardNav: React.FC<MLMDashboardNavProps> = ({
  currentUserRole,
}) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/users/all",
      icon: BarChart3,
      roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      description: "Overview and statistics",
    },
    {
      name: "User Management",
      href: "/users/all",
      icon: Users,
      roles: ["SUPER_ADMIN", "ADMIN"],
      description: "Manage users and network",
    },
    {
      name: "Network Tree",
      href: "/users/network-tree",
      icon: Users,
      roles: ["SUPER_ADMIN", "ADMIN"],
      description: "View network hierarchy",
    },
    {
      name: "Package Management",
      href: "/packages/all",
      icon: Package,
      roles: ["SUPER_ADMIN", "ADMIN"],
      description: "Manage MLM packages",
    },
    {
      name: "Rule Sets",
      href: "/rules/all",
      icon: Settings,
      roles: ["SUPER_ADMIN", "ADMIN"],
      description: "Configure business rules",
    },
  ];

  const filteredNavigation = navigationItems.filter((item) =>
    item.roles.includes(currentUserRole)
  );

  const isActiveRoute = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Navigation items */}
          <div className="flex space-x-8">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Role: {currentUserRole}
            </span>
            <Link
              to="/admin/login"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MLMDashboardNav;
