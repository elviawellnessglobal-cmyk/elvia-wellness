export default function Privacy() {
  return (
    <div style={styles.page}>
      <h1>Privacy Policy</h1>

      <p>
        NÆORA WELLNESS collects personal information only for order processing
        and customer support.
      </p>

      <p>
        Payment details are securely handled by authorized payment gateways.
        We do not store card or UPI information.
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
