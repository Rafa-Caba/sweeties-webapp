import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme as defaultTheme, darkTheme } from '../theme';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    themeName: ThemeType;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeContext must be used within a ThemeProvider');
    return context;
};

interface Props {
    children: ReactNode;
}

export const ThemeContextProvider = ({ children }: Props) => {
    const [themeName, setThemeName] = useState<ThemeType>('light');

    useEffect(() => {
        const stored = localStorage.getItem('sweeties-theme');
        if (stored === 'dark' || stored === 'light') {
            setThemeName(stored);
        }
    }, []);

    const toggleTheme = () => {
        setThemeName((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('sweeties-theme', newTheme);
            return newTheme;
        });
    };

    const isDark = themeName === 'dark';
    const currentTheme = isDark ? darkTheme : defaultTheme;

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme, isDark }}>
            <StyledThemeProvider theme={currentTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
