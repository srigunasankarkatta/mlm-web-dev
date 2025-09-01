import React, { useState } from "react";

const NetworkTree: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [viewMode, setViewMode] = useState("tree");

  const networkData = {
    levels: [
      {
        level: 1,
        users: [
          {
            id: 1,
            name: "John Doe",
            status: "Active",
            package: "Premium",
            referrals: 5,
            earnings: "$2,450",
          },
          {
            id: 2,
            name: "Jane Smith",
            status: "Active",
            package: "Enterprise",
            referrals: 3,
            earnings: "$1,890",
          },
          {
            id: 3,
            name: "Mike Johnson",
            status: "Active",
            package: "Basic",
            referrals: 2,
            earnings: "$450",
          },
        ],
      },
      {
        level: 2,
        users: [
          {
            id: 4,
            name: "Sarah Wilson",
            status: "Active",
            package: "Premium",
            referrals: 4,
            earnings: "$1,200",
          },
          {
            id: 5,
            name: "David Kim",
            status: "Active",
            package: "Starter",
            referrals: 1,
            earnings: "$150",
          },
          {
            id: 6,
            name: "Emily Rodriguez",
            status: "Active",
            package: "Basic",
            referrals: 0,
            earnings: "$0",
          },
          {
            id: 7,
            name: "Alex Brown",
            status: "Active",
            package: "Premium",
            referrals: 2,
            earnings: "$800",
          },
          {
            id: 8,
            name: "Maria Garcia",
            status: "Active",
            package: "Basic",
            referrals: 0,
            earnings: "$0",
          },
        ],
      },
      {
        level: 3,
        users: [
          {
            id: 9,
            name: "Tom Wilson",
            status: "Active",
            package: "Starter",
            referrals: 0,
            earnings: "$0",
          },
          {
            id: 10,
            name: "Lisa Thompson",
            status: "Active",
            package: "Basic",
            referrals: 0,
            earnings: "$0",
          },
          {
            id: 11,
            name: "Robert Johnson",
            status: "Active",
            package: "Starter",
            referrals: 0,
            earnings: "$0",
          },
          {
            id: 12,
            name: "Jennifer Lee",
            status: "Active",
            package: "Basic",
            referrals: 0,
            earnings: "$0",
          },
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Network Tree</h1>
          <p className="text-gray-600 mt-2">
            Visualize and manage your MLM network hierarchy.
          </p>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Levels Deep</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$7,040</div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">17</div>
              <div className="text-sm text-gray-600">Total Referrals</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("tree")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === "tree"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tree View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                List View
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Level:
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
              </select>
            </div>
            <div className="ml-auto">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Export Network
              </button>
            </div>
          </div>
        </div>

        {/* Network Visualization */}
        {viewMode === "tree" ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Network Hierarchy
            </h3>
            <div className="space-y-8">
              {networkData.levels.map((level) => (
                <div key={level.level} className="relative">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-gray-700">
                      Level {level.level}
                    </h4>
                    <div className="text-sm text-gray-500">
                      {level.users.length} members
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {level.users.map((user, index) => (
                      <div key={user.id} className="relative">
                        {/* Connection Lines */}
                        {level.level > 1 && (
                          <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 transform -translate-x-1/2 -translate-y-full"></div>
                        )}

                        {/* User Card */}
                        <div className="bg-gray-50 rounded-lg p-4 text-center border-2 border-gray-200 hover:border-blue-300 transition-colors">
                          <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.package}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {user.earnings}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.referrals} referrals
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Network Members by Level
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referrals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {networkData.levels.flatMap((level) =>
                    level.users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Level {level.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.package}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.referrals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {user.earnings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Promote
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Network Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Level Distribution
            </h3>
            <div className="space-y-4">
              {networkData.levels.map((level) => (
                <div
                  key={level.level}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">
                    Level {level.level}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(level.users.length / 12) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {level.users.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Average Earnings per Member
                </span>
                <span className="text-sm font-medium text-gray-900">
                  $586.67
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Referrals</span>
                <span className="text-sm font-medium text-gray-900">17</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="text-sm font-medium text-gray-900">85.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTree;
