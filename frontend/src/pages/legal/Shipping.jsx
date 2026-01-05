export default function Shipping() {
  return (
    <div style={styles.page}>
      <h1>Shipping Policy</h1>

      <p>
        Orders are processed within 1–3 business days.
      </p>

      <p>
        Delivery timelines range from 5–10 business days across India.
      </p>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
    lineHeight: 1.8,
  },
};
