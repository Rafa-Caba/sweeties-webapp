
export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    createdAt: string;
    status: 'pendiente' | 'enviado' | 'entregado';
    items: OrderItem[];
    total: number;
}