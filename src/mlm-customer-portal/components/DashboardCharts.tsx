import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { IncomeSummary } from '../types';

interface DashboardChartsProps {
  incomeSummary: IncomeSummary;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ incomeSummary }) => {
  // Prepare data for pie chart
  const pieData = [
    { name: 'Direct Income', value: incomeSummary.directIncome.total, color: '#14b8a6' },
    { name: 'Level Income', value: incomeSummary.levelIncome.total, color: '#3b82f6' },
    { name: 'Club Income', value: incomeSummary.clubIncome.total, color: '#10b981' },
    { name: 'Auto Pool', value: incomeSummary.autoPoolIncome.total, color: '#8b5cf6' }
  ];

  // Prepare data for level income bar chart
  const levelData = incomeSummary.levelIncome.breakdown.map(item => ({
    level: `L${item.level}`,
    income: item.amount,
    percentage: item.percentage
  }));

  // Prepare data for direct income line chart
  const directData = incomeSummary.directIncome.breakdown.map((item, index) => ({
    direct: `Direct ${index + 1}`,
    income: item.amount,
    percentage: item.percentage
  }));

  // Auto Pool progress data
  const autoPoolData = [
    { level: 'Level 1', members: 4, current: incomeSummary.autoPoolIncome.currentLevel >= 1 },
    { level: 'Level 2', members: 16, current: incomeSummary.autoPoolIncome.currentLevel >= 2 },
    { level: 'Level 3', members: 64, current: incomeSummary.autoPoolIncome.currentLevel >= 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Income Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800">
                ${(incomeSummary.directIncome.total + incomeSummary.levelIncome.total + incomeSummary.clubIncome.total + incomeSummary.autoPoolIncome.total).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Direct Referrals</p>
              <p className="text-2xl font-bold text-gray-800">
                {incomeSummary.directIncome.breakdown.length}/4
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Club Joins</p>
              <p className="text-2xl font-bold text-gray-800">
                {incomeSummary.clubIncome.totalJoins}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Auto Pool Level</p>
              <p className="text-2xl font-bold text-gray-800">
                {incomeSummary.autoPoolIncome.currentLevel}/3
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Distribution Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Income Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Level Income Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Level Income Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
              <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Direct Income Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Direct Referral Income</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={directData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="direct" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Income']} />
            <Line type="monotone" dataKey="income" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Auto Pool Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Auto Pool Progress</h3>
        <div className="space-y-4">
          {autoPoolData.map((level, index) => (
            <div key={level.level} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  level.current 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {level.current ? '✓' : (index + 1)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{level.level}</p>
                  <p className="text-sm text-gray-600">{level.members} members</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {level.current ? 'Completed' : 'Pending'}
                </p>
                {level.current && (
                  <p className="text-xs text-green-600">+${(level.members * 0.5).toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
