import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser, useUpdateUser } from "../../queries/users";
import { usePackages } from "../../queries/packages";

interface EditUserFormData {
  name: string;
  package_id: number;
  roles: string[];
}

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || "0");

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(userId);
  const { data: packagesResponse } = usePackages();
  const packages = packagesResponse?.data || [];
  const updateUserMutation = useUpdateUser();

  const [formData, setFormData] = useState<EditUserFormData>({
    name: "",
    package_id: 1,
    roles: [],
  });

  const [errors, setErrors] = useState<Partial<EditUserFormData>>({});

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        package_id: user.package?.id || 1,
        roles: user.roles,
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "roles") {
      const selectElement = e.target as HTMLSelectElement;
      const selectedRoles = Array.from(
        selectElement.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedRoles }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof EditUserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EditUserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.package_id) {
      newErrors.package_id = "Package is required";
    }

    if (!formData.roles.length) {
      newErrors.roles = "At least one role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        userData: formData,
      });
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  if (userLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
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
            <p className="text-lg font-semibold">Error loading user</p>
            <p className="text-sm text-gray-600">
              User not found or error occurred
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit User
              </h1>
              <p className="text-gray-600 mt-1">
                Update user information for {user.name}.
              </p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Referral Code</p>
              <p className="font-medium text-gray-900">{user.referral_code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Directs Count</p>
              <p className="font-medium text-gray-900">{user.directs_count}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Package */}
              <div>
                <label
                  htmlFor="package_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Package *
                </label>
                <select
                  id="package_id"
                  name="package_id"
                  value={formData.package_id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.package_id ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a package</option>
                  {packages?.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - ₹{pkg.price}
                    </option>
                  ))}
                </select>
                {errors.package_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.package_id}
                  </p>
                )}
              </div>

              {/* Roles */}
              <div className="md:col-span-2">
                <label
                  htmlFor="roles"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Roles *
                </label>
                <select
                  id="roles"
                  name="roles"
                  multiple
                  value={formData.roles}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.roles ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.roles && (
                  <p className="mt-1 text-sm text-red-600">{errors.roles}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Hold Ctrl/Cmd to select multiple roles
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {updateUserMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update User</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
