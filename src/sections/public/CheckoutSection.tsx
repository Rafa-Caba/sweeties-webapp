import * as React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../../store/public/useCartStore";
import { useOrdersStore } from "../../store/public/useOrdersStore";
import { sendOrder } from "../../services/public/checkout";

import {
    CheckoutWrapper,
    CheckoutTitle,
    CheckoutForm,
    InputGroup,
    Input,
    Textarea,
    SubmitButton,
} from "../../styles/public/CheckoutStyles";

import type { Order } from "../../types/public/Order"; // adjust if your path differs

export const CheckoutSection = () => {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const { addOrder } = useOrdersStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        note: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
            Swal.fire("Campos requeridos", "Por favor completa los campos obligatorios", "warning");
            return;
        }

        if (items.length === 0) {
            Swal.fire("Carrito vacío", "Agrega al menos un producto para continuar", "info");
            return;
        }

        setLoading(true);
        try {
            const total = getTotal();

            // ✅ API expects note?: string (undefined when empty)
            const noteForApi: string | undefined = formData.note?.trim() ? formData.note.trim() : undefined;

            // ✅ Local order type uses note: string | null
            const noteForLocal: string | null = formData.note?.trim() ? formData.note.trim() : null;

            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                note: noteForApi,
                total,
                items: items.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            };

            const response = await sendOrder(payload);

            const nowIso = new Date().toISOString();

            const localOrder: Order = {
                id: response.orderId,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                note: noteForLocal,

                items: payload.items,
                total: payload.total,
                status: "PENDIENTE",

                createdAt: nowIso,
                updatedAt: nowIso,

                // Email tracking defaults
                emailStatus: "PENDING",
                emailAttempts: 0,
                emailLastAttemptAt: null,
                emailSentAt: null,
                emailLastError: null,
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
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="email">Correo electrónico *</label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="phone">WhatsApp o Teléfono *</label>
                    <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="note">Nota (opcional)</label>
                    <Textarea id="note" name="note" rows={4} value={formData.note} onChange={handleChange} />
                </InputGroup>

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar pedido 🧵"}
                </SubmitButton>
            </CheckoutForm>
        </CheckoutWrapper>
    );
};