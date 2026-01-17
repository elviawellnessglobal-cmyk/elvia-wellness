import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";

import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import About from "./pages/legal/About";
import Contact from "./pages/legal/Contact";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Refund from "./pages/legal/Refund";
import Shipping from "./pages/legal/Shipping";

/* -------- ADMIN -------- */
import AdminLogin from "./admin/AdminLogin";
import Orders from "./admin/Orders";
import OrderPage from "./admin/OrderPage";
import Dashboard from "./admin/Dashboard"; // ✅ ADD THIS

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";

/* -------- ADMIN PROTECTION -------- */
function AdminProtected({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <AdminLogin />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ---------- PUBLIC ---------- */}
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<App />} />
            <Route path="/my-orders" element={<MyOrders />} />
<Route path="/previous-orders" element={<MyOrders type="previous" />} />
<Route path="/order/:id" element={<OrderDetail />} />


            {/* ---------- LEGAL ---------- */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/shipping" element={<Shipping />} />

            {/* ---------- CART ---------- */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/address"
              element={
                <ProtectedRoute>
                  <Address />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* ---------- ADMIN ---------- */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <AdminProtected>
                  <Dashboard />
                </AdminProtected>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminProtected>
                  <Orders />
                </AdminProtected>
              }
            />

            <Route
              path="/admin/orders/:id"
              element={
                <AdminProtected>
                  <OrderPage />
                </AdminProtected>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
