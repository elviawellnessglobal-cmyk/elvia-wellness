import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Support() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("open");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* LOAD CHAT (AUTO REFRESH) */
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

  /* IMAGE PICK */
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  /* SEND MESSAGE */
  async function sendMessage() {
    if (!text.trim() && !image) return;

    const formData = new FormData();
    formData.append("message", text);
    if (image) formData.append("image", image);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/chat/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kaeorn_token")}`,
        },
        body: formData,
      }
    );

    const chat = await res.json();
    setMessages(chat.messages);
    setStatus(chat.status);
    setText("");
    setImage(null);
    setPreview(null);
  }

  if (!user) return null;

  return (
    <div style={styles.page}>
      {/* ---------- INFO ---------- */}
      <div style={styles.infoCard}>
        <h2 style={styles.title}>KAEORN Support</h2>
        <p style={styles.subtitle}>
          This space is for genuine support requests only.
        </p>

        <p style={styles.note}>
          You may upload images if your product arrived damaged or incorrect.
          Please allow some time for our team to carefully review your request.
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
      </div>

      {/* ---------- CHAT ---------- */}
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
              {m.image && (
                <img
                  src={m.image}
                  alt="Proof"
                  style={styles.image}
                />
              )}
            </div>
          ))}
        </div>

        {/* ---------- PREVIEW ---------- */}
        {preview && (
          <div style={styles.previewWrap}>
            <img src={preview} alt="Preview" style={styles.preview} />
            <button
              style={styles.removeImg}
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ---------- INPUT ---------- */}
        <div style={styles.inputRow}>
          <label style={styles.attachBtn}>
            📎
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </label>

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
  page: {
    maxWidth: 640,
    margin: "40px auto",
    padding: "0 16px",
    fontFamily: "Inter, sans-serif",
  },

  infoCard: {
    border: "1px solid #eee",
    borderRadius: 22,
    padding: 24,
    marginBottom: 28,
    background: "#fafafa",
  },

  title: { fontSize: 20, fontWeight: 500 },
  subtitle: { color: "#666", marginBottom: 10 },
  note: { fontSize: 13.5, color: "#555", lineHeight: 1.6 },

  statusBadge: {
    display: "inline-block",
    marginTop: 14,
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
    minHeight: 260,
    marginBottom: 16,
  },

  msg: {
    padding: "12px 16px",
    borderRadius: 16,
    maxWidth: "78%",
    fontSize: 14.5,
    lineHeight: 1.6,
  },

  image: {
    marginTop: 8,
    maxWidth: 180,
    borderRadius: 12,
    display: "block",
  },

  previewWrap: {
    position: "relative",
    width: 120,
    marginBottom: 10,
  },

  preview: {
    width: "100%",
    borderRadius: 12,
  },

  removeImg: {
    position: "absolute",
    top: -8,
    right: -8,
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 22,
    height: 22,
    cursor: "pointer",
  },

  inputRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    position: "sticky",
    bottom: 0,
    background: "#fff",
    paddingTop: 10,
  },

  attachBtn: {
    fontSize: 20,
    cursor: "pointer",
    padding: "6px 10px",
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
