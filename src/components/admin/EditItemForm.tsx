import React, { useMemo, useState } from "react";
import { FormWrapper, FormGroup, PrimaryBtn } from "../../styles/admin/EditItemStyles";
import type { ItemApi } from "../../types";
import { useAdminItemsStore } from "../../store/admin/useAdminItemsStore";
import { showErrorToast, showSuccessToast } from "../../utils/showToast";

interface Props {
    item: ItemApi;
}

export const EditItemForm = ({ item }: Props) => {
    const { updateItem } = useAdminItemsStore();
    const [submitting, setSubmitting] = useState(false);

    const [name, setName] = useState(item.name ?? "");
    const [description, setDescription] = useState(item.description ?? "");

    const canSubmit = useMemo(() => {
        return name.trim().length > 0 && description.trim().length > 0;
    }, [name, description]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!canSubmit) {
            showErrorToast("Completa nombre y descripción.");
            return;
        }

        setSubmitting(true);
        try {
            const dto = {
                name: name.trim(),
                description: description.trim(),
                price: item.price,
                isVisible: item.isVisible,
                materials: item.materials ?? [],
                size: item.size ?? [],
            };

            const form = new FormData();
            form.append("item", new Blob([JSON.stringify(dto)], { type: "application/json" }));

            const updated = await updateItem(item.id, form);

            if (updated) {
                showSuccessToast("Item actualizado con éxito!");
            } else {
                showErrorToast("No se pudo actualizar el item.");
            }
        } catch (err) {
            console.error(err);
            showErrorToast("Error al actualizar el item");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormGroup>
                <label>Nombre</label>
                <input name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormGroup>

            <FormGroup>
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </FormGroup>

            <PrimaryBtn type="submit" disabled={submitting || !canSubmit}>
                {submitting ? "Guardando..." : "Guardar Cambios"}
            </PrimaryBtn>
        </FormWrapper>
    );
};