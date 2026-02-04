const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

function getCustomerEmail(order) {
  return (
    order.userEmail ||
    order.customerEmail ||
    order.user?.email ||
    order.address?.email ||
    null
  );
}

function buildEmail(order) {
  const orderId = order._id.toString().slice(-6).toUpperCase();

  let subject = "";
  let message = "";

  if (order.status === "Shipped") {
    subject = "Your KAEORN order has been shipped";
    message = "Your order is now on its way.";
  }

  if (order.status === "Out for Delivery") {
    subject = "Your KAEORN order is arriving today";
    message = "Your order is out for delivery.";
  }

  if (order.status === "Delivered") {
    subject = "Your KAEORN order has been delivered";
    message = "We hope you enjoy your order.";
  }

  return {
    subject,
    html: `
      <div style="font-family:Inter,Arial;">
        <h2>${subject}</h2>
        <p>${message}</p>
        <p>Order ID: #${orderId}</p>
        <p>Total: ₹${order.totalAmount}</p>
        <hr/>
        <p style="font-size:12px;color:#666;">KAEORN Wellness</p>
      </div>
    `,
  };
}

async function sendOrderStatusEmail(order) {
  const email = getCustomerEmail(order);
  if (!email) return;

  const emailData = buildEmail(order);
  if (!emailData.subject) return;

  await resend.emails.send({
    from: "KAEORN <support@kaeorn.com>",
    to: email,
    subject: emailData.subject,
    html: emailData.html,
  });
}

module.exports = sendOrderStatusEmail;
