import { useState } from 'react';
import {
    ContactoButton,
    ContactoFileInput,
    ContactoForm,
    ContactoInput,
    ContactoLabel,
    ContactoTextarea,
    ContactoTitle,
    ContactoWrapper,
    FormGroup
} from '../../styles/public/ContactoStyles';
import Swal from 'sweetalert2';

export const ContactoSection = () => {
    const [formData, setFormData] = useState({
        subject: '',
        email: '',
        phone: '',
        content: '',
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({ ...prev, images: Array.from(e.target.files || []) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Simulate sending...
            // await sendContactForm({ subject, email, phone, message });

            Swal.fire({
                title: '🥰 ¡Gracias por tu mensaje!',
                html: 'Nos alegra que estés aquí. <br />Te responderemos en breve.',
                background: '#fffafc',
                icon: 'success',
                confirmButtonColor: '#ef9ac5',
            });

            // Clear fields if needed...
        } catch (error) {
            Swal.fire({
                title: '¡Ups! Ocurrió un error',
                text: 'Intenta de nuevo o comunícate por WhatsApp 💬',
                icon: 'error',
                confirmButtonText: 'Reintentar',
            });
        }
    };

    return (
        <ContactoWrapper>
            <ContactoTitle>Contáctanos</ContactoTitle>

            <ContactoForm onSubmit={handleSubmit}>
                <FormGroup>
                    <ContactoLabel>Título</ContactoLabel>
                    <ContactoInput
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
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
                    <ContactoLabel>Número de Tel. o WhatsApp</ContactoLabel>
                    <ContactoInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <ContactoLabel>Contenido</ContactoLabel>
                    <ContactoTextarea
                        name="content"
                        rows={5}
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ContactoLabel>Adjuntar imágenes</ContactoLabel>
                    <ContactoFileInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                </FormGroup>

                <ContactoButton type="submit">Enviar mensaje</ContactoButton>
            </ContactoForm>
        </ContactoWrapper>
    );
};
