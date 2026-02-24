
export type Size = { alto: number | null; ancho: number | null };

export interface ItemApi {
    id: string;
    name: string;
    description: string;
    price: number;

    imageUrl: string;
    imagePublicId: string | null;

    materials: string[];
    size: Size[];

    sprites: string[];
    spritesPublicIds: string[];

    isFeatured: boolean;
    isVisible: boolean;

    info?: string;
    available?: boolean;
}

export interface Item {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    isFeatured: boolean;
    isVisible: boolean;
}

export const mapItemFromApi = (item: ItemApi): Item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    imageUrl: item.imageUrl,
    isFeatured: item.isFeatured,
    isVisible: item.isVisible,
});

/**
 * Optional helper for edit forms:
 * Keeps null-safe defaults so inputs don't accidentally send empty strings.
 */
export const normalizeItemApiForForm = (item: ItemApi): ItemApi => ({
    ...item,
    imagePublicId: item.imagePublicId ?? null,
    materials: Array.isArray(item.materials) ? item.materials : [],
    size: Array.isArray(item.size) ? item.size : [],
    sprites: Array.isArray(item.sprites) ? item.sprites : [],
    spritesPublicIds: Array.isArray(item.spritesPublicIds) ? item.spritesPublicIds : [],
    info: item.info ?? "",
    available: item.available ?? true,
});