import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AgGridTable from "../../components/ui/AgGridTable";
import ActionsCell from "../../components/ui/ActionsCell";
import {
  usePackages,
  useDeletePackage,
  usePackageStats,
} from "../../queries/packages";
import type { Package } from "../../api-services/package-service";

const AllPackages: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [perPage] = useState(15);
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

  // API queries
  const {
    data: packagesResponse,
    isLoading,
    error,
  } = usePackages({
    per_page: perPage,
    page: currentPage,
  });

  const { data: packageStats } = usePackageStats();
  const deletePackageMutation = useDeletePackage();

  // Extract packages and pagination from response
  const packages = packagesResponse?.packages || [];
  const pagination = packagesResponse?.pagination;

  // No client-side filtering needed as API handles it
  const filteredPackages = packages;

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
                {params.data.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {params.data.name}
              </div>
              <div className="text-xs text-gray-500">
                Level {params.data.level_unlock}
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
        cellRenderer: (params: any) => (
          <span className="font-semibold text-green-600">₹{params.value}</span>
        ),
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
        cellStyle: { color: "#059669", fontWeight: "600" },
      },
      {
        headerName: "Level Unlock",
        field: "level_unlock",
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            Level {params.value}
          </span>
        ),
      },
      {
        headerName: "Description",
        field: "description",
        width: 200,
        minWidth: 150,
        sortable: false,
        filter: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <div className="text-sm text-gray-600 truncate" title={params.value}>
            {params.value || "No description"}
          </div>
        ),
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
                  Users with Packages
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {packageStats?.total_users_with_packages || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Package Button */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/admin/packages/create")}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Package</span>
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
