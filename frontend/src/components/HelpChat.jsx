import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function HelpChat() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

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

    const data = await res.json();
    setMessages(data.messages);
    setText("");
  }

  if (!user) return null;

  return (
    <>
      <div style={styles.fab} onClick={() => setOpen(!open)}>
        Help
      </div>

      {open && (
        <div style={styles.chatBox}>
          <h4 style={styles.header}>KAEORN Support</h4>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  alignSelf:
                    m.sender === "user" ? "flex-end" : "flex-start",
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
              placeholder="Describe your issue..."
              style={styles.input}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
