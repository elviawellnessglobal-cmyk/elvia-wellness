import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductSpray from "./pages/ProductSpray";
import Chats from "./admin/Chats";

import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Success from "./pages/Success";

import About from "./components/legal/About";
import Contact from "./components/legal/Contact";
import Privacy from "./components/legal/Privacy";
import Terms from "./components/legal/Terms";
import Refund from "./components/legal/Refund";
import Shipping from "./components/legal/Shipping";

import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import Account from "./pages/Account";
import AddressBook from "./pages/AddressBook";

// import Perfume from "./pages/Perfume";
import PerfumeSoftSkin from "./pages/PerfumeSoftSkin";
import PerfumeMorningVeil from "./pages/PerfumeMorningVeil";
import PerfumeQuietWoods from "./pages/PerfumeQuietWoods";

import AdminLogin from "./admin/AdminLogin";
import Orders from "./admin/Orders";
import OrderPage from "./admin/OrderPage";
import Dashboard from "./admin/Dashboard";
import EmailAnalytics from "./admin/EmailAnalytics"; // ✅ FIXED IMPORT

import Support from "./pages/Support";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";
import ChatDetail from "./admin/ChatDetail";
import ResetPassword from "./pages/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import AdminAnalytics from "./pages/AdminAnalytics";
import './index.css'
import Loader from "./components/Loader";


/* ---------------- NAVBAR CONTROLLER ---------------- */

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
}

/* ---------------- APP ROOT ---------------- */

function AppRoot() {
useEffect(() => {
  const cr   = document.getElementById('cr');
  const cdot = document.getElementById('cd');
  if (!cr || !cdot) return;

  let mx = 0, my = 0, cx = 0, cy = 0;  // ← this was missing

  cr.style.setProperty('border-color', '#0d0c0b');
  cdot.style.setProperty('background', '#0d0c0b');

  const checkDark = () => {
    let el = document.elementFromPoint(mx, my);
    while (el) {
      const bg = getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/\d+/g);
        if (match) {
          const [r, g, b] = match.map(Number);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          const isDark = brightness < 80;
          cr.style.setProperty('border-color', isDark ? 'white' : '#0d0c0b');
          cdot.style.setProperty('background', isDark ? 'white' : '#0d0c0b');
          return;
        }
      }
      el = el.parentElement;
    }
    cr.style.setProperty('border-color', '#0d0c0b');
    cdot.style.setProperty('background', '#0d0c0b');
  };

  const onMove = e => {
    mx = e.clientX; my = e.clientY;
    cdot.style.left = mx + 'px';
    cdot.style.top  = my + 'px';
    cr.classList.add('visible');
    cdot.classList.add('visible');
    checkDark();
  };

  let raf;
  const animCursor = () => {
    cx += (mx - cx) * .12;
    cy += (my - cy) * .12;
    cr.style.left = cx + 'px';
    cr.style.top  = cy + 'px';
    raf = requestAnimationFrame(animCursor);
  };
  raf = requestAnimationFrame(animCursor);

  const onEnter = e => { if (e.target.closest('a, button, .prod-card')) cr.classList.add('grow'); };
  const onLeave = e => { if (e.target.closest('a, button, .prod-card')) cr.classList.remove('grow'); };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', onEnter);
  document.addEventListener('mouseout', onLeave);

  return () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseover', onEnter);
    document.removeEventListener('mouseout', onLeave);
    cancelAnimationFrame(raf);
  };
}, []);

  return (
    <HelmetProvider>
       {/* Cursor lives here globally */}
      <div className="cursor" id="cursorRing">
        <div className="cursor-ring" id="cr"></div>
      </div>
      <div className="cursor-dot" id="cd"></div>
    <Layout>
      <ScrollToTop />
      <Loader/>
      <Routes>
        
        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/product" element={<App />} />
        <Route path="/product/spray" element={<ProductSpray />} /> */}

        {/* ---------- PERFUME ---------- */}
        {/* <Route path="/perfume" element={<Perfume />} /> */}
        <Route path="/perfume/soft-skin" element={<PerfumeSoftSkin />} />
        <Route path="/perfume/morning-veil" element={<PerfumeMorningVeil />} />
        <Route path="/perfume/quiet-woods" element={<PerfumeQuietWoods />} />

        {/* ---------- USER ---------- */}
        <Route path="/account" element={<Account />} />
        <Route path="/addresses" element={<AddressBook />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/previous-orders" element={<MyOrders type="previous" />} />
        <Route path="/order/:id" element={<OrderDetail />} />

        {/* 🖤 EMAIL ANALYTICS */}
        <Route
          path="/admin/emails"
          element={
            <AdminProtected>
              <EmailAnalytics />
            </AdminProtected>
          }
        />


        

        {/* ---------- LEGAL ---------- */}
                <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<Success />} />




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

        {/* ---------- SUPPORT ---------- */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />

        {/* ---------- ADMIN ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/analytics" element={<AdminAnalytics />} />

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
        <Route
          path="/admin/chats"
          element={
            <AdminProtected>
              <Chats />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/chats/:id"
          element={
            <AdminProtected>
              <ChatDetail />
            </AdminProtected>
          }
        />
      </Routes>
      <Footer />
    </Layout>
    </HelmetProvider>
  );
}

/* ---------------- RENDER ---------------- */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoot />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
