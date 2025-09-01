// Color Classes for Tailwind CSS - Consistent color usage throughout the application
export const COLOR_CLASSES = {
    // Background Colors (Teal Theme)
    background: {
        primary: "bg-white dark:bg-primary-navy",
        secondary: "bg-primary-off-white dark:bg-primary-navy",
        tertiary: "bg-gray-50 dark:bg-primary-navy",
        dark: "bg-primary-navy",
        "dark-secondary": "bg-primary-navy",
        card: "bg-white dark:bg-primary-navy",
        overlay: "bg-black/50 dark:bg-black/70",
    },

    // Text Colors (Teal Theme)
    text: {
        primary: "text-primary-navy dark:text-white",
        secondary: "text-teal-700 dark:text-teal-200",
        tertiary: "text-teal-600 dark:text-teal-300",
        muted: "text-teal-500 dark:text-teal-400",
        inverse: "text-white dark:text-primary-navy",
        "inverse-muted": "text-teal-100 dark:text-teal-600",
        accent: "text-primary-orange",
        success: "text-semantic-success-600 dark:text-semantic-success-400",
        warning: "text-semantic-warning-600 dark:text-semantic-warning-400",
        error: "text-semantic-error-600 dark:text-semantic-error-400",
        info: "text-semantic-info-600 dark:text-semantic-info-400",
    },

    // Border Colors (Teal Theme)
    border: {
        light: "border-teal-200 dark:border-teal-700",
        medium: "border-teal-300 dark:border-teal-600",
        dark: "border-teal-400 dark:border-teal-500",
        accent: "border-primary-orange",
        success: "border-semantic-success-300 dark:border-semantic-success-600",
        warning: "border-semantic-warning-300 dark:border-semantic-warning-600",
        error: "border-semantic-error-300 dark:border-semantic-error-600",
        info: "border-semantic-info-300 dark:border-semantic-info-600",
    },

    // Focus Ring Colors (Teal Theme)
    ring: {
        primary: "focus:ring-teal-500 focus:ring-opacity-50",
        success: "focus:ring-semantic-success-500 focus:ring-opacity-50",
        warning: "focus:ring-semantic-warning-500 focus:ring-opacity-50",
        error: "focus:ring-semantic-error-500 focus:ring-opacity-50",
        info: "focus:ring-semantic-info-500 focus:ring-opacity-50",
    },

    // Button Colors (Teal Theme)
    button: {
        primary: "bg-primary-orange hover:bg-teal-700 text-white focus:ring-primary-orange",
        secondary: "bg-teal-100 hover:bg-teal-200 dark:bg-teal-700 dark:hover:bg-teal-600 text-teal-700 dark:text-teal-300",
        success: "bg-semantic-success-600 hover:bg-semantic-success-700 text-white focus:ring-semantic-success-500",
        warning: "bg-semantic-warning-600 hover:bg-semantic-warning-700 text-white focus:ring-semantic-warning-500",
        error: "bg-semantic-error-600 hover:bg-semantic-error-700 text-white focus:ring-semantic-error-500",
        info: "bg-semantic-info-600 hover:bg-semantic-info-700 text-white focus:ring-semantic-info-500",
        outline: "border border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-700",
        ghost: "text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-700",
    },

    // Form Input Colors (Teal Theme)
    input: {
        default: "border-teal-300 dark:border-teal-600 focus:border-teal-500 focus:ring-teal-500",
        success: "border-semantic-success-300 dark:border-semantic-success-600 focus:border-semantic-success-500 focus:ring-semantic-success-500",
        error: "border-semantic-error-300 dark:border-semantic-error-600 focus:border-semantic-error-500 focus:ring-semantic-error-500",
        warning: "border-semantic-warning-300 dark:border-semantic-warning-600 focus:border-semantic-warning-500 focus:ring-semantic-warning-500",
    },

    // Status Colors
    status: {
        online: "bg-semantic-success-500",
        offline: "bg-gray-500",
        busy: "bg-semantic-warning-500",
        away: "bg-orange-500",
    },

    // Chart Colors
    chart: {
        primary: "bg-semantic-info-500",
        secondary: "bg-semantic-success-500",
        tertiary: "bg-semantic-warning-500",
        quaternary: "bg-purple-500",
        quinary: "bg-semantic-error-500",
    },

    // Alert Colors
    alert: {
        success: "bg-semantic-success-50 dark:bg-semantic-success-900/20 border-semantic-success-200 dark:border-semantic-success-700 text-semantic-success-800 dark:text-semantic-success-200",
        warning: "bg-semantic-warning-50 dark:bg-semantic-warning-900/20 border-semantic-warning-200 dark:border-semantic-warning-700 text-semantic-warning-800 dark:text-semantic-warning-200",
        error: "bg-semantic-error-50 dark:bg-semantic-error-900/20 border-semantic-error-200 dark:border-semantic-error-700 text-semantic-error-800 dark:text-semantic-error-200",
        info: "bg-semantic-info-50 dark:bg-semantic-info-900/20 border-semantic-info-200 dark:border-semantic-info-700 text-semantic-info-800 dark:text-semantic-info-200",
    },

    // Badge Colors (Teal Theme)
    badge: {
        primary: "bg-teal-500/10 text-teal-600 border-teal-500/20",
        success: "bg-semantic-success-100 dark:bg-semantic-success-900/30 text-semantic-success-700 dark:text-semantic-success-300 border-semantic-success-200 dark:border-semantic-success-700",
        warning: "bg-semantic-warning-100 dark:bg-semantic-warning-900/30 text-semantic-warning-700 dark:text-semantic-warning-300 border-semantic-warning-200 dark:border-semantic-warning-700",
        error: "bg-semantic-error-100 dark:bg-semantic-error-900/30 text-semantic-error-700 dark:text-semantic-error-300 border-semantic-error-200 dark:border-semantic-error-700",
        info: "bg-semantic-info-100 dark:bg-semantic-info-900/30 text-semantic-info-700 dark:text-semantic-info-300 border-semantic-info-200 dark:border-semantic-info-700",
    },

    // Hover States (Teal Theme)
    hover: {
        primary: "hover:bg-teal-500/10 dark:hover:bg-teal-500/20",
        secondary: "hover:bg-teal-100 dark:hover:bg-teal-700",
        success: "hover:bg-semantic-success-50 dark:hover:bg-semantic-success-900/20",
        warning: "hover:bg-semantic-warning-50 dark:hover:bg-semantic-warning-900/20",
        error: "hover:bg-semantic-error-50 dark:hover:bg-semantic-error-900/20",
        info: "hover:bg-semantic-info-50 dark:hover:bg-semantic-info-900/20",
    },

    // Transitions
    transition: "transition-all duration-200 ease-in-out",
    "transition-colors": "transition-colors duration-200 ease-in-out",
    "transition-transform": "transition-transform duration-200 ease-in-out",
    "transition-opacity": "transition-opacity duration-200 ease-in-out",

    // Shadows
    shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
        inner: "shadow-inner",
        none: "shadow-none",
    },

    // Gradients (Teal Theme)
    gradient: {
        primary: "bg-gradient-to-r from-teal-600 to-emerald-600",
        secondary: "bg-gradient-to-br from-teal-50 via-white to-emerald-50",
        accent: "bg-gradient-to-r from-teal-500 to-emerald-500",
        success: "bg-gradient-to-r from-semantic-success-500 to-emerald-500",
        warning: "bg-gradient-to-r from-semantic-warning-500 to-orange-500",
        error: "bg-gradient-to-r from-semantic-error-500 to-pink-500",
    },
} as const;

// Utility function to combine color classes
export const combineColors = (...classes: string[]): string => {
    return classes.filter(Boolean).join(" ");
};

// Common color combinations
export const COMMON_COMBINATIONS = {
    card: combineColors(
        COLOR_CLASSES.background.card,
        COLOR_CLASSES.border.light,
        COLOR_CLASSES.shadow.md
    ),
    buttonPrimary: combineColors(
        COLOR_CLASSES.button.primary,
        COLOR_CLASSES.transition,
        "font-medium px-4 py-2 rounded-lg"
    ),
    buttonSecondary: combineColors(
        COLOR_CLASSES.button.secondary,
        COLOR_CLASSES.transition,
        "font-medium px-4 py-2 rounded-lg"
    ),
    inputDefault: combineColors(
        COLOR_CLASSES.input.default,
        COLOR_CLASSES.transition,
        "px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
    ),
    textHeading: combineColors(
        COLOR_CLASSES.text.primary,
        "font-bold"
    ),
    textBody: combineColors(
        COLOR_CLASSES.text.secondary,
        "leading-relaxed"
    ),
} as const;

// Export for convenience
export default COLOR_CLASSES;
