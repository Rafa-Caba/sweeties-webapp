// This interface matches the Spring Boot 'ItemDTO.java'
export interface ItemApi {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    imagePublicId?: string;
    materials?: string[];
    size?: { alto: number; ancho: number }[];
    sprites?: string[];
    spritesPublicIds?: string[];
    isFeatured: boolean;
    isVisible: boolean;
    info: string;
    available: boolean;
}

// This is the clean type your frontend components will use
export interface Item {
    id: number;
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
    isFeatured: boolean;
}

// This mapper translates the DTO to your internal type
export function mapItemFromApi(api: ItemApi): Item {
    return {
        id: api.id,
        name: api.name,
        price: api.price,
        imageUrl: api.imageUrl,
        info: api.info ?? api.description ?? '',
        materials: api.materials ?? [],
        size: api.size ?? [],
        sprites: api.sprites ?? [],
        available: api.available ?? api.isVisible ?? true,
        imagePublicId: api.imagePublicId,
        spritesPublicIds: api.spritesPublicIds,
        isFeatured: api.isFeatured ?? false,
    };
}