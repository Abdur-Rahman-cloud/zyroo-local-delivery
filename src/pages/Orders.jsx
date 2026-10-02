import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

const PAGE_SIZE = 5;
const STATUS_OPTIONS = ["All", "Pending", "Assigned", "Accepted", "Picked Up", "In Transit", "Delivered"];

function Orders() {
  const { orders, loading, error, retry } = useOrders();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riderFilter, setRiderFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  const riders = useMemo(
    () => ["All", ...new Set(orders.map((o) => o.rider).filter((r) => r && r !== "Not Assigned"))],
    [orders]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesSearch = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesRider = riderFilter === "All" || o.rider === riderFilter;
      const matchesDate = !dateFilter || o.date === dateFilter;
      return matchesSearch && matchesStatus && matchesRider && matchesDate;
    });
  }, [orders, search, statusFilter, riderFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setRiderFilter("All");
    setDateFilter("");
    setPage(1);
  }

  function changeFilter(setter) {
    return (e) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage all delivery orders.</p>
        </div>
        {user?.role === "Business" && (
          <Link to="/orders/create" className="btn btn-primary">
            + Create Order
          </Link>
        )}
      </div>

      {/* Search & filters */}
      <div className="orders-filters" style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Search by Order ID or customer..."
          value={search}
          onChange={changeFilter(setSearch)}
          style={{ flex: 1, minWidth: 200, padding: 10 }}
        />
        <select value={statusFilter} onChange={changeFilter(setStatusFilter)} style={{ padding: 10 }}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={riderFilter} onChange={changeFilter(setRiderFilter)} style={{ padding: 10 }}>
          {riders.map((r) => (
            <option key={r} value={r}>{r === "All" ? "All Riders" : r}</option>
          ))}
        </select>
        <input type="date" value={dateFilter} onChange={changeFilter(setDateFilter)} style={{ padding: 10 }} />
        <button className="btn" onClick={clearFilters}>Clear Filters</button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading orders…</p>}

      {/* Error + retry */}
      {error && !loading && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: 14, borderRadius: 8, marginBottom: 16 }}>
          <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>
          <button className="btn" onClick={retry} style={{ marginTop: 8 }}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Pickup</th>
                  <th>Delivery</th>
                  <th>Rider</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.pickup}</td>
                    <td>{order.delivery}</td>
                    <td>{order.rider}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>{order.date}</td>
                    <td>
                      <Link to={`/orders/${order.id}`}>View</Link>
                      {user?.role === "Business" && (
                        <>
                          {" · "}
                          <Link to={`/orders/${order.id}/edit`}>Edit</Link>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p style={{ padding: 16 }}>No orders match your search or filters.</p>}
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
              <button className="btn" disabled={pageSafe <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </button>
              <span>Page {pageSafe} of {totalPages}</span>
              <button className="btn" disabled={pageSafe >= totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
