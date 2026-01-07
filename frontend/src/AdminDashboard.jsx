

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [settings, setSettings] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });

  /* -------- FETCH DATA -------- */
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/settings")
      .then(res => res.json())
      .then(setSettings);

    fetch("http://127.0.0.1:3000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  /* -------- SETTINGS -------- */
  const updateSettings = async (updates) => {
    const res = await fetch("http://127.0.0.1:3000/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    setSettings(await res.json());
  };

  /* -------- ADD PRODUCT -------- */
  const addProduct = async () => {
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    for (let img of form.images) data.append("images", img);

    await fetch("http://127.0.0.1:3000/api/products", {
      method: "POST",
      body: data,
    });

    alert("Product added");
    window.location.reload();
  };

  if (!settings) return <p>Loading admin panel…</p>;

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: "auto" }}>
      <h1>NÆORA Admin Panel</h1>

      {/* -------- LAUNCH CONTROLS -------- */}
      <Section title="Launch Controls">
        <Row label="Enable Countdown">
          <input
            type="checkbox"
            checked={settings.launchEnabled}
            onChange={e => updateSettings({ launchEnabled: e.target.checked })}
          />
        </Row>

        <Row label="Enable Checkout">
          <input
            type="checkbox"
            checked={settings.checkoutEnabled}
            onChange={e => updateSettings({ checkoutEnabled: e.target.checked })}
          />
        </Row>

        <Row label="Launch Date">
          <input
            type="datetime-local"
            value={settings.launchDate.slice(0, 16)}
            onChange={e => updateSettings({ launchDate: e.target.value })}
          />
        </Row>
      </Section>

      {/* -------- PRODUCT MANAGEMENT -------- */}
      <Section title="Product Management">
        <input placeholder="Product Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
        <input type="file" multiple onChange={e => setForm({ ...form, images: e.target.files })} />
        <button onClick={addProduct}>Add Product</button>

        <h4 style={{ marginTop: 30 }}>Active Products</h4>
        {products.map(p => (
          <div key={p._id} style={{ borderBottom: "1px solid #eee", padding: 10 }}>
            <strong>{p.name}</strong> — ₹{p.price}
          </div>
        ))}
      </Section>
    </div>
  );
}

/* -------- REUSABLE UI -------- */
const Section = ({ title, children }) => (
  <div style={{ border: "1px solid #e5e5e5", padding: 20, marginBottom: 40 }}>
    <h2>{title}</h2>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
    <span>{label}</span>
    {children}
  </div>
);
