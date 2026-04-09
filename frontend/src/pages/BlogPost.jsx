import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE;

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/blogs/${slug}`)
      .then(r => r.json())
      .then(data => { setBlog(data); setLoading(false); });
  }, [slug]);

  useEffect(() => {
  if (blog) {
    document.title = `${blog.title} | Kaeorn`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", blog.excerpt || blog.title);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = blog.excerpt || blog.title;
      document.head.appendChild(m);
    }
  }
}, [blog]);

  if (loading) return <p style={{ padding: 80, textAlign: "center" }}>Loading…</p>;
  if (!blog) return <p style={{ padding: 80, textAlign: "center" }}>Blog not found.</p>;

  return (
    <div style={s.page}>
      <button style={s.back} onClick={() => navigate("/blogs")}>← Back to Journal</button>

      {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={s.cover} />}

      <div style={s.meta}>
        {blog.tags?.map(t => <span key={t} style={s.tag}>{t}</span>)}
      </div>

      <h1 style={s.title}>{blog.title}</h1>
      <p style={s.date}>{new Date(blog.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div style={s.content} dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

const s = {
  page: { maxWidth: 740, margin: "0 auto", padding: "100px 24px 80px", fontFamily: "Inter, sans-serif" },
  back: { background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 14, marginBottom: 40, padding: 0 },
  cover: { width: "100%", height: "auto", objectFit: "cover", borderRadius: 16, marginBottom: 32 },
  meta: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tag: { display: "flex",  alignItems: "center",fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b7355", background: "rgba(139,115,85,0.1)", padding: "3px 10px", borderRadius: 20 },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: 12 },
  date: { fontSize: 12, color: "#aaa", fontFamily: "'DM Mono', monospace", marginBottom: 40 },
  content: { fontSize: 16, lineHeight: 1.8, color: "#333" },
};