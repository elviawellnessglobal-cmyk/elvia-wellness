import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/products`
        );
        const data = await res.json();

        setProducts(data);

        if (data?.[0]?.images?.length) {
          setActiveImage(data[0].images[0]);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      }
    }

    loadProducts();
  }, []);

  if (!products.length) return null;

  const product = products[0];

  return (
    <div style={{ padding: "0 20px" }}>
      {/* PRODUCT */}
      <section
        className="product-grid"
        style={{
          maxWidth: "1100px",
          margin: "100px auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
        }}
      >
        {/* IMAGES */}
        <div>
          <img
            src={activeImage}
            alt={product.name}
            style={{
              width: "100%",
              height: "460px",
              objectFit: "cover",
              borderRadius: "22px",
              marginBottom: "16px",
            }}
          />

          <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                alt=""
                style={{
                  width: "90px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  cursor: "pointer",
                  border:
                    activeImage === img
                      ? "2px solid #000"
                      : "1px solid #ddd",
                  opacity: activeImage === img ? 1 : 0.6,
                }}
              />
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "3px",
              color: "#888",
              marginBottom: "20px",
            }}
          >
            KAEORN WELLNESS
          </div>

          <h1 style={{ fontSize: "38px", marginBottom: "24px" }}>
            {product.name}
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#555",
              marginBottom: "32px",
            }}
          >
            {product.description}
          </p>

          <div style={{ fontSize: "20px", marginBottom: "28px" }}>
            ₹{product.price}
          </div>

          <button
            onClick={() =>
              addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1,
              })
            }
            style={{
              padding: "14px 36px",
              borderRadius: "40px",
              border: "1px solid #000",
              background: "transparent",
              fontSize: "14px",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>

          {/* SOCIAL */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              gap: "20px",
              fontSize: "14px",
            }}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Instagram →
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000", textDecoration: "none" }}
            >
              YouTube →
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        style={{
          maxWidth: "900px",
          margin: "80px auto",
          borderTop: "1px solid #eee",
          paddingTop: "60px",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "36px" }}>
          Benefits
        </h2>

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "32px",
            listStyle: "none",
            padding: 0,
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          <li>Broad-spectrum SPF 50+ PA+++ protection</li>
          <li>Ultra-light, non-greasy texture</li>
          <li>No white cast — blends invisibly</li>
          <li>Prevents sun-induced pigmentation</li>
          <li>Suitable for sensitive skin</li>
        </ul>
      </section>

      {/* RESPONSIVE */}
      <style>
        {`
          @media (max-width: 768px) {
            .product-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}
