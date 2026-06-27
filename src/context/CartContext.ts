"use client"

import { createContext } from "react";
import type { Product } from "@/types/products";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartContextType {
    items: CartItem[],
    addItem: (product: Product) => void,
    removeItem: (id: number) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
