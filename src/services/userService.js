// src/services/userService.js
// Simulates a User Microservice API

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob Smith",    email: "bob@example.com",   role: "Editor", status: "active" },
  { id: 3, name: "Carol White",  email: "carol@example.com", role: "Viewer", status: "inactive" },
  { id: 4, name: "Dan Brown",    email: "dan@example.com",   role: "Editor", status: "active" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const userService = {
  getAll: async () => {
    await delay(400);
    return [...users];
  },
  getById: async (id) => {
    await delay(200);
    return users.find((u) => u.id === id) || null;
  },
  create: async (data) => {
    await delay(300);
    const newUser = { id: Date.now(), ...data };
    users.push(newUser);
    return newUser;
  },
  delete: async (id) => {
    await delay(200);
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) users.splice(idx, 1);
    return { success: true };
  },
};
