// Color Palette Constants for the entire application
export const COLORS = {
    // Primary Brand Colors (Teal/Green Theme)
    primary: {
        navy: "#0A3828",        // Very dark teal - main brand color
        orange: "#198C64",      // Primary teal - accent color
        slate: "#75BAA2",       // Medium teal - secondary text
        "off-white": "#F0F7F5", // Very light teal background
        success: "#198C64",     // Primary teal for success
    },

    // Extended Color Palette
    brand: {
        navy: "#0A3828",        // Very dark teal
        accent: "#198C64",      // Primary teal
        slate: "#75BAA2",       // Medium teal
        "off-white": "#F0F7F5", // Very light teal
        success: "#198C64",     // Primary teal
    },

    // Semantic Colors (Teal/Green Theme)
    semantic: {
        success: {
            50: "#f0f7f5",   // Very light teal
            100: "#d1e8e0",  // Light teal
            200: "#a3d1c1",  // Medium light teal
            300: "#75baa2",  // Medium teal
            400: "#47a383",  // Medium dark teal
            500: "#198c64",  // Primary teal
            600: "#147050",  // Dark teal
            700: "#0f543c",  // Darker teal
            800: "#0a3828",  // Very dark teal
            900: "#051c14",  // Darkest teal
        },
        warning: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
        },
        error: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d",
        },
        info: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
        },
    },

    // Neutral Colors
    neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
    },

    // Background Colors (Teal Theme)
    background: {
        primary: "#ffffff",
        secondary: "#f0f7f5",    // Very light teal
        tertiary: "#d1e8e0",     // Light teal
        dark: "#0A3828",         // Very dark teal
        "dark-secondary": "#0f543c", // Darker teal
    },

    // Text Colors (Teal Theme)
    text: {
        primary: "#051c14",      // Darkest teal
        secondary: "#0f543c",    // Darker teal
        tertiary: "#147050",     // Dark teal
        muted: "#75baa2",        // Medium teal
        inverse: "#ffffff",
        "inverse-muted": "#f0f7f5", // Very light teal
    },

    // Border Colors (Teal Theme)
    border: {
        light: "#d1e8e0",        // Light teal
        medium: "#a3d1c1",       // Medium light teal
        dark: "#75baa2",         // Medium teal
        accent: "#198C64",       // Primary teal
    },

    // Gradient Colors (Teal Theme)
    gradients: {
        primary: "from-teal-600 to-emerald-600",
        secondary: "from-teal-50 via-white to-emerald-50",
        accent: "from-teal-500 to-emerald-500",
        success: "from-teal-500 to-emerald-500",
        warning: "from-amber-500 to-orange-500",
        error: "from-red-500 to-pink-500",
    },

    // Status Colors
    status: {
        online: "#10b981",
        offline: "#6b7280",
        busy: "#f59e0b",
        away: "#f97316",
    },

    // Chart Colors (Teal Theme)
    chart: {
        primary: "#198c64",      // Primary teal
        secondary: "#75baa2",    // Medium teal
        tertiary: "#a3d1c1",     // Medium light teal
        quaternary: "#47a383",   // Medium dark teal
        quinary: "#147050",      // Dark teal
    },
} as const;

// Color utility functions
export const getColor = (path: string): string => {
    const keys = path.split('.');
    let current: any = COLORS;

    for (const key of keys) {
        if (current[key] === undefined) {
            console.warn(`Color not found: ${path}`);
            return COLORS.neutral[500]; // fallback
        }
        current = current[key];
    }

    return current;
};

// Semantic color getters
export const getSuccessColor = (shade: keyof typeof COLORS.semantic.success = '600') =>
    COLORS.semantic.success[shade];

export const getWarningColor = (shade: keyof typeof COLORS.semantic.warning = '600') =>
    COLORS.semantic.warning[shade];

export const getErrorColor = (shade: keyof typeof COLORS.semantic.error = '600') =>
    COLORS.semantic.error[shade];

export const getInfoColor = (shade: keyof typeof COLORS.semantic.info = '600') =>
    COLORS.semantic.info[shade];

// Theme-aware color getters
export const getThemeColor = (light: string, dark: string, isDark: boolean = false) =>
    isDark ? dark : light;

// Export individual color groups for convenience
export const { primary, brand, semantic, neutral, background, text, border, gradients, status, chart } = COLORS;
