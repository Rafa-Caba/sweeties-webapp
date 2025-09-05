// types/items.ts
export interface ItemApi {
    _id: string;
    name: string;
    description?: string;
    info?: string;
    price: number;
    imageUrl: string;
    imagePublicId?: string;
    materials?: string[];
    size?: { alto: number; ancho: number }[];
    sprites?: string[];
    spritesPublicIds?: string[];
    isFeatured?: boolean;
    isVisible?: boolean;
    available?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Item {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    info: string;
    materials: string[];
    size: { alto: number; ancho: number }[];
    sprites: string[];
    available: boolean;
    imagePublicId?: string;
    spritesPublicIds?: string[];
    isFeatured?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export function mapItemFromApi(api: ItemApi): Item {
    return {
        _id: api._id,
        name: api.name,
        price: api.price,
        imageUrl: api.imageUrl,
        info: api.info ?? api.description ?? '',
        materials: api.materials ?? [],
        size: api.size ?? [],
        sprites: api.sprites ?? [],
        available:
            typeof api.available === 'boolean'
                ? api.available
                : (typeof api.isVisible === 'boolean' ? api.isVisible : true),
        imagePublicId: api.imagePublicId,
        spritesPublicIds: api.spritesPublicIds,
        isFeatured: api.isFeatured,
        createdAt: api.createdAt,
        updatedAt: api.updatedAt,
    };
}
