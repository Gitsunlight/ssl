"use client";

type CurriculumLink = {
  id: string;
  title: string;
  path: string;
  icon: string;
  color: string;
  reason: string;
  keywords: string[];
};

const CURRICULUM_LINKS: CurriculumLink[] = [
  {
    id: "frontier-llm",
    title: "Frontier LLM",
    path: "/curriculum/frontier-llm",
    icon: "🧠",
    color: "#22D3EE",
    reason: "Connect this idea to model architecture, training, and inference systems.",
    keywords: ["ai", "llm", "model", "neural", "transformer", "inference", "training", "agent", "embedding", "reasoning"],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    path: "/curriculum/cloud-computing",
    icon: "☁️",
    color: "#60A5FA",
    reason: "See how this concept becomes a distributed cloud platform.",
    keywords: ["cloud", "distributed", "service", "server", "storage", "network", "region", "container", "kubernetes", "serverless", "scale", "availability"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    path: "/curriculum/cybersecurity",
    icon: "🔒",
    color: "#34D399",
    reason: "Study the security, identity, threat, and trust implications.",
    keywords: ["security", "secure", "identity", "access", "attack", "threat", "vulnerability", "secret", "authorization", "permission", "supply chain", "audit", "crypt"],
  },
  {
    id: "data-science",
    title: "Data Science",
    path: "/curriculum/data-science",
    icon: "📊",
    color: "#A78BFA",
    reason: "Explore the data, measurement, experimentation, and statistics behind it.",
    keywords: ["data", "metric", "measure", "experiment", "statistics", "analysis", "dataset", "feature", "prediction", "evaluation", "causal"],
  },
  {
    id: "graph-engineering",
    title: "Graph Engineering",
    path: "/curriculum/graph-engineering",
    icon: "🕸️",
    color: "#10B981",
    reason: "Model the dependencies and relationships as a navigable graph.",
    keywords: ["graph", "dependency", "dependencies", "node", "edge", "relationship", "topology", "query", "traversal", "ownership", "action graph"],
  },
  {
    id: "information-theory",
    title: "Information Theory",
    path: "/curriculum/information-theory",
    icon: "📡",
    color: "#2DD4BF",
    reason: "Understand the information, compression, uncertainty, and communication limits.",
    keywords: ["information", "entropy", "signal", "compression", "uncertainty", "probability", "channel", "encoding", "content", "digest", "cache"],
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    path: "/curriculum/quantum-computing",
    icon: "⚛️",
    color: "#8B5CF6",
    reason: "Compare the classical system with quantum computation and information.",
    keywords: ["quantum", "qubit", "algorithm", "state", "measurement", "probabilistic", "optimization", "simulation"],
  },
  {
    id: "piper-monorepo",
    title: "Google-Scale Monorepo",
    path: "/curriculum/piper-monorepo",
    icon: "🧩",
    color: "#14B8A6",
    reason: "See the source-control, build, and developer-platform implementation.",
    keywords: ["repo", "repository", "monorepo", "build", "bazel", "piper", "workspace", "review", "presubmit", "borg", "starlark", "source control"],
  },
];

export function RelatedCurriculums({ currentId, chapter }: { currentId: string; chapter: { title: string; tagline?: string; insight?: string; content?: { text?: string }[] } }) {
  const searchableText = [chapter.title, chapter.tagline, chapter.insight, ...(chapter.content || []).map((block) => block.text)].filter(Boolean).join(" ").toLowerCase();
  const recommendations = CURRICULUM_LINKS
    .filter((curriculum) => curriculum.id !== currentId)
    .map((curriculum) => ({
      curriculum,
      score: curriculum.keywords.reduce((score, keyword) => score + (searchableText.includes(keyword) ? 1 : 0), 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <aside style={{ marginBottom: 20, padding: "14px 16px", borderRadius: 12, background: "#08111F", border: "1px solid #162840" }} aria-label="Related curricula">
      <div style={{ color: "#F0F6FF", fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Continue across the academy</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 8 }}>
        {recommendations.map(({ curriculum }) => (
          <a key={curriculum.id} href={curriculum.path} style={{ display: "block", padding: "10px 12px", borderRadius: 9, background: "#0E1C30", border: `1px solid ${curriculum.color}55`, color: "#F0F6FF", textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: curriculum.color, fontWeight: 800, fontSize: 12 }}><span>{curriculum.icon}</span>{curriculum.title}</div>
            <div style={{ color: "#7A9AB8", fontSize: 11, lineHeight: 1.45, marginTop: 5 }}>{curriculum.reason}</div>
            <div style={{ color: curriculum.color, fontSize: 11, fontWeight: 700, marginTop: 7 }}>Open curriculum →</div>
          </a>
        ))}
      </div>
    </aside>
  );
}
