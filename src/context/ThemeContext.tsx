// import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// import { theme as defaultTheme, darkTheme } from '../theme';

// type ThemeType = 'light' | 'dark';

// interface ThemeContextType {
//     themeName: ThemeType;
//     toggleTheme: () => void;
//     isDark: boolean;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useThemeContext = () => {
//     const context = useContext(ThemeContext);
//     if (!context) throw new Error('useThemeContext must be used within a ThemeProvider');
//     return context;
// };

// interface Props {
//     children: ReactNode;
// }

// export const ThemeContextProvider = ({ children }: Props) => {
//     const [themeName, setThemeName] = useState<ThemeType>('light');

//     useEffect(() => {
//         const stored = localStorage.getItem('sweeties-theme');
//         if (stored === 'dark' || stored === 'light') {
//             setThemeName(stored);
//         }
//     }, []);

//     const toggleTheme = () => {
//         setThemeName((prev) => {
//             const newTheme = prev === 'light' ? 'dark' : 'light';
//             localStorage.setItem('sweeties-theme', newTheme);
//             return newTheme;
//         });
//     };

//     const isDark = themeName === 'dark';
//     const currentTheme = isDark ? darkTheme : defaultTheme;

//     return (
//         <ThemeContext.Provider value={{ themeName, toggleTheme, isDark }}>
//             <StyledThemeProvider theme={currentTheme}>
//                 {children}
//             </StyledThemeProvider>
//         </ThemeContext.Provider>
//     );
// };


import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { mapDbThemeToStyled } from '../utils/themeMapper';
import { useAuthStore } from '../store/admin/useAuthStore';
import { getAllThemes } from '../services/public/themes';
import type { ThemeDefinition } from '../types/admin/theme';

interface ThemeContextType {
    themeName: 'light' | 'dark';
    isDark: boolean;
    toggleTheme: () => void;
    currentTheme: ThemeDefinition | null;
    availableThemes: ThemeDefinition[];
    setThemeById: (id: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeContext error');
    return context;
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [themes, setThemes] = useState<ThemeDefinition[]>([]);
    const [activeThemeId, setActiveThemeId] = useState<number | null>(null);
    const { user } = useAuthStore();

    // 1. Fetch Themes
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAllThemes();
                setThemes(data);

                // Determine initial theme
                const storedId = localStorage.getItem('sweeties-theme-id');
                let targetId = data.length > 0 ? data[0].id : null; // Default to first

                if (user?.themeId) {
                    // If user has a saved preference, confirm it exists in the list
                    const exists = data.find(t => t.id === user.themeId);
                    if (exists) targetId = user.themeId;
                } else if (storedId) {
                    const exists = data.find(t => t.id === Number(storedId));
                    if (exists) targetId = Number(storedId);
                }

                setActiveThemeId(targetId);
            } catch (error) {
                console.error("Failed to load themes", error);
            }
        };
        load();
    }, [user?.themeId]); // Dependency on user.themeId ensures update on login

    const handleSetTheme = (id: number) => {
        setActiveThemeId(id);
        localStorage.setItem('sweeties-theme-id', String(id));
    };

    // 2. Calculate current theme
    // Fallback to a dummy object to prevent crashes
    const currentThemeDefinition = themes.find(t => t.id === activeThemeId) 
                                   || themes[0] 
                                   || { id: 0, name: 'Loading', isDark: false } as ThemeDefinition;

    const styledTheme = mapDbThemeToStyled(currentThemeDefinition);

    // 3. Explicit Toggle Logic
    const toggleTheme = () => {
        if (!themes.length) return;

        // Find the specific target themes by Name
        const lightTheme = themes.find(t => t.name === 'Clásico');
        const darkTheme = themes.find(t => t.name === 'Noche');

        if (!lightTheme || !darkTheme) {
            console.warn("Could not find 'Clásico' or 'Noche' themes in DB");
            return;
        }

        // LOGIC:
        // If the current Active ID matches the Dark Theme ID, we MUST go to Light.
        // For any other case (Clásico, Dulce, etc.), we go to Dark.
        if (activeThemeId === darkTheme.id) {
            handleSetTheme(lightTheme.id);
        } else {
            handleSetTheme(darkTheme.id);
        }
    };

    return (
        <ThemeContext.Provider value={{ 
            themeName: styledTheme.isDark ? 'dark' : 'light',
            isDark: styledTheme.isDark,
            toggleTheme,
            currentTheme: currentThemeDefinition,
            availableThemes: themes, 
            setThemeById: handleSetTheme 
        }}>
            <StyledThemeProvider theme={styledTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};