import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useDarkMode = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            return savedTheme;
        }

        // Default to system preference
        return 'system';
    });

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            let effectiveTheme: 'light' | 'dark';

            if (theme === 'system') {
                effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
                effectiveTheme = theme;
            }

            setIsDark(effectiveTheme === 'dark');

            // Update document class
            if (effectiveTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        updateTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                updateTheme();
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [theme]);

    const setThemeMode = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        setThemeMode(theme === 'dark' ? 'light' : 'dark');
    };

    const isSystem = theme === 'system';

    return {
        theme,
        isDark,
        isSystem,
        setTheme: setThemeMode,
        toggleTheme,
    };
}; 