import axios, { AxiosInstance } from "axios";
import { ValidationErrorResponse, ApiResponse } from "../types/error-response";
import { performLogout } from "../utils/auth/logout";

// Default transformer for ApiResponse<T>
const transformApiResponse = <T>(res: any): T => {
    // Handle both old format (success) and new format (status)
    const isSuccess = res.data.success !== undefined ? res.data.success : res.data.status;
    if (!isSuccess) throw new Error(res.data.message || "API call failed");
    return res.data;
};

// Get token from localStorage/sessionStorage
const getAuthToken = (): string | null => {
    return localStorage.getItem('token') || 
           localStorage.getItem('adminToken') || 
           sessionStorage.getItem('token') || 
           sessionStorage.getItem('adminToken') || 
           null;
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000, // 30 seconds timeout
    });

    // Attach token
    instance.interceptors.request.use(
        (config) => {
            const token = getAuthToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Handle validation and global errors
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.code === "ECONNABORTED") {
                throw new Error("Request timeout. Please try again.");
            }

            const status = error.response?.status;

            if (status === 401 || status === 403) {
                performLogout();
                window.location.href = "/admin/login";
                return Promise.reject(new Error("Session expired. Please login again."));
            }

            if (status === 400 && error.response?.data?.errors) {
                const validationError: ValidationErrorResponse = error.response.data;
                const fieldErrors: Record<string, string> = {};

                for (const key in validationError.errors) {
                    fieldErrors[key] = validationError.errors[key].join(" ");
                }

                throw {
                    type: "validation",
                    fieldErrors,
                    message: validationError.title || "Validation failed.",
                    statusCode: 400,
                };
            }

            // Handle other HTTP errors
            if (status >= 500) {
                throw new Error("Server error. Please try again later.");
            }

            if (status >= 400) {
                const errorMessage = error.response?.data?.message || "Request failed";
                throw new Error(errorMessage);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const apiService = (baseURL: string) => {
    const api = createAxiosInstance(baseURL);

    return {
        get: async <T>(
            url: string,
            params = {},
            headers = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const res = await api.get(url, { params, headers });
            return transformer(res);
        },

        post: async <T>(
            url: string,
            body = {},
            headers = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const res = await api.post(url, body, { headers });
            return transformer(res);
        },

        put: async <T>(
            url: string,
            body = {},
            headers = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const res = await api.put(url, body, { headers });
            return transformer(res);
        },

        patch: async <T>(
            url: string,
            body = {},
            headers = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const res = await api.patch(url, body, { headers });
            return transformer(res);
        },

        delete: async <T>(
            url: string,
            params = {},
            headers = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const res = await api.delete(url, { params, headers });
            return transformer(res);
        },

        uploadFile: async <T>(
            url: string,
            file: File,
            fileKey: string = "file",
            additionalData: Record<string, any> = {},
            headers: Record<string, string> = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const formData = new FormData();
            formData.append(fileKey, file);

            Object.keys(additionalData).forEach((key) => {
                formData.append(key, String(additionalData[key]));
            });

            const res = await api.post(url, formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data",
                },
            });

            return transformer(res);
        },

        uploadFileWithPut: async <T>(
            url: string,
            file: File,
            fileKey: string = "file",
            additionalData: Record<string, any> = {},
            headers: Record<string, string> = {},
            transformer: (res: any) => T = transformApiResponse
        ): Promise<T> => {
            const formData = new FormData();
            formData.append(fileKey, file);

            Object.keys(additionalData).forEach((key) => {
                formData.append(key, String(additionalData[key]));
            });

            const res = await api.put(url, formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data",
                },
            });

            return transformer(res);
        },

        // Raw axios methods for custom handling
        raw: {
            get: api.get.bind(api),
            post: api.post.bind(api),
            put: api.put.bind(api),
            patch: api.patch.bind(api),
            delete: api.delete.bind(api),
        }
    };
};

export default apiService;
