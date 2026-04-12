// src/pages/UsersPage.jsx
import { useEffect, useState } from "react";
import { userService } from "../services/userService";

const statusColor = { active: "#22c55e", inactive: "#ef4444" };
const roleColor   = { Admin: "#6366f1", Editor: "#f59e0b", Viewer: "#64748b" };

export default function UsersPage() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    userService.getAll().then((data) => { setUsers(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    await userService.delete(id);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>User Service</h2>
        <span className="badge green">● Live</span>
      </div>
      <p className="sub">Manages authentication, profiles, and roles.</p>

      {loading ? (
        <div className="loader">Loading users…</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><code>#{u.id}</code></td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="tag" style={{ background: roleColor[u.role] + "22", color: roleColor[u.role] }}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <span className="dot" style={{ color: statusColor[u.status] }}>
                    ● {u.status}
                  </span>
                </td>
                <td>
                  <button className="btn-danger" onClick={() => handleDelete(u.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
