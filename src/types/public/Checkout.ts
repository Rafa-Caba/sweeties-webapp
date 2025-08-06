
export interface CheckoutData {
    name: string;
    email: string;
    phone: string;
    note?: string;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    total: number;
}

export interface GuestInfo {
    name: string;
    email: string;
    phone: string;
    note?: string;
}