import React from "react";

const DashboardRecentActivity: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recent Activity</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest activities across your MLM network.
          </p>
        </div>

        {/* Activity Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                All Activities
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                User Actions
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Financial
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                System
              </button>
            </div>
            <div className="ml-auto">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Activity Timeline
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Today */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  Today
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      time: "2:34 PM",
                      type: "user-join",
                      title: "New User Registration",
                      description:
                        "Sarah Wilson joined the network under John Doe",
                      user: "Sarah Wilson",
                      details: "Package: Starter, Referred by: John Doe",
                    },
                    {
                      time: "1:15 PM",
                      type: "package-upgrade",
                      title: "Package Upgrade",
                      description: "Michael Chen upgraded to Premium package",
                      user: "Michael Chen",
                      details: "From: Basic, To: Premium, Amount: $299",
                    },
                    {
                      time: "11:42 AM",
                      type: "commission-earned",
                      title: "Commission Earned",
                      description:
                        "Emily Rodriguez earned commission from referral",
                      user: "Emily Rodriguez",
                      details:
                        "Amount: $45.50, Level: 1, Referral: Lisa Thompson",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          activity.type === "user-join"
                            ? "bg-blue-500"
                            : activity.type === "package-upgrade"
                            ? "bg-green-500"
                            : activity.type === "commission-earned"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </h5>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">User:</span>{" "}
                          {activity.user}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="font-medium">Details:</span>{" "}
                          {activity.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yesterday */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  Yesterday
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      time: "8:20 PM",
                      type: "referral",
                      title: "New Referral",
                      description: "David Kim referred 3 new users",
                      user: "David Kim",
                      details:
                        "Referrals: Alex Brown, Maria Garcia, Tom Wilson",
                    },
                    {
                      time: "3:15 PM",
                      type: "withdrawal",
                      title: "Withdrawal Request",
                      description: "Lisa Thompson requested withdrawal",
                      user: "Lisa Thompson",
                      details: "Amount: $1,250, Status: Processing",
                    },
                    {
                      time: "10:30 AM",
                      type: "support-ticket",
                      title: "Support Ticket Created",
                      description: "New support ticket from user",
                      user: "Robert Johnson",
                      details: "Category: Technical, Priority: Medium",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          activity.type === "referral"
                            ? "bg-purple-500"
                            : activity.type === "withdrawal"
                            ? "bg-orange-500"
                            : activity.type === "support-ticket"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </h5>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">User:</span>{" "}
                          {activity.user}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="font-medium">Details:</span>{" "}
                          {activity.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* This Week */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">
                  This Week
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      time: "Dec 15, 2:00 PM",
                      type: "system-update",
                      title: "System Maintenance",
                      description: "Scheduled system maintenance completed",
                      user: "System",
                      details:
                        "Duration: 2 hours, Services affected: Payment processing",
                    },
                    {
                      time: "Dec 14, 11:30 AM",
                      type: "bulk-email",
                      title: "Bulk Email Sent",
                      description: "Newsletter sent to all active members",
                      user: "Marketing Team",
                      details: "Recipients: 2,847, Subject: December Updates",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          activity.type === "system-update"
                            ? "bg-indigo-500"
                            : activity.type === "bulk-email"
                            ? "bg-pink-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </h5>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">User:</span>{" "}
                          {activity.user}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="font-medium">Details:</span>{" "}
                          {activity.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">New Users Today</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Package Upgrades</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">156</div>
            <div className="text-sm text-gray-600">Commissions Earned</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Support Tickets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentActivity;
