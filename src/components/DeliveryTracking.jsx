import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { useNotifications } from "../context/NotificationsContext";
import "./DeliveryTracking.css";

const STATUS_FLOW = ["Pending", "Assigned", "Accepted", "Picked Up", "In Transit", "Delivered"];
const STATUS_OPTIONS = ["All", ...STATUS_FLOW];

function getEta(status) {
  switch (status) {
    case "Pending": return "Awaiting rider assignment";
    case "Assigned": return "Rider assigned — pickup pending";
    case "Accepted": return "~35 minutes";
    case "Picked Up": return "~25 minutes";
    case "In Transit": return "~15 minutes";
    case "Delivered": return "Delivered";
    default: return "—";
  }
}

function formatTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function DeliveryTracking() {
  const { id } = useParams();
  const { orders, loading, error, retry } = useOrders();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [selectedId, setSelectedId] = useState(id || null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notifOpen, setNotifOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        (o.rider || "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const selected =
    orders.find((o) => o.id === (selectedId || id)) || filteredOrders[0] || orders[0];

  if (loading) return <div className="dt-wrap"><p>Loading delivery data…</p></div>;
  if (error) {
    return (
      <div className="dt-wrap">
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button className="btn" onClick={retry}>Retry</button>
      </div>
    );
  }
  if (!selected) return <div className="dt-wrap"><p>No orders to track yet.</p></div>;

  return (
    <div className="dt-wrap">
      <header className="dt-header">
        <h1>Delivery Tracking</h1>
        <div className="dt-notif-wrap">
          <button className="dt-bell" onClick={() => setNotifOpen((v) => !v)} aria-label="Notifications">
            🔔
            {unreadCount > 0 && <span className="dt-badge">{unreadCount}</span>}
          </button>
          {notifOpen && (
            <div className="dt-notif-dropdown">
              {notifications.length === 0 && <div className="dt-notif-item"><span>No notifications yet.</span></div>}
              {notifications.slice(0, 10).map((n) => (
                <div
                  key={n.id}
                  className="dt-notif-item"
                  style={{ opacity: n.read ? 0.6 : 1, cursor: "pointer" }}
                  onClick={() => markAsRead(n.id)}
                >
                  <span>{n.text}</span>
                  <small>{formatTime(n.time)}</small>
                </div>
              ))}
              {notifications.length > 0 && (
                <button className="btn" style={{ width: "100%", marginTop: 6 }} onClick={markAllAsRead}>
                  Mark all as read
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="dt-controls">
        <input
          className="dt-search"
          type="text"
          placeholder="Search by Order ID, customer, or rider..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="dt-layout">
        <div className="dt-order-list">
          {filteredOrders.map((o) => (
            <button
              key={o.id}
              className={`dt-order-item ${o.id === selected?.id ? "active" : ""}`}
              onClick={() => setSelectedId(o.id)}
            >
              <strong>{o.id}</strong>
              <span>{o.customer}</span>
              <span className={`dt-status-pill ${o.status.replace(/\s/g, "-").toLowerCase()}`}>{o.status}</span>
            </button>
          ))}
          {filteredOrders.length === 0 && <p className="dt-empty">No orders match your search/filters.</p>}
        </div>

        <div className="dt-detail">
          <div className="dt-map">
            <div className="dt-route">
              <div className="dt-route-point">
                <div className="dt-dot pickup" />
                <span>Pickup: {selected.pickup}</span>
              </div>
              <div className="dt-route-line" />
              <div className="dt-route-point">
                <div className="dt-dot rider" />
                <span>Rider: {selected.rider === "Not Assigned" ? "Not yet assigned" : selected.rider}</span>
              </div>
              <div className="dt-route-line" />
              <div className="dt-route-point">
                <div className="dt-dot delivery" />
                <span>Delivery: {selected.delivery}</span>
              </div>
            </div>
          </div>

          <div className="dt-status-row">
            <div>
              <h3>Order Status</h3>
              <span className={`dt-status-pill ${selected.status.replace(/\s/g, "-").toLowerCase()}`}>
                {selected.status}
              </span>
            </div>
            <div>
              <h3>Estimated Delivery</h3>
              <p>{getEta(selected.status)}</p>
            </div>
            <div>
              <h3>Last Updated</h3>
              <p>{formatTime(selected.lastUpdated) !== "—" ? formatTime(selected.lastUpdated) : selected.date}</p>
            </div>
          </div>

          <div className="dt-timeline">
            {STATUS_FLOW.map((step) => {
              const done = selected.statusHistory.includes(step);
              return (
                <div key={step} className={`dt-timeline-step ${done ? "done" : ""}`}>
                  <div className="dt-timeline-dot" />
                  <div>
                    <p>{step}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="dt-rider-card">
            <div className="dt-avatar">{(selected.rider || "?").charAt(0)}</div>
            <div>
              <strong>{selected.rider === "Not Assigned" ? "No rider assigned" : selected.rider}</strong>
              {selected.riderPhone && <p>{selected.riderPhone}</p>}
              <span className="dt-rider-status">{selected.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
