import React from "react";

interface UserAvatarCellProps {
  value: string;
  data: any;
  getEmail?: (params: any) => string;
  getJoinDate?: (params: any) => string;
}

const UserAvatarCell: React.FC<UserAvatarCellProps> = ({ value, data, getEmail, getJoinDate }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get email and join date using provided functions or fallback to data
  const email = getEmail ? getEmail(data) : data.email;
  const joinDate = getJoinDate ? getJoinDate(data) : data.joinDate;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-sm font-bold text-white">
            {getInitials(value)}
          </span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-900 truncate mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-600 truncate mb-1 flex items-center">
          <svg
            className="w-3 h-3 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {email}
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <svg
            className="w-3 h-3 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          Joined: {joinDate ? new Date(joinDate).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default UserAvatarCell;
