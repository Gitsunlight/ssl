// @ts-nocheck
"use client";

import jsx from "react/jsx-runtime";
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
  pink: "#F472B6",
  teal: "#2DD4BF",
  orange: "#FB923C",
};
const PC = [
  "#818CF8",
  "#60A5FA",
  "#34D399",
  "#2DD4BF",
  "#FBBF24",
  "#FB923C",
  "#F87171",
  "#F472B6",
  "#A78BFA",
  "#C084FC",
  "#22D3EE",
];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Territory Map", icon: "🗺️", chs: [0] },
  { id: 1, label: "Cloud Fundamentals", icon: "☁️", chs: [1, 2, 3, 4] },
  { id: 2, label: "Virtualization & Compute", icon: "💻", chs: [5, 6, 7, 8] },
  { id: 3, label: "Cloud Networking", icon: "🌐", chs: [9, 10, 11, 12] },
  { id: 4, label: "Cloud Storage", icon: "💾", chs: [13, 14, 15] },
  { id: 5, label: "Containers & Orchestration", icon: "📦", chs: [16, 17, 18, 19] },
  { id: 6, label: "Serverless & PaaS", icon: "⚡", chs: [20, 21, 22] },
  { id: 7, label: "Cloud Data & AI", icon: "🧠", chs: [23, 24, 25] },
  { id: 8, label: "Security, Identity & Compliance", icon: "🔒", chs: [26, 27, 28] },
  { id: 9, label: "Reliability & Operations", icon: "🛡️", chs: [29, 30, 31] },
  { id: 10, label: "Cost & FinOps", icon: "💰", chs: [32, 33] },
  { id: 11, label: "Multi-Cloud & Frontier", icon: "🚀", chs: [34, 35, 36, 37, 38] },
];

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of Cloud Computing",
    tagline: "From physical racks to planetary-scale software systems",
    insight:
      "Cloud is not a place — it's an operating model for turning capital into elastic, on-demand capacity.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Cloud computing is the delivery of computing as a utility: compute, storage, networking, and higher-level services, provisioned on demand over the internet, billed by consumption. Before any service detail, you need a mental model of the stack.",
      },
      {
        type: "stack",
        rows: [
          ["🏢 Data Centers", "Buildings, power, cooling, physical security"],
          ["🖥️ Hardware", "Servers, NICs, storage arrays, GPUs, switches"],
          ["💻 Virtualization", "Hypervisors and containers that multiplex hardware"],
          ["🌐 Network Fabric", "SDN, VPCs, load balancers, DNS, CDNs"],
          ["💾 Storage & Data", "Object, block, file, warehouses, streams"],
          ["⚙️ Platform Services", "Managed DBs, queues, ML, observability"],
          ["🚀 Applications", "Your code, deployed and scaled on the cloud"],
          ["🏢 Operating Model", "IAM, cost, compliance, SRE, FinOps"],
        ],
      },
      {
        type: "insight",
        text: "Every abstraction higher in the stack hides complexity below. Understanding cloud means understanding what each layer guarantees and what it hides — and knowing when you must drop a layer to fix a real problem.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "What Is Cloud Computing?",
    tagline: "The NIST definition and the five essential characteristics",
    insight:
      "On-demand self-service + broad access + pooling + elasticity + measured service = cloud.",
    content: [
      {
        type: "p",
        text: "NIST's canonical definition: cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned and released with minimal management effort.",
      },
      {
        type: "table",
        head: ["Characteristic", "Meaning"],
        rows: [
          ["On-demand self-service", "Provision without human interaction at the provider"],
          ["Broad network access", "Available over standard networks to heterogeneous clients"],
          ["Resource pooling", "Multi-tenant; resources dynamically assigned"],
          ["Rapid elasticity", "Scale up/down automatically with demand"],
          ["Measured service", "Metered usage; pay-per-use billing"],
        ],
      },
      {
        type: "insight",
        text: "These five characteristics distinguish cloud from 'just someone else's computer.' A bare rented VM without elasticity, pooling, or metering is hosting, not cloud.",
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Service Models: IaaS, PaaS, SaaS",
    tagline: "How much of the stack you manage vs. the provider manages",
    insight:
      "Each step up the service model trades control for leverage — you give up the ability to break things, and gain velocity.",
    demo: "servicemodels",
    content: [
      {
        type: "p",
        text: "Cloud service models partition responsibility across the stack. The higher the model, the more the provider manages and the more opinionated your system becomes.",
      },
      {
        type: "table",
        head: ["Model", "You Manage", "Provider Manages", "Examples"],
        rows: [
          ["IaaS", "OS, runtime, apps, data", "Compute, storage, network", "EC2, GCE, Azure VM"],
          ["PaaS", "Apps, data", "OS, runtime, scaling", "App Engine, Heroku, Beanstalk"],
          ["SaaS", "Your data and users", "Everything else", "Gmail, Salesforce, Slack"],
          ["FaaS", "Functions only", "Runtime, scaling, infra", "Lambda, Cloud Functions"],
          ["CaaS", "Containers", "Orchestrator, nodes", "EKS, GKE, AKS"],
        ],
      },
      {
        type: "insight",
        text: "There is no 'best' model. Startup MVPs often want PaaS/SaaS; regulated enterprises need IaaS for control; event-driven workloads thrive on FaaS. Most real systems mix all of them.",
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Deployment Models",
    tagline: "Public, private, hybrid, and multi-cloud — and when each wins",
    insight:
      "Hybrid is the norm in enterprises. Multi-cloud is often accidental — and expensive to rationalize.",
    content: [
      {
        type: "p",
        text: "Deployment model is about where the cloud lives relative to your organization, not which services you use. Each model has distinct cost, compliance, and operational trade-offs.",
      },
      {
        type: "table",
        head: ["Model", "Description", "Best For"],
        rows: [
          ["Public", "Shared hyperscaler infra", "Startups, elasticity, global reach"],
          ["Private", "Dedicated to one org", "Regulated, sensitive data"],
          ["Hybrid", "Public + private integrated", "Bursting, data residency, legacy"],
          ["Multi-cloud", "Two or more providers", "Avoiding lock-in, best-of-breed"],
          ["Community", "Shared by similar orgs", "Government, healthcare consortia"],
        ],
      },
      {
        type: "insight",
        text: "Most 'multi-cloud' enterprises end up with 70% of workloads on one provider and a long tail elsewhere. The cost of portability often exceeds the value of avoiding lock-in — unless regulation forces it.",
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Regions, Zones & Edge",
    tagline: "The physical geography of cloud and why it matters",
    insight:
      "Latency is a function of distance. Data residency is a function of law. Both are decided by geography.",
    demo: "regions",
    content: [
      {
        type: "p",
        text: "Cloud providers organize infrastructure into regions (geographic areas), availability zones (isolated datacenters within a region), and edge locations (points of presence close to users). This hierarchy drives latency, resilience, and compliance.",
      },
      {
        type: "table",
        head: ["Layer", "Scale", "Purpose"],
        rows: [
          ["Edge location", "100s globally", "CDN, DNS, low-latency entry"],
          ["Availability Zone", "3+ per region", "Fault isolation, HA"],
          ["Region", "30–100 globally", "Data residency, latency tier"],
          ["Sovereign cloud", "Country-specific", "Legal/regulatory compliance"],
        ],
      },
      {
        type: "insight",
        text: "Design for zone failure by default; region failure only when required. Cross-region active-active is expensive and rarely worth it unless you have a hard RTO/RPO requirement.",
      },
    ],
  },
  {
    n: 5,
    part: 2,
    title: "Virtualization & Hypervisors",
    tagline: "How one physical server becomes hundreds of isolated machines",
    insight:
      "Virtualization is the original cloud primitive — everything else is built on it.",
    demo: "hypervisor",
    content: [
      {
        type: "p",
        text: "A hypervisor (VMM) runs multiple virtual machines on one physical host, each with its own OS, isolated by hardware-assisted virtualization (Intel VT-x, AMD-V).",
      },
      {
        type: "table",
        head: ["Type", "Runs On", "Examples", "Performance"],
        rows: [
          ["Type 1 (bare metal)", "Hardware directly", "ESXi, Xen, KVM, Hyper-V", "Near-native"],
          ["Type 2 (hosted)", "Host OS", "VirtualBox, VMware Workstation", "Slower"],
          ["KVM (Linux)", "Kernel module", "Used by AWS, GCP, OpenStack", "Near-native"],
          ["Nested", "Inside a VM", "Dev/test, CI", "Overhead"],
        ],
      },
      {
        type: "code",
        text: "Guest OS → virtual CPU/mem/IO\n   ↓\nHypervisor traps privileged instructions\n   ↓\nPhysical CPU/mem/IO",
      },
    ],
  },
  {
    n: 6,
    part: 2,
    title: "Virtual Machines",
    tagline: "Isolated compute with a full OS — the workhorse of IaaS",
    insight:
      "VMs give you a full OS, at the cost of boot time, memory overhead, and a bigger attack surface.",
    content: [
      {
        type: "p",
        text: "A VM bundles virtual hardware, a guest OS, and your application. Cloud VMs add elasticity, images, snapshots, autoscaling, and per-second billing.",
      },
      {
        type: "table",
        head: ["Attribute", "Typical Value"],
        rows: [
          ["Boot time", "20s – 2min"],
          ["Memory overhead", "100MB – 1GB per VM"],
          ["Isolation", "Strong (hypervisor)"],
          ["Density", "10s per host"],
          ["Billing", "Per-second, min 60s"],
        ],
      },
      {
        type: "insight",
        text: "VMs remain the best fit for lift-and-shift, legacy OS workloads, and anything needing kernel-level control. Containers win for new microservices.",
      },
    ],
  },
  {
    n: 7,
    part: 2,
    title: "Instance Types & Pricing",
    tagline: "Families, sizes, and the four pricing models",
    insight:
      "Choosing the right instance family and pricing model is 40% of your cloud bill.",
    demo: "instances",
    content: [
      {
        type: "p",
        text: "Cloud VMs come in families optimized for different workloads: general purpose, compute, memory, storage, GPU, and burstable. Pricing models trade commitment for discount.",
      },
      {
        type: "table",
        head: ["Family", "Optimized For", "Example Use"],
        rows: [
          ["General (M)", "Balanced", "Web servers, small DBs"],
          ["Compute (C)", "CPU per $", "Batch, encoding, HPC"],
          ["Memory (R/X)", "RAM per $", "In-memory caches, big DBs"],
          ["Storage (I/D)", "IOPS/throughput", "NoSQL, data lakes"],
          ["GPU (P/G)", "Parallel math", "ML training/inference"],
          ["Burstable (T)", "Low baseline + bursts", "Dev, small services"],
        ],
      },
      {
        type: "table",
        head: ["Pricing Model", "Discount", "Commitment"],
        rows: [
          ["On-demand", "0%", "None"],
          ["Savings plan / RI", "30–70%", "1–3 years"],
          ["Spot / preemptible", "60–90%", "Interruptible"],
          ["Reserved capacity", "20–40%", "Capacity, not discount"],
        ],
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "Autoscaling & Elasticity",
    tagline: "Matching capacity to demand — the core promise of cloud",
    insight:
      "Elasticity is not 'always big.' It's 'right size, right now' — and it's the hardest thing to get right.",
    demo: "autoscaling",
    content: [
      {
        type: "p",
        text: "Autoscaling adjusts fleet size based on metrics (CPU, queue depth, custom signals). It smooths cost and absorbs spikes, but naive policies oscillate or fight each other.",
      },
      {
        type: "table",
        head: ["Type", "Trigger", "Notes"],
        rows: [
          ["Target tracking", "Metric vs target", "Most robust; use this by default"],
          ["Step scaling", "Threshold bands", "Predictable, easy to reason about"],
          ["Scheduled", "Time of day", "For known traffic shapes"],
          ["Predictive", "ML forecast", "Smooths reactive lag"],
        ],
      },
      {
        type: "insight",
        text: "Scale-out is fast; scale-in is where you hurt. Cool-down windows and scale-in policies prevent flapping. Always pair autoscaling with good health checks and graceful drain.",
      },
    ],
  },
  {
    n: 9,
    part: 3,
    title: "VPCs & Subnets",
    tagline: "Your private, software-defined network inside the cloud",
    insight:
      "A VPC is a blast radius. Everything else in networking is a permission or a path.",
    demo: "vpc",
    content: [
      {
        type: "p",
        text: "A Virtual Private Cloud is an isolated network with its own IP space, subnets, route tables, and gateways. It's the fundamental unit of network isolation.",
      },
      {
        type: "table",
        head: ["Component", "Role"],
        rows: [
          ["CIDR block", "IP space, e.g. 10.0.0.0/16"],
          ["Public subnet", "Route to internet gateway"],
          ["Private subnet", "Route via NAT only"],
          ["Route table", "Path selection"],
          ["Security group", "Stateful instance firewall"],
          ["NACL", "Stateless subnet firewall"],
        ],
      },
      {
        type: "insight",
        text: "Design your CIDR before you design anything else. Overlapping CIDRs are the #1 cause of failed VPC peering and painful migrations.",
      },
    ],
  },
  {
    n: 10,
    part: 3,
    title: "Load Balancing & DNS",
    tagline: "Distributing traffic and resolving names at planetary scale",
    insight:
      "DNS is the world's original load balancer. Everything else is a refinement.",
    content: [
      {
        type: "p",
        text: "Load balancers spread requests across targets; DNS maps names to addresses. Together they deliver availability, latency, and traffic shaping.",
      },
      {
        type: "table",
        head: ["Layer", "Examples", "Use"],
        rows: [
          ["L4 (TCP/UDP)", "NLB, TCP LB", "Ultra-low latency, non-HTTP"],
          ["L7 (HTTP)", "ALB, App Gateway", "Routing by path/host/headers"],
          ["Global", "Anycast, GeoDNS", "Cross-region failover"],
          ["DNS", "Route 53, Cloud DNS", "Weighted, latency, failover routing"],
        ],
      },
      {
        type: "code",
        text: "Client → DNS (latency-based)\n       → Anycast edge\n       → L7 LB (path routing)\n       → Service mesh sidecar\n       → Pod",
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "CDNs & Edge",
    tagline: "Caching the internet close to users",
    insight:
      "A CDN turns physics into a caching problem: move content closer, not requests faster.",
    demo: "cdn",
    content: [
      {
        type: "p",
        text: "Content Delivery Networks cache assets at edge locations worldwide, reducing origin load and end-user latency. Modern CDNs also run compute at the edge.",
      },
      {
        type: "table",
        head: ["Capability", "Benefit"],
        rows: [
          ["Static caching", "Offload origin, cut latency"],
          ["Dynamic acceleration", "Optimized routes, TLS termination"],
          ["Edge compute", "Personalization, A/B, auth"],
          ["WAF / DDoS", "Attack mitigation at edge"],
        ],
      },
      {
        type: "insight",
        text: "Cache hit ratio is the metric that matters. A CDN with 60% hit ratio is doing far less for you than one at 95% — invest in cache keys and TTLs before adding more PoPs.",
      },
    ],
  },
  {
    n: 12,
    part: 3,
    title: "Hybrid Connectivity",
    tagline: "VPN, Direct Connect, and private interconnects",
    insight:
      "The cloud is not an island. Most enterprises spend more on getting to the cloud than on the cloud itself.",
    content: [
      {
        type: "p",
        text: "Hybrid connectivity links on-premises networks to cloud VPCs. Options trade cost, latency, bandwidth, and setup time.",
      },
      {
        type: "table",
        head: ["Option", "Latency", "Bandwidth", "Setup"],
        rows: [
          ["Site-to-site VPN", "Variable", "Up to ~1.25 Gbps", "Minutes"],
          ["Dedicated interconnect", "Low, consistent", "1–100 Gbps", "Weeks"],
          ["Hosted interconnect", "Low", "Sub-Gbps to 10 Gbps", "Days"],
          ["Cloud WAN", "Managed", "Varies", "Days"],
        ],
      },
    ],
  },
  {
    n: 13,
    part: 4,
    title: "Block, File & Object Storage",
    tagline: "The three storage primitives — and when each fits",
    insight:
      "Block is for disks, file is for shared trees, object is for everything at scale.",
    demo: "storage",
    content: [
      {
        type: "p",
        text: "Cloud storage comes in three shapes with very different performance, semantics, and cost profiles. Choose based on access pattern, not habit.",
      },
      {
        type: "table",
        head: ["Type", "Interface", "Use Cases", "Examples"],
        rows: [
          ["Block", "Virtual disk", "Databases, boot volumes", "EBS, Persistent Disk"],
          ["File", "NFS/SMB", "Shared configs, home dirs", "EFS, Filestore, Azure Files"],
          ["Object", "HTTP API", "Backups, media, lakes", "S3, GCS, Blob"],
        ],
      },
      {
        type: "insight",
        text: "Object storage is the default for new data. It's effectively infinite, cheap, durable (11 9s), and HTTP-native. Reach for block only when you need a filesystem or low-latency random IO.",
      },
    ],
  },
  {
    n: 14,
    part: 4,
    title: "Storage Tiers & Lifecycle",
    tagline: "Hot, cool, cold, archive — matching cost to access",
    insight:
      "Data gets colder over time. Lifecycle policies automate the move.",
    content: [
      {
        type: "p",
        text: "Object storage offers tiers with different cost, retrieval latency, and durability guarantees. Lifecycle rules transition objects between tiers based on age or access.",
      },
      {
        type: "table",
        head: ["Tier", "Access", "Retrieval", "Relative Cost"],
        rows: [
          ["Hot / Standard", "Frequent", "ms", "$$$"],
          ["Infrequent", "Monthly", "ms", "$$"],
          ["Cold / Glacier IR", "Quarterly", "minutes", "$"],
          ["Archive", "Rare", "hours", "$0.25"],
          ["Deep archive", "Compliance", "12+ hours", "$0.10"],
        ],
      },
    ],
  },
  {
    n: 15,
    part: 4,
    title: "Backup, Snapshots & DR",
    tagline: "Durability is not backup. Replication is not DR.",
    insight:
      "Durability protects against hardware failure. Backup protects against you.",
    content: [
      {
        type: "p",
        text: "Durability, availability, backup, and disaster recovery are four different things. Confusing them is a common and expensive mistake.",
      },
      {
        type: "table",
        head: ["Concept", "Protects Against", "Metric"],
        rows: [
          ["Durability", "Disk failure", "11 nines"],
          ["Availability", "AZ failure", "SLA %"],
          ["Backup", "Deletion, corruption", "RPO"],
          ["DR", "Region loss", "RTO/RPO"],
        ],
      },
      {
        type: "insight",
        text: "Untested backups are not backups. A quarterly restore drill is the cheapest insurance you can buy — and the one most teams skip.",
      },
    ],
  },
  {
    n: 16,
    part: 5,
    title: "Containers",
    tagline: "Namespaces, cgroups, and OCI images",
    insight:
      "A container is a process with a lie about being alone on the machine.",
    demo: "containers",
    content: [
      {
        type: "p",
        text: "Containers use Linux namespaces (isolation) and cgroups (resource limits) to run processes in a lightweight sandbox. They share the host kernel — that's why they start in milliseconds.",
      },
      {
        type: "table",
        head: ["Isolation", "Mechanism"],
        rows: [
          ["PID", "pid namespace"],
          ["Network", "net namespace + veth"],
          ["Filesystem", "mount + chroot"],
          ["CPU/memory", "cgroups v2"],
          ["User", "user namespace"],
        ],
      },
      {
        type: "code",
        text: "Image = layered tarballs + config JSON\n\nFROM alpine\nRUN apk add nginx\nCOPY site /var/www\nCMD [\"nginx\",\"-g\",\"daemon off;\"]",
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "Kubernetes Fundamentals",
    tagline: "Declarative orchestration — the OS of the cloud",
    insight:
      "Kubernetes is a reconciliation loop. You declare desired state; it works to make reality match.",
    demo: "kubernetes",
    content: [
      {
        type: "p",
        text: "Kubernetes schedules containers onto nodes, restarts them when they fail, scales them, exposes them via services, and manages config and secrets. Everything is declarative YAML reconciled by controllers.",
      },
      {
        type: "table",
        head: ["Object", "Purpose"],
        rows: [
          ["Pod", "Smallest deployable unit (1+ containers)"],
          ["Deployment", "Replica management + rollouts"],
          ["Service", "Stable virtual IP for a set of pods"],
          ["Ingress", "L7 HTTP routing into cluster"],
          ["ConfigMap / Secret", "Configuration injection"],
          ["StatefulSet", "Stable identities + storage"],
        ],
      },
      {
        type: "code",
        text: "apiVersion: apps/v1\nkind: Deployment\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: web\n        image: nginx:1.27",
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Service Mesh & Ingress",
    tagline: "mTLS, retries, traffic shifting — without changing app code",
    insight:
      "A service mesh moves cross-cutting network concerns out of application code.",
    content: [
      {
        type: "p",
        text: "A service mesh injects a sidecar proxy next to each pod, intercepting traffic to provide mTLS, retries, timeouts, circuit breaking, and observability — configured via CRDs, not app changes.",
      },
      {
        type: "table",
        head: ["Feature", "Value"],
        rows: [
          ["Mutual TLS", "Identity-based encryption between services"],
          ["Traffic shifting", "Canary, blue/green, mirroring"],
          ["Retries/timeouts", "Resilience without app code"],
          ["Telemetry", "Uniform metrics, traces, logs"],
        ],
      },
      {
        type: "insight",
        text: "Meshes are powerful but heavy. Start with ingress + good client libraries; adopt a mesh when you have many services and need uniform policy.",
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "Managed Kubernetes",
    tagline: "EKS, GKE, AKS — what the cloud runs for you",
    insight:
      "Managed K8s removes the control plane burden but leaves the hard parts — networking, IAM, cost — in your lap.",
    content: [
      {
        type: "p",
        text: "Managed Kubernetes services run the API server, etcd, and controllers for you, patch the control plane, and integrate with cloud IAM and networking. You still own node pools, workloads, and policy.",
      },
      {
        type: "table",
        head: ["Provider", "Service", "Notes"],
        rows: [
          ["AWS", "EKS", "Broad ecosystem, Fargate for serverless pods"],
          ["Google", "GKE", "Autopilot, best-in-class autoscaling"],
          ["Azure", "AKS", "Deep AD integration, Arc for hybrid"],
          ["Oracle", "OKE", "Free control plane"],
        ],
      },
    ],
  },
  {
    n: 20,
    part: 6,
    title: "Serverless Functions",
    tagline: "Event-driven compute with no servers to manage",
    insight:
      "Serverless is not 'no servers' — it's 'no servers you think about.' The trade is control for velocity.",
    demo: "serverless",
    content: [
      {
        type: "p",
        text: "FaaS platforms run your function in response to events (HTTP, queue, schedule, file upload), scale to zero, and bill per invocation × duration. Cold starts and statelessness are the trade-offs.",
      },
      {
        type: "table",
        head: ["Property", "Value"],
        rows: [
          ["Startup", "ms (warm) – seconds (cold)"],
          ["Max duration", "15 min (Lambda)"],
          ["Concurrency", "Per-account + per-function"],
          ["Billing", "Invocations × GB-seconds"],
          ["State", "None — use external stores"],
        ],
      },
      {
        type: "code",
        text: "export const handler = async (event) => {\n  const body = JSON.parse(event.body);\n  return { statusCode: 200, body: JSON.stringify({ ok: true }) };\n};",
      },
    ],
  },
  {
    n: 21,
    part: 6,
    title: "PaaS & App Platforms",
    tagline: "Heroku, App Runner, Cloud Run, Beanstalk",
    insight:
      "PaaS is the shortest path from code to URL — as long as your app fits the platform's opinion.",
    content: [
      {
        type: "p",
        text: "PaaS platforms build, deploy, and scale your app from source or a container. They hide servers, patch runtimes, and provide add-ons — at the cost of customization and sometimes portability.",
      },
      {
        type: "table",
        head: ["Platform", "Model", "Sweet Spot"],
        rows: [
          ["Heroku", "Buildpacks", "Fast prototypes, small teams"],
          ["Cloud Run", "Container + HTTP", "Stateless services"],
          ["App Runner", "Container + HTTP", "Simple services on AWS"],
          ["Beanstalk", "App bundles", "Lift-and-shift of web apps"],
        ],
      },
    ],
  },
  {
    n: 22,
    part: 6,
    title: "Event-Driven Architecture",
    tagline: "Queues, streams, pub/sub, and event buses",
    insight:
      "Coupling is the enemy. Events are the cleanest way to break it.",
    content: [
      {
        type: "p",
        text: "Event-driven systems decouple producers from consumers using queues (work distribution), streams (ordered logs), and pub/sub (fan-out). They enable resilience, async processing, and elasticity.",
      },
      {
        type: "table",
        head: ["Primitive", "Semantics", "Examples"],
        rows: [
          ["Queue", "Point-to-point, at-least-once", "SQS, RabbitMQ"],
          ["Stream", "Ordered log, replayable", "Kafka, Kinesis, Pub/Sub"],
          ["Pub/Sub", "Fan-out topic", "SNS, EventBridge"],
          ["Event bus", "Routing by content", "EventBridge, Event Grid"],
        ],
      },
      {
        type: "insight",
        text: "Design for at-least-once delivery: make handlers idempotent. 'Exactly-once' is a property of the whole system, not a primitive you buy.",
      },
    ],
  },
  {
    n: 23,
    part: 7,
    title: "Managed Databases",
    tagline: "RDS, DynamoDB, BigQuery, and the trade space",
    insight:
      "The database is the hardest thing to move. Choose with care, because you'll live with it.",
    content: [
      {
        type: "p",
        text: "Cloud providers offer managed relational, key-value, document, graph, time-series, and warehouse engines. Each trades consistency, scale, cost, and query flexibility differently.",
      },
      {
        type: "table",
        head: ["Category", "Examples", "Sweet Spot"],
        rows: [
          ["Relational", "RDS, Aurora, Cloud SQL", "Transactions, joins"],
          ["Key-value", "DynamoDB, Firestore", "Massive scale, simple keys"],
          ["Document", "MongoDB Atlas, Cosmos DB", "Flexible schemas"],
          ["Warehouse", "BigQuery, Redshift, Synapse", "Analytics, OLAP"],
          ["Search", "OpenSearch, Elastic", "Full-text, logs"],
          ["Graph", "Neptune, Cosmos Gremlin", "Relationships"],
        ],
      },
    ],
  },
  {
    n: 24,
    part: 7,
    title: "Data Lakes & Lakehouses",
    tagline: "Object storage + open table formats = analytics at scale",
    insight:
      "The lakehouse is a reunion: the flexibility of a lake with the guarantees of a warehouse.",
    content: [
      {
        type: "p",
        text: "Data lakes store raw files in object storage. Lakehouses add ACID transactions, schema evolution, and time travel via open table formats like Delta Lake, Iceberg, and Hudi.",
      },
      {
        type: "table",
        head: ["Format", "Origin", "Key Feature"],
        rows: [
          ["Delta Lake", "Databricks", "ACID + time travel"],
          ["Apache Iceberg", "Netflix", "Hidden partitioning, engine-agnostic"],
          ["Apache Hudi", "Uber", "Upserts, incremental pulls"],
        ],
      },
    ],
  },
  {
    n: 25,
    part: 7,
    title: "Cloud AI/ML Services",
    tagline: "From raw GPUs to fully managed model endpoints",
    insight:
      "Cloud AI is a spectrum: you can rent GPUs, rent training, or rent inference — pick your leverage.",
    content: [
      {
        type: "p",
        text: "Cloud providers offer AI at every level: raw GPU instances, managed training (SageMaker, Vertex AI), managed inference endpoints, and pre-built AI APIs (vision, speech, language).",
      },
      {
        type: "table",
        head: ["Layer", "Examples", "You Control"],
        rows: [
          ["GPU IaaS", "EC2 P5, A3", "Everything"],
          ["Managed training", "SageMaker, Vertex", "Data + model"],
          ["Model endpoints", "Bedrock, Vertex AI", "Prompts + config"],
          ["AI APIs", "Rekognition, Vision", "Inputs only"],
        ],
      },
    ],
  },
  {
    n: 26,
    part: 8,
    title: "IAM & Identity",
    tagline: "Who can do what, on which resource, under which conditions",
    insight:
      "In the cloud, IAM is the perimeter. Everything else is a suggestion.",
    demo: "iam",
    content: [
      {
        type: "p",
        text: "Identity and Access Management defines principals (users, roles, services), policies (allow/deny statements), and conditions (MFA, IP, tags). It's the single most important security control.",
      },
      {
        type: "code",
        text: "{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"s3:GetObject\"],\n  \"Resource\": \"arn:aws:s3:::my-bucket/*\",\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"true\" } }\n}",
      },
      {
        type: "insight",
        text: "Prefer roles over long-lived keys. Prefer OIDC federation over secrets. Prefer least-privilege policies generated from access logs over hand-written guesses.",
      },
    ],
  },
  {
    n: 27,
    part: 8,
    title: "Network Security",
    tagline: "Security groups, WAF, private endpoints, zero trust",
    insight:
      "Perimeter firewalls don't fit cloud. Identity-aware, least-privilege network policy does.",
    content: [
      {
        type: "p",
        text: "Cloud network security is layered: security groups at the instance level, NACLs at the subnet, WAF at the edge, and private endpoints to keep traffic off the public internet.",
      },
      {
        type: "table",
        head: ["Control", "Scope", "Example"],
        rows: [
          ["Security group", "Instance", "Allow 443 from ALB SG"],
          ["NACL", "Subnet", "Block 10.0.0.0/8"],
          ["WAF", "Edge", "Block SQL injection"],
          ["Private endpoint", "Service", "S3 via VPC endpoint"],
        ],
      },
    ],
  },
  {
    n: 28,
    part: 8,
    title: "Compliance & Governance",
    tagline: "SOC 2, HIPAA, GDPR, FedRAMP — and how to actually comply",
    insight:
      "Cloud providers are compliant for you — not on your behalf. You inherit controls, not guarantees.",
    content: [
      {
        type: "p",
        text: "Compliance frameworks define controls you must implement. Cloud providers publish shared responsibility matrices showing which controls are inherited and which are yours.",
      },
      {
        type: "table",
        head: ["Framework", "Domain", "Key Controls"],
        rows: [
          ["SOC 2", "Trust services", "Security, availability, confidentiality"],
          ["HIPAA", "Healthcare", "PHI encryption, BAA, audit"],
          ["GDPR", "EU privacy", "Data residency, right to erasure"],
          ["FedRAMP", "US gov", "Sovereign infra, strict controls"],
          ["PCI DSS", "Payments", "Cardholder data isolation"],
        ],
      },
    ],
  },
  {
    n: 29,
    part: 9,
    title: "Reliability Engineering in Cloud",
    tagline: "SLIs, SLOs, error budgets, and graceful degradation",
    insight:
      "Reliability is a budget you spend on features. Spend it deliberately.",
    demo: "slo",
    content: [
      {
        type: "p",
        text: "SRE defines SLIs (measured signals), SLOs (targets), and error budgets (allowed failures). When the budget is exhausted, you stop launching and start fixing.",
      },
      {
        type: "table",
        head: ["Term", "Meaning", "Example"],
        rows: [
          ["SLI", "What you measure", "p99 latency, availability"],
          ["SLO", "Target for the SLI", "99.9% availability"],
          ["Error budget", "Allowed failure", "43m/month"],
          ["RTO", "Recovery time objective", "1 hour"],
          ["RPO", "Recovery point objective", "5 minutes"],
        ],
      },
    ],
  },
  {
    n: 30,
    part: 9,
    title: "Observability",
    tagline: "Logs, metrics, traces, and the three pillars",
    insight:
      "You cannot operate what you cannot observe. Observability is a first-class cloud concern.",
    content: [
      {
        type: "p",
        text: "Observability is the ability to ask new questions of your system without deploying new code. It rests on three pillars: logs, metrics, and traces — plus profiles and events.",
      },
      {
        type: "table",
        head: ["Pillar", "What It Answers", "Cost Driver"],
        rows: [
          ["Metrics", "Is it broken? How fast?", "Cardinality"],
          ["Logs", "What happened?", "Volume"],
          ["Traces", "Where is time going?", "Sample rate"],
          ["Profiles", "Why is CPU hot?", "Overhead"],
        ],
      },
      {
        type: "insight",
        text: "Observability cost scales with cardinality, not users. A single high-cardinality label (user_id, request_id) can 100× your bill. Design metric schemas deliberately.",
      },
    ],
  },
  {
    n: 31,
    part: 9,
    title: "CI/CD & Infrastructure as Code",
    tagline: "Ship safely, repeatedly, and reversibly",
    insight:
      "If your infrastructure isn't code, it isn't reproducible — and it isn't cloud-native.",
    content: [
      {
        type: "p",
        text: "Continuous integration and delivery automate the path from commit to production. Infrastructure as Code (Terraform, Pulumi, CloudFormation) makes environments reproducible and reviewable.",
      },
      {
        type: "table",
        head: ["Tool", "Model", "Notes"],
        rows: [
          ["Terraform", "HCL, declarative", "Multi-cloud, huge ecosystem"],
          ["Pulumi", "Real languages", "Type-safe, testable"],
          ["CloudFormation", "AWS-native", "Deep AWS integration"],
          ["Crossplane", "K8s CRDs", "Kubernetes-native IaC"],
        ],
      },
      {
        type: "code",
        text: "resource \"aws_s3_bucket\" \"assets\" {\n  bucket = \"my-assets-2026\"\n  tags   = { env = \"prod\" }\n}",
      },
    ],
  },
  {
    n: 32,
    part: 10,
    title: "Cloud Cost Model",
    tagline: "The seven cost drivers of every cloud bill",
    insight:
      "Cloud bills don't lie. They just don't explain themselves.",
    demo: "cost",
    content: [
      {
        type: "p",
        text: "Cloud cost is the sum of a few drivers. Understanding them is the difference between a predictable bill and a quarterly surprise.",
      },
      {
        type: "table",
        head: ["Driver", "Typical Share", "Levers"],
        rows: [
          ["Compute", "40–60%", "Right-size, spot, savings plans"],
          ["Storage", "10–20%", "Tiering, lifecycle"],
          ["Egress", "5–20%", "CDN, private endpoints"],
          ["Managed services", "10–20%", "Right tier, avoid over-provision"],
          ["Licensing", "5–15%", "BYOL, open source"],
          ["Support", "3–10%", "Tier selection"],
          ["Waste", "10–30%", "Idle resources, orphaned volumes"],
        ],
      },
    ],
  },
  {
    n: 33,
    part: 10,
    title: "FinOps",
    tagline: "Making cloud cost a first-class engineering metric",
    insight:
      "FinOps is not 'spend less.' It's 'spend deliberately, and see the cost of every decision.'",
    content: [
      {
        type: "p",
        text: "FinOps is a cultural and operational practice: give engineers visibility into the cost of their choices, make cost a design input, and continuously optimize.",
      },
      {
        type: "table",
        head: ["Practice", "What It Looks Like"],
        rows: [
          ["Tagging", "Every resource has owner, env, cost-center"],
          ["Showback", "Teams see their own spend"],
          ["Unit economics", "Cost per request, per user, per order"],
          ["Budgets & alerts", "Automatic guardrails"],
          ["Commitment management", "Savings plans coverage > 70%"],
        ],
      },
      {
        type: "insight",
        text: "The most effective FinOps program is not a team — it's a dashboard every engineer opens. Cost visibility changes behavior faster than any mandate.",
      },
    ],
  },
  {
    n: 34,
    part: 11,
    title: "Multi-Cloud & Portability",
    tagline: "The promise, the cost, and the reality",
    insight:
      "Multi-cloud is a spectrum from 'we use two providers' to 'we're provider-agnostic.' Most teams want the first, not the second.",
    content: [
      {
        type: "p",
        text: "Multi-cloud means using two or more providers. Portability means the ability to move workloads between them. Both come with real costs — and often with surprising benefits.",
      },
      {
        type: "table",
        head: ["Motivation", "Reality"],
        rows: [
          ["Avoid vendor lock-in", "Portability tax usually exceeds switching risk"],
          ["Best-of-breed services", "Integration complexity grows super-linearly"],
          ["Regulatory", "Sometimes the only real driver"],
          ["Negotiating leverage", "Rarely material at small scale"],
        ],
      },
    ],
  },
  {
    n: 35,
    part: 11,
    title: "Edge & 5G",
    tagline: "Compute where the user is — not where the datacenter is",
    insight:
      "Edge is not 'smaller cloud.' It's a different physics contract: proximity over elasticity.",
    content: [
      {
        type: "p",
        text: "Edge computing places compute near users or devices — for latency, bandwidth, privacy, or autonomy. It complements cloud, not replaces it.",
      },
      {
        type: "table",
        head: ["Edge Type", "Latency", "Use Case"],
        rows: [
          ["CDN edge", "10–30 ms", "Static + dynamic web"],
          ["Metro edge", "5–15 ms", "Gaming, AR, video"],
          ["Far edge / on-prem", "1–5 ms", "Industrial, medical"],
          ["Device", "<1 ms", "Autonomy, robotics"],
        ],
      },
    ],
  },
  {
    n: 36,
    part: 11,
    title: "Sustainability & Green Cloud",
    tagline: "Carbon-aware computing is becoming a procurement requirement",
    insight:
      "The greenest compute is the compute you don't run — followed closely by the compute you run in the right region.",
    content: [
      {
        type: "p",
        text: "Cloud sustainability is now a first-class concern: regulators demand reporting, customers demand commitments, and cost and carbon often move together.",
      },
      {
        type: "table",
        head: ["Lever", "Impact"],
        rows: [
          ["Region selection", "Up to 10× lower carbon intensity"],
          ["Right-sizing", "Direct compute reduction"],
          ["Spot + scheduling", "Uses otherwise-idle capacity"],
          ["Managed services", "Higher utilization than self-hosted"],
          ["Hardware refresh", "Newer silicon is more efficient"],
        ],
      },
    ],
  },
  {
    n: 37,
    part: 11,
    title: "Platform Engineering",
    tagline: "Building the internal developer platform that makes cloud usable",
    insight:
      "The cloud is not a platform. A platform is the opinionated layer you build on top of cloud.",
    content: [
      {
        type: "p",
        text: "Platform engineering builds golden paths: opinionated, self-service abstractions that let product teams ship without wrestling with raw cloud primitives.",
      },
      {
        type: "table",
        head: ["Platform Layer", "Examples"],
        rows: [
          ["Service catalog", "Backstage, Port"],
          ["Golden paths", "Templates, scaffolding"],
          ["Deployment", "Argo, Flux, Spinnaker"],
          ["Policy", "OPA, Kyverno"],
          ["Observability", "Unified dashboards, SLOs"],
        ],
      },
    ],
  },
  {
    n: 38,
    part: 11,
    title: "The Cloud Frontier",
    tagline: "Where cloud is heading in the next decade",
    insight:
      "The cloud is becoming ambient: invisible, ubiquitous, and increasingly autonomous.",
    content: [
      {
        type: "table",
        head: ["Frontier", "Description", "Status"],
        rows: [
          ["AI-native clouds", "GPU fabric as a first-class primitive", "Rapidly scaling"],
          ["Autonomous operations", "Self-healing, self-tuning systems", "Emerging"],
          ["Confidential computing", "Encrypted-in-use workloads", "Maturing"],
          ["Sovereign clouds", "Country-scoped infrastructure", "Growing fast"],
          ["Serverless everything", "Serverless DBs, streams, GPUs", "Active"],
          ["Edge-cloud continuum", "Unified programming model", "Research"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: AI workloads + platform engineering + FinOps + sovereignty + confidential computing. Cloud is becoming an operating model for the entire enterprise, not a place you deploy to.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes cloud computing?",
      opts: [
        "Renting a single server in a datacenter",
        "An operating model for delivering elastic, metered compute as a utility",
        "A type of web hosting",
        "Software that runs in a browser",
      ],
      ans: 1,
      exp: "Cloud is an operating model, not a place. It delivers elastic, on-demand, metered compute, storage, and higher-level services over the network. A single rented VM without elasticity or metering is hosting, not cloud.",
    },
    {
      q: "Why does understanding the cloud stack matter?",
      opts: [
        "It helps you pass certifications",
        "Each layer hides complexity below and guarantees something above — you must know what to trust and what to verify",
        "Only architects need it",
        "It reduces the bill automatically",
      ],
      ans: 1,
      exp: "Each layer abstracts the ones below. Knowing what is guaranteed (durability, isolation, elasticity) versus what you still own (IAM, cost, correctness) is what separates a working system from a broken one.",
    },
  ],
  1: [
    {
      q: "Which is NOT one of NIST's five essential cloud characteristics?",
      opts: [
        "On-demand self-service",
        "Rapid elasticity",
        "Guaranteed zero downtime",
        "Measured service",
      ],
      ans: 2,
      exp: "NIST's five characteristics are: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Zero downtime is not guaranteed — SLAs define acceptable availability, not perfection.",
    },
    {
      q: "What is 'resource pooling' in the cloud?",
      opts: [
        "Sharing a single server between friends",
        "Multi-tenant infrastructure where resources are dynamically assigned to many customers",
        "Pooling money to buy servers",
        "Combining on-prem and cloud",
      ],
      ans: 1,
      exp: "Resource pooling means the provider serves many customers from shared physical infrastructure, dynamically assigning and reassigning capacity. This is what enables the economies of scale that make cloud cheap.",
    },
  ],
  5: [
    {
      q: "What is a hypervisor?",
      opts: [
        "A type of network switch",
        "Software that runs and isolates multiple virtual machines on one host",
        "A cloud billing system",
        "A container runtime",
      ],
      ans: 1,
      exp: "A hypervisor (Virtual Machine Monitor) creates and runs VMs, trapping privileged instructions and multiplexing physical CPU, memory, and I/O. KVM, Xen, and ESXi are common hypervisors.",
    },
    {
      q: "Type 1 vs Type 2 hypervisors:",
      opts: [
        "Type 1 is faster but less secure",
        "Type 1 runs on bare metal; Type 2 runs on a host OS",
        "Type 2 is used in cloud datacenters",
        "There is no difference",
      ],
      ans: 1,
      exp: "Type 1 (bare metal) hypervisors run directly on hardware — faster, used in production cloud. Type 2 (hosted) run atop an OS — convenient for dev but slower.",
    },
  ],
  16: [
    {
      q: "What Linux features make containers possible?",
      opts: [
        "Hypervisors and VMs",
        "Namespaces for isolation and cgroups for resource limits",
        "SELinux only",
        "Kernel modules",
      ],
      ans: 1,
      exp: "Namespaces isolate PID, network, mount, user, and other views. Cgroups limit CPU, memory, and I/O. Together they create the illusion of a dedicated machine without the overhead of a hypervisor.",
    },
    {
      q: "Why do containers start faster than VMs?",
      opts: [
        "They are written in a faster language",
        "They share the host kernel — no OS boot required",
        "They use less disk",
        "They are smaller images",
      ],
      ans: 1,
      exp: "A container is just a process with namespace isolation. There's no guest OS to boot. VMs must boot a full OS (20s–2min); containers start in milliseconds.",
    },
  ],
  17: [
    {
      q: "What is the core design principle of Kubernetes?",
      opts: [
        "Imperative scripts that deploy pods",
        "Declarative desired state reconciled by controllers",
        "Manual scheduling by operators",
        "Single-node orchestration",
      ],
      ans: 1,
      exp: "You declare desired state (e.g., 3 replicas of an image). Controllers continuously reconcile actual state toward desired state. This is why K8s is self-healing — a crashed pod is simply recreated.",
    },
    {
      q: "What is a Pod in Kubernetes?",
      opts: [
        "A physical server",
        "The smallest deployable unit — one or more containers sharing network and storage",
        "A type of load balancer",
        "A cluster",
      ],
      ans: 1,
      exp: "A Pod is the atomic scheduling unit. Containers in a Pod share network namespace and volumes, making them ideal for sidecars (logging, proxy, init). You rarely create Pods directly — Deployments manage them.",
    },
  ],
  20: [
    {
      q: "What is a cold start in serverless?",
      opts: [
        "Starting a server in a cold datacenter",
        "The latency incurred when a function is invoked with no warm instance available",
        "A failed deployment",
        "A billing event",
      ],
      ans: 1,
      exp: "When no warm instance exists, the platform must provision a runtime, load your code, and initialize it — 100ms to several seconds. Keeping functions warm or using provisioned concurrency reduces cold starts.",
    },
    {
      q: "Why must serverless functions be stateless?",
      opts: [
        "They run on read-only filesystems",
        "The platform may run any instance, anywhere, at any time — state must live in external stores",
        "Statelessness is faster",
        "They cannot use memory",
      ],
      ans: 1,
      exp: "FaaS platforms scale horizontally and route each invocation to any available instance. You cannot rely on in-memory or local state persisting between calls. Use S3, DynamoDB, ElastiCache, or queues for state.",
    },
  ],
  26: [
    {
      q: "In the cloud, what is the perimeter?",
      opts: [
        "The firewall at the datacenter edge",
        "IAM — identity and access policy is the real security boundary",
        "The VPC CIDR",
        "The load balancer",
      ],
      ans: 1,
      exp: "Traditional network perimeters dissolve in the cloud. The primary control is IAM: who (principal) can do what (action) on which resource, under which conditions. Everything else is defense in depth.",
    },
    {
      q: "Why prefer roles over long-lived access keys?",
      opts: [
        "Roles are cheaper",
        "Roles issue short-lived credentials that rotate automatically, shrinking the blast radius of a leak",
        "Keys are deprecated",
        "Roles are faster",
      ],
      ans: 1,
      exp: "Long-lived keys are a top cause of cloud breaches — they leak, get committed to Git, and never rotate. Roles + OIDC federation provide short-lived credentials that expire automatically and are scoped to a workload.",
    },
  ],
  30: [
    {
      q: "What are the three pillars of observability?",
      opts: [
        "CPU, memory, disk",
        "Logs, metrics, traces",
        "Dashboards, alerts, runbooks",
        "SLOs, SLIs, error budgets",
      ],
      ans: 1,
      exp: "Logs (what happened), metrics (aggregate numeric signals), and traces (request flow across services) form the three pillars. Profiles and events are increasingly added as a fourth.",
    },
    {
      q: "What drives observability cost the most?",
      opts: [
        "Number of users",
        "Cardinality and volume of telemetry",
        "Number of services",
        "Region",
      ],
      ans: 1,
      exp: "Cost scales with the number of unique time series (cardinality) and log/trace volume. A single high-cardinality label (user_id, request_id) can multiply a bill 100×. Design metric schemas deliberately.",
    },
  ],
  32: [
    {
      q: "Which is typically the largest cloud cost driver?",
      opts: ["Storage", "Compute", "Egress", "Support"],
      ans: 1,
      exp: "Compute is usually 40–60% of a cloud bill. Right-sizing, spot, and savings plans are the highest-leverage cost levers — but waste (idle resources) is often 10–30% on top.",
    },
    {
      q: "What is egress in cloud billing?",
      opts: [
        "Data transferred into the cloud",
        "Data transferred out of the cloud to the internet or another region",
        "A type of storage tier",
        "A network security control",
      ],
      ans: 1,
      exp: "Egress is data leaving the cloud. Ingress is usually free; egress is metered and can dominate bills for data-heavy workloads. CDNs and private endpoints reduce egress cost by keeping traffic on-network.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Autoscaling", def: "Automatically adjusting fleet size based on metrics. Target tracking is the most robust policy; pair with cooldowns to avoid flapping.", ch: 8 },
  { term: "Availability Zone", def: "An isolated datacenter within a region, with independent power, cooling, and networking. Design for zone failure by default.", ch: 4 },
  { term: "CDN", def: "Content Delivery Network. Caches content at edge locations close to users. Cache hit ratio is the key metric.", ch: 11 },
  { term: "Cgroup", def: "Linux control group. Limits and accounts for CPU, memory, and I/O usage. Half of what makes containers possible.", ch: 16 },
  { term: "CIDR", def: "Classless Inter-Domain Routing. IP range notation, e.g., 10.0.0.0/16. Defines the size of a VPC or subnet.", ch: 9 },
  { term: "Cold Start", def: "Latency incurred when a serverless function is invoked with no warm instance. Ranges from 100ms to several seconds.", ch: 20 },
  { term: "Container", def: "A process isolated by Linux namespaces and cgroups, sharing the host kernel. Starts in milliseconds; ships as OCI images.", ch: 16 },
  { term: "Control Plane", def: "The components that make decisions about the cluster (API server, scheduler, controllers). In managed K8s, the provider runs this.", ch: 17 },
  { term: "Durability", def: "Probability that stored data is not lost. Object storage commonly offers 11 nines (99.999999999%). Different from availability.", ch: 15 },
  { term: "Egress", def: "Data transferred out of the cloud. Often the most surprising line on a cloud bill. Reduce with CDNs and private endpoints.", ch: 32 },
  { term: "Elasticity", def: "The ability to scale capacity up and down automatically with demand. One of NIST's five essential cloud characteristics.", ch: 1 },
  { term: "Error Budget", def: "The allowed amount of failure derived from an SLO. When exhausted, teams stop shipping and fix reliability.", ch: 29 },
  { term: "FaaS", def: "Function as a Service. Event-driven compute with no server management, billed per invocation × duration. Examples: Lambda, Cloud Functions.", ch: 20 },
  { term: "FinOps", def: "Cultural and operational practice of making cloud cost a first-class engineering metric. Showback, tagging, and unit economics are core.", ch: 33 },
  { term: "Golden Path", def: "An opinionated, self-service path for common tasks in an internal developer platform. The core artifact of platform engineering.", ch: 37 },
  { term: "Hypervisor", def: "Software that runs and isolates virtual machines on one host. Type 1 runs on bare metal; Type 2 runs on a host OS.", ch: 5 },
  { term: "IAM", def: "Identity and Access Management. The primary security boundary in cloud: who can do what, on which resource, under which conditions.", ch: 26 },
  { term: "IaaS", def: "Infrastructure as a Service. You manage OS, runtime, apps, and data; the provider manages compute, storage, and network.", ch: 2 },
  { term: "Ingress", def: "In Kubernetes, an L7 HTTP router that exposes services to the internet. In cloud billing, ingress (data in) is usually free.", ch: 17 },
  { term: "Kubernetes", def: "Declarative container orchestrator. You declare desired state; controllers reconcile reality. The 'OS of the cloud.'", ch: 17 },
  { term: "Lakehouse", def: "Data architecture combining object storage with open table formats (Delta, Iceberg, Hudi) for ACID + analytics at scale.", ch: 24 },
  { term: "Namespace", def: "Linux kernel feature isolating PID, network, mount, user, and other views. Half of what makes containers possible.", ch: 16 },
  { term: "NAT Gateway", def: "Allows private subnets to initiate outbound internet traffic without exposing inbound access.", ch: 9 },
  { term: "Object Storage", def: "HTTP-API storage for arbitrary objects. Effectively infinite, cheap, 11-nines durable. Default for new data. Examples: S3, GCS, Blob.", ch: 13 },
  { term: "Observability", def: "The ability to ask new questions of a system without deploying new code. Rests on logs, metrics, and traces.", ch: 30 },
  { term: "PaaS", def: "Platform as a Service. You manage apps and data; the provider manages OS, runtime, and scaling. Examples: App Engine, Heroku.", ch: 2 },
  { term: "Pod", def: "The smallest deployable unit in Kubernetes — one or more containers sharing network and storage.", ch: 17 },
  { term: "Region", def: "A geographic area containing 3+ availability zones. Determines latency tier, data residency, and cost.", ch: 4 },
  { term: "RPO", def: "Recovery Point Objective. Maximum acceptable data loss, measured in time. Drives backup frequency.", ch: 15 },
  { term: "RTO", def: "Recovery Time Objective. Maximum acceptable downtime after a failure. Drives DR architecture.", ch: 15 },
  { term: "SaaS", def: "Software as a Service. You manage only your data and users; the provider manages everything else. Examples: Gmail, Salesforce.", ch: 2 },
  { term: "Security Group", def: "Stateful instance-level firewall in a VPC. The primary micro-segmentation control.", ch: 9 },
  { term: "Serverless", def: "Compute model where the provider manages all servers. Includes FaaS and managed services like DynamoDB and S3.", ch: 20 },
  { term: "Service Mesh", def: "Sidecar-based network layer providing mTLS, retries, and traffic shifting without app code changes. Examples: Istio, Linkerd.", ch: 18 },
  { term: "SLI", def: "Service Level Indicator. A measured signal, e.g., p99 latency or availability.", ch: 29 },
  { term: "SLO", def: "Service Level Objective. A target for an SLI, e.g., 99.9% availability. Derives the error budget.", ch: 29 },
  { term: "Spot Instance", def: "Interruptible compute sold at 60–90% discount. Ideal for stateless, retryable, or batch workloads.", ch: 7 },
  { term: "VPC", def: "Virtual Private Cloud. An isolated software-defined network with its own IP space, subnets, and route tables.", ch: 9 },
  { term: "Zero Trust", def: "Security model that assumes no implicit trust based on network location. Every request is authenticated and authorized.", ch: 27 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 5], [0, 9], [0, 13], [0, 16], [0, 17],
  [0, 20], [0, 23], [0, 26], [0, 29], [0, 32], [0, 34],
  [1, 2], [1, 3], [1, 4],
  [2, 3], [2, 5],
  [3, 4], [3, 9],
  [4, 9], [4, 34],
  [5, 6], [5, 7], [5, 8],
  [6, 7], [6, 8],
  [7, 8], [7, 32],
  [8, 17], [8, 20], [8, 32],
  [9, 10], [9, 11], [9, 12], [9, 27],
  [10, 11],
  [11, 34], [11, 35],
  [12, 34],
  [13, 14], [13, 15], [13, 23], [13, 24],
  [14, 15], [14, 32],
  [15, 29], [15, 30],
  [16, 17], [16, 19],
  [17, 18], [17, 19], [17, 31], [17, 37],
  [18, 30], [18, 37],
  [19, 34], [19, 37],
  [20, 21], [20, 22],
  [21, 22], [21, 31],
  [22, 23], [22, 30],
  [23, 24], [23, 25],
  [24, 25],
  [25, 38],
  [26, 27], [26, 28],
  [27, 28], [27, 29],
  [28, 34], [28, 36],
  [29, 30], [29, 31],
  [30, 31], [30, 33],
  [31, 37],
  [32, 33],
  [33, 37],
  [34, 35], [34, 36], [34, 38],
  [35, 38],
  [36, 38],
  [37, 38],
];

const NODE_POS = (() => {
  const W = 760, H = 520, CX = W / 2, CY = H / 2, R = 200;
  const pos = {};
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
function StackDemo() {
  const layers = [
    { l: "🏢 Data Centers", d: "Buildings, power, cooling, physical security", c: "#60A5FA" },
    { l: "🖥️ Hardware", d: "Servers, NICs, storage, GPUs, switches", c: "#818CF8" },
    { l: "💻 Virtualization", d: "Hypervisors and containers multiplex hardware", c: "#34D399" },
    { l: "🌐 Network Fabric", d: "SDN, VPCs, LBs, DNS, CDNs", c: "#2DD4BF" },
    { l: "💾 Storage & Data", d: "Object, block, file, warehouses, streams", c: "#FBBF24" },
    { l: "⚙️ Platform Services", d: "Managed DBs, queues, ML, observability", c: "#FB923C" },
    { l: "🚀 Applications", d: "Your code, deployed and scaled", c: "#F87171" },
    { l: "🏢 Operating Model", d: "IAM, cost, compliance, SRE, FinOps", c: "#A78BFA" },
  ];
  const [active, setActive] = useState(null);
  return (
    <div style={{ paddingTop: 8 }}>
      {layers.map((l, i) => (
        <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
          borderRadius: 8, marginBottom: 5,
          background: active === i ? `${l.c}22` : T.elevated,
          border: `1px solid ${active === i ? l.c : T.border}`,
          cursor: "pointer", transition: "all .2s",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.c, flexShrink: 0 }} />
          <span style={{ color: T.text, fontWeight: 600, fontSize: 13, flex: 1 }}>{l.l}</span>
          {active === i && <span style={{ color: l.c, fontSize: 12 }}>{l.d}</span>}
          <span style={{ color: T.muted, fontSize: 10 }}>Layer {i}</span>
        </div>
      ))}
    </div>
  );
}

function ServiceModelsDemo() {
  const [model, setModel] = useState(0);
  const models = ["IaaS", "PaaS", "CaaS", "FaaS", "SaaS"];
  const rows = [
    { layer: "Applications", you: [true, true, true, true, false] },
    { layer: "Data", you: [true, true, true, true, true] },
    { layer: "Runtime", you: [true, true, false, false, false] },
    { layer: "OS", you: [true, false, false, false, false] },
    { layer: "Virtualization", you: [false, false, false, false, false] },
    { layer: "Servers", you: [false, false, false, false, false] },
    { layer: "Storage", you: [false, false, false, false, false] },
    { layer: "Network", you: [false, false, false, false, false] },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {models.map((m, i) => (
          <button key={m} onClick={() => setModel(i)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${model === i ? T.accent : T.border}`,
            background: model === i ? `${T.accent}22` : "transparent",
            color: model === i ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{m}</button>
        ))}
      </div>
      <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: T.surface, padding: "8px 14px", fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: ".05em" }}>
          <div>LAYER</div><div>YOU MANAGE</div><div>PROVIDER MANAGES</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            padding: "8px 14px", fontSize: 12, alignItems: "center",
            background: i % 2 === 0 ? T.elevated : T.surface,
            borderTop: `1px solid ${T.border}44`,
          }}>
            <div style={{ color: T.text, fontWeight: 600 }}>{r.layer}</div>
            <div style={{ color: r.you[model] ? T.amber : T.muted, fontWeight: 600 }}>
              {r.you[model] ? "✓ You" : "—"}
            </div>
            <div style={{ color: r.you[model] ? T.muted : T.green, fontWeight: 600 }}>
              {r.you[model] ? "—" : "✓ Provider"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionsDemo() {
  const [selected, setSelected] = useState(null);
  const regions = [
    { id: "us-east", x: 140, y: 130, label: "US East", zones: 6, latency: 40, carbon: "medium" },
    { id: "us-west", x: 80, y: 140, label: "US West", zones: 4, latency: 60, carbon: "low" },
    { id: "eu-west", x: 260, y: 100, label: "EU West", zones: 3, latency: 90, carbon: "low" },
    { id: "eu-north", x: 290, y: 70, label: "EU North", zones: 3, latency: 110, carbon: "very low" },
    { id: "ap-south", x: 400, y: 170, label: "AP South", zones: 3, latency: 150, carbon: "high" },
    { id: "ap-ne", x: 450, y: 110, label: "AP NE", zones: 3, latency: 130, carbon: "medium" },
    { id: "sa-east", x: 200, y: 250, label: "SA East", zones: 3, latency: 120, carbon: "low" },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Click a region to see zone count, baseline latency, and carbon intensity
      </p>
      <svg width="540" height="300" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <ellipse cx="270" cy="150" rx="240" ry="120" fill="none" stroke={T.border} strokeWidth="0.5" strokeDasharray="4,4" />
        {regions.map((r) => (
          <g key={r.id} onClick={() => setSelected(r)} style={{ cursor: "pointer" }}>
            {selected?.id === r.id && (
              <circle cx={r.x} cy={r.y} r={22} fill={T.accent} opacity={0.15} />
            )}
            <circle cx={r.x} cy={r.y} r={selected?.id === r.id ? 12 : 9}
              fill={T.accent} stroke={T.accent} strokeWidth={2} />
            <text x={r.x} y={r.y - 16} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="600">{r.label}</text>
          </g>
        ))}
      </svg>
      {selected && (
        <div style={{
          marginTop: 12, padding: "12px 16px", borderRadius: 10,
          background: T.surface, border: `1px solid ${T.accent}`,
        }}>
          <div style={{ color: T.accent, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
            {selected.label}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12 }}>
            <div><span style={{ color: T.muted }}>Zones:</span> <span style={{ color: T.text }}>{selected.zones}</span></div>
            <div><span style={{ color: T.muted }}>Base latency:</span> <span style={{ color: T.text }}>{selected.latency} ms</span></div>
            <div><span style={{ color: T.muted }}>Carbon:</span> <span style={{ color: T.green }}>{selected.carbon}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function HypervisorDemo() {
  const [vms, setVms] = useState(2);
  const hostCores = 16, hostRam = 64;
  const perVmCores = 2, perVmRam = 8;
  const usedCores = vms * perVmCores;
  const usedRam = vms * perVmRam;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Adjust the number of VMs to see how a hypervisor multiplexes one physical host
      </p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <button onClick={() => setVms(Math.max(1, vms - 1))} style={{
          width: 32, height: 32, borderRadius: 8, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 16,
        }}>−</button>
        <span style={{ color: T.text, fontSize: 14, fontWeight: 700, minWidth: 60, textAlign: "center" }}>
          {vms} VMs
        </span>
        <button onClick={() => setVms(Math.min(6, vms + 1))} style={{
          width: 32, height: 32, borderRadius: 8, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 16,
        }}>+</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))", gap: 8, marginBottom: 16 }}>
        {Array.from({ length: vms }).map((_, i) => (
          <div key={i} style={{
            padding: "10px 8px", borderRadius: 8, textAlign: "center",
            background: `${T.accent}22`, border: `1px solid ${T.accent}`,
          }}>
            <div style={{ fontSize: 16, marginBottom: 2 }}>💻</div>
            <div style={{ color: T.accent, fontSize: 10, fontWeight: 700 }}>VM {i + 1}</div>
            <div style={{ color: T.muted, fontSize: 9 }}>{perVmCores}c / {perVmRam}GB</div>
          </div>
        ))}
      </div>
      <div style={{
        padding: "14px 16px", borderRadius: 10,
        background: T.surface, border: `1px solid ${T.border}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>PHYSICAL HOST</div>
        {[
          { label: "CPU", used: usedCores, total: hostCores, unit: "cores", color: T.green },
          { label: "RAM", used: usedRam, total: hostRam, unit: "GB", color: T.amber },
        ].map((r) => (
          <div key={r.label} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
              <span style={{ color: T.muted }}>{r.label}</span>
              <span style={{ color: r.used > r.total ? T.red : r.color, fontWeight: 700 }}>
                {r.used}/{r.total} {r.unit}
              </span>
            </div>
            <div style={{ height: 6, background: T.border, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                width: `${Math.min(100, (r.used / r.total) * 100)}%`,
                height: "100%", background: r.used > r.total ? T.red : r.color,
                borderRadius: 3, transition: "width .3s",
              }} />
            </div>
          </div>
        ))}
        {usedCores > hostCores || usedRam > hostRam ? (
          <div style={{ color: T.red, fontSize: 11, marginTop: 6 }}>
            ⚠ Over-committed — the hypervisor will swap, throttle, or refuse new VMs
          </div>
        ) : (
          <div style={{ color: T.green, fontSize: 11, marginTop: 6 }}>
            ✓ Host has spare capacity — could fit {Math.min(
              Math.floor((hostCores - usedCores) / perVmCores),
              Math.floor((hostRam - usedRam) / perVmRam)
            )} more VMs
          </div>
        )}
      </div>
    </div>
  );
}

function InstancesDemo() {
  const [family, setFamily] = useState(0);
  const families = [
    { name: "General (M)", vcpu: 8, ram: 32, cost: 0.40, tag: "Balanced" },
    { name: "Compute (C)", vcpu: 16, ram: 32, cost: 0.68, tag: "CPU-heavy" },
    { name: "Memory (R)", vcpu: 8, ram: 128, cost: 0.80, tag: "RAM-heavy" },
    { name: "Storage (I)", vcpu: 8, ram: 64, cost: 0.90, tag: "IOPS-heavy" },
    { name: "GPU (P)", vcpu: 96, ram: 640, cost: 32.77, tag: "Parallel" },
    { name: "Burstable (T)", vcpu: 2, ram: 4, cost: 0.08, tag: "Bursty" },
  ];
  const f = families[family];
  const pricing = [
    { model: "On-demand", mult: 1, desc: "Full price, no commitment" },
    { model: "Savings plan 1y", mult: 0.65, desc: "~35% off, 1-year commit" },
    { model: "Savings plan 3y", mult: 0.45, desc: "~55% off, 3-year commit" },
    { model: "Spot", mult: 0.25, desc: "~75% off, interruptible" },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {families.map((fam, i) => (
          <button key={fam.name} onClick={() => setFamily(i)} style={{
            padding: "5px 12px", borderRadius: 20,
            border: `1px solid ${family === i ? T.accent : T.border}`,
            background: family === i ? `${T.accent}22` : "transparent",
            color: family === i ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{fam.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{f.name}</span>
          <span style={{ color: T.accent, fontSize: 11, fontWeight: 700 }}>{f.tag}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <div><div style={{ color: T.muted, fontSize: 11 }}>vCPU</div><div style={{ color: T.text, fontSize: 18, fontWeight: 800 }}>{f.vcpu}</div></div>
          <div><div style={{ color: T.muted, fontSize: 11 }}>RAM</div><div style={{ color: T.text, fontSize: 18, fontWeight: 800 }}>{f.ram} GB</div></div>
          <div><div style={{ color: T.muted, fontSize: 11 }}>$/hr</div><div style={{ color: T.green, fontSize: 18, fontWeight: 800 }}>${f.cost.toFixed(2)}</div></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
        {pricing.map((p) => (
          <div key={p.model} style={{
            padding: "10px 14px", borderRadius: 8, background: T.elevated,
            border: `1px solid ${T.border}`,
          }}>
            <div style={{ color: T.accent, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{p.model}</div>
            <div style={{ color: T.green, fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
              ${(f.cost * p.mult).toFixed(3)}<span style={{ fontSize: 11, color: T.muted }}>/hr</span>
            </div>
            <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.4 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoscalingDemo() {
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [instances, setInstances] = useState(2);
  const ref = useRef(null);
  const demand = Array.from({ length: 40 }, (_, i) => {
    if (i < 10) return 20;
    if (i < 20) return 20 + (i - 10) * 8;
    if (i < 30) return 100 - (i - 20) * 8;
    return 20;
  });
  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setTick((t) => {
        if (t >= demand.length - 1) { setRunning(false); return t; }
        return t + 1;
      });
    }, 250);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);
  useEffect(() => {
    const target = Math.max(1, Math.ceil(demand[tick] / 25));
    setInstances((curr) => {
      if (target > curr) return Math.min(target, curr + 2);
      if (target < curr) return Math.max(target, curr - 1);
      return curr;
    });
  }, [tick]);
  const maxDemand = 120;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => { setRunning(!running); if (!running) setTick(0); }} style={{
          padding: "8px 20px", borderRadius: 20, background: running ? T.red : T.green,
          color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
        }}>{running ? "⏸ Pause" : "▶ Simulate Traffic"}</button>
        <button onClick={() => { setTick(0); setRunning(false); setInstances(2); }} style={{
          padding: "8px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
        }}>↺ Reset</button>
        <div style={{
          marginLeft: "auto", padding: "6px 14px", borderRadius: 8,
          background: T.elevated, border: `1px solid ${T.border}`,
          fontSize: 12,
        }}>
          <span style={{ color: T.muted }}>Instances: </span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{instances}</span>
        </div>
      </div>
      <svg width="100%" height="160" viewBox="0 0 500 160" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={20} y1={130} x2={480} y2={130} stroke={T.border} strokeWidth={1} />
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={20} y1={130 - (v / maxDemand) * 110} x2={480} y2={130 - (v / maxDemand) * 110}
              stroke={T.border} strokeWidth={0.5} strokeDasharray="2,4" />
            <text x={14} y={130 - (v / maxDemand) * 110 + 3} textAnchor="end" fill={T.muted} fontSize="9">{v}</text>
          </g>
        ))}
        <polyline points={demand.map((d, i) => `${20 + i * 11.5},${130 - (d / maxDemand) * 110}`).join(" ")}
          fill="none" stroke={T.blue} strokeWidth={2} />
        <polyline points={demand.slice(0, tick + 1).map((d, i) => `${20 + i * 11.5},${130 - (d / maxDemand) * 110}`).join(" ")}
          fill="none" stroke={T.accent} strokeWidth={3} />
        <line x1={20 + tick * 11.5} y1={20} x2={20 + tick * 11.5} y2={130}
          stroke={T.accent} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">Demand over time</text>
      </svg>
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {Array.from({ length: instances }).map((_, i) => (
          <div key={i} style={{
            padding: "6px 12px", borderRadius: 6, background: `${T.green}22`,
            border: `1px solid ${T.green}`, color: T.green, fontSize: 11, fontWeight: 700,
          }}>● instance-{i + 1}</div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Target tracking scales out by 2 and in by 1 — asymmetric to avoid flapping.
      </div>
    </div>
  );
}

function VPCDemo() {
  const [mode, setMode] = useState("public");
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["public", "private", "nat"].map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${mode === m ? T.accent : T.border}`,
            background: mode === m ? `${T.accent}22` : "transparent",
            color: mode === m ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600, textTransform: "capitalize",
          }}>{m}</button>
        ))}
      </div>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <rect x={20} y={20} width={460} height={220} fill="none" stroke={T.accent} strokeWidth="1.5" strokeDasharray="6,4" rx={8} />
        <text x={30} y={40} fill={T.accent} fontSize="11" fontWeight="700">VPC 10.0.0.0/16</text>

        <rect x={40} y={60} width={200} height={160} fill={`${T.green}11`} stroke={T.green} strokeWidth="1" rx={6} />
        <text x={50} y={78} fill={T.green} fontSize="10" fontWeight="700">PUBLIC SUBNET 10.0.1.0/24</text>
        <rect x={60} y={100} width={70} height={40} fill={T.surface} stroke={T.green} rx={4} />
        <text x={95} y={125} textAnchor="middle" fill={T.text} fontSize="10">Web</text>
        <rect x={150} y={100} width={70} height={40} fill={T.surface} stroke={T.green} rx={4} />
        <text x={185} y={125} textAnchor="middle" fill={T.text} fontSize="10">Bastion</text>

        <rect x={260} y={60} width={200} height={160} fill={`${T.amber}11`} stroke={T.amber} strokeWidth="1" rx={6} />
        <text x={270} y={78} fill={T.amber} fontSize="10" fontWeight="700">PRIVATE SUBNET 10.0.2.0/24</text>
        <rect x={280} y={100} width={70} height={40} fill={T.surface} stroke={T.amber} rx={4} />
        <text x={315} y={125} textAnchor="middle" fill={T.text} fontSize="10">App</text>
        <rect x={370} y={100} width={70} height={40} fill={T.surface} stroke={T.amber} rx={4} />
        <text x={405} y={125} textAnchor="middle" fill={T.text} fontSize="10">DB</text>

        <rect x={200} y={220} width={100} height={30} fill={T.surface} stroke={mode === "nat" ? T.accent : T.border} rx={4} />
        <text x={250} y={240} textAnchor="middle" fill={mode === "nat" ? T.accent : T.muted} fontSize="10" fontWeight="600">
          {mode === "nat" ? "NAT Gateway" : "Internet GW"}
        </text>

        {mode !== "private" && (
          <line x1={250} y1={220} x2={250} y2={200} stroke={mode === "nat" ? T.accent : T.green} strokeWidth={2} />
        )}
        {mode === "nat" && (
          <line x1={250} y1={200} x2={315} y2={160} stroke={T.accent} strokeWidth={1.5} strokeDasharray="3,3" />
        )}
        {mode === "public" && (
          <line x1={250} y1={200} x2={95} y2={160} stroke={T.green} strokeWidth={1.5} />
        )}
        {mode === "public" && (
          <line x1={250} y1={200} x2={405} y2={160} stroke={T.green} strokeWidth={0.5} strokeDasharray="3,3" opacity={0.3} />
        )}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {mode === "public" && "Public subnets route directly to an Internet Gateway — resources are directly reachable."}
        {mode === "private" && "Private subnets have no route to the internet. Resources can only be reached from inside the VPC."}
        {mode === "nat" && "A NAT Gateway lets private subnets initiate outbound traffic without accepting inbound. Standard for app/DB tiers."}
      </div>
    </div>
  );
}

function CDNDemo() {
  const [cached, setCached] = useState(false);
  const originMs = 180, edgeMs = 15;
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [last, setLast] = useState(null);
  const request = () => {
    if (cached) { setHits(hits + 1); setLast({ hit: true, ms: edgeMs }); }
    else { setMisses(misses + 1); setLast({ hit: false, ms: originMs }); }
  };
  const total = hits + misses;
  const ratio = total === 0 ? 0 : (hits / total) * 100;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={request} style={{
          padding: "8px 18px", borderRadius: 20, background: T.accent,
          color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>▶ Send Request</button>
        <button onClick={() => setCached(!cached)} style={{
          padding: "8px 16px", borderRadius: 20,
          background: cached ? `${T.green}22` : T.elevated,
          border: `1px solid ${cached ? T.green : T.border}`,
          color: cached ? T.green : T.text, cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>{cached ? "✓ Cacheable" : "✗ Not Cacheable"}</button>
        <button onClick={() => { setHits(0); setMisses(0); setLast(null); }} style={{
          padding: "8px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
        }}>↺ Reset</button>
      </div>
      <svg width="100%" height="160" viewBox="0 0 500 160" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <circle cx={70} cy={80} r={26} fill={T.surface} stroke={T.blue} strokeWidth={2} />
        <text x={70} y={85} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="600">User</text>

        <circle cx={250} cy={80} r={32} fill={T.surface} stroke={last?.hit ? T.green : T.border} strokeWidth={2} />
        <text x={250} y={78} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="700">Edge</text>
        <text x={250} y={92} textAnchor="middle" fill={T.muted} fontSize="9">CDN PoP</text>

        <circle cx={430} cy={80} r={26} fill={T.surface} stroke={!last?.hit && last ? T.amber : T.border} strokeWidth={2} />
        <text x={430} y={85} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="600">Origin</text>

        <line x1={96} y1={80} x2={218} y2={80} stroke={T.border} strokeWidth={2} />
        {last && (
          <>
            <line x1={96} y1={80} x2={218} y2={80} stroke={T.green} strokeWidth={2} strokeDasharray="4,2" />
            {!last.hit && <line x1={282} y1={80} x2={404} y2={80} stroke={T.amber} strokeWidth={2} strokeDasharray="4,2" />}
          </>
        )}
        {last && (
          <text x={250} y={140} textAnchor="middle" fill={last.hit ? T.green : T.amber} fontSize="12" fontWeight="700">
            {last.hit ? `HIT — ${last.ms}ms` : `MISS — ${last.ms}ms`}
          </text>
        )}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12 }}>
        <span style={{ color: T.muted }}>Cache hit ratio:</span>
        <span style={{ color: ratio > 80 ? T.green : ratio > 50 ? T.amber : T.red, fontWeight: 700 }}>
          {ratio.toFixed(0)}% ({hits} hits / {misses} misses)
        </span>
      </div>
    </div>
  );
}

function StorageDemo() {
  const [type, setType] = useState(0);
  const types = [
    {
      name: "Block", api: "Virtual disk", use: ["Databases", "Boot volumes", "High-IOPS apps"],
      cost: "$0.10/GB-mo", latency: "sub-ms", durability: "99.9% (replicated)",
      color: T.blue,
    },
    {
      name: "File", api: "NFS / SMB", use: ["Shared configs", "Home dirs", "CMS"],
      cost: "$0.30/GB-mo", latency: "low-ms", durability: "99.99%",
      color: T.green,
    },
    {
      name: "Object", api: "HTTP REST", use: ["Backups", "Media", "Data lakes"],
      cost: "$0.023/GB-mo", latency: "10–100ms", durability: "11 nines",
      color: T.purple,
    },
  ];
  const t = types[type];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {types.map((tt, i) => (
          <button key={tt.name} onClick={() => setType(i)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${type === i ? tt.color : T.border}`,
            background: type === i ? `${tt.color}22` : "transparent",
            color: type === i ? tt.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{tt.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${t.color}`,
      }}>
        <div style={{ color: t.color, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
          {t.name} Storage
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[
            { l: "Interface", v: t.api },
            { l: "Latency", v: t.latency },
            { l: "Cost", v: t.cost },
            { l: "Durability", v: t.durability },
          ].map((r) => (
            <div key={r.l}>
              <div style={{ color: T.muted, fontSize: 11 }}>{r.l}</div>
              <div style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ color: T.muted, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>BEST FOR</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {t.use.map((u) => (
            <span key={u} style={{
              padding: "4px 10px", borderRadius: 12, background: `${t.color}22`,
              color: t.color, fontSize: 11, fontWeight: 600,
            }}>{u}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContainersDemo() {
  const [showVM, setShowVM] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setShowVM(false)} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${!showVM ? T.accent : T.border}`,
          background: !showVM ? `${T.accent}22` : "transparent",
          color: !showVM ? T.accent : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Containers</button>
        <button onClick={() => setShowVM(true)} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${showVM ? T.amber : T.border}`,
          background: showVM ? `${T.amber}22` : "transparent",
          color: showVM ? T.amber : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Virtual Machines</button>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.elevated,
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>
          PHYSICAL HOST
        </div>
        <div style={{
          padding: "10px", borderRadius: 8, background: T.surface,
          border: `1px solid ${T.border}`, marginBottom: 8,
        }}>
          <div style={{ color: T.accent, fontSize: 11, fontWeight: 700, textAlign: "center" }}>
            {showVM ? "Hypervisor" : "Host OS (shared kernel)"}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: showVM ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 8 }}>
          {(showVM ? [1, 2] : [1, 2, 3, 4]).map((i) => (
            <div key={i} style={{
              padding: "10px 8px", borderRadius: 8, background: T.surface,
              border: `1px solid ${showVM ? T.amber : T.green}44`, textAlign: "center",
            }}>
              {showVM && (
                <div style={{
                  padding: "4px 6px", borderRadius: 4, marginBottom: 6,
                  background: `${T.amber}22`, fontSize: 9, color: T.amber, fontWeight: 700,
                }}>Guest OS</div>
              )}
              <div style={{ fontSize: 16, marginBottom: 2 }}>{showVM ? "🖥️" : "📦"}</div>
              <div style={{ color: showVM ? T.amber : T.green, fontSize: 10, fontWeight: 600 }}>
                {showVM ? `VM ${i}` : `ctr ${i}`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {showVM
          ? "VMs: each has a full guest OS (GBs of overhead), boots in seconds–minutes, strong isolation via hypervisor."
          : "Containers: share the host kernel, MBs of overhead, start in milliseconds, isolation via namespaces + cgroups."}
      </div>
    </div>
  );
}

function KubernetesDemo() {
  const [pods, setPods] = useState(3);
  const desired = 3;
  const [reconciling, setReconciling] = useState(false);
  const killPod = () => {
    setPods(pods - 1);
    setReconciling(true);
    setTimeout(() => { setPods(pods); setReconciling(false); }, 1200);
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Kubernetes reconciliation: kill a pod and watch the controller restore desired state
      </p>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.elevated,
        border: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12 }}>
          <span style={{ color: T.muted }}>Desired replicas:</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{desired}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12 }}>
          <span style={{ color: T.muted }}>Actual replicas:</span>
          <span style={{ color: pods === desired ? T.green : T.amber, fontWeight: 700 }}>{pods}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {Array.from({ length: desired }).map((_, i) => (
            <div key={i} style={{
              padding: "12px 8px", borderRadius: 8, textAlign: "center",
              background: i < pods ? `${T.green}22` : `${T.red}22`,
              border: `1px solid ${i < pods ? T.green : T.red}`,
              transition: "all .3s",
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{i < pods ? "📦" : "💀"}</div>
              <div style={{ color: i < pods ? T.green : T.red, fontSize: 10, fontWeight: 700 }}>
                {i < pods ? "Running" : "Missing"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={killPod} disabled={pods < desired || reconciling} style={{
        padding: "8px 20px", borderRadius: 20,
        background: pods < desired || reconciling ? T.elevated : T.red,
        color: pods < desired || reconciling ? T.muted : "#fff",
        border: "none", cursor: pods < desired || reconciling ? "wait" : "pointer",
        fontWeight: 700, fontSize: 13,
      }}>{reconciling ? "Reconciling..." : "💀 Kill a Pod"}</button>
      {reconciling && (
        <div style={{
          marginTop: 10, padding: "8px 12px", borderRadius: 8,
          background: `${T.amber}22`, border: `1px solid ${T.amber}`,
          color: T.amber, fontSize: 12,
        }}>⚙️ Controller detected drift — scheduling new pod...</div>
      )}
    </div>
  );
}

function ServerlessDemo() {
  const [warm, setWarm] = useState(false);
  const [invoking, setInvoking] = useState(false);
  const [timing, setTiming] = useState(null);
  const invoke = () => {
    setInvoking(true);
    setTiming(null);
    const delay = warm ? 80 : 1800;
    setTimeout(() => {
      setTiming({ cold: !warm, ms: delay });
      setInvoking(false);
      setWarm(true);
    }, delay);
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Invoke a serverless function to see warm vs cold start latency
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={invoke} disabled={invoking} style={{
          padding: "8px 20px", borderRadius: 20,
          background: invoking ? T.elevated : T.accent,
          color: invoking ? T.muted : "#000",
          border: "none", cursor: invoking ? "wait" : "pointer",
          fontWeight: 700, fontSize: 12,
        }}>{invoking ? "Invoking..." : "⚡ Invoke Function"}</button>
        <button onClick={() => { setWarm(false); setTiming(null); }} style={{
          padding: "8px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
        }}>↺ Cool Down</button>
        <div style={{
          marginLeft: "auto", padding: "6px 14px", borderRadius: 8,
          background: T.elevated, border: `1px solid ${T.border}`, fontSize: 12,
        }}>
          <span style={{ color: T.muted }}>State: </span>
          <span style={{ color: warm ? T.green : T.red, fontWeight: 700 }}>
            {warm ? "Warm" : "Cold"}
          </span>
        </div>
      </div>
      {timing && (
        <div style={{
          padding: "16px", borderRadius: 10, background: T.surface,
          border: `1px solid ${timing.cold ? T.red : T.green}`,
        }}>
          <div style={{ color: timing.cold ? T.red : T.green, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
            {timing.cold ? "❄️ Cold Start" : "🔥 Warm Invocation"}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: T.muted }}>Latency</span>
            <span style={{ color: T.text, fontWeight: 700 }}>{timing.ms}ms</span>
          </div>
          <div style={{ height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${(timing.ms / 2000) * 100}%`, height: "100%",
              background: timing.cold ? T.red : T.green, borderRadius: 4,
            }} />
          </div>
          <div style={{ color: T.muted, fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>
            {timing.cold
              ? "Cold start: provisioning a runtime, loading code, initializing. 100ms–several seconds."
              : "Warm: the runtime is already provisioned and code is loaded — only your handler executes."}
          </div>
        </div>
      )}
    </div>
  );
}

function IAMDemo() {
  const [role, setRole] = useState("readonly");
  const roles = {
    readonly: {
      label: "Read-only analyst",
      color: T.green,
      perms: [
        { action: "s3:GetObject", allowed: true },
        { action: "s3:ListBucket", allowed: true },
        { action: "s3:PutObject", allowed: false },
        { action: "s3:DeleteObject", allowed: false },
        { action: "iam:CreateUser", allowed: false },
      ],
    },
    developer: {
      label: "Developer",
      color: T.amber,
      perms: [
        { action: "s3:GetObject", allowed: true },
        { action: "s3:ListBucket", allowed: true },
        { action: "s3:PutObject", allowed: true },
        { action: "s3:DeleteObject", allowed: true },
        { action: "iam:CreateUser", allowed: false },
      ],
    },
    admin: {
      label: "Administrator",
      color: T.red,
      perms: [
        { action: "s3:GetObject", allowed: true },
        { action: "s3:ListBucket", allowed: true },
        { action: "s3:PutObject", allowed: true },
        { action: "s3:DeleteObject", allowed: true },
        { action: "iam:CreateUser", allowed: true },
      ],
    },
  };
  const r = roles[role];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {Object.entries(roles).map(([k, v]) => (
          <button key={k} onClick={() => setRole(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${role === k ? v.color : T.border}`,
            background: role === k ? `${v.color}22` : "transparent",
            color: role === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.label}</button>
        ))}
      </div>
      <div style={{
        background: "#020812", borderRadius: 10, border: `1px solid ${r.color}`,
        padding: "14px 16px",
      }}>
        <div style={{ color: r.color, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
          Policy for {r.label}
        </div>
        {r.perms.map((p) => (
          <div key={p.action} style={{
            display: "flex", justifyContent: "space-between",
            padding: "6px 0", borderBottom: `1px solid ${T.border}44`,
            fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12,
          }}>
            <span style={{ color: T.text }}>{p.action}</span>
            <span style={{ color: p.allowed ? T.green : T.red, fontWeight: 700 }}>
              {p.allowed ? "ALLOW" : "DENY"}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Principle of least privilege: grant only what the workload needs. Read-only for analytics, scoped writes for services, admin only via federated, audited roles.
      </div>
    </div>
  );
}

function SLODemo() {
  const [slo, setSlo] = useState(99.9);
  const errorBudgetMin = (1 - slo / 100) * 30 * 24 * 60;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Adjust the SLO to see the resulting monthly error budget
      </p>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {[99, 99.5, 99.9, 99.95, 99.99].map((v) => (
          <button key={v} onClick={() => setSlo(v)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${slo === v ? T.accent : T.border}`,
            background: slo === v ? `${T.accent}22` : "transparent",
            color: slo === v ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v}%</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 12, marginBottom: 6 }}>Monthly error budget</div>
        <div style={{ color: T.accent, fontSize: 36, fontWeight: 900 }}>
          {errorBudgetMin < 60
            ? `${errorBudgetMin.toFixed(1)} min`
            : errorBudgetMin < 1440
            ? `${(errorBudgetMin / 60).toFixed(1)} hr`
            : `${(errorBudgetMin / 1440).toFixed(2)} days`}
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 8 }}>
          {errorBudgetMin < 5
            ? "This is minutes per month — every incident matters."
            : errorBudgetMin < 60
            ? "Tight budget. Automate recovery; practice incident response."
            : "Healthy budget. Ship aggressively; use the budget as a feature-velocity signal."}
        </div>
      </div>
    </div>
  );
}

function CostDemo() {
  const [compute, setCompute] = useState(50);
  const [storage, setStorage] = useState(15);
  const [egress, setEgress] = useState(10);
  const [managed, setManaged] = useState(15);
  const [waste, setWaste] = useState(10);
  const total = compute + storage + egress + managed + waste;
  const items = [
    { label: "Compute", value: compute, set: setCompute, color: T.blue },
    { label: "Storage", value: storage, set: setStorage, color: T.green },
    { label: "Egress", value: egress, set: setEgress, color: T.amber },
    { label: "Managed services", value: managed, set: setManaged, color: T.purple },
    { label: "Waste", value: waste, set: setWaste, color: T.red },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        Adjust the sliders to see how each driver contributes to your cloud bill
      </p>
      {items.map((it) => (
        <div key={it.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: T.text, fontWeight: 600 }}>{it.label}</span>
            <span style={{ color: it.color, fontWeight: 700 }}>{it.value}%</span>
          </div>
          <input type="range" min={0} max={70} value={it.value}
            onChange={(e) => it.set(+e.target.value)} style={{ width: "100%" }} />
        </div>
      ))}
      <div style={{
        marginTop: 16, padding: "16px", borderRadius: 10,
        background: T.surface, border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>TOTAL SHARE</div>
        <div style={{ color: T.accent, fontSize: 28, fontWeight: 900 }}>{total}%</div>
        <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginTop: 10 }}>
          {items.map((it) => (
            <div key={it.label} style={{
              width: `${(it.value / total) * 100}%`, background: it.color,
              transition: "width .3s",
            }} />
          ))}
        </div>
        {total > 100 && (
          <div style={{ color: T.amber, fontSize: 12, marginTop: 10 }}>
            ⚠ Percentages don't need to sum to 100 — this is a slice of your total bill.
          </div>
        )}
        {waste > 25 && (
          <div style={{ color: T.red, fontSize: 12, marginTop: 10 }}>
            🔥 Waste is high — orphaned volumes, idle instances, and unused commitments are the usual suspects.
          </div>
        )}
      </div>
    </div>
  );
}

// ── AI Tutor ──────────────────────────────────────────────────────────────
function AiTutor({ ch }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const ctx = `Chapter ${ch.n}: "${ch.title}"\nTagline: ${ch.tagline}\nKey insight: ${ch.insight || ""}\nContent: ${ch.content
    .filter((b) => b.type === "p" || b.type === "insight")
    .map((b) => b.text)
    .join(" ")}`;
  const suggestions = [
    `Explain "${ch.title}" like I'm 5`,
    `Most common misconception about ${ch.title}?`,
    `How does ${ch.title} connect to real cloud systems?`,
    `Give me a concrete analogy for ${ch.title}`,
  ];
  const send = async () => {
    if (!input.trim() || loading) return;
    const um = { role: "user", content: input };
    const nm = [...msgs, um];
    setMsgs(nm); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are an expert cloud computing tutor helping someone learn cloud architecture, virtualization, networking, containers, serverless, security, reliability, and FinOps. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
          messages: nm,
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b) => b.text || "").join("") ||
        "Sorry, I couldn't generate a response. Please try again.";
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: 420 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8 }}>
        {msgs.length === 0 && (
          <div>
            <div style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>Ask anything about this chapter:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)} style={{
                  textAlign: "left", padding: "10px 14px", borderRadius: 8,
                  background: T.elevated, border: `1px solid ${T.border}`,
                  color: T.subtle, cursor: "pointer", fontSize: 13, lineHeight: 1.4,
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%", padding: "10px 14px", borderRadius: 10,
              background: m.role === "user" ? `${T.accent}22` : T.elevated,
              border: `1px solid ${m.role === "user" ? T.accent : T.border}`,
              color: T.text, fontSize: 13, lineHeight: 1.65,
            }}>
              {m.role === "assistant" && (
                <div style={{ color: T.accent, fontWeight: 700, fontSize: 10, marginBottom: 5, letterSpacing: ".08em" }}>🤖 AI TUTOR</div>
              )}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "10px 14px", borderRadius: 10, background: T.elevated,
              border: `1px solid ${T.border}`, color: T.muted, fontSize: 13,
            }}>Thinking<span style={{ animation: "blink 1s infinite" }}>...</span></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask anything about this chapter…"
          style={{
            flex: 1, background: T.elevated, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px 14px", color: T.text, fontSize: 13, outline: "none",
          }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          padding: "10px 18px", borderRadius: 8,
          background: loading || !input.trim() ? T.elevated : T.accent,
          color: loading || !input.trim() ? T.muted : "#000",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "all .2s",
        }}>Send</button>
      </div>
    </div>
  );
}

// ── Quiz ──────────────────────────────────────────────────────────────────
function QuizPane({ ch, onScore }) {
  const qs = QUIZZES[ch.n];
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(null);
  if (!qs) return (
    <div style={{ padding: "32px", textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>☁️</div>
      <div style={{ color: T.subtle, fontSize: 14, marginBottom: 8 }}>No quiz yet for this chapter.</div>
      <div style={{ color: T.muted, fontSize: 13 }}>Try the AI Tutor tab — ask it to quiz you verbally!</div>
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
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: score === qs.length ? "#34D39922" : "#FBBF2422",
          border: `1px solid ${score === qs.length ? "#34D399" : "#FBBF24"}`,
          marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: T.text, fontWeight: 700 }}>
            Score: {score}/{qs.length} {score === qs.length ? "🎉 Perfect!" : score >= qs.length / 2 ? "👍 Good!" : "📚 Keep studying!"}
          </span>
          <button onClick={reset} style={{
            padding: "6px 14px", borderRadius: 8, background: T.elevated,
            border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
          }}>Retry</button>
        </div>
      )}
      {qs.map((q, qi) => (
        <div key={qi} style={{
          marginBottom: 20, padding: "16px", borderRadius: 10, background: T.elevated,
          border: `1px solid ${revealed[qi] ? (answers[qi] === q.ans ? "#34D39944" : "#F8717144") : T.border}`,
        }}>
          <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Q{qi + 1}. {q.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {q.opts.map((opt, oi) => {
              const isSel = answers[qi] === oi;
              const isCorr = revealed[qi] && oi === q.ans;
              const isWrong = revealed[qi] && isSel && oi !== q.ans;
              return (
                <div key={oi} onClick={() => !revealed[qi] && setAnswers((a) => ({ ...a, [qi]: oi }))} style={{
                  padding: "10px 14px", borderRadius: 8,
                  background: isCorr ? "#34D39922" : isWrong ? "#F8717122" : isSel ? `${T.accent}22` : T.surface,
                  border: `1px solid ${isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.border}`,
                  cursor: revealed[qi] ? "default" : "pointer", color: T.text, fontSize: 13,
                  display: "flex", alignItems: "center", gap: 8, transition: "all .15s",
                }}>
                  <span style={{
                    color: isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.muted,
                    fontWeight: 700, fontSize: 12, flexShrink: 0,
                  }}>{isCorr ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + oi)}</span>
                  {opt}
                </div>
              );
            })}
          </div>
          {revealed[qi] && (
            <div style={{
              marginTop: 10, padding: "10px 14px", borderRadius: 8,
              background: `${T.accent}11`, border: `1px solid ${T.accent}44`,
              color: T.subtle, fontSize: 13, lineHeight: 1.6,
            }}>💡 {q.exp}</div>
          )}
        </div>
      ))}
      {!score && allAnswered && (
        <button onClick={submit} style={{
          padding: "10px 24px", borderRadius: 20, background: T.accent,
          color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
        }}>Submit Quiz</button>
      )}
      {!allAnswered && (
        <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>Answer all {qs.length} questions to submit</div>
      )}
    </div>
  );
}

// ── Block Renderer ────────────────────────────────────────────────────────
function Block({ b }) {
  if (b.type === "p") return (
    <p style={{ color: T.subtle, lineHeight: 1.75, fontSize: 14, margin: "0 0 14px" }}>{b.text}</p>
  );
  if (b.type === "insight") return (
    <div style={{
      padding: "12px 16px", borderRadius: 10, background: `${T.accent}11`,
      border: `1px solid ${T.accent}55`, margin: "14px 0", display: "flex", gap: 10,
    }}>
      <span style={{ fontSize: 16 }}>💡</span>
      <span style={{ color: T.text, fontSize: 13, lineHeight: 1.6 }}>{b.text}</span>
    </div>
  );
  if (b.type === "code") return (
    <pre style={{
      background: "#020812", border: `1px solid ${T.border}`, borderRadius: 10,
      padding: "14px 16px", overflow: "auto", fontSize: 12, color: "#7DD3FC",
      fontFamily: "'JetBrains Mono','Fira Code',monospace", lineHeight: 1.6,
      margin: "0 0 14px", whiteSpace: "pre-wrap", wordBreak: "break-all",
    }}>{b.text}</pre>
  );
  if (b.type === "table") return (
    <div style={{ overflowX: "auto", margin: "0 0 14px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>{b.head.map((h, i) => (
            <th key={i} style={{
              textAlign: "left", padding: "8px 12px", color: T.accent, fontWeight: 700,
              borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
            }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {b.rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : T.elevated }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 12px", color: j === 0 ? T.text : T.subtle,
                  borderBottom: `1px solid ${T.border}44`, lineHeight: 1.5,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  if (b.type === "stack") return (
    <div style={{ margin: "0 0 14px" }}>
      {b.rows.map(([label, desc], i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
          marginBottom: 4, borderRadius: 8, background: T.elevated,
          border: `1px solid ${T.border}`, position: "relative",
        }}>
          <div style={{
            width: 3, position: "absolute", left: 0, top: 0, bottom: 0,
            borderRadius: "8px 0 0 8px", background: `hsl(${200 + i * 20},70%,60%)`,
          }} />
          <div style={{ fontWeight: 700, color: T.text, fontSize: 13, minWidth: 180 }}>{label}</div>
          <div style={{ color: T.muted, fontSize: 12 }}>{desc}</div>
        </div>
      ))}
    </div>
  );
  return null;
}

// ── Chapter View ──────────────────────────────────────────────────────────
function ChapterView({ ch, onBack, color, read, toggleRead, notes, setNotes, onScore }) {
  const [tab, setTab] = useState("content");
  const DemoComponents = {
    stack: StackDemo,
    servicemodels: ServiceModelsDemo,
    regions: RegionsDemo,
    hypervisor: HypervisorDemo,
    instances: InstancesDemo,
    autoscaling: AutoscalingDemo,
    vpc: VPCDemo,
    cdn: CDNDemo,
    storage: StorageDemo,
    containers: ContainersDemo,
    kubernetes: KubernetesDemo,
    serverless: ServerlessDemo,
    iam: IAMDemo,
    slo: SLODemo,
    cost: CostDemo,
  };
  const DemoComponent = ch.demo ? DemoComponents[ch.demo] : null;
  const TABS = [
    { id: "content", label: "📖 Content" },
    { id: "quiz", label: "🎯 Quiz", badge: QUIZZES[ch.n]?.length },
    { id: "tutor", label: "🤖 AI Tutor" },
    { id: "notes", label: "📝 Notes" },
  ];
  return (
    <div className="curriculum-content" style={{ maxWidth: 740, margin: "0 auto", padding: "0 16px 60px" }}>
      <button onClick={onBack} style={{
        background: "transparent", border: "none", color: T.muted,
        cursor: "pointer", fontSize: 13, padding: "16px 0", marginBottom: 4,
      }}>← Back to Curriculum</button>
      <RelatedCurriculums currentId="cloud-computing" chapter={ch} />
      <div style={{
        padding: "20px 24px", borderRadius: 14, background: T.surface,
        border: `1px solid ${color}44`, marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{
              color, fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", marginBottom: 6,
            }}>Chapter {ch.n} · Part {ch.part}</div>
            <h1 style={{ color: T.text, fontSize: 22, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.3 }}>{ch.title}</h1>
            <p style={{ color: T.muted, fontSize: 14, margin: 0 }}>{ch.tagline}</p>
          </div>
          <button onClick={() => toggleRead(ch.n)} style={{
            padding: "8px 16px", borderRadius: 20,
            background: read.has(ch.n) ? `${color}22` : "transparent",
            border: `1px solid ${read.has(ch.n) ? color : T.border}`,
            color: read.has(ch.n) ? color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{read.has(ch.n) ? "✓ Read" : "Mark as Read"}</button>
        </div>
        {ch.insight && (
          <div style={{
            marginTop: 14, padding: "10px 14px", borderRadius: 8,
            background: `${color}11`, border: `1px solid ${color}44`,
            color, fontSize: 13, fontWeight: 600,
          }}>✦ {ch.insight}</div>
        )}
      </div>
      <div style={{
        display: "flex", gap: 4, marginBottom: 16, background: T.surface,
        borderRadius: 10, padding: 4, border: `1px solid ${T.border}`,
      }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 8, border: "none",
            background: tab === t.id ? T.elevated : "transparent",
            color: tab === t.id ? T.text : T.muted, cursor: "pointer",
            fontSize: 12, fontWeight: tab === t.id ? 700 : 400,
            transition: "all .15s", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 4,
          }}>
            {t.label}
            {t.badge && (
              <span style={{
                background: color, color: "#000", borderRadius: 10,
                padding: "1px 5px", fontSize: 10, fontWeight: 700,
              }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div>
        {tab === "content" && (
          <div>
            {ch.content.map((b, i) => <Block key={i} b={b} />)}
            {DemoComponent && (
              <div style={{
                padding: "20px", borderRadius: 14, background: T.surface,
                border: `1px solid ${T.border}`, marginTop: 8,
              }}>
                <div style={{
                  color: T.accent, fontWeight: 700, fontSize: 12,
                  letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14,
                }}>⚡ Interactive Demo</div>
                <DemoComponent />
              </div>
            )}
          </div>
        )}
        {tab === "quiz" && <QuizPane ch={ch} onScore={onScore} />}
        {tab === "tutor" && (
          <div style={{
            padding: "20px", borderRadius: 14, background: T.surface,
            border: `1px solid ${T.border}`,
          }}><AiTutor ch={ch} /></div>
        )}
        {tab === "notes" && (
          <div>
            <textarea value={notes[ch.n] || ""} onChange={(e) => setNotes({ ...notes, [ch.n]: e.target.value })}
              placeholder={`Your notes on "${ch.title}"…\n\nJot down key ideas, questions, or connections to other chapters.`}
              style={{
                width: "100%", minHeight: 240, background: T.surface,
                border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px",
                color: T.text, fontSize: 14, lineHeight: 1.7, outline: "none",
                resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
              }} />
            <div style={{ color: T.muted, fontSize: 12, marginTop: 8 }}>
              {(notes[ch.n] || "").length} characters · Notes are saved in this session
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Concept Map ───────────────────────────────────────────────────────────
function ConceptMap({ openChapter, read }) {
  const [hov, setHov] = useState(null);
  const W = 760, H = 520;
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 40px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>🕸️ Knowledge Graph</h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>
        All 39 chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{
          background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`,
        }}>
          <defs>
            <radialGradient id="bgC" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bgC)" rx="14" />
          {EDGES.map(([a, b], i) => {
            const pa = NODE_POS[a], pb = NODE_POS[b];
            if (!pa || !pb) return null;
            const hi = hov === a || hov === b;
            return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={hi ? T.accent : T.border} strokeWidth={hi ? 2 : 1}
              opacity={hov && !hi ? 0.15 : 0.7} />;
          })}
          {CHAPTERS.map((ch) => {
            const p = NODE_POS[ch.n];
            if (!p) return null;
            const color = PC[ch.part];
            const isH = hov === ch.n;
            const isR = read.has(ch.n);
            const r = ch.n === 0 ? 14 : isH ? 11 : 8;
            return (
              <g key={ch.n} onMouseEnter={() => setHov(ch.n)} onMouseLeave={() => setHov(null)}
                onClick={() => openChapter(ch.n)} style={{ cursor: "pointer" }}>
                {isH && <circle cx={p.x} cy={p.y} r={r + 8} fill={color} opacity={0.15} />}
                <circle cx={p.x} cy={p.y} r={r}
                  fill={isH ? color : `${color}77`} stroke={color} strokeWidth={isR ? 2.5 : 1} />
                {isR && <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">✓</text>}
                {ch.n === 0 && !isR && <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="10" fontWeight="700">0</text>}
                {isH && (
                  <g>
                    <rect x={p.x + r + 6} y={p.y - 18}
                      width={Math.min(chMap[ch.n]?.title.length * 7 + 20, 210)}
                      height={34} rx={6} fill={T.elevated} stroke={color} strokeWidth={1} />
                    <text x={p.x + r + 14} y={p.y - 5} fill={T.text} fontSize="11" fontWeight="600">
                      Ch {ch.n}: {chMap[ch.n]?.title.substring(0, 24)}{chMap[ch.n]?.title.length > 24 ? "…" : ""}
                    </text>
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
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "4px 10px",
            borderRadius: 20, background: T.elevated, border: `1px solid ${T.border}`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: PC[p.id] }} />
            <span style={{ color: T.muted, fontSize: 11 }}>{p.icon} {p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Glossary ──────────────────────────────────────────────────────────────
function GlossaryView({ openChapter }) {
  const [q, setQ] = useState("");
  const filtered = GLOSSARY.filter((g) =>
    !q || g.term.toLowerCase().includes(q.toLowerCase()) || g.def.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px 60px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>📖 Glossary</h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>{GLOSSARY.length} key terms from the curriculum</p>
      <input value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms and definitions…"
        style={{
          width: "100%", background: T.elevated, border: `1px solid ${T.border}`,
          borderRadius: 10, padding: "12px 16px", color: T.text,
          fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box",
        }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(290px,100%),1fr))", gap: 10 }}>
        {filtered.map((g) => (
          <div key={g.term} style={{
            padding: "14px 16px", borderRadius: 10, background: T.surface,
            border: `1px solid ${T.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{g.term}</span>
              {g.ch != null && (
                <button onClick={() => openChapter(g.ch)} style={{
                  background: "transparent", border: "none", color: T.accent,
                  cursor: "pointer", fontSize: 11, padding: 0, whiteSpace: "nowrap",
                }}>Ch {g.ch} →</button>
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
function Sidebar({
  view,
  setView,
  openChapter,
  selCh,
  read,
  quizScores,
  search,
  setSearch,
  mobile,
}: {
  view: string;
  setView: (value: string) => void;
  openChapter: (id: number) => void;
  selCh: number | null;
  read: Set<number>;
  quizScores: Record<number, { score: number; total: number }>;
  search: string;
  setSearch: (value: string) => void;
  mobile: boolean;
}) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5, 6]));
  const toggle = (id: number) => setExpanded((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  const totalQ = Object.values(quizScores).reduce((a, s) => a + s.score, 0);
  const maxQ = Object.values(quizScores).reduce((a, s) => a + s.total, 0);
  return (
    <div style={{
      width: mobile ? "100%" : 270,
      background: T.surface,
      borderRight: mobile ? "none" : `1px solid ${T.border}`,
      borderBottom: mobile ? `1px solid ${T.border}` : "none",
      height: mobile ? "auto" : "100vh",
      overflowY: mobile ? "visible" : "auto",
      flexShrink: 0,
      display: "flex", flexDirection: "column",
      maxHeight: mobile ? "none" : "100vh",
    }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 18 }}>☁️</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Cloud Computing</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>12 Parts · 39 Chapters</div>
      </div>
      <div style={{ padding: "8px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 4 }}>
        {[{ id: "home", icon: "🏠" }, { id: "map", icon: "🕸️" }, { id: "glossary", icon: "📖" }].map((v) => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 8, border: "none",
            background: view === v.id ? T.elevated : "transparent",
            color: view === v.id ? T.text : T.muted, cursor: "pointer", fontSize: 20,
          }}>{v.icon}</button>
        ))}
      </div>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${T.border}` }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chapters…"
          style={{
            width: "100%", background: T.elevated, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "7px 12px", color: T.text,
            fontSize: 12, outline: "none", boxSizing: "border-box",
          }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        {PARTS.map((p) => {
          const color = PC[p.id];
          const filteredChs = p.chs.filter((n) => {
            if (!search) return true;
            const ch = chMap[n];
            return ch && (ch.title.toLowerCase().includes(search.toLowerCase()) ||
              ch.tagline.toLowerCase().includes(search.toLowerCase()));
          });
          if (search && filteredChs.length === 0) return null;
          const isExp = expanded.has(p.id) || !!search;
          return (
            <div key={p.id}>
              <div onClick={() => toggle(p.id)} style={{
                padding: "7px 16px", display: "flex", alignItems: "center",
                gap: 6, cursor: "pointer", userSelect: "none",
              }}>
                <span style={{ fontSize: 13 }}>{p.icon}</span>
                <span style={{
                  color, fontWeight: 700, fontSize: 10, textTransform: "uppercase",
                  letterSpacing: ".07em", flex: 1,
                }}>{p.label}</span>
                <span style={{ color: T.muted, fontSize: 10 }}>{isExp ? "▾" : "▸"}</span>
              </div>
              {isExp && filteredChs.map((n) => {
                const ch = chMap[n];
                if (!ch) return null;
                const isSel = selCh === n && view === "chapter";
                const isRead = read.has(n);
                const hasQ = !!QUIZZES[n];
                return (
                  <div key={n} onClick={() => openChapter(n)} style={{
                    padding: "6px 16px 6px 32px", cursor: "pointer",
                    background: isSel ? `${color}18` : "transparent",
                    borderLeft: `3px solid ${isSel ? color : "transparent"}`,
                    transition: "all .15s", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        color: isSel ? color : T.text, fontSize: 12,
                        fontWeight: isSel ? 700 : 400, lineHeight: 1.3,
                      }}>Ch {n} — {ch.title}</div>
                    </div>
                    <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                      {isRead && <span style={{ color, fontSize: 10 }}>✓</span>}
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
          <div style={{
            width: `${(read.size / CHAPTERS.length) * 100}%`, height: "100%",
            background: T.accent, borderRadius: 2, transition: "width .4s",
          }} />
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
function Overview({
  setView,
  openChapter,
  read,
  quizScores,
}: {
  setView: (value: string) => void;
  openChapter: (id: number) => void;
  read: Set<number>;
  quizScores: Record<number, { score: number; total: number }>;
}) {
  const [activePath, setActivePath] = useState<number | null>(null);
  const paths = [
    { label: "Beginner Path", color: T.blue, desc: "Foundations, service models, virtualization", chs: [0, 1, 2, 3, 4, 5, 6, 7] },
    { label: "Engineer Track", color: T.green, desc: "Networking, containers, K8s, serverless", chs: [9, 10, 11, 13, 16, 17, 18, 19, 20, 21, 22] },
    { label: "Architect Route", color: T.purple, desc: "Security, reliability, cost, multi-cloud", chs: [26, 27, 28, 29, 30, 31, 32, 33, 34] },
    { label: "AI/Data Track", color: T.amber, desc: "Data lakes, cloud AI, platform engineering", chs: [23, 24, 25, 37, 38] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div className="curriculum-overview" style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <CurriculumHero eyebrow="Infrastructure path" title="Cloud Computing" description="A visual route from primitives and networks to resilient, observable platforms." icon="☁️" color="#60A5FA" secondaryColor="#34D399" parts={PARTS.length} chapters={CHAPTERS.length} terms={GLOSSARY.length} signal="Infrastructure → platform → production" nodes={["IaaS", "VPC", "API", "K8s", "SLO"]} />
      <div style={{ padding: "40px 0 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, #22D3EE0A 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          color: T.accent, fontSize: 11, fontWeight: 700, letterSpacing: ".15em",
          textTransform: "uppercase", marginBottom: 10,
        }}>Version 1.0 · 2026</div>
        {/* <h1 style={{
          fontSize: 34, fontWeight: 900, margin: "0 0 10px",
          background: "linear-gradient(135deg,#F0F6FF 30%,#22D3EE)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
        }}>Cloud Computing</h1> */}
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          <strong style={{ color: T.accent }}>12</strong> parts ·{" "}
          <strong style={{ color: T.accent }}>39</strong> chapters · From Data Centers to Planetary-Scale Platforms
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "🕸️", label: "Concept Map", action: () => setView("map") },
            { icon: "📖", label: "Glossary", action: () => setView("glossary") },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.action} style={{
              padding: "10px 20px", borderRadius: 20, background: T.elevated,
              border: `1px solid ${T.border}`, color: T.text, cursor: "pointer",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>{btn.icon} {btn.label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { n: CHAPTERS.length, label: "Chapters" },
          { n: 12, label: "Parts" },
          { n: Object.keys(QUIZZES).length, label: "Quizzes" },
          { n: GLOSSARY.length, label: "Terms" },
        ].map((s) => (
          <div key={s.label} style={{
            padding: "14px", borderRadius: 10, background: T.surface,
            border: `1px solid ${T.border}`, textAlign: "center",
          }}>
            <div style={{ color: T.accent, fontSize: 24, fontWeight: 900 }}>{s.n}</div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {recentlyRead.length > 0 && (
        <div style={{
          marginBottom: 20, padding: "16px 20px", borderRadius: 12,
          background: T.surface, border: `1px solid ${T.border}`,
        }}>
          <div style={{
            color: T.subtle, fontSize: 12, fontWeight: 700, marginBottom: 10,
            textTransform: "uppercase", letterSpacing: ".07em",
          }}>Continue where you left off</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {recentlyRead.map((n) => {
              const ch = CHAPTERS.find((c) => c.n === n);
              if (!ch) return null;
              return (
                <button key={n} onClick={() => openChapter(n)} style={{
                  padding: "8px 14px", borderRadius: 8, background: T.elevated,
                  border: `1px solid ${PC[ch.part]}44`, color: T.text,
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                }}>Ch {n}: {ch.title}</button>
              );
            })}
          </div>
        </div>
      )}
      <div style={{
        marginBottom: 24, padding: "16px 20px", borderRadius: 12,
        background: T.surface, border: `1px solid ${T.border}`,
      }}>
        <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📍 Choose a Learning Path</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          {paths.map((p, i) => (
            <div key={i} onClick={() => setActivePath(activePath === i ? null : i)} style={{
              padding: "12px 14px", borderRadius: 10,
              background: activePath === i ? `${p.color}22` : T.elevated,
              border: `2px solid ${activePath === i ? p.color : T.border}`,
              cursor: "pointer", transition: "all .2s",
            }}>
              <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.label}</div>
              <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {PARTS.map((p) => {
        const color = PC[p.id];
        const chapters = p.chs.map((n) => CHAPTERS.find((c) => c.n === n)).filter(Boolean);
        return (
          <div key={p.id} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span>{p.icon}</span>
              <span style={{
                color, fontWeight: 700, fontSize: 12, textTransform: "uppercase",
                letterSpacing: ".08em",
              }}>Part {p.id} — {p.label}</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
              {chapters.map((ch) => {
                const isRead = read.has(ch.n);
                const hi = highlighted ? highlighted.has(ch.n) : false;
                const dim = highlighted && !hi;
                const qs = quizScores[ch.n];
                return (
                  <div key={ch.n} onClick={() => openChapter(ch.n)} style={{
                    padding: "14px", borderRadius: 10,
                    background: hi ? `${color}22` : T.surface,
                    border: `1px solid ${hi ? color : dim ? "#0E1C3044" : T.border}`,
                    cursor: "pointer", opacity: dim ? 0.4 : 1,
                    transition: "all .2s", position: "relative",
                  }}>
                    <div style={{ position: "absolute", top: 8, right: 10, display: "flex", gap: 4 }}>
                      {isRead && <span style={{ color, fontSize: 12 }}>✓</span>}
                      {ch.demo && <span style={{ color: T.accent, fontSize: 10 }}>⚡</span>}
                      {QUIZZES[ch.n] && <span style={{ color: T.amber, fontSize: 10 }}>🎯</span>}
                    </div>
                    <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>Ch {ch.n}</div>
                    <div style={{
                      color: T.text, fontWeight: 700, fontSize: 13, lineHeight: 1.3,
                      marginBottom: 4, paddingRight: 28,
                    }}>{ch.title}</div>
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
  const [read, setRead] = useState<Set<number>>(new Set());
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
    s.textContent = `* { box-sizing: border-box; } body { margin:0; font-family:'Inter',system-ui,sans-serif; background:#040810; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} } input::placeholder{color:#4A6A8A;} textarea::placeholder{color:#4A6A8A;}`;
    document.head.appendChild(s);
  }, []);

  const openChapter = (n: number) => { setSelCh(n); setView("chapter"); setSearch(""); };
  const toggleRead = (n: number) => setRead((r) => {
    const s = new Set(r);
    s.has(n) ? s.delete(n) : s.add(n);
    return s;
  });
  const onScore = (n: number, score: number, total: number) => setQuizScores((q) => ({ ...q, [n]: { score, total } }));

  const ch = selCh !== null ? CHAPTERS.find((c) => c.n === selCh) : null;
  const color = ch ? PC[ch.part] : T.accent;

  return (
    <div style={{
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      minHeight: "100vh",
      height: mobile ? "auto" : "100vh",
      overflow: mobile ? "visible" : "hidden",
      background: T.bg,
      color: T.text,
    }}>
      <Sidebar view={view} setView={setView} openChapter={openChapter}
        selCh={selCh} read={read} quizScores={quizScores}
        search={search} setSearch={setSearch} mobile={mobile} />
      <div style={{ flex: 1, overflowY: mobile ? "visible" : "auto", minWidth: 0 }}>
        {view === "chapter" && ch ? (
          <ChapterView ch={ch} color={color} onBack={() => setView("home")}
            read={read} toggleRead={toggleRead} notes={notes} setNotes={setNotes} onScore={onScore} />
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