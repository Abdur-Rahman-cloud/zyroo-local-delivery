import { useParams, Link } from "react-router-dom";
import orders from "../data/orders";
import StatusBadge from "../components/StatusBadge";

function OrderDetails() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="order-details">
        <h1>Order not found</h1>
        <Link to="/orders">Back to Orders</Link>
      </div>
    );
  }

  const stages = ["Created", "Assigned", "Picked Up", "In Transit", "Delivered"];
  const currentIndex = stages.indexOf(order.status === "Pending" ? "Created" : order.status);

  return (
    <div className="order-details">
      <Link to="/orders">← Back to Orders</Link>

      <h1>Order #{order.id}</h1>
      <StatusBadge status={order.status} />

      <div className="order-info">
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Pickup:</strong> {order.pickup}</p>
        <p><strong>Delivery:</strong> {order.delivery}</p>
        <p><strong>Rider:</strong> {order.rider}</p>
        <p><strong>Amount:</strong> {order.amount}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>

      <div className="order-timeline">
        {stages.map((stage, index) => (
          <span key={stage} className={index <= currentIndex ? "stage done" : "stage"}>
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;