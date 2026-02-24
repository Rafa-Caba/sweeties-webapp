import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { mapDbThemeToStyled } from "../utils/themeMapper";
import { useAuthStore } from "../store/admin/useAuthStore";
import { getAllThemes } from "../services/public/themes";
import type { ThemeDefinition } from "../types/admin/theme";

type ThemeName = "light" | "dark";

interface ThemeContextType {
    themeName: ThemeName;
    isDark: boolean;
    toggleTheme: () => void;

    currentTheme: ThemeDefinition | null;
    availableThemes: ThemeDefinition[];

    setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemeContext error");
    return context;
};

const FALLBACK_THEME_DEFINITION: ThemeDefinition = {
    id: "fallback",
    name: "Loading",
    isDark: false,

    primaryColor: null,
    accentColor: null,
    backgroundColor: null,
    textColor: null,
    cardColor: null,
    buttonColor: null,
    navColor: null,
};

function ensureString(v: unknown, fallback: string): string {
    return typeof v === "string" && v.trim().length > 0 ? v : fallback;
}

function normalizeStyledTheme(input: any): any {
    // This guarantees StyledThemeProvider receives strings (not null) in colors.
    // We keep other properties as-is.
    const colors = input?.colors ?? {};

    return {
        ...input,
        isDark: Boolean(input?.isDark),
        id: ensureString(input?.id, "theme"),
        name: ensureString(input?.name, "Theme"),
        colors: {
            ...colors,
            primary: ensureString(colors?.primary, "#673ab7"),
            accent: ensureString(colors?.accent, "#ff7aa2"),
            background: ensureString(colors?.background, "#ffffff"),
            text: ensureString(colors?.text, "#111111"),
            card: ensureString(colors?.card, "#ffffff"),
            button: ensureString(colors?.button, "#673ab7"),
            buttonHover: ensureString(colors?.buttonHover, "#5a31a6"),

            // If your DefaultTheme includes these, keep them non-empty:
            navBg: ensureString(colors?.navBg, ensureString(colors?.background, "#ffffff")),
            pageBg: ensureString(colors?.pageBg, ensureString(colors?.background, "#ffffff")),

            border: ensureString(colors?.border, "rgba(0,0,0,0.10)"),

            waveTop: ensureString(colors?.waveTop, "rgba(103, 58, 183, 0.10)"),
            waveBottom: ensureString(colors?.waveBottom, "rgba(103, 58, 183, 0.06)"),

            mainTitle: ensureString(colors?.mainTitle, ensureString(colors?.text, "#111111")),
            mainSubtitle: ensureString(colors?.mainSubtitle, "rgba(0,0,0,0.65)"),
            creatorName: ensureString(colors?.creatorName, "rgba(0,0,0,0.75)"),

            textMuted: ensureString(colors?.textMuted, "rgba(0,0,0,0.60)"),
            textSecondary: ensureString(colors?.textSecondary, "rgba(0,0,0,0.70)"),
        },
    };
}

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [themes, setThemes] = useState<ThemeDefinition[]>([]);
    const [activeThemeId, setActiveThemeId] = useState<string | null>(null);
    const { user } = useAuthStore();

    // 1) Fetch Themes
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAllThemes();
                setThemes(Array.isArray(data) ? data : []);

                const storedId = localStorage.getItem("sweeties-theme-id"); // should be string theme id
                let targetId: string | null = data?.length ? data[0].id : null;

                // User preference (Mongo id string)
                if (user?.themeId) {
                    const exists = data.find((t) => t.id === user.themeId);
                    if (exists) targetId = user.themeId;
                } else if (storedId) {
                    const exists = data.find((t) => t.id === storedId);
                    if (exists) targetId = storedId;
                }

                setActiveThemeId(targetId);
            } catch (error) {
                console.error("Failed to load themes", error);
                setThemes([]);
                setActiveThemeId(null);
            }
        };

        load();
    }, [user?.themeId]);

    const setThemeById = (id: string) => {
        const nextId = String(id);
        setActiveThemeId(nextId);
        localStorage.setItem("sweeties-theme-id", nextId);
    };

    const currentThemeDefinition: ThemeDefinition = useMemo(() => {
        if (!themes.length) return FALLBACK_THEME_DEFINITION;
        const found = themes.find((t) => t.id === activeThemeId);
        return found || themes[0] || FALLBACK_THEME_DEFINITION;
    }, [themes, activeThemeId]);

    const styledTheme = useMemo(() => {
        // Map DB -> Styled Theme, then normalize to avoid nulls
        const mapped = mapDbThemeToStyled(currentThemeDefinition);
        return normalizeStyledTheme(mapped);
    }, [currentThemeDefinition]);

    const toggleTheme = () => {
        if (!themes.length) return;

        // Find the specific target themes by name
        const lightTheme = themes.find((t) => t.name === "Clásico");
        const darkTheme = themes.find((t) => t.name === "Noche");

        if (!lightTheme || !darkTheme) {
            console.warn("Could not find 'Clásico' or 'Noche' themes in DB");
            return;
        }

        if (activeThemeId === darkTheme.id) {
            setThemeById(lightTheme.id);
        } else {
            setThemeById(darkTheme.id);
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                themeName: styledTheme.isDark ? "dark" : "light",
                isDark: styledTheme.isDark,
                toggleTheme,
                currentTheme: currentThemeDefinition,
                availableThemes: themes,
                setThemeById,
            }}
        >
            <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};