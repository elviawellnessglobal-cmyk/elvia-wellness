const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // REQUIRED FOR RENDER
  },
});

/* ✅ VERIFY CONNECTION ON SERVER START */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email server ready");
  }
});

async function sendOrderStatusEmail(order) {
  if (!order.email) return;

  const items = order.items
    .map((i) => `${i.name} × ${i.quantity}`)
    .join(", ");

  const mailOptions = {
    from: `"KAEORN" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Your order is ${order.status}`,
    html: `
      <div style="font-family:Arial;line-height:1.6">
        <h2>Order Update</h2>
        <p>Hello <b>${order.customerName}</b>,</p>
        <p>Your order <b>#${order._id
          .toString()
          .slice(-6)
          .toUpperCase()}</b> is now:</p>
        <h3>${order.status}</h3>
        <p><b>Items:</b> ${items}</p>
        <p><b>Total:</b> ₹${order.totalAmount}</p>
        <hr/>
        <p style="font-size:12px;color:#777">
          Thank you for shopping with KAEORN
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${order.email} (${order.status})`);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
