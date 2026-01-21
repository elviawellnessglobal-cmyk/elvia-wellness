import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Support() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("open");

  useEffect(() => {
    let interval;

    async function loadChat() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/chat/my`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("kaeorn_token")}`,
            },
          }
        );

        if (!res.ok) return;
        const chat = await res.json();

        if (chat) {
          setMessages(chat.messages || []);
          setStatus(chat.status || "open");
        }
      } catch {}
    }

    loadChat();
    interval = setInterval(loadChat, 5000);

    return () => clearInterval(interval);
  }, []);

  async function sendMessage() {
    if (!text.trim()) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/chat/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("kaeorn_token")}`,
        },
        body: JSON.stringify({ message: text }),
      }
    );

    const chat = await res.json();
    setMessages(chat.messages);
    setStatus(chat.status);
    setText("");
  }

  if (!user) return null;

  return (
    <div style={styles.page}>
      <h2>Support</h2>
      <p style={styles.sub}>
        You’re chatting as <strong>{user.name}</strong>
      </p>

      <span
        style={{
          ...styles.statusBadge,
          background:
            status === "resolved" ? "#eef7f1" : "#fff7ea",
          color:
            status === "resolved" ? "#1f7a4d" : "#9a6b1a",
        }}
      >
        {status === "resolved"
          ? "Resolved"
          : "Support in progress"}
      </span>

      <div style={styles.chatBox}>
        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf:
                  m.sender === "user" ? "flex-end" : "flex-start",
                background:
                  m.sender === "user"
                    ? "#111"
                    : "rgba(0,0,0,0.04)",
                color: m.sender === "user" ? "#fff" : "#111",
                borderTopRightRadius:
                  m.sender === "user" ? 4 : 16,
                borderTopLeftRadius:
                  m.sender === "user" ? 16 : 4,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={styles.inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            style={styles.input}
          />
          <button style={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

const styles = {
  page: { maxWidth: 520, margin: "40px auto", padding: "0 16px" },
  sub: { color: "#666", marginBottom: 10 },
  statusBadge: {
    display: "inline-block",
    marginBottom: 18,
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 500,
  },
  chatBox: {
    border: "1px solid #eee",
    borderRadius: 22,
    padding: 20,
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 280,
    marginBottom: 16,
  },
  msg: {
    padding: "12px 16px",
    borderRadius: 16,
    maxWidth: "78%",
    fontSize: 14.5,
    lineHeight: 1.6,
  },
  inputRow: {
    display: "flex",
    gap: 10,
    position: "sticky",
    bottom: 0,
    background: "#fff",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    border: "1px solid #ddd",
  },
  sendBtn: {
    padding: "12px 18px",
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
