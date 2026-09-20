import Link from "next/link";

export default function CurriculumNotFound() {
  return (
    <main className="not-found-shell" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="not-found-card">
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <h1 style={{ margin: "0 0 10px", fontSize: 32 }}>Curriculum not found</h1>
        <p className="not-found-copy" style={{ margin: "0 0 20px", color: "#7A9AB8" }}>
          This curriculum has not been built yet, or the link is pointing to an
          unavailable route.
        </p>
        <Link href="/" className="not-found-link" style={{ display: "inline-block" }}>
          Back to catalog
        </Link>
      </div>
    </main>
  );
}
