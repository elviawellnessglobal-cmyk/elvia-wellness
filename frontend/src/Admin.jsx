import { useState } from "react";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  function logout() {
    localStorage.removeItem("adminToken");
    setToken(null);
  }

  async function addProduct(e) {
    e.preventDefault();

    await fetch("http://127.0.0.1:3000/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    alert("Product added successfully");

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  }

  if (!token) {
    return (
      <div style={{ padding: "60px" }}>
        <h1>ELVIA Admin</h1>
        <p>Please login again.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px", maxWidth: "600px" }}>
      <h1>ELVIA Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <h2 style={{ marginTop: "40px" }}>Add Product</h2>

      <form onSubmit={addProduct}>
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <br /><br />

        <button>Add Product</button>
      </form>
    </div>
  );
}
