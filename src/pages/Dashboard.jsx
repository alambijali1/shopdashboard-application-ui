// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { userService }    from "../services/userService";
import { productService } from "../services/productService";
import { orderService }   from "../services/orderService";

const services = [
  { name: "User Service",    port: "3001", desc: "Auth · Profiles · Roles",   color: "#6366f1" },
  { name: "Product Service", port: "3002", desc: "Catalog · Pricing · Stock", color: "#f59e0b" },
  { name: "Order Service",   port: "3003", desc: "Orders · Payments · Ship",  color: "#22c55e" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([userService.getAll(), productService.getAll(), orderService.getAll()]).then(
      ([users, products, orders]) => {
        const revenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);
        setStats({ users: users.length, products: products.length, orders: orders.length, revenue });
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Service Mesh Overview</h2>
        <span className="badge green">● All Systems Operational</span>
      </div>
      <p className="sub">Real-time health and metrics across all microservices.</p>

      {loading ? <div className="loader">Aggregating data…</div> : (
        <div className="stat-grid">
          <div className="stat-card"><div className="stat-num">{stats.users}</div><div className="stat-label">Total Users</div></div>
          <div className="stat-card"><div className="stat-num">{stats.products}</div><div className="stat-label">Products</div></div>
          <div className="stat-card"><div className="stat-num">{stats.orders}</div><div className="stat-label">Orders</div></div>
          <div className="stat-card"><div className="stat-num">${stats.revenue.toLocaleString()}</div><div className="stat-label">Revenue</div></div>
        </div>
      )}

      <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontFamily: "Space Mono, monospace", fontSize: "0.85rem", letterSpacing: "0.1em", color: "var(--muted)" }}>REGISTERED SERVICES</h3>
      <div className="service-grid">
        {services.map((s) => (
          <div className="service-card" key={s.name}>
            <div className="service-dot" style={{ background: s.color }} />
            <div>
              <div className="service-name">{s.name}</div>
              <div className="service-port">localhost:{s.port}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
