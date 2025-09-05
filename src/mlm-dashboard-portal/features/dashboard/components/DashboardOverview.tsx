import React from "react";
import { useDashboardData } from "../../../queries/dashboard";

const DashboardOverview: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          Error Loading Dashboard
        </h2>
        <p className="text-red-600">
          Failed to load dashboard data. Please try again later.
        </p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-gray-500 text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Data Available
        </h2>
        <p className="text-gray-600">
          Dashboard data is not available at the moment.
        </p>
      </div>
    );
  }

  const {
    overview,
    user_analytics,
    package_analytics,
    income_analytics,
    recent_activities,
    mlm_tree_stats,
    growth_metrics,
  } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-teal-100">Welcome to your MLM Admin Dashboard</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-teal-600">Total Users</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                {overview.total_users.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Active Users</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                {overview.active_users.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Packages */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">
                Total Packages
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {overview.total_packages}
              </p>
            </div>
          </div>
        </div>

        {/* Total Income Distributed */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">
                Income Distributed
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                ₹{overview.total_income_distributed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">
            Today's Activity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-teal-600">New Users</span>
              <span className="font-semibold text-teal-900">
                {overview.today.new_users}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-teal-600">Income Distributed</span>
              <span className="font-semibold text-teal-900">
                ₹{overview.today.income_distributed}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">
            This Month
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-teal-600">New Users</span>
              <span className="font-semibold text-teal-900">
                {overview.this_month.new_users}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-teal-600">Income Distributed</span>
              <span className="font-semibold text-teal-900">
                ₹{overview.this_month.income_distributed}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Analytics */}
      <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
        <h3 className="text-lg font-semibold text-teal-900 mb-4">
          Package Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {package_analytics.package_usage.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-teal-50 rounded-lg p-4 border border-teal-200"
            >
              <h4 className="font-semibold text-teal-900">{pkg.name}</h4>
              <p className="text-sm text-teal-600">Level {pkg.level_unlock}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Users:</span>
                  <span className="font-medium">{pkg.users_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue:</span>
                  <span className="font-medium">₹{pkg.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-teal-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-teal-900">
              Total Revenue
            </span>
            <span className="text-xl font-bold text-teal-600">
              ₹{package_analytics.total_revenue}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">
            Recent Users
          </h3>
          <div className="space-y-3">
            {recent_activities.recent_users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-teal-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-teal-900">{user.name}</p>
                  <p className="text-sm text-teal-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-teal-600">
                    {user.package || "No Package"}
                  </p>
                  <p className="text-xs text-teal-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incomes */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-4">
            Recent Income Transactions
          </h3>
          <div className="space-y-3">
            {recent_activities.recent_incomes.slice(0, 5).map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between p-3 bg-teal-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-teal-900">
                    {income.user_name}
                  </p>
                  <p className="text-sm text-teal-600 capitalize">
                    {income.type} - {income.remark}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-teal-600">
                    ₹{income.amount}
                  </p>
                  <p className="text-xs text-teal-500">
                    {new Date(income.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MLM Tree Stats */}
      <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
        <h3 className="text-lg font-semibold text-teal-900 mb-4">
          MLM Tree Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <p className="text-2xl font-bold text-teal-600">
              {mlm_tree_stats.root_users}
            </p>
            <p className="text-sm text-teal-600">Root Users</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <p className="text-2xl font-bold text-teal-600">
              {mlm_tree_stats.users_with_directs}
            </p>
            <p className="text-sm text-teal-600">Users with Directs</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <p className="text-2xl font-bold text-teal-600">
              {mlm_tree_stats.average_directs}
            </p>
            <p className="text-sm text-teal-600">Avg Directs</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <p className="text-2xl font-bold text-teal-600">
              {mlm_tree_stats.tree_depth.max_depth}
            </p>
            <p className="text-sm text-teal-600">Max Depth</p>
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
        <h3 className="text-lg font-semibold text-teal-900 mb-4">
          Growth Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-2">User Growth</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-teal-600">This Month:</span>
                <span className="font-medium">
                  {growth_metrics.user_growth.this_month}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-teal-600">Last Month:</span>
                <span className="font-medium">
                  {growth_metrics.user_growth.last_month}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-teal-600">Growth Rate:</span>
                <span className="font-medium text-teal-600">
                  {growth_metrics.user_growth.growth_rate}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-2">Income Growth</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-teal-600">This Month:</span>
                <span className="font-medium">
                  ₹{growth_metrics.income_growth.this_month}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-teal-600">Last Month:</span>
                <span className="font-medium">
                  ₹{growth_metrics.income_growth.last_month}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-teal-600">Growth Rate:</span>
                <span className="font-medium text-teal-600">
                  {growth_metrics.income_growth.growth_rate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;



