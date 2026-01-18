import AdminLogin from "../admin/AdminLogin";

export default function AdminProtected({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <AdminLogin />;
}
