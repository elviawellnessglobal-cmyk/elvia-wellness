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
   ULTRA LUXURY EMAIL TEMPLATE (KAEORN)
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
      "Your order has been carefully prepared and dispatched. We appreciate your trust in KAEORN  — where refinement meets modern skincare.";
  }

  if (order.status === "Out for Delivery") {
    subject = "Your KAEORN order is arriving today";
    headline = "Arriving Soon";
    message =
      "Your order is currently out for delivery. Kindly ensure someone is available to receive the package.";
  }

  if (order.status === "Delivered") {
    subject = "Your KAEORN order has been delivered";
    headline = "Delivered";
    message =
      "We hope your KAEORN experience feels as refined as it was designed to be. Thank you for choosing quiet luxury.";
  }

  if (!subject) return null;

  const itemsHtml = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;color:#111;">${item.name}</td>
        <td style="padding:10px 0;text-align:right;color:#666;">× ${item.quantity}</td>
      </tr>
    `
    )
    .join("");

  return {
    subject,
    html: `
      <div style="background:#0b0b0b;padding:50px 0;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:560px;margin:auto;background:#ffffff;padding:48px;border-radius:14px;">

          <!-- BRAND HEADER -->
          <div style="text-align:center;margin-bottom:26px;">
            <h1 style="margin:0;font-weight:500;font-size:24px;letter-spacing:2px;">
              KAEORN
            </h1>
            <p style="margin:6px 0 0 0;color:#888;font-size:12px;letter-spacing:1px;">
              QUIET LUXURY SKINCARE
            </p>
          </div>

          <hr style="border:none;border-top:1px solid #eee;margin:26px 0;" />

          <!-- HEADLINE -->
          <h2 style="font-size:22px;font-weight:500;margin-bottom:12px;color:#111;">
            ${headline}
          </h2>

          <p style="color:#333;line-height:1.8;margin-bottom:18px;">
            Hello ${order.customerName || "Customer"},
          </p>

          <p style="color:#333;line-height:1.8;">
            ${message}
          </p>

          <!-- ORDER BOX -->
          <div style="background:#fafafa;border-radius:12px;padding:18px;margin:28px 0;">
            <p style="margin:0 0 6px 0;"><strong>Order ID:</strong> #${orderId}</p>
            <p style="margin:0;"><strong>Total:</strong> ₹${order.totalAmount}</p>
          </div>

          <!-- ITEMS -->
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${itemsHtml}
          </table>

          <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />

          <!-- THANK YOU SECTION -->
          <p style="font-size:14px;color:#333;line-height:1.8;">
            Thank you for being part of the KAEORN journey.
            Each product is crafted with precision, intention, and respect for your skin.
          </p>

          <!-- SOCIAL LINKS -->
          <div style="margin-top:28px;text-align:center;">
            <a href="https://www.instagram.com/kaeornwellness/" 
               style="margin:0 12px;color:#111;text-decoration:none;font-weight:500;">
               Instagram
            </a>

            <a href="https://www.youtube.com/@KAEORNWELLNESS"
               style="margin:0 12px;color:#111;text-decoration:none;font-weight:500;">
               YouTube
            </a>
          </div>

          <!-- FOOTER -->
          <p style="text-align:center;font-size:12px;color:#888;margin-top:32px;">
            © ${new Date().getFullYear()} KAEORN
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

    console.log("🖤 Ultra luxury email sent →", email);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
}

module.exports = sendOrderStatusEmail;
