import { theme as defaultTheme, darkTheme } from '../theme'; // Import your original objects
import type { ThemeDefinition } from '../types/admin/theme';

export const mapDbThemeToStyled = (dbTheme: ThemeDefinition) => {
    // 1. FORCE "Noche" to match your original Dark Theme exactly
    if (dbTheme.name === 'Noche') {
        return {
            ...darkTheme, // Use the exact original object
            isDark: true,
            id: dbTheme.id, // Keep the DB ID for logic
            name: dbTheme.name
        };
    }

    // 2. FORCE "Clásico" to match your original Default Theme exactly
    if (dbTheme.name === 'Clásico') {
        return {
            ...defaultTheme,
            id: dbTheme.id,
            name: dbTheme.name
        };
    }

    // 3. For custom themes (like "Dulce"), use dynamic mapping
    const isDark = dbTheme.isDark;
    const base = isDark ? darkTheme : defaultTheme;

    return {
        ...base,
        isDark: isDark,
        colors: {
            ...base.colors,
            primary: dbTheme.primaryColor,
            accent: dbTheme.accentColor,
            background: dbTheme.backgroundColor,
            text: dbTheme.textColor,
            card: dbTheme.cardColor,
            button: dbTheme.buttonColor,
            navBg: dbTheme.navColor || base.colors.navBg,
            
            // Recalculate gradients for custom themes
            pageBg: isDark 
                ? `linear-gradient(180deg, ${dbTheme.backgroundColor} 0%, #241B33 100%)` 
                : `linear-gradient(180deg, ${dbTheme.backgroundColor} 0%, #F4EEFF 100%)`,
        }
    };
};