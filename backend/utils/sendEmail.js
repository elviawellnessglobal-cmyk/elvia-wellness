const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/* -------------------------------------------------------
   Resolve Customer Email Safely
------------------------------------------------------- */
function getCustomerEmail(order) {
  return (
    order.userEmail ||
    order.customerEmail ||
    order.user?.email ||
    order.address?.email ||
    null
  );
}

/* -------------------------------------------------------
   Build Luxury Email Template
------------------------------------------------------- */
function buildEmail(order) {
  const orderId = order._id.toString().slice(-6).toUpperCase();

  let subject = "";
  let headline = "";
  let message = "";

  if (order.status === "Shipped") {
    subject = "Your KAEORN order has been shipped";
    headline = "Your order is on its way";
    message =
      "Your KAEORN order has now been carefully packed and shipped. You will receive another update once it is out for delivery.";
  }

  if (order.status === "Out for Delivery") {
    subject = "Your KAEORN order is arriving today";
    headline = "Arriving Soon";
    message =
      "Your order is out for delivery and will reach you shortly. Please ensure someone is available to receive it.";
  }

  if (order.status === "Delivered") {
    subject = "Your KAEORN order has been delivered";
    headline = "Delivered Successfully";
    message =
      "We hope you love your KAEORN experience. Thank you for choosing quiet luxury skincare.";
  }

  if (!subject) return null;

  const itemsHtml = (order.items || [])
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;">${item.name}</td>
          <td style="padding:8px 0; text-align:right;">× ${item.quantity}</td>
        </tr>
      `
    )
    .join("");

  return {
    subject,
    html: `
      <div style="background:#f7f7f7;padding:40px 0;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:560px;margin:auto;background:#ffffff;padding:40px;border-radius:12px;">

          <h1 style="font-weight:500;font-size:22px;margin-bottom:8px;">
            KAEORN Wellness
          </h1>

          <p style="color:#888;font-size:13px;margin-top:0;">
            Quiet Luxury Skincare
          </p>

          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

          <h2 style="font-size:20px;font-weight:500;margin-bottom:10px;">
            ${headline}
          </h2>

          <p style="color:#333;line-height:1.7;">
            Hello ${order.customerName || "Customer"},
          </p>

          <p style="color:#333;line-height:1.7;">
            ${message}
          </p>

          <div style="background:#fafafa;padding:16px;border-radius:10px;margin:24px 0;">
            <p style="margin:0 0 6px 0;"><strong>Order ID:</strong> #${orderId}</p>
            <p style="margin:0;"><strong>Total:</strong> ₹${order.totalAmount}</p>
          </div>

          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            ${itemsHtml}
          </table>

          <hr style="border:none;border-top:1px solid #eee;margin:28px 0;" />

          <p style="font-size:14px;color:#333;line-height:1.7;">
            Thank you for trusting KAEORN Wellness. Every product is crafted with
            intention — combining refined aesthetics with modern skincare science.
          </p>

          <div style="margin-top:24px;">
            <a href="https://www.instagram.com/kaeornwellness/" 
               style="margin-right:16px;color:#111;text-decoration:none;font-weight:500;">
               Instagram
            </a>

            <a href="https://www.youtube.com/@KAEORNWELLNESS"
               style="color:#111;text-decoration:none;font-weight:500;">
               YouTube
            </a>
          </div>

          <p style="font-size:12px;color:#888;margin-top:30px;">
            © ${new Date().getFullYear()} KAEORN Wellness
          </p>

        </div>
      </div>
    `,
  };
}

/* -------------------------------------------------------
   SEND EMAIL
------------------------------------------------------- */
async function sendOrderStatusEmail(order) {
  try {
    const email = getCustomerEmail(order);
    if (!email) return;

    const emailData = buildEmail(order);
    if (!emailData) return;

    await resend.emails.send({
      from: "KAEORN <support@kaeorn.com>",
      to: email,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log("📧 Luxury email sent →", email);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
