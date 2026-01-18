import { useEffect, useState } from "react";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({});
  const token = localStorage.getItem("kaeorn_token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAddresses);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function addAddress() {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/addresses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, isDefault: true }),
      }
    );

    const data = await res.json();
    setAddresses(data);
    setForm({});
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Saved Addresses</h2>

      {addresses.map((a, i) => (
        <div key={i} style={styles.card}>
          <p><b>{a.fullName}</b></p>
          <p>{a.street}</p>
          <p>{a.city}, {a.state} – {a.postalCode}</p>
          <p>{a.phone}</p>
        </div>
      ))}

      <h3 style={{ marginTop: 30 }}>Add New Address</h3>

      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="street" placeholder="Street" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />

      <button onClick={addAddress} style={styles.btn}>
        Save Address
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  btn: {
    marginTop: 16,
    padding: 14,
    borderRadius: 30,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};
