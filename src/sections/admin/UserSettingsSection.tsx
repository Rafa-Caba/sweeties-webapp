import styled from "styled-components";

import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuthStore } from "../../store/admin/useAuthStore";
import { SectionBody, SectionHeader } from "../../styles/admin/DashboardStyles";
import { FormSection, SectionTitle, SettingsWrapper } from "../../styles/admin/SettingsStyles";

const ThemeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
`;

const ThemeCard = styled.div<{ $active: boolean; $bgColor: string; $textColor: string }>`
    padding: 1.5rem;
    border-radius: 12px;
    background-color: ${({ $bgColor }) => $bgColor};
    color: ${({ $textColor }) => $textColor};
    border: 3px solid ${({ $active, theme }) => ($active ? theme.colors.accent : "transparent")};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-3px);
    }

    h4 {
        margin-bottom: 0.5rem;
    }
    span {
        font-size: 0.8rem;
        opacity: 0.8;
    }
`;

function toColor(v: string | null | undefined, fallback: string): string {
    return typeof v === "string" && v.trim().length > 0 ? v : fallback;
}

export const UserSettingsSection = () => {
    const { availableThemes, currentTheme, setThemeById } = useThemeContext();
    const { user, updateUserTheme } = useAuthStore();

    const handleSelect = async (themeId: string) => {
        const id = String(themeId);

        // 1) Update UI instantly
        setThemeById(id);

        // 2) Persist to DB if logged in
        if (user) {
            await updateUserTheme(id);
        }
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Configuración</h1>
                    <p>Personaliza tu experiencia en el panel admin.</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <SettingsWrapper>
                    <FormSection>
                        <SectionTitle>Apariencia</SectionTitle>
                        <p>Selecciona un tema para personalizar tu experiencia.</p>

                        <ThemeGrid>
                            {availableThemes.map((theme) => {
                                const bg = toColor(theme.backgroundColor, "#ffffff");
                                const text = toColor(theme.textColor, "#111111");
                                const primary = toColor(theme.primaryColor, "#673ab7");

                                return (
                                    <ThemeCard
                                        key={theme.id}
                                        $active={currentTheme?.id === theme.id}
                                        $bgColor={bg}
                                        $textColor={text}
                                        onClick={() => handleSelect(theme.id)}
                                        role="button"
                                    >
                                        <h4>{theme.name}</h4>
                                        <span>{theme.isDark ? "Oscuro" : "Claro"}</span>

                                        <div
                                            style={{
                                                marginTop: "10px",
                                                height: "10px",
                                                width: "100%",
                                                background: primary,
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </ThemeCard>
                                );
                            })}
                        </ThemeGrid>
                    </FormSection>
                </SettingsWrapper>
            </SectionBody>
        </AdminLayout>
    );
};