"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RelatedCurriculums } from "./related-curriculums";
import { CurriculumHero } from "./curriculum-hero";

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
const PC = ["#818CF8", "#60A5FA", "#34D399", "#34D399", "#FBBF24", "#FBBF24", "#F87171", "#F87171", "#F87171", "#A78BFA", "#A78BFA", "#A78BFA", "#A78BFA"];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Foundations", icon: "🗺️", chs: [0, 13, 14] },
  { id: 1, label: "Source Control at Scale", icon: "📐", chs: [1, 2, 15] },
  { id: 2, label: "Piper", icon: "🗄️", chs: [3, 16, 17] },
  { id: 3, label: "CITC Workspaces", icon: "☁️", chs: [4, 18, 19] },
  { id: 4, label: "Build Systems (Bazel + Starlark)", icon: "🔨", chs: [5, 6, 20] },
  { id: 5, label: "Review & Analysis", icon: "🔍", chs: [7, 8, 21] },
  { id: 6, label: "Execution (Borg)", icon: "⚙️", chs: [9, 22, 23] },
  { id: 7, label: "Deployment & Security", icon: "🛡️", chs: [10, 24, 25] },
  { id: 8, label: "External Code Flow", icon: "🔄", chs: [11, 26] },
  { id: 9, label: "End-to-End Architecture", icon: "🚀", chs: [12, 27] },
];

const CHAPTER_DISPLAY_NUM = new Map(
  PARTS.flatMap((part) => part.chs).map((chapterId, index) => [chapterId, index]),
);
const getChapterNumber = (chapterId: number) => CHAPTER_DISPLAY_NUM.get(chapterId) ?? chapterId;

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS: any[] = [
  {
    n: 0, part: 0,
    title: "Foundations",
    tagline: "Why one repository, why not, and what changes when you commit to it.",
    insight: "Monorepo is an architectural choice, not a Git feature.",
    demo: "monorepo",
    content: [
      { type: "p", text: "A monorepo stores many logically independent projects in a single version-controlled repository. A polyrepo spreads them across many repositories with explicit versioning between them. Monorepos eliminate version skew and dependency diamond problems by construction — all code sees a single consistent view of all dependencies at HEAD." },
      { type: "stack", rows: [
        ["📦 Single tree", "One repository contains all projects, services, libraries"],
        ["🔗 Shared build graph", "Dependencies are expressed once and resolved globally"],
        ["⚛️ Atomic commits", "A change spans many files and lands as one unit"],
        ["🏢 Organizational view", "Directory structure reflects team boundaries"],
      ] },
      { type: "code", text: "monorepo/\n├── WORKSPACE\n├── packages/\n│   ├── shared-utils/\n│   ├── service-a/\n│   └── service-b/\n└── scripts/" },
      { type: "insight", text: "Cross-repo coordination: a change to a shared library requires N pull requests across N repos, each with its own merge timing and version bump. Monorepo: one commit updates the library and all 200 callers atomically." },
      { type: "table", head: ["Monorepo", "Polyrepo"], rows: [
        ["Atomic changes native", "Requires coordination"],
        ["Single version at HEAD", "Version ranges + registry"],
        ["Full graph available", "Per-repo only"],
        ["High tooling at scale", "Low to start"],
      ] },
    ],
  },
  {
    n: 1, part: 1,
    title: "Large-Scale Monorepos",
    tagline: "When 'git clone' takes an hour and 'grep' never finishes.",
    insight: "Filesystem metadata becomes the bottleneck before file content.",
    demo: "scale",
    content: [
      { type: "p", text: "At millions of files, filesystem operations (stat, readdir, open) dominate. Every build tool traverses directories to discover files. With 10M files, a naive traversal generates 10M stat calls. Requires metadata caching, directory snapshots, and avoiding full-tree walks." },
      { type: "code", text: "Metadata service caches directory listings\nand file attributes.\n\nBuild tools query the service\nrather than the filesystem directly.\n\nPiper stores metadata in Spanner,\nenabling fast directory listing\nwithout touching file content." },
      { type: "table", head: ["Operation", "Cost at 10M files"], rows: [
        ["Full tree walk", "10M stat calls (~100s at 10μs)"],
        ["Metadata lookup", "O(1) directory query"],
        ["Content fetch", "On demand only"],
        ["Hash verification", "Only for changed files"],
      ] },
      { type: "insight", text: "Piper took over a decade to scale to 10s of thousands of developers and servers. Interesting design decisions in Piper were motivated by extreme volume, latency, and master data size." },
    ],
  },
  {
    n: 2, part: 1,
    title: "Google's Monorepo Philosophy",
    tagline: "Atomic changes, global visibility, and the organizational consequences of one repository.",
    insight: "A monorepo at Google scale is a cultural and organizational system, not just a technical one.",
    content: [
      { type: "p", text: "Google's monolithic repository provides a common source of truth for tens of thousands of developers. Trunk-based development: all developers commit to a single mainline. Feature branches are rare; in-progress work is hidden behind runtime flags." },
      { type: "code", text: "Single trunk → all changes land there\nReleases are snapshots of trunk\n\nAtomic changes:\nOne logical change spans any number of files,\npackages, and languages,\ncommitted as one unit.\n\nNo change allowed without a code review\nby another engineer." },
      { type: "table", head: ["Concept", "Google Practice"], rows: [
        ["Trunk-based dev", "Enforced by Piper"],
        ["Atomic changes", "Across entire repository"],
        ["Presubmit", "Automated checks before landing"],
        ["Code review", "Mandatory, ≥1 reviewer"],
        ["Auto-commit", "Enabled across time zones"],
      ] },
      { type: "insight", text: "For years, Google averaged 40,000–60,000 changes per day to a single repository, shared among 25,000+ developers." },
    ],
  },
  {
    n: 3, part: 2,
    title: "Piper",
    tagline: "Why Git doesn't work at 2 billion lines, and what replaces it.",
    insight: "Piper is built on distributed storage (Spanner), not distributed version control.",
    demo: "piper",
    content: [
      { type: "p", text: "Piper is a centralized version control system storing metadata and file content in Google's distributed storage (Bigtable → Spanner), replicated across 10 data centers using Paxos. Handles 500,000 queries per second at peak. Repository size: 86TB (2016). Developers: ~25,000. Daily changes: ~16,000." },
      { type: "code", text: "Piper architecture:\n\nClient → Piper frontend\n     → Spanner (metadata + content)\n     → Paxos replication across data centers\n\nFile-level ACLs:\n>99% of files visible to all engineers\n<1% restricted, all reads logged\n\nApprovals:\nChanges require ≥1 reviewer approval\nbefore commit." },
      { type: "table", head: ["Dimension", "Git", "Piper"], rows: [
        ["Architecture", "Distributed (full clone)", "Centralized (server-side)"],
        ["Scale limit", "~100GB practical", "86TB+ documented"],
        ["Branching", "Core primitive", "Release snapshots only"],
        ["Atomic changes", "Within one repo", "Across entire repo"],
        ["Approvals", "Optional", "Mandatory (Citic)"],
      ] },
    ],
  },
  {
    n: 4, part: 3,
    title: "CITC (Client in the Cloud)",
    tagline: "Your working copy lives in the cloud; your laptop only sees what you touch.",
    insight: "CITC is a FUSE filesystem presenting the full repository as a virtual view. Only modified files consume local storage.",
    demo: "citc",
    content: [
      { type: "p", text: "CITC consists of a cloud storage backend and a Linux FUSE filesystem. The developer sees a full repository view, but only modified files are stored locally. Average workspace size: <10 files. Developers can browse and edit files anywhere across the Piper repository." },
      { type: "code", text: "Developer machine → FUSE mount\n                → CITC client\n                → Cloud storage\n\nReads fetch on demand.\nWrites create local snapshots.\n\nAll in-progress work stored in cloud:\n→ Accessible to other tools\n→ Build system\n→ Test infrastructure\n→ Code browsing, editing, review" },
      { type: "table", head: ["Metric", "Full Checkout", "CITC Workspace"], rows: [
        ["Initial sync", "Minutes to hours", "Seconds"],
        ["Local storage", "Full repository size", "Modified files only"],
        ["File access", "Local disk speed", "Network + cache"],
        ["Machine switch", "Re-clone", "Instant"],
      ] },
      { type: "insight", text: "CITC workspaces are available on any machine that can connect to cloud storage, making it easy to switch machines and pick up work without interruption. It also makes it possible for developers to view each other's work in CITC workspaces." },
    ],
  },
  {
    n: 5, part: 4,
    title: "Bazel (Blaze)",
    tagline: "The build graph becomes the monorepo's nervous system.",
    insight: "Action graphs enable hermeticity and remote execution. Sandboxing is the enforcement mechanism.",
    demo: "bazel",
    content: [
      { type: "p", text: "Bazel is Google's build system (open-sourced version of Blaze). It knows exactly what input files each build command needs, avoiding unnecessary work by re-running only when inputs have changed. At Google, cache hit rates routinely exceed 99%." },
      { type: "code", text: "BUILD file example:\n\ncc_library(\n    name = \"math\",\n    srcs = [\"add.cc\"],\n    hdrs = [\"add.h\"],\n)\n\ncc_binary(\n    name = \"app\",\n    srcs = [\"main.cc\"],\n    deps = [\"//math\"],\n)\n\nBazel build phases:\n1. Loading & analysis → target graph\n2. Configured targets → action graph\n3. Execution → parallel actions\n\nAt Google, cache hit rates routinely exceed 99%." },
      { type: "table", head: ["Property", "Task Graph", "Action Graph"], rows: [
        ["Granularity", "Package", "Tool invocation"],
        ["Caching", "Coarse", "Fine-grained"],
        ["Hermeticity", "Optional", "Enforced"],
        ["Parallelism", "Limited", "Maximal"],
      ] },
      { type: "insight", text: "Bazel supports multi-language builds (C++, Java, Kotlin, Python, Go, Rust) in the same invocation. It can gather source code from multiple locations without vendoring dependencies, and analyzes dependencies at a fine granularity." },
    ],
  },
  {
    n: 6, part: 4,
    title: "Starlark (Bazel's Configuration Language)",
    tagline: "The language that makes Bazel extensible without being Turing-complete.",
    insight: "Starlark is a Python dialect designed for hermetic, parallel, deterministic configuration. No recursion, no I/O, no side effects — this is a feature, not a limitation.",
    demo: "starlark",
    content: [
      { type: "p", text: "Starlark (formerly Skylark) is the configuration language used in Bazel's BUILD and .bzl files. It is a dialect of Python — deliberately restricted. No while loops, no recursion, no I/O, no imports from the filesystem. Everything is defined statically so that Bazel can analyze the entire build graph before executing a single action." },
      { type: "p", text: "The restriction is the point. A Turing-complete configuration language would make the build graph undecidable. Starlark is decidable: Bazel can always determine the complete set of targets, dependencies, and actions without running arbitrary code. This is what enables hermeticity, parallelism, and remote caching." },
      { type: "code", text: "# BUILD file (a Starlark file)\n\nload(\"//tools:my_rules.bzl\", \"my_cc_library\")\n\nmy_cc_library(\n    name = \"math\",\n    srcs = [\"add.cc\", \"sub.cc\"],\n    hdrs = [\"math.h\"],\n    visibility = [\"//visibility:public\"],\n)\n\ncc_binary(\n    name = \"app\",\n    srcs = [\"main.cc\"],\n    deps = [\":math\"],\n)\n\n# .bzl file — rule definition\n\nmy_cc_library = rule(\n    implementation = _my_cc_library_impl,\n    attrs = {\n        \"srcs\": attr.label_list(allow_files = [\".cc\"]),\n        \"hdrs\": attr.label_list(allow_files = [\".h\"]),\n        \"deps\": attr.label_list(),\n    },\n)\n\ndef _my_cc_library_impl(ctx):\n    outputs = [ctx.actions.declare_file(...)]\n    ctx.actions.run(\n        executable = ctx.executable._compiler,\n        inputs = ctx.files.srcs,\n        outputs = outputs,\n    )\n    return [DefaultInfo(files = depset(outputs))]" },
      { type: "table", head: ["Feature", "Python", "Starlark"], rows: [
        ["while loop", "✓", "✗ (no loops)"],
        ["recursion", "✓", "✗ (banned)"],
        ["file I/O", "✓", "✗ (hermetic)"],
        ["dynamic imports", "✓", "✗ (load() only)"],
        ["mutation of globals", "✓", "✗ (frozen)"],
        ["deterministic eval", "✗", "✓"],
        ["parallel-safe", "✗", "✓"],
      ] },
      { type: "insight", text: "Starlark's restrictions are a formal guarantee: the build graph is always computable in advance. This is what allows Bazel to do hermetic sandboxing, remote execution, and 99%+ cache hit rates. A Python-like language that could do anything would break all three." },
      { type: "p", text: "Starlark is now used far beyond Bazel. Buck2 (Meta's build system), Pants, and even some Google Cloud deployment tools use Starlark-family languages. It has become the de facto standard for hermetic configuration." },
      { type: "code", text: "Real-world Starlark uses:\n\n• Bazel BUILD / .bzl files (Google, most large monorepos)\n• Buck2 (Meta) — bzl files\n• Pants build system — BUILD files\n• Terraform's newer HCL alternatives\n• Continuous integration configs\n\nKey advantages:\n1. Decidable — build graph always computable\n2. Hermetic — no ambient dependencies\n3. Parallel-safe — no shared mutable state\n4. Deterministic — same inputs, same outputs\n5. Sandboxable — no arbitrary I/O" },
      { type: "table", head: ["Concept", "Purpose"], rows: [
        ["BUILD", "Declares targets (libraries, binaries, tests) in a package"],
        [".bzl", "Defines reusable rules and functions (loaded by BUILD files)"],
        ["load()", "Imports symbols from another .bzl file — the only import mechanism"],
        ["rule()", "Defines a new build rule (in .bzl)"],
        ["attr", "Declares typed attributes on a rule (srcs, deps, etc.)"],
        ["ctx.actions", "The only way to produce outputs — must declare inputs and outputs"],
        ["visibility", "Controls which packages can depend on this target"],
        ["glob()", "Expands file patterns at load time (deterministic)"],
      ] },
    ],
  },
  {
    n: 7, part: 5,
    title: "Critique (Code Review)",
    tagline: "The single gate that keeps the monorepo green.",
    insight: "Code review is mandatory and integrated into the commit workflow. No change lands without approval.",
    demo: "critique",
    content: [
      { type: "p", text: "Critique is Google's code review tool, deeply integrated with Piper and CITC. Commits are only allowed after a code review via Critique. The monorepo makes enforcing a single gate possible — at least one engineer other than the author must approve changes." },
      { type: "code", text: "Review workflow:\n\n1. Developer makes change in CITC workspace\n2. Sends change for review via Critique\n3. Automated presubmit tests run\n4. Reviewer(s) examine diff, comment, approve\n5. Auto-commit option available\n   (useful across time zones)\n6. Tests pass → committed to Piper\n\nDirectory owners must approve changes\nto their paths (CODEOWNERS)." },
      { type: "table", head: ["Feature", "Description"], rows: [
        ["Mandatory review", "All changes require ≥1 reviewer"],
        ["Directory ownership", "Owners must approve their paths"],
        ["Auto-commit", "Commit on approval if tests pass"],
        ["Presubmit", "Automated checks before landing"],
      ] },
      { type: "insight", text: "When sending a change out for code review, developers can enable an auto-commit option, particularly useful when code authors and reviewers are in different time zones. When the review is marked complete, tests run; if they pass, code commits without further human intervention." },
    ],
  },
  {
    n: 8, part: 5,
    title: "Tricorder (Static Analysis)",
    tagline: "Program analysis as a scalable ecosystem.",
    insight: "Static analysis tools help developers find bugs, improve readability, and ensure consistent style.",
    demo: "tricorder",
    content: [
      { type: "p", text: "Tricorder is Google's program analysis platform aimed at building a data-driven ecosystem around program analysis. It provides a scalable architecture that integrates seamlessly into the developer workflow across large codebases." },
      { type: "code", text: "Tricorder principles:\n\n• Data-driven: Uses empirical evaluation\n  to measure usefulness and impact\n\n• Ecosystem: Multiple analysis tools\n  share infrastructure\n\n• Scalable: Runs across billions\n  of lines of code\n\n• Integrated: Findings appear in\n  Critique code review interface" },
      { type: "table", head: ["Analysis Type", "Example"], rows: [
        ["Bug finding", "Null pointer, resource leaks"],
        ["Readability", "Naming, structure improvements"],
        ["Style", "Consistent formatting"],
        ["Security", "Vulnerability detection"],
      ] },
      { type: "insight", text: "Static analysis tools can be difficult to smoothly integrate with each other and into the developer workflow, particularly when scaling to large codebases. Tricorder solves this by providing a common platform." },
    ],
  },
  {
    n: 9, part: 6,
    title: "Borg (Cluster Management)",
    tagline: "The system that runs everything at Google.",
    insight: "Borg runs hundreds of thousands of jobs across tens of thousands of machines. It is the foundation of Google's infrastructure.",
    demo: "borg",
    content: [
      { type: "p", text: "Borg is Google's cluster manager that runs hundreds of thousands of jobs, from many thousands of different applications, across a number of clusters each with up to tens of thousands of machines. It achieves high utilization by combining admission control, efficient task-packing, over-commitment, and machine sharing with process-level performance isolation." },
      { type: "code", text: "Borg cell characteristics:\n\n• Median cell size: ~10k machines\n• Production jobs: ~70% CPU allocation\n• Non-production: ~30% CPU allocation\n• Memory: 55% allocated, 85% used\n\nJob specification: BCL language\n(declarative, protobuf-based)\n\nTasks run in Linux containers\n(not VMs — avoids virtualization cost)" },
      { type: "table", head: ["Property", "Description"], rows: [
        ["Scale", "100k+ jobs, 10k+ machines/cell"],
        ["Isolation", "Process-level, Linux containers"],
        ["Scheduling", "Admission control, task-packing"],
        ["Availability", "Runtime features for fault recovery"],
        ["Over-subscription", "Linked limits for prod & batch"],
      ] },
      { type: "insight", text: "Borg supports high-availability applications with runtime features that minimize fault-recovery time, and scheduling policies that reduce the probability of correlated failures." },
    ],
  },
  {
    n: 10, part: 7,
    title: "BAB (Binary Authorization for Borg)",
    tagline: "Ensuring only reviewed, authorized code reaches production.",
    insight: "BAB ensures code and configuration deployed meet specific minimum standards, especially when code can access user data.",
    demo: "bab",
    content: [
      { type: "p", text: "Binary Authorization for Borg (BAB) is an internal enforcement check performed during software deployment. It helps protect Google's software supply chain from insider risk by ensuring production software is reviewed and authorized before deployment, especially when code can access sensitive data." },
      { type: "code", text: "BAB enforcement:\n\n1. Code review: Source must be reviewed\n2. Verifiable build: Container image\n   traced to auditable source\n3. Containerized deployment: \n   Deployment config under review\n4. Service identity: Borg provides\n   cryptographic credentials\n\nDeploy-time enforcement:\nBorg Prime checks BAB before\nissuing ALTS certificates\n\nContinuous verification:\nRuns at least daily after deploy" },
      { type: "table", head: ["BAB Check", "Requirement"], rows: [
        ["Code auditability", "Image traceable to source, 18mo retention"],
        ["Code committed", "From defined repo locations"],
        ["Config committed", "All deployment config reviewed"],
        ["Service policy", "Per-service security requirements"],
      ] },
      { type: "insight", text: "BAB reduces insider risk because it ensures production software is reviewed and approved before deployment. It supports production systems' uniformity and provides a common language for data protection across teams." },
    ],
  },
  {
    n: 11, part: 8,
    title: "Copybara (External Code Flow)",
    tagline: "Moving code between internal and external repositories.",
    insight: "Copybara is stateless — it stores state in the destination repository. This allows multiple users to get the same result.",
    demo: "copybara",
    content: [
      { type: "p", text: "Copybara is a tool for transforming and moving code between repositories. A common case is a project that maintains a confidential repository and a public repository in sync. Copybara requires one repository to be authoritative, so there is always one source of truth." },
      { type: "code", text: "Copybara workflow:\n\nConfidential repo ← → Public repo\n\n• Importing sections of code from\n  confidential to public repository\n• Importing code from public\n  to confidential repository\n• Synchronizing changes bidirectionally\n\nStateless design:\nState stored as label in commit message\nAllows multiple users to share config" },
      { type: "table", head: ["Use Case", "Direction"], rows: [
        ["Open source publishing", "Internal → External"],
        ["External contributions", "External → Internal"],
        ["Third-party imports", "External → Internal"],
        ["Release snapshots", "Internal → External"],
      ] },
    ],
  },
  {
    n: 12, part: 9,
    title: "End-to-End Google Engineering",
    tagline: "How all the pieces fit together.",
    insight: "Every layer must be content-addressed for correctness and caching. The metadata service is the keystone.",
    demo: "endtoend",
    content: [
      { type: "p", text: "A complete Google-scale engineering architecture: Developer → CITC Workspace → Piper Repository → Critique Review → Tricorder Analysis → Bazel Build → Borg Execution → BAB Authorization → Production." },
      { type: "code", text: "The full stack:\n\n1. Developer edits in CITC FUSE workspace\n2. Changes stored in Piper (Spanner-backed)\n3. Critique review enforced by directory owners\n4. Tricorder runs static analysis in review\n5. Bazel (Starlark config) builds only affected targets\n   (action graph, hermetic sandboxing)\n6. Borg schedules and runs jobs on cluster\n7. BAB ensures only authorized code runs\n   with production service identities\n8. Copybara syncs external repositories" },
      { type: "table", head: ["Layer", "Tool", "Responsibility"], rows: [
        ["Workspace", "CITC", "Virtual filesystem, <10 files local"],
        ["Source", "Piper", "Centralized VCS, 86TB, Spanner-backed"],
        ["Review", "Critique", "Mandatory approval, presubmit"],
        ["Analysis", "Tricorder", "Static analysis ecosystem"],
        ["Build", "Bazel", "Hermetic, action-graph, 99% cache hits"],
        ["Configuration", "Starlark", "Hermetic, decidable BUILD/.bzl files"],
        ["Execution", "Borg", "Cluster scheduling, containers"],
        ["Security", "BAB", "Deploy-time authorization"],
        ["External", "Copybara", "Internal ↔ external sync"],
      ] },
      { type: "insight", text: "Google's developer workflow: thousands of engineers develop against head, submitting up to 60 changes per minute. This is enabled by a strong testing culture and the infrastructure that ties it all together." },
    ],
  },
  {
    n: 13, part: 0,
    title: "The Cost Model of a Monorepo",
    tagline: "Make the tradeoffs explicit before choosing the repository shape.",
    insight: "A monorepo centralizes coordination so the organization can invest once in shared tooling.",
    content: [
      { type: "p", text: "Before designing tooling, name the costs. A monorepo increases the blast radius of poor ownership and requires fast indexing, access control, and build analysis. In return, it removes repeated dependency publication, cross-repository synchronization, and long-lived version skew." },
      { type: "table", head: ["Pressure", "Monorepo response"], rows: [["Many teams share libraries", "One graph with explicit owners"], ["Changes cross boundaries", "Atomic commit and presubmit"], ["Repository becomes huge", "Virtual workspaces and metadata services"], ["Builds become expensive", "Incremental graph and remote cache"]] },
      { type: "insight", text: "The correct question is not whether a monorepo is fashionable. It is whether the organization is willing to operate the platform that makes one safe and fast." },
    ],
  },
  {
    n: 14, part: 0,
    title: "Dependency Graphs and Ownership",
    tagline: "Turn a directory tree into a system people can reason about.",
    insight: "A repository is governable when every important dependency and boundary has an owner.",
    content: [
      { type: "p", text: "The first engineering artifact in a large monorepo is not the folder tree; it is the dependency graph. Teams need to know who owns a target, which APIs are stable, what may depend on what, and which migrations are in progress." },
      { type: "code", text: "service_a -> shared/auth -> crypto\nservice_b -> shared/auth -> crypto\n\nOwnership rules:\n- Every target has an accountable team\n- Public APIs are explicit\n- Dependency direction is reviewed\n- Cycles are rejected or isolated" },
      { type: "table", head: ["Control", "Why it matters"], rows: [["CODEOWNERS", "Routes review to accountable teams"], ["Visibility", "Prevents accidental coupling"], ["Layer rules", "Keeps architecture directional"], ["Deprecation policy", "Makes change survivable"]] },
    ],
  },
  {
    n: 15, part: 1,
    title: "Trunk, Releases, and Change Management",
    tagline: "Learn how a fast mainline stays stable without a branch for every feature.",
    insight: "Trunk-based development moves risk management into tests, flags, ownership, and staged rollout.",
    content: [
      { type: "p", text: "A single trunk does not mean every change is immediately visible to every user. Engineers use small commits, feature flags, backward-compatible schemas, and staged rollouts. Releases are selected views of trunk rather than long-lived development branches." },
      { type: "table", head: ["Technique", "Failure it controls"], rows: [["Small changes", "Hard-to-review mega commits"], ["Feature flags", "Incomplete work breaking users"], ["Backward compatibility", "Readers and writers deploying apart"], ["Automated rollback", "A bad change spreading globally"]] },
    ],
  },
  {
    n: 16, part: 2,
    title: "Piper Data Model",
    tagline: "Separate names, revisions, metadata, and content so scale does not collapse the system.",
    insight: "Large source control systems treat metadata as a first-class distributed data product.",
    content: [
      { type: "p", text: "A source control service must answer different questions: what path exists, which revision names it, who may read it, what content is stored, and which changes produced it. Keeping these concerns distinct lets metadata stay responsive while content is fetched only when needed." },
      { type: "code", text: "Path -> revision -> content digest\n  |          +-- ACL and ownership metadata\n  +-- directory listing and history\n\nRead path:\n1. Resolve name and permissions\n2. Resolve revision and digest\n3. Fetch content on demand" },
      { type: "table", head: ["Layer", "Primary question"], rows: [["Namespace", "What path does the user mean?"], ["Revision", "Which snapshot is authoritative?"], ["Metadata", "Who owns and may access it?"], ["Content", "What bytes belong to this digest?"]] },
    ],
  },
  {
    n: 17, part: 2,
    title: "Consistency, History, and Safe Writes",
    tagline: "Make concurrent edits predictable when thousands of engineers land changes.",
    insight: "Concurrency control is a product decision: preserve atomic intent while keeping independent work moving.",
    content: [
      { type: "p", text: "At scale, source control is a concurrency service. A submit operation validates the base revision, permissions, ownership, and presubmit results before creating a new snapshot. Conflicts should be detected early, and retries must never duplicate a successful write." },
      { type: "table", head: ["Invariant", "Implementation consequence"], rows: [["Atomic change", "All files share one commit identity"], ["No lost update", "Validate against an expected base"], ["Auditable history", "Record author, reviewer, and submitter"], ["Idempotent retry", "Use stable change identifiers"]] },
    ],
  },
  {
    n: 18, part: 3,
    title: "CITC Read and Write Paths",
    tagline: "Understand what happens when a virtual workspace opens, reads, and edits a file.",
    insight: "A virtual workspace is useful only when its cache semantics are visible and predictable to developers.",
    content: [
      { type: "p", text: "CITC makes a remote repository feel local by combining a filesystem client, metadata lookups, content fetches, and a local write layer. Reads can be lazy, but edits must become durable snapshots that survive machine changes and remain visible to review tools." },
      { type: "code", text: "open(path)\n  -> metadata lookup\n  -> permission check\n  -> content fetch or cache hit\nwrite(path, bytes)\n  -> local snapshot\n  -> upload delta\n  -> workspace revision update" },
      { type: "table", head: ["Event", "Expected behavior"], rows: [["Cold read", "Fetch metadata, then content"], ["Warm read", "Serve from local cache"], ["Edit", "Persist a workspace snapshot"], ["Machine switch", "Rehydrate from cloud state"]] },
    ],
  },
  {
    n: 19, part: 3,
    title: "Remote Development and Failure Modes",
    tagline: "Design a cloud workspace that remains useful when networks and machines fail.",
    insight: "Remote development needs explicit offline, degraded, retry, and recovery behavior.",
    content: [
      { type: "p", text: "A cloud workspace changes the failure boundary. Latency, stale caches, disconnected clients, and partial uploads are normal operating conditions. The client must distinguish a missing file from a temporary network failure and make recovery safe rather than silently losing edits." },
      { type: "table", head: ["Failure", "Resilient response"], rows: [["Network timeout", "Retry with bounded backoff"], ["Stale metadata", "Refresh revision before write"], ["Partial upload", "Resume by content digest"], ["Lost machine", "Restore workspace snapshot"]] },
    ],
  },
  {
    n: 20, part: 4,
    title: "Build Graph Design",
    tagline: "Move from compiling files to analyzing actions and dependencies.",
    insight: "The build graph is the executable architecture of a monorepo.",
    content: [
      { type: "p", text: "A scalable build system first loads declarations, then analyzes configured targets, then executes actions. This separation allows it to discover invalid dependencies before running tools and schedule independent work across machines." },
      { type: "code", text: "source files -> targets -> configured targets -> actions\n\n//app:app\n  inputs: [main.cc, //math:math]\n  tool: cc-linker\n  outputs: [app]" },
      { type: "table", head: ["Phase", "Produces"], rows: [["Loading", "Packages and rule declarations"], ["Analysis", "Configured target and action graphs"], ["Execution", "Only stale actions"], ["Caching", "Outputs keyed by declared inputs"]] },
    ],
  },
  {
    n: 21, part: 5,
    title: "Presubmit as a Distributed System",
    tagline: "Make review fast enough that safety does not become a queue.",
    insight: "Presubmit is a scheduling and prioritization problem as much as it is a testing problem.",
    content: [
      { type: "p", text: "At high change rates, presubmit must select the smallest meaningful test set, reuse results safely, cancel obsolete work, and surface failures with actionable ownership. A test system that is perfectly thorough but too slow will be bypassed or ignored." },
      { type: "table", head: ["Capability", "Developer value"], rows: [["Affected-target analysis", "Avoid unrelated tests"], ["Result caching", "Reuse identical work"], ["Flake detection", "Separate infrastructure noise from regressions"], ["Failure ownership", "Route fixes to the right team"]] },
    ],
  },
  {
    n: 22, part: 6,
    title: "Borg Scheduling Fundamentals",
    tagline: "Place work on machines while balancing utilization, latency, and failure risk.",
    insight: "A scheduler is an economic system for scarce resources under uncertainty.",
    content: [
      { type: "p", text: "Borg-like scheduling combines admission control, placement constraints, priorities, quotas, and reclamation. The scheduler must pack work efficiently without allowing batch jobs to starve latency-sensitive production services." },
      { type: "table", head: ["Signal", "Scheduling decision"], rows: [["CPU and memory", "Which machines can fit the task?"], ["Priority", "Which task wins contention?"], ["Affinity", "Where should related tasks run?"], ["Disruption budget", "How much can be moved safely?"]] },
    ],
  },
  {
    n: 23, part: 6,
    title: "Service Reliability and Capacity",
    tagline: "Turn placement into a reliable production service.",
    insight: "Utilization is useful only when paired with headroom, isolation, and a recovery plan.",
    content: [
      { type: "p", text: "Production execution requires more than finding a free machine. Services need replicas, health checks, graceful termination, capacity reservations, and recovery from machine or zone failure. Batch work can improve utilization, but it must yield predictably." },
      { type: "code", text: "desired replicas: 3\nfailure domains: 3 zones\nreadiness: serving traffic\nliveness: process is healthy\nbatch policy: reclaimable\nrollback: previous task set" },
      { type: "table", head: ["Mechanism", "Reliability role"], rows: [["Replication", "Survive instance failure"], ["Health checks", "Stop routing to bad tasks"], ["Over-commitment", "Increase utilization carefully"], ["Rollback", "Restore a known-good version"]] },
    ],
  },
  {
    n: 24, part: 7,
    title: "Release Engineering and Progressive Delivery",
    tagline: "Move a reviewed build to users without turning deployment into a cliff.",
    insight: "A release is a controlled experiment with an explicit rollback path.",
    content: [
      { type: "p", text: "Progressive delivery starts with a verifiable artifact, sends it to a small population, measures health, and expands only when evidence is good. The repository, build graph, deployment configuration, and runtime identity must remain connected so operators can explain what is running." },
      { type: "table", head: ["Stage", "Evidence"], rows: [["Canary", "New version serves a small slice"], ["Observe", "Errors and latency stay within budget"], ["Expand", "Traffic increases in controlled steps"], ["Rollback", "Previous artifact is immediately available"]] },
    ],
  },
  {
    n: 25, part: 7,
    title: "Identity, Secrets, and Supply Chain",
    tagline: "Connect source provenance to the permissions a running service receives.",
    insight: "The strongest deployment policy proves where code came from and why it is allowed to run.",
    content: [
      { type: "p", text: "Security is not a final scanner. It spans source review, dependency provenance, hermetic builds, artifact signing, runtime identity, least privilege, and audit logs. Each stage should produce evidence the next stage can verify." },
      { type: "code", text: "reviewed source\n  -> hermetic build\n  -> signed artifact\n  -> approved deployment config\n  -> short-lived service identity\n  -> audited production access" },
      { type: "table", head: ["Control", "Threat reduced"], rows: [["Artifact provenance", "Unreviewed binaries"], ["Least privilege", "Excessive service access"], ["Secret manager", "Credentials in source"], ["Audit trail", "Unattributed production actions"]] },
    ],
  },
  {
    n: 26, part: 8,
    title: "Mirrors, Open Source, and Repository Boundaries",
    tagline: "Share code externally without confusing synchronization with authority.",
    insight: "Every mirrored flow needs one authoritative source, a transformation policy, and an observable state marker.",
    content: [
      { type: "p", text: "Internal and public repositories often have different visibility, history, and generated-file rules. A synchronization tool must define what crosses the boundary, how identities are mapped, how conflicts are resolved, and where the last successful sync is recorded." },
      { type: "table", head: ["Decision", "Question"], rows: [["Authority", "Which repository wins a conflict?"], ["Transformation", "Which paths and identities change?"], ["State", "How is the last sync identified?"], ["Review", "Who approves external publication?"]] },
    ],
  },
  {
    n: 27, part: 9,
    title: "Operating the Developer Platform",
    tagline: "Measure whether the system is making engineers faster and safer.",
    insight: "A platform is successful when reliability and developer experience are measured together.",
    content: [
      { type: "p", text: "The final layer is operations: ownership, service-level objectives, incident response, capacity planning, and product feedback. Track time to first edit, presubmit latency, cache hit rate, failed submission recovery, deployment frequency, and change failure rate." },
      { type: "table", head: ["Metric", "What it reveals"], rows: [["Edit-to-review time", "Workspace and authoring friction"], ["Presubmit p95", "Feedback-loop health"], ["Cache hit rate", "Build graph quality"], ["Change failure rate", "Release safety"]] },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES: Record<number, any[]> = {
  0: [
    { q: "What best describes a monorepo?", opts: ["A Git feature", "An architectural choice to store many projects in one repository", "A build system", "A CI/CD pipeline"], ans: 1, exp: "A monorepo is an architectural choice — not a Git feature — to store many logically independent projects in a single version-controlled repository." },
    { q: "What is the primary tradeoff of a monorepo?", opts: ["Speed vs. safety", "Coordination cost vs. tooling investment", "Storage vs. compute", "Open source vs. proprietary"], ans: 1, exp: "Monorepos trade coordination cost (high in polyrepos) for tooling investment (high in monorepos). At scale, every monorepo decision becomes a systems problem." },
  ],
  1: [
    { q: "Why does filesystem metadata become the bottleneck?", opts: ["Disks are slow", "Build tools must stat every file to discover changes", "Compression is expensive", "Network is slow"], ans: 1, exp: "Every build tool traverses directories to discover files. With 10M files, a naive traversal generates 10M stat calls. Metadata caching, directory snapshots, and avoiding full-tree walks are required." },
    { q: "How does Piper handle metadata queries?", opts: ["Full tree walk each time", "Metadata service caches directory listings in Spanner", "Rebuilds index on every commit", "No metadata layer"], ans: 1, exp: "Piper stores metadata in Spanner, enabling fast directory listing without touching file content. Build tools query the metadata service rather than the filesystem directly." },
  ],
  2: [
    { q: "What is trunk-based development?", opts: ["Feature branches per developer", "All developers commit to a single mainline", "Separate branches per release", "Pull requests only"], ans: 1, exp: "Trunk-based development: all developers commit to a single mainline (trunk). Feature branches are rare; in-progress work is hidden behind runtime flags." },
    { q: "How many daily changes did Google average to its monorepo?", opts: ["1,000", "10,000", "40,000–60,000", "1,000,000"], ans: 2, exp: "Google averaged 40,000–60,000 changes per day to a single repository, shared among 25,000+ developers." },
  ],
  3: [
    { q: "What distributed storage does Piper use for metadata and content?", opts: ["PostgreSQL", "Spanner", "MongoDB", "Cassandra"], ans: 1, exp: "Piper stores metadata and file content in Google's Spanner, a globally distributed, externally consistent database. Data is replicated across 10 data centers using Paxos." },
    { q: "What percentage of Piper files are visible to all Google engineers?", opts: ["50%", "75%", "99%+", "100%"], ans: 2, exp: "Over 99% of files stored in Piper are visible to all full-time Google engineers. Less than 1% are access-controlled for sensitive data. All reads and writes are logged." },
  ],
  4: [
    { q: "How many files does the average CITC workspace contain?", opts: ["1000+", "100", "10", "<10"], ans: 3, exp: "CITC workspaces typically consume only a small amount of storage — an average workspace has fewer than 10 files. The full Piper repository is presented as a virtual view through FUSE." },
    { q: "What filesystem technology does CITC use?", opts: ["NFS", "FUSE", "ext4", "ZFS"], ans: 1, exp: "CITC consists of a cloud storage backend and a Linux-only FUSE (Filesystem in Userspace) file system. Developers see their workspaces as directories in the file system." },
  ],
  5: [
    { q: "What cache hit rate does Bazel achieve at Google?", opts: ["~50%", "~75%", "~90%", "99%+"], ans: 3, exp: "At Google, Bazel routinely achieves cache hit rates north of 99%. Bazel knows exactly what input files each build command needs, avoiding unnecessary work by re-running only when inputs have changed." },
    { q: "What are the two phases of a Bazel build?", opts: ["Compile and Link", "Loading/Analysis and Execution", "Fetch and Build", "Parse and Run"], ans: 1, exp: "Bazel build proceeds through two phases: Loading & analysis produces the target graph and action graph; Execution walks the action graph, running each action whose outputs are stale, as much in parallel as possible." },
  ],
  6: [
    { q: "What is Starlark?",
      opts: [
        "A build system",
        "A Python dialect used for Bazel configuration",
        "A version control system",
        "A code review tool",
      ],
      ans: 1,
      exp: "Starlark (formerly Skylark) is a dialect of Python used in Bazel's BUILD and .bzl files. It is deliberately restricted — no recursion, no I/O, no side effects — so the build graph is always decidable.",
    },
    {
      q: "Why does Starlark ban recursion and while loops?",
      opts: [
        "To make it faster",
        "To guarantee the build graph is always computable in advance",
        "Because Python doesn't support them",
        "For security only",
      ],
      ans: 1,
      exp: "A Turing-complete configuration language would make the build graph undecidable. Starlark's restrictions guarantee Bazel can always determine the complete set of targets, dependencies, and actions without running arbitrary code. This enables hermeticity, parallelism, and remote caching.",
    },
  ],
  7: [
    { q: "What is required before a change can be committed to Piper?", opts: ["Manager approval", "Code review by ≥1 other engineer", "A Jira ticket", "Passing 100 tests"], ans: 1, exp: "Commits are only allowed after a code review via the Critique tool. Most source code requires at least one engineer other than the developer to review and approve changes before they can be committed." },
    { q: "What is the auto-commit feature in Critique?", opts: ["Automatically generates code", "Commits when review is complete and tests pass", "Automatically assigns reviewers", "Creates a branch automatically"], ans: 1, exp: "When sending a change out for code review, developers can enable an auto-commit option. When the review is marked as complete, tests run; if they pass, the code is committed to the repository without further human intervention." },
  ],
  8: [
    { q: "What is Tricorder?", opts: ["A code review tool", "A program analysis platform", "A build system", "A version control system"], ans: 1, exp: "Tricorder is a program analysis platform aimed at building a data-driven ecosystem around program analysis. Static analysis tools help developers find bugs, improve code readability, and ensure consistent style." },
    { q: "How does Tricorder integrate with the developer workflow?", opts: ["Separate CLI", "Findings appear in Critique code review", "Only during build", "Only post-commit"], ans: 1, exp: "Tricorder provides a scalable architecture that integrates seamlessly into the developer workflow. Findings appear directly in the Critique code review interface." },
  ],
  9: [
    { q: "What is the median cell size in Borg?", opts: ["100 machines", "1,000 machines", "10,000 machines", "100,000 machines"], ans: 2, exp: "Borg's median cell size is about 10,000 machines after excluding test cells; some are much larger. Borg runs hundreds of thousands of jobs across these clusters." },
    { q: "How are Borg tasks isolated?", opts: ["Virtual machines", "Linux containers", "Separate physical machines", "Process-level only"], ans: 1, exp: "Each Borg task maps to a set of Linux processes running in a container on a machine. The vast majority of the Borg workload does not run inside virtual machines because Google doesn't want to pay the cost of virtualization." },
  ],
  10: [
    { q: "What does BAB stand for?", opts: ["Binary Authorization for Borg", "Basic Access Broker", "Build Automation Bridge", "Borg Application Binary"], ans: 0, exp: "BAB stands for Binary Authorization for Borg. It is an internal enforcement check performed during software deployment to protect Google's software supply chain from insider risk." },
    { q: "When does BAB's deploy-time enforcement check run?", opts: ["After the task starts running", "Before Borg Prime issues ALTS certificates", "During code review", "After deployment completes"], ans: 1, exp: "Borg Prime is the central controller that acts as certificate authority for ALTS. When a new task is submitted, Borg Prime contacts BAB to ensure the task meets service-specific policy requirements before Borg Prime issues ALTS certificates to the task." },
  ],
  11: [
    { q: "What is Copybara used for?", opts: ["Building code", "Moving code between repositories", "Reviewing code", "Running tests"], ans: 1, exp: "Copybara is a tool for transforming and moving code between repositories. A common case involves maintaining a confidential repository and a public repository in sync." },
    { q: "How does Copybara maintain state?", opts: ["Local database", "In the destination repository as a commit label", "Cloud service", "It doesn't maintain state"], ans: 1, exp: "Copybara is stateless — it stores the state in the destination repository (as a label in the commit message). This allows several users or a service to use Copybara for the same config/repositories and get the same result." },
  ],
  12: [
    { q: "In the full stack, what does Tricorder do?", opts: ["Builds code", "Reviews code", "Runs static analysis in review", "Deploys to production"], ans: 2, exp: "Tricorder runs static analysis and surfaces findings directly in the Critique code review interface, so issues are caught before landing." },
    { q: "What ties all the layers together?", opts: ["A single script", "Metadata services and content addressing", "Manual coordination", "Email"], ans: 1, exp: "Every layer must be content-addressed for correctness and caching. Metadata services are the keystone — everything else queries them. This is what makes end-to-end Google engineering coherent." },
  ],
  13: [{ q: "What does a monorepo centralize?", opts: ["Only source files", "Coordination and tooling investment", "Production traffic", "User authentication"], ans: 1, exp: "A monorepo centralizes coordination, dependency visibility, and tooling investment so teams can make atomic changes across boundaries." }],
  14: [{ q: "Why are ownership rules important?", opts: ["They reduce file size", "They make dependency boundaries accountable", "They replace tests", "They remove all reviews"], ans: 1, exp: "Ownership rules make important targets and dependency boundaries accountable to specific teams, which keeps a large graph governable." }],
  15: [{ q: "How does trunk-based development manage incomplete work?", opts: ["Long-lived branches", "Feature flags and small compatible changes", "Manual copying", "No testing"], ans: 1, exp: "Trunk-based teams use small changes, feature flags, compatibility practices, and staged rollout rather than long-lived feature branches." }],
  16: [{ q: "Why separate metadata from content?", opts: ["To avoid permissions", "To keep listings responsive while content is fetched on demand", "To remove history", "To disable caching"], ans: 1, exp: "Separating metadata from content lets the service answer namespace and permission questions quickly without fetching file bytes unnecessarily." }],
  17: [{ q: "What prevents a retry from creating duplicate writes?", opts: ["A larger repository", "A stable change identifier", "A slower client", "A feature flag"], ans: 1, exp: "Idempotent writes use stable change identifiers so a retried request can safely recognize work that already succeeded." }],
  18: [{ q: "What does a warm CITC read use?", opts: ["A full clone", "A local cache after metadata resolution", "A new repository", "A release branch"], ans: 1, exp: "A warm read reuses locally cached content after the workspace resolves the path and permissions." }],
  19: [{ q: "What should a workspace do after a partial upload?", opts: ["Delete the edit", "Resume by content digest", "Restart the whole repository", "Ignore the failure"], ans: 1, exp: "Content digests make partial uploads resumable and prevent silent loss of edits." }],
  20: [{ q: "Which phase produces the action graph?", opts: ["Loading only", "Analysis", "Deployment", "Code review"], ans: 1, exp: "The analysis phase turns declared targets into configured targets and executable actions before execution begins." }],
  21: [{ q: "Why does presubmit use affected-target analysis?", opts: ["To skip all tests", "To run the smallest meaningful test set", "To hide failures", "To avoid ownership"], ans: 1, exp: "Affected-target analysis keeps feedback fast by selecting tests that can actually be affected by the change." }],
  22: [{ q: "What is admission control for?", opts: ["Choosing file names", "Deciding whether work can enter the cluster", "Formatting code", "Publishing packages"], ans: 1, exp: "Admission control ensures a task has sufficient quota, resources, and policy approval before scheduling." }],
  23: [{ q: "Why pair utilization with headroom?", opts: ["To waste machines", "To absorb failures and traffic variation", "To disable replicas", "To remove health checks"], ans: 1, exp: "Headroom gives the scheduler room to recover from failures and absorb demand without immediately overloading healthy tasks." }],
  24: [{ q: "What is the purpose of a canary?", opts: ["Replace all tests", "Expose a new release to a small population first", "Delete the old artifact", "Skip observability"], ans: 1, exp: "A canary limits exposure while operators measure whether the new artifact is healthy before expanding traffic." }],
  25: [{ q: "What connects a deployed artifact to its source?", opts: ["Artifact provenance", "A larger VM", "A UI theme", "A branch name alone"], ans: 0, exp: "Artifact provenance records how a binary was produced and connects it to reviewed source and build evidence." }],
  26: [{ q: "What must every repository mirror define?", opts: ["Two authorities", "One authority and a transformation policy", "No state", "Unreviewed publication"], ans: 1, exp: "A reliable mirror defines one authoritative source, the transformation rules, and an observable marker for synchronization state." }],
  27: [{ q: "Which metric reveals build graph quality?", opts: ["Cache hit rate", "Logo size", "Number of icons", "Sidebar width"], ans: 0, exp: "Cache hit rate reveals whether declared inputs and action boundaries allow the build system to reuse correct work." }],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Monorepo", def: "A single version-controlled repository containing many projects, services, and libraries.", ch: 0 },
  { term: "Polyrepo", def: "Multiple independent repositories, each containing a subset of projects.", ch: 0 },
  { term: "Piper", def: "Google's centralized version control system, built on Spanner, replicated across data centers.", ch: 3 },
  { term: "CITC", def: "Clients in the Cloud — a FUSE filesystem presenting the full Piper repository as a virtual view.", ch: 4 },
  { term: "Bazel", def: "Google's build system (open-sourced version of Blaze). Action-graph based, hermetic, 99%+ cache hit rates.", ch: 5 },
  { term: "Blaze", def: "Google's internal build system. Open-sourced as Bazel.", ch: 5 },
  { term: "Critique", def: "Google's code review tool, integrated with Piper and CITC. Mandatory approval before commit.", ch: 6 },
  { term: "Tricorder", def: "Google's program analysis platform for static analysis at scale.", ch: 7 },
  { term: "Borg", def: "Google's cluster manager running hundreds of thousands of jobs across tens of thousands of machines.", ch: 8 },
  { term: "BAB", def: "Binary Authorization for Borg — deploy-time enforcement ensuring only reviewed, authorized code runs in production.", ch: 9 },
  { term: "Copybara", def: "Tool for transforming and moving code between repositories (e.g., internal ↔ public).", ch: 10 },
  { term: "Spanner", def: "Google's globally distributed, externally consistent database. Piper stores metadata and content in Spanner.", ch: 3 },
  { term: "FUSE", def: "Filesystem in Userspace — allows user-space programs to implement filesystem behavior. CITC uses FUSE.", ch: 4 },
  { term: "Action graph", def: "Fine-grained build graph where each node is a single tool invocation with declared inputs/outputs.", ch: 5 },
  { term: "Hermetic build", def: "A build depending only on declared inputs, producing identical outputs regardless of environment.", ch: 5 },
  { term: "Presubmit", def: "Checks (tests, linting, analysis) that run before a change is committed.", ch: 6 },
  { term: "ALTS", def: "Application Layer Transport Security — Google's service identity and authentication system. BAB controls who gets ALTS certificates.", ch: 9 },
  { term: "Borg Prime", def: "The central Borg controller that acts as certificate authority for ALTS.", ch: 9 },
  { term: "BCL", def: "Borg Configuration Language — declarative job specification language, protobuf-based.", ch: 8 },
  { term: "Skyframe", def: "Bazel's incremental-computation framework. Nodes are SkyValues keyed by SkyKey.", ch: 5 },
  { term: "Paxos", def: "A consensus protocol used by Piper to replicate data across data centers, ensuring consistency.", ch: 3 },
  { term: "REAPI", def: "Remote Execution API — a gRPC protocol for remote caching and execution.", ch: 5 },
  { term: "CODEOWNERS", def: "A file that maps directory paths to owners who must approve changes to files under those paths.", ch: 6 },
  { term: "Trunk-based dev", def: "A branching model where developers commit to a single mainline, using feature flags for in-progress work.", ch: 2 },
  { term: "Action cache", def: "Bazel's store of build outputs keyed by a hash of all declared inputs.", ch: 5 },
  { term: "Content addressing", def: "Using a hash of content as its identifier, enabling deduplication and immutability.", ch: 5 },
  { term: "Over-commitment", def: "Borg's practice of allocating more resources than physically available, relying on statistical usage patterns.", ch: 8 },
  { term: "Starlark", def: "A Python dialect used for Bazel BUILD and .bzl files. Deliberately restricted — no recursion, no I/O, no side effects — so the build graph is always decidable.", ch: 6 },
{ term: "Skylark", def: "The former name of Starlark. Renamed in 2018.", ch: 6 },
{ term: "BUILD file", def: "A Starlark file declaring targets (libraries, binaries, tests) in a Bazel package.", ch: 6 },
{ term: ".bzl file", def: "A Starlark file defining reusable rules and functions, loaded by BUILD files via load().", ch: 6 },
{ term: "load()", def: "The only import mechanism in Starlark. Imports symbols from another .bzl file.", ch: 6 },
{ term: "rule()", def: "Starlark function that defines a new build rule, with typed attributes and an implementation function.", ch: 6 },
{ term: "ctx.actions", def: "The only way Starlark rules produce outputs. All inputs and outputs must be declared.", ch: 6 },
{ term: "Hermetic configuration", def: "Configuration that depends only on declared inputs. Starlark enforces this — no I/O, no env, no network.", ch: 6 },
{ term: "Dependency graph", def: "The directed relationship between targets and the libraries, tools, and data they require.", ch: 14 },
{ term: "Visibility", def: "A build rule policy that controls which packages may depend on a target.", ch: 14 },
{ term: "Idempotency", def: "The property that retrying the same write produces the same result without duplicating it.", ch: 17 },
{ term: "Workspace snapshot", def: "A durable view of in-progress edits that can be restored across machines.", ch: 18 },
{ term: "Content digest", def: "A hash identifying content so uploads, caches, and retries can avoid duplicate bytes.", ch: 19 },
{ term: "Configured target", def: "A target after build configuration and platform choices have been applied.", ch: 20 },
{ term: "Presubmit", def: "Automated checks that run before a change is committed to the mainline.", ch: 21 },
{ term: "Admission control", def: "A scheduler decision that determines whether a task is allowed into a cluster.", ch: 22 },
{ term: "Disruption budget", def: "A policy limiting how many instances of a service may be unavailable during maintenance.", ch: 23 },
{ term: "Canary release", def: "A deployment strategy that exposes a new artifact to a small population before expansion.", ch: 24 },
{ term: "Artifact provenance", def: "Evidence connecting a deployed binary to its reviewed source and build process.", ch: 25 },
{ term: "Repository authority", def: "The source designated as the winner when synchronized repositories disagree.", ch: 26 },
{ term: "Change failure rate", def: "The proportion of releases that require remediation, rollback, or create an incident.", ch: 27 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 2], [0, 3],
  [1, 3], [1, 4],
  [2, 3], [2, 7],
  [3, 4], [3, 5],
  [4, 5], [4, 6],            // CITC → Bazel, CITC → Starlark
  [5, 6],                     // Bazel → Starlark
  [5, 7], [5, 8],
  [6, 7],                     // Starlark → Critique
  [7, 8], [7, 9],
  [8, 9], [8, 10],
  [9, 10], [9, 11],
  [10, 11], [10, 12],
  [11, 12],
  [0, 13], [13, 14],
  [1, 15], [2, 15],
  [3, 16], [16, 17],
  [4, 18], [18, 19],
  [5, 20], [6, 20],
  [7, 21], [8, 21],
  [9, 22], [22, 23],
  [10, 24], [24, 25],
  [11, 26],
  [12, 27], [25, 27],
];

const NODE_POS: Record<number, { x: number; y: number }> = (() => {
  const W = 760, H = 520, CX = W / 2, CY = H / 2, R = 200;
  const pos: Record<number, { x: number; y: number }> = {};
  pos[0] = { x: CX, y: CY };
  const outer = PARTS.filter((p) => p.id > 0);
  outer.forEach((p, pi) => {
    const a = (pi / outer.length) * 2 * Math.PI - Math.PI / 2;
    const cx = CX + R * Math.cos(a), cy = CY + R * Math.sin(a);
    p.chs.forEach((n, ci) => {
      const r = p.chs.length === 1 ? 0 : 28;
      const ca = p.chs.length === 1 ? 0 : (ci / p.chs.length) * 2 * Math.PI + a;
      pos[n] = { x: cx + r * Math.cos(ca), y: cy + r * Math.sin(ca) };
    });
  });
  return pos;
})();

// ── Demos ─────────────────────────────────────────────────────────────────

function MonorepoDemo() {
  const [active, setActive] = useState<number | null>(null);
  const layers = [
    { l: "📦 Single tree", d: "One repository contains all projects, services, libraries", c: "#60A5FA" },
    { l: "🔗 Shared build graph", d: "Dependencies expressed once, resolved globally", c: "#818CF8" },
    { l: "⚛️ Atomic commits", d: "A change spans many files and lands as one unit", c: "#34D399" },
    { l: "🏢 Organizational view", d: "Directory structure reflects team boundaries", c: "#FBBF24" },
  ];
  return (
    <div style={{ paddingTop: 8 }}>
      {layers.map((l, i) => (
        <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 5, background: active === i ? `${l.c}22` : T.elevated, border: `1px solid ${active === i ? l.c : T.border}`, cursor: "pointer", transition: "all .2s" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.c, flexShrink: 0 }} />
          <span style={{ color: T.text, fontWeight: 600, fontSize: 13, flex: 1 }}>{l.l}</span>
          {active === i && <span style={{ color: l.c, fontSize: 12 }}>{l.d}</span>}
        </div>
      ))}
    </div>
  );
}

function ScaleDemo() {
  const [files, setFiles] = useState(1000000);
  const walkMs = (files * 10) / 1000;
  const cacheMs = 5;
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.text, fontSize: 14 }}>Files: {(files / 1e6).toFixed(1)}M</span>
        <span style={{ color: T.accent, fontSize: 14, fontFamily: "monospace" }}>Walk: {walkMs.toFixed(0)}s · Cache: {cacheMs}ms</span>
      </div>
      <input type="range" min="100000" max="10000000" step="100000" value={files} onChange={(e) => setFiles(Number(e.target.value))} style={{ width: "100%", marginBottom: 16, accentColor: T.accent }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ label: "Full tree walk", value: `${walkMs.toFixed(0)}s`, color: T.red }, { label: "Metadata cache", value: `${cacheMs}ms`, color: T.green }].map((m) => (
          <div key={m.label} style={{ padding: "12px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}` }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4, textTransform: "uppercase" }}>{m.label}</div>
            <div style={{ color: m.color, fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PiperDemo() {
  const [queryRate, setQueryRate] = useState(500);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.text, fontSize: 14 }}>Queries/sec</span>
        <span style={{ color: T.accent, fontSize: 16, fontFamily: "monospace", fontWeight: 700 }}>{(queryRate * 1000).toLocaleString()}</span>
      </div>
      <input type="range" min="10" max="1000" value={queryRate} onChange={(e) => setQueryRate(Number(e.target.value))} style={{ width: "100%", marginBottom: 16, accentColor: T.accent }} />
      <div style={{ padding: "14px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}`, marginBottom: 12 }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Piper architecture</div>
        <pre style={{ color: T.subtle, fontSize: 11, margin: 0, fontFamily: "monospace" }}>{`Client → Piper frontend
     → Spanner (metadata + content)
     → Paxos replication (10 DCs)`}</pre>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[{ l: "Repo size", v: "86TB" }, { l: "Developers", v: "25,000" }, { l: "Daily changes", v: "16,000" }].map((s) => (
          <div key={s.l} style={{ padding: "10px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{s.l}</div>
            <div style={{ color: T.text, fontSize: 14, fontWeight: 700 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CITCDemo() {
  const [localFiles, setLocalFiles] = useState(8);
  const totalFiles = 2000000;
  const pct = (localFiles / totalFiles) * 100;
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.text, fontSize: 14 }}>Modified files: {localFiles}</span>
        <span style={{ color: T.accent, fontSize: 14, fontFamily: "monospace" }}>{(pct).toFixed(4)}% of repo</span>
      </div>
      <input type="range" min="1" max="100" value={localFiles} onChange={(e) => setLocalFiles(Number(e.target.value))} style={{ width: "100%", marginBottom: 16, accentColor: T.accent }} />
      <div style={{ padding: "14px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}`, marginBottom: 12 }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Virtual filesystem view</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: i < localFiles ? T.accent : T.border, transition: "all .2s" }} />
          ))}
        </div>
      </div>
      <p style={{ color: T.muted, fontSize: 12, fontStyle: "italic" }}>
        Only modified files consume local storage. Average workspace: &lt;10 files.
      </p>
    </div>
  );
}

function BazelDemo() {
  const [hermetic, setHermetic] = useState(true);
  const [builtTarget, setBuiltTarget] = useState<string | null>(null);
  const targets = [
    { name: "//math:math", input: "add.cc + math.h", duration: "420 ms" },
    { name: "//app:app", input: "main.cc + //math:math", duration: "680 ms" },
    { name: "//tests:math_test", input: "math_test.cc + //math:math", duration: "510 ms" },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setHermetic(true)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${hermetic ? T.green : T.border}`, background: hermetic ? `${T.green}22` : T.elevated, color: hermetic ? T.green : T.muted, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Hermetic</button>
        <button onClick={() => setHermetic(false)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${!hermetic ? T.red : T.border}`, background: !hermetic ? `${T.red}22` : T.elevated, color: !hermetic ? T.red : T.muted, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Non-Hermetic</button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { l: "Remote cache safe", ok: hermetic },
          { l: "Reproducible outputs", ok: hermetic },
          { l: "Declared inputs only", ok: hermetic },
          { l: "Ambient env ignored", ok: hermetic },
        ].map((m) => (
          <div key={m.l} style={{ padding: "10px 14px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: T.text, fontSize: 13 }}>{m.l}</span>
            <span style={{ color: m.ok ? T.green : T.red, fontSize: 14, fontWeight: 700 }}>{m.ok ? "✓" : "✗"}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}` }}>
        <div style={{ color: T.text, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Action graph cache simulator</div>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 10 }}>Select a target to see whether Bazel can reuse its declared inputs.</div>
        <div style={{ display: "grid", gap: 6 }}>
          {targets.map((target) => {
            const hit = builtTarget === target.name;
            return (
              <button key={target.name} onClick={() => setBuiltTarget(target.name)} style={{ textAlign: "left", padding: "9px 12px", borderRadius: 8, background: hit ? `${T.green}22` : T.surface, border: `1px solid ${hit ? T.green : T.border}`, color: T.text, cursor: "pointer" }}>
                <span style={{ display: "block", fontFamily: "monospace", fontSize: 12, color: hit ? T.green : T.accent }}>{target.name}</span>
                <span style={{ display: "block", marginTop: 3, color: T.muted, fontSize: 11 }}>{target.input} · {hit ? `cache hit, reused in 2 ms` : `cold build: ${target.duration}`}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CritiqueDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { l: "Edit in CITC", d: "Developer modifies files in virtual workspace", c: "#60A5FA" },
    { l: "Send for Review", d: "Change uploaded to Critique", c: "#818CF8" },
    { l: "Presubmit Tests", d: "Automated checks run", c: "#FBBF24" },
    { l: "Reviewer Approval", d: "Directory owner or peer approves", c: "#34D399" },
    { l: "Auto-commit", d: "Tests pass → commit to Piper", c: "#22D3EE" },
  ];
  return (
    <div style={{ padding: 20 }}>
      {steps.map((s, i) => (
        <div key={i} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 4, background: step === i ? `${s.c}22` : T.elevated, border: `1px solid ${step === i ? s.c : T.border}`, cursor: "pointer", transition: "all .2s" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.c, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: T.text, fontWeight: 600, fontSize: 13 }}>{s.l}</div>
            <div style={{ color: T.muted, fontSize: 11 }}>{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TricorderDemo() {
  const [issues, setIssues] = useState<string[]>([]);
  const allIssues = [
    "Potential null pointer dereference at line 42",
    "Unused import 'java.util.concurrent'",
    "Method exceeds 100 lines (style violation)",
    "Resource 'FileInputStream' not closed in exception path",
    "Variable 'temp' shadows field 'temp'",
  ];
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setIssues(allIssues)} style={{ padding: "10px 20px", borderRadius: 20, background: T.accent, color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>▶ Run Analysis</button>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {issues.map((issue, i) => (
          <div key={i} style={{ padding: "10px 14px", borderRadius: 8, background: `${T.red}11`, border: `1px solid ${T.red}44`, color: T.text, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: T.red, fontWeight: 700 }}>⚠</span>
            {issue}
          </div>
        ))}
        {issues.length === 0 && <div style={{ color: T.muted, fontSize: 13, textAlign: "center", padding: 20 }}>The analyzer is ready. Run the scan to inspect this change for correctness, style, and security findings.</div>}
      </div>
    </div>
  );
}

function StarlarkDemo() {
  const [file, setFile] = useState<"BUILD" | "bzl">("BUILD");
  const files = {
    BUILD: `# BUILD file (Starlark)
load("//tools:my_rules.bzl", "my_cc_library")

my_cc_library(
    name = "math",
    srcs = ["add.cc", "sub.cc"],
    hdrs = ["math.h"],
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "app",
    srcs = ["main.cc"],
    deps = [":math"],
)`,
    bzl: `# .bzl file — rule definition
def _my_cc_library_impl(ctx):
    outputs = [ctx.actions.declare_file(...)]
    ctx.actions.run(
        executable = ctx.executable._compiler,
        inputs = ctx.files.srcs,
        outputs = outputs,
    )
    return [DefaultInfo(files = depset(outputs))]

my_cc_library = rule(
    implementation = _my_cc_library_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = [".cc"]),
        "hdrs": attr.label_list(allow_files = [".h"]),
        "deps": attr.label_list(),
    },
)`,
  };
  const restrictions = [
    { l: "No recursion", ok: false },
    { l: "No while loops", ok: false },
    { l: "No file I/O", ok: false },
    { l: "No dynamic imports", ok: false },
    { l: "Deterministic evaluation", ok: true },
    { l: "Parallel-safe", ok: true },
    { l: "Decidable build graph", ok: true },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(["BUILD", "bzl"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFile(f)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 8,
              border: `2px solid ${file === f ? T.accent : T.border}`,
              background: file === f ? `${T.accent}22` : T.elevated,
              color: file === f ? T.accent : T.muted,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            {f === "BUILD" ? "BUILD" : ".bzl"}
          </button>
        ))}
      </div>
      <pre
        style={{
          background: "#020812",
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          overflow: "auto",
          fontSize: 11,
          color: "#7DD3FC",
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          lineHeight: 1.6,
          margin: "0 0 14px",
          whiteSpace: "pre-wrap",
        }}
      >
        {files[file]}
      </pre>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
        {restrictions.map((r) => (
          <div
            key={r.l}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              background: T.elevated,
              border: `1px solid ${T.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <span style={{ color: T.text }}>{r.l}</span>
            <span style={{ color: r.ok ? T.green : T.red, fontWeight: 700 }}>
              {r.ok ? "✓" : "✗"}
            </span>
          </div>
        ))}
      </div>
      <p style={{ color: T.muted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>
        Starlark's restrictions are a feature. A decidable build graph is what enables hermeticity, parallelism, and 99%+ cache hit rates.
      </p>
    </div>
  );
}

function BorgDemo() {
  const [util, setUtil] = useState(70);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.text, fontSize: 14 }}>CPU Utilization</span>
        <span style={{ color: T.accent, fontSize: 16, fontFamily: "monospace", fontWeight: 700 }}>{util}%</span>
      </div>
      <input type="range" min="10" max="100" value={util} onChange={(e) => setUtil(Number(e.target.value))} style={{ width: "100%", marginBottom: 16, accentColor: T.accent }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
        {[{ l: "Machines", v: "10,000+" }, { l: "Jobs", v: "100,000+" }, { l: "CPU Allocation", v: `${util}%` }].map((s) => (
          <div key={s.l} style={{ padding: "10px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{s.l}</div>
            <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, fontSize: 11, color: T.subtle, fontFamily: "monospace" }}>
        Borg achieves high utilization by combining admission control, efficient task-packing, over-commitment, and machine sharing with process-level performance isolation.
      </div>
    </div>
  );
}

function BABDemo() {
  const [stage, setStage] = useState(0);
  const stages = [
    { l: "Code Committed", d: "Source in Piper, reviewed via Critique" },
    { l: "Verifiable Build", d: "Container image traced to source" },
    { l: "Config Committed", d: "Deployment config under review" },
    { l: "BAB Policy Check", d: "Service-specific requirements verified" },
    { l: "ALTS Certificate", d: "Borg Prime issues credentials" },
    { l: "Production Run", d: "Task authorized with service identity" },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {stages.map((s, i) => (
          <div key={i} onClick={() => setStage(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 6, background: i <= stage ? `${T.green}22` : T.elevated, border: `1px solid ${i <= stage ? T.green : T.border}`, cursor: "pointer", transition: "all .2s" }}>
            <span style={{ color: i <= stage ? T.green : T.muted, fontSize: 12, fontWeight: 700 }}>{i <= stage ? "✓" : "○"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: T.text, fontSize: 12, fontWeight: 600 }}>{s.l}</div>
              <div style={{ color: T.muted, fontSize: 10 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopybaraDemo() {
  const [direction, setDirection] = useState<"in" | "out" | null>(null);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setDirection("out")} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${direction === "out" ? T.green : T.border}`, background: direction === "out" ? `${T.green}22` : T.elevated, color: direction === "out" ? T.green : T.muted, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Internal → External</button>
        <button onClick={() => setDirection("in")} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${direction === "in" ? T.blue : T.border}`, background: direction === "in" ? `${T.blue}22` : T.elevated, color: direction === "in" ? T.blue : T.muted, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>External → Internal</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}` }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>Confidential Repo</div>
          <div style={{ color: T.muted, fontSize: 11 }}>Piper</div>
        </div>
        <div style={{ color: direction ? T.accent : T.muted, fontSize: 20, fontWeight: 700 }}>{direction === "out" ? "→" : direction === "in" ? "←" : "↔"}</div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>Public Repo</div>
          <div style={{ color: T.muted, fontSize: 11 }}>GitHub</div>
        </div>
      </div>
      <p style={{ color: T.muted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>
        Copybara is stateless — state stored as label in commit message. One authoritative repository always.
      </p>
    </div>
  );
}

function EndToEndDemo() {
  const [active, setActive] = useState<number | null>(null);
  const layers = [
    { l: "Developer", d: "Edits in CITC FUSE workspace", c: "#60A5FA" },
    { l: "CITC", d: "Virtual filesystem, <10 files local", c: "#818CF8" },
    { l: "Piper", d: "Centralized VCS, Spanner-backed", c: "#34D399" },
    { l: "Critique", d: "Mandatory review, presubmit", c: "#FBBF24" },
    { l: "Tricorder", d: "Static analysis ecosystem", c: "#F97316" },
    { l: "Bazel", d: "Hermetic build, action graph", c: "#F87171" },
    { l: "Borg", d: "Cluster scheduling, containers", c: "#A78BFA" },
    { l: "BAB", d: "Deploy authorization", c: "#E879F9" },
    { l: "Production", d: "Running service", c: "#22D3EE" },
  ];
  return (
    <div style={{ paddingTop: 8 }}>
      {layers.map((l, i) => (
        <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", borderRadius: 8, marginBottom: 4, background: active === i ? `${l.c}22` : T.elevated, border: `1px solid ${active === i ? l.c : T.border}`, cursor: "pointer", transition: "all .2s" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.c, flexShrink: 0 }} />
          <span style={{ color: T.text, fontWeight: 600, fontSize: 12, flex: 1 }}>{l.l}</span>
          <span style={{ color: l.c, fontSize: 11, fontFamily: "monospace" }}>{l.d}</span>
        </div>
      ))}
    </div>
  );
}

// ── AI Tutor ──────────────────────────────────────────────────────────────
function AiTutor({ ch }: { ch: any }) {
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const ctx = `Chapter ${getChapterNumber(ch.n)}: "${ch.title}"\nTagline: ${ch.tagline}\nKey insight: ${ch.insight || ""}\nContent: ${ch.content.filter((b: any) => b.type === "p" || b.type === "insight").map((b: any) => b.text).join(" ")}`;
  const suggestions = [
    `Explain "${ch.title}" like I'm 5`,
    `Most common misconception about ${ch.title}?`,
    `How does ${ch.title} connect to real-world systems?`,
    `Give me a concrete analogy for ${ch.title}`,
  ];
  const send = async () => {
    if (!input.trim() || loading) return;
    const um = { role: "user" as const, content: input };
    const nm = [...msgs, um];
    setMsgs(nm);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are an expert AI tutor helping someone learn Google engineering infrastructure. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
          messages: nm,
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b: { text?: string }) => b.text || "").join("") || "Sorry, I couldn't generate a response.";
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: 420 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8 }}>
        {msgs.length === 0 && (
          <div>
            <div style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>Ask anything about this chapter:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)} style={{ textAlign: "left", padding: "10px 14px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, color: T.subtle, cursor: "pointer", fontSize: 13, lineHeight: 1.4 }}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: 10, background: m.role === "user" ? `${T.accent}22` : T.elevated, border: `1px solid ${m.role === "user" ? T.accent : T.border}`, color: T.text, fontSize: 13, lineHeight: 1.65 }}>
              {m.role === "assistant" && <div style={{ color: T.accent, fontWeight: 700, fontSize: 10, marginBottom: 5, letterSpacing: ".08em" }}>🤖 AI TUTOR</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 14px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}`, color: T.muted, fontSize: 13 }}>
              Thinking<span style={{ animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
        <label style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>Tutor question</label>
        <input aria-label="Tutor question" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()} style={{ flex: 1, background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", color: T.text, fontSize: 13, outline: "none" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "10px 18px", borderRadius: 8, background: loading || !input.trim() ? T.elevated : T.accent, color: loading || !input.trim() ? T.muted : "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "all .2s" }}>Send</button>
      </div>
    </div>
  );
}

// ── Quiz ──────────────────────────────────────────────────────────────────
function QuizPane({ ch, onScore }: { ch: any; onScore?: (n: number, score: number, total: number) => void }) {
  const qs = QUIZZES[ch.n as keyof typeof QUIZZES];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  if (!qs)
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
        <div style={{ color: T.subtle, fontSize: 14, marginBottom: 8 }}>This chapter does not have a scored quiz.</div>
        <div style={{ color: T.muted, fontSize: 13 }}>Review the chapter content, then use the AI Tutor to test your understanding with follow-up questions.</div>
      </div>
    );
  const submit = () => {
    const s = qs.reduce((a, q, i) => a + (answers[i] === q.ans ? 1 : 0), 0);
    setScore(s);
    setRevealed(Object.fromEntries(qs.map((_, i) => [i, true])));
    onScore && onScore(ch.n, s, qs.length);
  };
  const reset = () => { setAnswers({}); setRevealed({}); setScore(null); };
  const allAnswered = Object.keys(answers).length === qs.length;
  return (
    <div>
      {score !== null && (
        <div style={{ padding: "12px 16px", borderRadius: 10, background: score === qs.length ? "#34D39922" : "#FBBF2422", border: `1px solid ${score === qs.length ? "#34D399" : "#FBBF24"}`, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: T.text, fontWeight: 700 }}>Score: {score}/{qs.length} {score === qs.length ? "🎉 Perfect!" : score >= qs.length / 2 ? "👍 Good!" : "📚 Keep studying!"}</span>
          <button onClick={reset} style={{ padding: "6px 14px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12 }}>Retry</button>
        </div>
      )}
      {qs.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 20, padding: "16px", borderRadius: 10, background: T.elevated, border: `1px solid ${revealed[qi] ? (answers[qi] === q.ans ? "#34D39944" : "#F8717144") : T.border}` }}>
          <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Q{qi + 1}. {q.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {q.opts.map((opt: string, oi: number) => {
              const isSel = answers[qi] === oi;
              const isCorr = revealed[qi] && oi === q.ans;
              const isWrong = revealed[qi] && isSel && oi !== q.ans;
              return (
                <div key={oi} onClick={() => !revealed[qi] && setAnswers((a) => ({ ...a, [qi]: oi }))} style={{ padding: "10px 14px", borderRadius: 8, background: isCorr ? "#34D39922" : isWrong ? "#F8717122" : isSel ? `${T.accent}22` : T.surface, border: `1px solid ${isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.border}`, cursor: revealed[qi] ? "default" : "pointer", color: T.text, fontSize: 13, display: "flex", alignItems: "center", gap: 8, transition: "all .15s" }}>
                  <span style={{ color: isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.muted, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{isCorr ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + oi)}</span>
                  {opt}
                </div>
              );
            })}
          </div>
          {revealed[qi] && (
            <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: `${T.accent}11`, border: `1px solid ${T.accent}44`, color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>💡 {q.exp}</div>
          )}
        </div>
      ))}
      {!score && allAnswered && (
        <button onClick={submit} style={{ padding: "10px 24px", borderRadius: 20, background: T.accent, color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Submit Quiz</button>
      )}
      {!allAnswered && <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>Answer all {qs.length} questions to submit</div>}
    </div>
  );
}

// ── Block Renderer ────────────────────────────────────────────────────────
function isTableBlock(b: any): b is { type: "table"; head: string[]; rows: string[][] } {
  return b.type === "table" && "head" in b && "rows" in b;
}
function isStackBlock(b: any): b is { type: "stack"; rows: [string, string][] } {
  return b.type === "stack" && "rows" in b && Array.isArray(b.rows);
}

function Block({ b }: { b: any }) {
  if (b.type === "p")
    return <p style={{ color: T.subtle, lineHeight: 1.75, fontSize: 14, margin: "0 0 14px" }}>{b.text}</p>;
  if (b.type === "insight")
    return (
      <div style={{ padding: "12px 16px", borderRadius: 10, background: `${T.accent}11`, border: `1px solid ${T.accent}55`, margin: "14px 0", display: "flex", gap: 10 }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ color: T.text, fontSize: 13, lineHeight: 1.6 }}>{b.text}</span>
      </div>
    );
  if (b.type === "code")
    return (
      <pre style={{ background: "#020812", border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", overflow: "auto", fontSize: 12, color: "#7DD3FC", fontFamily: "'JetBrains Mono','Fira Code',monospace", lineHeight: 1.6, margin: "0 0 14px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {b.text}
      </pre>
    );
  if (isTableBlock(b))
    return (
      <div style={{ overflowX: "auto", margin: "0 0 14px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          {b.head && (
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 12px", color: T.accent, fontWeight: 700, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {b.rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : T.elevated }}>
                {(Array.isArray(row) ? row : [row]).map((cell, j) => (
                  <td key={j} style={{ padding: "8px 12px", color: j === 0 ? T.text : T.subtle, borderBottom: `1px solid ${T.border}44`, lineHeight: 1.5 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (isStackBlock(b))
    return (
      <div style={{ margin: "0 0 14px" }}>
        {b.rows.map(([label, desc], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", marginBottom: 4, borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}`, position: "relative" }}>
            <div style={{ width: 3, position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: "8px 0 0 8px", background: `hsl(${200 + i * 25},70%,60%)` }} />
            <div style={{ fontWeight: 700, color: T.text, fontSize: 13, minWidth: 180 }}>{label}</div>
            <div style={{ color: T.muted, fontSize: 12 }}>{desc}</div>
          </div>
        ))}
      </div>
    );
  return null;
}

// ── Chapter View ──────────────────────────────────────────────────────────
function ChapterView({ ch, onBack, color, read, toggleRead, notes, setNotes, onScore }: {
  ch: any; onBack: () => void; color: string;
  read: Set<number>; toggleRead: (n: number) => void;
  notes: Record<number, string>; setNotes: (n: Record<number, string>) => void;
  onScore: (n: number, score: number, total: number) => void;
}) {
  const [tab, setTab] = useState("content");
  const chapterNumber = getChapterNumber(ch.n);
  const DemoComponents: Record<string, React.ComponentType> = {
    monorepo: MonorepoDemo,
    scale: ScaleDemo,
    piper: PiperDemo,
    citc: CITCDemo,
    bazel: BazelDemo,
    starlark: StarlarkDemo,
    critique: CritiqueDemo,
    tricorder: TricorderDemo,
    borg: BorgDemo,
    bab: BABDemo,
    copybara: CopybaraDemo,
    endtoend: EndToEndDemo,
  };
  const DemoComponent = ch.demo ? DemoComponents[ch.demo] : null;
  const TABS = [
    { id: "content", label: "📖 Content" },
    { id: "quiz", label: "🎯 Quiz", badge: QUIZZES[ch.n as keyof typeof QUIZZES]?.length },
    { id: "tutor", label: "🤖 AI Tutor" },
    { id: "notes", label: "📝 Notes" },
  ];
  return (
    <div className="curriculum-content" style={{ maxWidth: 740, margin: "0 auto", padding: "0 16px 60px" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "none", color: T.muted, cursor: "pointer", fontSize: 13, padding: "16px 0", marginBottom: 4 }}>← Back to Curriculum</button>
      <div style={{ padding: "20px 24px", borderRadius: 14, background: T.surface, border: `1px solid ${color}44`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: color, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Chapter {chapterNumber} · Part {ch.part}</div>
            <h1 style={{ color: T.text, fontSize: 22, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.3 }}>{ch.title}</h1>
            <p style={{ color: T.muted, fontSize: 14, margin: 0 }}>{ch.tagline}</p>
          </div>
          <button onClick={() => toggleRead(ch.n)} style={{ padding: "8px 16px", borderRadius: 20, background: read.has(ch.n) ? `${color}22` : "transparent", border: `1px solid ${read.has(ch.n) ? color : T.border}`, color: read.has(ch.n) ? color : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{read.has(ch.n) ? "✓ Read" : "Mark as Read"}</button>
        </div>
        {ch.insight && (
          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8, background: `${color}11`, border: `1px solid ${color}44`, color: color, fontSize: 13, fontWeight: 600 }}>✦ {ch.insight}</div>
        )}
      </div>
      <RelatedCurriculums currentId="piper-monorepo" chapter={ch} />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, background: T.surface, borderRadius: 10, padding: 4, border: `1px solid ${T.border}` }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", background: tab === t.id ? T.elevated : "transparent", color: tab === t.id ? T.text : T.muted, cursor: "pointer", fontSize: 12, fontWeight: tab === t.id ? 700 : 400, transition: "all .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            {t.label}
            {t.badge && <span style={{ background: color, color: "#000", borderRadius: 10, padding: "1px 5px", fontSize: 10, fontWeight: 700 }}>{t.badge}</span>}
          </button>
        ))}
      </div>
      <div>
        {tab === "content" && (
          <div>
            {ch.content.map((b: any, i: number) => <Block key={i} b={b} />)}
            {DemoComponent && (
              <div style={{ padding: "20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginTop: 8 }}>
                <div style={{ color: T.accent, fontWeight: 700, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>⚡ Interactive Demo</div>
                <DemoComponent />
              </div>
            )}
          </div>
        )}
        {tab === "quiz" && <QuizPane ch={ch} onScore={onScore} />}
        {tab === "tutor" && (
          <div style={{ padding: "20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}` }}>
            <AiTutor ch={ch} />
          </div>
        )}
        {tab === "notes" && (
          <div>
            <label htmlFor={`notes-${ch.n}`} style={{ display: "block", color: T.subtle, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Notes for {ch.title}</label>
            <textarea id={`notes-${ch.n}`} aria-label={`Notes for ${ch.title}`} value={notes[ch.n] || ""} onChange={(e) => setNotes({ ...notes, [ch.n]: e.target.value })} style={{ width: "100%", minHeight: 240, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px", color: T.text, fontSize: 14, lineHeight: 1.7, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
            <div style={{ color: T.muted, fontSize: 12, marginTop: 8 }}>{(notes[ch.n] || "").length} characters · Notes are saved in this session</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Concept Map ───────────────────────────────────────────────────────────
function ConceptMap({ openChapter, read }: { openChapter: (n: number) => void; read: Set<number> }) {
  const [hov, setHov] = useState<number | null>(null);
  const W = 760, H = 520;
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 40px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>🕸️ Knowledge Graph</h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>All {CHAPTERS.length} chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read</p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}` }}>
          <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bg)" rx="14" />
          {EDGES.map(([a, b], i) => {
            const pa = NODE_POS[a], pb = NODE_POS[b];
            if (!pa || !pb) return null;
            const hi = hov === a || hov === b;
            return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={hi ? T.accent : T.border} strokeWidth={hi ? 2 : 1} opacity={hov && !hi ? 0.15 : 0.7} />;
          })}
          {CHAPTERS.map((ch) => {
            const p = NODE_POS[ch.n];
            if (!p) return null;
            const color = PC[ch.part];
            const isH = hov === ch.n;
            const isR = read.has(ch.n);
            const r = ch.n === 0 ? 14 : isH ? 11 : 8;
            return (
              <g key={ch.n} onMouseEnter={() => setHov(ch.n)} onMouseLeave={() => setHov(null)} onClick={() => openChapter(ch.n)} style={{ cursor: "pointer" }}>
                {isH && <circle cx={p.x} cy={p.y} r={r + 8} fill={color} opacity={0.15} />}
                <circle cx={p.x} cy={p.y} r={r} fill={isH ? color : `${color}77`} stroke={color} strokeWidth={isR ? 2.5 : 1} />
                {isR && <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">✓</text>}
                {ch.n === 0 && !isR && <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="10" fontWeight="700">0</text>}
                {isH && (
                  <g>
                    <rect x={p.x + r + 6} y={p.y - 18} width={Math.min(chMap[ch.n]?.title.length * 7 + 20, 210)} height={34} rx={6} fill={T.elevated} stroke={color} strokeWidth={1} />
                    <text x={p.x + r + 14} y={p.y - 5} fill={T.text} fontSize="11" fontWeight="600">Ch {getChapterNumber(ch.n)}: {chMap[ch.n]?.title.substring(0, 24)}{chMap[ch.n]?.title.length > 24 ? "…" : ""}</text>
                    <text x={p.x + r + 14} y={p.y + 8} fill={T.muted} fontSize="9">Part {ch.part} · click to open</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PARTS.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: T.elevated, border: `1px solid ${T.border}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: PC[p.id] }} />
            <span style={{ color: T.muted, fontSize: 11 }}>{p.icon} {p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Glossary ──────────────────────────────────────────────────────────────
function GlossaryView({ openChapter }: { openChapter: (n: number) => void }) {
  const [q, setQ] = useState("");
  const filtered = GLOSSARY.filter((g) => !q || g.term.toLowerCase().includes(q.toLowerCase()) || g.def.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px 60px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>📖 Glossary</h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>{GLOSSARY.length} key terms from the curriculum</p>
      <label htmlFor="glossary-search" style={{ display: "block", color: T.subtle, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Search glossary terms and definitions</label>
      <input id="glossary-search" aria-label="Search glossary terms and definitions" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: "100%", background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px", color: T.text, fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(290px,100%),1fr))", gap: 10 }}>
        {filtered.map((g) => (
          <div key={g.term} style={{ padding: "14px 16px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{g.term}</span>
              {g.ch != null && (
                <button onClick={() => openChapter(g.ch!)} style={{ background: "transparent", border: "none", color: T.accent, cursor: "pointer", fontSize: 11, padding: 0, whiteSpace: "nowrap" }}>Ch {g.ch} →</button>
              )}
            </div>
            <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.65 }}>{g.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ view, setView, openChapter, selCh, read, quizScores, search, setSearch, mobile }: {
  view: string; setView: (v: string) => void; openChapter: (n: number) => void;
  selCh: number | null; read: Set<number>; quizScores: Record<number, { score: number; total: number }>;
  search: string; setSearch: (s: string) => void; mobile: boolean;
}) {
  const [expanded, setExpanded] = useState(new Set([0, 1, 2, 3]));
  const toggle = (id: number) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  const totalQ = Object.values(quizScores).reduce((a, s) => a + s.score, 0);
  const maxQ = Object.values(quizScores).reduce((a, s) => a + s.total, 0);
  return (
    <div style={{ width: mobile ? "100%" : 270, background: T.surface, borderRight: mobile ? "none" : `1px solid ${T.border}`, borderBottom: mobile ? `1px solid ${T.border}` : "none", height: mobile ? "auto" : "100vh", overflowY: mobile ? "visible" : "auto", flexShrink: 0, display: "flex", flexDirection: "column", maxHeight: mobile ? "none" : "100vh" }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 18 }}>🏢</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Monorepo V3</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>Google-Scale Source Control</div>
      </div>
      {mobile ? (
        <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 12px", borderBottom: `1px solid ${T.border}`, WebkitOverflowScrolling: "touch" }}>
          {[
            { id: "home", icon: "🏠", label: "Home" },
            { id: "map", icon: "🕸️", label: "Map" },
            { id: "glossary", icon: "📖", label: "Glossary" },
          ].map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} style={{ flex: "0 0 auto", padding: "8px 12px", borderRadius: 999, border: `1px solid ${view === v.id ? T.accent : T.border}`, background: view === v.id ? `${T.accent}22` : T.elevated, color: view === v.id ? T.text : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <span>{v.icon}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ padding: "8px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 4 }}>
          {[
            { id: "home", icon: "🏠" },
            { id: "map", icon: "🕸️" },
            { id: "glossary", icon: "📖" },
          ].map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", background: view === v.id ? T.elevated : "transparent", color: view === v.id ? T.text : T.muted, cursor: "pointer", fontSize: 20 }}>{v.icon}</button>
          ))}
        </div>
      )}
      <div style={{ padding: mobile ? "10px 12px 8px" : "8px 12px", borderBottom: `1px solid ${T.border}` }}>
        {mobile ? (
          <>
            <div style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Jump to chapter</div>
            <select value={selCh ?? ""} onChange={(e) => { const v = Number(e.target.value); if (!Number.isNaN(v)) openChapter(v); }} style={{ width: "100%", background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 12px", color: T.text, fontSize: 12, outline: "none", boxSizing: "border-box" }}>
              <option value="">Select a chapter</option>
              {CHAPTERS.map((chapter) => <option key={chapter.n} value={chapter.n}>Ch {getChapterNumber(chapter.n)}: {chapter.title}</option>)}
            </select>
          </>
        ) : (
          <>
            <label htmlFor="chapter-search" style={{ display: "block", color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Search chapters</label>
            <input id="chapter-search" aria-label="Search chapters" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 8, padding: "7px 12px", color: T.text, fontSize: 12, outline: "none", boxSizing: "border-box" }} />
          </>
        )}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        {PARTS.map((p) => {
          const color = PC[p.id];
          const filteredChs = p.chs.filter((n) => {
            if (!search) return true;
            const ch = chMap[n];
            return ch && (ch.title.toLowerCase().includes(search.toLowerCase()) || ch.tagline.toLowerCase().includes(search.toLowerCase()));
          });
          if (search && filteredChs.length === 0) return null;
          const isExp = expanded.has(p.id) || !!search;
          return (
            <div key={p.id}>
              <div onClick={() => toggle(p.id)} style={{ padding: "7px 16px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }}>
                <span style={{ fontSize: 13 }}>{p.icon}</span>
                <span style={{ color: color, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: ".07em", flex: 1 }}>{p.label}</span>
                <span style={{ color: T.muted, fontSize: 10 }}>{isExp ? "▾" : "▸"}</span>
              </div>
              {isExp && filteredChs.map((n) => {
                const ch = chMap[n];
                if (!ch) return null;
                const isSel = selCh === n && view === "chapter";
                const isRead = read.has(n);
                const hasQ = !!QUIZZES[n as keyof typeof QUIZZES];
                return (
                  <div key={n} role="button" tabIndex={0} onClick={() => openChapter(n)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChapter(n); } }} style={{ padding: "6px 16px 6px 32px", cursor: "pointer", background: isSel ? `${color}18` : "transparent", borderLeft: `3px solid ${isSel ? color : "transparent"}`, transition: "all .15s", display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: isSel ? color : T.text, fontSize: 12, fontWeight: isSel ? 700 : 400, lineHeight: 1.3 }}>Ch {getChapterNumber(n)} — {ch.title}</div>
                    </div>
                    <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                      {isRead && <span style={{ color: color, fontSize: 10 }}>✓</span>}
                      {hasQ && <span style={{ color: T.accent, fontSize: 10 }}>🎯</span>}
                      {ch.demo && <span style={{ color: T.purple, fontSize: 10 }}>⚡</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "10px 16px", borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: T.muted, fontSize: 11 }}>Chapters read</span>
          <span style={{ color: T.text, fontSize: 11, fontWeight: 700 }}>{read.size}/{CHAPTERS.length}</span>
        </div>
        <div style={{ height: 3, background: T.border, borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ width: `${(read.size / CHAPTERS.length) * 100}%`, height: "100%", background: T.accent, borderRadius: 2, transition: "width .4s" }} />
        </div>
        {maxQ > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: T.muted, fontSize: 11 }}>Quiz score</span>
            <span style={{ color: T.amber, fontSize: 11, fontWeight: 700 }}>{totalQ}/{maxQ}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────
function Overview({ setView, openChapter, read, quizScores }: {
  setView: (v: string) => void; openChapter: (n: number) => void;
  read: Set<number>; quizScores: Record<number, { score: number; total: number }>;
}) {
  const [activePath, setActivePath] = useState<number | null>(null);
  const paths = [
    { label: "Novice Path", color: T.blue, desc: "Architecture, ownership, source control, and workspaces", chs: [0, 13, 14, 1, 15, 3, 18, 4] },
    { label: "Engineer Track", color: T.green, desc: "Build graphs, presubmit, scheduling, and reliability", chs: [5, 6, 20, 7, 21, 9, 22, 23] },
    { label: "Researcher Route", color: T.purple, desc: "Piper internals, virtual filesystems, and execution", chs: [2, 3, 16, 17, 4, 18, 19, 9] },
    { label: "Executive View", color: T.amber, desc: "Ownership, delivery, security, and platform metrics", chs: [14, 15, 21, 24, 25, 26, 27] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div className="curriculum-overview" style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <CurriculumHero eyebrow="Platform engineering path" title="Google-Scale Monorepo" description="A visual route from source control and workspaces to build graphs, review, execution, and safe delivery." icon="🧩" color="#14B8A6" secondaryColor="#22D3EE" parts={PARTS.length} chapters={CHAPTERS.length} terms={GLOSSARY.length} signal="Source → build → production" nodes={["Piper", "CITC", "Bazel", "Borg", "BAB"]} />
      <div style={{ padding: "40px 0 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, #22D3EE0A 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ color: T.accent, fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>Version 3.0 · 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", background: "linear-gradient(135deg,#F0F6FF 30%,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>From Git to Piper-Scale Source Control</h1>
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>{CHAPTERS.length} Chapters · From Foundations to Google-Scale Architecture</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "🕸️", label: "Concept Map", action: () => setView("map") },
            { icon: "📖", label: "Glossary", action: () => setView("glossary") },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.action} style={{ padding: "10px 20px", borderRadius: 20, background: T.elevated, border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>{btn.icon} {btn.label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { n: CHAPTERS.length, label: "Chapters" },
          { n: PARTS.length, label: "Parts" },
          { n: Object.keys(QUIZZES).length, label: "Quizzes" },
          { n: GLOSSARY.length, label: "Terms" },
        ].map((s) => (
          <div key={s.label} style={{ padding: "14px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <div style={{ color: T.accent, fontSize: 24, fontWeight: 900 }}>{s.n}</div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {recentlyRead.length > 0 && (
        <div style={{ marginBottom: 20, padding: "16px 20px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
          <div style={{ color: T.subtle, fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".07em" }}>Continue where you left off</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {recentlyRead.map((n) => {
              const ch = CHAPTERS.find((c) => c.n === n);
              if (!ch) return null;
              return (
                <button key={n} onClick={() => openChapter(n)} style={{ padding: "8px 14px", borderRadius: 8, background: T.elevated, border: `1px solid ${PC[ch.part]}44`, color: T.text, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Ch {getChapterNumber(n)}: {ch.title}</button>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
        <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📍 Choose a Learning Path</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          {paths.map((p, i) => (
            <div key={i} onClick={() => setActivePath(activePath === i ? null : i)} style={{ padding: "12px 14px", borderRadius: 10, background: activePath === i ? `${p.color}22` : T.elevated, border: `2px solid ${activePath === i ? p.color : T.border}`, cursor: "pointer", transition: "all .2s" }}>
              <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.label}</div>
              <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {PARTS.map((p) => {
        const color = PC[p.id];
        const chapters = p.chs.map((n) => CHAPTERS.find((c) => c.n === n)).filter(Boolean) as any[];
        return (
          <div key={p.id} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span>{p.icon}</span>
              <span style={{ color: color, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" }}>Part {p.id} — {p.label}</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
              {chapters.map((ch) => {
                const isRead = read.has(ch.n);
                const hi = highlighted ? highlighted.has(ch.n) : false;
                const dim = highlighted && !hi;
                const qs = quizScores[ch.n];
                return (
                  <div key={ch.n} role="button" tabIndex={0} onClick={() => openChapter(ch.n)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChapter(ch.n); } }} style={{ padding: "14px", borderRadius: 10, background: hi ? `${color}22` : T.surface, border: `1px solid ${hi ? color : dim ? "#0E1C3044" : T.border}`, cursor: "pointer", opacity: dim ? 0.4 : 1, transition: "all .2s", position: "relative" }}>
                    <div style={{ position: "absolute", top: 8, right: 10, display: "flex", gap: 4 }}>
                      {isRead && <span style={{ color: color, fontSize: 12 }}>✓</span>}
                      {ch.demo && <span style={{ color: T.accent, fontSize: 10 }}>⚡</span>}
                      {QUIZZES[ch.n as keyof typeof QUIZZES] && <span style={{ color: T.amber, fontSize: 10 }}>🎯</span>}
                    </div>
                    <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>Ch {getChapterNumber(ch.n)}</div>
                    <div style={{ color: T.text, fontWeight: 700, fontSize: 13, lineHeight: 1.3, marginBottom: 4, paddingRight: 28 }}>{ch.title}</div>
                    <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.4 }}>{ch.tagline}</div>
                    {qs && <div style={{ marginTop: 6, color: T.amber, fontSize: 10 }}>Quiz: {qs.score}/{qs.total}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [selCh, setSelCh] = useState<number | null>(null);
  const [read, setRead] = useState(new Set<number>());
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [quizScores, setQuizScores] = useState<Record<number, { score: number; total: number }>>({});
  const [search, setSearch] = useState("");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = `* { box-sizing: border-box; } body { margin:0; font-family:'Inter',system-ui,sans-serif; background:#040810; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }`;
    document.head.appendChild(s);
  }, []);

  const openChapter = (n: number) => { setSelCh(n); setView("chapter"); setSearch(""); };
  const toggleRead = (n: number) => setRead((r) => { const s = new Set(r); s.has(n) ? s.delete(n) : s.add(n); return s; });
  const onScore = (n: number, score: number, total: number) => setQuizScores((q) => ({ ...q, [n]: { score, total } }));

  const ch = selCh !== null ? CHAPTERS.find((c) => c.n === selCh) : null;
  const color = ch ? PC[ch.part] : T.accent;

  return (
    <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", minHeight: "100vh", height: mobile ? "auto" : "100vh", overflow: mobile ? "visible" : "hidden", background: T.bg, color: T.text }}>
      <Sidebar
        view={view}
        setView={setView}
        openChapter={openChapter}
        selCh={selCh}
        read={read}
        quizScores={quizScores}
        search={search}
        setSearch={setSearch}
        mobile={mobile}
      />
      <div style={{ flex: 1, overflowY: mobile ? "visible" : "auto", minWidth: 0 }}>
        {view === "chapter" && ch ? (
          <ChapterView
            ch={ch}
            color={color}
            onBack={() => setView("home")}
            read={read}
            toggleRead={toggleRead}
            notes={notes}
            setNotes={setNotes}
            onScore={onScore}
          />
        ) : view === "map" ? (
          <ConceptMap openChapter={openChapter} read={read} />
        ) : view === "glossary" ? (
          <GlossaryView openChapter={openChapter} />
        ) : (
          <Overview setView={setView} openChapter={openChapter} read={read} quizScores={quizScores} />
        )}
      </div>
    </div>
  );
}