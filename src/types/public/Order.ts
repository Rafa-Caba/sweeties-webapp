export type OrderStatus = 'PENDIENTE' | 'ENVIADO' | 'ENTREGADO';

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    note?: string;
    items: OrderItem[];
    total: number;
    status: 'PENDIENTE' | 'ENVIADO' | 'ENTREGADO'; // Enum matching Java
    createdAt: string; // ISO Date string
    updatedAt: string;
}