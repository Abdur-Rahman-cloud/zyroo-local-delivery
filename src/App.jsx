import { Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import TrackDelivery from "./pages/TrackDelivery";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/track" element={<TrackDelivery />} />
        <Route path="/track/:id" element={<TrackDelivery />} />
      </Routes>
    </>
  );
}

export default App;