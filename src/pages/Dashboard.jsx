import orders from "../data/orders";
import StatCard from "../components/StatCard";

function Dashboard() {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const inTransitOrders = orders.filter(
    (order) => order.status === "In Transit"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">OVERVIEW</span>

          <h1>Dashboard</h1>

          <p>
            Monitor your delivery operations and order activity.
          </p>
        </div>

        <div className="dashboard-date">
          📅 September 11, 2026
        </div>
      </div>

      <div className="stats-grid">

        <StatCard
          icon="📦"
          title="Total Orders"
          value={totalOrders}
          description="All delivery orders"
        />

        <StatCard
          icon="⏳"
          title="Pending Orders"
          value={pendingOrders}
          description="Waiting for processing"
        />

        <StatCard
          icon="🚚"
          title="In Delivery"
          value={inTransitOrders}
          description="Currently on the way"
        />

        <StatCard
          icon="✓"
          title="Completed"
          value={completedOrders}
          description="Successfully delivered"
        />

      </div>

    </main>
  );
}

export default Dashboard;