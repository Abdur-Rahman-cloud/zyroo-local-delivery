import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../services/api";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const pushNotification = useCallback((text) => {
    setNotifications((prev) => {
      const next = [
        { id: Date.now() + Math.random(), text, time: new Date().toISOString(), read: false },
        ...prev,
      ].slice(0, 30);
      api.saveNotifications(next);
      return next;
    });
  }, []);

  function markAsRead(id) {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      api.saveNotifications(next);
      return next;
    });
  }

  function markAllAsRead() {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      api.saveNotifications(next);
      return next;
    });
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, pushNotification, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
