import { Link } from "react-router-dom";
import orders from "../data/orders";
import StatusBadge from "../components/StatusBadge";

function Orders() {
  return (
    <div className="orders-page">
      <h1>Orders</h1>
      <p>Manage all delivery orders.</p>

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
              <th>Action</th>
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
                <td>
                  <Link to={`/orders/${order.id}`}>
                    View
                  </Link>
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