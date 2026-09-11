import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              Local Delivery Management
            </span>

            <h1>
              Manage Your Deliveries
              <span> Easily From One Place.</span>
            </h1>

            <p>
              ZYROO helps businesses manage orders, riders,
              and deliveries with a simple and efficient platform.
            </p>

            <div className="hero-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                Get Started
              </Link>

              <Link to="/track/DL001" className="btn btn-secondary">
                Track Delivery
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="section-heading">
            <span>WHY ZYROO</span>
            <h2>Everything You Need</h2>
            <p>
              Manage your local delivery operations from one place.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Manage Orders</h3>
              <p>
                Keep track of all delivery orders in one organized place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚴</div>
              <h3>Track Riders</h3>
              <p>
                Know which rider is assigned to each delivery.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>View Dashboard</h3>
              <p>
                Monitor your delivery performance through simple statistics.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;