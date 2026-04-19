import "../../styles/Policy/Policy.css";

export default function PolicyLayout({ title, eyebrow, children }) {
  return (
    <div className="policy-container">
      <div className="policy-content">
        {eyebrow && <p className="policy-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <div className="policy-body">{children}</div>
      </div>
    </div>
  );
}