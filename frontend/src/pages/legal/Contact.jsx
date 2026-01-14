export default function Contact() {
  return (
    <div style={styles.page}>
      <h1>Contact Us</h1>

      <p><strong>Company:</strong> KAEORN WELLNESS</p>
      <p><strong>Email:</strong> support@KAEORNwellness.com</p>
      <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
      <p><strong>Address:</strong> India</p>
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
