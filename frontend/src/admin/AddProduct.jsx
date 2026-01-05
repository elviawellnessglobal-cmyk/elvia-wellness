import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    images: "",
    isActive: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setForm({
            ...data,
            images: data.images.join(","),
          })
        );
    }
  }, [id]);

  const submit = async () => {
    const payload = {
      ...form,
      images: form.images.split(","),
      price: Number(form.price),
    };

    await fetch(
      id
        ? `http://localhost:3000/api/products/${id}`
        : "http://localhost:3000/api/products",
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    navigate("/admin/products");
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <input
        placeholder="Product name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Short description (luxury, short)"
        value={form.shortDescription}
        onChange={(e) =>
          setForm({ ...form, shortDescription: e.target.value })
        }
      />

      <textarea
        placeholder="Full description"
        rows="4"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Image URLs (comma separated)"
        value={form.images}
        onChange={(e) =>
          setForm({ ...form, images: e.target.value })
        }
      />

      <button style={styles.button} onClick={submit}>
        Save Product
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "500px",
  },
  title: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

