"use client";

import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import type { Product } from "@/types/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <button type="button" onClick={() => dispatch(addItem(product))}>
      Add to Cart
    </button>
  );
}