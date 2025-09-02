import React from "react";
import { IncomeBreakdown } from "../types";

interface IncomeBreakdownCardProps {
  income: IncomeBreakdown;
}

const IncomeBreakdownCard: React.FC<IncomeBreakdownCardProps> = ({
  income,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "Direct":
        return (
          <svg
            className="w-8 h-8 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "Level":
        return (
          <svg
            className="w-8 h-8 text-blue-500"
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
        );
      case "Club":
        return (
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
        );
      case "AutoPool":
        return (
          <svg
            className="w-8 h-8 text-purple-500"
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
        );
      default:
        return null;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case "Direct":
        return "from-teal-500 to-teal-600";
      case "Level":
        return "from-blue-500 to-blue-600";
      case "Club":
        return "from-green-500 to-green-600";
      case "AutoPool":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div
        className={`bg-gradient-to-r ${getColorClass(
          income.type
        )} p-6 text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{income.type} Income</h3>
            {income.percentage && (
              <p className="text-2xl font-bold mt-1">{income.percentage}%</p>
            )}
            {income.amount && (
              <p className="text-2xl font-bold mt-1">₹{income.amount}</p>
            )}
          </div>
          {getIcon(income.type)}
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {income.description}
        </p>

        {income.maxDirects && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Max Directs:</span>{" "}
              {income.maxDirects}
            </p>
          </div>
        )}

        {income.levels && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Available Levels:</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {income.levels.map((level) => (
                <span
                  key={level}
                  className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  L{level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeBreakdownCard;
