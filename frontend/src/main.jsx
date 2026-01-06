import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/legal/About";
import Contact from "./pages/legal/Contact";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Refund from "./pages/legal/Refund";
import Shipping from "./pages/legal/Shipping";
import Home from "./pages/Home";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<Refund />} />
            <Route path="/shipping-policy" element={<Shipping />} />
            {/* HOME / PRODUCT PAGE */}
            import Home from "./pages/Home";

            <Route path="/" element={<Home />} />
            <Route path="/product" element={<App />} />


            {/* CART (PROTECTED) */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* CHECKOUT ADDRESS (PROTECTED) */}
            <Route
              path="/checkout/address"
              element={
                <ProtectedRoute>
                  <Address />
                </ProtectedRoute>
              }
            />

            {/* PAYMENT (PROTECTED) */}
            <Route
              path="/checkout/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />

            {/* SUCCESS PAGE */}
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
