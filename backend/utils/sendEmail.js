const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderStatusEmail(order) {
  if (!order.email) return;

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} × ${item.quantity} — ₹${item.price}</li>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: order.email,
      subject: `Your order is now ${order.status}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px">
          <h2>Order Update</h2>

          <p>Hello <b>${order.customerName}</b>,</p>

          <p>
            Your order <b>#${order._id
              .toString()
              .slice(-6)
              .toUpperCase()}</b>
            is now <b>${order.status}</b>.
          </p>

          <h4>Items</h4>
          <ul>${itemsHtml}</ul>

          <p><b>Total:</b> ₹${order.totalAmount}</p>

          <hr />
          <p style="font-size:12px;color:#777">
            Thank you for shopping with KAEORN 🤍
          </p>
        </div>
      `,
    });

    console.log("✅ Status email sent to", order.email);
  } catch (err) {
    console.error("❌ Resend email failed:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
