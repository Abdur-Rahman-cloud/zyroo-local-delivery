import { Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import StatusBadge from "../components/StatusBadge";

function Orders() {
  const { orders } = useOrders();

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage all delivery orders.</p>
        </div>
        <Link to="/orders/create" className="btn btn-primary">
          + Create Order
        </Link>
      </div>

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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.pickup}</td>
                <td>{order.delivery}</td>
                <td>{order.rider}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>{order.date}</td>
                <td>
                  <Link to={`/orders/${order.id}`}>View</Link>
                  {" · "}
                  <Link to={`/orders/${order.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;