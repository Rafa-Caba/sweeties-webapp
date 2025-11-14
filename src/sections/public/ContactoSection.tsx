import { useState } from 'react';
import {
    ContactoButton,
    // ContactoFileInput, // Removed
    ContactoForm,
    ContactoInput,
    ContactoLabel,
    ContactoTextarea,
    ContactoTitle,
    ContactoWrapper,
    FormGroup,
    ContactoInfoBox, 
} from '../../styles/public/ContactoStyles';
import Swal from 'sweetalert2';
import { usePublicSettingsStore } from '../../store/public/usePublicSettingsStore';
import { sendContactForm, type ContactPayload } from '../../services/public/contact';

export const ContactoSection = () => {
    // Get the settings from the store
    const { settings } = usePublicSettingsStore();    

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        content: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // REMOVED handleFileChange

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Map frontend state to the backend DTO
        const payload: ContactPayload = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.content,
        };

        try {
            await sendContactForm(payload);

            Swal.fire({
                title: '🥰 ¡Gracias por tu mensaje!',
                html: 'Nos alegra que estés aquí. <br />Te responderemos en breve.',
                background: '#fffafc',
                icon: 'success',
                confirmButtonColor: '#ef9ac5',
            });

            // Clear form on success
            setFormData({
                name: '',
                subject: '',
                email: '',
                phone: '',
                content: '',
            });

        } catch (error: any) {
            // Check for validation errors from the backend
            if (error.response && error.response.status === 400) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).join('<br/>');
                Swal.fire({
                    title: '¡Ups! Faltan datos',
                    html: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'Reintentar',
                });
            } else {
                Swal.fire({
                    title: '¡Ups! Ocurrió un error',
                    text: 'Intenta de nuevo o comunícate por WhatsApp 💬',
                    icon: 'error',
                    confirmButtonText: 'Reintentar',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Fallback while settings load
    if (!settings) return <div>Cargando...</div>;

    return (
        <ContactoWrapper>
            <ContactoTitle>Contáctanos</ContactoTitle>

            {/* --- Dynamic Info Box --- */}
            <ContactoInfoBox>
                <p>¿Prefieres una atención más directa?</p>
                {settings.visibility.showWhatsApp && settings.contactWhatsApp && (
                    <a 
                        href={`https://wa.me/${settings.contactWhatsApp.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                    >
                        💬 Chatea por WhatsApp
                    </a>
                )}
                {settings.visibility.showEmail && settings.contactEmail && (
                    <span>o escríbenos a: <strong>{settings.contactEmail}</strong></span>
                )}
            </ContactoInfoBox>
            {/* ------------------------ */}

            <ContactoForm onSubmit={handleSubmit}>
                <FormGroup>
                    <ContactoLabel>Tu Nombre</ContactoLabel> {/* <-- ADDED */}
                    <ContactoInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                
                <FormGroup>
                    <ContactoLabel>Título</ContactoLabel>
                    <ContactoInput
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <ContactoLabel>Correo electrónico</ContactoLabel>
                    <ContactoInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ContactoLabel>Número de Tel. o WhatsApp (Opcional)</ContactoLabel>
                    <ContactoInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <ContactoLabel>Mensaje</ContactoLabel>
                    <ContactoTextarea
                        name="content"
                        rows={5}
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                {/* 
                    <FormGroup>
                        <ContactoLabel>Adjuntar imágenes</ContactoLabel>
                        <ContactoFileInput
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </FormGroup>
                */}

                <ContactoButton type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar mensaje'}
                </ContactoButton>
            </ContactoForm>
        </ContactoWrapper>
    );
};