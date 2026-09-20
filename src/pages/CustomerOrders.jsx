import { Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function CustomerOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const myOrders = orders.filter((o) => o.customer === user?.name);

  const currentOrders = myOrders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );
  const previousOrders = myOrders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );

  function renderOrderCard(order) {
    return (
      <div key={order.id} className="customer-order-card">
        <div>
          <Link to={`/orders/${order.id}`}>
            <strong>{order.id}</strong>
          </Link>
          <div className="customer-order-route">
            {order.pickup} → {order.delivery}
          </div>
          <div className="customer-order-date">{order.date}</div>
        </div>

        <div className="customer-order-right">
          <StatusBadge status={order.status} />
          <Link to={`/orders/${order.id}`} className="btn btn-secondary">
            Check Status
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-orders">
      <h1>My Orders</h1>
      <p>Welcome back, {user?.name}.</p>

      <section className="customer-section">
        <h2>Current Orders ({currentOrders.length})</h2>
        {currentOrders.length === 0 ? (
          <p className="empty-note">No active orders right now.</p>
        ) : (
          <div className="customer-order-list">
            {currentOrders.map(renderOrderCard)}
          </div>
        )}
      </section>

      <section className="customer-section">
        <h2>Previous Orders ({previousOrders.length})</h2>
        {previousOrders.length === 0 ? (
          <p className="empty-note">No past orders yet.</p>
        ) : (
          <div className="customer-order-list">
            {previousOrders.map(renderOrderCard)}
          </div>
        )}
      </section>
    </div>
  );
}

export default CustomerOrders;