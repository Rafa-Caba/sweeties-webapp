export interface CheckoutItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CheckoutData {
    name: string;
    email: string;
    phone: string;
    note?: string | null;
    items: CheckoutItem[];
    total: number;
}

export interface GuestInfo {
    name: string;
    email: string;
    phone: string;
    note?: string | null;
}