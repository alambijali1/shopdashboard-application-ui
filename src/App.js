// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar      from "./components/Sidebar";
import Dashboard    from "./pages/Dashboard";
import UsersPage    from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage   from "./pages/OrdersPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/"         element={<Dashboard />}    />
          <Route path="/users"    element={<UsersPage />}    />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders"   element={<OrdersPage />}   />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
