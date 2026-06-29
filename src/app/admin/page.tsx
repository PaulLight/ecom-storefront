'use client'

import OnlineUsersCount from '@/components/OnlineUsersCount';
import { useAdminPage } from '@/hooks/useAdminPage';

export default function AdminPage() {
    const {
        orders,
        error,
        refetch,
        isLoading,
        checking,
        totalValue,
        totalOrders
    } = useAdminPage();

    if (checking || isLoading) {
        return <p style={{ padding: "2rem" }}>Loading...</p>;
    }
    
    if (error) {
        return <p style={{ padding: "2rem", color: "red" }}>Failed to load orders: {error.message}</p>;
    }

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
          <button onClick={() => refetch()} style={{ margin: "0.5rem 0" }}>
              Refresh Orders
          </button>
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
