import { Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route path="/login" element={<Login />} />
        <Route path="/track" element={<TrackDelivery />} />
        <Route path="/track/:id" element={<TrackDelivery />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Business"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={["Business"]}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/create"
          element={
            <ProtectedRoute roles={["Business"]}>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute roles={["Business"]}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id/edit"
          element={
            <ProtectedRoute roles={["Business"]}>
              <EditOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rider/dashboard"
          element={
            <ProtectedRoute roles={["Rider"]}>
              <RiderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute roles={["Customer"]}>
              <CustomerOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
