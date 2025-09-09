import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AgGridTable from "../../components/ui/AgGridTable";
import UserAvatarCell from "../../components/ui/UserAvatarCell";
import StatusBadgeCell from "../../components/ui/StatusBadgeCell";
import ActionsCell from "../../components/ui/ActionsCell";
import { useUsers, useDeleteUser, useUserStats } from "../../queries/users";
import type { User } from "../../api-services/user-service";
import styles from "./AllUsers.module.scss";

// Import ag-grid styles directly to ensure they're loaded
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllUsers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");

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

  // Extract users and pagination from response
  const users = usersResponse?.users || [];
  const pagination = usersResponse?.pagination;
  console.log("users", users);
  console.log("usersResponse", usersResponse);
  // API handles filtering, so we can use users directly
  const filteredUsers = users;

  // Event handlers - Define these BEFORE columnDefs
  const handleViewUser = useCallback(
    (userId: number) => {
      navigate(`/admin/users/${userId}`);
    },
    [navigate]
  );

  const handleEditUser = useCallback(
    (userId: number) => {
      navigate(`/admin/users/${userId}/edit`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback(
    async (userId: number) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteUserMutation.mutateAsync(userId);
          // The query will automatically refetch due to invalidation
        } catch (error) {
          console.error("Failed to delete user:", error);
        }
      }
    },
    [deleteUserMutation]
  );

  // Handle bulk actions
  const handleBulkActivate = useCallback(() => {
    console.log("Activating users:", selectedUsers);
    // Implement bulk activation logic
  }, [selectedUsers]);

  const handleBulkDeactivate = useCallback(() => {
    console.log("Deactivating users:", selectedUsers);
    // Implement bulk deactivation logic
  }, [selectedUsers]);

  const handleBulkExport = useCallback(() => {
    console.log("Exporting users:", selectedUsers);
    // Implement bulk export logic
  }, [selectedUsers]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedUsers([]);
  }, []);

  // Column definitions for the data grid
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "",
        width: 200,
        cellRenderer: (params: any) => {
          return <UserAvatarCell value={params.data.name} data={params.data} />;
        },
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "left",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 200,
        cellRenderer: (params: any) => {
          const user = params.data;
          return (
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{user.email}</span>
              <span className="text-sm text-gray-500">ID: {user.id}</span>
            </div>
          );
        },
      },
      {
        field: "referral_code",
        headerName: "Referral Code",
        width: 120,
        cellRenderer: (params: any) => {
          const code = params.value;
          return (
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {code}
            </span>
          );
        },
      },
      {
        field: "sponsor",
        headerName: "Sponsor",
        width: 150,
        cellRenderer: (params: any) => {
          const sponsor = params.data.sponsor;
          if (!sponsor)
            return <span className="text-gray-400">No sponsor</span>;
          return (
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{sponsor.name}</span>
              <span className="text-sm text-gray-500">{sponsor.email}</span>
            </div>
          );
        },
      },
      {
        field: "package",
        headerName: "Package",
        width: 120,
        cellRenderer: (params: any) => {
          const pkg = params.data.package;
          if (!pkg) return <span className="text-gray-400">No package</span>;
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {pkg.name}
            </span>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        cellRenderer: StatusBadgeCell,
      },
      {
        field: "created_at",
        headerName: "Joined",
        width: 120,
        cellRenderer: (params: any) => {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        cellRenderer: ActionsCell,
        cellRendererParams: {
          onView: handleViewUser,
          onEdit: handleEditUser,
          onDelete: handleDeleteUser,
        },
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
      },
    ],
    [handleViewUser, handleEditUser, handleDeleteUser]
  );

  return (
    <div className={styles.usersContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerIcon}>
              <svg
                className={styles.icon}
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
            <h1 className={styles.headerTitle}>All Users</h1>
            <p className={styles.headerSubtitle}>
              Manage and monitor all users in your MLM network.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg
                className={styles.icon}
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
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Total Users</p>
              <p className={styles.statValue}>{userStats?.total_users || 0}</p>
            </div>
          </div>

          <div className={styles.secondaryStatCard}>
            <div className={`${styles.statIcon} ${styles.tealIcon}`}>
              <svg
                className={styles.icon}
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
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Active Users</p>
              <p className={styles.statValue}>
                {userStats?.customer_users || 0}
              </p>
            </div>
          </div>

          <div className={styles.secondaryStatCard}>
            <div className={`${styles.statIcon} ${styles.yellowIcon}`}>
              <svg
                className={styles.icon}
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
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Pending Users</p>
              <p className={styles.statValue}>
                {userStats?.users_without_packages || 0}
              </p>
            </div>
          </div>

          <div className={styles.secondaryStatCard}>
            <div className={`${styles.statIcon} ${styles.redIcon}`}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Inactive Users</p>
              <p className={styles.statValue}>{userStats?.admin_users || 0}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersCard}>
          <div className={styles.filtersGrid}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.filterInput}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Packages</option>
              <option value="1">Starter</option>
              <option value="2">Premium</option>
              <option value="3">Elite</option>
            </select>
            <button
              onClick={() => {
                // Trigger refetch with current filters
                setCurrentPage(1);
              }}
              className={styles.searchButton}
            >
              Search
            </button>
          </div>
        </div>

        {/* Selected Users Actions */}
        {selectedUsers.length > 0 && (
          <div className={styles.selectedUsersCard}>
            <div className={styles.selectedUsersInfo}>
              <span className={styles.selectedCount}>
                {selectedUsers.length} user(s) selected
              </span>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear Selection
              </button>
            </div>
            <div className={styles.actionButtons}>
              <button
                onClick={handleBulkActivate}
                className={`${styles.actionButton} ${styles.activateButton}`}
              >
                Activate Selected
              </button>
              <button
                onClick={handleBulkDeactivate}
                className={`${styles.actionButton} ${styles.deactivateButton}`}
              >
                Deactivate Selected
              </button>
              <button
                onClick={handleBulkExport}
                className={`${styles.actionButton} ${styles.exportButton}`}
              >
                Export Selected
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading users</p>
            <p className={styles.errorMessage}>{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow">
            <AgGridTable
              rowData={filteredUsers}
              columnDefs={columnDefs}
              enablePagination={true}
              paginationPageSize={perPage}
            />
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              <span className={styles.paginationText}>
                Showing{" "}
                {(pagination.current_page - 1) * pagination.per_page + 1} to{" "}
                {Math.min(
                  pagination.current_page * pagination.per_page,
                  pagination.total
                )}{" "}
                of {pagination.total} users
              </span>
              <div className={styles.perPageSelector}>
                <label htmlFor="perPage" className={styles.perPageLabel}>
                  Show:
                </label>
                <select
                  id="perPage"
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={styles.perPageSelect}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className={styles.paginationButtons}>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 py-1 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`${styles.paginationButton} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
                className={styles.paginationButton}
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(pagination.last_page)}
                disabled={currentPage === pagination.last_page}
                className={styles.paginationButton}
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
