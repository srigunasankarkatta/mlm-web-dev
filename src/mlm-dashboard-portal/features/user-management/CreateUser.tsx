import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../queries/users";
import { usePackages } from "../../queries/packages";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  sponsor_id?: number;
  package_id: number;
  roles: string[];
}

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();
  const { data: packagesResponse } = usePackages();
  const packages = packagesResponse?.data || [];

  const [formData, setFormData] = useState<CreateUserFormData>({
    name: "",
    email: "",
    password: "",
    sponsor_id: undefined,
    package_id: 1,
    roles: ["customer"],
  });

  const [errors, setErrors] = useState<Partial<CreateUserFormData>>({});

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
    if (errors[name as keyof CreateUserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      await createUserMutation.mutateAsync(formData);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create New User
              </h1>
              <p className="text-gray-600 mt-1">
                Add a new user to your MLM network.
              </p>
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
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

              {/* Sponsor ID */}
              <div>
                <label
                  htmlFor="sponsor_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sponsor ID (Optional)
                </label>
                <input
                  type="number"
                  id="sponsor_id"
                  name="sponsor_id"
                  value={formData.sponsor_id || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter sponsor user ID"
                />
              </div>

              {/* Roles */}
              <div>
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
                disabled={createUserMutation.isPending}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {createUserMutation.isPending ? (
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
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create User</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
