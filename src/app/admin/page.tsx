'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types/order'
import OnlineUsersCount from '@/components/OnlineUsersCount'

export default function AdminPage() {
    const [checking, setChecking] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    useEffect(
        function redirectAfterLoggIn() {
            supabase.auth.getSession().then(({ data }) => {
                if (!data.session) {
                    router.push("/admin/login");
                } else {
                    setChecking(false);
                }
            });
    }, [router])


    useEffect(
        function getAllOrders() {
            if (checking) return;

            supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })
                .then(({ data, error }) => {
                    if (error) {
                        console.error("Failed to fetch orders:", error.message);
                    } else {
                        setOrders(data);
                    }
                    setLoading(false);
                })            
    }, [checking])

    if (checking || loading) {
        return <p style={{ padding: "2rem" }}>Loading...</p>;
    }

    const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    return (
        <div style={{ padding: "2rem" }}>
          <h1>Admin Dashboard</h1>
          <OnlineUsersCount />
    
          <div style={{ display: "flex", gap: "2rem", margin: "1.5rem 0" }}>
            <div>
              <strong>{totalOrders}</strong> total orders
            </div>
            <div>
              <strong>${totalValue.toFixed(2)}</strong> total revenue
            </div>
          </div>
    
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Date</th>
                <th style={{ textAlign: "left" }}>Customer</th>
                <th style={{ textAlign: "left" }}>Email</th>
                <th style={{ textAlign: "left" }}>Items</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_email}</td>
                  <td>{order.items.map((i) => `${i.title} (x${i.quantity})`).join(", ")}</td>
                  <td style={{ textAlign: "right" }}>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}