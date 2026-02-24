import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/public/useCartStore';
import { useOrdersStore } from '../../store/public/useOrdersStore'; // <-- Import Orders Store
import { sendOrder } from '../../services/public/checkout';
import {
    CheckoutWrapper,
    CheckoutTitle,
    CheckoutForm,
    InputGroup,
    Input,
    Textarea,
    SubmitButton
} from '../../styles/public/CheckoutStyles';

export const CheckoutSection = () => {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const { addOrder } = useOrdersStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        note: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            Swal.fire("Campos requeridos", "Por favor completa los campos obligatorios", "warning");
            return;
        }

        setLoading(true);
        try {
            const total = getTotal();

            const payload = {
                ...formData,
                note: formData.note?.trim() ? formData.note.trim() : "",
                total,
                items: items.map((item) => ({
                    productId: item.id, // ya es string
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            };

            const response = await sendOrder(payload);

            const nowIso = new Date().toISOString();
            const localOrder = {
                id: response.orderId,
                ...formData,
                note: payload.note,
                total,
                status: "PENDIENTE" as const,
                createdAt: nowIso,
                updatedAt: nowIso,
                items: payload.items,
            };

            addOrder(localOrder);

            Swal.fire({
                icon: "success",
                title: "Pedido enviado",
                text: "Te contactaremos pronto para confirmar 🧸",
                confirmButtonColor: "#ef9ac5",
            });

            clearCart();
            navigate("/ordenes");
        } catch (error: any) {
            console.error(error);
            Swal.fire("Error", "Hubo un problema al enviar tu pedido. Intenta más tarde.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CheckoutWrapper>
            <CheckoutTitle>🧾 Finalizar Pedido</CheckoutTitle>
            <CheckoutForm onSubmit={handleSubmit}>
                <InputGroup>
                    <label htmlFor="name">Nombre completo *</label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="email">Correo electrónico *</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="phone">WhatsApp o Teléfono *</label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="note">Nota (opcional)</label>
                    <Textarea
                        id="note"
                        name="note"
                        rows={4}
                        value={formData.note}
                        onChange={handleChange}
                    />
                </InputGroup>

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar pedido 🧵'}
                </SubmitButton>
            </CheckoutForm>
        </CheckoutWrapper>
    );
};