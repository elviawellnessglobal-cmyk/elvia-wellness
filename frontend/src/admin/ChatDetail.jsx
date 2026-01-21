import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ChatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [reply, setReply] = useState("");
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    let interval;

    async function loadChat() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/chat/admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        if (!res.ok) return;
        const data = await res.json();
        setChat(data);
      } catch {}
    }

    loadChat();
    interval = setInterval(loadChat, 5000);
    return () => clearInterval(interval);
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

  async function deleteChat() {
    if (!window.confirm("Delete this chat permanently?")) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/chat/admin/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }
    );

    if (res.ok) navigate("/admin/chats");
  }

  if (!chat) return null;

  return (
    <div style={styles.page}>
      <h2>Support Conversation</h2>

      <div style={styles.userInfo}>
        <strong>{chat.user?.name}</strong>
        <p>{chat.user?.email}</p>

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
              Mark Resolved
            </button>
          )}

          {chat.status === "resolved" && (
            <button style={styles.deleteBtn} onClick={deleteChat}>
              Delete Chat
            </button>
          )}
        </div>
      </div>

      <div style={styles.chatBox}>
        {chat.messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf:
                m.sender === "admin" ? "flex-end" : "flex-start",
              background:
                m.sender === "admin"
                  ? "#111"
                  : "rgba(0,0,0,0.04)",
              color: m.sender === "admin" ? "#fff" : "#111",
            }}
          >
            {m.text}
            {m.image && (
              <img
                src={m.image}
                alt=""
                style={styles.image}
                onClick={() => setZoomImg(m.image)}
              />
            )}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type reply…"
          style={styles.input}
        />
        <button style={styles.sendBtn} onClick={sendReply}>
          Reply
        </button>
      </div>

      {zoomImg && (
        <div style={styles.modal} onClick={() => setZoomImg(null)}>
          <img src={zoomImg} alt="" style={styles.modalImg} />
        </div>
      )}
    </div>
  );
}

/* STYLES */
const styles = {
  page: { maxWidth: 720, margin: "40px auto", padding: "0 20px" },
  userInfo: {
    padding: 16,
    borderRadius: 16,
    background: "#fafafa",
    border: "1px solid #eee",
    marginBottom: 20,
  },
  statusRow: { marginTop: 12, display: "flex", gap: 12 },
  statusBadge: { padding: "6px 14px", borderRadius: 999, fontSize: 12 },
  resolveBtn: {
    padding: "8px 14px",
    borderRadius: 12,
    background: "#111",
    color: "#fff",
    border: "none",
  },
  deleteBtn: {
    padding: "8px 14px",
    borderRadius: 12,
    border: "1px solid #8b1e1e",
    color: "#8b1e1e",
    background: "transparent",
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
  },
  image: {
    marginTop: 8,
    maxWidth: 160,
    borderRadius: 12,
    cursor: "zoom-in",
  },
  inputRow: { display: "flex", gap: 12 },
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
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalImg: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: 18,
  },
};
