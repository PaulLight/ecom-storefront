import type { CartItem } from './cart'

export interface Order {
    created_at: string;
    id: number;
    customer_name: string;
    customer_email: string;
    items: CartItem[];
    total: number
}