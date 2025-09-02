import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AgGridTable from "../../components/ui/AgGridTable";
import UserAvatarCell from "../../components/ui/UserAvatarCell";
import StatusBadgeCell from "../../components/ui/StatusBadgeCell";
import ActionsCell from "../../components/ui/ActionsCell";
import {
  useUsers,
  useDeleteUser,
  useToggleUserStatus,
  useUserStats,
} from "../../queries/users";
import type { User } from "../../api-services/user-service";

// Import ag-grid styles directly to ensure they're loaded
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllUsers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // API queries
  const {
    data: usersResponse,
    isLoading,
    error,
  } = useUsers({
    search: searchTerm || undefined,
    package_id: packageFilter !== "all" ? parseInt(packageFilter) : undefined,
    role: statusFilter !== "all" ? statusFilter : undefined,
    per_page: perPage,
    page: currentPage,
  });

  const { data: userStats } = useUserStats();
  const deleteUserMutation = useDeleteUser();
  const toggleUserStatusMutation = useToggleUserStatus();

  // Extract users and pagination from response
  const users = usersResponse?.users || [];
  const pagination = usersResponse?.pagination;
  console.log("users", users);
  console.log("usersResponse", usersResponse);
  // API handles filtering, so we can use users directly
  const filteredUsers = users;

  // Event handlers - Define these BEFORE columnDefs
  const handleViewUser = useCallback(
    (user: any) => {
      console.log("View user:", user);
      navigate(`/admin/users/${user.id}`);
    },
    [navigate]
  );

  const handleEditUser = useCallback(
    (user: any) => {
      console.log("Edit user:", user);
      navigate(`/admin/users/${user.id}/edit`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback(
    (user: any) => {
      if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
        deleteUserMutation.mutate(user.id);
      }
    },
    [deleteUserMutation]
  );

  const handleRowSelected = useCallback((event: any) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedUsers(selectedRows);
  }, []);

  const handleGridReady = useCallback((event: any) => {
    console.log("Grid ready:", event);
    console.log("Grid API:", event.api);
    console.log("Row data:", event.api.getRenderedNodes());
    // Auto-size columns on grid ready
    if (event.api) {
      event.api.sizeColumnsToFit();
    }
  }, []);

  const handleAddUser = useCallback(() => {
    navigate("/admin/users/create");
  }, [navigate]);

  const handleBulkAction = useCallback(
    (action: string) => {
      if (selectedUsers.length === 0) {
        alert("Please select users first");
        return;
      }
      console.log(`${action} users:`, selectedUsers);
      // Implement bulk action logic
    },
    [selectedUsers]
  );

  // Column definitions for ag-grid
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "User",
        field: "name",
        cellRenderer: UserAvatarCell,
        cellRendererParams: {
          getEmail: (params: any) => params.email,
          getJoinDate: (params: any) => params.created_at,
        },
        width: 250,
        minWidth: 200,
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Status",
        field: "roles",
        cellRenderer: StatusBadgeCell,
        cellRendererParams: {
          type: "status",
          getValue: (params: any) =>
            params.roles && params.roles.includes("customer")
              ? "Active"
              : "Admin",
        },
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Package",
        field: "package.name",
        width: 150,
        minWidth: 120,
        sortable: true,
        filter: true,
        resizable: true,
        valueFormatter: (params: any) => params.value || "No Package",
      },
      {
        headerName: "Directs",
        field: "directs_count",
        width: 100,
        minWidth: 80,
        sortable: true,
        filter: true,
        resizable: true,
        type: "numericColumn",
      },
      {
        headerName: "Total Income",
        field: "total_income",
        width: 120,
        minWidth: 100,
        sortable: true,
        filter: true,
        resizable: true,
        cellStyle: { color: "#059669", fontWeight: "600" },
        valueFormatter: (params: any) => `₹${params.value || "0.00"}`,
      },
      {
        headerName: "Joined",
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
          onView: handleViewUser,
          onEdit: handleEditUser,
          onDelete: handleDeleteUser,
        },
        width: 150,
        minWidth: 120,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
      },
    ],
    [handleViewUser, handleEditUser, handleDeleteUser]
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                All Users
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all users in your MLM network.
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats?.customer_users ||
                    users.filter((u) => u.roles && u.roles.includes("customer"))
                      .length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  New This Month
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats?.users_with_packages || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Without Packages
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats?.users_without_packages ||
                    users.filter((u) => !u.package).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow  mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Packages</option>
                <option value="1">Starter Package</option>
                <option value="2">Basic Package</option>
                <option value="3">Premium Package</option>
                <option value="4">Enterprise Package</option>
              </select>
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-900">
                  {selectedUsers.length} user(s) selected
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction("Activate")}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction("Deactivate")}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction("Export")}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading
          ? "Loading users..."
          : `Showing ${filteredUsers.length} users`}
        {pagination &&
          ` (Page ${pagination.current_page} of ${pagination.last_page})`}
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
              <p className="text-lg font-semibold">Error loading users</p>
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
            rowData={filteredUsers}
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
            selectedRows={selectedUsers}
            onGridReady={handleGridReady}
            onRowSelected={handleRowSelected}
            loading={isLoading}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
