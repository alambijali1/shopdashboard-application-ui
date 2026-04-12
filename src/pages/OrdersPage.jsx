// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";

const statusStyles = {
  delivered: { bg: "#22c55e22", color: "#22c55e" },
  shipped:   { bg: "#3b82f622", color: "#3b82f6" },
  pending:   { bg: "#f59e0b22", color: "#f59e0b" },
  cancelled: { bg: "#ef444422", color: "#ef4444" },
};

export default function OrdersPage() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    orderService.getAll().then((data) => { setOrders(data); setLoading(false); });
  };

  useEffect(load, []);

  const cycleStatus = async (order) => {
    const cycle = ["pending", "shipped", "delivered", "cancelled"];
    const next   = cycle[(cycle.indexOf(order.status) + 1) % cycle.length];
    await orderService.updateStatus(order.id, next);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Order Service</h2>
        <span className="badge green">● Live</span>
      </div>
      <p className="sub">Manages order lifecycle, payments, and fulfillment.</p>

      {loading ? (
        <div className="loader">Loading orders…</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>User</th><th>Product</th><th>Qty</th><th>Total</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const s = statusStyles[o.status] || {};
              return (
                <tr key={o.id}>
                  <td><code>#{o.id}</code></td>
                  <td><code>User #{o.userId}</code></td>
                  <td><code>Prod #{o.productId}</code></td>
                  <td>{o.quantity}</td>
                  <td>${o.total.toLocaleString()}</td>
                  <td>{o.date}</td>
                  <td>
                    <button
                      className="tag"
                      style={{ background: s.bg, color: s.color, border: "none", cursor: "pointer" }}
                      title="Click to advance status"
                      onClick={() => cycleStatus(o)}
                    >
                      {o.status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
