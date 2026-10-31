/* Captures a referral/coupon code from ANY landing URL (?coupon=, ?ref=, ?code=) and keeps it
   for 30 days so the Cart can apply it later, even if the visitor lands on a product page. */
const KEY = "pendingCoupon";
const AT_KEY = "pendingCouponAt";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function captureReferralFromUrl() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const code = (params.get("coupon") || params.get("ref") || params.get("code") || "")
      .trim()
      .toUpperCase();
    if (code && /^[A-Z0-9_-]{2,30}$/.test(code)) {
      localStorage.setItem(KEY, code);
      localStorage.setItem(AT_KEY, String(Date.now()));
    }
  } catch {
    /* storage unavailable - ignore */
  }
}

export function getPendingReferral() {
  try {
    const code = localStorage.getItem(KEY);
    if (!code) return null;
    const at = Number(localStorage.getItem(AT_KEY) || 0);
    if (at && Date.now() - at > TTL_MS) {
      clearPendingReferral();
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

export function clearPendingReferral() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(AT_KEY);
  } catch {
    /* ignore */
  }
}
