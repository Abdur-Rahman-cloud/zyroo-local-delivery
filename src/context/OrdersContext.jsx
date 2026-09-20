import { createContext, useContext, useState, useEffect } from "react";
import initialOrders from "../data/orders";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function updateOrder(id, changes) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, ...changes } : order
      )
    );
  }

  function addOrder(newOrder) {
    setOrders((prev) => [...prev, newOrder]);
  }

  function advanceStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
              statusHistory: [...order.statusHistory, newStatus],
            }
          : order
      )
    );
  }

  return (
    <OrdersContext.Provider value={{ orders, updateOrder, addOrder, advanceStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}