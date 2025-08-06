
export interface Item {
    id: string;
    name: string;
    imageUrl: string;
    sprites: string[];
    info: string;
    materials: string[];
    size: {
        alto: number;
        ancho: number
    }[];
    price: number;
    available: boolean;
}