import { notFound } from "next/navigation";
import CloudComputingCurriculumPage from "@/app/curriculums/cloud-computing";
import DataScienceCurriculumPage from "@/app/curriculums/data-science";
import FrontierLLMCurriculumPage from "@/app/curriculums/frontier-llm";
import GraphCurriculumPage from "@/app/curriculums/graph-engineeering";

const supportedCurricula = {
  "cloud-computing": CloudComputingCurriculumPage,
  "data-science": DataScienceCurriculumPage,
  "frontier-llm": FrontierLLMCurriculumPage,
  "graph-engineering": GraphCurriculumPage,
} as const;

function GenericCurriculumPage({ slug }: { slug: string }) {
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040810",
        color: "#F0F6FF",
        padding: "48px 24px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ color: "#22D3EE", fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>
          Sunlight Academy
        </p>
        <h1 style={{ fontSize: 42, margin: "12px 0 18px" }}>{title} Curriculum</h1>
        <p style={{ color: "#7A9AB8", fontSize: 18, lineHeight: 1.7, marginBottom: 28 }}>
          This pathway is part of the expanded Academy catalog and is designed for structured, practical learning across foundations, systems, and applied execution.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {[
            ["Foundations", "Build the core principles and mental models."],
            ["Applied Learning", "Translate concepts into tools, workflows, and projects."],
            ["Systems Thinking", "Connect ideas to real-world architecture and operations."],
            ["Career Readiness", "Prepare for execution, collaboration, and scale."],
          ].map(([label, text]) => (
            <div
              key={label}
              style={{
                background: "#08111F",
                border: "1px solid #162840",
                borderRadius: 18,
                padding: 20,
              }}
            >
              <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>{label}</h2>
              <p style={{ margin: 0, color: "#7A9AB8", lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              background: "#22D3EE22",
              border: "1px solid #22D3EE",
              color: "#F0F6FF",
              borderRadius: 999,
              padding: "10px 18px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to catalog
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function CurriculumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const CurriculumComponent = supportedCurricula[slug as keyof typeof supportedCurricula] ?? GenericCurriculumPage;

  if (!CurriculumComponent) {
    notFound();
  }

  if (CurriculumComponent === GenericCurriculumPage) {
    return <GenericCurriculumPage slug={slug} />;
  }

  return <CurriculumComponent />;
}
