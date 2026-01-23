const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(to, otp) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your KAEORN login code",
    html: `
      <div style="font-family:Inter,Arial,sans-serif; background:#ffffff; padding:32px; color:#111">
        
        <h2 style="font-weight:500; margin-bottom:12px;">
          Welcome back to KAEORN
        </h2>

        <p style="font-size:14px; color:#555; margin-bottom:24px;">
          Use the verification code below to sign in.
        </p>

        <div style="
          font-size:32px;
          letter-spacing:6px;
          font-weight:600;
          margin-bottom:24px;
        ">
          ${otp}
        </div>

        <p style="font-size:13px; color:#777;">
          This code expires in 10 minutes.
        </p>

        <p style="font-size:12px; color:#999; margin-top:32px;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr style="margin:32px 0; border:none; border-top:1px solid #eee;" />

        <p style="font-size:11px; color:#aaa;">
          KAEORN · Quiet luxury skincare & fragrance
        </p>
      </div>
    `,
  });
}

module.exports = { sendOTPEmail };
