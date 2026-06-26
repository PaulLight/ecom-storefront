"use client"

import { useState } from "react";
import { CartContext } from './CartContext'
import type { CartItem } from './CartContext'
import type { Product } from "@/types/products";

export default function CartProvider({ children } : { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) => item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, {...product, quantity: 1}]
        })
    }

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <CartContext.Provider value={{items, addItem, removeItem}}>
            {children}
        </CartContext.Provider>
    )
}
