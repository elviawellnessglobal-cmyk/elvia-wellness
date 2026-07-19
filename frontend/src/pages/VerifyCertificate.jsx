import { useParams, Link } from "react-router-dom";
import { certificates } from "../data/certificates";
import logo from "../../public/favicon.ico";
import styles from "../styles/certificate/VerifyCertificate.module.css";

export default function VerifyCertificate() {
  const { token } = useParams();

  const certificate = certificates.find((cert) => cert.token === token);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img src={logo} alt="KAEORN" className={styles.logo} />
          <h1 className={styles.title}>Certificate Verification</h1>
          <p className={styles.subtitle}>
            Verify the authenticity of certificates issued by KAEORN.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {certificate ? (
          <VerifiedView certificate={certificate} />
        ) : (
          <NotFoundView />
        )}
      </main>
    </div>
  );
}

function VerifiedView({ certificate }) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.statusPanel}>
        <div className={styles.badgeVerified}>
          <svg
            className={styles.badgeIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className={styles.statusHeading}>Certificate Verified</h2>
        <p className={styles.statusText}>
          This certificate has been officially issued by KAEORN.
        </p>
      </div>

      <section className={styles.infoCard} aria-label="Certificate details">
        <div className={styles.infoGrid}>
          <InfoRow label="Certificate Number" value={certificate.certificateNo} />
          <InfoRow label="Intern Name" value={certificate.name} />
          <InfoRow label="Role" value={certificate.role} />
          <InfoRow label="Internship Duration" value={certificate.duration} />
          <InfoRow label="Issue Date and Time" value={certificate.issuedAt} />
          <InfoRow label="Issued By" value={certificate.signedBy} />
          <InfoRow label="Status" value={certificate.status} highlight />
        </div>

        {certificate.technologies && certificate.technologies.length > 0 && (
          <div className={styles.techSection}>
            <h3 className={styles.techHeading}>Technologies</h3>
            <ul className={styles.chipList}>
              {certificate.technologies.map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {certificate.certificatePDF && (
          <div className={styles.downloadRow}>
            <a
              href={certificate.certificatePDF}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              Download Certificate PDF
            </a>
          </div>
        )}
      </section>

    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span
        className={
          highlight
            ? `${styles.infoValue} ${styles.infoValueHighlight}`
            : styles.infoValue
        }
      >
        {value}
      </span>
    </div>
  );
}

function NotFoundView() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.statusPanel}>
        <div className={styles.badgeError}>
          <svg
            className={styles.badgeIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className={styles.statusHeading}>Certificate Not Found</h2>
        <p className={styles.statusText}>
          The certificate you are trying to verify does not exist or has been
          removed.
        </p>
        <Link to="/" className={styles.homeButton}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
