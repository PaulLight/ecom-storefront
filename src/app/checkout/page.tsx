"use client";

import { submitOrder } from './actions';
import { useAppSelector } from "@/store/hooks";

export default function CheckoutPage() {
   const items = useAppSelector((state) => state.cart.items);
    const submitOrderWithCart = submitOrder.bind(null, items)

    return (
        <form action={submitOrderWithCart} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <h1>Checkout</h1>
            <input name="name" placeholder="Full name" required />
            <input name="email" type="email" placeholder="Email" required />
            <button type="submit">Place Order</button>
        </form>
    )
}