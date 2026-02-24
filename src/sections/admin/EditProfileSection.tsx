import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { useAuthStore } from "../../store/admin/useAuthStore";
import { SectionBody, SectionHeader } from "../../styles/admin/DashboardStyles";
import { GhostBtn, LoaderCard, LoadingOverlay, Spinner } from "../../styles/admin/ItemsFormStyles";
import {
    ErrorMessage,
    FormGroup,
    FormInput,
    FormLabel,
    FormTextarea,
    ImagePreview,
    ProfileWrapper,
    SubmitButton,
    UploadLabel,
} from "../../styles/admin/ProfileStyles";
import { showErrorToast, showSuccessToast } from "../../utils/showToast";

interface Props {
    onCancel: () => void;
}

export const EditProfileSection = ({ onCancel }: Props) => {
    const { user, updateProfile, loading } = useAuthStore();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        bio: "",
        image: null as File | null,
        imagePreview: "",
    });

    useEffect(() => {
        if (!user) return;

        setFormData({
            name: user.name ?? "",
            username: user.username ?? "",
            email: user.email ?? "",
            password: "",
            bio: user.bio ?? "",
            image: null,
            imagePreview: user.imageUrl ?? "",
        });
    }, [user]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!formData.username.trim()) newErrors.username = "El nombre de usuario es obligatorio.";
        if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: reader.result as string,
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            showErrorToast("Por favor completa todos los campos requeridos.");
            return;
        }

        setSubmitting(true);

        const userDTO = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            bio: formData.bio?.trim() ? formData.bio.trim() : null,
            ...(formData.password ? { password: formData.password } : {}),
        };

        const data = new FormData();
        data.append(
            "user",
            new Blob([JSON.stringify(userDTO)], {
                type: "application/json",
            })
        );

        if (formData.image) {
            data.append("image", formData.image);
        }

        const updatedUser = await updateProfile(data);

        if (updatedUser) {
            showSuccessToast("Perfil actualizado con éxito");
            onCancel();
        }

        setSubmitting(false);
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Editar Perfil</h1>
                    <p>Actualiza tus datos</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <ProfileWrapper onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Nombre</FormLabel>
                        <FormInput name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Usuario</FormLabel>
                        <FormInput name="username" value={formData.username} onChange={handleChange} />
                        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormInput type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormInput type="password" name="password" value={formData.password} onChange={handleChange} />
                        <small>Dejar en blanco para no cambiar la contraseña.</small>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Biografía</FormLabel>
                        <FormTextarea name="bio" value={formData.bio} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "2.5rem",
                            }}
                        >
                            <FormLabel>Imagen de Perfil</FormLabel>
                            {formData.imagePreview && <ImagePreview src={formData.imagePreview} alt="Preview" />}
                            <UploadLabel htmlFor="image">Actualizar Imagen</UploadLabel>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </FormGroup>

                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
                        <GhostBtn type="button" onClick={onCancel}>
                            Cancelar
                        </GhostBtn>
                        <SubmitButton type="submit" disabled={loading || submitting}>
                            {submitting ? "Guardando…" : "Guardar Cambios"}
                        </SubmitButton>
                    </div>
                </ProfileWrapper>
            </SectionBody>

            <LoadingOverlay $active={submitting}>
                <LoaderCard>
                    <Spinner />
                    <div>Guardando…</div>
                </LoaderCard>
            </LoadingOverlay>
        </AdminLayout>
    );
};