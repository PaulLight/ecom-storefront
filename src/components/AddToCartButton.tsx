"use client";

import useCart from '@/context/useCart'
import type { Product } from '@/types/products'

function AddToCartButton({ product } : { product: Product}) {
    const { addItem } = useCart() 
    return (
        <button type="button" onClick={() => {
            console.log(product)
            addItem(product)
        }}>
            Add to Cart
        </button>
    )
}

export default AddToCartButton;
