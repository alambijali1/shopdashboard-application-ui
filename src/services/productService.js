// src/services/productService.js
// Simulates a Product Microservice API

const products = [
  { id: 1, name: "Laptop Pro",     category: "Electronics", price: 1299, stock: 15 },
  { id: 2, name: "Wireless Mouse", category: "Electronics", price: 29,   stock: 80 },
  { id: 3, name: "Office Chair",   category: "Furniture",   price: 350,  stock: 5  },
  { id: 4, name: "Standing Desk",  category: "Furniture",   price: 599,  stock: 0  },
  { id: 5, name: "USB-C Hub",      category: "Electronics", price: 49,   stock: 45 },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const productService = {
  getAll: async () => {
    await delay(400);
    return [...products];
  },
  getById: async (id) => {
    await delay(200);
    return products.find((p) => p.id === id) || null;
  },
  create: async (data) => {
    await delay(300);
    const newProduct = { id: Date.now(), ...data };
    products.push(newProduct);
    return newProduct;
  },
  delete: async (id) => {
    await delay(200);
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) products.splice(idx, 1);
    return { success: true };
  },
};
