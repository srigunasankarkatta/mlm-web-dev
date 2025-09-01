import React from "react";

interface StatusBadgeCellProps {
  value: string;
  type?: "status" | "role";
  getValue?: (params: any) => string;
}

const StatusBadgeCell: React.FC<StatusBadgeCellProps> = ({
  value,
  type = "status",
  getValue,
}) => {
  // If getValue function is provided, use it to get the actual value
  const displayValue = getValue ? getValue({ value }) : value;
  
  const getBadgeStyles = (value: string, type: string) => {
    if (type === "role") {
      switch (value) {
        case "SUPER_ADMIN":
          return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg";
        case "ADMIN":
          return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg";
        case "USER":
          return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
        default:
          return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
      }
    } else {
      // Status badges
      switch (value) {
        case "Active":
          return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg";
        case "Inactive":
          return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg";
        case "Pending":
          return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg";
        case "Suspended":
          return "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg";
        default:
          return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
      }
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full ${getBadgeStyles(
        displayValue,
        type
      )} transition-all duration-200 hover:scale-105 hover:shadow-xl`}
    >
      {displayValue}
    </span>
  );
};

export default StatusBadgeCell;
