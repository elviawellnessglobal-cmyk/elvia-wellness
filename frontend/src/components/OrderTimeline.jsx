const steps = [
  "Pending",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTimeline({ status }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div style={styles.container}>
      {steps.map((step, index) => (
        <div key={step} style={styles.step}>
          <div
            style={{
              ...styles.circle,
              background:
                index <= currentIndex ? "#111" : "transparent",
              color: index <= currentIndex ? "#fff" : "#999",
              border:
                index <= currentIndex
                  ? "1px solid #111"
                  : "1px solid #ccc",
            }}
          >
            {index + 1}
          </div>

          <p
            style={{
              ...styles.label,
              color: index <= currentIndex ? "#111" : "#999",
            }}
          >
            {step}
          </p>

          {index !== steps.length - 1 && (
            <div
              style={{
                ...styles.line,
                background:
                  index < currentIndex ? "#111" : "#ddd",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "32px 0",
  },
  step: {
    flex: 1,
    textAlign: "center",
    position: "relative",
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
  },
  line: {
    position: "absolute",
    top: 16,
    left: "50%",
    width: "100%",
    height: 1,
    zIndex: -1,
  },
};
