import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
  FiPackage,
  FiShield,
} from "react-icons/fi";
import { usePackages } from "../../queries/packages";
import { useUsers } from "../../queries/users";
import type {
  CreateUserRequest,
  EditUserRequest,
} from "../../api-services/user-service";
import styles from "./CreateUserModal.module.scss";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserRequest | EditUserRequest) => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
  initialData?: CreateUserRequest | EditUserRequest;
  title?: string;
}

// Yup validation schema factory
const createValidationSchema = (mode: "create" | "edit") =>
  Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    password:
      mode === "edit"
        ? Yup.string()
            .optional()
            .min(6, "Password must be at least 6 characters")
            .max(50, "Password must be less than 50 characters")
        : Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(50, "Password must be less than 50 characters"),
    sponsor_id: Yup.number().optional(),
    package_id: Yup.number().optional(),
    roles: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one role")
      .required("Roles are required"),
  });

// Default initial form values
const defaultInitialValues: CreateUserRequest | EditUserRequest = {
  name: "",
  email: "",
  password: "",
  sponsor_id: undefined,
  package_id: undefined,
  roles: ["customer"],
};

const UserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  mode = "create",
  initialData,
  title,
}) => {
  // Fetch packages and users for dropdowns
  const { data: packagesData } = usePackages({ per_page: 100 });
  const { data: usersData } = useUsers({ per_page: 100 });

  const packages = packagesData?.packages || [];
  const users = usersData?.users || [];

  // Determine initial values based on mode
  const getInitialValues = (): CreateUserRequest | EditUserRequest => {
    if (mode === "edit" && initialData) {
      return {
        ...initialData,
        // Ensure password is empty for edit mode (user needs to enter new password)
        password: "",
      };
    }
    return defaultInitialValues;
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleSubmit = (values: CreateUserRequest | EditUserRequest) => {
    // Create a clean payload without package_id if no package is selected
    const payload: CreateUserRequest | EditUserRequest = {
      name: values.name,
      email: values.email,
      sponsor_id: values.sponsor_id,
      roles: values.roles,
      // Only include package_id if a package is selected
      ...(values.package_id &&
        values.package_id !== 0 && { package_id: values.package_id }),
      // Only include password if it's provided (for edit mode) or required (for create mode)
      ...(values.password &&
        values.password.trim() && { password: values.password }),
    };

    onSubmit(payload);
  };

  // Dynamic title based on mode
  const modalTitle =
    title || (mode === "edit" ? "Edit User" : "Create New User");
  const submitButtonText = mode === "edit" ? "Update User" : "Create User";
  const submitButtonLoadingText =
    mode === "edit" ? "Updating..." : "Creating...";

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className={styles.closeButton}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <Formik
          initialValues={getInitialValues()}
          validationSchema={createValidationSchema(mode)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGrid}>
                {/* Name Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <FiUser className="w-4 h-4" />
                    Full Name *
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`${styles.input} ${
                      errors.name && touched.name ? styles.inputError : ""
                    }`}
                    placeholder="Enter full name"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <FiMail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`${styles.input} ${
                      errors.email && touched.email ? styles.inputError : ""
                    }`}
                    placeholder="Enter email address"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    <FiLock className="w-4 h-4" />
                    {mode === "edit" ? "New Password" : "Password"} *
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`${styles.input} ${
                      errors.password && touched.password
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder={
                      mode === "edit" ? "Enter new password" : "Enter password"
                    }
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={styles.errorText}
                  />
                  {mode === "edit" && (
                    <small className={styles.helpText}>
                      Leave empty to keep current password
                    </small>
                  )}
                </div>

                {/* Sponsor Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="sponsor" className={styles.label}>
                    <FiUsers className="w-4 h-4" />
                    Sponsor (Optional)
                  </label>
                  <Field
                    as="select"
                    id="sponsor"
                    name="sponsor_id"
                    className={styles.select}
                    disabled={isLoading}
                  >
                    <option value="">Select a sponsor (optional)</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Package Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="package" className={styles.label}>
                    <FiPackage className="w-4 h-4" />
                    Package (Optional)
                  </label>
                  <Field
                    as="select"
                    id="package"
                    name="package_id"
                    className={styles.select}
                    disabled={isLoading}
                  >
                    <option value="">Select a package (optional)</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.price}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Roles Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <FiShield className="w-4 h-4" />
                    Roles *
                  </label>
                  <div className={styles.rolesContainer}>
                    <label className={styles.roleOption}>
                      <Field
                        type="checkbox"
                        name="roles"
                        value="customer"
                        checked={values.roles.includes("customer")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setFieldValue("roles", [
                              ...values.roles,
                              "customer",
                            ]);
                          } else {
                            setFieldValue(
                              "roles",
                              values.roles.filter((role) => role !== "customer")
                            );
                          }
                        }}
                        disabled={isLoading}
                      />
                      <span>Customer</span>
                    </label>
                    <label className={styles.roleOption}>
                      <Field
                        type="checkbox"
                        name="roles"
                        value="admin"
                        checked={values.roles.includes("admin")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setFieldValue("roles", [...values.roles, "admin"]);
                          } else {
                            setFieldValue(
                              "roles",
                              values.roles.filter((role) => role !== "admin")
                            );
                          }
                        }}
                        disabled={isLoading}
                      />
                      <span>Admin</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="roles"
                    component="span"
                    className={styles.errorText}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.submitButton}
                >
                  {isLoading ? submitButtonLoadingText : submitButtonText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserModal;
