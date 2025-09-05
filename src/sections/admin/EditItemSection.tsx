// /src/sections/admin/EditItemSection.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
    FormWrap, FormGrid, FormRow, Label, Input, TextArea, ActionsRow,
    PrimaryBtn, GhostBtn, ImagePicker, ImagePreview, HelperText,
    RowInline, SmallBtn, TagList, TagChip,
    SpritePreviewGrid, SpriteThumb,
    LoadingOverlay, LoaderCard, Spinner,
} from '../../styles/admin/ItemsFormStyles';
import { useAdminItemsStore } from '../../store/admin/useAdminItemsStore';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';
// import { TopProgress } from '../../styles/admin/AdminLayoutStyles';

export const EditItemSection = () => {
    const navigate = useNavigate();
    const { id = '' } = useParams();

    const {
        fetchItemById,
        clearCurrentItem,
        currentItem,
        loadingCurrent,
        updateItem,
    } = useAdminItemsStore();

    // Local form state (pre-filled from currentItem)
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [info, setInfo] = useState('');
    const [available, setAvailable] = useState(true);

    const [materials, setMaterials] = useState<string[]>([]);
    const [materialInput, setMaterialInput] = useState('');

    const [sizes, setSizes] = useState<{ alto: number | ''; ancho: number | '' }[]>([
        { alto: '', ancho: '' },
    ]);

    // Sprites: we keep both existing URLs and new files
    const [existingSprites, setExistingSprites] = useState<string[]>([]);
    const [spriteFiles, setSpriteFiles] = useState<File[]>([]);
    const [spritePreviews, setSpritePreviews] = useState<string[]>([]); // for new files

    // Main image: either keep existing URL or replace with new file
    const [existingImage, setExistingImage] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(''); // for new selection

    const [submitting, setSubmitting] = useState(false);

    // Load item initially
    useEffect(() => {
        if (!id) return;
        fetchItemById(id);
        return () => {
            clearCurrentItem();
        };
    }, [id, fetchItemById, clearCurrentItem]);

    // When currentItem updates, hydrate local state
    useEffect(() => {
        if (!currentItem) return;
        setName(currentItem.name ?? '');
        setPrice(typeof currentItem.price === 'number' ? currentItem.price : '');
        setInfo(currentItem.info ?? '');
        setAvailable(Boolean(currentItem.available));

        setMaterials(Array.isArray(currentItem.materials) ? currentItem.materials : []);
        const normalizedSizes =
            Array.isArray(currentItem.size) && currentItem.size.length
                ? currentItem.size.map((s: any) => ({
                    alto: typeof s?.alto === 'number' ? s.alto : '',
                    ancho: typeof s?.ancho === 'number' ? s.ancho : '',
                }))
                : [{ alto: '', ancho: '' }];
        setSizes(normalizedSizes);

        // images
        const spritesFromItem: string[] = Array.isArray((currentItem as any).sprites)
            ? ((currentItem as any).sprites as string[])
            : [];
        setExistingSprites(spritesFromItem);

        const img = (currentItem as any).image ?? (currentItem as any).imageUrl ?? '';
        setExistingImage(typeof img === 'string' ? img : '');
        setImageFile(null);
        setImagePreview('');
        setSpriteFiles([]);
        setSpritePreviews([]);
    }, [currentItem]);

    const title = useMemo(
        () => (currentItem ? `Editar: ${currentItem.name}` : 'Editar Item'),
        [currentItem]
    );

    // ----- Materials
    const addMaterial = () => {
        const val = materialInput.trim();
        if (!val) return;
        setMaterials((prev) => [...prev, val]);
        setMaterialInput('');
    };
    const removeMaterial = (idx: number) => setMaterials((prev) => prev.filter((_, i) => i !== idx));

    // ----- Sizes
    const addSizeRow = () => setSizes((prev) => [...prev, { alto: '', ancho: '' }]);
    const updateSize = (idx: number, key: 'alto' | 'ancho', value: string) =>
        setSizes((prev) =>
            prev.map((r, i) => (i === idx ? { ...r, [key]: value === '' ? '' : Number(value) } : r))
        );
    const removeSizeRow = (idx: number) => setSizes((prev) => prev.filter((_, i) => i !== idx));

    // ----- Sprites
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
    };
    const removeNewSpriteAt = (idx: number) => {
        setSpriteFiles((prev) => prev.filter((_, i) => i !== idx));
        setSpritePreviews((prev) => prev.filter((_, i) => i !== idx));
    };

    // ----- Main image
    const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;
        setImageFile(f);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(f);
    };

    const handleCancel = () => navigate('/admin/items');

    // ----- Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem?._id) return;
        if (!name.trim() || price === '' || Number(price) <= 0) {
            alert('Por favor completa nombre y un precio válido.');
            return;
        }

        const normalizedSizes = sizes
            .filter((r) => r.alto !== '' && r.ancho !== '')
            .map((r) => ({ alto: Number(r.alto), ancho: Number(r.ancho) }));

        setSubmitting(true);
        try {
            const form = new FormData();
            form.append('name', name.trim());
            form.append('price', String(price));
            form.append('info', info.trim());
            form.append('available', String(available));
            form.append('materials', JSON.stringify(materials));
            form.append('size', JSON.stringify(normalizedSizes));

            // main image
            if (imageFile) {
                form.append('image', imageFile);
            } else if (existingImage) {
                // lets backend know we're keeping the same
                form.append('existingImage', existingImage);
            }

            // sprites
            if (existingSprites.length) {
                form.append('existingSprites', JSON.stringify(existingSprites));
            } else {
                form.append('existingSprites', JSON.stringify([]));
            }
            spriteFiles.forEach((file) => form.append('sprites', file));

            const updated = await updateItem(currentItem._id, form);
            if (updated) {
                showSuccessToast('El Item fue actualizado con éxito.');
                navigate('/admin/items');
            } else {
                showErrorToast('No se pudo actualizar el producto.');
            }
        } catch (err) {
            console.error(err);
            showErrorToast('Ocurrió un error al actualizar el producto.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            {/* <TopProgress $active={submitting || loadingCurrent} /> */}

            <SectionHeader>
                <div>
                    <h1>{title}</h1>
                    <p>Actualiza los datos del producto</p>
                </div>
            </SectionHeader>

            <SectionBody>
                {loadingCurrent && (
                    <div style={{ padding: '1rem 0' }}>Cargando item…</div>
                )}

                {!loadingCurrent && currentItem && (
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
                                        setPrice(e.target.value === '' ? '' : Number(e.target.value))
                                    }
                                    required
                                    placeholder="0.00"
                                />
                            </FormRow>

                            <FormRow>
                                <Label htmlFor="available">Disponible</Label>
                                <RowInline>
                                    <input
                                        id="available"
                                        type="checkbox"
                                        checked={available}
                                        onChange={(e) => setAvailable(e.target.checked)}
                                    />
                                    <span>Sí, disponible para pedidos</span>
                                </RowInline>
                            </FormRow>

                            <FormRow $full>
                                <Label htmlFor="info">Información</Label>
                                <TextArea
                                    id="info"
                                    rows={4}
                                    value={info}
                                    onChange={(e) => setInfo(e.target.value)}
                                    placeholder="Materiales, tamaño, cuidados, notas…"
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
                                            if (e.key === 'Enter') {
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
                                            <TagChip
                                                key={i}
                                                onClick={() => removeMaterial(i)}
                                                title="Quitar"
                                            >
                                                {m} ✕
                                            </TagChip>
                                        ))}
                                    </TagList>
                                )}
                            </FormRow>

                            {/* Sizes */}
                            <FormRow $full>
                                <Label>Tamaños (alto x ancho en cm)</Label>
                                {sizes.map((row, i) => (
                                    <RowInline key={i}>
                                        <Input
                                            type="number"
                                            min={0}
                                            step="0.1"
                                            placeholder="Alto"
                                            value={row.alto}
                                            onChange={(e) => updateSize(i, 'alto', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            min={0}
                                            step="0.1"
                                            placeholder="Ancho"
                                            value={row.ancho}
                                            onChange={(e) => updateSize(i, 'ancho', e.target.value)}
                                        />
                                        <SmallBtn type="button" onClick={() => removeSizeRow(i)}>
                                            Quitar
                                        </SmallBtn>
                                    </RowInline>
                                ))}
                                <SmallBtn type="button" onClick={addSizeRow}>
                                    + Agregar tamaño
                                </SmallBtn>
                                <HelperText>Puedes agregar varias combinaciones de tamaños.</HelperText>
                            </FormRow>

                            {/* Sprites (existing + new) */}
                            <FormRow $full>
                                <Label>Sprites (imágenes adicionales)</Label>

                                {/* Existing sprite URLs from server */}
                                {existingSprites.length > 0 && (
                                    <>
                                        <HelperText>Sprites actuales (haz clic en ✕ para quitar).</HelperText>
                                        <SpritePreviewGrid>
                                            {existingSprites.map((src, i) => (
                                                <SpriteThumb key={`ex-${i}`}>
                                                    <img src={src} alt={`Sprite existente ${i + 1}`} />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingSpriteAt(i)}
                                                        aria-label="Quitar sprite"
                                                    >
                                                        ✕
                                                    </button>
                                                </SpriteThumb>
                                            ))}
                                        </SpritePreviewGrid>
                                    </>
                                )}

                                {/* New files picked now */}
                                {spritePreviews.length > 0 && (
                                    <>
                                        <HelperText>Nuevos sprites seleccionados.</HelperText>
                                        <SpritePreviewGrid>
                                            {spritePreviews.map((src, i) => (
                                                <SpriteThumb key={`new-${i}`}>
                                                    <img src={src} alt={`Sprite nuevo ${i + 1}`} />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewSpriteAt(i)}
                                                        aria-label="Quitar sprite"
                                                    >
                                                        ✕
                                                    </button>
                                                </SpriteThumb>
                                            ))}
                                        </SpritePreviewGrid>
                                    </>
                                )}

                                <ImagePicker>
                                    <input
                                        id="sprites"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handlePickSprites}
                                    />
                                    <span>Seleccionar imágenes</span>
                                </ImagePicker>
                                <HelperText>JPG/PNG ideales (&lt; 2MB c/u).</HelperText>
                            </FormRow>

                            {/* Main image */}
                            <FormRow $full>
                                <Label>Imagen principal</Label>

                                {/* Existing image preview (if not replaced) */}
                                {!imagePreview && existingImage && (
                                    <>
                                        <HelperText>Imagen actual</HelperText>
                                        <ImagePreview>
                                            <img src={existingImage} alt="Imagen actual" />
                                        </ImagePreview>
                                    </>
                                )}

                                {/* New picked image preview */}
                                {imagePreview && (
                                    <>
                                        <HelperText>Nueva imagen seleccionada</HelperText>
                                        <ImagePreview>
                                            <img src={imagePreview} alt="Nueva imagen" />
                                        </ImagePreview>
                                    </>
                                )}

                                <ImagePicker>
                                    <input id="image" type="file" accept="image/*" onChange={handlePickImage} />
                                    <span>Seleccionar imagen</span>
                                </ImagePicker>
                                <HelperText>Formatos recomendados: JPG/PNG. Peso ideal &lt; 2MB.</HelperText>
                            </FormRow>
                        </FormGrid>

                        <ActionsRow>
                            <GhostBtn type="button" onClick={handleCancel}>
                                Cancelar
                            </GhostBtn>
                            <PrimaryBtn type="submit" disabled={submitting}>
                                {submitting ? 'Guardando…' : 'Guardar Cambios'}
                            </PrimaryBtn>
                        </ActionsRow>
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
