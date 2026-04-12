// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const links = [
  { to: "/",         label: "Dashboard", icon: "⬡" },
  { to: "/users",    label: "Users",     icon: "◈" },
  { to: "/products", label: "Products",  icon: "◉" },
  { to: "/orders",   label: "Orders",    icon: "◎" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">⬡</span>
        <span className="logo-text">MicroHub</span>
      </div>
      <nav className="nav">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="version">v1.0.0 · React</div>
        <div className="health">
          <span className="pulse" /> Mesh healthy
        </div>
      </div>
    </aside>
  );
}
