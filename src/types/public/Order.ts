export type OrderStatus = "PENDIENTE" | "ENVIADO" | "ENTREGADO";
export type EmailStatus = "PENDING" | "SENT" | "FAILED";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    note: string | null;

    items: OrderItem[];
    total: number;
    status: OrderStatus;

    createdAt: string | null;
    updatedAt: string | null;

    emailStatus: EmailStatus;
    emailAttempts: number;
    emailLastAttemptAt: string | null;
    emailSentAt: string | null;
    emailLastError: string | null;
}

export interface TrackOrderPayload {
    orderId: string;
    email: string;
}