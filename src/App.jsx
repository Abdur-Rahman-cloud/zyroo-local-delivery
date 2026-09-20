import { Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import TrackDelivery from "./pages/TrackDelivery";
import Login from "./pages/Login";
import EditOrder from "./pages/EditOrder";
import CreateOrder from "./pages/CreateOrder";
import RiderDashboard from "./pages/RiderDashboard";
import CustomerOrders from "./pages/CustomerOrders";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/track" element={<TrackDelivery />} />
        <Route path="/track/:id" element={<TrackDelivery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders/:id/edit" element={<EditOrder />} />
        <Route path="/rider/dashboard" element={<RiderDashboard />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
      </Routes>
    </>
  );
}

export default App;