import { Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

function RiderDashboard() {
  const { orders, advanceStatus } = useOrders();
  const { user } = useAuth();

  const myOrders = orders.filter((o) => o.rider === user?.name);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todaysDeliveries = myOrders.filter((o) => o.date === today);
  const pendingDeliveries = myOrders.filter((o) => o.status === "Assigned");
  const activeDeliveries = myOrders.filter((o) =>
    ["Accepted", "Picked Up", "In Transit"].includes(o.status)
  );
  const completedDeliveries = myOrders.filter((o) => o.status === "Delivered");

  function handleAccept(orderId) {
    advanceStatus(orderId, "Accepted");
  }

  function handlePickedUp(orderId) {
    advanceStatus(orderId, "Picked Up");
  }

  function handleInTransit(orderId) {
    advanceStatus(orderId, "In Transit");
  }

  function handleDelivered(orderId) {
    advanceStatus(orderId, "Delivered");
  }

  function renderActionButton(order) {
    switch (order.status) {
      case "Assigned":
        return (
          <button className="btn btn-primary" onClick={() => handleAccept(order.id)}>
            Accept Delivery
          </button>
        );
      case "Accepted":
        return (
          <button className="btn btn-primary" onClick={() => handlePickedUp(order.id)}>
            Mark as Picked Up
          </button>
        );
      case "Picked Up":
        return (
          <button className="btn btn-primary" onClick={() => handleInTransit(order.id)}>
            Start Transit
          </button>
        );
      case "In Transit":
        return (
          <button className="btn btn-primary" onClick={() => handleDelivered(order.id)}>
            Mark as Delivered
          </button>
        );
      default:
        return null;
    }
  }

  function renderSection(title, list) {
    return (
      <section className="rider-section">
        <h2>{title} ({list.length})</h2>

        {list.length === 0 ? (
          <p className="empty-note">No deliveries here right now.</p>
        ) : (
          <div className="rider-order-list">
            {list.map((order) => (
              <div key={order.id} className="rider-order-card">
                <div>
                  <Link to={`/orders/${order.id}`}>
                    <strong>{order.id}</strong>
                  </Link>{" "}
                  — {order.customer}
                  <div className="rider-order-route">
                    {order.pickup} → {order.delivery}
                  </div>
                </div>

                <div className="rider-order-right">
                  <StatusBadge status={order.status} />
                  {renderActionButton(order)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="rider-dashboard">
      <h1>My Deliveries</h1>
      <p>Welcome back, {user?.name}.</p>

      {renderSection("Today's Deliveries", todaysDeliveries)}
      {renderSection("Pending Deliveries", pendingDeliveries)}
      {renderSection("Active Deliveries", activeDeliveries)}
      {renderSection("Completed Deliveries", completedDeliveries)}
    </div>
  );
}

export default RiderDashboard;