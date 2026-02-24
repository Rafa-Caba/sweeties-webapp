import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { SectionBody, SectionHeader } from "../../styles/admin/DashboardStyles";
import {
    FormWrap,
    FormGrid,
    FormRow,
    Label,
    Input,
    TextArea,
    ActionsRow,
    PrimaryBtn,
    GhostBtn,
    ImagePicker,
    ImagePreview,
    HelperText,
    RowInline,
    SmallBtn,
    TagList,
    TagChip,
    SpritePreviewGrid,
    SpriteThumb,
    LoadingOverlay,
    LoaderCard,
    Spinner,
} from "../../styles/admin/ItemsFormStyles";

import { useAdminItemsStore } from "../../store/admin/useAdminItemsStore";
import { showErrorToast, showSuccessToast } from "../../utils/showToast";

type SizeFormRow = { alto: number | ""; ancho: number | "" };

export const NewItemSection = () => {
    const navigate = useNavigate();
    const { createItem } = useAdminItemsStore();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [info, setInfo] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const [materials, setMaterials] = useState<string[]>([]);
    const [materialInput, setMaterialInput] = useState("");

    const [sizes, setSizes] = useState<SizeFormRow[]>([{ alto: "", ancho: "" }]);

    const [spriteFiles, setSpriteFiles] = useState<File[]>([]);
    const [spritePreviews, setSpritePreviews] = useState<string[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [submitting, setSubmitting] = useState(false);

    const addMaterial = () => {
        const val = materialInput.trim();
        if (!val) return;
        setMaterials((prev) => [...prev, val]);
        setMaterialInput("");
    };

    const removeMaterial = (idx: number) => setMaterials((prev) => prev.filter((_, i) => i !== idx));

    const addSizeRow = () => setSizes((prev) => [...prev, { alto: "", ancho: "" }]);

    const updateSize = (idx: number, key: "alto" | "ancho", value: string) => {
        setSizes((prev) =>
            prev.map((r, i) =>
                i === idx ? { ...r, [key]: value === "" ? "" : Number(value) } : r
            )
        );
    };

    const removeSizeRow = (idx: number) => setSizes((prev) => prev.filter((_, i) => i !== idx));

    const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;

        setImageFile(f);

        const reader = new FileReader();
        reader.onload = () => setImagePreview(String(reader.result));
        reader.readAsDataURL(f);
    };

    const handlePickSprites = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        setSpriteFiles((prev) => [...prev, ...files]);

        const readers = files.map(
            (file) =>
                new Promise<string>((res) => {
                    const r = new FileReader();
                    r.onload = () => res(String(r.result));
                    r.readAsDataURL(file);
                })
        );

        Promise.all(readers).then((urls) => setSpritePreviews((prev) => [...prev, ...urls]));
    };

    const removeSpriteAt = (idx: number) => {
        setSpriteFiles((prev) => prev.filter((_, i) => i !== idx));
        setSpritePreviews((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleCancel = () => navigate("/admin/items");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || price === "" || Number(price) <= 0 || !imageFile) {
            showErrorToast("Por favor completa nombre, precio, e imagen principal.");
            return;
        }

        const normalizedSizes = sizes
            .filter((r) => r.alto !== "" && r.ancho !== "")
            .map((r) => ({ alto: Number(r.alto), ancho: Number(r.ancho) }));

        setSubmitting(true);
        try {
            const itemDTO = {
                name: name.trim(),
                description: info.trim() || "Sin descripción",
                price: Number(price),
                isVisible,
                materials,
                size: normalizedSizes,
            };

            const form = new FormData();

            // Send JSON as plain string (most compatible with multer + express)
            form.append("item", JSON.stringify(itemDTO));

            form.append("image", imageFile);

            spriteFiles.forEach((file) => form.append("sprites", file));

            const created = await createItem(form);

            if (created) {
                showSuccessToast("El Item fue creado con éxito.");
                navigate("/admin/items");
            } else {
                showErrorToast("No se pudo crear el producto.");
            }
        } catch (err) {
            console.error(err);
            showErrorToast("Ocurrió un error al crear el producto.");
        } finally {
            setSubmitting(false);
        }
    };

    const shouldRenderMainImage = imagePreview.trim().length > 0;

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Nuevo Item</h1>
                    <p>Crea un producto para el catálogo</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <FormWrap onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormRow>
                            <Label htmlFor="name">Nombre *</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Ej. Gatito Crochet Violeta"
                            />
                        </FormRow>

                        <FormRow>
                            <Label htmlFor="price">Precio (MXN) *</Label>
                            <Input
                                id="price"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step="0.01"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value === "" ? "" : Number(e.target.value))
                                }
                                required
                                placeholder="0.00"
                            />
                        </FormRow>

                        <FormRow>
                            <Label htmlFor="isVisible">Visible</Label>
                            <RowInline>
                                <input
                                    id="isVisible"
                                    type="checkbox"
                                    checked={isVisible}
                                    onChange={(e) => setIsVisible(e.target.checked)}
                                />
                                <span>Sí, mostrar en el catálogo</span>
                            </RowInline>
                        </FormRow>

                        <FormRow $full>
                            <Label htmlFor="info">Descripción</Label>
                            <TextArea
                                id="info"
                                rows={4}
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                                placeholder="Materiales, tamaño, cuidados, notas…"
                            />
                        </FormRow>

                        <FormRow $full>
                            <Label>Materiales</Label>
                            <RowInline>
                                <Input
                                    placeholder="Ej. Algodón"
                                    value={materialInput}
                                    onChange={(e) => setMaterialInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addMaterial();
                                        }
                                    }}
                                />
                                <SmallBtn type="button" onClick={addMaterial}>
                                    Agregar
                                </SmallBtn>
                            </RowInline>

                            {materials.length > 0 && (
                                <TagList>
                                    {materials.map((m, i) => (
                                        <TagChip key={`${m}-${i}`} onClick={() => removeMaterial(i)} title="Quitar">
                                            {m} ✕
                                        </TagChip>
                                    ))}
                                </TagList>
                            )}
                        </FormRow>

                        {/* Sizes */}
                        <FormRow $full>
                            <Label>Tamaños (alto x ancho en cm)</Label>
                            <HelperText>Agrega uno o varios tamaños. Puedes dejarlo vacío.</HelperText>

                            {sizes.map((row, idx) => (
                                <RowInline key={idx} style={{ gap: "0.75rem" }}>
                                    <Input
                                        type="number"
                                        placeholder="Alto"
                                        value={row.alto}
                                        onChange={(e) => updateSize(idx, "alto", e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Ancho"
                                        value={row.ancho}
                                        onChange={(e) => updateSize(idx, "ancho", e.target.value)}
                                    />
                                    {sizes.length > 1 && (
                                        <SmallBtn type="button" onClick={() => removeSizeRow(idx)}>
                                            Quitar
                                        </SmallBtn>
                                    )}
                                </RowInline>
                            ))}

                            <SmallBtn type="button" onClick={addSizeRow}>
                                + Agregar tamaño
                            </SmallBtn>
                        </FormRow>

                        {/* Main image */}
                        <FormRow $full>
                            <Label>Imagen principal *</Label>
                            <ImagePicker>
                                <span>Subir imagen</span>
                                <input type="file" accept="image/*" onChange={handlePickImage} />
                            </ImagePicker>

                            {shouldRenderMainImage && (
                                <ImagePreview>
                                    <img src={imagePreview} alt="Preview" />
                                </ImagePreview>
                            )}
                        </FormRow>

                        {/* Sprites */}
                        <FormRow $full>
                            <Label>Sprites (opcionales)</Label>
                            <HelperText>Puedes subir varias imágenes.</HelperText>

                            <ImagePicker>
                                <span>Seleccionar Imágenes</span>
                                <input type="file" accept="image/*" multiple onChange={handlePickSprites} />
                            </ImagePicker>

                            {spritePreviews.length > 0 && (
                                <SpritePreviewGrid>
                                    {spritePreviews.map((src, idx) => (
                                        <SpriteThumb key={`sprite-${idx}`}>
                                            {src?.trim() ? <img src={src} alt={`sprite-${idx}`} /> : null}
                                            <button type="button" onClick={() => removeSpriteAt(idx)}>
                                                ✕
                                            </button>
                                        </SpriteThumb>
                                    ))}
                                </SpritePreviewGrid>
                            )}
                        </FormRow>

                        <ActionsRow>
                            <GhostBtn type="button" onClick={handleCancel}>
                                Cancelar
                            </GhostBtn>
                            <PrimaryBtn type="submit" disabled={submitting}>
                                {submitting ? "Guardando…" : "Crear Item"}
                            </PrimaryBtn>
                        </ActionsRow>
                    </FormGrid>
                </FormWrap>
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