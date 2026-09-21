// @ts-nocheck
"use client";

import jsx from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { RelatedCurriculums } from "./related-curriculums";

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
  "#4ADE80",
];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Territory Map", icon: "🗺️", chs: [0] },
  { id: 1, label: "Security Foundations", icon: "🔐", chs: [1, 2, 3, 4] },
  { id: 2, label: "Cryptography", icon: "🔑", chs: [5, 6, 7, 8] },
  { id: 3, label: "Identity & Access", icon: "👤", chs: [9, 10, 11] },
  { id: 4, label: "Network Security", icon: "🌐", chs: [12, 13, 14, 15] },
  { id: 5, label: "Application Security", icon: "🛡️", chs: [16, 17, 18, 19] },
  { id: 6, label: "Cloud & Container Security", icon: "☁️", chs: [20, 21, 22] },
  { id: 7, label: "Threat Detection & Response", icon: "🚨", chs: [23, 24, 25, 26] },
  { id: 8, label: "Offensive Security", icon: "⚔️", chs: [27, 28, 29] },
  { id: 9, label: "Governance & Privacy", icon: "⚖️", chs: [30, 31, 32] },
  { id: 10, label: "Frontier", icon: "🚀", chs: [33, 34, 35, 36] },
];

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of Cybersecurity",
    tagline: "From attackers and assets to defenses and resilience",
    insight:
      "Security is not a product. It's a continuous process of managing risk against adversaries who adapt.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Cybersecurity is the practice of protecting systems, networks, data, and users from adversaries. It spans cryptography, network defense, application security, identity, detection, response, and governance — a full vertical stack.",
      },
      {
        type: "stack",
        rows: [
          ["🌍 Threat Landscape", "Nation-states, cybercriminals, insiders, hacktivists"],
          ["🎯 Assets", "Data, systems, identities, code, infrastructure, reputation"],
          ["🔑 Cryptography", "Confidentiality, integrity, authenticity, non-repudiation"],
          ["👤 Identity", "Authentication, authorization, federation, least privilege"],
          ["🌐 Network Defense", "Firewalls, segmentation, IDS/IPS, zero trust"],
          ["🛡️ Application Security", "Secure SDLC, code review, dependency hygiene"],
          ["🚨 Detection & Response", "SIEM, EDR, SOAR, incident response, forensics"],
          ["⚖️ Governance", "Risk, compliance, privacy, resilience, culture"],
        ],
      },
      {
        type: "insight",
        text: "Every control in the stack trades cost, usability, and risk. The job is not 'stop all attacks' — it's 'make attacks expensive enough that attackers go elsewhere, and recover fast when they don't.'",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "CIA Triad & Core Principles",
    tagline: "Confidentiality, Integrity, Availability — and their cousins",
    insight:
      "Every security decision can be traced back to which of confidentiality, integrity, or availability it protects.",
    demo: "cia",
    content: [
      {
        type: "p",
        text: "The CIA triad is the foundational model of security: Confidentiality (only authorized parties can read), Integrity (data is accurate and unmodified), Availability (systems work when needed). Modern practice adds authenticity, non-repudiation, and privacy.",
      },
      {
        type: "table",
        head: ["Principle", "Protects Against", "Example Controls"],
        rows: [
          ["Confidentiality", "Unauthorized disclosure", "Encryption, access control"],
          ["Integrity", "Unauthorized modification", "Hashes, signatures, audit logs"],
          ["Availability", "Denial of service", "Redundancy, DDoS protection, backups"],
          ["Authenticity", "Impersonation", "Digital signatures, MFA"],
          ["Non-repudiation", "Denial of action", "Signed transactions, audit trails"],
          ["Privacy", "Overreach, misuse", "Data minimization, consent, retention"],
        ],
      },
      {
        type: "insight",
        text: "The CIA triad is a lens, not a checklist. Different systems weight these differently: a hospital prioritizes availability; a bank prioritizes integrity; a messaging app prioritizes confidentiality.",
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Threat Modeling",
    tagline: "Think like an attacker before you build",
    insight:
      "You cannot defend what you haven't imagined. Threat modeling is structured imagination.",
    demo: "threatmodel",
    content: [
      {
        type: "p",
        text: "Threat modeling is a systematic process for identifying assets, adversaries, attack surfaces, and mitigations before code is written. STRIDE, PASTA, and attack trees are common frameworks.",
      },
      {
        type: "table",
        head: ["STRIDE", "Threat", "Property Violated"],
        rows: [
          ["S", "Spoofing", "Authenticity"],
          ["T", "Tampering", "Integrity"],
          ["R", "Repudiation", "Non-repudiation"],
          ["I", "Information disclosure", "Confidentiality"],
          ["D", "Denial of service", "Availability"],
          ["E", "Elevation of privilege", "Authorization"],
        ],
      },
      {
        type: "code",
        text: "1. Diagram the system\n2. Identify threats (STRIDE per element)\n3. Rank by risk (DREAD, CVSS, custom)\n4. Mitigate, accept, transfer, or eliminate\n5. Re-verify after changes",
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Attack Surface & Defense in Depth",
    tagline: "Layers of defense for a growing attack surface",
    insight:
      "Defense in depth assumes every layer will eventually fail. The goal is to make the failure survivable.",
    demo: "defense",
    content: [
      {
        type: "p",
        text: "The attack surface is every point where an attacker can interact with a system: APIs, web frontends, mobile apps, employees, dependencies, cloud identities, network perimeter. Defense in depth layers controls so no single failure is fatal.",
      },
      {
        type: "table",
        head: ["Layer", "Example Control"],
        rows: [
          ["Perimeter", "WAF, DDoS protection, network ACLs"],
          ["Network", "Segmentation, IDS/IPS, mTLS"],
          ["Host", "Hardening, EDR, patch management"],
          ["Application", "Input validation, authZ, secrets management"],
          ["Data", "Encryption at rest and in transit, DLP"],
          ["Identity", "MFA, least privilege, just-in-time access"],
          ["Human", "Phishing-resistant MFA, training, awareness"],
        ],
      },
      {
        type: "insight",
        text: "Zero Trust flips the perimeter model: 'never trust, always verify.' Every request is authenticated and authorized regardless of network location.",
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Risk Management",
    tagline: "Quantifying and prioritizing what to fix",
    insight:
      "You can't fix everything. Risk management is choosing what to accept, mitigate, transfer, or avoid.",
    demo: "risk",
    content: [
      {
        type: "p",
        text: "Risk = likelihood × impact. Risk management identifies, assesses, prioritizes, and treats risks. Frameworks like NIST RMF, ISO 27005, and FAIR give structure to what's otherwise guesswork.",
      },
      {
        type: "table",
        head: ["Treatment", "When to Use"],
        rows: [
          ["Mitigate", "Cost of control < expected loss"],
          ["Accept", "Low risk, high control cost"],
          ["Transfer", "Insurance, contractual shifts"],
          ["Avoid", "Cease the risky activity"],
        ],
      },
      {
        type: "code",
        text: "ALE = SLE × ARO\n\n  SLE = asset value × exposure factor\n  ARO = annualized rate of occurrence\n  ALE = annualized loss expectancy\n\nInvest if control cost < ALE reduction",
      },
    ],
  },
  {
    n: 5,
    part: 2,
    title: "Symmetric Cryptography",
    tagline: "Stream ciphers, block ciphers, and authenticated encryption",
    insight:
      "Symmetric crypto is fast — but key distribution is the hard problem.",
    demo: "symmetric",
    content: [
      {
        type: "p",
        text: "Symmetric cryptography uses the same key to encrypt and decrypt. Block ciphers (AES) process fixed-size blocks; stream ciphers (ChaCha20) XOR a keystream with plaintext. Modern practice uses AEAD modes for encryption + integrity.",
      },
      {
        type: "table",
        head: ["Algorithm", "Type", "Status"],
        rows: [
          ["AES-256-GCM", "Block + AEAD", "Recommended"],
          ["ChaCha20-Poly1305", "Stream + AEAD", "Recommended"],
          ["AES-CBC", "Block", "Legacy, avoid"],
          ["DES / 3DES", "Block", "Broken / deprecated"],
          ["RC4", "Stream", "Broken"],
        ],
      },
      {
        type: "insight",
        text: "Never use ECB mode. It leaks structure: identical plaintext blocks produce identical ciphertext blocks. Always use an authenticated mode (GCM, Poly1305) or encrypt-then-MAC.",
      },
    ],
  },
  {
    n: 6,
    part: 2,
    title: "Asymmetric Cryptography",
    tagline: "Public-key crypto — RSA, ECC, and key exchange",
    insight:
      "Asymmetric crypto solves key distribution. Symmetric crypto solves speed. Real systems use both.",
    demo: "asymmetric",
    content: [
      {
        type: "p",
        text: "Asymmetric cryptography uses a key pair: a public key for encryption or verification, and a private key for decryption or signing. RSA relies on factoring; ECC on discrete logs in elliptic curves. ECC gives equivalent security with smaller keys.",
      },
      {
        type: "table",
        head: ["Algorithm", "Use", "Notes"],
        rows: [
          ["RSA-2048/4096", "Encryption, signatures", "Slow, large keys"],
          ["ECDSA / EdDSA", "Signatures", "Small, fast, preferred"],
          ["ECDH", "Key agreement", "Perfect forward secrecy"],
          ["Post-quantum (Kyber, Dilithium)", "KEM, signatures", "NIST standards (2024+)"],
        ],
      },
      {
        type: "code",
        text: "Signing:  sig = Sign(privateKey, message)\nVerify:  Verify(publicKey, message, sig) → true/false\n\nEncryption:  c = Enc(publicKey, m)\nDecryption:  m = Dec(privateKey, c)",
      },
    ],
  },
  {
    n: 7,
    part: 2,
    title: "Hashing & Integrity",
    tagline: "One-way functions for integrity, passwords, and proofs",
    insight:
      "Hashes don't encrypt. They fingerprint. And the fingerprint must be collision-resistant.",
    demo: "hashing",
    content: [
      {
        type: "p",
        text: "Cryptographic hash functions map arbitrary input to a fixed-size digest. They're one-way (can't invert), collision-resistant (can't find two inputs with same hash), and avalanche (small change → big digest change).",
      },
      {
        type: "table",
        head: ["Algorithm", "Status"],
        rows: [
          ["SHA-256 / SHA-3", "Recommended"],
          ["SHA-1", "Deprecated (collisions)"],
          ["MD5", "Broken"],
          ["BLAKE3", "Modern, fast"],
          ["Argon2id / bcrypt / scrypt", "Password hashing"],
        ],
      },
      {
        type: "insight",
        text: "Never hash passwords with SHA-256. Use Argon2id, bcrypt, or scrypt — intentionally slow KDFs that resist GPU cracking. Add a unique salt per user to prevent rainbow tables.",
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "PKI, TLS, and Certificates",
    tagline: "Trust infrastructure for the entire internet",
    insight:
      "TLS is the most-deployed security protocol in history. It works because of a fragile, complicated trust graph.",
    demo: "tls",
    content: [
      {
        type: "p",
        text: "Public Key Infrastructure (PKI) binds public keys to identities via certificates signed by Certificate Authorities (CAs). TLS uses PKI to establish encrypted, authenticated channels between clients and servers.",
      },
      {
        type: "table",
        head: ["Concept", "Role"],
        rows: [
          ["Root CA", "Ultimate trust anchor, offline"],
          ["Intermediate CA", "Signs end-entity certs"],
          ["Leaf cert", "Server or client identity"],
          ["OCSP / CRL", "Revocation"],
          ["CT logs", "Transparency of issued certs"],
        ],
      },
      {
        type: "code",
        text: "TLS 1.3 handshake:\n1. Client Hello (supported ciphers, key share)\n2. Server Hello (chosen cipher, key share, cert)\n3. Both derive shared secret\n4. Encrypted application data\n\n1-RTT (0-RTT with resumption)",
      },
    ],
  },
  {
    n: 9,
    part: 3,
    title: "Authentication",
    tagline: "Proving you are who you claim — passwords, MFA, passkeys",
    insight:
      "Passwords are the weakest link. MFA is the single highest-leverage security control for most organizations.",
    demo: "auth",
    content: [
      {
        type: "p",
        text: "Authentication verifies identity via factors: something you know (password), something you have (phone, hardware key), something you are (biometric). MFA combines two or more.",
      },
      {
        type: "table",
        head: ["Factor", "Strength", "Weakness"],
        rows: [
          ["Password", "Low", "Phishing, reuse, cracking"],
          ["SMS OTP", "Medium", "SIM swap, phishing"],
          ["TOTP app", "High", "Phishable"],
          ["Push + number match", "High", "MFA fatigue"],
          ["FIDO2 / WebAuthn", "Very high", "Phishing-resistant"],
          ["Passkeys", "Very high", "Sync considerations"],
        ],
      },
      {
        type: "insight",
        text: "Phishing-resistant MFA (FIDO2, passkeys) is the gold standard. Anything that requires a user to type a code can be phished in real time.",
      },
    ],
  },
  {
    n: 10,
    part: 3,
    title: "Authorization & Access Control",
    tagline: "RBAC, ABAC, ReBAC — deciding what you can do",
    insight:
      "Authentication asks 'who are you?' Authorization asks 'what may you do?' The second is where breaches hide.",
    demo: "authz",
    content: [
      {
        type: "p",
        text: "Authorization enforces access policy after authentication. Common models: RBAC (roles), ABAC (attributes), ReBAC (relationships). Least privilege and just-in-time access reduce blast radius.",
      },
      {
        type: "table",
        head: ["Model", "Idea", "Strength"],
        rows: [
          ["RBAC", "Roles → permissions", "Simple, familiar"],
          ["ABAC", "Attributes + policy", "Fine-grained"],
          ["ReBAC", "Relationships (Google Zanzibar)", "Complex sharing"],
          ["MAC", "Central labels (government)", "Strict, hierarchical"],
        ],
      },
      {
        type: "insight",
        text: "Broken access control is the #1 OWASP risk. Most authorization bugs are not exotic — they're 'user A can read user B's data because we forgot to check.'",
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Federation & SSO",
    tagline: "SAML, OAuth 2.0, OIDC — identity across systems",
    insight:
      "OAuth is authorization. OIDC is authentication. Confusing them causes real-world breaches.",
    content: [
      {
        type: "p",
        text: "Federation lets users authenticate once and access many systems. SAML dominates enterprise SSO; OAuth 2.0 and OIDC dominate modern apps and APIs.",
      },
      {
        type: "table",
        head: ["Protocol", "Purpose", "Token"],
        rows: [
          ["SAML 2.0", "Enterprise SSO", "XML assertion"],
          ["OAuth 2.0", "Delegated authorization", "Access token"],
          ["OIDC", "Authentication on top of OAuth", "ID token (JWT)"],
          ["SCIM", "User provisioning", "—"],
        ],
      },
      {
        type: "insight",
        text: "Always validate the 'aud' and 'iss' claims in JWTs. A JWT signed by the wrong issuer, or intended for a different audience, is a common source of auth bypass.",
      },
    ],
  },
  {
    n: 12,
    part: 4,
    title: "Network Fundamentals for Security",
    tagline: "TCP/IP, DNS, and where attacks land",
    insight:
      "You cannot defend a network you don't understand. Protocols are the terrain.",
    content: [
      {
        type: "p",
        text: "Networks carry the traffic security operations must inspect. Understanding TCP/IP layers, DNS, HTTP, and routing is a prerequisite to detecting and blocking attacks.",
      },
      {
        type: "table",
        head: ["Layer", "Protocols", "Attacks"],
        rows: [
          ["L2", "Ethernet, ARP", "ARP spoofing, VLAN hopping"],
          ["L3", "IP, ICMP", "Spoofing, routing attacks"],
          ["L4", "TCP, UDP", "SYN flood, port scans"],
          ["L7", "HTTP, DNS, TLS", "Injection, cache poisoning, DDoS"],
        ],
      },
    ],
  },
  {
    n: 13,
    part: 4,
    title: "Firewalls & Segmentation",
    tagline: "Controlling what traffic flows where",
    insight:
      "Segmentation turns one big blast radius into many small ones.",
    demo: "firewall",
    content: [
      {
        type: "p",
        text: "Firewalls filter traffic by rule. Segmentation divides networks into zones with controlled flows. Together they limit lateral movement after a compromise.",
      },
      {
        type: "table",
        head: ["Firewall Type", "Layer", "Notes"],
        rows: [
          ["Packet filter", "L3/L4", "Fast, stateless"],
          ["Stateful", "L3/L4", "Tracks connections"],
          ["NGFW", "L7", "App-aware, IPS-integrated"],
          ["WAF", "L7 HTTP", "Protects web apps"],
          ["Cloud SG/NACL", "L3/L4", "Stateful/stateless in cloud"],
        ],
      },
    ],
  },
  {
    n: 14,
    part: 4,
    title: "IDS, IPS & Network Monitoring",
    tagline: "Seeing what's on the wire",
    insight:
      "Detection is not prevention. But without detection, you cannot respond.",
    demo: "ids",
    content: [
      {
        type: "p",
        text: "Intrusion Detection Systems (IDS) alert on suspicious traffic; Intrusion Prevention Systems (IPS) block it inline. Both rely on signatures, anomalies, or both. Network monitoring (Zeek, Suricata) feeds SIEM and analytics.",
      },
      {
        type: "table",
        head: ["Detection Method", "Strengths", "Weaknesses"],
        rows: [
          ["Signature", "Low false positives", "Misses novel attacks"],
          ["Anomaly", "Detects new patterns", "High false positives"],
          ["Behavioral", "Catches TTPs", "Requires baselines"],
          ["Threat intel", "IOCs", "Rapidly stale"],
        ],
      },
    ],
  },
  {
    n: 15,
    part: 4,
    title: "Zero Trust Architecture",
    tagline: "Never trust, always verify",
    insight:
      "Zero Trust assumes the network is hostile. Identity is the new perimeter.",
    demo: "zerotrust",
    content: [
      {
        type: "p",
        text: "Zero Trust abandons implicit network trust. Every request — from inside or outside — is authenticated, authorized, and continuously evaluated. VPNs are replaced by identity-aware access.",
      },
      {
        type: "table",
        head: ["Pillar", "What It Means"],
        rows: [
          ["Identity", "Strong auth, continuous verification"],
          ["Devices", "Posture checks, EDR required"],
          ["Network", "Microsegmentation"],
          ["Applications", "Per-request authorization"],
          ["Data", "Classification + encryption"],
        ],
      },
      {
        type: "insight",
        text: "Zero Trust is a journey, not a product. Start with identity: strong MFA, least privilege, and eliminating standing access.",
      },
    ],
  },
  {
    n: 16,
    part: 5,
    title: "OWASP Top 10",
    tagline: "The most common web application risks",
    insight:
      "Most breaches exploit known, boring bugs. The OWASP Top 10 is a checklist of exactly those bugs.",
    demo: "owasp",
    content: [
      {
        type: "p",
        text: "The OWASP Top 10 is the canonical list of web application security risks. It evolves slowly, but the core themes — broken access control, injection, misconfiguration — persist for decades.",
      },
      {
        type: "table",
        head: ["Rank", "Risk"],
        rows: [
          ["A01", "Broken Access Control"],
          ["A02", "Cryptographic Failures"],
          ["A03", "Injection (SQL, NoSQL, OS, LDAP)"],
          ["A04", "Insecure Design"],
          ["A05", "Security Misconfiguration"],
          ["A06", "Vulnerable & Outdated Components"],
          ["A07", "Identification & Authentication Failures"],
          ["A08", "Software & Data Integrity Failures"],
          ["A09", "Logging & Monitoring Failures"],
          ["A10", "Server-Side Request Forgery (SSRF)"],
        ],
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "Injection Attacks",
    tagline: "SQL, command, XSS, and the many faces of injection",
    insight:
      "Injection happens when untrusted data is interpreted as code. The fix is always: separate data from code.",
    demo: "injection",
    content: [
      {
        type: "p",
        text: "Injection flaws occur when an application sends untrusted data to an interpreter. Parameterization, output encoding, and safe APIs are the defenses.",
      },
      {
        type: "code",
        text: "VULNERABLE:\n  query = \"SELECT * FROM users WHERE name='\" + name + \"'\"\n\nSAFE:\n  cursor.execute(\"SELECT * FROM users WHERE name = ?\", (name,))",
      },
      {
        type: "table",
        head: ["Injection Type", "Defense"],
        rows: [
          ["SQL", "Parameterized queries"],
          ["OS command", "Avoid shell; use execve-style APIs"],
          ["LDAP", "Escaping + allowlist"],
          ["XSS", "Context-aware output encoding + CSP"],
          ["Template", "Auto-escaping templates"],
        ],
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Secure Development Lifecycle",
    tagline: "Building security in, not bolting it on",
    insight:
      "The cheapest security bug is the one you prevent at design time.",
    content: [
      {
        type: "p",
        text: "SSDLC integrates security at every phase: requirements, design, implementation, testing, deployment, and operations. Threat modeling, secure code review, SAST/DAST, and dependency scanning are core.",
      },
      {
        type: "table",
        head: ["Phase", "Activity"],
        rows: [
          ["Requirements", "Security requirements, abuse cases"],
          ["Design", "Threat modeling, architecture review"],
          ["Implementation", "Secure coding, code review"],
          ["Testing", "SAST, DAST, SCA, fuzzing"],
          ["Deployment", "Secrets, hardened base images, IaC scanning"],
          ["Operations", "Monitoring, patching, response"],
        ],
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "Supply Chain Security",
    tagline: "You are what your dependencies are",
    insight:
      "Modern software is 80%+ third-party code. The attack surface extends to every maintainer upstream.",
    demo: "supplychain",
    content: [
      {
        type: "p",
        text: "Supply chain attacks compromise software via dependencies, build systems, or maintainers. SBOMs, provenance, and signed artifacts are the defenses.",
      },
      {
        type: "table",
        head: ["Vector", "Example", "Defense"],
        rows: [
          ["Dependency hijack", "event-stream", "Lockfiles, allowlists"],
          ["Typosquatting", "crossenv", "Review + tools"],
          ["Build system", "SolarWinds", "Provenance, signing"],
          ["Container base", "Log4Shell", "SCA, base image scanning"],
          ["Maintainer compromise", "xz-utils", "Trust but verify"],
        ],
      },
      {
        type: "insight",
        text: "SLSA and Sigstore are bringing supply chain integrity to mainstream. Provenance attestations tell you what built your artifact, from what source, under what conditions.",
      },
    ],
  },
  {
    n: 20,
    part: 6,
    title: "Cloud Security Fundamentals",
    tagline: "Shared responsibility, IAM, and the new perimeter",
    insight:
      "Cloud doesn't remove security — it moves it into configuration and identity.",
    demo: "cloudsec",
    content: [
      {
        type: "p",
        text: "Cloud security is dominated by IAM, configuration, and data protection. The shared responsibility model splits duties: the provider secures the cloud; you secure what's in it.",
      },
      {
        type: "table",
        head: ["Domain", "Top Risks"],
        rows: [
          ["IAM", "Overpermissive roles, stale keys"],
          ["Storage", "Public buckets, unencrypted"],
          ["Network", "Open security groups, egress"],
          ["Compute", "Unpatched images, exposed metadata"],
          ["Logging", "Missing CloudTrail / audit"],
        ],
      },
      {
        type: "insight",
        text: "The metadata service is a classic cloud attack surface. SSRF + IMDS = stolen cloud credentials. Enforce IMDSv2 and least-privilege instance roles.",
      },
    ],
  },
  {
    n: 21,
    part: 6,
    title: "Container & Kubernetes Security",
    tagline: "Hardening the layers of the cloud-native stack",
    insight:
      "Containers share a kernel. A single escape can compromise the whole node.",
    demo: "k8ssec",
    content: [
      {
        type: "p",
        text: "Container security spans image, runtime, and orchestration layers. Kubernetes adds RBAC, network policies, admission control, and secrets management as critical controls.",
      },
      {
        type: "table",
        head: ["Layer", "Controls"],
        rows: [
          ["Image", "Minimal base, scan, sign, SBOM"],
          ["Runtime", "Read-only rootfs, drop caps, seccomp"],
          ["Orchestration", "RBAC, NetworkPolicy, PSA/PSS"],
          ["Secrets", "External secrets, encryption at rest"],
          ["Admission", "OPA/Gatekeeper, Kyverno"],
        ],
      },
    ],
  },
  {
    n: 22,
    part: 6,
    title: "Secrets Management",
    tagline: "Getting keys out of code, config, and Git",
    insight:
      "Secrets in Git are forever. Rotation, not deletion, is the only real fix.",
    demo: "secrets",
    content: [
      {
        type: "p",
        text: "Secrets (API keys, passwords, tokens) are a top cause of breaches. Best practice: keep them out of code, store them in a vault, rotate them automatically, and prefer short-lived credentials.",
      },
      {
        type: "table",
        head: ["Approach", "Notes"],
        rows: [
          ["Env vars", "Better than files; still visible to processes"],
          ["Vault (HashiCorp, AWS SM)", "Central, audited, dynamic secrets"],
          ["Workload identity (OIDC)", "Short-lived, no stored secrets"],
          ["Sealed secrets", "Safe in Git, decrypted in cluster"],
          ["Hardware (HSM, TPM)", "Strongest, expensive"],
        ],
      },
    ],
  },
  {
    n: 23,
    part: 7,
    title: "SIEM, Logging & Detection",
    tagline: "Collecting, normalizing, and detecting from telemetry",
    insight:
      "Detection is a data problem: without logs, there is no signal.",
    demo: "siem",
    content: [
      {
        type: "p",
        text: "SIEMs aggregate logs from endpoints, networks, cloud, and apps, normalize them into a common schema, correlate events, and fire alerts. Detection engineering writes and maintains the rules.",
      },
      {
        type: "table",
        head: ["Data Source", "Signal"],
        rows: [
          ["EDR", "Process execution, memory"],
          ["Cloud audit", "API calls, IAM changes"],
          ["Network", "Connections, DNS"],
          ["Identity", "Logins, MFA events"],
          ["Application", "Business logic, authZ"],
        ],
      },
      {
        type: "insight",
        text: "Alert fatigue is real. Tune ruthlessly: high-fidelity detections beat high-volume ones. Every unactioned alert is a failed control.",
      },
    ],
  },
  {
    n: 24,
    part: 7,
    title: "Incident Response",
    tagline: "From detection to containment to recovery",
    insight:
      "Every organization will be breached. The difference is how fast and how well they respond.",
    demo: "ir",
    content: [
      {
        type: "p",
        text: "Incident Response (IR) is a structured process for handling security incidents: preparation, identification, containment, eradication, recovery, and lessons learned. NIST SP 800-61 is the canonical framework.",
      },
      {
        type: "table",
        head: ["Phase", "Goal"],
        rows: [
          ["Preparation", "Playbooks, tooling, training"],
          ["Identification", "Detect and triage"],
          ["Containment", "Stop the bleeding"],
          ["Eradication", "Remove adversary"],
          ["Recovery", "Restore safely"],
          ["Post-incident", "Learn and improve"],
        ],
      },
      {
        type: "insight",
        text: "Tabletop exercises are the cheapest way to find gaps. Assume breach and rehearse: who calls whom? Who has authority to shut down production?",
      },
    ],
  },
  {
    n: 25,
    part: 7,
    title: "Digital Forensics",
    tagline: "Evidence, chain of custody, and reconstructing events",
    insight:
      "Forensics is about answering: what happened, how, when, and who — with evidence that survives scrutiny.",
    content: [
      {
        type: "p",
        text: "Digital forensics collects, preserves, and analyzes digital evidence. Volatile data first (memory, connections), then disk, then archives. Chain of custody is non-negotiable if legal action is possible.",
      },
      {
        type: "table",
        head: ["Order of Volatility", "Examples"],
        rows: [
          ["1. CPU / registers", "Runtime state"],
          ["2. Memory", "RAM dumps"],
          ["3. Network state", "Connections, ARP"],
          ["4. Disk", "Filesystems, logs"],
          ["5. Backups / archives", "Cold storage"],
        ],
      },
    ],
  },
  {
    n: 26,
    part: 7,
    title: "Threat Intelligence & Hunting",
    tagline: "Proactively finding what your tools missed",
    insight:
      "Threat hunting assumes compromise. The hunt is the search for evidence.",
    demo: "hunting",
    content: [
      {
        type: "p",
        text: "Threat intelligence informs defense: IOCs (indicators), TTPs (tactics, techniques, procedures), and strategic context. Threat hunting proactively searches for adversaries using hypotheses grounded in ATT&CK.",
      },
      {
        type: "table",
        head: ["Intel Type", "Example"],
        rows: [
          ["Strategic", "Nation-state targeting a sector"],
          ["Operational", "Campaign, actor"],
          ["Tactical", "TTPs (ATT&CK techniques)"],
          ["Technical", "IPs, hashes, domains"],
        ],
      },
      {
        type: "insight",
        text: "MITRE ATT&CK is the common vocabulary for adversary behavior. Map detections to techniques to find coverage gaps.",
      },
    ],
  },
  {
    n: 27,
    part: 8,
    title: "Penetration Testing",
    tagline: "Ethical hacking under scope and rules of engagement",
    insight:
      "The value of a pentest is not the report. It's the insight the org can act on.",
    demo: "pentest",
    content: [
      {
        type: "p",
        text: "Penetration testing simulates an attacker against a defined scope. Rules of engagement define what's allowed, timing, escalation, and legal protections. Methodologies: PTES, OWASP WSTG, MITRE ATT&CK.",
      },
      {
        type: "table",
        head: ["Type", "Knowledge"],
        rows: [
          ["Black box", "No prior info"],
          ["Grey box", "Partial info"],
          ["White box", "Full info"],
          ["Red team", "Adversary emulation, detection evals"],
          ["Purple team", "Collaborative with blue"],
        ],
      },
    ],
  },
  {
    n: 28,
    part: 8,
    title: "Exploitation & Post-Exploitation",
    tagline: "What happens after initial access",
    insight:
      "Initial access is easy. Persistence, escalation, and lateral movement are what defenders must catch.",
    demo: "postex",
    content: [
      {
        type: "p",
        text: "Post-exploitation includes privilege escalation, persistence, credential harvesting, lateral movement, and exfiltration. Understanding these stages is essential to detection engineering.",
      },
      {
        type: "table",
        head: ["Stage", "Defender Focus"],
        rows: [
          ["Privilege escalation", "EDR, patch hygiene"],
          ["Persistence", "Autoruns, scheduled tasks, service creation"],
          ["Credential access", "LSASS, Kerberos, cloud tokens"],
          ["Lateral movement", "Network segmentation, identity"],
          ["Exfiltration", "Egress monitoring, DLP"],
        ],
      },
    ],
  },
  {
    n: 29,
    part: 8,
    title: "Vulnerability Management",
    tagline: "Find, prioritize, fix — at scale",
    insight:
      "You will never patch everything. You must prioritize what actually matters.",
    demo: "vulnmgmt",
    content: [
      {
        type: "p",
        text: "Vulnerability management is a continuous cycle: inventory, scan, prioritize, remediate, verify. CVSS gives base severity; EPSS gives exploitation likelihood; KEV lists confirm active exploitation.",
      },
      {
        type: "table",
        head: ["Metric", "What It Tells You"],
        rows: [
          ["CVSS", "Intrinsic severity"],
          ["EPSS", "Probability of exploitation"],
          ["KEV", "Confirmed exploited in the wild"],
          ["Asset criticality", "Business impact"],
        ],
      },
      {
        type: "insight",
        text: "Prioritize CVSS × EPSS × asset criticality. A high CVSS on an internet-facing, actively exploited service beats 100 low-CVSS findings on internal dev machines.",
      },
    ],
  },
  {
    n: 30,
    part: 9,
    title: "Governance, Risk & Compliance",
    tagline: "Frameworks, audits, and the language of assurance",
    insight:
      "Compliance is not security. But it forces the discipline that security requires.",
    content: [
      {
        type: "p",
        text: "Governance defines who decides what. Risk management quantifies and prioritizes. Compliance demonstrates that controls meet a standard: ISO 27001, SOC 2, NIST CSF, PCI DSS, HIPAA, GDPR.",
      },
      {
        type: "table",
        head: ["Framework", "Scope"],
        rows: [
          ["NIST CSF", "Voluntary, function-based"],
          ["ISO 27001", "International ISMS"],
          ["SOC 2", "Trust services (SaaS)"],
          ["PCI DSS", "Cardholder data"],
          ["HIPAA", "Healthcare data (US)"],
          ["GDPR / CCPA", "Privacy (EU / CA)"],
        ],
      },
    ],
  },
  {
    n: 31,
    part: 9,
    title: "Privacy & Data Protection",
    tagline: "Protecting people, not just data",
    insight:
      "Privacy is about power and consent. Security is a prerequisite, not a substitute.",
    demo: "privacy",
    content: [
      {
        type: "p",
        text: "Privacy engineering applies data minimization, purpose limitation, consent, retention, and subject rights. GDPR, CCPA, and emerging laws make privacy a compliance and product concern.",
      },
      {
        type: "table",
        head: ["Principle", "Practice"],
        rows: [
          ["Minimization", "Collect only what's needed"],
          ["Purpose limitation", "Use only for stated purposes"],
          ["Consent", "Explicit, informed, revocable"],
          ["Retention", "Delete when no longer needed"],
          ["Subject rights", "Access, correct, delete, port"],
          ["Privacy by design", "Bake into architecture"],
        ],
      },
    ],
  },
  {
    n: 32,
    part: 9,
    title: "Security Culture & Human Factors",
    tagline: "The human is not the weakest link — the system is",
    insight:
      "Blaming users for phishing misses the point. Design systems that make the safe path the easy path.",
    content: [
      {
        type: "p",
        text: "Most breaches involve a human action. Security culture, usable security, and phishing-resistant controls reduce reliance on user vigilance. Awareness training is necessary but not sufficient.",
      },
      {
        type: "table",
        head: ["Lever", "Example"],
        rows: [
          ["Usable security", "SSO, password managers, passkeys"],
          ["Friction reduction", "One-click reporting"],
          ["Non-punitive reporting", "Encourage disclosure"],
          ["Role-based training", "Engineering, finance, exec"],
          ["Simulation", "Realistic, educational"],
        ],
      },
    ],
  },
  {
    n: 33,
    part: 10,
    title: "AI in Security",
    tagline: "Defenders and attackers both get new tools",
    insight:
      "AI is not a silver bullet. It shifts the economics of detection, triage, and offense.",
    demo: "aisec",
    content: [
      {
        type: "p",
        text: "AI is reshaping security: better anomaly detection, faster triage, automated response, and — on the other side — synthetic phishing, deepfakes, and automated exploit discovery.",
      },
      {
        type: "table",
        head: ["Defensive Use", "Offensive Use"],
        rows: [
          ["Anomaly detection", "Polymorphic malware"],
          ["Alert triage", "Spear phishing at scale"],
          ["Code review assistants", "Vulnerability discovery"],
          ["Threat intel summarization", "Deepfake social engineering"],
          ["Automated response", "Automated recon"],
        ],
      },
    ],
  },
  {
    n: 34,
    part: 10,
    title: "Post-Quantum Cryptography",
    tagline: "Preparing for the day RSA and ECC fall",
    insight:
      "Harvest now, decrypt later is already happening. Quantum readiness starts today.",
    content: [
      {
        type: "p",
        text: "Quantum computers will eventually break RSA and ECC. NIST standardized post-quantum algorithms in 2024 (Kyber, Dilithium, Falcon, SPHINCS+). Migration is a decade-long project — start with crypto-agility.",
      },
      {
        type: "table",
        head: ["Category", "Algorithm"],
        rows: [
          ["Key encapsulation", "ML-KEM (Kyber)"],
          ["Signatures", "ML-DSA (Dilithium)"],
          ["Signatures (small)", "Falcon"],
          ["Hash-based signatures", "SPHINCS+"],
        ],
      },
    ],
  },
  {
    n: 35,
    part: 10,
    title: "Security Engineering at Scale",
    tagline: "Automation, platform security, and default-secure",
    insight:
      "At scale, security is not a review gate. It's a platform property.",
    content: [
      {
        type: "p",
        text: "Mature organizations embed security into platforms: secure defaults, paved roads, policy as code, and automated controls. Security teams shift from gatekeepers to enablers.",
      },
      {
        type: "table",
        head: ["Practice", "Enables"],
        rows: [
          ["Policy as code", "Consistent enforcement"],
          ["Secure by default", "Eliminates easy misconfig"],
          ["Paved roads", "Fast, safe choices"],
          ["Continuous compliance", "Evidence on demand"],
          ["Detection as code", "Versioned, tested detections"],
        ],
      },
    ],
  },
  {
    n: 36,
    part: 10,
    title: "The Security Frontier",
    tagline: "Where the field is heading",
    insight:
      "Security is becoming more automated, more identity-centric, and more entangled with AI.",
    content: [
      {
        type: "table",
        head: ["Frontier", "Description", "Status"],
        rows: [
          ["AI-driven SOC", "LLM triage, automated hunts", "Rapidly maturing"],
          ["Post-quantum migration", "Crypto agility at scale", "Active"],
          ["Passwordless everywhere", "Passkeys, FIDO2", "Mainstream push"],
          ["Confidential computing", "Encrypted-in-use workloads", "Maturing"],
          ["Cyber resilience mandates", "Regulatory minimums", "Growing"],
          ["Autonomous defense", "Self-healing, self-patching", "Research to early"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: AI + identity + cryptography + automation + resilience. Security is becoming a systems discipline with a bigger role for engineering and a smaller role for manual review.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes cybersecurity?",
      opts: [
        "Buying the right security products",
        "A continuous process of managing risk against adversaries who adapt",
        "Writing unhackable code",
        "A compliance checkbox",
      ],
      ans: 1,
      exp: "Security is a process, not a product. Attackers adapt, so defenses must too. The goal is not perfection but making attacks expensive and surviving the ones that land.",
    },
    {
      q: "Why does the security stack have multiple layers?",
      opts: [
        "Vendors require it",
        "Every layer will eventually fail, so defense in depth makes failures survivable",
        "It's cheaper",
        "Compliance demands it",
      ],
      ans: 1,
      exp: "Defense in depth assumes every control can be bypassed. The point is not to prevent all attacks but to ensure no single failure is fatal.",
    },
  ],
  1: [
    {
      q: "What does the CIA triad stand for?",
      opts: [
        "Central Intelligence Agency",
        "Confidentiality, Integrity, Availability",
        "Cryptography, Identity, Access",
        "Containment, Isolation, Audit",
      ],
      ans: 1,
      exp: "Confidentiality (only authorized parties read), Integrity (data not tampered), Availability (systems work when needed). These are the three foundational properties of security.",
    },
    {
      q: "Which CIA property is most critical for a hospital's life support system?",
      opts: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
      ans: 2,
      exp: "Life-critical systems prioritize availability — if it's down, people die. Banks prioritize integrity; messaging apps prioritize confidentiality. The right weighting depends on context.",
    },
  ],
  5: [
    {
      q: "Why should ECB mode never be used?",
      opts: [
        "It's too slow",
        "Identical plaintext blocks produce identical ciphertext blocks, leaking structure",
        "It requires too much memory",
        "It's not standardized",
      ],
      ans: 1,
      exp: "ECB encrypts each block independently, so patterns in the plaintext show through in the ciphertext (the famous ECB penguin). Always use an AEAD mode like GCM or ChaCha20-Poly1305.",
    },
    {
      q: "What is authenticated encryption (AEAD)?",
      opts: [
        "Encryption that requires a password",
        "Encryption that also provides integrity and authenticity",
        "Encryption with two keys",
        "Encryption for authentication systems only",
      ],
      ans: 1,
      exp: "AEAD (Authenticated Encryption with Associated Data) combines confidentiality with integrity and authenticity, preventing tampering. GCM and ChaCha20-Poly1305 are the modern defaults.",
    },
  ],
  7: [
    {
      q: "Why not use SHA-256 for password hashing?",
      opts: [
        "It's not secure enough",
        "It's too fast — GPUs can compute billions per second, enabling cracking",
        "It's not standardized",
        "It leaks the password length",
      ],
      ans: 1,
      exp: "Fast hashes are terrible for passwords. Use intentionally slow KDFs (Argon2id, bcrypt, scrypt) with a unique salt per user. Slow = expensive to crack at scale.",
    },
    {
      q: "What is a cryptographic hash function's key property?",
      opts: [
        "It's reversible with the right key",
        "It's one-way and collision-resistant",
        "It's symmetric",
        "It requires a salt",
      ],
      ans: 1,
      exp: "A cryptographic hash is one-way (can't invert) and collision-resistant (can't find two inputs with the same output). Small input changes produce large, unpredictable output changes (avalanche).",
    },
  ],
  9: [
    {
      q: "Which MFA is considered phishing-resistant?",
      opts: ["SMS codes", "TOTP apps", "Push notifications", "FIDO2 / WebAuthn"],
      ans: 3,
      exp: "Only FIDO2 / WebAuthn (and passkeys) are phishing-resistant — the credential is bound to the origin, so it can't be replayed on a fake site. SMS, TOTP, and push are all phishable in real time.",
    },
    {
      q: "What is the difference between authentication and authorization?",
      opts: [
        "They are the same thing",
        "Authentication verifies identity; authorization determines what you can do",
        "Authorization verifies identity; authentication determines what you can do",
        "Both are only used for APIs",
      ],
      ans: 1,
      exp: "Authentication: 'who are you?' Authorization: 'what may you do?' Most breaches are authorization bugs — a valid user accessing data they shouldn't.",
    },
  ],
  16: [
    {
      q: "What is the #1 risk in the OWASP Top 10?",
      opts: ["Injection", "Broken Access Control", "Cryptographic Failures", "SSRF"],
      ans: 1,
      exp: "Broken Access Control consistently ranks #1. It's the failure to enforce 'who can access what' — allowing user A to read user B's data. It's boring, common, and devastating.",
    },
    {
      q: "Which class of vulnerability does parameterized SQL prevent?",
      opts: ["XSS", "SQL injection", "CSRF", "SSRF"],
      ans: 1,
      exp: "Parameterized queries separate data from SQL code — the database treats user input as data, never executable syntax. It's the definitive defense against SQL injection.",
    },
  ],
  20: [
    {
      q: "In the shared responsibility model, who secures the data in your S3 bucket?",
      opts: [
        "The cloud provider",
        "You — the customer",
        "Shared equally",
        "Whoever wrote the SDK",
      ],
      ans: 1,
      exp: "The provider secures the cloud (physical, hypervisor, managed service infrastructure). The customer secures what's IN the cloud: data, configurations, IAM, encryption, access policy.",
    },
    {
      q: "What is IMDS and why does it matter for cloud security?",
      opts: [
        "A cloud billing service",
        "The instance metadata service — a classic target for SSRF to steal credentials",
        "A monitoring tool",
        "A type of IAM role",
      ],
      ans: 1,
      exp: "IMDS (Instance Metadata Service) exposes instance credentials to the VM. SSRF can be chained with IMDS to steal cloud role credentials. Enforce IMDSv2 and least-privilege roles.",
    },
  ],
  23: [
    {
      q: "What does SIEM stand for?",
      opts: [
        "Security Intelligence Event Modeling",
        "Security Information and Event Management",
        "System Incident Escalation Monitor",
        "Secure Integration for Enterprise Management",
      ],
      ans: 1,
      exp: "SIEM aggregates logs from across the environment, normalizes them, correlates events, and fires alerts. Detection engineering writes and tunes the rules that power it.",
    },
    {
      q: "What is alert fatigue?",
      opts: [
        "When systems are too slow",
        "When analysts are overwhelmed by low-fidelity alerts and start ignoring them",
        "When alerts are too rare",
        "When monitoring is disabled",
      ],
      ans: 1,
      exp: "High-volume, low-signal alerts cause analysts to miss real incidents. Tune ruthlessly: every unactioned alert is a failed control. High fidelity beats high volume.",
    },
  ],
  24: [
    {
      q: "What is the correct order of IR phases (NIST)?",
      opts: [
        "Contain → Detect → Recover → Eradicate",
        "Preparation → Identification → Containment → Eradication → Recovery → Lessons",
        "Detect → Respond → Rebuild",
        "Contain → Erase → Resume",
      ],
      ans: 1,
      exp: "NIST SP 800-61: Preparation, Identification, Containment, Eradication, Recovery, and Post-Incident (Lessons Learned). Tabletop exercises rehearse this before it matters.",
    },
    {
      q: "Why assume breach?",
      opts: [
        "To be pessimistic",
        "Because it's realistic — attackers often stay hidden for weeks or months; assume they're in and hunt for evidence",
        "To avoid compliance",
        "Because detection tools don't work",
      ],
      ans: 1,
      exp: "Dwell time (attacker presence before detection) is often measured in weeks. Assuming breach drives proactive hunting, faster response, and better containment rather than reactive scrambling.",
    },
  ],
  27: [
    {
      q: "What is the value of a penetration test?",
      opts: [
        "Getting a compliance checkbox",
        "Acting on the insight the report provides",
        "Proving your system is secure",
        "Chasing a 100% finding rate",
      ],
      ans: 1,
      exp: "A pentest is not the report — it's the insight that lets the org prioritize and improve. A pentest that finds nothing might mean strong defenses, or it might mean poor scope.",
    },
    {
      q: "What is a red team?",
      opts: [
        "A team focused on defense",
        "A team that emulates a real adversary, often including detection evasion",
        "A team that trains users",
        "A team that manages firewalls",
      ],
      ans: 1,
      exp: "Red teams emulate real adversaries — not just exploits, but realistic TTPs, social engineering, and detection evasion. Their value is testing people, process, and technology together.",
    },
  ],
  33: [
    {
      q: "How is AI changing defense and offense?",
      opts: [
        "It's making everything more secure",
        "It gives defenders faster detection and triage, and attackers scaled phishing, deepfakes, and recon",
        "It's not relevant to security",
        "Only offense benefits",
      ],
      ans: 1,
      exp: "AI amplifies both sides. Defense gets better anomaly detection, triage, and code review; offense gets polymorphic malware, synthetic phishing, and automated vulnerability discovery. The economics of both attack and defense are shifting.",
    },
    {
      q: "What is a deepfake threat to a security team?",
      opts: [
        "A broken camera",
        "Synthetic audio/video used in social engineering (e.g., executive impersonation)",
        "A type of malware",
        "A firewall bypass",
      ],
      ans: 1,
      exp: "Deepfakes allow convincing impersonation of executives or colleagues, often combined with urgency to bypass controls. Defense: out-of-band verification, strong MFA, and training.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "ABAC", def: "Attribute-Based Access Control. Authorization based on attributes of subject, resource, action, and environment.", ch: 10 },
  { term: "AEAD", def: "Authenticated Encryption with Associated Data. Encryption that also provides integrity and authenticity. GCM, ChaCha20-Poly1305.", ch: 5 },
  { term: "Argon2id", def: "Modern password hashing function. Memory-hard, GPU-resistant. Recommended KDF for passwords.", ch: 7 },
  { term: "ATT&CK", def: "MITRE's knowledge base of adversary tactics, techniques, and procedures. Common vocabulary for detection coverage.", ch: 26 },
  { term: "CIA Triad", def: "Confidentiality, Integrity, Availability. The foundational model of security properties.", ch: 1 },
  { term: "CVSS", def: "Common Vulnerability Scoring System. A base severity score for vulnerabilities — necessary but insufficient for prioritization.", ch: 29 },
  { term: "Defense in Depth", def: "Layered controls that assume each layer will eventually fail. Makes single failures survivable.", ch: 3 },
  { term: "DREAD", def: "Damage, Reproducibility, Exploitability, Affected users, Discoverability. A risk ranking model for threats.", ch: 2 },
  { term: "EDR", def: "Endpoint Detection and Response. Agent-based telemetry and detection on hosts.", ch: 23 },
  { term: "EPSS", def: "Exploit Prediction Scoring System. Probability that a vulnerability will be exploited in the wild.", ch: 29 },
  { term: "FIDO2", def: "Phishing-resistant authentication standard using WebAuthn and hardware or platform authenticators.", ch: 9 },
  { term: "GDPR", def: "EU General Data Protection Regulation. Privacy law with global reach, governing personal data of EU residents.", ch: 31 },
  { term: "Hashing", def: "A one-way function producing a fixed-size digest. Used for integrity, password storage, and signatures — not encryption.", ch: 7 },
  { term: "IMDS", def: "Instance Metadata Service. Cloud VM metadata endpoint. A common SSRF target for credential theft.", ch: 20 },
  { term: "Incident Response", def: "Structured handling of security incidents: preparation, identification, containment, eradication, recovery, lessons learned.", ch: 24 },
  { term: "Injection", def: "Vulnerability class where untrusted data is interpreted as code. SQL, LDAP, OS command, template, XSS.", ch: 17 },
  { term: "KEV", def: "Known Exploited Vulnerabilities. CISA list of vulnerabilities confirmed exploited in the wild.", ch: 29 },
  { term: "Kubernetes RBAC", def: "Role-based access control for the Kubernetes API. Tightly scoped roles are a critical control.", ch: 21 },
  { term: "Least Privilege", def: "Granting only the minimum permissions necessary for a task. A foundational principle across all security domains.", ch: 3 },
  { term: "MFA", def: "Multi-Factor Authentication. Combining two or more factors (know, have, are). Prefer phishing-resistant variants.", ch: 9 },
  { term: "NIST CSF", def: "NIST Cybersecurity Framework. A voluntary framework organizing security into identify, protect, detect, respond, recover.", ch: 30 },
  { term: "OWASP Top 10", def: "Canonical list of web application security risks, updated periodically. A baseline checklist, not a complete standard.", ch: 16 },
  { term: "PKI", def: "Public Key Infrastructure. System of CAs, certificates, and revocation that binds public keys to identities.", ch: 8 },
  { term: "Post-Quantum", def: "Cryptography designed to resist quantum attacks. NIST standardized ML-KEM, ML-DSA, Falcon, SPHINCS+ in 2024.", ch: 34 },
  { term: "RBAC", def: "Role-Based Access Control. Permissions assigned to roles; users assigned to roles.", ch: 10 },
  { term: "Red Team", def: "Adversary emulation team that tests people, process, and technology with realistic TTPs and evasion.", ch: 27 },
  { term: "ReBAC", def: "Relationship-Based Access Control. Authorization based on relationships (e.g., Google Zanzibar). Handles complex sharing.", ch: 10 },
  { term: "SBOM", def: "Software Bill of Materials. Machine-readable inventory of a software artifact's components and dependencies.", ch: 19 },
  { term: "Secrets Management", def: "Keeping credentials out of code and config; storing them in vaults; rotating and short-lifing them.", ch: 22 },
  { term: "SIEM", def: "Security Information and Event Management. Aggregates, normalizes, correlates, and alerts on security telemetry.", ch: 23 },
  { term: "SLSA", def: "Supply-chain Levels for Software Artifacts. Framework for provenance and integrity of build artifacts.", ch: 19 },
  { term: "SSRF", def: "Server-Side Request Forgery. Attacker tricks a server into making requests on their behalf, often to internal resources.", ch: 20 },
  { term: "STRIDE", def: "Threat modeling framework: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.", ch: 2 },
  { term: "Supply Chain", def: "The ecosystem of dependencies, tools, and maintainers that produce software. A growing attack surface.", ch: 19 },
  { term: "TLS 1.3", def: "Modern transport encryption. 1-RTT handshake, forward secrecy, AEAD-only ciphersuites.", ch: 8 },
  { term: "Threat Modeling", def: "Structured process to identify assets, adversaries, threats, and mitigations before building.", ch: 2 },
  { term: "Vulnerability Management", def: "Continuous cycle: inventory, scan, prioritize, remediate, verify. Prioritize by CVSS × EPSS × asset criticality.", ch: 29 },
  { term: "Zero Trust", def: "Security model that assumes no implicit trust based on network location. Every request is verified.", ch: 15 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 2], [0, 5], [0, 9], [0, 12], [0, 16], [0, 20], [0, 23], [0, 27], [0, 30], [0, 33],
  [1, 2], [1, 3], [1, 4],
  [2, 3], [2, 4], [2, 16],
  [3, 4], [3, 12], [3, 15], [3, 18],
  [4, 29], [4, 30],
  [5, 6], [5, 7], [5, 8],
  [6, 8], [6, 9], [6, 34],
  [7, 9], [7, 22], [7, 34],
  [8, 9], [8, 11], [8, 15], [8, 34],
  [9, 10], [9, 11],
  [10, 11], [10, 20], [10, 21],
  [11, 20],
  [12, 13], [12, 14], [12, 15],
  [13, 14], [13, 15], [13, 20],
  [14, 23], [14, 26],
  [15, 20], [15, 21], [15, 35],
  [16, 17], [16, 18], [16, 19],
  [17, 18],
  [18, 19], [18, 35],
  [19, 22], [19, 35],
  [20, 21], [20, 22], [20, 35],
  [21, 22], [21, 35],
  [22, 35],
  [23, 24], [23, 25], [23, 26],
  [24, 25], [24, 26], [24, 33],
  [25, 26],
  [26, 33], [26, 29],
  [27, 28], [27, 29],
  [28, 29], [28, 33],
  [29, 33], [29, 35],
  [30, 31], [30, 32],
  [31, 32], [31, 33],
  [32, 33], [32, 35],
  [33, 34], [33, 35], [33, 36],
  [34, 36],
  [35, 36],
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
    { l: "🌍 Threat Landscape", d: "Nation-states, cybercriminals, insiders", c: "#60A5FA" },
    { l: "🎯 Assets", d: "Data, systems, identities, code", c: "#818CF8" },
    { l: "🔑 Cryptography", d: "Confidentiality, integrity, authenticity", c: "#34D399" },
    { l: "👤 Identity", d: "Auth, authZ, federation, least privilege", c: "#2DD4BF" },
    { l: "🌐 Network Defense", d: "Firewalls, segmentation, IDS/IPS, zero trust", c: "#FBBF24" },
    { l: "🛡️ Application Security", d: "Secure SDLC, code review, dependencies", c: "#FB923C" },
    { l: "🚨 Detection & Response", d: "SIEM, EDR, SOAR, IR, forensics", c: "#F87171" },
    { l: "⚖️ Governance", d: "Risk, compliance, privacy, resilience", c: "#A78BFA" },
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

function CIADemo() {
  const [scenario, setScenario] = useState("bank");
  const scenarios = {
    bank: { name: "Bank", weights: { c: 3, i: 5, a: 4 }, color: T.green },
    hospital: { name: "Hospital", weights: { c: 4, i: 4, a: 5 }, color: T.blue },
    messaging: { name: "Messaging app", weights: { c: 5, i: 3, a: 3 }, color: T.purple },
    cdn: { name: "CDN", weights: { c: 2, i: 3, a: 5 }, color: T.amber },
  };
  const s = scenarios[scenario];
  const props = [
    { key: "c", label: "Confidentiality", color: T.purple },
    { key: "i", label: "Integrity", color: T.green },
    { key: "a", label: "Availability", color: T.blue },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {Object.entries(scenarios).map(([k, v]) => (
          <button key={k} onClick={() => setScenario(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${scenario === k ? v.color : T.border}`,
            background: scenario === k ? `${v.color}22` : "transparent",
            color: scenario === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${s.color}`,
      }}>
        <div style={{ color: s.color, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
          {s.name} — security priorities
        </div>
        {props.map((p) => (
          <div key={p.key} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: T.text, fontWeight: 600 }}>{p.label}</span>
              <span style={{ color: p.color, fontWeight: 700 }}>{s.weights[p.key]}/5</span>
            </div>
            <div style={{ height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${(s.weights[p.key] / 5) * 100}%`, height: "100%",
                background: p.color, borderRadius: 4, transition: "width .4s",
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Different systems weight the CIA triad differently. There is no universal priority — the right balance depends on what the business does and what it loses when each property fails.
      </div>
    </div>
  );
}

function ThreatModelDemo() {
  const [element, setElement] = useState("process");
  const elements = {
    process: { name: "Process", threats: ["Spoofing", "Tampering", "Repudiation", "Denial of service", "Elevation of privilege"] },
    datastore: { name: "Data store", threats: ["Tampering", "Information disclosure", "Repudiation", "Denial of service"] },
    flow: { name: "Data flow", threats: ["Tampering", "Information disclosure", "Denial of service"] },
    external: { name: "External entity", threats: ["Spoofing", "Repudiation"] },
  };
  const e = elements[element];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(elements).map(([k, v]) => (
          <button key={k} onClick={() => setElement(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${element === k ? T.accent : T.border}`,
            background: element === k ? `${T.accent}22` : "transparent",
            color: element === k ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
          STRIDE threats for: {e.name}
        </div>
        {e.threats.map((t, i) => (
          <div key={i} style={{
            padding: "8px 12px", borderRadius: 6, marginBottom: 4,
            background: T.elevated, border: `1px solid ${T.border}`,
            color: T.text, fontSize: 13,
          }}>
            ⚠️ {t}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        STRIDE categorizes threats per element type. Enumerate threats by element, then rank and mitigate. Attack trees and PASTA provide complementary views.
      </div>
    </div>
  );
}

function DefenseDemo() {
  const layers = [
    { name: "Perimeter", c: "#60A5FA", desc: "WAF, DDoS, ACLs" },
    { name: "Network", c: "#818CF8", desc: "Segmentation, IDS/IPS, mTLS" },
    { name: "Host", c: "#34D399", desc: "Hardening, EDR, patching" },
    { name: "Application", c: "#2DD4BF", desc: "Input validation, authZ" },
    { name: "Data", c: "#FBBF24", desc: "Encryption, DLP, backups" },
    { name: "Identity", c: "#FB923C", desc: "MFA, least privilege, JIT" },
    { name: "Human", c: "#F87171", desc: "Training, phishing-resistant MFA" },
  ];
  const [active, setActive] = useState(null);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Click a layer to see its role in defense in depth. An attacker must bypass every layer.
      </p>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {layers.map((l, i) => {
          const inset = i * 20;
          const isActive = active === i;
          return (
            <g key={i} onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer" }}>
              <rect x={40 + inset} y={20 + inset * 0.8}
                width={420 - inset * 2} height={220 - inset * 1.6}
                fill={`${l.c}${isActive ? "33" : "11"}`}
                stroke={l.c} strokeWidth={isActive ? 2.5 : 1} rx={6} opacity={isActive ? 1 : 0.7} />
            </g>
          );
        })}
        {layers.map((l, i) => (
          <text key={i} x={250} y={30 + i * 20} textAnchor="middle"
            fill={active === i ? l.c : T.text} fontSize="11" fontWeight={active === i ? 800 : 500}>
            {l.name}
          </text>
        ))}
        <text x={250} y={250} textAnchor="middle" fill={T.muted} fontSize="10">
          Asset at center
        </text>
      </svg>
      {active !== null && (
        <div style={{
          marginTop: 12, padding: "12px 16px", borderRadius: 10,
          background: T.surface, border: `1px solid ${layers[active].c}`,
        }}>
          <div style={{ color: layers[active].c, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
            {layers[active].name}
          </div>
          <div style={{ color: T.subtle, fontSize: 12 }}>{layers[active].desc}</div>
        </div>
      )}
    </div>
  );
}

function RiskDemo() {
  const [assetValue, setAssetValue] = useState(1000000);
  const [exposure, setExposure] = useState(0.4);
  const [aro, setAro] = useState(0.5);
  const sle = assetValue * exposure;
  const ale = sle * aro;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        Adjust the inputs to compute Annualized Loss Expectancy (ALE)
      </p>
      {[
        { l: "Asset value ($)", v: assetValue, set: setAssetValue, min: 10000, max: 10000000, step: 10000 },
        { l: "Exposure factor (0–1)", v: exposure, set: setExposure, min: 0, max: 1, step: 0.05 },
        { l: "Annualized rate of occurrence", v: aro, set: setAro, min: 0, max: 5, step: 0.1 },
      ].map((s) => (
        <div key={s.l} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>{s.l}</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>
              {s.l.includes("$") ? `$${s.v.toLocaleString()}` : s.v.toFixed(2)}
            </span>
          </div>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.v}
            onChange={(e) => s.set(+e.target.value)} style={{ width: "100%" }} />
        </div>
      ))}
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>Single Loss Expectancy</div>
            <div style={{ color: T.amber, fontSize: 22, fontWeight: 800 }}>
              ${sle.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>Annualized Loss Expectancy</div>
            <div style={{ color: T.red, fontSize: 22, fontWeight: 800 }}>
              ${ale.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, color: T.subtle, fontSize: 12, lineHeight: 1.6 }}>
          Justify a control if its annual cost is less than the ALE reduction it produces. This is FAIR-style quantitative risk reasoning, simplified.
        </div>
      </div>
    </div>
  );
}

function SymmetricDemo() {
  const [mode, setMode] = useState("gcm");
  const modes = {
    ecb: { name: "ECB (insecure)", color: T.red, desc: "Identical plaintext blocks → identical ciphertext. Patterns leak." },
    cbc: { name: "CBC (legacy)", color: T.amber, desc: "Chained, requires IV. Vulnerable to padding oracles if misused." },
    ctr: { name: "CTR", color: T.blue, desc: "Stream cipher. Requires unique nonce. No integrity." },
    gcm: { name: "GCM (AEAD)", color: T.green, desc: "Authenticated encryption. Default for modern systems." },
    chacha: { name: "ChaCha20-Poly1305", color: T.teal, desc: "AEAD, fast in software. Excellent for mobile and IoT." },
  };
  const m = modes[mode];
  const blocks = Array.from({ length: 8 }, (_, i) => i % 4);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(modes).map(([k, v]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            padding: "5px 12px", borderRadius: 20,
            border: `1px solid ${mode === k ? v.color : T.border}`,
            background: mode === k ? `${v.color}22` : "transparent",
            color: mode === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${m.color}`, marginBottom: 14,
      }}>
        <div style={{ color: m.color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{m.name}</div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>{m.desc}</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {blocks.map((b, i) => (
          <div key={i} style={{
            flex: 1, padding: "14px 4px", borderRadius: 6, textAlign: "center",
            background: T.elevated, border: `1px solid ${T.border}`,
            color: T.text, fontSize: 11, fontWeight: 700,
          }}>P{b}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {blocks.map((b, i) => {
          const same = mode === "ecb";
          return (
            <div key={i} style={{
              flex: 1, padding: "14px 4px", borderRadius: 6, textAlign: "center",
              background: same ? `${b === 0 ? T.red : T.border}33` : `${m.color}33`,
              border: `1px solid ${same ? T.red : m.color}`,
              color: same ? T.red : m.color, fontSize: 11, fontWeight: 700,
            }}>C{i}</div>
          );
        })}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {mode === "ecb" && "Notice the repeating ciphertext blocks — identical plaintext leaks structure. Never use ECB."}
        {mode !== "ecb" && "Ciphertext blocks are decorrelated by the mode of operation. Combined with a unique nonce/IV, patterns don't leak."}
      </div>
    </div>
  );
}

function AsymmetricDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Bob generates key pair", desc: "Bob computes public key B_pub and private key B_priv." },
    { label: "Bob publishes B_pub", desc: "Anyone can now send Bob confidential messages." },
    { label: "Alice encrypts with B_pub", desc: "c = Enc(B_pub, m). Only Bob's private key can decrypt." },
    { label: "Bob decrypts with B_priv", desc: "m = Dec(B_priv, c). Only Bob can read the message." },
    { label: "Signing (reverse)", desc: "Bob signs with B_priv; anyone verifies with B_pub. Authenticity + non-repudiation." },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 20,
            border: `1px solid ${step === i ? T.accent : T.border}`,
            background: step === i ? `${T.accent}22` : "transparent",
            color: step === i ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {s.label}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          Step {step + 1}: {steps[step].label}
        </div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{steps[step].desc}</div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Asymmetric crypto solves key distribution but is ~1000× slower than symmetric. Real systems use it only for key exchange and signatures; the bulk encryption uses symmetric keys.
      </div>
    </div>
  );
}

function HashingDemo() {
  const [input, setInput] = useState("hello");
  const pseudo = (s) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16).padStart(8, "0");
  };
  const digest = pseudo(input);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Type any input to see the "avalanche" effect — small changes, big output differences
      </p>
      <input value={input} onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%", background: T.elevated, border: `1px solid ${T.border}`,
          borderRadius: 8, padding: "10px 14px", color: T.text,
          fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box",
          fontFamily: "'JetBrains Mono', monospace",
        }} />
      <div style={{
        padding: "14px 16px", borderRadius: 10, background: "#020812",
        border: `1px solid ${T.accent}`,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>SHA-256 (simulated)</div>
        <div style={{ color: T.accent, fontSize: 14, wordBreak: "break-all" }}>
          {digest}{pseudo(input + "x")}{pseudo(input + "y")}{pseudo(input + "z")}
        </div>
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Real SHA-256 produces 64 hex characters. Change one character — the whole digest changes. This is the avalanche property.
      </div>
    </div>
  );
}

function TLSDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { from: "Client", to: "Server", label: "Client Hello", desc: "Supported ciphers, TLS version, key share, SNI." },
    { from: "Server", to: "Client", label: "Server Hello + Certificate", desc: "Chosen cipher, key share, certificate chain." },
    { from: "Client", to: "Server", label: "Verify + Finish", desc: "Client verifies cert chain, sends Finished." },
    { from: "Both", to: "Both", label: "Encrypted channel", desc: "Application data flows encrypted with AEAD keys." },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 20,
            border: `1px solid ${step === i ? T.accent : T.border}`,
            background: step === i ? `${T.accent}22` : "transparent",
            color: step === i ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {s.label}</button>
        ))}
      </div>
      <svg width="100%" height="120" viewBox="0 0 500 120" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <rect x={60} y={30} width={100} height={60} rx={8}
          fill={`${T.blue}22`} stroke={T.blue} strokeWidth={2} />
        <text x={110} y={65} textAnchor="middle" fill={T.text} fontSize="13" fontWeight="700">Client</text>
        <rect x={340} y={30} width={100} height={60} rx={8}
          fill={`${T.green}22`} stroke={T.green} strokeWidth={2} />
        <text x={390} y={65} textAnchor="middle" fill={T.text} fontSize="13" fontWeight="700">Server</text>
        <line x1={160} y1={60} x2={340} y2={60}
          stroke={T.accent} strokeWidth={2} strokeDasharray={step >= 0 ? "0" : "4,4"} />
        {steps.slice(0, step + 1).map((s, i) => (
          <text key={i} x={250} y={55 - i * 4} textAnchor="middle"
            fill={T.accent} fontSize="10" fontWeight="600">{s.label}</text>
        ))}
      </svg>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        TLS 1.3 achieves a 1-RTT handshake (0-RTT with resumption). Forward secrecy ensures past sessions remain secure even if long-term keys leak.
      </div>
    </div>
  );
}

function AuthDemo() {
  const [mfa, setMfa] = useState("password");
  const options = {
    password: { name: "Password only", strength: 30, color: T.red, risk: "Easily phished, reused, cracked." },
    sms: { name: "Password + SMS", strength: 55, color: T.amber, risk: "SIM swap, real-time phishing." },
    totp: { name: "Password + TOTP", strength: 75, color: T.blue, risk: "Real-time phishing possible." },
    webauthn: { name: "WebAuthn / Passkey", strength: 98, color: T.green, risk: "Phishing-resistant, origin-bound." },
  };
  const o = options[mfa];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(options).map(([k, v]) => (
          <button key={k} onClick={() => setMfa(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${mfa === k ? v.color : T.border}`,
            background: mfa === k ? `${v.color}22` : "transparent",
            color: mfa === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${o.color}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Phishing resistance</div>
        <div style={{
          color: o.color, fontSize: 34, fontWeight: 900, marginBottom: 12,
        }}>{o.strength}%</div>
        <div style={{ height: 10, background: T.border, borderRadius: 5, overflow: "hidden", marginBottom: 12 }}>
          <div style={{
            width: `${o.strength}%`, height: "100%",
            background: o.color, borderRadius: 5, transition: "width .4s",
          }} />
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>
          <strong style={{ color: o.color }}>Residual risk:</strong> {o.risk}
        </div>
      </div>
    </div>
  );
}

function AuthZDemo() {
  const [model, setModel] = useState("rbac");
  const models = {
    rbac: { name: "RBAC", desc: "Roles group permissions; users assigned roles. Simple and familiar.", example: ["role: analyst", "permission: read:reports", "user → analyst"] },
    abac: { name: "ABAC", desc: "Policy evaluates attributes of subject, resource, action, environment.", example: ["subject.department == resource.owner_dept", "time.hour >= 9 && time.hour < 18", "resource.classification <= subject.clearance"] },
    rebac: { name: "ReBAC", desc: "Authorization based on relationships. Handles sharing and delegation at scale.", example: ["user:alice#owner@doc:1", "doc:1#viewer@group:eng", "folder:x#parent@doc:1"] },
  };
  const m = models[model];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {Object.entries(models).map(([k, v]) => (
          <button key={k} onClick={() => setModel(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${model === k ? T.accent : T.border}`,
            background: model === k ? `${T.accent}22` : "transparent",
            color: model === k ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, marginBottom: 12,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{m.name}</div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{m.desc}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
          {m.example.map((line, i) => (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 4, marginBottom: 4,
              background: "#020812", border: `1px solid ${T.border}`, color: T.accent,
            }}>{line}</div>
          ))}
        </div>
      </div>
      <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Broken access control is OWASP #1. Every resource access must be checked against a policy — not assumed from network location or previous authentication.
      </div>
    </div>
  );
}

function FirewallDemo() {
  const [zone, setZone] = useState("dmz");
  const zones = {
    internet: { name: "Internet", color: T.red, allowed: ["→ DMZ: 443/tcp", "→ DMZ: 80/tcp"], blocked: ["→ Internal: any", "→ DB: any"] },
    dmz: { name: "DMZ", color: T.amber, allowed: ["→ Internal: 443", "→ Internet: 443", "← Internet: 443/80"], blocked: ["→ DB: any", "← Internal: direct"] },
    internal: { name: "Internal", color: T.blue, allowed: ["→ DB: 5432", "→ DMZ: 443", "→ Internet: 443 (via NAT)"], blocked: ["← Internet: direct", "← DMZ: arbitrary"] },
    db: { name: "Data tier", color: T.green, allowed: ["← Internal: 5432"], blocked: ["← Internet: any", "← DMZ: any"] },
  };
  const z = zones[zone];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(zones).map(([k, v]) => (
          <button key={k} onClick={() => setZone(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${zone === k ? v.color : T.border}`,
            background: zone === k ? `${v.color}22` : "transparent",
            color: zone === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{
          padding: "14px", borderRadius: 10, background: T.surface,
          border: `1px solid ${T.green}`,
        }}>
          <div style={{ color: T.green, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>✓ ALLOWED</div>
          {z.allowed.map((a, i) => (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 4, marginBottom: 4,
              background: `${T.green}11`, color: T.text, fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{a}</div>
          ))}
        </div>
        <div style={{
          padding: "14px", borderRadius: 10, background: T.surface,
          border: `1px solid ${T.red}`,
        }}>
          <div style={{ color: T.red, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>✗ BLOCKED</div>
          {z.blocked.map((b, i) => (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 4, marginBottom: 4,
              background: `${T.red}11`, color: T.text, fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{b}</div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Segmentation limits blast radius: a compromised web server in the DMZ cannot reach the database directly. Least privilege at the network layer.
      </div>
    </div>
  );
}

function IDSDemo() {
  const [mode, setMode] = useState("signature");
  const modes = {
    signature: { name: "Signature-based", tp: 90, fp: 10, novel: 20, color: T.blue, desc: "Matches known patterns. Low false positives, blind to novel attacks." },
    anomaly: { name: "Anomaly-based", tp: 80, fp: 40, novel: 70, color: T.amber, desc: "Detects deviations from baseline. Catches new patterns, more noise." },
    behavioral: { name: "Behavioral", tp: 85, fp: 25, novel: 75, color: T.purple, desc: "Models TTPs, not IOCs. Better on sophisticated adversaries." },
  };
  const m = modes[mode];
  const bars = [
    { l: "Detection rate (known)", v: m.tp, c: T.green },
    { l: "False positive rate", v: m.fp, c: T.red },
    { l: "Novel attack detection", v: m.novel, c: T.blue },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(modes).map(([k, v]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${mode === k ? v.color : T.border}`,
            background: mode === k ? `${v.color}22` : "transparent",
            color: mode === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${m.color}`, marginBottom: 14,
      }}>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>{m.desc}</div>
      </div>
      {bars.map((b) => (
        <div key={b.l} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: T.text }}>{b.l}</span>
            <span style={{ color: b.c, fontWeight: 700 }}>{b.v}%</span>
          </div>
          <div style={{ height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${b.v}%`, height: "100%",
              background: b.c, borderRadius: 4, transition: "width .4s",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ZeroTrustDemo() {
  const [model, setModel] = useState("vpn");
  const models = {
    vpn: { name: "VPN / perimeter", color: T.red, desc: "Once inside the VPN, the user has broad access. Lateral movement is easy after compromise." },
    zt: { name: "Zero Trust", color: T.green, desc: "Every request authenticated and authorized per resource. No implicit trust from network location." },
  };
  const m = models[model];
  const nodes = ["User", "Device", "Network", "App", "Data"];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {Object.entries(models).map(([k, v]) => (
          <button key={k} onClick={() => setModel(k)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${model === k ? v.color : T.border}`,
            background: model === k ? `${v.color}22` : "transparent",
            color: model === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <svg width="100%" height="160" viewBox="0 0 500 160" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 12,
      }}>
        {nodes.map((n, i) => {
          const x = 60 + i * 95;
          return (
            <g key={i}>
              <rect x={x - 35} y={60} width={70} height={40} rx={6}
                fill={`${m.color}22`} stroke={m.color} strokeWidth={2} />
              <text x={x} y={85} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="600">{n}</text>
              {i < nodes.length - 1 && (
                <g>
                  <line x1={x + 35} y1={80} x2={x + 60} y2={80}
                    stroke={m.color} strokeWidth={model === "vpn" ? 1 : 2}
                    strokeDasharray={model === "zt" ? "0" : "0"} />
                  {model === "zt" && (
                    <>
                      <circle cx={x + 47} cy={80} r={6} fill={m.color} />
                      <text x={x + 47} y={83} textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">✓</text>
                    </>
                  )}
                </g>
              )}
            </g>
          );
        })}
        <text x={250} y={25} textAnchor="middle" fill={T.muted} fontSize="10">
          {model === "vpn" ? "One gate, then trust" : "Continuous verification per request"}
        </text>
      </svg>
      <div style={{
        padding: "14px", borderRadius: 10, background: T.surface,
        border: `1px solid ${m.color}`,
      }}>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>{m.desc}</div>
      </div>
    </div>
  );
}

function OWASPDemo() {
  const [risk, setRisk] = useState("a01");
  const risks = {
    a01: { name: "Broken Access Control", color: T.red, desc: "Missing or ineffective authorization. User A reads user B's data.", example: "GET /users/123 without checking ownership." },
    a02: { name: "Cryptographic Failures", color: T.amber, desc: "Weak or missing encryption, hardcoded keys, obsolete algorithms.", example: "Passwords hashed with MD5; TLS 1.0." },
    a03: { name: "Injection", color: T.orange, desc: "Untrusted data interpreted as code.", example: "' OR 1=1 -- in a login form." },
    a04: { name: "Insecure Design", color: T.purple, desc: "Flaws in the design, not the code — missing rate limits, trust boundaries.", example: "Password reset by email without token." },
    a05: { name: "Security Misconfiguration", color: T.pink, desc: "Defaults, debug on, open cloud buckets, verbose errors.", example: "Public S3 bucket with customer data." },
    a06: { name: "Vulnerable Components", color: T.blue, desc: "Outdated libraries and dependencies.", example: "Log4Shell, xz-utils backdoor." },
    a07: { name: "Auth Failures", color: T.teal, desc: "Weak credentials, session fixation, missing MFA.", example: "Session IDs in URLs." },
    a08: { name: "Integrity Failures", color: T.green, desc: "Unsigned updates, insecure deserialization, CI/CD compromise.", example: "Downloading and executing an unsigned update." },
    a09: { name: "Logging Failures", color: T.indigo, desc: "No audit trail, no alerts on critical events.", example: "No logs of admin actions." },
    a10: { name: "SSRF", color: T.red, desc: "Server tricked into making requests to internal resources.", example: "fetch('http://169.254.169.254/...')." },
  };
  const r = risks[risk];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(risks).map(([k, v]) => (
          <button key={k} onClick={() => setRisk(k)} style={{
            padding: "4px 10px", borderRadius: 16,
            border: `1px solid ${risk === k ? v.color : T.border}`,
            background: risk === k ? `${v.color}22` : "transparent",
            color: risk === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 10, fontWeight: 600,
            textTransform: "uppercase",
          }}>{k}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${r.color}`,
      }}>
        <div style={{ color: r.color, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{r.name}</div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{r.desc}</div>
        <div style={{
          padding: "10px 14px", borderRadius: 8, background: "#020812",
          border: `1px solid ${T.border}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.accent,
        }}>{r.example}</div>
      </div>
    </div>
  );
}

function InjectionDemo() {
  const [input, setInput] = useState("alice");
  const [mode, setMode] = useState("vulnerable");
  const injected = input.includes("'") || input.toLowerCase().includes("or 1=1");
  const vulnerableQuery = `SELECT * FROM users WHERE name = '${input}'`;
  const safeQuery = `SELECT * FROM users WHERE name = ? -- params: [${JSON.stringify(input)}]`;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode("vulnerable")} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${mode === "vulnerable" ? T.red : T.border}`,
          background: mode === "vulnerable" ? `${T.red}22` : "transparent",
          color: mode === "vulnerable" ? T.red : T.muted,
          cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Vulnerable</button>
        <button onClick={() => setMode("safe")} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${mode === "safe" ? T.green : T.border}`,
          background: mode === "safe" ? `${T.green}22` : "transparent",
          color: mode === "safe" ? T.green : T.muted,
          cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Safe</button>
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Try: alice' OR 1=1 --"
        style={{
          width: "100%", background: T.elevated, border: `1px solid ${T.border}`,
          borderRadius: 8, padding: "10px 14px", color: T.text,
          fontSize: 13, outline: "none", marginBottom: 12, boxSizing: "border-box",
          fontFamily: "'JetBrains Mono', monospace",
        }} />
      <div style={{
        padding: "14px 16px", borderRadius: 10, background: "#020812",
        border: `1px solid ${mode === "vulnerable" ? T.red : T.green}`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        color: mode === "vulnerable" ? T.red : T.green,
        wordBreak: "break-all", marginBottom: 10,
      }}>
        {mode === "vulnerable" ? vulnerableQuery : safeQuery}
      </div>
      {mode === "vulnerable" && injected && (
        <div style={{
          padding: "10px 14px", borderRadius: 8,
          background: `${T.red}22`, border: `1px solid ${T.red}`,
          color: T.red, fontSize: 12, fontWeight: 600,
        }}>⚠️ Injection detected — this query returns all rows</div>
      )}
      {mode === "safe" && (
        <div style={{
          padding: "10px 14px", borderRadius: 8,
          background: `${T.green}22`, border: `1px solid ${T.green}`,
          color: T.green, fontSize: 12, fontWeight: 600,
        }}>✓ Parameterized query — user input is data, never code</div>
      )}
    </div>
  );
}

function SupplyChainDemo() {
  const [depth, setDepth] = useState(3);
  const direct = 12;
  const transitive = [12, 45, 180, 620][Math.max(0, Math.min(3, depth - 1))];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Real-world dependency trees grow quickly — most code is third-party
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Transitive depth</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{depth}</span>
        </div>
        <input type="range" min={1} max={4} value={depth}
          onChange={(e) => setDepth(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>Direct dependencies</div>
            <div style={{ color: T.blue, fontSize: 24, fontWeight: 800 }}>{direct}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>Total in tree</div>
            <div style={{ color: T.amber, fontSize: 24, fontWeight: 800 }}>{transitive}</div>
          </div>
        </div>
        <div style={{ marginTop: 14, color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>
          Each dependency is a maintainer, a build pipeline, and a repository. Every one is a potential attack vector — SBOMs and signed artifacts make it defensible.
        </div>
      </div>
    </div>
  );
}

function CloudSecDemo() {
  const [issue, setIssue] = useState("s3");
  const issues = {
    s3: { name: "Public S3 bucket", color: T.red, severity: "CRITICAL", fix: "Block public access; enable access logging; encrypt with KMS." },
    iam: { name: "Overpermissive role", color: T.amber, severity: "HIGH", fix: "Least privilege; use IAM Access Analyzer; scope resources." },
    sg: { name: "0.0.0.0/0 security group", color: T.orange, severity: "HIGH", fix: "Restrict ingress; use SG references; require VPN or bastion." },
    meta: { name: "IMDSv1 enabled", color: T.pink, severity: "MEDIUM", fix: "Require IMDSv2; enforce via org policy." },
    logs: { name: "CloudTrail disabled", color: T.purple, severity: "HIGH", fix: "Enable org-wide CloudTrail to immutable storage." },
  };
  const i = issues[issue];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(issues).map(([k, v]) => (
          <button key={k} onClick={() => setIssue(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${issue === k ? v.color : T.border}`,
            background: issue === k ? `${v.color}22` : "transparent",
            color: issue === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${i.color}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: i.color, fontWeight: 700, fontSize: 14 }}>{i.name}</span>
          <span style={{
            padding: "3px 10px", borderRadius: 12,
            background: `${i.color}22`, color: i.color,
            fontSize: 10, fontWeight: 800, letterSpacing: ".05em",
          }}>{i.severity}</span>
        </div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>
          <strong style={{ color: T.green }}>Fix:</strong> {i.fix}
        </div>
      </div>
    </div>
  );
}

function K8sSecDemo() {
  const [layer, setLayer] = useState("image");
  const layers = {
    image: { name: "Image", color: T.blue, controls: ["Minimal base (distroless)", "Scan for CVEs", "Sign with cosign", "Generate SBOM"] },
    runtime: { name: "Runtime", color: T.green, controls: ["Read-only root filesystem", "Drop capabilities", "Seccomp profile", "Non-root user"] },
    orchestration: { name: "Orchestration", color: T.amber, controls: ["RBAC least privilege", "NetworkPolicy default deny", "Pod Security Admission", "No hostPath"] },
    secrets: { name: "Secrets", color: T.purple, controls: ["External Secrets Operator", "Encrypt etcd at rest", "Short-lived credentials", "Never in env if avoidable"] },
  };
  const l = layers[layer];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(layers).map(([k, v]) => (
          <button key={k} onClick={() => setLayer(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${layer === k ? v.color : T.border}`,
            background: layer === k ? `${v.color}22` : "transparent",
            color: layer === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${l.color}`,
      }}>
        <div style={{ color: l.color, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
          {l.name} controls
        </div>
        {l.controls.map((c, i) => (
          <div key={i} style={{
            padding: "8px 12px", borderRadius: 6, marginBottom: 4,
            background: `${l.color}11`, border: `1px solid ${l.color}44`,
            color: T.text, fontSize: 12,
          }}>✓ {c}</div>
        ))}
      </div>
    </div>
  );
}

function SecretsDemo() {
  const [method, setMethod] = useState("env");
  const methods = {
    env: { name: "Env vars", score: 30, color: T.red, risk: "Visible to all child processes; easy to leak in logs and crash dumps." },
    vault: { name: "Central vault", score: 75, color: T.blue, risk: "Better, but still needs an auth mechanism to retrieve secrets." },
    oidc: { name: "Workload identity (OIDC)", score: 95, color: T.green, risk: "Short-lived credentials, no static secret to steal." },
    hsm: { name: "HSM / TPM", score: 98, color: T.purple, risk: "Hardware-backed, expensive and complex to operate." },
  };
  const m = methods[method];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(methods).map(([k, v]) => (
          <button key={k} onClick={() => setMethod(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${method === k ? v.color : T.border}`,
            background: method === k ? `${v.color}22` : "transparent",
            color: method === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${m.color}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Security posture</div>
        <div style={{ color: m.color, fontSize: 34, fontWeight: 900, marginBottom: 12 }}>{m.score}/100</div>
        <div style={{ height: 10, background: T.border, borderRadius: 5, overflow: "hidden", marginBottom: 12 }}>
          <div style={{
            width: `${m.score}%`, height: "100%",
            background: m.color, borderRadius: 5, transition: "width .4s",
          }} />
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>{m.risk}</div>
      </div>
    </div>
  );
}

function SIEMDemo() {
  const events = [
    { src: "EDR", msg: "Suspicious PowerShell encoded command" },
    { src: "Cloud", msg: "CreateAccessKey from unfamiliar IP" },
    { src: "Identity", msg: "MFA disabled for user jdoe" },
    { src: "Network", msg: "Outbound to known C2 IP" },
    { src: "App", msg: "Mass download from file share" },
  ];
  const [ingested, setIngested] = useState(0);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        SIEMs ingest, normalize, and correlate events — turning telemetry into signal
      </p>
      <button onClick={() => setIngested((i) => Math.min(events.length, i + 1))}
        disabled={ingested >= events.length} style={{
        padding: "8px 18px", borderRadius: 20,
        background: ingested >= events.length ? T.elevated : T.accent,
        color: ingested >= events.length ? T.muted : "#000",
        border: "none", cursor: ingested >= events.length ? "default" : "pointer",
        fontWeight: 700, fontSize: 12, marginBottom: 14,
      }}>{ingested >= events.length ? "All events processed" : "▶ Ingest Next Event"}</button>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {events.slice(0, ingested).map((e, i) => (
          <div key={i} style={{
            padding: "10px 14px", borderRadius: 8,
            background: T.surface, border: `1px solid ${T.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            animation: "blink 1.5s ease-out",
          }}>
            <span style={{
              padding: "3px 8px", borderRadius: 4,
              background: `${T.accent}22`, color: T.accent,
              fontSize: 10, fontWeight: 700,
            }}>{e.src}</span>
            <span style={{ color: T.text, fontSize: 12, flex: 1, marginLeft: 10 }}>{e.msg}</span>
          </div>
        ))}
        {ingested >= events.length && (
          <div style={{
            padding: "12px 14px", borderRadius: 8,
            background: `${T.red}22`, border: `1px solid ${T.red}`,
            color: T.red, fontSize: 12, fontWeight: 700,
          }}>🚨 Correlation: possible account takeover detected — escalate to IR</div>
        )}
      </div>
    </div>
  );
}

function IRDemo() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { name: "Preparation", color: T.blue, desc: "Playbooks, tooling, training, communication plans." },
    { name: "Identification", color: T.amber, desc: "Detect and triage. Confirm it's a real incident. Assign IC." },
    { name: "Containment", color: T.orange, desc: "Stop the bleeding: isolate hosts, rotate creds, block IOCs." },
    { name: "Eradication", color: T.red, desc: "Remove adversary: kill persistence, patch exploited vulns." },
    { name: "Recovery", color: T.green, desc: "Restore systems safely. Monitor closely for re-entry." },
    { name: "Lessons Learned", color: T.purple, desc: "Blameless postmortem. Update detections and playbooks." },
  ];
  const p = phases[phase];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {phases.map((ph, i) => (
          <button key={i} onClick={() => setPhase(i)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${phase === i ? ph.color : T.border}`,
            background: phase === i ? `${ph.color}22` : "transparent",
            color: phase === i ? ph.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {ph.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${p.color}`,
      }}>
        <div style={{ color: p.color, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
          Phase {phase + 1}: {p.name}
        </div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => setPhase(Math.max(0, phase - 1))} disabled={phase === 0} style={{
          padding: "6px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: phase === 0 ? T.muted : T.text,
          cursor: phase === 0 ? "default" : "pointer", fontSize: 12,
        }}>← Previous</button>
        <button onClick={() => setPhase(Math.min(phases.length - 1, phase + 1))}
          disabled={phase === phases.length - 1} style={{
          padding: "6px 16px", borderRadius: 20, background: T.accent,
          color: "#000", border: "none",
          cursor: phase === phases.length - 1 ? "default" : "pointer",
          fontSize: 12, fontWeight: 700,
          opacity: phase === phases.length - 1 ? 0.5 : 1,
        }}>Next →</button>
      </div>
    </div>
  );
}

function HuntingDemo() {
  const hypotheses = [
    { h: "Adversary using living-off-the-land binaries", tech: "T1059", color: T.amber },
    { h: "Credential dumping on Linux hosts", tech: "T1003.007", color: T.red },
    { h: "Suspicious OAuth grants in cloud tenancy", tech: "T1528", color: T.purple },
    { h: "Beaconing to uncommon destinations", tech: "T1071", color: T.blue },
  ];
  const [selected, setSelected] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {hypotheses.map((h, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${selected === i ? h.color : T.border}`,
            background: selected === i ? `${h.color}22` : "transparent",
            color: selected === i ? h.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>Hypothesis {i + 1}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${hypotheses[selected].color}`,
      }}>
        <div style={{ color: hypotheses[selected].color, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          {hypotheses[selected].h}
        </div>
        <div style={{
          padding: "6px 10px", borderRadius: 6,
          background: "#020812", border: `1px solid ${T.border}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.accent,
        }}>ATT&CK {hypotheses[selected].tech}</div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Threat hunting starts with a hypothesis grounded in ATT&CK, then queries telemetry for evidence. A null result is still useful — it either rules out the hypothesis or reveals a detection gap.
      </div>
    </div>
  );
}

function PentestDemo() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { name: "Scoping", color: T.blue, desc: "Define targets, in-scope assets, rules of engagement, legal authorization." },
    { name: "Reconnaissance", color: T.teal, desc: "Passive and active information gathering: DNS, subdomains, tech stack." },
    { name: "Vulnerability Analysis", color: T.amber, desc: "Identify weaknesses: scanners, manual review, fuzzing." },
    { name: "Exploitation", color: T.orange, desc: "Attempt to exploit with controls and evidence capture." },
    { name: "Post-Exploitation", color: T.red, desc: "Privilege escalation, lateral movement, persistence — within scope." },
    { name: "Reporting", color: T.green, desc: "Findings, risk ratings, reproduction steps, remediation guidance." },
  ];
  const p = phases[phase];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {phases.map((ph, i) => (
          <button key={i} onClick={() => setPhase(i)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${phase === i ? ph.color : T.border}`,
            background: phase === i ? `${ph.color}22` : "transparent",
            color: phase === i ? ph.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {ph.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${p.color}`,
      }}>
        <div style={{ color: p.color, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{p.name}</div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
      </div>
    </div>
  );
}

function PostExDemo() {
  const [stage, setStage] = useState("privesc");
  const stages = {
    privesc: { name: "Privilege Escalation", color: T.red, defender: "EDR, patch hygiene, least-privilege service accounts." },
    persistence: { name: "Persistence", color: T.purple, defender: "Autorun monitoring, scheduled task detection, service creation alerts." },
    creds: { name: "Credential Access", color: T.orange, defender: "LSASS protection, Kerberos monitoring, cloud token protections." },
    lateral: { name: "Lateral Movement", color: T.amber, defender: "Segmentation, identity-aware access, SMB/RDP logging." },
    exfil: { name: "Exfiltration", color: T.pink, defender: "Egress monitoring, DLP, anomaly detection on data flows." },
  };
  const s = stages[stage];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(stages).map(([k, v]) => (
          <button key={k} onClick={() => setStage(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${stage === k ? v.color : T.border}`,
            background: stage === k ? `${v.color}22` : "transparent",
            color: stage === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${s.color}`,
      }}>
        <div style={{ color: s.color, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{s.name}</div>
        <div style={{ color: T.muted, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>DEFENDER FOCUS</div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{s.defender}</div>
      </div>
    </div>
  );
}

function VulnMgmtDemo() {
  const [cvss, setCvss] = useState(8.5);
  const [epss, setEpss] = useState(0.6);
  const [critical, setCritical] = useState(true);
  const priority = cvss * (0.4 + epss * 0.6) * (critical ? 1.3 : 1.0);
  const band = priority > 10 ? "P0 — fix now" : priority > 7 ? "P1 — this week" : priority > 4 ? "P2 — this month" : "P3 — backlog";
  const color = priority > 10 ? T.red : priority > 7 ? T.orange : priority > 4 ? T.amber : T.green;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        Prioritize by CVSS, EPSS, and asset criticality — not CVSS alone
      </p>
      {[
        { l: "CVSS (0–10)", v: cvss, set: setCvss, min: 0, max: 10, step: 0.1 },
        { l: "EPSS (0–1)", v: epss, set: setEpss, min: 0, max: 1, step: 0.05 },
      ].map((s) => (
        <div key={s.l} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>{s.l}</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{s.v.toFixed(2)}</span>
          </div>
          <input type="range" min={s.min} max={s.max} step={s.step} value={s.v}
            onChange={(e) => s.set(+e.target.value)} style={{ width: "100%" }} />
        </div>
      ))}
      <div style={{ marginBottom: 14 }}>
        <button onClick={() => setCritical(!critical)} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${critical ? T.red : T.border}`,
          background: critical ? `${T.red}22` : "transparent",
          color: critical ? T.red : T.muted,
          cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>{critical ? "⚠️ Critical asset" : "Standard asset"}</button>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${color}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Priority score</div>
        <div style={{ color, fontSize: 32, fontWeight: 900, marginBottom: 8 }}>{priority.toFixed(2)}</div>
        <div style={{
          padding: "8px 12px", borderRadius: 6,
          background: `${color}22`, color, fontSize: 12, fontWeight: 700,
        }}>{band}</div>
      </div>
    </div>
  );
}

function PrivacyDemo() {
  const [consent, setConsent] = useState(true);
  const [minimize, setMinimize] = useState(true);
  const [retention, setRetention] = useState(true);
  const [rights, setRights] = useState(true);
  const score = (consent ? 25 : 0) + (minimize ? 25 : 0) + (retention ? 25 : 0) + (rights ? 25 : 0);
  const items = [
    { l: "Explicit, revocable consent", v: consent, set: setConsent },
    { l: "Data minimization", v: minimize, set: setMinimize },
    { l: "Retention limits", v: retention, set: setRetention },
    { l: "Subject rights (access, delete)", v: rights, set: setRights },
  ];
  const color = score >= 100 ? T.green : score >= 75 ? T.amber : score >= 50 ? T.orange : T.red;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        Privacy by design — toggle each principle
      </p>
      {items.map((it) => (
        <div key={it.l} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 14px", borderRadius: 8, background: T.surface,
          border: `1px solid ${it.v ? T.green : T.border}`, marginBottom: 6,
        }}>
          <span style={{ color: T.text, fontSize: 12 }}>{it.l}</span>
          <button onClick={() => it.set(!it.v)} style={{
            padding: "4px 12px", borderRadius: 12,
            border: `1px solid ${it.v ? T.green : T.muted}`,
            background: it.v ? `${T.green}22` : "transparent",
            color: it.v ? T.green : T.muted,
            cursor: "pointer", fontSize: 10, fontWeight: 700,
          }}>{it.v ? "ON" : "OFF"}</button>
        </div>
      ))}
      <div style={{
        marginTop: 12, padding: "20px", borderRadius: 10,
        background: T.surface, border: `1px solid ${color}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Privacy posture</div>
        <div style={{ color, fontSize: 34, fontWeight: 900, marginBottom: 8 }}>{score}%</div>
        <div style={{ height: 10, background: T.border, borderRadius: 5, overflow: "hidden" }}>
          <div style={{
            width: `${score}%`, height: "100%",
            background: color, borderRadius: 5, transition: "width .4s",
          }} />
        </div>
      </div>
    </div>
  );
}

function AISecDemo() {
  const [side, setSide] = useState("defense");
  const sides = {
    defense: {
      name: "Defensive AI", color: T.green,
      items: ["Anomaly detection at scale", "Alert triage and prioritization", "Vulnerability prioritization", "Code review assistance", "Threat intel summarization", "Automated response playbooks"],
    },
    offense: {
      name: "Offensive AI", color: T.red,
      items: ["Synthetic phishing at scale", "Deepfake social engineering", "Automated recon and fingerprinting", "Polymorphic malware", "Automated exploit discovery", "Voice cloning in vishing"],
    },
  };
  const s = sides[side];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {Object.entries(sides).map(([k, v]) => (
          <button key={k} onClick={() => setSide(k)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${side === k ? v.color : T.border}`,
            background: side === k ? `${v.color}22` : "transparent",
            color: side === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${s.color}`,
      }}>
        {s.items.map((it, i) => (
          <div key={i} style={{
            padding: "8px 12px", borderRadius: 6, marginBottom: 4,
            background: `${s.color}11`, border: `1px solid ${s.color}44`,
            color: T.text, fontSize: 12,
          }}>{side === "defense" ? "🛡️" : "⚔️"} {it}</div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        AI amplifies both offense and defense. The net effect depends on who adopts faster and how well systems are defended against AI-native attack patterns.
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
    `How does ${ch.title} apply in real organizations?`,
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
          system: `You are an expert cybersecurity tutor helping someone learn cryptography, network defense, application security, identity, cloud security, detection, incident response, offensive security, and governance. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
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
      <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
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
    cia: CIADemo,
    threatmodel: ThreatModelDemo,
    defense: DefenseDemo,
    risk: RiskDemo,
    symmetric: SymmetricDemo,
    asymmetric: AsymmetricDemo,
    hashing: HashingDemo,
    tls: TLSDemo,
    auth: AuthDemo,
    authz: AuthZDemo,
    firewall: FirewallDemo,
    ids: IDSDemo,
    zerotrust: ZeroTrustDemo,
    owasp: OWASPDemo,
    injection: InjectionDemo,
    supplychain: SupplyChainDemo,
    cloudsec: CloudSecDemo,
    k8ssec: K8sSecDemo,
    secrets: SecretsDemo,
    siem: SIEMDemo,
    ir: IRDemo,
    hunting: HuntingDemo,
    pentest: PentestDemo,
    postex: PostExDemo,
    vulnmgmt: VulnMgmtDemo,
    privacy: PrivacyDemo,
    aisec: AISecDemo,
  };
  const DemoComponent = ch.demo ? DemoComponents[ch.demo] : null;
  const TABS = [
    { id: "content", label: "📖 Content" },
    { id: "quiz", label: "🎯 Quiz", badge: QUIZZES[ch.n]?.length },
    { id: "tutor", label: "🤖 AI Tutor" },
    { id: "notes", label: "📝 Notes" },
  ];
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 16px 60px" }}>
      <button onClick={onBack} style={{
        background: "transparent", border: "none", color: T.muted,
        cursor: "pointer", fontSize: 13, padding: "16px 0", marginBottom: 4,
      }}>← Back to Curriculum</button>
      <RelatedCurriculums currentId="cybersecurity" chapter={ch} />
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
        All 37 chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{
          background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`,
        }}>
          <defs>
            <radialGradient id="bgCS" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bgCS)" rx="14" />
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
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
function Sidebar({ view, setView, openChapter, selCh, read, quizScores, search, setSearch, mobile }) {
  const [expanded, setExpanded] = useState(new Set([0, 1, 2, 3, 4, 5, 6]));
  const toggle = (id) => setExpanded((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  const totalQ = Object.values(quizScores).reduce((a, s) => a + s.score, 0);
  const maxQ = Object.values(quizScores).reduce((a, s) => a + s.total, 0);
  return (
    <div style={{
      width: mobile ? "100%" : 270, background: T.surface, borderRight: mobile ? "none" : `1px solid ${T.border}`,
      borderBottom: mobile ? `1px solid ${T.border}` : "none", height: mobile ? "auto" : "100vh", overflowY: mobile ? "visible" : "auto", flexShrink: 0,
      display: "flex", flexDirection: "column",
      maxHeight: mobile ? "none" : "100vh",
    }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 18 }}>🔐</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Cybersecurity</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>11 Parts · 37 Chapters</div>
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
function Overview({ setView, openChapter, read, quizScores }) {
  const [activePath, setActivePath] = useState(null);
  const paths = [
    { label: "Defender Path", color: T.blue, desc: "Foundations, network defense, detection, IR", chs: [0, 1, 2, 3, 12, 13, 14, 15, 23, 24, 25, 26] },
    { label: "AppSec Track", color: T.green, desc: "Cryptography, web, SDLC, supply chain", chs: [5, 6, 7, 8, 16, 17, 18, 19] },
    { label: "Cloud Security", color: T.purple, desc: "Identity, cloud, containers, secrets", chs: [9, 10, 11, 20, 21, 22] },
    { label: "Offensive / Red Team", color: T.red, desc: "Pentest, post-exploitation, vulnerability mgmt", chs: [27, 28, 29] },
    { label: "Governance / CISO", color: T.amber, desc: "Risk, compliance, privacy, culture, frontier", chs: [4, 30, 31, 32, 33, 34, 35, 36] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
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
        <h1 style={{
          fontSize: 34, fontWeight: 900, margin: "0 0 10px",
          background: "linear-gradient(135deg,#F0F6FF 30%,#22D3EE)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
        }}>Cybersecurity</h1>
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          11 Parts · 37 Chapters · From Cryptography to Defensive AI
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { n: CHAPTERS.length, label: "Chapters" },
          { n: 11, label: "Parts" },
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
  const [selCh, setSelCh] = useState(null);
  const [read, setRead] = useState(new Set());
  const [notes, setNotes] = useState({});
  const [quizScores, setQuizScores] = useState({});
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

  const openChapter = (n) => { setSelCh(n); setView("chapter"); setSearch(""); };
  const toggleRead = (n) => setRead((r) => {
    const s = new Set(r);
    s.has(n) ? s.delete(n) : s.add(n);
    return s;
  });
  const onScore = (n, score, total) => setQuizScores((q) => ({ ...q, [n]: { score, total } }));

  const ch = selCh !== null ? CHAPTERS.find((c) => c.n === selCh) : null;
  const color = ch ? PC[ch.part] : T.accent;

  return (
    <div style={{
      display: "flex", flexDirection: mobile ? "column" : "row", minHeight: "100vh", height: mobile ? "auto" : "100vh", overflow: mobile ? "visible" : "hidden",
      background: T.bg, color: T.text,
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