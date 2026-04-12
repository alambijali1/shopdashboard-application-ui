// src/services/orderService.js
// Simulates an Order Microservice API

const orders = [
  { id: 1001, userId: 1, productId: 1, quantity: 1, status: "delivered", total: 1299, date: "2024-01-10" },
  { id: 1002, userId: 2, productId: 2, quantity: 3, status: "shipped",   total: 87,   date: "2024-01-12" },
  { id: 1003, userId: 1, productId: 5, quantity: 2, status: "pending",   total: 98,   date: "2024-01-14" },
  { id: 1004, userId: 4, productId: 3, quantity: 1, status: "cancelled", total: 350,  date: "2024-01-15" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const orderService = {
  getAll: async () => {
    await delay(400);
    return [...orders];
  },
  getByUserId: async (userId) => {
    await delay(300);
    return orders.filter((o) => o.userId === userId);
  },
  create: async (data) => {
    await delay(300);
    const newOrder = { id: Date.now(), date: new Date().toISOString().split("T")[0], ...data };
    orders.push(newOrder);
    return newOrder;
  },
  updateStatus: async (id, status) => {
    await delay(200);
    const order = orders.find((o) => o.id === id);
    if (order) order.status = status;
    return order;
  },
};
