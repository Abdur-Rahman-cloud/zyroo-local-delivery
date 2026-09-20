import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

function EditOrder() {
  const { id } = useParams();
  const { orders, updateOrder } = useOrders();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === id);

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    pickup: "",
    delivery: "",
    packageDetails: "",
    priority: "Standard",
  });

  useEffect(() => {
    if (order) {
      setForm({
        customer: order.customer,
        phone: order.phone,
        pickup: order.pickup,
        delivery: order.delivery,
        packageDetails: order.packageDetails,
        priority: order.priority,
      });
    }
  }, [order]);

  if (!order) {
    return (
      <div className="create-order">
        <h1>Order not found</h1>
        <Link to="/orders">Back to Orders</Link>
      </div>
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.customer.trim() || !form.pickup.trim() || !form.delivery.trim()) {
      alert("Please fill in customer name, pickup, and delivery address.");
      return;
    }

    updateOrder(id, form);
    navigate(`/orders/${id}`);
  }

  return (
    <div className="create-order">
      <h1>Edit Order #{order.id}</h1>
      <p>Update basic order information.</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Customer Name
          <input name="customer" value={form.customer} onChange={handleChange} />
        </label>

        <label>
          Customer Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>

        <label>
          Pickup Address
          <input name="pickup" value={form.pickup} onChange={handleChange} />
        </label>

        <label>
          Delivery Address
          <input name="delivery" value={form.delivery} onChange={handleChange} />
        </label>

        <label>
          Package Details
          <textarea
            name="packageDetails"
            value={form.packageDetails}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <label>
          Delivery Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Standard">Standard</option>
            <option value="Urgent">Urgent</option>
          </select>
        </label>

        <div className="edit-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <Link to={`/orders/${id}`} className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default EditOrder;