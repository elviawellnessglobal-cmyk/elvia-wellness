import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/blogs`)
      .then(r => r.json())
      .then(data => { setBlogs(data); setLoading(false); });
  }, []);

  if (loading) return <p style={{ padding: 80, textAlign: "center" }}>Loading…</p>;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <p style={s.eyebrow}>Journal</p>
        <h1 style={s.title}>Stories & Insights</h1>
      </div>

      <div style={s.grid}>
        {blogs.map(blog => (
          <div key={blog._id} style={s.card} onClick={() => navigate(`/blogs/${blog.slug}`)}>
            {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={s.img} />}
            <div style={s.cardBody}>
              {blog.tags?.length > 0 && (
                <div style={s.tags}>
                  {blog.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}
                </div>
              )}
              <h2 style={s.cardTitle}>{blog.title}</h2>
              <p style={s.excerpt}>{blog.excerpt} <b>Read More..</b></p>
              <p style={s.date}>{new Date(blog.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth: 1100, margin: "0 auto", padding: "100px 24px 80px", fontFamily: "Inter, sans-serif" },
  header: { textAlign: "center", marginBottom: 64 },
  eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.25em", color: "#9a9089", textTransform: "uppercase", marginBottom: 16 },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 },
  card: { background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden", cursor: "pointer", transition: "transform .2s", },
  img: { width: "100%", height: 220, objectFit: "cover" },
  cardBody: { padding: 24 },
  tags: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  tag: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b7355", background: "rgba(139,115,85,0.1)", padding: "3px 10px", borderRadius: 20 },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 10, lineHeight: 1.3 },
  excerpt: { fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 16 },
  date: { fontSize: 12, color: "#aaa", fontFamily: "'DM Mono', monospace" },
};