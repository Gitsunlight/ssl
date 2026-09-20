"use client";

import { useState, useEffect } from "react";

// ── Design Tokens ─────────────────────────────────────────────────────────
const T = {
  bg: "#040810",
  surface: "#08111F",
  elevated: "#0E1C30",
  border: "#162840",
  accent: "#22D3EE",
  accent2: "#A78BFA",
  text: "#F0F6FF",
  muted: "#4A6A8A",
  subtle: "#7A9AB8",
  blue: "#60A5FA",
  green: "#34D399",
  amber: "#FBBF24",
  red: "#F87171",
  purple: "#A78BFA",
  indigo: "#818CF8",
};

// ── Curriculum Data ──────────────────────────────────────────────────────
const CURRICULUMS = [
  {
    id: "frontier-llm",
    title: "The Frontier LLM Curriculum",
    subtitle: "From Fundamentals to Frontier Systems",
    description:
      "Master the complete vertical stack of Large Language Models — from data and tokens to transformers, training, inference, and frontier AI systems. 41 chapters across 12 parts.",
    icon: "🧠",
    color: "#22D3EE",
    gradient: "linear-gradient(135deg, #22D3EE, #A78BFA)",
    chapters: 41,
    parts: 12,
    quizzes: 12,
    terms: 26,
    tags: ["AI", "LLM", "Deep Learning", "Transformers"],
    path: "/curriculum/frontier-llm",
    featured: true,
    version: "3.0",
    date: "2026",
    author: "Sunlight AI Research",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Curriculum",
    subtitle: "From Fundamentals to Cloud Architecture",
    description:
      "Comprehensive guide to cloud computing — from virtualization and containers to serverless, microservices, and multi-region architectures. 43 chapters across 12 parts.",
    icon: "☁️",
    color: "#60A5FA",
    gradient: "linear-gradient(135deg, #60A5FA, #34D399)",
    chapters: 43,
    parts: 12,
    quizzes: 10,
    terms: 18,
    tags: ["Cloud", "AWS", "Azure", "GCP", "DevOps"],
    path: "/curriculum/cloud-computing",
    featured: true,
    version: "3.0",
    date: "2026",
    author: "Sunlight Cloud Engineering",
  },
  {
    id: "blockchain-web3",
    title: "Blockchain & Web3 Curriculum",
    subtitle: "From Fundamentals to Decentralized Applications",
    description:
      "Complete guide to blockchain technology — from cryptographic foundations and consensus mechanisms to smart contracts, DeFi, and Web3 infrastructure.",
    icon: "⛓️",
    color: "#FBBF24",
    gradient: "linear-gradient(135deg, #FBBF24, #F87171)",
    chapters: 38,
    parts: 10,
    quizzes: 10,
    terms: 22,
    tags: ["Blockchain", "Web3", "Ethereum", "DeFi", "Smart Contracts"],
    path: "/curriculum/blockchain-web3",
    featured: false,
    version: "2.5",
    date: "2026",
    author: "Sunlight Blockchain Labs",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Curriculum",
    subtitle: "From Fundamentals to Security Operations",
    description:
      "Comprehensive cybersecurity education — from network security and cryptography to threat hunting, incident response, and security architecture.",
    icon: "🔒",
    color: "#34D399",
    gradient: "linear-gradient(135deg, #34D399, #818CF8)",
    chapters: 45,
    parts: 11,
    quizzes: 12,
    terms: 30,
    tags: ["Security", "Network Security", "Cryptography", "SOC"],
    path: "/curriculum/cybersecurity",
    featured: true,
    version: "2.0",
    date: "2026",
    author: "Sunlight Security Division",
  },
  {
    id: "data-science",
    title: "Data Science Curriculum",
    subtitle: "From Statistics to Machine Learning",
    description:
      "Complete data science education — from statistics and data wrangling to machine learning, deep learning, and production ML systems.",
    icon: "📊",
    color: "#A78BFA",
    gradient: "linear-gradient(135deg, #A78BFA, #F472B6)",
    chapters: 40,
    parts: 10,
    quizzes: 12,
    terms: 28,
    tags: ["Data Science", "ML", "Statistics", "Python"],
    path: "/curriculum/data-science",
    featured: true,
    version: "2.5",
    date: "2026",
    author: "Sunlight Data Science Team",
  },
  {
    id: "devops-sre",
    title: "DevOps & SRE Curriculum",
    subtitle: "From Development to Production Engineering",
    description:
      "Complete DevOps and Site Reliability Engineering education — from CI/CD and observability to incident management and infrastructure automation.",
    icon: "🚀",
    color: "#F97316",
    gradient: "linear-gradient(135deg, #F97316, #F43F5E)",
    chapters: 39,
    parts: 9,
    quizzes: 10,
    terms: 24,
    tags: ["DevOps", "SRE", "CI/CD", "Kubernetes", "Monitoring"],
    path: "/curriculum/devops-sre",
    featured: false,
    version: "2.0",
    date: "2026",
    author: "Sunlight DevOps Institute",
  },
  {
    id: "kubernetes",
    title: "Kubernetes Curriculum",
    subtitle: "From Fundamentals to Production Orchestration",
    description:
      "Master Kubernetes from the ground up — from pods and services to operators, service mesh, and multi-cluster management at scale.",
    icon: "🐳",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    chapters: 36,
    parts: 8,
    quizzes: 10,
    terms: 20,
    tags: ["Kubernetes", "Containers", "Orchestration", "Docker"],
    path: "/curriculum/kubernetes",
    featured: false,
    version: "2.0",
    date: "2026",
    author: "Sunlight Cloud Engineering",
  },
  {
    id: "ai-agents",
    title: "AI Agents Curriculum",
    subtitle: "From Theory to Autonomous AI Systems",
    description:
      "Complete guide to AI agents — from foundational concepts and architectures to RAG, tool use, multi-agent systems, and production deployment.",
    icon: "🤖",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #8B5CF6)",
    chapters: 35,
    parts: 8,
    quizzes: 10,
    terms: 22,
    tags: ["AI Agents", "RAG", "LLM", "Autonomous Systems"],
    path: "/curriculum/ai-agents",
    featured: false,
    version: "1.5",
    date: "2026",
    author: "Sunlight AI Research",
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing Curriculum",
    subtitle: "From Fundamentals to Quantum Algorithms",
    description:
      "Comprehensive quantum computing education — from qubits and gates to quantum algorithms, error correction, and quantum programming languages.",
    icon: "🧬",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    chapters: 35,
    parts: 8,
    quizzes: 10,
    terms: 22,
    tags: ["Quantum Computing", "Qubits", "Quantum Algorithms", "Error Correction"],
    path: "/curriculum/quantum-computing",
    featured: true,
    version: "1.0",
    date: "2026",
    author: "Sunlight Quantum Research",
  },
  {
    id: "graph-engineering",
    title: "Graph Engineering Curriculum",
    subtitle: "From Theory to Scalable Graph Solutions",
    description:
      "Learn the fundamentals of graph engineering — from data modeling and storage to query optimization and distributed graph processing.",
    icon: "📊",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #3B82F6)",
    chapters: 35,
    parts: 8,
    quizzes: 10,
    terms: 22,
    tags: ["Graph Engineering", "Data Modeling", "Query Optimization", "Distributed Processing"],
    path: "/curriculum/graph-engineering",
    featured: true,
    version: "1.0",
    date: "2026",
    author: "Sunlight Data Engineering",
  },
  ...Array.from({ length: 120 }, (_, index) => {
    const domains = [
      { label: "AI Systems", icon: "🧠", color: "#22D3EE", tags: ["AI", "Systems"], slug: "ai-systems" },
      { label: "Data Engineering", icon: "📊", color: "#60A5FA", tags: ["Data", "Pipelines"], slug: "data-engineering" },
      { label: "Product Design", icon: "🎨", color: "#A78BFA", tags: ["Design", "UX"], slug: "product-design" },
      { label: "Cyber Defense", icon: "🛡️", color: "#34D399", tags: ["Security", "Defense"], slug: "cyber-defense" },
      { label: "FinTech", icon: "💳", color: "#FBBF24", tags: ["Finance", "Technology"], slug: "fintech" },
      { label: "Robotics", icon: "🤖", color: "#FB7185", tags: ["Robotics", "Automation"], slug: "robotics" },
      { label: "Frontend Systems", icon: "💻", color: "#F97316", tags: ["Frontend", "UX"], slug: "frontend-systems" },
      { label: "DevOps", icon: "🚀", color: "#8B5CF6", tags: ["DevOps", "Platform"], slug: "devops" },
      { label: "Human Skills", icon: "🧭", color: "#2DD4BF", tags: ["Leadership", "Communication"], slug: "human-skills" },
      { label: "Sustainability", icon: "🌱", color: "#4ADE80", tags: ["Climate", "Systems"], slug: "sustainability" },
    ];
    const base = domains[index % domains.length];
    const block = ["Foundations", "Practice", "Systems", "Operations", "Leadership", "Research"][index % 6];
    const chapterCount = 12 + ((index * 7) % 28);
    const partCount = 4 + ((index * 3) % 9);
    const quizCount = 6 + (index % 8);
    const termCount = 10 + (index % 18);
    const version = (1 + (index % 6) + (index % 3) / 10).toFixed(1);
    const title = `${base.label} ${block} Curriculum`;
    const nonFeaturedTitles = new Set([
      "Product Design Systems Curriculum",
      "Cyber Defense Operations Curriculum",
      "FinTech Leadership Curriculum",
      "Data Engineering Practice Curriculum",
      "Robotics Research Curriculum",
      "Frontend Systems Foundations Curriculum",
      "DevOps Practice Curriculum",
      "Human Skills Systems Curriculum",
      "Sustainability Operations Curriculum",
      "AI Systems Foundations Curriculum",
    ]);

    return {
      id: `${base.slug}-${index + 1}`,
      title,
      subtitle: `From fundamentals to real-world practice and systems thinking`,
      description:
        `Explore ${base.label.toLowerCase()} with structured learning across architecture, execution, and applied decision-making. ${chapterCount} chapters across ${partCount} parts.`,
      icon: base.icon,
      color: base.color,
      gradient: `linear-gradient(135deg, ${base.color}, #A78BFA)`,
      chapters: chapterCount,
      parts: partCount,
      quizzes: quizCount,
      terms: termCount,
      tags: [...new Set([base.tags[0], base.tags[1], "Learning", "Applied Practice"])],
      path: `/curriculum/${base.slug}-${index + 1}`,
      featured: nonFeaturedTitles.has(title) ? false : index < 10,
      version,
      date: "2026",
      author: "Sunlight Academy",
    };
  }),
];

// ── Main Page ────────────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAllTags, setShowAllTags] = useState(false);

  // Get all unique tags
  const allTags = Array.from(new Set(CURRICULUMS.flatMap((c) => c.tags)));
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 8);

  // Filter curriculums based on search and tag
  const filtered = CURRICULUMS.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = !selectedTag || c.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Featured curriculums
  const featured = CURRICULUMS.filter((c) => c.featured);
  const regular = filtered.filter((c) => !c.featured);

  // Show limited number initially
  const displayedRegular = regular.slice(0, visibleCount);
  const hasMore = regular.length > visibleCount;

  // Stats
  const totalChapters = CURRICULUMS.reduce((sum, c) => sum + c.chapters, 0);
  const totalParts = CURRICULUMS.reduce((sum, c) => sum + c.parts, 0);
  const totalQuizzes = CURRICULUMS.reduce((sum, c) => sum + c.quizzes, 0);
  const totalTerms = CURRICULUMS.reduce((sum, c) => sum + c.terms, 0);

  useEffect(() => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="page-shell" style={{ background: T.bg, color: T.text, minHeight: "100vh" }}>
      {/* ── Hero Section ── */}
      <section className="catalog-hero" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="hero-inner">
          {/* Logo / Badge */}
          <div
            className="catalog-badge"
            style={{
              background: T.elevated,
              border: `1px solid ${T.border}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <span style={{ fontSize: 20 }}>☀️</span>
            <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>
              Sunlight Academy
            </span>
            <span
              style={{
                color: T.accent,
                fontSize: 11,
                fontWeight: 600,
                background: `${T.accent}22`,
                padding: "2px 10px",
                borderRadius: 12,
              }}
            >
              v3.0
            </span>
          </div>

          <h1 className="hero-title" style={{ fontSize: 48, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.1 }}>
            Technical Curriculums
          </h1>
          <p
            style={{
              color: T.subtle,
              fontSize: 18,
              margin: "0 0 8px",
              lineHeight: 1.6,
            }}
          >
            Master modern technology — from AI and Cloud to Blockchain,
            Security, and beyond.
          </p>
          <p style={{ color: T.muted, fontSize: 14, margin: "0 0 32px" }}>
            {CURRICULUMS.length} curriculums · {totalChapters} chapters ·{" "}
            {totalParts} parts · {totalQuizzes} quizzes
          </p>

          {/* Search and Filter */}
          <div className="search-shell">
            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search curriculums, topics, tags…"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = T.accent;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = T.border;
              }}
            />
          </div>

          {/* Tag filters */}
          <div className="tag-filter" style={{ marginTop: 12 }}>
            <button
              onClick={() => setSelectedTag(null)}
              style={{
                padding: "4px 12px",
                borderRadius: 16,
                border: `1px solid ${selectedTag === null ? T.accent : T.border}`,
                background: selectedTag === null ? `${T.accent}22` : "transparent",
                color: selectedTag === null ? T.accent : T.muted,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: selectedTag === null ? 700 : 400,
                transition: "all .15s",
              }}
            >
              All
            </button>
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 16,
                  border: `1px solid ${selectedTag === tag ? T.accent : T.border}`,
                  background: selectedTag === tag ? `${T.accent}22` : "transparent",
                  color: selectedTag === tag ? T.accent : T.muted,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: selectedTag === tag ? 700 : 400,
                  transition: "all .15s",
                }}
              >
                {tag}
              </button>
            ))}
            {allTags.length > visibleTags.length && (
              <button
                onClick={() => setShowAllTags(true)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 16,
                  border: `1px solid ${T.border}`,
                  background: "transparent",
                  color: T.accent,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "all .15s",
                }}
              >
                More +
              </button>
            )}
            {showAllTags && allTags.length > 8 && (
              <button
                onClick={() => setShowAllTags(false)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 16,
                  border: `1px solid ${T.border}`,
                  background: "transparent",
                  color: T.muted,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "all .15s",
                }}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar" style={{ background: T.border, maxWidth: 900, margin: "0 auto", borderRadius: 12, overflow: "hidden", marginTop: -1, marginBottom: 40 }}>
        {[
          { label: "Curriculums", value: CURRICULUMS.length },
          { label: "Chapters", value: totalChapters },
          { label: "Parts", value: totalParts },
          { label: "Quizzes", value: totalQuizzes },
          { label: "Terms", value: totalTerms },
        ].map((stat) => (
          <div key={stat.label} className="stat-block" style={{ background: T.surface }}>
            <div style={{ color: T.accent, fontSize: 20, fontWeight: 900 }}>
              {stat.value}
            </div>
            <div style={{ color: T.muted, fontSize: 11, fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Featured Curriculums ── */}
      <div className="catalog-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 40px" }}>
        <div className="catalog-section-header" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}>⭐</span>
          <h2
            style={{
              color: T.text,
              fontSize: 20,
              fontWeight: 800,
              margin: 0,
            }}
          >
            Featured Curriculums
          </h2>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        <div className="catalog-grid">
          {featured.map((c) => (
            <CurriculumCard key={c.id} curriculum={c} />
          ))}
        </div>
      </div>

      {/* ── All Curriculums ── */}
      <div className="catalog-section all-curriculums" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px" }}>
        <div className="catalog-section-header" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}>📚</span>
          <h2
            style={{
              color: T.text,
              fontSize: 20,
              fontWeight: 800,
              margin: 0,
            }}
          >
            All Curriculums
            {filtered.length !== CURRICULUMS.length && (
              <span
                style={{
                  color: T.muted,
                  fontSize: 14,
                  fontWeight: 400,
                  marginLeft: 10,
                }}
              >
                ({filtered.length} results)
              </span>
            )}
          </h2>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              background: T.surface,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ color: T.subtle, fontSize: 16, marginBottom: 4 }}>
              No curriculums found
            </div>
            <div style={{ color: T.muted, fontSize: 14 }}>
              Try adjusting your search or filters
            </div>
          </div>
        ) : (
          <>
            <div className="catalog-grid">
              {displayedRegular.map((c) => (
                <CurriculumCard key={c.id} curriculum={c} />
              ))}
            </div>

            {/* Show more button */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <button
                  onClick={() => setVisibleCount((v) => v + 6)}
                  style={{
                    padding: "10px 32px",
                    borderRadius: 20,
                    background: T.elevated,
                    border: `1px solid ${T.border}`,
                    color: T.text,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.accent;
                    e.currentTarget.style.background = `${T.accent}11`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.background = T.elevated;
                  }}
                >
                  Show More ({regular.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Request Banner ── */}
      <div className="request-banner">
        <div className="request-banner-card" style={{ background: "linear-gradient(135deg, rgba(34, 211, 238, 0.14), rgba(167, 139, 250, 0.14))", border: `1px solid ${T.border}` }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: 10,
              color: T.text,
            }}
          >
            not found what you are looking for
          </div>
          <div
            style={{
              color: T.subtle,
              fontSize: 17,
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            upvote/submit for what you need. we&apos;ll build it for you.
          </div>
          <button
            style={{
              border: `1px solid ${T.accent}`,
              background: `${T.accent}18`,
              color: T.text,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            submit a request
          </button>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="site-footer" style={{ borderTop: `1px solid ${T.border}` }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>☀️</span>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>
            Sunlight Academy
          </span>
        </div>
        <div style={{ color: T.muted, fontSize: 12 }}>
          © {new Date().getFullYear()} Sunlight Academy. All rights
          reserved.
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 4 }}>
          Empowering the next generation of technologists worldwide.
        </div>
      </footer>
    </div>
  );
}

// ── Curriculum Card Component ────────────────────────────────────────────
function CurriculumCard({
  curriculum,
}: {
  curriculum: (typeof CURRICULUMS)[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={curriculum.path}
      className="catalog-card-link"
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="catalog-card"
        style={{
          background: T.surface,
          border: `1px solid ${isHovered ? curriculum.color : T.border}`,
          transform: isHovered ? "translateY(-4px)" : "none",
          boxShadow: isHovered ? `0 8px 32px ${curriculum.color}08` : "none",
        }}
      >
        {/* Icon and badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 28 }}>{curriculum.icon}</span>
          {curriculum.featured && (
            <span
              style={{
                background: `${curriculum.color}22`,
                color: curriculum.color,
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 10px",
                borderRadius: 12,
                letterSpacing: ".05em",
              }}
            >
              ★ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            color: T.text,
            fontSize: 17,
            fontWeight: 700,
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {curriculum.title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            color: T.muted,
            fontSize: 13,
            margin: "0 0 10px",
            lineHeight: 1.4,
          }}
        >
          {curriculum.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            color: T.subtle,
            fontSize: 13,
            lineHeight: 1.6,
            margin: "0 0 12px",
            flex: 1,
          }}
        >
          {curriculum.description}
        </p>

        {/* Tags */}
        <div className="catalog-card-tag-cloud">
          {curriculum.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                background: T.elevated,
                color: T.muted,
                fontSize: 10,
                padding: "2px 10px",
                borderRadius: 10,
                border: `1px solid ${T.border}`,
              }}
            >
              {tag}
            </span>
          ))}
          {curriculum.tags.length > 4 && (
            <span
              style={{
                color: T.muted,
                fontSize: 10,
                padding: "2px 6px",
              }}
            >
              +{curriculum.tags.length - 4}
            </span>
          )}
        </div>

        {/* Meta info */}
        <div className="catalog-card-meta" style={{ borderTop: `1px solid ${T.border}`, color: T.muted }}>
          <span>{curriculum.chapters} chapters</span>
          <span>•</span>
          <span>{curriculum.parts} parts</span>
          <span>•</span>
          <span>{curriculum.quizzes} quizzes</span>
          <div style={{ flex: 1 }} />
          <span
            style={{
              color: curriculum.color,
              fontWeight: 600,
              fontSize: 11,
            }}
          >
            v{curriculum.version}
          </span>
        </div>

        {/* Hover indicator */}
        <div
          style={{
            marginTop: 10,
            color: isHovered ? curriculum.color : "transparent",
            fontSize: 12,
            fontWeight: 600,
            transition: "color .2s",
            textAlign: "right",
          }}
        >
          {isHovered ? "Explore →" : " "}
        </div>
      </div>
    </a>
  );
}