import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChatDetail() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/chat/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setChat)
      .catch(() => setChat(null));
  }, [id]);

  async function sendReply() {
    if (!reply.trim()) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/chat/admin/reply/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ text: reply }),
      }
    );

    const updated = await res.json();
    setChat(updated);
    setReply("");
  }

  async function markResolved() {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/chat/admin/resolve/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    const updated = await res.json();
    setChat(updated);
  }

  if (!chat) {
    return (
      <div style={{ padding: 40 }}>
        <p style={{ color: "#777" }}>
          Unable to load chat. Please check admin access.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2>Support Conversation</h2>

      <div style={styles.userInfo}>
        <strong>{chat.user?.name}</strong>
        <p>{chat.user?.email}</p>
        <small>User ID: {chat.user?._id}</small>

        <div style={styles.statusRow}>
          <span
            style={{
              ...styles.statusBadge,
              background:
                chat.status === "resolved"
                  ? "#eaf6ef"
                  : "#fff4e5",
              color:
                chat.status === "resolved"
                  ? "#1f7a4d"
                  : "#9a6b1a",
            }}
          >
            {chat.status === "resolved" ? "Resolved" : "Open"}
          </span>

          {chat.status !== "resolved" && (
            <button style={styles.resolveBtn} onClick={markResolved}>
              Mark as Resolved
            </button>
          )}
        </div>
      </div>

      <div style={styles.chatBox}>
        {Array.isArray(chat.messages) &&
          chat.messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf:
                  m.sender === "admin"
                    ? "flex-end"
                    : "flex-start",
                background:
                  m.sender === "admin"
                    ? "#111"
                    : "rgba(0,0,0,0.04)",
                color:
                  m.sender === "admin" ? "#fff" : "#111",
                borderTopRightRadius:
                  m.sender === "admin" ? 4 : 16,
                borderTopLeftRadius:
                  m.sender === "admin" ? 16 : 4,
              }}
            >
              {m.text}
            </div>
          ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
          style={styles.input}
        />
        <button style={styles.sendBtn} onClick={sendReply}>
          Reply
        </button>
      </div>
    </div>
  );
}

/* -------- STYLES -------- */

const styles = {
  page: {
    maxWidth: 720,
    margin: "40px auto",
    padding: "0 20px",
  },

  userInfo: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    background: "#fafafa",
    border: "1px solid #eee",
  },

  statusRow: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  statusBadge: {
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 500,
  },

  resolveBtn: {
    padding: "8px 14px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    fontSize: 12,
    cursor: "pointer",
  },

  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 360,
    padding: 20,
    borderRadius: 20,
    border: "1px solid #eee",
    marginBottom: 18,
  },

  msg: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: 16,
    fontSize: 14.5,
    lineHeight: 1.6,
  },

  inputRow: {
    display: "flex",
    gap: 12,
  },

  input: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    border: "1px solid #ddd",
  },

  sendBtn: {
    padding: "14px 22px",
    borderRadius: 14,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
