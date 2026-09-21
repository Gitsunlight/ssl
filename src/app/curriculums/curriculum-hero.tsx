"use client";

type CurriculumHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  secondaryColor: string;
  parts: number;
  chapters: number;
  terms: number;
  signal: string;
  nodes: string[];
};

export function CurriculumHero({ eyebrow, title, description, icon, color, secondaryColor, parts, chapters, terms, signal, nodes }: CurriculumHeroProps) {
  return (
    <section className="curriculum-signal-hero" style={{ "--hero-color": color, "--hero-secondary": secondaryColor } as React.CSSProperties}>
      <div className="curriculum-signal-copy">
        <div className="curriculum-signal-eyebrow">{icon} {eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="curriculum-signal-stats" aria-label="Curriculum statistics">
          <span><strong>{parts}</strong> parts</span>
          <span><strong>{chapters}</strong> chapters</span>
          <span><strong>{terms}</strong> terms</span>
        </div>
      </div>
      <div className="curriculum-signal-visual" aria-label={signal}>
        <div className="curriculum-signal-orbit curriculum-signal-orbit-one" />
        <div className="curriculum-signal-orbit curriculum-signal-orbit-two" />
        <div className="curriculum-signal-core">{icon}</div>
        <div className="curriculum-signal-nodes">
          {nodes.map((node, index) => (
            <span key={`${node}-${index}`} style={{ "--node-index": index } as React.CSSProperties}>{node}</span>
          ))}
        </div>
        <div className="curriculum-signal-caption">{signal}</div>
      </div>
    </section>
  );
}
