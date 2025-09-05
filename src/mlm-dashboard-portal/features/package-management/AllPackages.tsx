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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
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
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-sm font-bold text-white">
                {params.data.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-teal-900 truncate">
                {params.data.name}
              </div>
              <div className="text-xs text-teal-600">
                Level {params.data.level_unlock}
              </div>
            </div>
          </div>
        ),
        width: 200,
        minWidth: 180,
        sortable: true,
        resizable: true,
      },
      {
        headerName: "Price",
        field: "price",
        cellRenderer: (params: any) => (
          <span className="font-semibold text-teal-600">₹{params.value}</span>
        ),
        width: 120,
        minWidth: 100,
        sortable: true,
        resizable: true,
        cellStyle: { color: "#059669", fontWeight: "600" },
      },
      {
        headerName: "Level Unlock",
        field: "level_unlock",
        width: 120,
        minWidth: 100,
        sortable: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
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
          <div className="text-sm text-teal-600 truncate" title={params.value}>
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
        resizable: false,
        pinned: "right",
      },
    ],
    [handleViewPackage, handleEditPackage, handleDeletePackage]
  );

  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-900 to-teal-700 bg-clip-text text-transparent">
                All Packages
              </h1>
              <p className="text-teal-600 mt-1">
                Manage and monitor all packages in your MLM network.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
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
                <p className="text-sm font-medium text-teal-600">
                  Total Packages
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                  {packageStats?.total_packages || packages.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
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
                <p className="text-sm font-medium text-teal-600">
                  Users with Packages
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                  {packageStats?.total_users_with_packages || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Package Button */}
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6 mb-6">
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/admin/packages/create")}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 font-medium flex items-center space-x-2"
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
                enablePagination={false}
                enableSorting={true}
                enableFiltering={false}
                enableFloatingFilter={false}
                enableSelection={true}
                enableResizing={true}
                enableColumnMoving={true}
                selectionType="multiple"
                selectedRows={selectedPackages}
                onGridReady={handleGridReady}
                onRowSelected={handleRowSelected}
                loading={isLoading}
                className="w-full"
              />
            )}

           
          </div>
        </div>

        {/* Custom Pagination Controls */}
        {pagination && (
          <div className="bg-white border-t border-teal-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-teal-700">
                  Showing{" "}
                  {(pagination.current_page - 1) * pagination.per_page + 1} to{" "}
                  {Math.min(
                    pagination.current_page * pagination.per_page,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Per Page Selector */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="perPage" className="text-sm text-teal-700">
                    Show:
                  </label>
                  <select
                    id="perPage"
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing per page
                    }}
                    className="px-2 py-1 border border-teal-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-teal-700"
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={pagination.current_page === 1}
                    className="px-2 py-1 text-sm border border-teal-300 rounded hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-700 transition-colors duration-200"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="px-2 py-1 text-sm border border-teal-300 rounded hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-700 transition-colors duration-200"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from(
                      { length: Math.min(5, pagination.last_page) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.last_page <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.current_page <= 3) {
                          pageNum = i + 1;
                        } else if (
                          pagination.current_page >=
                          pagination.last_page - 2
                        ) {
                          pageNum = pagination.last_page - 4 + i;
                        } else {
                          pageNum = pagination.current_page - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 text-sm border rounded transition-all duration-200 ${
                              pageNum === pagination.current_page
                                ? "bg-teal-600 text-white border-teal-600 shadow-md"
                                : "border-teal-300 hover:bg-teal-50 text-teal-700 hover:border-teal-400"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() => setCurrentPage(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-2 py-1 text-sm border border-teal-300 rounded hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(pagination.last_page)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-2 py-1 text-sm border border-teal-300 rounded hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed text-teal-700 transition-colors duration-200"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPackages;
