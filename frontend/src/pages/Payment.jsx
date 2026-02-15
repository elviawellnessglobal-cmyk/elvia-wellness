import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const address =
    JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  /* ---------------- LOAD RAZORPAY ---------------- */
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-script");
    if (existingScript) {
      existingScript.onload = () => setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () =>
      alert("Failed to load payment system.");

    document.body.appendChild(script);
  }, []);

  async function handlePay() {
    try {
      if (loading) return;

      if (!razorpayLoaded) {
        alert("Payment system loading. Please wait.");
        return;
      }

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

      setLoading(true);

      const token = localStorage.getItem("kaeorn_token");

      /* ---------------- CREATE RAZORPAY ORDER ---------------- */
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
            cartItems: cartItems.map((item) => ({
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
          }),
        }
      );

      const razorpayOrder = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          razorpayOrder.message || "Payment initialization failed"
        );
      }

      /* ---------------- OPEN CHECKOUT ---------------- */
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "KAEORN",
        description: "Secure Luxury Checkout",

        handler: async function (response) {
          try {
            /* -------- VERIFY PAYMENT -------- */
            const verifyRes = await fetch(
              `${import.meta.env.VITE_API_BASE}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && {
                    Authorization: `Bearer ${token}`,
                  }),
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    response.razorpay_order_id,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error("Payment verification failed");
            }

            /* -------- CREATE ORDER IN DB -------- */
            const saveOrder = await fetch(
              `${import.meta.env.VITE_API_BASE}/api/orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && {
                    Authorization: `Bearer ${token}`,
                  }),
                },
                body: JSON.stringify({
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
                    razorpayOrderId:
                      response.razorpay_order_id,
                    razorpayPaymentId:
                      response.razorpay_payment_id,
                  },
                }),
              }
            );

            if (!saveOrder.ok) {
              throw new Error("Order save failed");
            }

            clearCart();
            localStorage.removeItem("deliveryAddress");

            navigate("/success");
          } catch (err) {
            console.error("Post-payment error:", err);
            alert("Payment succeeded but order failed.");
            setLoading(false);
          }
        },

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: { color: "#111111" },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed.");
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>

      <div style={styles.card}>
        <p>{address.name}</p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>{address.phone}</p>
      </div>

      <h2>Total ₹{getCartTotal()}</h2>

      <button
        onClick={handlePay}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Processing..." : "Pay Securely"}
      </button>
    </div>
  );
}

const styles = {
  page: { maxWidth: 520, margin: "auto", padding: 40 },
  heading: { marginBottom: 24 },
  card: {
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 18,
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};
