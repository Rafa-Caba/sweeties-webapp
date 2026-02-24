import { useEffect, useState } from "react";
import { useSettingsStore } from "../../store/admin/useSettingsStore";
import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { SectionHeader } from "../../styles/admin/DashboardStyles";
import {
    SettingsWrapper,
    TabsContainer,
    TabButton,
    FormSection,
    SectionTitle,
    GridTwo,
    ToggleWrapper,
    ToggleSwitch,
    EditModeHeader,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextarea,
    ImagePreview,
    UploadLabel,
    ImageLabeContainer,
} from "../../styles/admin/SettingsStyles";
import { SubmitButton } from "../../styles/admin/ProfileStyles";
import { showSuccessToast, showErrorToast } from "../../utils/showToast";
import type { AdminSettings } from "../../types/admin/settings";

// Define tabs
type Tab = "general" | "branding" | "contact" | "about" | "features" | "seo" | "social";

// --- HELPER COMPONENTS ---

interface InputFieldProps {
    label: string;
    value: string | number | null | undefined;
    onChange: (val: string) => void;
    type?: string;
    disabled: boolean;
}

const InputField = ({ label, value, onChange, type = "text", disabled }: InputFieldProps) => (
    <FormGroup>
        <FormLabel>{label}</FormLabel>
        <FormInput
            type={type}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            style={{ opacity: disabled ? 0.7 : 1, cursor: disabled ? "default" : "text" }}
            autoComplete="off"
        />
    </FormGroup>
);

interface ToggleFieldProps {
    label: string;
    checked: boolean;
    onChange: (val: boolean) => void;
    disabled: boolean;
}

const ToggleField = ({ label, checked, onChange, disabled }: ToggleFieldProps) => (
    <ToggleWrapper onClick={() => !disabled && onChange(!checked)}>
        <ToggleSwitch $checked={checked} $disabled={disabled} />
        <span style={{ fontWeight: 500 }}>{label}</span>
    </ToggleWrapper>
);

function sanitizeSettingsForBackend(input: AdminSettings): AdminSettings {
    // Backend currently expects strings for these paths (not null).
    // Convert null -> "" so Zod validation passes.
    return {
        ...input,
        about: {
            ...input.about,
            bio: input.about?.bio ?? "",
        },
        seo: {
            ...input.seo,
            siteDescription: input.seo?.siteDescription ?? "",
        },
    };
}

// --- MAIN COMPONENT ---

export const SettingsSection = () => {
    const { settings, fetchSettings, saveSettings, loading } = useSettingsStore();

    const [activeTab, setActiveTab] = useState<Tab>("general");
    const [isEditing, setIsEditing] = useState(false);

    // Local state for form data
    const [formData, setFormData] = useState<AdminSettings | null>(null);

    // Files state
    const [files, setFiles] = useState<{
        logoLight?: File;
        logoDark?: File;
        favicon?: File;
        ogImage?: File;
        aboutImage?: File;
    }>({});

    // Previews state
    const [previews, setPreviews] = useState<{
        logoLight?: string | null;
        logoDark?: string | null;
        favicon?: string | null;
        ogImage?: string | null;
        aboutImage?: string | null;
    }>({});

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    useEffect(() => {
        if (settings) {
            setFormData(JSON.parse(JSON.stringify(settings)) as AdminSettings);
            setPreviews({
                logoLight: settings.logoLightUrl,
                logoDark: settings.logoDarkUrl,
                favicon: settings.faviconUrl,
                ogImage: settings.seo?.ogImageUrl ?? null,
                aboutImage: settings.about?.imageUrl ?? null,
            });
        }
    }, [settings]);

    const handleChange = (field: keyof AdminSettings, value: any) => {
        if (!formData) return;
        setFormData((prev) => ({ ...prev!, [field]: value }));
    };

    const handleNestedChange = (parent: keyof AdminSettings, field: string, value: any) => {
        if (!formData) return;
        setFormData((prev) => ({
            ...prev!,
            [parent]: {
                ...(prev![parent] as object),
                [field]: value,
            },
        }));
    };

    const handleFileChange = (key: keyof typeof files, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles((prev) => ({ ...prev, [key]: file }));

            const reader = new FileReader();
            reader.onload = () => setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        const sanitized = sanitizeSettingsForBackend(formData);

        const data = new FormData();
        // Send settings as TEXT (not Blob) to avoid multer/cloudinary issues
        data.append("settings", JSON.stringify(sanitized));

        if (files.logoLight) data.append("logoLight", files.logoLight);
        if (files.logoDark) data.append("logoDark", files.logoDark);
        if (files.favicon) data.append("favicon", files.favicon);
        if (files.ogImage) data.append("ogImage", files.ogImage);
        if (files.aboutImage) data.append("aboutImage", files.aboutImage);

        const success = await saveSettings(data);
        if (success) {
            showSuccessToast("Configuración guardada correctamente");
            setIsEditing(false);
            setFiles({});
        } else {
            showErrorToast("Error al guardar configuración");
        }
    };

    if (!formData) return <AdminLayout>Cargando...</AdminLayout>;

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Configuración</h1>
                    <p>Administra las opciones generales del sitio.</p>
                </div>
            </SectionHeader>

            <SettingsWrapper>
                <EditModeHeader>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.2rem" }}>🛠</span>
                        <strong>Modo Edición</strong>
                        <span style={{ color: "#888", fontSize: "0.9rem" }}>
                            {isEditing ? "(Puedes modificar los campos)" : "(Solo lectura)"}
                        </span>
                    </div>
                    <ToggleWrapper onClick={() => setIsEditing(!isEditing)} style={{ marginBottom: 0 }}>
                        <ToggleSwitch $checked={isEditing} />
                    </ToggleWrapper>
                </EditModeHeader>

                <TabsContainer>
                    <TabButton $active={activeTab === "general"} onClick={() => setActiveTab("general")}>
                        General
                    </TabButton>
                    <TabButton $active={activeTab === "branding"} onClick={() => setActiveTab("branding")}>
                        Marca & Logos
                    </TabButton>
                    <TabButton $active={activeTab === "contact"} onClick={() => setActiveTab("contact")}>
                        Contacto
                    </TabButton>
                    <TabButton $active={activeTab === "about"} onClick={() => setActiveTab("about")}>
                        Nosotros (Bio)
                    </TabButton>
                    <TabButton $active={activeTab === "features"} onClick={() => setActiveTab("features")}>
                        Funcionalidades
                    </TabButton>
                    <TabButton $active={activeTab === "social"} onClick={() => setActiveTab("social")}>
                        Redes Sociales
                    </TabButton>
                    <TabButton $active={activeTab === "seo"} onClick={() => setActiveTab("seo")}>
                        SEO
                    </TabButton>
                </TabsContainer>

                <form onSubmit={handleSubmit}>
                    {activeTab === "general" && (
                        <FormSection>
                            <SectionTitle>Información Básica</SectionTitle>
                            <InputField
                                label="Nombre del Sitio"
                                value={formData.siteName}
                                onChange={(v: string) => handleChange("siteName", v)}
                                disabled={!isEditing}
                            />
                            <InputField
                                label="Slogan / Tagline"
                                value={formData.siteTagline ?? ""}
                                onChange={(v: string) => handleChange("siteTagline", v)}
                                disabled={!isEditing}
                            />

                            <SectionTitle>Home Page Copy</SectionTitle>
                            <InputField
                                label="Título Hero"
                                value={formData.home.heroTitle ?? ""}
                                onChange={(v: string) => handleNestedChange("home", "heroTitle", v)}
                                disabled={!isEditing}
                            />
                            <InputField
                                label="Subtítulo Hero"
                                value={formData.home.heroSubtitle ?? ""}
                                onChange={(v: string) => handleNestedChange("home", "heroSubtitle", v)}
                                disabled={!isEditing}
                            />
                            <InputField
                                label="Creador"
                                value={formData.home.creatorName ?? ""}
                                onChange={(v: string) => handleNestedChange("home", "creatorName", v)}
                                disabled={!isEditing}
                            />

                            <SectionTitle>Footer</SectionTitle>
                            <InputField
                                label="Texto Legal"
                                value={formData.footer.legalText ?? ""}
                                onChange={(v: string) => handleNestedChange("footer", "legalText", v)}
                                disabled={!isEditing}
                            />
                        </FormSection>
                    )}

                    {activeTab === "branding" && (
                        <FormSection>
                            <SectionTitle>Logos e Imágenes</SectionTitle>
                            <GridTwo>
                                <ImageLabeContainer>
                                    <FormLabel>Logo Claro (Navbar oscura)</FormLabel>
                                    {previews.logoLight && (
                                        <ImagePreview
                                            src={previews.logoLight}
                                            alt="Logo Light"
                                            style={{ backgroundColor: "#333", padding: "10px" }}
                                        />
                                    )}
                                    {isEditing && (
                                        <>
                                            <UploadLabel htmlFor="logoLight">Cambiar</UploadLabel>
                                            <input
                                                id="logoLight"
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleFileChange("logoLight", e)}
                                            />
                                        </>
                                    )}
                                </ImageLabeContainer>

                                <ImageLabeContainer>
                                    <FormLabel>Logo Oscuro (Navbar clara)</FormLabel>
                                    {previews.logoDark && <ImagePreview src={previews.logoDark} alt="Logo Dark" />}
                                    {isEditing && (
                                        <>
                                            <UploadLabel htmlFor="logoDark">Cambiar</UploadLabel>
                                            <input
                                                id="logoDark"
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleFileChange("logoDark", e)}
                                            />
                                        </>
                                    )}
                                </ImageLabeContainer>
                            </GridTwo>
                        </FormSection>
                    )}

                    {activeTab === "contact" && (
                        <FormSection>
                            <SectionTitle>Información de Contacto</SectionTitle>
                            <GridTwo>
                                <InputField
                                    label="Email"
                                    type="email"
                                    value={formData.contactEmail ?? ""}
                                    onChange={(v: string) => handleChange("contactEmail", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="Teléfono"
                                    value={formData.contactPhone ?? ""}
                                    onChange={(v: string) => handleChange("contactPhone", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="WhatsApp"
                                    value={formData.contactWhatsApp ?? ""}
                                    onChange={(v: string) => handleChange("contactWhatsApp", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="Dirección"
                                    value={formData.contactAddress ?? ""}
                                    onChange={(v: string) => handleChange("contactAddress", v)}
                                    disabled={!isEditing}
                                />
                            </GridTwo>

                            <SectionTitle style={{ marginTop: "2rem" }}>Visibilidad (Mostrar en sitio)</SectionTitle>
                            <GridTwo>
                                <ToggleField
                                    label="Mostrar Email"
                                    checked={formData.visibility.showEmail}
                                    onChange={(v: boolean) => handleNestedChange("visibility", "showEmail", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Mostrar Teléfono"
                                    checked={formData.visibility.showPhone}
                                    onChange={(v: boolean) => handleNestedChange("visibility", "showPhone", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Mostrar WhatsApp"
                                    checked={formData.visibility.showWhatsApp}
                                    onChange={(v: boolean) => handleNestedChange("visibility", "showWhatsApp", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Mostrar Dirección"
                                    checked={formData.visibility.showAddress}
                                    onChange={(v: boolean) => handleNestedChange("visibility", "showAddress", v)}
                                    disabled={!isEditing}
                                />
                            </GridTwo>
                        </FormSection>
                    )}

                    {activeTab === "about" && (
                        <FormSection>
                            <SectionTitle>Página "Conócenos"</SectionTitle>
                            <FormGroup>
                                <FormLabel>Biografía del Creador(a)</FormLabel>
                                <FormTextarea
                                    value={formData.about?.bio || ""}
                                    onChange={(e) => handleNestedChange("about", "bio", e.target.value)}
                                    disabled={!isEditing}
                                    style={{ minHeight: "200px", opacity: !isEditing ? 0.7 : 1 }}
                                />
                            </FormGroup>

                            <ImageLabeContainer style={{ marginTop: "1rem" }}>
                                <FormLabel>Foto del Creador(a)</FormLabel>
                                {previews.aboutImage && <ImagePreview src={previews.aboutImage} alt="Creator" />}
                                {isEditing && (
                                    <>
                                        <UploadLabel htmlFor="aboutImage">Cambiar Foto</UploadLabel>
                                        <input
                                            id="aboutImage"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange("aboutImage", e)}
                                        />
                                    </>
                                )}
                            </ImageLabeContainer>
                        </FormSection>
                    )}

                    {activeTab === "features" && (
                        <FormSection>
                            <SectionTitle>Activar / Desactivar Módulos</SectionTitle>
                            <GridTwo>
                                <ToggleField
                                    label="Habilitar Órdenes"
                                    checked={formData.features.enableOrders}
                                    onChange={(v: boolean) => handleNestedChange("features", "enableOrders", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Habilitar Carrito"
                                    checked={formData.features.enableCart}
                                    onChange={(v: boolean) => handleNestedChange("features", "enableCart", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Habilitar Galería Pública"
                                    checked={formData.features.enableGallery}
                                    onChange={(v: boolean) => handleNestedChange("features", "enableGallery", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Habilitar Materiales"
                                    checked={formData.features.enableMaterials}
                                    onChange={(v: boolean) => handleNestedChange("features", "enableMaterials", v)}
                                    disabled={!isEditing}
                                />
                                <ToggleField
                                    label="Habilitar Página de Contacto"
                                    checked={formData.features.enableContactPage}
                                    onChange={(v: boolean) => handleNestedChange("features", "enableContactPage", v)}
                                    disabled={!isEditing}
                                />
                            </GridTwo>
                        </FormSection>
                    )}

                    {activeTab === "social" && (
                        <FormSection>
                            <SectionTitle>Redes Sociales</SectionTitle>
                            <GridTwo>
                                <InputField
                                    label="Facebook URL"
                                    value={formData.social?.facebook ?? ""}
                                    onChange={(v: string) => handleNestedChange("social", "facebook", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="Instagram URL"
                                    value={formData.social?.instagram ?? ""}
                                    onChange={(v: string) => handleNestedChange("social", "instagram", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="TikTok URL"
                                    value={formData.social?.tiktok ?? ""}
                                    onChange={(v: string) => handleNestedChange("social", "tiktok", v)}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    label="YouTube URL"
                                    value={formData.social?.youtube ?? ""}
                                    onChange={(v: string) => handleNestedChange("social", "youtube", v)}
                                    disabled={!isEditing}
                                />
                            </GridTwo>
                        </FormSection>
                    )}

                    {activeTab === "seo" && (
                        <FormSection>
                            <SectionTitle>Configuración SEO</SectionTitle>
                            <FormGroup>
                                <FormLabel>Descripción del Sitio (Meta Description)</FormLabel>
                                <FormTextarea
                                    value={formData.seo.siteDescription || ""}
                                    onChange={(e) => handleNestedChange("seo", "siteDescription", e.target.value)}
                                    disabled={!isEditing}
                                    style={{ opacity: !isEditing ? 0.7 : 1 }}
                                />
                            </FormGroup>

                            <InputField
                                label="Título Open Graph (Facebook/WhatsApp)"
                                value={formData.seo.ogTitle ?? ""}
                                onChange={(v: string) => handleNestedChange("seo", "ogTitle", v)}
                                disabled={!isEditing}
                            />

                            <ImageLabeContainer style={{ marginTop: "1rem" }}>
                                <FormLabel>Imagen Open Graph</FormLabel>
                                {previews.ogImage && <ImagePreview src={previews.ogImage} alt="OG Image" />}
                                {isEditing && (
                                    <>
                                        <UploadLabel htmlFor="ogImage">Cambiar</UploadLabel>
                                        <input
                                            id="ogImage"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange("ogImage", e)}
                                        />
                                    </>
                                )}
                            </ImageLabeContainer>
                        </FormSection>
                    )}

                    {isEditing && (
                        <div style={{ marginTop: "2rem", textAlign: "right" }}>
                            <SubmitButton type="submit" disabled={loading}>
                                {loading ? "Guardando..." : "Guardar Configuración"}
                            </SubmitButton>
                        </div>
                    )}
                </form>
            </SettingsWrapper>
        </AdminLayout>
    );
};