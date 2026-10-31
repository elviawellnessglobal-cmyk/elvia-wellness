# Referral / commission fix - how to deploy

Copy the files in `store/` and `influencer-portal/` over your projects (same paths), then:

## 1. Environment variables (required)
- Portal backend: `STORE_API_KEY=<long random string>`  (portal rejects store calls without it)
- Store backend:  `INFLUENCER_API_KEY=<same string>`, `INFLUENCER_API_URL=https://<portal-api>`
- Store `PARTNER_MONGO_URI` must be the SAME database as the portal `MONGODB_URI`
  (store validates codes against that DB; the cart validates via the portal API).
- Store frontend: `VITE_INFLUENCER_API` = portal API URL (already used by Cart).
- Razorpay webhook: also enable the `refund.processed` event.

## 2. How it works now
| Store order status | Portal |
|---|---|
| Paid / Processing | sale recorded, commission **pending** |
| Shipped / Out for Delivery | shipped |
| Delivered | commission **credited** (withdrawable) |
| Cancelled / Refunded (after paid) | commission **reversed** |

- Every store status change (and payment verify / webhook / full refund) calls `POST /api/coupon/sync`
  (idempotent, API-key protected). Old `/apply` still works as an alias.
- Commission uses the % saved on the order at purchase time (`order.partner` snapshot), not today's rate.
- Store retries missed syncs automatically every 10 min; admin can force it:
  `POST /api/orders/referrals/resync` (admin token; body `{ "orderId": "..." }` optional).

## 3. Bugs fixed
- `/api/coupon/apply` was public: anyone could fake sales. Now key-protected, fails closed.
- Store sent orders only on Delivered, and they landed as "pending" so influencer totals stayed 0
  until someone manually confirmed each order in the portal.
- Store never saved partner snapshot / commissionAmount on orders. Now saved at checkout.
- Failed/409 syncs were never retried; deactivated influencers lost commission on earlier orders.
- Portal rate limiter (100/15min) would throttle the store's server IP; `trust proxy` was missing.
- Withdrawals ignored amounts already requested/approved (could over-withdraw); a paid withdrawal
  could be marked paid twice (double `paidOut`). Fixed.
- Referral links (`?coupon=`/`?ref=`) now persist for 30 days from any landing page and are kept
  until actually applied (previously lost if the first visit wasn't the home page).

## 4. Notes
- Partial refunds do not adjust commission (logged only).
- If a credited order is reversed after the influencer was already paid, their balance goes negative
  and is offset by future earnings.
- 3 existing festive-offer tests fail because their dates have passed (unrelated to this change).
