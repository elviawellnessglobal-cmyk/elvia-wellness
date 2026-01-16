const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderStatusEmail(order) {
  if (!order.email) return;

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} × ${item.quantity}</li>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: order.email,
      subject: `Your order is now ${order.status}`,
      html: `
        <div style="font-family:Arial;line-height:1.6">
          <h2>Order Update</h2>

          <p>Hi <b>${order.customerName}</b>,</p>

          <p>
            Your order <b>#${order._id
              .toString()
              .slice(-6)
              .toUpperCase()}</b>
            status has been updated.
          </p>

          <p><b>Status:</b> ${order.status}</p>

          <h4>Items</h4>
          <ul>${itemsHtml}</ul>

          <p><b>Total:</b> ₹${order.totalAmount}</p>

          <hr/>
          <p style="font-size:12px;color:#777">
            Thank you for shopping with <b>KAEORN</b>
          </p>
        </div>
      `,
    });

    console.log("✅ Status email sent to", order.email);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
