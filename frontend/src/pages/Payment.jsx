import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const address =
    JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  /* ===========================================
     LOAD RAZORPAY SCRIPT SAFELY
  =========================================== */
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function handlePay() {
    try {
      if (!cartItems || cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (
        !address.name ||
        !address.phone ||
        !address.address ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        alert("Delivery address missing");
        return;
      }

      const token = localStorage.getItem("kaeorn_token");

      /* ===========================================
         STEP 1 — CREATE RAZORPAY ORDER
      =========================================== */
      const orderRes = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            amount: getCartTotal(),
          }),
        }
      );

      const razorpayOrder = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(razorpayOrder.message || "Payment init failed");
      }

      /* ===========================================
         SAFETY CHECK — RAZORPAY LOADED
      =========================================== */
      if (typeof window === "undefined" || !window.Razorpay) {
        alert("Payment system failed to load. Please refresh page.");
        return;
      }

      /* ===========================================
         STEP 2 — OPEN CHECKOUT
      =========================================== */
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "KAEORN",
        description: "Secure Luxury Checkout",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const orderPayload = {
              items: cartItems.map((item) => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
              })),

              address: {
                fullName: address.name,
                phone: address.phone,
                street: address.address,
                city: address.city,
                state: address.state,
                postalCode: address.pincode,
                country: "India",
              },

              totalAmount: getCartTotal(),

              payment: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            };

            const saveOrder = await fetch(
              `${import.meta.env.VITE_API_BASE}/api/orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(orderPayload),
              }
            );

            const result = await saveOrder.json();

            if (!saveOrder.ok) {
              throw new Error(result.message || "Order save failed");
            }

            clearCart();
            localStorage.removeItem("deliveryAddress");
            navigate("/order-success");
          } catch (err) {
            console.error("Order Save Error:", err);
            alert("Payment completed but order saving failed.");
          }
        },

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: {
          color: "#111111",
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Unable to start payment. Try again.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>

      <div style={styles.card}>
        <h3>Delivery Address</h3>
        <p>
          {address.name}
          <br />
          {address.address}
          <br />
          {address.city}, {address.state} – {address.pincode}
          <br />
          Phone: {address.phone}
        </p>
      </div>

      <div style={styles.card}>
        <h3>Total</h3>
        <h2>₹{getCartTotal()}</h2>
      </div>

      <button style={styles.payBtn} onClick={handlePay}>
        Pay ₹{getCartTotal()}
      </button>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: { maxWidth: 520, margin: "auto", padding: 40 },
  heading: { marginBottom: 24 },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  payBtn: {
    width: "100%",
    padding: 18,
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};
