const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order status update email
 * @param {Object} order - Order document
 */
async function sendOrderStatusEmail(order) {
  if (!order?.email) {
    console.log("⚠️ No customer email, skipping email send");
    return;
  }

  try {
    const itemsHtml = order.items
      .map(
        (item) =>
          `<li>${item.name} × ${item.quantity}</li>`
      )
      .join("");

    const response = await resend.emails.send({
      from: "ELVIA WELLNESS <onboarding@resend.dev>", // ✅ REQUIRED (no domain)
      to: order.email,
      subject: "Update regarding your ELVIA order",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
          <h2 style="margin-bottom:10px;">Order Update</h2>

          <p>Hello <b>${order.customerName || "Customer"}</b>,</p>

          <p>
            This is a quick update regarding your order
            <b>#${order._id.toString().slice(-6).toUpperCase()}</b>.
          </p>

          <p>
            <b>Current Status:</b><br/>
            ${order.status}
          </p>

          <p><b>Items:</b></p>
          <ul>${itemsHtml}</ul>

          <p><b>Total:</b> ₹${order.totalAmount}</p>

          <hr style="margin:24px 0;" />

          <p style="font-size:13px; color:#666">
            Thank you for choosing <b>ELVIA WELLNESS</b>.
          </p>
        </div>
      `,
    });

    console.log(
      `✅ Status email sent to ${order.email}`,
      response.id
    );
  } catch (err) {
    console.error(
      "❌ Email send failed:",
      err?.message || err
    );
  }
}

module.exports = sendOrderStatusEmail;
