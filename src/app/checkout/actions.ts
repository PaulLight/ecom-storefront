'use server'

import { supabase } from "@/lib/supabase";
import type { CartItem } from "@/types/cart";

export async function submitOrder(cartItems: CartItem[], formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const response = await supabase.from("orders").insert({
        customer_name: name,
        customer_email: email,
        items: cartItems,
        total
    })
    
    console.log(response);
    console.log("Order received:", { name, email, cartItems });
}