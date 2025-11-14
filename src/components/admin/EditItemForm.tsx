import React, { useState } from "react";
import { FormWrapper, FormGroup, PrimaryBtn } from "../../styles/admin/EditItemStyles";
import type { Item } from "../../types";
import { useAdminItemsStore } from "../../store/admin/useAdminItemsStore";

interface Props {
    item: Item;
}

export const EditItemForm = ({ item }: Props) => {
    const { updateItem } = useAdminItemsStore();
    const [formData, setFormData] = useState<Item>(item);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (val !== undefined && val !== null) {
                    form.append(key, val as any);
                }
            });

            await updateItem(item.id, form);
            alert("Item actualizado con éxito!");
        } catch (err) {
            console.error(err);
            alert("Error al actualizar el item");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormGroup>
                <label>Nombre</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
                <label>Descripción</label>
                <textarea name="description" value={formData.info} onChange={handleChange} />
            </FormGroup>

            <PrimaryBtn type="submit" disabled={submitting}>
                {submitting ? "Guardando..." : "Guardar Cambios"}
            </PrimaryBtn>
        </FormWrapper>
    );
};
