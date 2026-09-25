import { useState, useMemo } from "react";
import "./DeliveryTracking.css";

// ---- Mock / simulated data (swap with real API data later) ----
const MOCK_ORDERS = [
  {
    id: "ORD-1001",
    customer: "Bilal Khan",
    rider: { name: "Usman Ali", phone: "0300-1234567", vehicle: "Honda CD70 - Red", status: "On the way" },
    pickup: "Mardan",
    delivery: "Timergara",
    riderLocation: "Chakdara",
    status: "In Transit",
    eta: "25 minutes",
    date: "2026-09-25",
    timeline: [
      { label: "Order Created", time: "10:00 AM", done: true },
      { label: "Rider Assigned", time: "10:05 AM", done: true },
      { label: "Picked Up", time: "10:20 AM", done: true },
      { label: "In Transit", time: "10:25 AM", done: true },
      { label: "Delivered", time: "--", done: false },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Ayesha Noor",
    rider: { name: "Sajid Khan", phone: "0301-9876543", vehicle: "Yamaha YBR - Black", status: "Picking up" },
    pickup: "Batkhela",
    delivery: "Dargai",
    riderLocation: "Batkhela",
    status: "Order Accepted",
    eta: "40 minutes",
    date: "2026-09-25",
    timeline: [
      { label: "Order Created", time: "11:00 AM", done: true },
      { label: "Rider Assigned", time: "11:04 AM", done: true },
      { label: "Picked Up", time: "--", done: false },
      { label: "In Transit", time: "--", done: false },
      { label: "Delivered", time: "--", done: false },
    ],
  },
  {
    id: "ORD-1003",
    customer: "Hamza Sheikh",
    rider: { name: "Fahad Iqbal", phone: "0333-5551212", vehicle: "Suzuki GD110 - Blue", status: "Delivered" },
    pickup: "Swat",
    delivery: "Mingora",
    riderLocation: "Mingora",
    status: "Delivered",
    eta: "Delivered",
    date: "2026-09-24",
    timeline: [
      { label: "Order Created", time: "09:00 AM", done: true },
      { label: "Rider Assigned", time: "09:05 AM", done: true },
      { label: "Picked Up", time: "09:20 AM", done: true },
      { label: "In Transit", time: "09:25 AM", done: true },
      { label: "Delivered", time: "09:50 AM", done: true },
    ],
  },
];

const NOTIFICATIONS = [
  { id: 1, text: "Order ORD-1001 is now In Transit", time: "5m ago" },
  { id: 2, text: "Rider Sajid Khan assigned to ORD-1002", time: "20m ago" },
  { id: 3, text: "Order ORD-1003 delivered successfully", time: "1h ago" },
];

const STATUS_OPTIONS = ["All", "Order Accepted", "In Transit", "Delivered"];

export default function DeliveryTracking() {
  const [orders] = useState(MOCK_ORDERS);
  const [selectedId, setSelectedId] = useState(MOCK_ORDERS[0].id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.rider.name.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesDate = !dateFilter || o.date === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, dateFilter]);

  const selected = orders.find((o) => o.id === selectedId) || filteredOrders[0];

  return (
    <div className="dt-wrap">
      {/* Top bar */}
      <header className="dt-header">
        <h1>Delivery Tracking</h1>
        <div className="dt-notif-wrap">
          <button className="dt-bell" onClick={() => setNotifOpen((v) => !v)} aria-label="Notifications">
            🔔
            {NOTIFICATIONS.length > 0 && <span className="dt-badge">{NOTIFICATIONS.length}</span>}
          </button>
          {notifOpen && (
            <div className="dt-notif-dropdown">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className="dt-notif-item">
                  <span>{n.text}</span>
                  <small>{n.time}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Search & filters */}
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
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </div>

      <div className="dt-layout">
        {/* Orders list */}
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

        {/* Tracking detail */}
        {selected && (
          <div className="dt-detail">
            {/* Simple simulated map / route */}
            <div className="dt-map">
              <div className="dt-route">
                <div className="dt-route-point">
                  <div className="dt-dot pickup" />
                  <span>Pickup: {selected.pickup}</span>
                </div>
                <div className="dt-route-line" />
                <div className="dt-route-point">
                  <div className="dt-dot rider" />
                  <span>Rider: {selected.riderLocation}</span>
                </div>
                <div className="dt-route-line" />
                <div className="dt-route-point">
                  <div className="dt-dot delivery" />
                  <span>Delivery: {selected.delivery}</span>
                </div>
              </div>
            </div>

            {/* Status + ETA */}
            <div className="dt-status-row">
              <div>
                <h3>Order Status</h3>
                <span className={`dt-status-pill ${selected.status.replace(/\s/g, "-").toLowerCase()}`}>
                  {selected.status}
                </span>
              </div>
              <div>
                <h3>Estimated Delivery</h3>
                <p>{selected.eta}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="dt-timeline">
              {selected.timeline.map((t, i) => (
                <div key={i} className={`dt-timeline-step ${t.done ? "done" : ""}`}>
                  <div className="dt-timeline-dot" />
                  <div>
                    <p>{t.label}</p>
                    <small>{t.time}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Rider info */}
            <div className="dt-rider-card">
              <div className="dt-avatar">{selected.rider.name.charAt(0)}</div>
              <div>
                <strong>{selected.rider.name}</strong>
                <p>{selected.rider.phone}</p>
                <p>{selected.rider.vehicle}</p>
                <span className="dt-rider-status">{selected.rider.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
