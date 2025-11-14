import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
    FormWrap, FormGrid, FormRow, Label, Input, TextArea, ActionsRow,
    PrimaryBtn, GhostBtn, ImagePicker, ImagePreview, HelperText,
    RowInline, SmallBtn, TagList, TagChip,
    SpritePreviewGrid,
    SpriteThumb,
    LoadingOverlay,
    LoaderCard,
    Spinner,
} from '../../styles/admin/ItemsFormStyles';
import { useAdminItemsStore } from '../../store/admin/useAdminItemsStore';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';
// import { TopProgress } from '../../styles/admin/AdminLayoutStyles';

export const NewItemSection = () => {
    const navigate = useNavigate();
    const { createItem } = useAdminItemsStore();

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [info, setInfo] = useState('');
    const [available, setAvailable] = useState(true);

    const [materials, setMaterials] = useState<string[]>([]);
    const [materialInput, setMaterialInput] = useState('');

    const [sizes, setSizes] = useState<{ alto: number | ''; ancho: number | '' }[]>([
        { alto: '', ancho: '' },
    ]);

    const [spriteFiles, setSpriteFiles] = useState<File[]>([]);
    const [spritePreviews, setSpritePreviews] = useState<string[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const [submitting, setSubmitting] = useState(false);

    const addMaterial = () => {
        const val = materialInput.trim();
        if (!val) return;
        setMaterials((prev) => [...prev, val]);
        setMaterialInput('');
    };
    const removeMaterial = (idx: number) => setMaterials((prev) => prev.filter((_, i) => i !== idx));

    const addSizeRow = () => setSizes((prev) => [...prev, { alto: '', ancho: '' }]);
    const updateSize = (idx: number, key: 'alto' | 'ancho', value: string) =>
        setSizes((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value === '' ? '' : Number(value) } : r)));
    const removeSizeRow = (idx: number) => setSizes((prev) => prev.filter((_, i) => i !== idx));

    const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;
        setImageFile(f);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(f);
    };

    const handleCancel = () => navigate('/admin/items');

    const handlePickSprites = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        // limit or validate types here if you want
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !price || Number(price) <= 0 || !imageFile) {
            showErrorToast('Por favor completa nombre, precio, e imagen principal.');
            return;
        }

        // 1. Normalize sizes (your logic is correct)
        const normalizedSizes = sizes
            .filter((r) => r.alto !== '' && r.ancho !== '')
            .map((r) => ({ alto: Number(r.alto), ancho: Number(r.ancho) }));

        setSubmitting(true);
        try {
            // 2. Create the DTO object that matches 'CreateItemDTO'
            const itemDTO = {
                name: name.trim(),
                description: info.trim(), // 'info' from form maps to 'description'
                price: Number(price),
                isVisible: available,    // 'available' from form maps to 'isVisible'
                materials: materials,
                size: normalizedSizes,
                // isFeatured is not in your form, defaults to false in Spring
            };

            // 3. Create the FormData
            const form = new FormData();

            // 4. Append the DTO as a JSON Blob named "item"
            form.append('item', new Blob([JSON.stringify(itemDTO)], {
                type: 'application/json'
            }));

            // 5. Append the main image file named "image"
            if (imageFile) {
                form.append('image', imageFile);
            }

            // 6. Append all sprite files, each named "sprites"
            spriteFiles.forEach((file) => {
                form.append('sprites', file);
            });

            const created = await createItem(form);
            if (created) {
                showSuccessToast('El Item fue creado con exito.');
                navigate('/admin/items');
            } else {
                showErrorToast('No se pudo crear el producto.');
            }
        } catch (err) {
            console.error(err);
            showErrorToast('Ocurrió un error al crear el producto.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            {/* <TopProgress $active={submitting} /> */}

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
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ej. Gatito Crochet Violeta" />
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
                                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                required
                                placeholder="0.00"
                            />
                        </FormRow>

                        <FormRow>
                            <Label htmlFor="available">Disponible</Label>
                            <RowInline>
                                <input id="available" type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                                <span>Sí, disponible para pedidos</span>
                            </RowInline>
                        </FormRow>

                        <FormRow $full>
                            <Label htmlFor="info">Información</Label>
                            <TextArea id="info" rows={4} value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Materiales, tamaño, cuidados, notas…" />
                        </FormRow>

                        {/* Materials */}
                        <FormRow $full>
                            <Label>Materiales</Label>
                            <RowInline>
                                <Input
                                    placeholder="Ej. Algodón"
                                    value={materialInput}
                                    onChange={(e) => setMaterialInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMaterial(); } }}
                                />
                                <SmallBtn type="button" onClick={addMaterial}>Agregar</SmallBtn>
                            </RowInline>
                            {materials.length > 0 && (
                                <TagList>
                                    {materials.map((m, i) => (
                                        <TagChip key={i} onClick={() => removeMaterial(i)} title="Quitar">
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
                                    <Input type="number" min={0} step="0.1" placeholder="Alto" value={row.alto} onChange={(e) => updateSize(i, 'alto', e.target.value)} />
                                    <Input type="number" min={0} step="0.1" placeholder="Ancho" value={row.ancho} onChange={(e) => updateSize(i, 'ancho', e.target.value)} />
                                    <SmallBtn type="button" onClick={() => removeSizeRow(i)}>Quitar</SmallBtn>
                                </RowInline>
                            ))}
                            <SmallBtn type="button" onClick={addSizeRow}>+ Agregar tamaño</SmallBtn>
                            <HelperText>Puedes agregar varias combinaciones de tamaños.</HelperText>
                        </FormRow>

                        {/* Sprites (múltiples imágenes) */}
                        <FormRow $full>
                            <Label>Sprites (imágenes adicionales)</Label>

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
                            <HelperText>Puedes seleccionar varias imágenes. JPG/PNG ideales (&lt; 2MB c/u).</HelperText>

                            {spritePreviews.length > 0 && (
                                <SpritePreviewGrid>
                                    {spritePreviews.map((src, i) => (
                                        <SpriteThumb key={i}>
                                            <img src={src} alt={`Sprite ${i + 1}`} />
                                            <button type="button" onClick={() => removeSpriteAt(i)} aria-label="Quitar sprite">
                                                ✕
                                            </button>
                                        </SpriteThumb>
                                    ))}
                                </SpritePreviewGrid>
                            )}
                        </FormRow>

                        {/* Main image */}
                        <FormRow $full>
                            <Label>Imagen principal</Label>
                            <ImagePicker>
                                <input id="image" type="file" accept="image/*" onChange={handlePickImage} />
                                <span>Seleccionar imagen</span>
                            </ImagePicker>
                            <HelperText>Formatos recomendados: JPG/PNG. Peso ideal &lt; 2MB.</HelperText>

                            {imagePreview && (
                                <ImagePreview>
                                    <img src={imagePreview} alt="Preview" />
                                </ImagePreview>
                            )}
                        </FormRow>
                    </FormGrid>

                    <ActionsRow>
                        <GhostBtn type="button" onClick={handleCancel}>Cancelar</GhostBtn>
                        <PrimaryBtn type="submit" disabled={submitting}>{submitting ? 'Guardando…' : 'Guardar Item'}</PrimaryBtn>
                    </ActionsRow>
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
