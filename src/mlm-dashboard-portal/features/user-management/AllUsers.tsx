import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiUsers,
  FiPlus,
} from "react-icons/fi";
import AgGridTable from "../../components/ui/AgGridTable";
import ServerPagination from "../../components/ui/ServerPagination";
import UserAvatarCell from "../../components/ui/UserAvatarCell";
import StatusBadgeCell from "../../components/ui/StatusBadgeCell";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import {
  useUsers,
  useDeleteUser,
  useCreateUser,
  useFullUpdateUser,
} from "../../queries/users";
import type {
  CreateUserRequest,
  EditUserRequest,
  FullUpdateUserRequest,
} from "../../api-services/user-service";
import UserModal from "./CreateUserModal";
import styles from "./AllUsers.module.scss";

// Import ag-grid styles directly to ensure they're loaded
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AllUsers: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);

  // API queries
  const {
    data: usersResponse,
    isLoading,
    error,
  } = useUsers({
    per_page: perPage,
    page: currentPage,
  });
  const deleteUserMutation = useDeleteUser();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useFullUpdateUser();

  // Extract users and pagination from response
  const users = usersResponse?.users || [];
  const pagination = usersResponse?.pagination;

  // API handles filtering, so we can use users directly
  const filteredUsers = users;

  // Handlers
  const handleViewUser = useCallback(
    (userId: number) => {
      navigate(`/admin/users/${userId}`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback((userId: number, userName: string) => {
    setUserToDelete({ id: userId, name: userName });
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (userToDelete) {
      try {
        await deleteUserMutation.mutateAsync(userToDelete.id);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  }, [deleteUserMutation, userToDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  }, []);

  // Create user handler
  const handleCreateUser = useCallback(
    async (userData: CreateUserRequest | EditUserRequest) => {
      try {
        await createUserMutation.mutateAsync(userData as CreateUserRequest);
        setIsCreateModalOpen(false);
        // The mutation will automatically refresh the users list
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    },
    [createUserMutation]
  );

  // Edit user handler
  const handleEditUser = useCallback(
    async (userData: CreateUserRequest | EditUserRequest) => {
      if (!userToEdit) return;

      try {
        await updateUserMutation.mutateAsync({
          id: userToEdit.id,
          userData: userData as FullUpdateUserRequest,
        });
        setIsEditModalOpen(false);
        setUserToEdit(null);
        // The mutation will automatically refresh the users list
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },
    [userToEdit, updateUserMutation]
  );

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
            <div className="flex items-center space-x-2">
              <FiMail className="w-4 h-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{user.email}</span>
                <span className="text-sm text-gray-500">ID: {user.id}</span>
              </div>
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
          const sponsor = params.value;
          if (!sponsor) {
            return <span className="text-gray-400">No sponsor</span>;
          }
          return (
            <div className="flex items-center space-x-2">
              <FiUsers className="w-4 h-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {sponsor.name}
                </span>
                <span className="text-sm text-gray-500">{sponsor.email}</span>
              </div>
            </div>
          );
        },
      },
      {
        field: "package",
        headerName: "Package",
        width: 120,
        cellRenderer: (params: any) => {
          const pkg = params.value;
          if (!pkg) {
            return <span className="text-gray-400">No package</span>;
          }
          return (
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{pkg.name}</span>
              <span className="text-sm text-gray-500">${pkg.price}</span>
            </div>
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
          return (
            <span className="text-sm text-gray-600">
              {date.toLocaleDateString()}
            </span>
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        cellRenderer: (params: any) => {
          const user = params.data;
          return (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleViewUser(user.id)}
                className="group p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="View Details"
              >
                <FiEye className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setUserToEdit(user);
                  setIsEditModalOpen(true);
                }}
                className="group p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Edit User"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteUser(user.id, user.name)}
                className="group p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Delete User"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
        sortable: false,
        filter: false,
        resizable: false,
      },
    ],
    [handleViewUser, handleDeleteUser]
  );

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.usersContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.usersContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading users</p>
            <p className={styles.errorMessage}>{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.usersContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Add User Button */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.headerTitle}>All Users</h1>
                <p className={styles.headerSubtitle}>
                  Manage and monitor all users in your MLM network.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className={styles.createButton}
                disabled={createUserMutation.isPending}
              >
                <FiPlus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className={styles.tableContainer}>
            <AgGridTable
              rowData={filteredUsers}
              columnDefs={columnDefs}
              enablePagination={false}
              enableSorting={true}
              enableFiltering={false}
              enableSelection={false}
              height={600}
              className={styles.agGridTable}
            />
          </div>

          {/* Server-side Pagination */}
          {pagination && pagination.total > 0 && (
            <ServerPagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              totalItems={pagination.total}
              itemsPerPage={pagination.per_page}
              onPageChange={handlePageChange}
              loading={isLoading}
            />
          )}
        </div>

        {/* Create User Modal */}
        <UserModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateUser}
          isLoading={createUserMutation.isPending}
        />

        {/* Edit User Modal */}
        <UserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setUserToEdit(null);
          }}
          onSubmit={handleEditUser}
          isLoading={updateUserMutation.isPending}
          mode="edit"
          initialData={
            userToEdit
              ? {
                  name: userToEdit.name,
                  email: userToEdit.email,
                  password: "", // Empty for edit mode
                  sponsor_id: userToEdit.sponsor?.id,
                  package_id: userToEdit.package?.id,
                  roles: userToEdit.roles,
                }
              : undefined
          }
          title="Edit User"
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
          itemName={userToDelete?.name}
          isLoading={deleteUserMutation.isPending}
          confirmText="Delete User"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default AllUsers;
