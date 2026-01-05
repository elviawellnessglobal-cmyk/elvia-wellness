export default function Refund() {
  return (
    <div style={styles.page}>
      <h1>Refund & Cancellation Policy</h1>

      <p>
        Refunds are applicable only for damaged, defective, or incorrect
        products.
      </p>

      <p>
        Requests must be raised within 48 hours of delivery.
      </p>

      <p>
        Approved refunds are processed within 7–10 business days.
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
