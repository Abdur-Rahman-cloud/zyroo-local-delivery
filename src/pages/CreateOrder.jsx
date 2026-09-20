import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

function CreateOrder() {
  const { addOrder, orders } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    pickup: "",
    delivery: "",
    packageDetails: "",
    priority: "Standard",
    paymentMethod: "Cash on Delivery",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.customer.trim() || !form.pickup.trim() || !form.delivery.trim()) {
      alert("Please fill in customer name, pickup, and delivery address.");
      return;
    }

    const nextNumber = orders.length + 1;
    const newId = `DL${String(nextNumber).padStart(3, "0")}`;

    const newOrder = {
      id: newId,
      customer: form.customer,
      phone: form.phone,
      pickup: form.pickup,
      delivery: form.delivery,
      packageDetails: form.packageDetails,
      priority: form.priority,
      paymentMethod: form.paymentMethod,
      rider: "Not Assigned",
      riderPhone: "",
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      amount: "Rs. 0",
      statusHistory: ["Pending"],
    };

    addOrder(newOrder);
    navigate("/orders");
  }

  return (
    <div className="create-order">
      <h1>Create Order</h1>
      <p>Add a new delivery order.</p>

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

        <label>
          Payment Method
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </label>

        <button type="submit" className="btn btn-primary">Create Order</button>
      </form>
    </div>
  );
}

export default CreateOrder;