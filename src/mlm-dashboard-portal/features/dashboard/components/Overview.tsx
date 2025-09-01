import React from "react";

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your MLM business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
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
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">2,847</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+12%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
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
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$45,231</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+8.2%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Packages
                </p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+3.1%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-semibold text-gray-900">23.5%</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+2.4%</span>
              <span className="text-gray-600 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Growth Trend
            </h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart Component - User Growth</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Revenue Distribution
            </h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">
                Chart Component - Revenue Distribution
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  user: "John Doe",
                  action: "joined the network",
                  time: "2 minutes ago",
                  type: "join",
                },
                {
                  user: "Jane Smith",
                  action: "upgraded to Premium package",
                  time: "15 minutes ago",
                  type: "upgrade",
                },
                {
                  user: "Mike Johnson",
                  action: "earned commission",
                  time: "1 hour ago",
                  type: "commission",
                },
                {
                  user: "Sarah Wilson",
                  action: "referred new user",
                  time: "2 hours ago",
                  type: "referral",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "join"
                        ? "bg-blue-500"
                        : activity.type === "upgrade"
                        ? "bg-green-500"
                        : activity.type === "commission"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
