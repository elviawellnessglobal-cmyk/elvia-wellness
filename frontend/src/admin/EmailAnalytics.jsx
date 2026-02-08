import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";


export default function EmailAnalytics() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/email-logs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error("Email analytics load error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div style={styles.page}>
        <h1 style={styles.heading}>Email Analytics</h1>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Sent</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>#{log.orderId?.slice(-6)}</td>
                    <td>{log.email}</td>
                    <td>{log.status}</td>
                    <td>{log.sent ? "Yes" : "No"}</td>
                    <td>
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const styles = {
  page: {
    padding: "40px",
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
  },
  tableWrap: {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #eee",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
};
