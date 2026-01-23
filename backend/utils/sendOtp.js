const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOTPEmail(to, otp) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "KAEORN Password Reset Code",
    html: `
      <div style="font-family:Inter">
        <h2>Password Reset</h2>
        <p>Your verification code:</p>
        <h1>${otp}</h1>
        <p>Expires in 10 minutes.</p>
      </div>
    `,
  });
}

module.exports = { sendOTPEmail };
