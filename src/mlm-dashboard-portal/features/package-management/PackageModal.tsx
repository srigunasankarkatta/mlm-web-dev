import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiX,
} from "react-icons/fi";
import {
  CreatePackageRequest,
  UpdatePackageRequest,
} from "../../api-services/package-service";
import styles from "./PackageModal.module.scss";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreatePackageRequest | UpdatePackageRequest
  ) => Promise<void>;
  isLoading?: boolean;
  mode?: "create" | "edit";
  initialData?: CreatePackageRequest | UpdatePackageRequest;
  title?: string;
}

const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  mode = "create",
  initialData,
  title,
}) => {
  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Package name is required")
      .min(2, "Package name must be at least 2 characters")
      .max(100, "Package name must be less than 100 characters"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0")
      .typeError("Price must be a valid number"),
    level_unlock: Yup.number()
      .required("Level unlock is required")
      .min(1, "Level unlock must be at least 1")
      .max(100, "Level unlock must be less than 100")
      .typeError("Level unlock must be a valid number"),
    description: Yup.string()
      .max(500, "Description must be less than 500 characters")
      .optional(),
  });

  // Initial values
  const getInitialValues = (): CreatePackageRequest => {
    if (mode === "edit" && initialData) {
      return {
        name: initialData.name || "",
        price: initialData.price || 0,
        level_unlock: initialData.level_unlock || 1,
        description: initialData.description || "",
      };
    }

    return {
      name: "",
      price: 0,
      level_unlock: 1,
      description: "",
    };
  };

  const handleSubmit = async (values: CreatePackageRequest) => {
    const submitData = {
      name: values.name.trim(),
      price: Number(values.price),
      level_unlock: Number(values.level_unlock),
      description: values.description?.trim() || undefined,
    };

    await onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <FiPackage className="w-6 h-6" />
            </div>
            <div>
              <h2 className={styles.modalTitle}>
                {title ||
                  (mode === "create" ? "Create Package" : "Edit Package")}
              </h2>
              <p className={styles.modalSubtitle}>
                {mode === "create"
                  ? "Add a new package to your MLM network"
                  : "Update package information"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.modalBody}>
              <div className={styles.formGrid}>
                {/* Package Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <FiPackage className="w-4 h-4" />
                    Package Name *
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter package name"
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                {/* Price */}
                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.label}>
                    <FiDollarSign className="w-4 h-4" />
                    Price (₹) *
                  </label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                {/* Level Unlock */}
                <div className={styles.formGroup}>
                  <label htmlFor="level_unlock" className={styles.label}>
                    <FiUsers className="w-4 h-4" />
                    Level Unlock *
                  </label>
                  <Field
                    type="number"
                    id="level_unlock"
                    name="level_unlock"
                    placeholder="1"
                    min="1"
                    max="100"
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="level_unlock"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>
                    <FiFileText className="w-4 h-4" />
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter package description (optional)"
                    rows={3}
                    className={styles.textarea}
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className={styles.errorMessage}
                  />
                  <p className={styles.helpText}>
                    Optional description for the package
                  </p>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className={styles.loadingSpinner}></div>
                  ) : (
                    <FiPackage className="w-4 h-4" />
                  )}
                  {isLoading
                    ? "Processing..."
                    : mode === "create"
                    ? "Create Package"
                    : "Update Package"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PackageModal;
