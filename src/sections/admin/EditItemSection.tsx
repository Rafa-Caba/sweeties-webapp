import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export const EditItemSection = () => {
    const navigate = useNavigate();
    const { id = "" } = useParams();

    const {
        fetchItemById,
        clearCurrentItem,
        currentItemApi,
        loadingCurrent,
        updateItem,
    } = useAdminItemsStore();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [info, setInfo] = useState("");
    const [visible, setVisible] = useState(true);

    const [materials, setMaterials] = useState<string[]>([]);
    const [materialInput, setMaterialInput] = useState("");

    const [sizes, setSizes] = useState<SizeFormRow[]>([{ alto: "", ancho: "" }]);

    // Existing media from API
    const [existingSprites, setExistingSprites] = useState<string[]>([]);
    const [existingSpritesPublicIds, setExistingSpritesPublicIds] = useState<string[]>([]);
    const [existingImageUrl, setExistingImageUrl] = useState<string>("");
    const [existingImagePublicId, setExistingImagePublicId] = useState<string | null>(null);

    // New uploads
    const [spriteFiles, setSpriteFiles] = useState<File[]>([]);
    const [spritePreviews, setSpritePreviews] = useState<string[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetchItemById(id);

        return () => {
            clearCurrentItem();
        };
    }, [id, fetchItemById, clearCurrentItem]);

    useEffect(() => {
        if (!currentItemApi) return;

        setName(currentItemApi.name ?? "");
        setPrice(typeof currentItemApi.price === "number" ? currentItemApi.price : "");
        setInfo((currentItemApi.description ?? currentItemApi.info ?? "").toString());
        setVisible(typeof currentItemApi.isVisible === "boolean" ? currentItemApi.isVisible : true);

        setMaterials(Array.isArray(currentItemApi.materials) ? currentItemApi.materials : []);

        const emptyRow: SizeFormRow = { alto: "", ancho: "" };

        const normalizedSizes: SizeFormRow[] =
            Array.isArray(currentItemApi.size) && currentItemApi.size.length
                ? currentItemApi.size.map((s): SizeFormRow => ({
                    alto: typeof s?.alto === "number" ? s.alto : emptyRow.alto,
                    ancho: typeof s?.ancho === "number" ? s.ancho : emptyRow.ancho,
                }))
                : [emptyRow];

        setSizes(normalizedSizes);

        setExistingSprites(Array.isArray(currentItemApi.sprites) ? currentItemApi.sprites : []);
        setExistingSpritesPublicIds(
            Array.isArray(currentItemApi.spritesPublicIds) ? currentItemApi.spritesPublicIds : []
        );

        setExistingImageUrl(currentItemApi.imageUrl ?? "");
        setExistingImagePublicId(currentItemApi.imagePublicId ?? null);

        // Reset new uploads
        setImageFile(null);
        setImagePreview("");
        setSpriteFiles([]);
        setSpritePreviews([]);
    }, [currentItemApi]);

    const title = useMemo(() => {
        return currentItemApi ? `Editar: ${currentItemApi.name}` : "Editar Item";
    }, [currentItemApi]);

    const addMaterial = () => {
        const val = materialInput.trim();
        if (!val) return;
        setMaterials((prev) => [...prev, val]);
        setMaterialInput("");
    };

    const removeMaterial = (idx: number) => {
        setMaterials((prev) => prev.filter((_, i) => i !== idx));
    };

    const addSizeRow = () => setSizes((prev) => [...prev, { alto: "", ancho: "" }]);

    const updateSize = (idx: number, key: "alto" | "ancho", value: string) => {
        setSizes((prev) =>
            prev.map((r, i) =>
                i === idx ? { ...r, [key]: value === "" ? "" : Number(value) } : r
            )
        );
    };

    const removeSizeRow = (idx: number) => setSizes((prev) => prev.filter((_, i) => i !== idx));

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

    const removeExistingSpriteAt = (idx: number) => {
        setExistingSprites((prev) => prev.filter((_, i) => i !== idx));
        setExistingSpritesPublicIds((prev) => prev.filter((_, i) => i !== idx));
    };

    const removeNewSpriteAt = (idx: number) => {
        setSpriteFiles((prev) => prev.filter((_, i) => i !== idx));
        setSpritePreviews((prev) => prev.filter((_, i) => i !== idx));
    };

    const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;

        setImageFile(f);

        const reader = new FileReader();
        reader.onload = () => setImagePreview(String(reader.result));
        reader.readAsDataURL(f);
    };

    const handleCancel = () => navigate("/admin/items");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentItemApi?.id) return;

        if (!name.trim() || price === "" || Number(price) <= 0) {
            showErrorToast("Por favor completa nombre y un precio válido.");
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
                isVisible: visible,
                materials,
                size: normalizedSizes,

                imagePublicId: existingImagePublicId,
                spritesPublicIds: existingSpritesPublicIds,
            };

            const form = new FormData();
            form.append("item", JSON.stringify(itemDTO));

            if (imageFile) form.append("image", imageFile);

            spriteFiles.forEach((file) => form.append("sprites", file));

            const updated = await updateItem(currentItemApi.id, form);

            if (updated) {
                showSuccessToast("El Item fue actualizado con éxito.");
                navigate("/admin/items");
            } else {
                showErrorToast("No se pudo actualizar el producto.");
            }
        } catch (err) {
            console.error(err);
            showErrorToast("Ocurrió un error al actualizar el producto.");
        } finally {
            setSubmitting(false);
        }
    };

    const previewSrc = (imagePreview || existingImageUrl || "").trim();
    const shouldRenderMainImage = previewSrc.length > 0;

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>{title}</h1>
                    <p>Actualiza los datos del producto</p>
                </div>
            </SectionHeader>

            <SectionBody>
                {loadingCurrent && <div style={{ padding: "1rem 0" }}>Cargando item…</div>}

                {!loadingCurrent && currentItemApi && (
                    <FormWrap onSubmit={handleSubmit}>
                        <FormGrid>
                            <FormRow>
                                <Label htmlFor="name">Nombre *</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="off"
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
                                    autoComplete="off"
                                />
                            </FormRow>

                            <FormRow>
                                <Label htmlFor="isVisible">Visible</Label>
                                <RowInline>
                                    <input
                                        id="isVisible"
                                        name="visible"
                                        type="checkbox"
                                        checked={visible}
                                        onChange={(e) => setVisible(e.target.checked)}
                                        autoComplete="off"
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
                                    autoComplete="off"
                                />
                            </FormRow>

                            {/* Materials */}
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
                                        autoComplete="off"
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
                                <HelperText>Puedes dejarlo vacío.</HelperText>

                                {sizes.map((row, idx) => (
                                    <RowInline key={idx} style={{ gap: "0.75rem" }}>
                                        <Input
                                            type="number"
                                            placeholder="Alto"
                                            value={row.alto}
                                            onChange={(e) => updateSize(idx, "alto", e.target.value)}
                                            autoComplete="off"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Ancho"
                                            value={row.ancho}
                                            onChange={(e) => updateSize(idx, "ancho", e.target.value)}
                                            autoComplete="off"
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
                                <Label>Imagen principal</Label>
                                <HelperText>Actual: si no subes una nueva, se mantiene.</HelperText>

                                {shouldRenderMainImage && (
                                    <ImagePreview>
                                        <img src={previewSrc} alt="Preview" />
                                    </ImagePreview>
                                )}

                                <ImagePicker>
                                    <span>Subir imagen</span>
                                    <input type="file" accept="image/*" onChange={handlePickImage} />
                                </ImagePicker>
                            </FormRow>

                            {/* Sprites */}
                            <FormRow $full>
                                <Label>Sprites</Label>
                                <HelperText>
                                    Las sprites existentes se mantienen si no subes nuevas. Para reemplazarlas, sube nuevas sprites.
                                </HelperText>

                                <ImagePicker>
                                    <span>Seleccionar Imágenes</span>
                                    <input type="file" accept="image/*" multiple onChange={handlePickSprites} />
                                </ImagePicker>

                                {existingSprites.length > 0 && (
                                    <>
                                        <HelperText>Existentes (solo vista):</HelperText>
                                        <SpritePreviewGrid>
                                            {existingSprites.map((src, idx) => (
                                                <SpriteThumb key={`ex-${idx}`}>
                                                    {src?.trim() ? <img src={src} alt={`existing-sprite-${idx}`} /> : null}
                                                    <button type="button" onClick={() => removeExistingSpriteAt(idx)}>
                                                        ✕
                                                    </button>
                                                </SpriteThumb>
                                            ))}
                                        </SpritePreviewGrid>
                                    </>
                                )}

                                {spritePreviews.length > 0 && (
                                    <>
                                        <HelperText>Nuevas (se subirán y probablemente reemplazarán):</HelperText>
                                        <SpritePreviewGrid>
                                            {spritePreviews.map((src, idx) => (
                                                <SpriteThumb key={`new-${idx}`}>
                                                    {src?.trim() ? <img src={src} alt={`new-sprite-${idx}`} /> : null}
                                                    <button type="button" onClick={() => removeNewSpriteAt(idx)}>
                                                        ✕
                                                    </button>
                                                </SpriteThumb>
                                            ))}
                                        </SpritePreviewGrid>
                                    </>
                                )}
                            </FormRow>

                            <ActionsRow>
                                <GhostBtn type="button" onClick={handleCancel}>
                                    Cancelar
                                </GhostBtn>
                                <PrimaryBtn type="submit" disabled={submitting}>
                                    {submitting ? "Guardando…" : "Guardar cambios"}
                                </PrimaryBtn>
                            </ActionsRow>
                        </FormGrid>
                    </FormWrap>
                )}
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