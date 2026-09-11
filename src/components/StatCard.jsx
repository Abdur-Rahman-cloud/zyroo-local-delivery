function StatCard({ title, value, icon, description }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{value}</p>

      <div className="stat-description">
        {description}
      </div>
    </div>
  );
}

export default StatCard;