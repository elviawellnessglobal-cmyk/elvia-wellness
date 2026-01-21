import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/chat/admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("kaeorn_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setChats);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Support Chats</h2>

      {chats.map((chat) => (
        <div
          key={chat._id}
          style={styles.card}
          onClick={() => navigate(`/admin/chats/${chat._id}`)}
        >
          <strong>{chat.user.name}</strong>
          <p>{chat.user.email}</p>
          <small>User ID: {chat.user._id}</small>
          <p>Messages: {chat.messages.length}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 14,
    marginBottom: 12,
    cursor: "pointer",
  },
};
