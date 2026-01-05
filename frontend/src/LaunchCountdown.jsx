import { useEffect, useState } from "react";

export default function LaunchCountdown() {
  const launchDate = new Date("2026-02-01T00:00:00"); // CHANGE LATER
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate - now;

      if (diff <= 0) {
        setTimeLeft("Launched");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${mins}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      margin: "40px 0",
      padding: "30px",
      border: "1px solid #e5e5e5",
      textAlign: "center",
      fontFamily: "serif"
    }}>
      <p style={{ letterSpacing: "2px", fontSize: 12 }}>
        ELVIA WELLNESS
      </p>
      <h2 style={{ margin: "10px 0" }}>Launching In</h2>
      <p style={{ fontSize: 20 }}>{timeLeft}</p>
    </div>
  );
}
