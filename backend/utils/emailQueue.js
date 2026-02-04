const EmailLog = require("../models/EmailLog");
const sendEmailDirect = require("./sendEmail");

/**
 * ENTERPRISE EMAIL QUEUE
 * Logs email + sends safely
 */
async function queueOrderEmail(order) {
  try {
    const email =
      order.userEmail ||
      order.customerEmail ||
      order.user?.email ||
      order.address?.email;

    if (!email) {
      console.log("⚠️ No email found for queue");
      return;
    }

    const subject = `Order Update - ${order.status}`;

    // Create log entry
    const log = await EmailLog.create({
      orderId: order._id,
      email,
      status: order.status,
      subject,
      sent: false,
    });

    // Send email
    await sendEmailDirect(order);

    log.sent = true;
    await log.save();

    console.log("📨 Enterprise email success:", email);
  } catch (err) {
    console.error("❌ Enterprise email error:", err.message);
  }
}

module.exports = queueOrderEmail;
