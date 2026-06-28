"use client"

import { createContext } from "react";
import type { Product } from "@/types/products";
import type { CartItem } from "@/types/cart";

export interface CartContextType {
    items: CartItem[],
    addItem: (product: Product) => void,
    removeItem: (id: number) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
