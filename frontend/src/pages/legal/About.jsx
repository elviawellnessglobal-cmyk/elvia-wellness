export default function About() {
  return (
    <div style={styles.page}>
      <h1>About KAEORN WELLNESS</h1>

      <p>
        KAEORN WELLNESS is a premium skincare and wellness brand committed to
        delivering high-quality, thoughtfully formulated products.
      </p>

      <p>
        We blend modern dermatological science with refined aesthetics to create
        safe, effective, and luxurious skincare.
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
