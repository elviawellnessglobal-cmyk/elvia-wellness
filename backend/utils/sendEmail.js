const nodemailer = require("nodemailer");

/* -------------------------------------------------
   CREATE TRANSPORT (GMAIL APP PASSWORD)
-------------------------------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // ✅ Gmail App Password
  },
});

/* -------------------------------------------------
   VERIFY EMAIL CONNECTION ON SERVER START
-------------------------------------------------- */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

/* -------------------------------------------------
   SEND ORDER STATUS EMAIL
-------------------------------------------------- */
async function sendOrderStatusEmail(order) {
  try {
    // ❗ SAFETY CHECK
    if (!order.email) {
      console.warn("⚠️ Order has no email, skipping email send");
      return;
    }

    const itemNames = order.items
      .map((item) => `${item.name} × ${item.quantity}`)
      .join("<br/>");

    const mailOptions = {
      from: `"KAEORN Wellness" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: `Your order is now ${order.status}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
          <h2>Order Status Update</h2>

          <p>Hello <b>${order.customerName || "Customer"}</b>,</p>

          <p>
            Your order <b>#${order._id
              .toString()
              .slice(-6)
              .toUpperCase()}</b> has been updated.
          </p>

          <p><b>Current Status:</b> ${order.status}</p>

          <p><b>Items:</b><br/>${itemNames}</p>

          <p><b>Total:</b> ₹${order.totalAmount}</p>

          <hr/>

          <p style="font-size:12px;color:#777">
            Thank you for shopping with <b>KAEORN</b> 🤍
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${order.email} (${order.status})`);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
