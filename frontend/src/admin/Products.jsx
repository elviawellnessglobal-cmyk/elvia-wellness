import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin · Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Images</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.isActive ? "Active" : "Inactive"}</td>
                <td>{p.images?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#fafafa",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "30px",
    letterSpacing: "1px",
    fontWeight: 500,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
};
