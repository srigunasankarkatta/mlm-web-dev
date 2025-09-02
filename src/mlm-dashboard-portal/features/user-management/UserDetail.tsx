import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser, useUserTree, useUserIncomes } from "../../queries/users";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = parseInt(id || "0");

  const [activeTab, setActiveTab] = useState<"overview" | "tree" | "incomes">(
    "overview"
  );

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(userId);
  const { data: userTree, isLoading: treeLoading } = useUserTree(userId);
  const { data: userIncomes, isLoading: incomesLoading } =
    useUserIncomes(userId);

  if (userLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-semibold">Error loading user</p>
            <p className="text-sm text-gray-600">
              User not found or error occurred
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "tree", label: "MLM Tree", icon: "🌳" },
    { id: "incomes", label: "Income History", icon: "💰" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
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
              <p className="text-sm font-medium text-gray-600">
                Direct Referrals
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {user.directs_count}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
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
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{user.total_income}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Package</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.package?.name || "No Package"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl">
              <svg
                className="w-6 h-6 text-orange-600"
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
              <p className="text-sm font-medium text-gray-600">Roles</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.roles.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          User Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Referral Code</p>
            <p className="font-medium text-gray-900">{user.referral_code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sponsor</p>
            <p className="font-medium text-gray-900">
              {user.sponsor?.name || "No Sponsor"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Package Price</p>
            <p className="font-medium text-gray-900">
              ₹{user.package?.price || "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Joined Date</p>
            <p className="font-medium text-gray-900">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTree = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        MLM Network Tree
      </h3>
      {treeLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tree data...</p>
        </div>
      ) : userTree ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900">
              Root User: {userTree.name}
            </h4>
            <p className="text-sm text-blue-700">
              Level {userTree.level} • {userTree.directs_count} directs
            </p>
          </div>

          {userTree.children && userTree.children.length > 0 ? (
            <div className="space-y-2">
              <h5 className="font-medium text-gray-800">Direct Referrals:</h5>
              {userTree.children.map((child: any, index: number) => (
                <div
                  key={child.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{child.name}</p>
                      <p className="text-sm text-gray-600">{child.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Level {child.level}
                      </p>
                      <p className="text-sm text-gray-600">
                        {child.directs_count} directs
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No direct referrals found
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4">No tree data available</p>
      )}
    </div>
  );

  const renderIncomes = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Income History
      </h3>
      {incomesLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading income data...</p>
        </div>
      ) : userIncomes && userIncomes.incomes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Remark
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {userIncomes.incomes.map((income) => (
                <tr key={income.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        income.type === "direct"
                          ? "bg-blue-100 text-blue-800"
                          : income.type === "level"
                          ? "bg-green-100 text-green-800"
                          : income.type === "club"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {income.type.charAt(0).toUpperCase() +
                        income.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-green-600">
                    ₹{income.amount}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{income.remark}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {income.formatted_date} at {income.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {userIncomes.pagination && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Showing {userIncomes.incomes.length} of{" "}
              {userIncomes.pagination.total} transactions
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4">
          No income history found
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-gray-600 mt-1">{user.email}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/admin/users/${userId}/edit`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Users
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "tree" && renderTree()}
        {activeTab === "incomes" && renderIncomes()}
      </div>
    </div>
  );
};

export default UserDetail;
