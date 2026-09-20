import Link from "next/link";

export default function CurriculumNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#040810",
        color: "#F0F6FF",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          background: "#08111F",
          border: "1px solid #162840",
          borderRadius: 18,
          padding: "40px 28px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(34, 211, 238, 0.12)",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <h1 style={{ margin: "0 0 10px", fontSize: 32 }}>Curriculum not found</h1>
        <p style={{ margin: "0 0 20px", color: "#7A9AB8", lineHeight: 1.6 }}>
          This curriculum has not been built yet, or the link is pointing to an
          unavailable route.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #22D3EE, #A78BFA)",
            color: "#040810",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Back to catalog
        </Link>
      </div>
    </main>
  );
}
