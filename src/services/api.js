// Central API / service layer.
// All "requests" are simulated (localStorage + artificial delay + occasional
// failure) so the rest of the app can be written exactly as if it were
// talking to a real REST API. Swap the bodies of these functions for real
// fetch() calls later without touching any component.

const BASE_DELAY = Number(import.meta.env.VITE_API_DELAY_MS) || 500;
const FAIL_RATE = 0.08; // ~1 in 12 requests simulates a network/server error

function delay(ms = BASE_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(actionLabel) {
  if (Math.random() < FAIL_RATE) {
    throw new Error(`${actionLabel} failed. Please try again.`);
  }
}

function readOrders() {
  const saved = localStorage.getItem("orders");
  return saved ? JSON.parse(saved) : [];
}

function writeOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function readNotifications() {
  const saved = localStorage.getItem("notifications");
  return saved ? JSON.parse(saved) : [];
}

function writeNotifications(list) {
  localStorage.setItem("notifications", JSON.stringify(list));
}

export const api = {
  // ---- Auth ----
  async login(name, role) {
    await delay();
    maybeFail("Login");
    // Real version: return fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {...})
    return { name, role };
  },

  // ---- Orders ----
  async getOrders() {
    await delay();
    maybeFail("Loading orders");
    return readOrders();
  },

  async createOrder(order) {
    await delay();
    maybeFail("Creating order");
    const orders = readOrders();
    writeOrders([...orders, order]);
    return order;
  },

  async updateOrder(id, changes) {
    await delay();
    maybeFail("Updating order");
    const orders = readOrders();
    const updated = orders.map((o) => (o.id === id ? { ...o, ...changes } : o));
    writeOrders(updated);
    return updated.find((o) => o.id === id);
  },

  async assignRider(id, rider, riderPhone) {
    return this.updateOrder(id, { rider, riderPhone, status: "Assigned" });
  },

  async updateDeliveryStatus(id, newStatus) {
    await delay();
    maybeFail("Updating delivery status");
    const orders = readOrders();
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: newStatus,
            statusHistory: [...o.statusHistory, newStatus],
            lastUpdated: new Date().toISOString(),
          }
        : o
    );
    writeOrders(updated);
    return updated.find((o) => o.id === id);
  },

  // ---- Notifications ----
  async getNotifications() {
    await delay(200);
    return readNotifications();
  },

  async saveNotifications(list) {
    writeNotifications(list);
    return list;
  },
};