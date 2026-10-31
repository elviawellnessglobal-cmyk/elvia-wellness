const Order = require("../models/Order");

/*
  Keeps the influencer portal in sync with every store order that used a referral code.
  The portal call is idempotent, so we can safely call it on every status change and retry.
*/

const SYNC_STATUSES = ["Paid", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Refunded"];
const TIMEOUT_MS = 10000;

async function syncReferralOrder(orderOrId) {
  const order =
    orderOrId && orderOrId._id ? await Order.findById(orderOrId._id) : await Order.findById(orderOrId);

  if (!order || !order.couponCode) return { skipped: true };
  if (!SYNC_STATUSES.includes(order.status)) return { skipped: true };
  // Cancelled before it was ever paid: the portal never saw it, nothing to reverse.
  if (order.status === "Cancelled" && order.payment?.status !== "Paid" && !order.referralSync?.status) {
    return { skipped: true };
  }

  const baseUrl = String(process.env.INFLUENCER_API_URL || "").replace(/\/+$/, "");
  const apiKey = process.env.INFLUENCER_API_KEY;

  const fail = async (message) => {
    console.error(`❌ Referral sync failed for order ${order._id}: ${message}`);
    await Order.updateOne(
      { _id: order._id },
      { $set: { "referralSync.lastError": String(message).slice(0, 300), "referralSync.lastAttemptAt": new Date() }, $inc: { "referralSync.attempts": 1 } },
    );
    return { ok: false, error: message };
  };

  if (!baseUrl || !apiKey) return fail("INFLUENCER_API_URL / INFLUENCER_API_KEY not configured");

  const payload = {
    orderId: order._id.toString(),
    couponCode: order.couponCode,
    status: order.status,
    statusAt: (order.updatedAt || new Date()).toISOString(),
    orderedAt: order.createdAt ? order.createdAt.toISOString() : undefined,
    productName: order.items.map((i) => i.name).join(", "),
    items: order.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
    originalAmount: order.originalAmount || order.totalAmount,
    finalAmount: order.totalAmount,
    customerName: order.address?.fullName || "",
    customerEmail: order.userEmail || order.address?.email || "",
    partner: order.partner?.partnerId
      ? {
          partnerId: order.partner.partnerId,
          commissionPercent: order.partner.commissionPercent,
          discountPercent: order.partner.discountPercent,
        }
      : undefined,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${baseUrl}/api/coupon/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) return fail(data.message || `HTTP ${res.status}`);

    await Order.updateOne(
      { _id: order._id },
      {
        $set: {
          "referralSync.status": order.status,
          "referralSync.syncedAt": new Date(),
          "referralSync.lastError": null,
          // true only while commission is actually credited
          commissionRecorded: order.status === "Delivered",
        },
        $inc: { "referralSync.attempts": 1 },
      },
    );
    console.log(`✅ Referral synced: ${order._id} (${order.status}) code ${order.couponCode}`);
    return { ok: true, data: data.data };
  } catch (err) {
    return fail(err.name === "AbortError" ? "timeout" : err.message);
  } finally {
    clearTimeout(timer);
  }
}

// Fire-and-forget wrapper for request handlers
function syncReferralInBackground(orderOrId) {
  syncReferralOrder(orderOrId).catch((e) => console.error("Referral sync error:", e.message));
}

// Retries every referral order whose portal status is behind the store status
async function reconcileReferrals({ limit = 100 } = {}) {
  const orders = await Order.find({
    couponCode: { $nin: [null, ""] },
    status: { $in: SYNC_STATUSES },
    $expr: { $ne: ["$status", "$referralSync.status"] },
    $or: [{ status: { $ne: "Cancelled" } }, { "payment.status": "Paid" }],
  })
    .select("_id")
    .sort({ updatedAt: 1 })
    .limit(limit)
    .lean();

  let ok = 0;
  for (const o of orders) {
    const r = await syncReferralOrder(o._id);
    if (r.ok) ok++;
  }
  return { checked: orders.length, synced: ok };
}

function startReferralReconciler() {
  const run = () =>
    reconcileReferrals()
      .then((r) => r.checked && console.log("🔁 Referral reconcile:", r))
      .catch((e) => console.error("Referral reconcile error:", e.message));
  setTimeout(run, 30 * 1000).unref();
  setInterval(run, 10 * 60 * 1000).unref();
}

module.exports = { syncReferralOrder, syncReferralInBackground, reconcileReferrals, startReferralReconciler };
