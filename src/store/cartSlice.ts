import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/products';

export interface CartIntem extends Product {
    quantity: number;
}

interface CartState {
    items: CartIntem[]
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find((item)=> item.id === action.payload.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer