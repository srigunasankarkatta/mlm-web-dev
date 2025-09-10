import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import AgGridTable from "../../components/ui/AgGridTable";
import ServerPagination from "../../components/ui/ServerPagination";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import {
  usePackages,
  useDeletePackage,
  useCreatePackage,
  useUpdatePackage,
} from "../../queries/packages";
import type {
  Package,
  CreatePackageRequest,
  UpdatePackageRequest,
} from "../../api-services/package-service";
import PackageModal from "./PackageModal";
import styles from "./AllPackages.module.scss";

const AllPackages: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);
  const [packageToEdit, setPackageToEdit] = useState<Package | null>(null);

  // API queries
  const {
    data: packagesResponse,
    isLoading,
    error,
  } = usePackages({
    per_page: perPage,
    page: currentPage,
  });

  const deletePackageMutation = useDeletePackage();
  const createPackageMutation = useCreatePackage();
  const updatePackageMutation = useUpdatePackage();

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

  const handleEditPackage = useCallback((packageItem: any) => {
    setPackageToEdit(packageItem);
    setIsEditModalOpen(true);
  }, []);

  const handleCreatePackage = useCallback(
    async (data: CreatePackageRequest | UpdatePackageRequest) => {
      try {
        await createPackageMutation.mutateAsync(data as CreatePackageRequest);
        setIsCreateModalOpen(false);
      } catch (error) {
        console.error("Failed to create package:", error);
      }
    },
    [createPackageMutation]
  );

  const handleUpdatePackage = useCallback(
    async (data: CreatePackageRequest | UpdatePackageRequest) => {
      if (packageToEdit) {
        try {
          await updatePackageMutation.mutateAsync({
            id: packageToEdit.id,
            packageData: data as UpdatePackageRequest,
          });
          setIsEditModalOpen(false);
          setPackageToEdit(null);
        } catch (error) {
          console.error("Failed to update package:", error);
        }
      }
    },
    [packageToEdit, updatePackageMutation]
  );

  const handleDeletePackage = useCallback(
    (packageId: number, _packageName: string) => {
      const packageItem = packages.find((p) => p.id === packageId);
      if (packageItem) {
        setPackageToDelete(packageItem);
        setIsDeleteModalOpen(true);
      }
    },
    [packages]
  );

  const confirmDelete = useCallback(async () => {
    if (packageToDelete) {
      try {
        await deletePackageMutation.mutateAsync(packageToDelete.id);
        setIsDeleteModalOpen(false);
        setPackageToDelete(null);
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  }, [packageToDelete, deletePackageMutation]);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Column definitions for ag-grid
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Package",
        width: 250,
        minWidth: 200,
        cellRenderer: (params: any) => (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <FiPackage className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-blue-900 truncate">
                {params.data.name}
              </div>
              <div className="text-xs text-blue-600">
                Level {params.data.level_unlock}
              </div>
            </div>
          </div>
        ),
        sortable: true,
        resizable: true,
        pinned: "left",
      },
      {
        field: "price",
        headerName: "Price",
        width: 120,
        minWidth: 100,
        cellRenderer: (params: any) => (
          <div className="flex items-center space-x-2">
            <FiDollarSign className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-600">₹{params.value}</span>
          </div>
        ),
        sortable: true,
        resizable: true,
      },
      {
        field: "level_unlock",
        headerName: "Level",
        width: 120,
        minWidth: 100,
        sortable: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <div className="flex items-center space-x-2">
            <FiUsers className="w-4 h-4 text-blue-600" />
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              Level {params.value}
            </span>
          </div>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        minWidth: 150,
        sortable: false,
        filter: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <div className="text-sm text-blue-600 truncate" title={params.value}>
            {params.value || "No description"}
          </div>
        ),
      },
      {
        field: "created_at",
        headerName: "Created",
        width: 140,
        minWidth: 120,
        sortable: true,
        resizable: true,
        cellRenderer: (params: any) => (
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(params.value).toLocaleDateString()}
            </span>
          </div>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        minWidth: 160,
        pinned: "right",
        cellRenderer: (params: any) => {
          const packageItem = params.data;
          return (
            <div className="action-buttons-container">
              <button
                onClick={() => handleViewPackage(packageItem)}
                title="View Details"
              >
                <FiEye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleEditPackage(packageItem)}
                title="Edit Package"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  handleDeletePackage(packageItem.id, packageItem.name)
                }
                title="Delete Package"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
        sortable: false,
        filter: false,
        resizable: false,
        lockPosition: "right",
        cellClass: "action-cell",
      },
    ],
    [handleViewPackage, handleEditPackage, handleDeletePackage]
  );

  if (isLoading) {
    return (
      <div className={styles.packagesContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.packagesContainer}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorTitle}>Error loading packages</p>
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
    <div className={styles.packagesContainer}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Package Button */}
        <div className={styles.headerSection}>
          <div className={styles.headerCard}>
            <div className={styles.headerContent}>
              <div>
                <h1 className={styles.headerTitle}>All Packages</h1>
                <p className={styles.headerSubtitle}>
                  Manage and monitor all packages in your MLM network.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className={styles.createButton}
                disabled={createPackageMutation.isPending}
              >
                <FiPackage className="w-4 h-4" />
                Add Package
              </button>
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-lg shadow">
          <div className={styles.tableContainer}>
            <AgGridTable
              rowData={filteredPackages}
              columnDefs={columnDefs}
              enablePagination={false}
              enableSorting={true}
              enableFiltering={false}
              enableSelection={false}
              autoSizeRows={true}
              height={400}
              className={styles.agGridTable}
              gridOptions={{
                suppressHorizontalScroll: false,
                alwaysShowHorizontalScroll: true,
                suppressColumnVirtualisation: false,
                suppressRowVirtualisation: false,
              }}
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

        {/* Create Package Modal */}
        <PackageModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePackage}
          isLoading={createPackageMutation.isPending}
          mode="create"
          title="Create Package"
        />

        {/* Edit Package Modal */}
        <PackageModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setPackageToEdit(null);
          }}
          onSubmit={handleUpdatePackage}
          isLoading={updatePackageMutation.isPending}
          mode="edit"
          initialData={
            packageToEdit
              ? {
                  name: packageToEdit.name,
                  price: parseFloat(packageToEdit.price),
                  level_unlock: packageToEdit.level_unlock,
                  description: packageToEdit.description || "",
                }
              : undefined
          }
          title="Edit Package"
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setPackageToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Package"
          message={
            packageToDelete
              ? `Are you sure you want to delete "${packageToDelete.name}"? This action cannot be undone.`
              : ""
          }
          confirmText="Delete Package"
          isLoading={deletePackageMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AllPackages;
