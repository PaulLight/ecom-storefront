"use client";

import Link from "next/link";
import { removeItem } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function CartPage() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.items);
    
    if (items.length === 0) { 
        return <p style={{ padding: "2rem" }}>Your cart is empty.</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Your Cart</h1>
            {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <img src={item.image} alt={item.title} width={60} />
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
            ))}
            <Link href="/checkout">Checkout</Link>
      </div>
    )
}

export default CartPage
