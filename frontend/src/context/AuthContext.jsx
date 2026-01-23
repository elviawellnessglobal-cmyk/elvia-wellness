async function requestOTP(email) {
  await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

async function verifyOTP(email, otp) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/api/auth/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  localStorage.setItem("kaeorn_token", data.token);
  localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
  setUser(data.user);
}
