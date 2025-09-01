import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AgGridTable from "../../components/ui/AgGridTable";
import StatusBadgeCell from "../../components/ui/StatusBadgeCell";
import ActionsCell from "../../components/ui/ActionsCell";
import {
  usePackages,
  useDeletePackage,
  useTogglePackageStatus,
  usePackageStats,
} from "../../queries/packages";
import type { Package } from "../../api-services/package-service";

const AllPackages: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

  // API queries
  const {
    data: packagesResponse,
    isLoading,
    error,
  } = usePackages({
    search: searchTerm || undefined,
    is_active: statusFilter !== "all" ? statusFilter === "Active" : undefined,
    rank: rankFilter !== "all" ? parseInt(rankFilter) : undefined,
    per_page: perPage,
    page: currentPage,
  });

  const { data: packageStats } = usePackageStats();
  const deletePackageMutation = useDeletePackage();
  const togglePackageStatusMutation = useTogglePackageStatus();

  // Extract packages and pagination from response
  const packages = packagesResponse || [];
  const pagination = packagesResponse?.pagination;

  // Filter packages based on search and filters (API handles most filtering)
  const filteredPackages = useMemo(() => {
    return packages.filter((packageItem) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "Active" && packageItem.is_active) ||
        (statusFilter === "Inactive" && !packageItem.is_active);

      return matchesStatus;
    });
  }, [packages, statusFilter]);

  // Event handlers
  const handleViewPackage = useCallback(
    (packageItem: any) => {
      console.log("View package:", packageItem);
      navigate(`/admin/packages/${packageItem.id}`);
    },
    [navigate]
  );

  const handleEditPackage = useCallback(
    (packageItem: any) => {
      console.log("Edit package:", packageItem);
      navigate(`/admin/packages/${packageItem.id}/edit`);
    },
    [navigate]
  );

  const handleDeletePackage = useCallback(
    async (packageItem: any) => {
      if (
        window.confirm(`Are you sure you want to delete ${packageItem.name}?`)
      ) {
        try {
          await deletePackageMutation.mutateAsync(packageItem.id);
        } catch (error) {
          console.error("Failed to delete package:", error);
        }
      }
    },
    [deletePackageMutation]
  );

  const handleToggleStatus = useCallback(
    async (packageItem: any) => {
      try {
        await togglePackageStatusMutation.mutateAsync({
          id: packageItem.id,
          isActive: !packageItem.is_active,
        });
      } catch (error) {
        console.error("Failed to toggle package status:", error);
      }
    },
    [togglePackageStatusMutation]
  );

  const handleGridReady = useCallback((params: any) => {
    console.log("Grid ready:", params);
  }, []);

  const handleRowSelected = useCallback((event: any) => {
    if (event.node.selected) {
      setSelectedPackages((prev) => [...prev, event.data]);
    } else {
      setSelectedPackages((prev) => prev.filter((p) => p.id !== event.data.id));
    }
  }, []);

  // Column definitions for ag-grid
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Package",
        field: "name",
        cellRenderer: (params: any) => (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-sm font-bold text-white">
                {params.data.code.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {params.data.name}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {params.data.code}
              </div>
            </div>
          </div>
        ),
        width: 200,
        minWidth: 180,
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Price",
        field: "price",
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
        cellStyle: { color: "#059669", fontWeight: "600" },
        valueFormatter: (params: any) =>
          `$${parseFloat(params.value).toFixed(2)}`,
      },
      {
        headerName: "Rank",
        field: "rank",
        width: 80,
        minWidth: 70,
        sortable: true,
        filter: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {params.value}
          </span>
        ),
      },
      {
        headerName: "Status",
        field: "is_active",
        cellRenderer: StatusBadgeCell,
        cellRendererParams: {
          type: "status",
          getValue: (params: any) => (params.is_active ? "Active" : "Inactive"),
        },
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Created",
        field: "created_at",
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
        valueFormatter: (params: any) =>
          new Date(params.value).toLocaleDateString(),
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: ActionsCell,
        cellRendererParams: {
          onView: handleViewPackage,
          onEdit: handleEditPackage,
          onDelete: handleDeletePackage,
        },
        width: 150,
        minWidth: 120,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
      },
    ],
    [handleViewPackage, handleEditPackage, handleDeletePackage]
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                All Packages
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all packages in your MLM network.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Packages
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {packageStats?.total_packages || packages.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
                <p className="text-sm font-medium text-gray-600">
                  Active Packages
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {packageStats?.active_packages ||
                    packages.filter((p) => p.is_active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  {packageStats?.total_users || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  ${packageStats?.total_revenue || "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ranks</option>
              <option value="1">Rank 1</option>
              <option value="2">Rank 2</option>
              <option value="3">Rank 3</option>
              <option value="4">Rank 4</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setRankFilter("all");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => navigate("/admin/packages/create")}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Create Package</span>
            </button>
          </div>
        </div>

        {/* Ag-Grid Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Package List</h3>
            <p className="text-sm text-gray-500 mt-1">
              {isLoading
                ? "Loading packages..."
                : `Showing ${filteredPackages.length} packages`}
              {pagination &&
                ` (Page ${pagination.current_page} of ${pagination.last_page})`}
            </p>
          </div>
          <div className="p-6">
            {error ? (
              <div className="text-center py-8">
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
                  <p className="text-lg font-semibold">
                    Error loading packages
                  </p>
                  <p className="text-sm text-gray-600">{error.message}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <AgGridTable
                rowData={filteredPackages}
                columnDefs={columnDefs}
                height={600}
                enablePagination={true}
                enableSorting={true}
                enableFiltering={true}
                enableSelection={true}
                enableResizing={true}
                enableColumnMoving={true}
                paginationPageSize={perPage}
                paginationPageSizeSelector={[10, 15, 25, 50, 100]}
                selectionType="multiple"
                selectedRows={selectedPackages}
                onGridReady={handleGridReady}
                onRowSelected={handleRowSelected}
                loading={isLoading}
                className="w-full"
              />
            )}

            {/* Debug info */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
              <p>Debug Info:</p>
              <p>Loading: {isLoading ? "Yes" : "No"}</p>
              <p>Error: {error ? error.message : "None"}</p>
              <p>Filtered Packages: {filteredPackages.length}</p>
              <p>Column Definitions: {columnDefs.length}</p>
              <p>First Package: {filteredPackages[0]?.name || "None"}</p>
              <p>API Response: {packagesResponse ? "Received" : "None"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPackages;
