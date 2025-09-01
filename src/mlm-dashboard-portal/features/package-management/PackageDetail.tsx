import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePackage, useTogglePackageStatus } from "../../queries/packages";
import type { PackageDetail as PackageDetailType } from "../../api-services/package-service";

const PackageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const packageId = parseInt(id || "0");
  const { data: packageItem, isLoading, error } = usePackage(packageId);
  const toggleStatusMutation = useTogglePackageStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading package details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !packageItem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            <p className="text-lg font-semibold">Error loading package</p>
            <p className="text-sm text-gray-600">
              {error?.message || "Package not found"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/packages")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const handleToggleStatus = async () => {
    try {
      await toggleStatusMutation.mutateAsync({
        id: packageItem.id,
        isActive: !packageItem.is_active,
      });
    } catch (error) {
      console.error("Failed to toggle package status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(amount));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/admin/packages")}
                className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Package Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Viewing information for {packageItem.name}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() =>
                  navigate(`/admin/packages/${packageItem.id}/edit`)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Package
              </button>
              <button
                onClick={handleToggleStatus}
                disabled={toggleStatusMutation.isPending}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  packageItem.is_active
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {toggleStatusMutation.isPending
                  ? "Updating..."
                  : packageItem.is_active
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          </div>
        </div>

        {/* Package Overview Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Package Icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {packageItem.code.charAt(0)}
                </span>
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 border-2 border-white rounded-full ${
                  packageItem.is_active ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {packageItem.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    packageItem.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {packageItem.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Package Code</p>
                  <p className="font-medium font-mono">{packageItem.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(packageItem.price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rank</p>
                  <p className="font-medium">{packageItem.rank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">
                    {formatDate(packageItem.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {packageItem.users?.length || 0}
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
                <p className="text-sm font-medium text-gray-600">
                  Total Commissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {packageItem.commissions?.length || 0}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  $
                  {packageItem.commissions
                    ?.reduce((sum, comm) => sum + parseFloat(comm.amount), 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Package Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Package Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Package Name:</span>
                <span className="font-medium">{packageItem.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Package Code:</span>
                <span className="font-medium font-mono">
                  {packageItem.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(packageItem.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank:</span>
                <span className="font-medium">{packageItem.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    packageItem.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {packageItem.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Creator Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Creator Information
            </h3>
            {packageItem.creator ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator Name:</span>
                  <span className="font-medium">
                    {packageItem.creator.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator Email:</span>
                  <span className="font-medium">
                    {packageItem.creator.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creator ID:</span>
                  <span className="font-medium">{packageItem.creator.id}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No creator information available
              </p>
            )}
          </div>

          {/* Users List */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Package Users ({packageItem.users?.length || 0})
            </h3>
            {packageItem.users && packageItem.users.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {packageItem.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {user.referral_code}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No users assigned to this package
              </p>
            )}
          </div>

          {/* Commissions List */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Commissions ({packageItem.commissions?.length || 0})
            </h3>
            {packageItem.commissions && packageItem.commissions.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {packageItem.commissions.map((commission) => (
                  <div
                    key={commission.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {commission.type.replace("_", " ").toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(commission.created_at)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(commission.amount)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No commissions recorded for this package
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Package created</span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(packageItem.created_at)}
              </span>
            </div>

            {packageItem.updated_at !== packageItem.created_at && (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Package updated</span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(packageItem.updated_at)}
                </span>
              </div>
            )}

            {packageItem.is_active && (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Package activated
                  </span>
                </div>
                <span className="text-sm text-gray-500">Recently</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
