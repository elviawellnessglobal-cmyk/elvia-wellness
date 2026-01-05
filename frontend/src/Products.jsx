import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data[0]?.images?.length) {
          setActiveImage(data[0].images[0]);
        }
      });
  }, []);

  if (products.length === 0) return null;
  const p = products[0];

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
            alt={p.name}
            style={{
              width: "100%",
              height: "460px",
              objectFit: "cover",
              borderRadius: "22px",
              marginBottom: "16px",
            }}
          />

          <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
            {p.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
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
            ELVIA WELLNESS
          </div>

          <h1 style={{ fontSize: "38px", marginBottom: "24px" }}>
            {p.name}
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#555",
              marginBottom: "32px",
            }}
          >
            {p.description}
          </p>

          <div style={{ fontSize: "20px", marginBottom: "28px" }}>
            ₹{p.price}
          </div>

          <button
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
            <a href="https://www.instagram.com/" target="_blank" style={{ color: "#000", textDecoration: "none" }}>
              Instagram →
            </a>
            <a href="https://www.youtube.com/" target="_blank" style={{ color: "#000", textDecoration: "none" }}>
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
          <li>Broad-spectrum SPF 50+ PA+++ protection against UVA & UVB rays</li>
          <li>Ultra-light, non-greasy texture suitable for daily wear</li>
          <li>No white cast — blends invisibly across all skin tones</li>
          <li>Helps prevent premature aging and sun-induced pigmentation</li>
          <li>Comfortable under makeup and suitable for sensitive skin</li>
        </ul>
      </section>

      {/* HOW TO USE */}
      <section
        style={{
          maxWidth: "900px",
          margin: "60px auto 100px",
          borderTop: "1px solid #eee",
          paddingTop: "60px",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "40px" }}>
          How to use
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
          }}
        >
          <div>
            <h4>When to use</h4>
            <p>
              Apply every morning as the final step of your skincare routine.
              Reapply every 2–3 hours when exposed to sunlight.
            </p>
          </div>

          <div>
            <h4>How much to apply</h4>
            <p>
              Use two finger lengths for face and neck to ensure optimal SPF
              coverage.
            </p>
          </div>

          <div>
            <h4>How to apply</h4>
            <p>
              Spread evenly and gently. Allow 15 minutes before sun exposure.
              Suitable for daily use and under makeup.
            </p>
          </div>
        </div>
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
