import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import initialOrders from "../data/orders";
import { api } from "../services/api";
import { useNotifications } from "./NotificationsContext";

const OrdersContext = createContext();

const STATUS_FLOW = ["Pending", "Assigned", "Accepted", "Picked Up", "In Transit", "Delivered"];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pushNotification } = useNotifications();

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await api.getOrders();
      if (data.length === 0) {
        localStorage.setItem("orders", JSON.stringify(initialOrders));
        data = initialOrders;
      }
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  async function addOrder(newOrder) {
    try {
      await api.createOrder(newOrder);
      setOrders((prev) => [...prev, newOrder]);
      pushNotification(`New order ${newOrder.id} created`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateOrder(id, changes) {
    try {
      const updated = await api.updateOrder(id, changes);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setError(err.message);
    }
  }

  // Optimistic: UI updates instantly, rolls back if the simulated request fails
  async function assignRider(id, rider, riderPhone) {
    const prevOrders = orders;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, rider, riderPhone, status: "Assigned" } : o))
    );
    try {
      await api.assignRider(id, rider, riderPhone);
      pushNotification(`Rider ${rider} assigned to order ${id}`);
    } catch (err) {
      setOrders(prevOrders);
      setError(err.message);
    }
  }

  // Optimistic: same pattern, used by Rider status updates and simulated real-time ticks
  async function advanceStatus(id, newStatus) {
    const prevOrders = orders;
    const timestamp = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: newStatus, statusHistory: [...o.statusHistory, newStatus], lastUpdated: timestamp }
          : o
      )
    );
    try {
      await api.updateDeliveryStatus(id, newStatus);
      pushNotification(`Order ${id} is now ${newStatus}`);
    } catch (err) {
      setOrders(prevOrders);
      setError(`Failed to update order ${id}: ${err.message}`);
    }
  }

  // --- Simulated real-time delivery updates ---
  // Every ~12s, nudge one random in-progress order to its next status.
  // This stands in for a WebSocket/SSE feed: components re-render automatically
  // because they read `orders` from this same context.
  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  useEffect(() => {
    const interval = setInterval(() => {
      const current = ordersRef.current;
      const inProgress = current.filter(
        (o) => o.status !== "Delivered" && o.status !== "Pending"
      );
      if (inProgress.length === 0) return;
      const target = inProgress[Math.floor(Math.random() * inProgress.length)];
      const idx = STATUS_FLOW.indexOf(target.status);
      const next = STATUS_FLOW[idx + 1];
      if (next) advanceStatus(target.id, next);
    }, 12000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, error, addOrder, updateOrder, assignRider, advanceStatus, retry: loadOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
