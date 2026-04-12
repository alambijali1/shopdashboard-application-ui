// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ name: "", category: "", price: "", stock: "" });
  const [adding, setAdding]     = useState(false);

  const load = () => {
    setLoading(true);
    productService.getAll().then((data) => { setProducts(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    await productService.create({ ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: "", category: "", price: "", stock: "" });
    setAdding(false);
    load();
  };

  const handleDelete = async (id) => {
    await productService.delete(id);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Product Service</h2>
        <span className="badge green">● Live</span>
      </div>
      <p className="sub">Manages catalog, pricing, and inventory.</p>

      <form className="add-form" onSubmit={handleAdd}>
        <input placeholder="Name"     value={form.name}     onChange={(e) => setForm({ ...form, name: e.target.value })}     required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input placeholder="Price"    value={form.price}    onChange={(e) => setForm({ ...form, price: e.target.value })}    type="number" required />
        <input placeholder="Stock"    value={form.stock}    onChange={(e) => setForm({ ...form, stock: e.target.value })}    type="number" required />
        <button type="submit" className="btn-primary" disabled={adding}>{adding ? "Adding…" : "+ Add"}</button>
      </form>

      {loading ? (
        <div className="loader">Loading products…</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><code>#{p.id}</code></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toLocaleString()}</td>
                <td>
                  <span style={{ color: p.stock === 0 ? "#ef4444" : p.stock < 10 ? "#f59e0b" : "#22c55e" }}>
                    {p.stock === 0 ? "Out of Stock" : p.stock}
                  </span>
                </td>
                <td>
                  <button className="btn-danger" onClick={() => handleDelete(p.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
