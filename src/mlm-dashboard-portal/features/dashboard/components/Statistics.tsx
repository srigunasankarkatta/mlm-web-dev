import React from "react";

const DashboardStatistics: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Statistics & Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into your MLM business performance.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Conversion Rate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">68.5%</div>
              <div className="text-sm text-gray-500 mt-1">Lead to Member</div>
              <div className="mt-2">
                <span className="text-green-600 text-sm">+5.2%</span>
                <span className="text-gray-500 text-sm ml-1">
                  vs last month
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Average Order Value
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$127.50</div>
              <div className="text-sm text-gray-500 mt-1">Per Transaction</div>
              <div className="mt-2">
                <span className="text-green-600 text-sm">+12.3%</span>
                <span className="text-gray-500 text-sm ml-1">
                  vs last month
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Retention Rate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">89.2%</div>
              <div className="text-sm text-gray-500 mt-1">
                Monthly Retention
              </div>
              <div className="mt-2">
                <span className="text-green-600 text-sm">+2.1%</span>
                <span className="text-gray-500 text-sm ml-1">
                  vs last month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Demographics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Age 18-25</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Age 26-35</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Age 36-45</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Age 45+</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Geographic Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">North America</span>
                <span className="text-sm font-medium text-gray-900">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Europe</span>
                <span className="text-sm font-medium text-gray-900">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Asia Pacific</span>
                <span className="text-sm font-medium text-gray-900">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Other Regions</span>
                <span className="text-sm font-medium text-gray-900">12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Performance Trends (Last 12 Months)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Q1</div>
              <div className="text-sm text-gray-600">Jan - Mar</div>
              <div className="text-lg font-semibold text-gray-900">$125K</div>
              <div className="text-green-600 text-sm">+15%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Q2</div>
              <div className="text-sm text-gray-600">Apr - Jun</div>
              <div className="text-lg font-semibold text-gray-900">$142K</div>
              <div className="text-green-600 text-sm">+13%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Q3</div>
              <div className="text-sm text-gray-600">Jul - Sep</div>
              <div className="text-lg font-semibold text-gray-900">$168K</div>
              <div className="text-green-600 text-sm">+18%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Q4</div>
              <div className="text-sm text-gray-600">Oct - Dec</div>
              <div className="text-lg font-semibold text-gray-900">$189K</div>
              <div className="text-green-600 text-sm">+12%</div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Top Performing Members
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Johnson",
                  rank: 1,
                  sales: "$45,230",
                  referrals: 23,
                  commission: "$6,784",
                },
                {
                  name: "Michael Chen",
                  rank: 2,
                  sales: "$38,450",
                  referrals: 19,
                  commission: "$5,767",
                },
                {
                  name: "Emily Rodriguez",
                  rank: 3,
                  sales: "$32,180",
                  referrals: 17,
                  commission: "$4,827",
                },
                {
                  name: "David Kim",
                  rank: 4,
                  sales: "$28,920",
                  referrals: 15,
                  commission: "$4,338",
                },
                {
                  name: "Lisa Thompson",
                  rank: 5,
                  sales: "$25,640",
                  referrals: 14,
                  commission: "$3,846",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {member.rank}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{member.sales}</p>
                    <p className="text-sm text-green-600">
                      {member.commission}
                    </p>
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

export default DashboardStatistics;
