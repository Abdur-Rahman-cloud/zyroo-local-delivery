import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import StatusBadge from "../components/StatusBadge";

const RIDERS = ["Hamza", "Bilal", "Zeeshan"];

function OrderDetails() {
  const { id } = useParams();
  const { orders, updateOrder, advanceStatus } = useOrders();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);

  const [selectedRider, setSelectedRider] = useState("");

  if (!order) {
    return (
      <div className="order-details">
        <h1>Order not found</h1>
        <Link to="/orders">Back to Orders</Link>
      </div>
    );
  }

  function handleAssignRider() {
    if (!selectedRider) {
      alert("Please select a rider first.");
      return;
    }
    updateOrder(order.id, { rider: selectedRider, status: "Assigned" });
    setSelectedRider("");
  }

  function handleCancelOrder() {
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (confirmed) {
      updateOrder(order.id, { status: "Cancelled" });
    }
  }

  const stages = ["Pending", "Assigned", "Accepted", "Picked Up", "In Transit", "Delivered"];
  const currentIndex = stages.indexOf(order.status);

  const canCancel = order.status !== "Delivered" && order.status !== "Cancelled";
  const canAssignRider = order.status === "Pending" || order.rider === "Not Assigned";

  return (
    <div className="order-details">
      <Link to="/orders">← Back to Orders</Link>

      <h1>Order #{order.id}</h1>
      <StatusBadge status={order.status} />

      <div className="order-info">
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Pickup:</strong> {order.pickup}</p>
        <p><strong>Delivery:</strong> {order.delivery}</p>
        <p><strong>Package:</strong> {order.packageDetails}</p>
        <p><strong>Priority:</strong> {order.priority}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Rider:</strong> {order.rider}</p>
        <p><strong>Amount:</strong> {order.amount}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>

      {order.status !== "Cancelled" ? (
  <div className="order-timeline">
    {stages.map((stage, index) => {
      const isDone = index < currentIndex;
      const isCurrent = index === currentIndex;
      return (
        <div key={stage} className="timeline-step">
          <div className={`timeline-icon ${isDone ? "done" : isCurrent ? "current" : ""}`}>
            {isDone ? "✓" : isCurrent ? "●" : "○"}
          </div>
          <span className={isDone || isCurrent ? "stage-label active" : "stage-label"}>
            {stage}
          </span>
          {index < stages.length - 1 && (
            <div className={`timeline-line ${isDone ? "done" : ""}`} />
          )}
        </div>
      );
    })}
  </div>
) : (
  <p className="cancelled-note">This order was cancelled.</p>
)}

      <div className="order-actions">
        {canAssignRider && (
          <div className="assign-rider">
            <select value={selectedRider} onChange={(e) => setSelectedRider(e.target.value)}>
              <option value="">Select a rider</option>
              {RIDERS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAssignRider}>
              Assign Rider
            </button>
          </div>
        )}

        <Link to={`/orders/${order.id}/edit`} className="btn btn-secondary">
          Edit Order
        </Link>

        {canCancel && (
          <button className="btn btn-cancel" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;