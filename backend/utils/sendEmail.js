const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderStatusEmail(order) {
  const itemNames = order.items
    .map((item) => `${item.name} × ${item.quantity}`)
    .join(", ");

  const mailOptions = {
    from: `"KAEORN" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Your order is now ${order.status}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>Order Update</h2>
        <p>Hello <b>${order.customerName}</b>,</p>

        <p>Your order <b>#${order._id
          .toString()
          .slice(-6)
          .toUpperCase()}</b> status has been updated.</p>

        <p><b>Current Status:</b> ${order.status}</p>

        <p><b>Items:</b><br/>${itemNames}</p>

        <p><b>Total:</b> ₹${order.totalAmount}</p>

        <hr/>
        <p style="font-size:12px;color:#777">
          Thank you for shopping with KAEORN.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOrderStatusEmail;
