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
  "#4ADE80",
];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Territory Map", icon: "🗺️", chs: [0] },
  { id: 1, label: "Mathematical Foundations", icon: "∑", chs: [1, 2, 3] },
  { id: 2, label: "Quantum Mechanics", icon: "⚛️", chs: [4, 5, 6, 7] },
  { id: 3, label: "Qubits & Gates", icon: "🔵", chs: [8, 9, 10, 11] },
  { id: 4, label: "Quantum Circuits", icon: "🔗", chs: [12, 13, 14] },
  { id: 5, label: "Quantum Algorithms", icon: "⚡", chs: [15, 16, 17, 18, 19] },
  { id: 6, label: "Quantum Complexity", icon: "📊", chs: [20, 21] },
  { id: 7, label: "Error Correction", icon: "🛡️", chs: [22, 23, 24] },
  { id: 8, label: "Hardware & Modalities", icon: "🧊", chs: [25, 26, 27, 28] },
  { id: 9, label: "Quantum Software", icon: "💻", chs: [29, 30, 31] },
  { id: 10, label: "Applications & Frontier", icon: "🚀", chs: [32, 33, 34, 35] },
];

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of Quantum Computing",
    tagline: "From linear algebra to fault-tolerant machines",
    insight:
      "Quantum computing is not faster classical computing. It's a different model of computation that exploits interference.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Quantum computing is a model of computation that uses quantum mechanical phenomena — superposition, entanglement, and interference — to process information. It is not a faster CPU; it is a fundamentally different way of computing that excels at specific problem classes.",
      },
      {
        type: "stack",
        rows: [
          ["📐 Linear Algebra", "Vectors, matrices, complex numbers, tensor products"],
          ["⚛️ Quantum Mechanics", "State, measurement, evolution, entanglement"],
          ["🔵 Qubits", "Two-level quantum systems that hold superposition"],
          ["🔗 Quantum Gates", "Unitary operations that transform qubit states"],
          ["🔀 Circuits", "Sequences of gates with measurement at the end"],
          ["⚡ Algorithms", "Shor, Grover, QFT, HHL, VQE"],
          ["🛡️ Error Correction", "Logical qubits from noisy physical qubits"],
          ["🧊 Hardware", "Superconducting, trapped ion, photonic, neutral atom"],
        ],
      },
      {
        type: "insight",
        text: "The quantum advantage is real but narrow. For most problems, a classical computer wins. Quantum wins where interference can be engineered to cancel wrong answers and amplify right ones.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "Linear Algebra for Quantum",
    tagline: "Vectors, matrices, complex numbers, and tensor products",
    insight:
      "Quantum mechanics is linear algebra over complex numbers. Every qubit is a vector; every gate is a matrix.",
    demo: "linearalgebra",
    content: [
      {
        type: "p",
        text: "Quantum states are vectors in a complex vector space. Operations are unitary matrices. Composite systems use tensor products. Complex amplitudes encode probability and phase.",
      },
      {
        type: "code",
        text: "State:   |ψ⟩ = α|0⟩ + β|1⟩,  α, β ∈ ℂ\nNorm:    |α|² + |β|² = 1\n\nGate:    U|ψ⟩ = |ψ'⟩\nUnitary: U†U = I\n\nComposite:  |ψ⟩ ⊗ |φ⟩",
      },
      {
        type: "table",
        head: ["Concept", "Quantum Role"],
        rows: [
          ["Complex number", "Amplitude with phase"],
          ["Vector", "Quantum state"],
          ["Unitary matrix", "Quantum gate (reversible)"],
          ["Hermitian matrix", "Observable (measurable)"],
          ["Tensor product", "Composite systems"],
          ["Inner product", "Amplitude of one state in another"],
        ],
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Dirac Notation",
    tagline: "Bra-ket — the language of quantum states",
    insight:
      "⟨ψ| is the conjugate transpose of |ψ⟩. The inner product ⟨φ|ψ⟩ is a complex number; the outer product |ψ⟩⟨φ| is an operator.",
    content: [
      {
        type: "p",
        text: "Dirac notation (bra-ket) is the compact language of quantum mechanics. A ket |ψ⟩ is a column vector. A bra ⟨ψ| is its conjugate transpose. The inner product ⟨φ|ψ⟩ measures overlap; the outer product |ψ⟩⟨φ| builds operators.",
      },
      {
        type: "code",
        text: "Ket:    |0⟩ = [1, 0]ᵀ\nBra:    ⟨0| = [1, 0]\nInner:  ⟨0|1⟩ = 0  (orthogonal)\nOuter:  |0⟩⟨0| = [[1,0],[0,0]]\n\nBasis:  {|0⟩, |1⟩}\nSuperposition: |ψ⟩ = α|0⟩ + β|1⟩",
      },
      {
        type: "insight",
        text: "Bra-ket notation makes calculations readable. Once you're fluent, you can write an entire quantum algorithm on one line.",
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Probability Amplitudes",
    tagline: "Not probabilities — amplitudes with phase",
    insight:
      "Amplitudes can cancel. Probabilities can't. This is what makes quantum interference powerful.",
    demo: "amplitudes",
    content: [
      {
        type: "p",
        text: "Quantum states are described by complex amplitudes, not probabilities. When amplitudes combine, they add like waves: same-phase amplitudes reinforce, opposite-phase amplitudes cancel. This is quantum interference.",
      },
      {
        type: "table",
        head: ["Classical Probability", "Quantum Amplitude"],
        rows: [
          ["Real, nonnegative", "Complex with phase"],
          ["Combine by addition", "Combine by complex addition"],
          ["Never cancels", "Can destructively interfere"],
          ["Measurement reads value", "Measurement samples |amplitude|²"],
        ],
      },
      {
        type: "insight",
        text: "Quantum speedup comes from interference: arrange amplitudes so wrong answers cancel and right answers reinforce. If a problem has no exploitable interference, quantum offers no advantage.",
      },
    ],
  },
  {
    n: 4,
    part: 2,
    title: "Postulates of Quantum Mechanics",
    tagline: "State, evolution, measurement, composite systems",
    insight:
      "Four postulates govern everything quantum: state, unitary evolution, measurement, tensor composition.",
    content: [
      {
        type: "p",
        text: "Quantum mechanics rests on four postulates: (1) state is a unit vector in Hilbert space; (2) closed-system evolution is unitary; (3) measurement yields outcomes probabilistically, collapsing the state; (4) composite systems use tensor products.",
      },
      {
        type: "table",
        head: ["Postulate", "Content"],
        rows: [
          ["1. State", "|ψ⟩ ∈ ℋ, ‖ψ‖ = 1"],
          ["2. Evolution", "|ψ(t)⟩ = U(t)|ψ(0)⟩, U unitary"],
          ["3. Measurement", "Outcome m w.p. |⟨m|ψ⟩|²; state collapses to |m⟩"],
          ["4. Composition", "ℋ_AB = ℋ_A ⊗ ℋ_B"],
        ],
      },
    ],
  },
  {
    n: 5,
    part: 2,
    title: "Superposition & Interference",
    tagline: "Being in multiple states — and letting them cancel",
    insight:
      "Superposition alone gives no speedup. Interference between superposed states is where the power lives.",
    demo: "superposition",
    content: [
      {
        type: "p",
        text: "A qubit can be in a superposition of |0⟩ and |1⟩. With n qubits, the state is a superposition of 2ⁿ basis states. Quantum algorithms manipulate amplitudes to amplify correct outcomes and cancel incorrect ones.",
      },
      {
        type: "code",
        text: "|+⟩ = (|0⟩ + |1⟩) / √2\n|−⟩ = (|0⟩ − |1⟩) / √2\n\nn qubits:  2ⁿ amplitudes\nn = 50:    ~10¹⁵ amplitudes\nn = 300:   more than atoms in the universe",
      },
      {
        type: "insight",
        text: "You cannot read out all 2ⁿ amplitudes. Measurement returns one basis state probabilistically. The algorithm must be designed so the answer you want has high probability.",
      },
    ],
  },
  {
    n: 6,
    part: 2,
    title: "Entanglement",
    tagline: "Correlations stronger than any classical system",
    insight:
      "Entangled qubits are not independent — measuring one instantly constrains the other, regardless of distance.",
    demo: "entanglement",
    content: [
      {
        type: "p",
        text: "Entanglement is a non-classical correlation between qubits. A Bell state (|00⟩ + |11⟩)/√2 cannot be written as a product of individual qubit states. Measuring one qubit determines the other.",
      },
      {
        type: "code",
        text: "Bell state: |Φ⁺⟩ = (|00⟩ + |11⟩) / √2\n\nNot separable:\n  |Φ⁺⟩ ≠ (α|0⟩ + β|1⟩) ⊗ (γ|0⟩ + δ|1⟩)\n\nCHSH inequality:\n  Classical bound: ≤ 2\n  Quantum value:   2√2 ≈ 2.828",
      },
      {
        type: "insight",
        text: "Entanglement is a resource — for teleportation, dense coding, error correction, and quantum algorithms. But it cannot transmit information faster than light; you still need a classical channel.",
      },
    ],
  },
  {
    n: 7,
    part: 2,
    title: "Measurement & Decoherence",
    tagline: "Why quantum is fragile — and why we can't observe it directly",
    insight:
      "Measurement destroys superposition. Decoherence destroys it even without measurement.",
    demo: "decoherence",
    content: [
      {
        type: "p",
        text: "Measurement collapses a superposition to a single basis state. Decoherence is the environment's gradual measurement of the qubit, erasing quantum information. It is the central engineering challenge of quantum computing.",
      },
      {
        type: "table",
        head: ["Noise Source", "Effect"],
        rows: [
          ["T1 relaxation", "Qubit decays |1⟩ → |0⟩"],
          ["T2 dephasing", "Phase coherence lost"],
          ["Gate errors", "Imperfect operations"],
          ["Readout errors", "Misclassified measurement"],
          ["Crosstalk", "Unwanted qubit-qubit coupling"],
        ],
      },
      {
        type: "insight",
        text: "Modern superconducting qubits have coherence times of 100 μs to 1 ms, and two-qubit gate fidelities of 99.5–99.9%. Fault-tolerant quantum computing needs ~99.99% — an order of magnitude better.",
      },
    ],
  },
  {
    n: 8,
    part: 3,
    title: "The Qubit",
    tagline: "A two-level quantum system — the unit of quantum information",
    insight:
      "A qubit is a unit vector in a 2D complex space. Its state has two real degrees of freedom (after global phase) — the Bloch sphere.",
    demo: "bloch",
    content: [
      {
        type: "p",
        text: "A qubit is any quantum system with two distinguishable states, labeled |0⟩ and |1⟩. Its general state is α|0⟩ + β|1⟩ with |α|² + |β|² = 1. After removing global phase, it has two real parameters, visualized on the Bloch sphere.",
      },
      {
        type: "code",
        text: "|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩\n\nθ ∈ [0, π]  (polar angle)\nφ ∈ [0, 2π) (azimuthal angle)\n\n|0⟩: north pole\n|1⟩: south pole\n|+⟩: equator (φ = 0)\n|−⟩: equator (φ = π)",
      },
      {
        type: "table",
        head: ["Physical Realization", "Qubit Basis"],
        rows: [
          ["Superconducting circuit", "Charge/phase states"],
          ["Trapped ion", "Hyperfine levels"],
          ["Photonic", "Polarization or path"],
          ["Neutral atom", "Rydberg states"],
          ["Spin", "Electron/nuclear spin"],
          ["Topological", "Anyons (theoretical)"],
        ],
      },
    ],
  },
  {
    n: 9,
    part: 3,
    title: "Single-Qubit Gates",
    tagline: "Pauli, Hadamard, phase — rotations of the Bloch sphere",
    insight:
      "Every single-qubit gate is a rotation of the Bloch sphere. Three parameters (Euler angles) fully specify it.",
    demo: "gates1q",
    content: [
      {
        type: "p",
        text: "Single-qubit gates are 2×2 unitary matrices. The most important are the Pauli matrices (X, Y, Z), the Hadamard (H), and phase gates (S, T). Together they generate all single-qubit unitaries.",
      },
      {
        type: "code",
        text: "X = [[0,1],[1,0]]   (bit flip)\nZ = [[1,0],[0,-1]]  (phase flip)\nH = 1/√2 [[1,1],[1,-1]]\nS = [[1,0],[0,i]]\nT = [[1,0],[0,e^{iπ/4}]]",
      },
      {
        type: "table",
        head: ["Gate", "Effect"],
        rows: [
          ["X", "|0⟩ ↔ |1⟩"],
          ["Z", "|1⟩ → −|1⟩"],
          ["H", "|0⟩ → |+⟩, |1⟩ → |−⟩"],
          ["S", "Adds π/2 phase to |1⟩"],
          ["T", "Adds π/4 phase to |1⟩"],
        ],
      },
      {
        type: "insight",
        text: "The Clifford group (H, S, CNOT) can be efficiently simulated classically. Adding the T gate makes the gate set universal — and no longer classically simulable.",
      },
    ],
  },
  {
    n: 10,
    part: 3,
    title: "Multi-Qubit Gates",
    tagline: "CNOT, CZ, Toffoli — where entanglement is created",
    insight:
      "CNOT is the workhorse of quantum circuits. It entangles qubits and enables universal quantum computation with single-qubit gates.",
    demo: "gates2q",
    content: [
      {
        type: "p",
        text: "Multi-qubit gates act on two or more qubits. CNOT (controlled-X) flips the target when the control is |1⟩. CZ (controlled-Z) applies Z when the control is |1⟩. Toffoli (CCNOT) is a three-qubit gate that is classically universal.",
      },
      {
        type: "code",
        text: "CNOT = [[1,0,0,0],\n        [0,1,0,0],\n        [0,0,0,1],\n        [0,0,1,0]]\n\nCNOT|00⟩ = |00⟩\nCNOT|01⟩ = |01⟩\nCNOT|10⟩ = |11⟩\nCNOT|11⟩ = |10⟩",
      },
      {
        type: "insight",
        text: "H + CNOT creates a Bell state: CNOT · (H ⊗ I)|00⟩ = (|00⟩ + |11⟩)/√2. This is the smallest entangling circuit.",
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Universal Gate Sets",
    tagline: "What you need to compute anything",
    insight:
      "Any unitary can be approximated to arbitrary accuracy by H, T, and CNOT.",
    content: [
      {
        type: "p",
        text: "A gate set is universal if any unitary can be approximated to arbitrary accuracy using gates from the set. Common universal sets: {H, T, CNOT}, {H, S, Toffoli}, and the Clifford+T set.",
      },
      {
        type: "table",
        head: ["Gate Set", "Universal?"],
        rows: [
          ["{X, Z}", "No — Pauli only"],
          ["Clifford {H, S, CNOT}", "No — classically simulable"],
          ["Clifford + T", "Yes"],
          ["Toffoli + H", "Yes"],
        ],
      },
      {
        type: "insight",
        text: "T gates are expensive on error-corrected hardware — they require magic state distillation, which dominates the cost of fault-tolerant quantum algorithms.",
      },
    ],
  },
  {
    n: 12,
    part: 4,
    title: "Quantum Circuits",
    tagline: "Gates as a diagram — the assembly language of quantum",
    insight:
      "A quantum circuit reads left to right: initialize, apply gates, measure at the end.",
    demo: "circuit",
    content: [
      {
        type: "p",
        text: "A quantum circuit is a sequence of gates applied to qubits, followed by measurement. The circuit model is universal — any quantum algorithm can be expressed as a circuit.",
      },
      {
        type: "code",
        text: "q0: ──H──●──M─\n         │\nq1: ─────X──M─\n\nThis is the Bell-state preparation circuit.\nOutput: 00 or 11 with equal probability.",
      },
      {
        type: "table",
        head: ["Element", "Meaning"],
        rows: [
          ["Wire", "Qubit timeline"],
          ["Box", "Single-qubit gate"],
          ["●─X", "CNOT (control, target)"],
          ["M", "Measurement"],
          ["/", "Classical register"],
        ],
      },
    ],
  },
  {
    n: 13,
    part: 4,
    title: "Quantum Oracles",
    tagline: "Black-box functions as unitaries",
    insight:
      "Many quantum algorithms assume a black-box function U_f that computes f(x) in superposition.",
    demo: "oracle",
    content: [
      {
        type: "p",
        text: "A quantum oracle is a unitary U_f that encodes a classical function f. Given input |x⟩|y⟩, it computes |x⟩|y ⊕ f(x)⟩. Oracles let us reason about query complexity independent of implementation.",
      },
      {
        type: "code",
        text: "U_f: |x⟩|y⟩ → |x⟩|y ⊕ f(x)⟩\n\nPhase oracle (for f: {0,1}ⁿ → {0,1}):\n  U_f: |x⟩ → (−1)^{f(x)} |x⟩",
      },
      {
        type: "insight",
        text: "The oracle model is a theoretical abstraction. In practice, implementing U_f efficiently is often the hardest part of a quantum algorithm.",
      },
    ],
  },
  {
    n: 14,
    part: 4,
    title: "Reversible Computation",
    tagline: "Quantum gates are reversible — classical logic is not",
    insight:
      "Every quantum gate is a bijection. AND is not. Quantum circuits must simulate irreversible logic with ancilla qubits.",
    content: [
      {
        type: "p",
        text: "Quantum gates are unitary, hence reversible. Classical gates like AND, OR, and NAND lose information. To implement them, quantum circuits use ancilla qubits and reversible constructions (Toffoli, Fredkin).",
      },
      {
        type: "table",
        head: ["Classical", "Reversible Quantum"],
        rows: [
          ["NOT", "X"],
          ["XOR", "CNOT"],
          ["AND", "Toffoli with ancilla |0⟩"],
          ["NAND", "Toffoli + X"],
        ],
      },
      {
        type: "insight",
        text: "Landauer's principle says erasing one bit costs kT ln 2 of energy. Reversible computing avoids this — a theoretical reason quantum circuits are energy-efficient.",
      },
    ],
  },
  {
    n: 15,
    part: 5,
    title: "Deutsch–Jozsa",
    tagline: "The first exponential quantum speedup",
    insight:
      "Classically, you need 2ⁿ⁻¹ + 1 queries to decide a constant vs balanced function. Quantumly, one.",
    demo: "deutsch",
    content: [
      {
        type: "p",
        text: "The Deutsch–Jozsa algorithm determines whether a Boolean function f: {0,1}ⁿ → {0,1} is constant (all outputs the same) or balanced (half 0, half 1), using a single query to a quantum oracle.",
      },
      {
        type: "code",
        text: "1. Prepare |0⟩ⁿ|1⟩\n2. Apply H^⊗n\n3. Apply oracle U_f\n4. Apply H^⊗n\n5. Measure\n\nResult: all 0s → constant\n        else  → balanced",
      },
      {
        type: "insight",
        text: "Deutsch–Jozsa has no practical application, but it was the first proof that quantum can beat classical exponentially. It launched the field.",
      },
    ],
  },
  {
    n: 16,
    part: 5,
    title: "Grover's Algorithm",
    tagline: "Quadratic speedup for unstructured search",
    insight:
      "Grover finds a marked item in an unsorted database of N items in O(√N) queries, vs O(N) classically.",
    demo: "grover",
    content: [
      {
        type: "p",
        text: "Grover's algorithm amplifies the amplitude of a marked state through repeated iterations of an oracle and a diffusion operator. It provides a quadratic speedup for unstructured search, and by extension for many optimization and cryptanalysis problems.",
      },
      {
        type: "code",
        text: "Iteration count: k ≈ (π/4)√N\n\nEach iteration:\n1. Oracle: mark target with phase flip\n2. Diffusion: reflect about mean amplitude\n\nAfter k iterations, target has high probability.",
      },
      {
        type: "table",
        head: ["Problem", "Classical", "Grover"],
        rows: [
          ["Unstructured search", "O(N)", "O(√N)"],
          ["SAT (n vars)", "O(2ⁿ)", "O(2^{n/2})"],
          ["AES-128 key search", "2¹²⁸", "2⁶⁴"],
          ["Collision finding", "O(N)", "O(N^{1/3})"],
        ],
      },
      {
        type: "insight",
        text: "Grover halves the exponent of brute-force attacks. AES-128 is no longer safe post-quantum; AES-256 is. This is why post-quantum cryptography recommends doubling symmetric key sizes.",
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "Quantum Fourier Transform",
    tagline: "The quantum analog of the discrete Fourier transform",
    insight:
      "QFT is exponentially faster than classical FFT — but you cannot read out all its outputs.",
    demo: "qft",
    content: [
      {
        type: "p",
        text: "The Quantum Fourier Transform maps a state to its Fourier representation using O(n²) gates instead of the classical O(n2ⁿ). It's a subroutine in Shor's algorithm, phase estimation, and many others.",
      },
      {
        type: "code",
        text: "QFT: |x⟩ → (1/√N) Σ_y e^{2πi xy/N} |y⟩\n\nCircuit: H + controlled-phase rotations\n\nn qubits → O(n²) gates",
      },
      {
        type: "insight",
        text: "The QFT doesn't give you the Fourier coefficients — measurement collapses the state. Its power lies in feeding a periodic state in and reading out the period.",
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Shor's Algorithm",
    tagline: "Exponential speedup for factoring — and a threat to RSA",
    insight:
      "Shor factors N in polynomial time. RSA-2048 would fall to a sufficiently large fault-tolerant quantum computer.",
    demo: "shor",
    content: [
      {
        type: "p",
        text: "Shor's algorithm factors integers in polynomial time using quantum phase estimation on the modular exponentiation function. It reduces factoring to period-finding, which the QFT solves efficiently.",
      },
      {
        type: "code",
        text: "1. Pick random a < N\n2. Compute gcd(a, N) — done if > 1\n3. Find period r of f(x) = a^x mod N\n   (using QFT / phase estimation)\n4. If r even and a^{r/2} ≠ −1, then\n   gcd(a^{r/2} ± 1, N) are factors",
      },
      {
        type: "table",
        head: ["Key Size", "Classical", "Shor"],
        rows: [
          ["RSA-2048", "~10²⁰ years", "Hours–days*"],
          ["RSA-4096", "~10³⁰ years", "Days*"],
          ["ECC-256", "~10²⁰ years", "Hours*"],
        ],
      },
      {
        type: "insight",
        text: "*Estimates assume a fault-tolerant quantum computer with millions of physical qubits. Today's devices have hundreds to thousands. The threat is real but the timeline is uncertain.",
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "Quantum Phase Estimation",
    tagline: "Extracting eigenvalues — the workhorse subroutine",
    insight:
      "Phase estimation underpins Shor, HHL, and quantum simulation. It is the most important primitive in quantum algorithms.",
    demo: "qpe",
    content: [
      {
        type: "p",
        text: "Quantum Phase Estimation (QPE) estimates the eigenvalue e^{2πiφ} of a unitary U given eigenvector |u⟩. It uses the QFT to convert phase information into a measurable bit string.",
      },
      {
        type: "code",
        text: "Input:  U, |u⟩ with U|u⟩ = e^{2πiφ}|u⟩\nOutput: estimate of φ to n bits\n\n1. Prepare n ancilla in |+⟩\n2. Apply controlled-U^{2^k}\n3. Apply inverse QFT\n4. Measure ancilla",
      },
      {
        type: "insight",
        text: "QPE is precise only if φ can be represented in n bits. For arbitrary φ, the algorithm returns a good approximation with high probability.",
      },
    ],
  },
  {
    n: 20,
    part: 6,
    title: "Quantum Complexity Classes",
    tagline: "BQP, QMA, and where quantum sits",
    insight:
      "BQP is the class of problems solvable in polynomial time on a quantum computer with bounded error.",
    demo: "complexity",
    content: [
      {
        type: "p",
        text: "Quantum complexity theory classifies problems by the resources needed to solve them quantumly. Key classes: BQP (bounded-error quantum polynomial time), QMA (quantum Merlin-Arthur, the quantum analog of NP).",
      },
      {
        type: "table",
        head: ["Class", "Meaning"],
        rows: [
          ["P", "Classical poly-time"],
          ["NP", "Classical poly-time verifiable"],
          ["BPP", "Classical poly-time, bounded error"],
          ["BQP", "Quantum poly-time, bounded error"],
          ["QMA", "Quantum poly-time verifiable"],
          ["QMA-hard", "As hard as any QMA problem"],
        ],
      },
      {
        type: "insight",
        text: "P ⊆ BPP ⊆ BQP ⊆ PSPACE. BQP is believed to strictly contain BPP (quantum is more powerful) but to not contain NP-complete problems.",
      },
    ],
  },
  {
    n: 21,
    part: 6,
    title: "What Quantum Can't Do",
    tagline: "The limits — and why most problems don't speed up",
    insight:
      "Quantum provides speedups for a narrow class of structured problems. It is not a general-purpose accelerator.",
    content: [
      {
        type: "p",
        text: "Quantum computers do not speed up all problems. They don't provide a general speedup for NP-complete problems, machine learning (in the general case), or most everyday computation. The known speedups come from specific structure: periodicity, symmetry, interference.",
      },
      {
        type: "table",
        head: ["Claim", "Reality"],
        rows: [
          ["Quantum breaks all crypto", "Only public-key (RSA, ECC); symmetric is halved"],
          ["Quantum speeds up ML", "Only for specific linear algebra under strong assumptions"],
          ["Quantum replaces classical", "Complementary — classical orchestrates quantum"],
          ["Quantum solves NP-hard", "No general proof; believed not"],
        ],
      },
      {
        type: "insight",
        text: "A useful heuristic: if a problem has exploitable structure (periodicity, symmetry, linear algebra), quantum may help. If it's unstructured search, you get at best a quadratic speedup.",
      },
    ],
  },
  {
    n: 22,
    part: 7,
    title: "Why Error Correction Is Necessary",
    tagline: "Physical qubits are too noisy for long algorithms",
    insight:
      "Noise accumulates exponentially. Without error correction, useful quantum algorithms are impossible.",
    demo: "whyec",
    content: [
      {
        type: "p",
        text: "Physical qubits have error rates of 10⁻³ to 10⁻⁴ per gate. A useful algorithm needs thousands of gates. Without correction, error compounds until the answer is noise. Quantum Error Correction (QEC) encodes logical qubits across many physical qubits.",
      },
      {
        type: "code",
        text: "Without QEC:\n  P(success) ≈ (1 − ε)^g\n  g = 1000 gates, ε = 10⁻³ → 37% success\n\nWith QEC:\n  Logical error rate suppressed exponentially\n  in code distance d",
      },
      {
        type: "insight",
        text: "The No-Cloning Theorem says you can't copy a qubit. QEC works around this by spreading information across entangled qubits — no single qubit holds the full state.",
      },
    ],
  },
  {
    n: 23,
    part: 7,
    title: "Stabilizer Codes",
    tagline: "Detecting errors without measuring the state",
    insight:
      "Stabilizer codes measure parities, not values — detecting errors without collapsing the logical state.",
    demo: "stabilizer",
    content: [
      {
        type: "p",
        text: "Stabilizer codes encode logical qubits in a subspace defined by stabilizer operators. Measuring stabilizers reveals error syndromes without disturbing the encoded information.",
      },
      {
        type: "code",
        text: "Bit-flip code (3 qubits):\n  |0⟩_L = |000⟩\n  |1⟩_L = |111⟩\n\nStabilizers: Z₁Z₂, Z₂Z₃\n\nSyndrome:\n  00 → no error\n  10 → qubit 1 flipped\n  11 → qubit 2 flipped\n  01 → qubit 3 flipped",
      },
      {
        type: "insight",
        text: "The 3-qubit code detects any single bit-flip and corrects it. The 9-qubit Shor code corrects any single-qubit error (bit and phase flip).",
      },
    ],
  },
  {
    n: 24,
    part: 7,
    title: "Surface Codes & Threshold",
    tagline: "The leading candidate for fault-tolerant quantum computing",
    insight:
      "Below threshold, adding more qubits makes the logical qubit more reliable. Above threshold, it makes it worse.",
    demo: "surface",
    content: [
      {
        type: "p",
        text: "Surface codes place physical qubits on a 2D grid and measure local stabilizers repeatedly. The logical error rate falls exponentially with code distance d, provided the physical error rate is below a threshold (typically ~1%).",
      },
      {
        type: "code",
        text: "Logical error ≈ (p / p_th)^{(d+1)/2}\n\n  p = physical error rate\n  p_th ≈ 1% (surface code threshold)\n  d = code distance\n\nExample: p = 0.1%, p_th = 1%\n  d = 5:  (~0.1)^3 ≈ 10⁻³\n  d = 15: (~0.1)^8 ≈ 10⁻⁸",
      },
      {
        type: "insight",
        text: "To factor RSA-2048 with surface codes, estimates range from 10⁶ to 10⁹ physical qubits running for days to weeks. Today's devices have ~10³ qubits.",
      },
    ],
  },
  {
    n: 25,
    part: 8,
    title: "Superconducting Qubits",
    tagline: "The leading modality — fast gates, cryogenic",
    insight:
      "IBM, Google, and Rigetti use superconducting circuits operating at ~10 mK, with nanosecond gate times.",
    demo: "superconducting",
    content: [
      {
        type: "p",
        text: "Superconducting qubits are macroscopic circuits (Josephson junctions) operating near absolute zero. They are fast (ns gates), scalable via lithography, and the most mature platform — but require dilution refrigerators and have limited connectivity.",
      },
      {
        type: "table",
        head: ["Property", "Value"],
        rows: [
          ["Operating temp", "10–20 mK"],
          ["Gate time", "10–100 ns"],
          ["Coherence (T2)", "100 μs – 1 ms"],
          ["2Q fidelity", "99.5–99.9%"],
          ["Connectivity", "Nearest neighbor (grid)"],
        ],
      },
      {
        type: "insight",
        text: "Google's 2019 'quantum supremacy' demonstration used a 53-qubit superconducting chip. IBM's roadmap targets >100,000 qubits by 2033.",
      },
    ],
  },
  {
    n: 26,
    part: 8,
    title: "Trapped Ions",
    tagline: "Slow but precise — the fidelity leader",
    insight:
      "Trapped ions offer the highest gate fidelities and all-to-all connectivity, at the cost of slower gates.",
    content: [
      {
        type: "p",
        text: "Trapped-ion qubits use individual ions held in electromagnetic traps, manipulated by lasers. They achieve the highest fidelities, longest coherence times, and all-to-all connectivity, but gates are ~1000× slower than superconducting.",
      },
      {
        type: "table",
        head: ["Property", "Value"],
        rows: [
          ["Operating temp", "Room (trap) + cryo (detector)"],
          ["Gate time", "1–100 μs"],
          ["Coherence (T2)", "Seconds to minutes"],
          ["2Q fidelity", "99.9%+"],
          ["Connectivity", "All-to-all (within trap)"],
        ],
      },
    ],
  },
  {
    n: 27,
    part: 8,
    title: "Photonic Qubits",
    tagline: "Room temperature, telecom-ready, hard to make interact",
    insight:
      "Photons are ideal for communication but hard to entangle deterministically for computation.",
    content: [
      {
        type: "p",
        text: "Photonic qubits use single photons encoded in polarization, path, or time-bin. They operate at room temperature and transmit over fiber, but two-qubit gates are probabilistic or require measurement-based schemes.",
      },
      {
        type: "table",
        head: ["Property", "Value"],
        rows: [
          ["Operating temp", "Room"],
          ["Gate time", "ps – ns"],
          ["Coherence", "Effectively infinite"],
          ["2Q fidelity", "99%+ (heralded)"],
          ["Connectivity", "Anywhere (fiber)"],
        ],
      },
      {
        type: "insight",
        text: "PsiQuantum and Xanadu are pursuing photonic approaches. The measurement-based (cluster-state) model is natural for photonics.",
      },
    ],
  },
  {
    n: 28,
    part: 8,
    title: "Neutral Atoms & Others",
    tagline: "The rapidly maturing newcomer",
    insight:
      "Neutral atoms offer large qubit counts and reconfigurable connectivity via optical tweezers.",
    demo: "modalities",
    content: [
      {
        type: "p",
        text: "Neutral atoms held in optical tweezers can be arranged in arbitrary geometries, offering large qubit counts and reconfigurable connectivity. Rydberg interactions create entangling gates. Quantum advantage was demonstrated in 2023–2024.",
      },
      {
        type: "table",
        head: ["Modality", "Strength", "Weakness"],
        rows: [
          ["Superconducting", "Fast, mature", "Cryo, connectivity"],
          ["Trapped ion", "Fidelity, all-to-all", "Slow"],
          ["Photonic", "Room temp, network", "Hard 2Q gates"],
          ["Neutral atom", "Scale, reconfigurable", "Gate speed"],
          ["Topological", "Built-in protection", "Unproven"],
          ["NV center", "Room temp, sensing", "Scaling"],
        ],
      },
    ],
  },
  {
    n: 29,
    part: 9,
    title: "Quantum Programming Models",
    tagline: "Circuit, annealing, measurement-based, analog",
    insight:
      "The circuit model dominates, but other models are natural for specific hardware.",
    content: [
      {
        type: "p",
        text: "Quantum programming comes in several models: gate-based circuits (universal), adiabatic/annealing (optimization), measurement-based (photonic), and analog simulation. Most SDKs target the circuit model.",
      },
      {
        type: "table",
        head: ["Model", "Use Case", "Examples"],
        rows: [
          ["Circuit", "General", "Qiskit, Cirq, PennyLane"],
          ["Annealing", "Optimization", "D-Wave"],
          ["Measurement-based", "Photonic", "Xanadu"],
          ["Analog", "Simulation", "ColdQuanta, QuEra"],
        ],
      },
    ],
  },
  {
    n: 30,
    part: 9,
    title: "SDKs & Frameworks",
    tagline: "Qiskit, Cirq, PennyLane, Q# — the developer toolkit",
    insight:
      "The SDK ecosystem is fragmenting less than it once did; interop is improving via OpenQASM.",
    demo: "sdk",
    content: [
      {
        type: "p",
        text: "Quantum SDKs provide circuit construction, simulation, transpilation, and access to hardware. They differ in abstraction level, hardware targets, and language. OpenQASM 3 is emerging as a portable intermediate representation.",
      },
      {
        type: "table",
        head: ["SDK", "Vendor", "Strength"],
        rows: [
          ["Qiskit", "IBM", "Largest ecosystem, hardware access"],
          ["Cirq", "Google", "Precise control, NISQ focus"],
          ["PennyLane", "Xanadu", "Quantum ML, autodiff"],
          ["Q# / Azure Quantum", "Microsoft", "High-level language, resource estimation"],
          ["Braket", "AWS", "Multi-vendor access"],
        ],
      },
      {
        type: "code",
        text: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()",
      },
    ],
  },
  {
    n: 31,
    part: 9,
    title: "Simulating Quantum Computers",
    tagline: "Why simulators matter — and where they fail",
    insight:
      "Classical simulation is essential for development but scales exponentially. ~50 qubits is the practical limit.",
    demo: "simulator",
    content: [
      {
        type: "p",
        text: "Quantum simulators run on classical hardware, allowing development without quantum hardware access. State-vector simulation requires 2ⁿ complex amplitudes — 50 qubits is ~16 PB of RAM. Tensor network methods extend this for low-entanglement circuits.",
      },
      {
        type: "table",
        head: ["Method", "Scales To", "Notes"],
        rows: [
          ["State vector", "~30–40 qubits", "Exact, memory-bound"],
          ["Density matrix", "~20 qubits", "Includes noise"],
          ["Tensor network", "~100+ qubits", "Low entanglement only"],
          ["Stabilizer", "1000s", "Clifford-only circuits"],
        ],
      },
    ],
  },
  {
    n: 32,
    part: 10,
    title: "Quantum Chemistry & Simulation",
    tagline: "The most likely near-term application",
    insight:
      "Feynman's original motivation: simulate quantum systems with quantum computers.",
    demo: "chemistry",
    content: [
      {
        type: "p",
        text: "Quantum simulation of molecules and materials is the most compelling near-term application. Classical methods scale exponentially; quantum computers can represent quantum states naturally.",
      },
      {
        type: "table",
        head: ["Application", "Potential Impact"],
        rows: [
          ["Catalyst design", "Fertilizer, fuel cells"],
          ["Drug discovery", "Protein-ligand binding"],
          ["Battery materials", "Higher energy density"],
          ["Superconductors", "Room-temp discovery"],
        ],
      },
      {
        type: "insight",
        text: "VQE (Variational Quantum Eigensolver) is the leading NISQ-era approach — hybrid quantum-classical optimization. It has been applied to small molecules (H₂, LiH, BeH₂) but has not yet beaten classical methods on useful problems.",
      },
    ],
  },
  {
    n: 33,
    part: 10,
    title: "Quantum Machine Learning",
    tagline: "Promise, hype, and reality",
    insight:
      "QML offers provable speedups for specific linear algebra. For general ML, the advantage is unproven.",
    demo: "qml",
    content: [
      {
        type: "p",
        text: "Quantum machine learning (QML) applies quantum algorithms to ML tasks: quantum kernels, variational classifiers, quantum neural networks. Provable speedups exist for linear algebra (HHL), but loading classical data into quantum states is a bottleneck.",
      },
      {
        type: "table",
        head: ["Method", "Claim", "Reality"],
        rows: [
          ["HHL", "Exponential for linear systems", "Requires qRAM; strong conditions"],
          ["Quantum kernels", "Better kernels", "Data loading bottleneck"],
          ["VQE classifiers", "Parameterized circuits", "Barren plateaus, trainability"],
          ["Quantum RL", "Faster exploration", "Early stage"],
        ],
      },
      {
        type: "insight",
        text: "The 'quantum advantage' for ML is often measured against a weak classical baseline. Rigorous comparisons usually erase the advantage. QML is a research frontier, not a production tool.",
      },
    ],
  },
  {
    n: 34,
    part: 10,
    title: "Post-Quantum Cryptography",
    tagline: "Preparing for the day Shor's algorithm works",
    insight:
      "Harvest now, decrypt later is already happening. Migration to PQC is a decade-long project that starts now.",
    demo: "pqc",
    content: [
      {
        type: "p",
        text: "Post-quantum cryptography (PQC) is classical cryptography designed to resist quantum attacks. NIST standardized the first algorithms in 2024: ML-KEM (Kyber) for key exchange and ML-DSA (Dilithium) for signatures.",
      },
      {
        type: "table",
        head: ["Category", "Algorithm", "Standard"],
        rows: [
          ["Key encapsulation", "ML-KEM (Kyber)", "FIPS 203"],
          ["Signatures", "ML-DSA (Dilithium)", "FIPS 204"],
          ["Signatures (small)", "Falcon", "Draft"],
          ["Hash-based signatures", "SPHINCS+", "FIPS 205"],
        ],
      },
      {
        type: "insight",
        text: "Symmetric crypto (AES-256, SHA-384) survives quantum with larger key sizes. Only public-key crypto (RSA, ECC, DH) is broken by Shor. Migrate hybrid (classical + PQC) for safety.",
      },
    ],
  },
  {
    n: 35,
    part: 10,
    title: "The Quantum Frontier",
    tagline: "Where the field is heading",
    insight:
      "The next decade is about error correction, not qubit count. Fault tolerance is the dividing line.",
    content: [
      {
        type: "table",
        head: ["Frontier", "Description", "Status"],
        rows: [
          ["Fault tolerance", "Logical qubits below threshold", "Early demonstrations"],
          ["Quantum networks", "Entanglement distribution", "Metro-scale"],
          ["Quantum advantage (useful)", "Beating classical on real problems", "Not yet"],
          ["Post-quantum migration", "Replacing RSA/ECC", "Active, urgent"],
          ["Hybrid quantum-classical", "Variational and embedding", "Mainstream NISQ"],
          ["Quantum sensing", "Beyond computing", "Already commercial"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: error correction + hardware scaling + hybrid algorithms + PQC migration + quantum networking. Quantum is becoming engineering, not just physics.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes quantum computing?",
      opts: [
        "A faster classical computer",
        "A different model of computation that exploits superposition and interference",
        "A type of GPU",
        "A cloud service",
      ],
      ans: 1,
      exp: "Quantum computing is not faster at everything. It's a fundamentally different model that uses quantum interference to amplify correct answers and cancel wrong ones for specific problem classes.",
    },
    {
      q: "For which problems is quantum likely to help?",
      opts: [
        "Any problem, given enough qubits",
        "Problems with exploitable structure — periodicity, symmetry, linear algebra",
        "Only NP-complete problems",
        "Only machine learning",
      ],
      ans: 1,
      exp: "Quantum speedups come from exploiting structure via interference. Unstructured problems get at best a quadratic speedup (Grover). NP-complete problems are believed to have no general quantum speedup.",
    },
  ],
  4: [
    {
      q: "What are the four postulates of quantum mechanics?",
      opts: [
        "Position, momentum, spin, charge",
        "State, unitary evolution, measurement, composition",
        "Bit, qubit, gate, circuit",
        "Wave, particle, field, force",
      ],
      ans: 1,
      exp: "The four postulates define: (1) state as a unit vector, (2) closed-system evolution via unitary operators, (3) probabilistic measurement with collapse, (4) composite systems via tensor products.",
    },
    {
      q: "Why must quantum evolution be unitary?",
      opts: [
        "To preserve probability — total probability must sum to 1",
        "To make computation faster",
        "Because of Heisenberg's uncertainty principle",
        "Because qubits are small",
      ],
      ans: 0,
      exp: "Unitary operators preserve inner products, hence probability. If evolution were non-unitary, probability would not sum to 1 — states would 'leak.'",
    },
  ],
  6: [
    {
      q: "What is a Bell state?",
      opts: [
        "A single-qubit superposition",
        "A maximally entangled two-qubit state like (|00⟩ + |11⟩)/√2",
        "A measurement outcome",
        "A type of quantum gate",
      ],
      ans: 1,
      exp: "A Bell state is a maximally entangled pair. (|00⟩ + |11⟩)/√2 cannot be written as a product of individual qubit states. Measuring one qubit immediately determines the other.",
    },
    {
      q: "Can entanglement transmit information faster than light?",
      opts: [
        "Yes, if the qubits are entangled",
        "No — you still need a classical channel to interpret results",
        "Only with three or more qubits",
        "Only in theory",
      ],
      ans: 1,
      exp: "Entanglement creates correlations, but each party only sees random outcomes. Interpreting them requires comparing results via a classical channel — which is limited by the speed of light.",
    },
  ],
  8: [
    {
      q: "What is a qubit?",
      opts: [
        "A classical bit that can be 0 and 1 simultaneously",
        "A two-level quantum system whose state is a unit vector in a 2D complex space",
        "A small transistor",
        "A type of logic gate",
      ],
      ans: 1,
      exp: "A qubit is any system with two distinguishable states. Its general state is α|0⟩ + β|1⟩ with |α|² + |β|² = 1. After removing global phase, it has two real parameters — the Bloch sphere.",
    },
    {
      q: "How many real parameters describe a single qubit state (up to global phase)?",
      opts: ["1", "2", "3", "4"],
      ans: 1,
      exp: "After removing the unobservable global phase, a qubit has two real degrees of freedom: θ and φ — the polar and azimuthal angles on the Bloch sphere.",
    },
  ],
  16: [
    {
      q: "What speedup does Grover's algorithm provide?",
      opts: ["Exponential", "Quadratic (√N vs N)", "Cubic", "No speedup"],
      ans: 1,
      exp: "Grover's algorithm finds a marked item in O(√N) queries vs O(N) classically. This is a quadratic speedup — significant but not exponential.",
    },
    {
      q: "Why is Grover relevant to cryptography?",
      opts: [
        "It breaks AES-256",
        "It halves the effective key length of symmetric ciphers, so AES-128 becomes as weak as AES-64 against quantum",
        "It breaks RSA",
        "It only affects hash functions",
      ],
      ans: 1,
      exp: "Grover halves the exponent for brute-force key search. AES-128 drops to 2⁶⁴ — borderline; AES-256 remains safe. This is why symmetric key sizes should be doubled for quantum safety.",
    },
  ],
  18: [
    {
      q: "What does Shor's algorithm do?",
      opts: [
        "Searches unstructured databases",
        "Factors integers in polynomial time by reducing to period-finding",
        "Simulates molecules",
        "Solves NP-complete problems",
      ],
      ans: 1,
      exp: "Shor's algorithm reduces factoring to period-finding, then uses the Quantum Fourier Transform to find the period efficiently. This breaks RSA, ECC, and Diffie-Hellman.",
    },
    {
      q: "Which cryptographic systems does Shor's algorithm break?",
      opts: [
        "AES-256 and SHA-3",
        "Public-key systems based on factoring or discrete log: RSA, ECC, DH",
        "All cryptography",
        "Only blockchain",
      ],
      ans: 1,
      exp: "Shor breaks public-key crypto that relies on factoring (RSA) or discrete log (ECC, DH). Symmetric crypto (AES) and hashes (SHA) survive with larger keys.",
    },
  ],
  24: [
    {
      q: "What is the surface code threshold?",
      opts: [
        "The maximum number of qubits",
        "The physical error rate (~1%) below which adding more qubits improves the logical error rate",
        "The time to run an algorithm",
        "The gate fidelity required for universality",
      ],
      ans: 1,
      exp: "Below threshold (~1% for the surface code), increasing the code distance d suppresses logical errors exponentially: ~(p/p_th)^{(d+1)/2}. Above threshold, more qubits make things worse.",
    },
    {
      q: "Why is quantum error correction necessary?",
      opts: [
        "To make qubits faster",
        "Physical qubits are noisy, and errors compound exponentially over thousands of gates",
        "To reduce cost",
        "To improve connectivity",
      ],
      ans: 1,
      exp: "Physical error rates of 10⁻³–10⁻⁴ per gate compound rapidly over long algorithms. Without QEC, a 1000-gate algorithm has a low success probability. QEC encodes logical qubits across many physical qubits to suppress errors.",
    },
  ],
  34: [
    {
      q: "What is post-quantum cryptography?",
      opts: [
        "Cryptography that runs on quantum computers",
        "Classical cryptography designed to resist quantum attacks",
        "Cryptography that uses qubits",
        "Old cryptography",
      ],
      ans: 1,
      exp: "PQC is classical crypto designed to resist attacks from both classical and quantum computers. NIST standardized ML-KEM (Kyber) and ML-DSA (Dilithium) in 2024.",
    },
    {
      q: "Why should organizations migrate to PQC now?",
      opts: [
        "Because quantum computers are already here",
        "Because 'harvest now, decrypt later' attacks mean data encrypted today can be decrypted later",
        "Because RSA is broken today",
        "Because of compliance only",
      ],
      ans: 1,
      exp: "Adversaries can capture encrypted traffic today and decrypt it once quantum computers are powerful enough. For long-lived sensitive data, migration is a decade-long project that should begin now.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Amplitude", def: "A complex number whose squared magnitude gives measurement probability. Amplitudes can interfere; probabilities cannot.", ch: 3 },
  { term: "Ancilla", def: "An auxiliary qubit used in a quantum circuit, typically reset or discarded after use.", ch: 14 },
  { term: "Bell State", def: "A maximally entangled two-qubit state, e.g., (|00⟩ + |11⟩)/√2. Cannot be factored into individual qubit states.", ch: 6 },
  { term: "Bloch Sphere", def: "A geometric representation of a single-qubit state as a point on a unit sphere. Two angles (θ, φ) fully specify the state up to global phase.", ch: 8 },
  { term: "BQP", def: "Bounded-error Quantum Polynomial time. The class of problems a quantum computer can solve in polynomial time with high probability.", ch: 20 },
  { term: "Circuit Model", def: "Model of quantum computation as a sequence of gates applied to qubits, followed by measurement.", ch: 12 },
  { term: "CNOT", def: "Controlled-NOT gate. Flips the target qubit if the control is |1⟩. The workhorse entangling gate.", ch: 10 },
  { term: "Coherence", def: "The time over which a qubit maintains its quantum state. Limited by T1 (relaxation) and T2 (dephasing).", ch: 7 },
  { term: "Decoherence", def: "Loss of quantum information due to interaction with the environment. The central engineering challenge.", ch: 7 },
  { term: "Deutsch–Jozsa", def: "The first quantum algorithm proving exponential advantage over classical for a specific oracle problem.", ch: 15 },
  { term: "Dirac Notation", def: "Bra-ket notation: |ψ⟩ is a ket (state); ⟨ψ| is a bra (dual). Compact language of quantum mechanics.", ch: 2 },
  { term: "Entanglement", def: "Non-classical correlation between qubits. A resource for algorithms, error correction, and communication.", ch: 6 },
  { term: "Grover's Algorithm", def: "Quadratic speedup for unstructured search: O(√N) vs O(N). Relevant to symmetric cryptanalysis.", ch: 16 },
  { term: "Hadamard Gate", def: "The gate that creates superposition: |0⟩ → (|0⟩ + |1⟩)/√2. Essential in nearly every quantum algorithm.", ch: 9 },
  { term: "HHL", def: "Harrow-Hassidim-Lloyd algorithm. Exponential speedup for linear systems under strong conditions (sparse, well-conditioned, qRAM).", ch: 33 },
  { term: "Interference", def: "Amplitudes adding and cancelling like waves. The source of quantum speedups.", ch: 5 },
  { term: "Logical Qubit", def: "An error-corrected qubit encoded across many physical qubits.", ch: 24 },
  { term: "Measurement", def: "Extracting classical information from a qubit. Collapses the superposition to a basis state probabilistically.", ch: 7 },
  { term: "ML-KEM", def: "Module-Lattice Key Encapsulation Mechanism (formerly Kyber). NIST-standardized post-quantum KEM (FIPS 203).", ch: 34 },
  { term: "ML-DSA", def: "Module-Lattice Digital Signature Algorithm (formerly Dilithium). NIST-standardized PQC signature (FIPS 204).", ch: 34 },
  { term: "No-Cloning Theorem", def: "An unknown quantum state cannot be copied exactly. Fundamental to quantum cryptography and error correction.", ch: 22 },
  { term: "NISQ", def: "Noisy Intermediate-Scale Quantum. The current era of 50–1000 qubit devices without full error correction.", ch: 25 },
  { term: "Oracle", def: "A black-box unitary U_f encoding a classical function. Used in query-complexity analysis.", ch: 13 },
  { term: "Phase Estimation", def: "Quantum algorithm that extracts eigenvalues of a unitary. Underpins Shor and many others.", ch: 19 },
  { term: "Physical Qubit", def: "A qubit as realized in hardware — superconducting, ion, photonic, or atomic. Subject to noise.", ch: 25 },
  { term: "Post-Quantum Cryptography", def: "Classical cryptographic algorithms designed to resist quantum attacks. Migrate from RSA/ECC now.", ch: 34 },
  { term: "QFT", def: "Quantum Fourier Transform. O(n²) gates vs classical O(n2ⁿ). Subroutine for Shor and QPE.", ch: 17 },
  { term: "Qubit", def: "A two-level quantum system whose state is a unit vector in a 2D complex space.", ch: 8 },
  { term: "Shor's Algorithm", def: "Polynomial-time factoring via period-finding. Breaks RSA, ECC, and Diffie-Hellman.", ch: 18 },
  { term: "Stabilizer Code", def: "QEC code defined by Pauli stabilizers. Detects errors via parity measurements without disturbing logical state.", ch: 23 },
  { term: "Superposition", def: "A qubit state that is a linear combination of |0⟩ and |1⟩. Alone, not a speedup — interference is.", ch: 5 },
  { term: "Surface Code", def: "Leading QEC candidate. 2D grid of qubits; logical error rate falls exponentially with code distance below threshold.", ch: 24 },
  { term: "T Gate", def: "The π/4 phase gate. Adds universality to the Clifford group; expensive under error correction.", ch: 11 },
  { term: "Unitary", def: "A matrix U such that U†U = I. Every quantum gate is unitary (reversible, probability-preserving).", ch: 1 },
  { term: "VQE", def: "Variational Quantum Eigensolver. Hybrid quantum-classical algorithm for NISQ-era chemistry and optimization.", ch: 32 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 4], [0, 8], [0, 12], [0, 15], [0, 22], [0, 25], [0, 29], [0, 32],
  [1, 2], [1, 3],
  [2, 3], [2, 4],
  [3, 4], [3, 5], [3, 8],
  [4, 5], [4, 6], [4, 7],
  [5, 6], [5, 7], [5, 8], [5, 9],
  [6, 7], [6, 10], [6, 22], [6, 24],
  [7, 8], [7, 22], [7, 23],
  [8, 9], [8, 12],
  [9, 10], [9, 11], [9, 12],
  [10, 11], [10, 12],
  [11, 12], [11, 22],
  [12, 13], [12, 14],
  [13, 15], [13, 16], [13, 18], [13, 19],
  [14, 22], [14, 24],
  [15, 16], [15, 17], [15, 19],
  [16, 20], [16, 21], [16, 34],
  [17, 18], [17, 19],
  [18, 20], [18, 34],
  [19, 20], [19, 32],
  [20, 21],
  [21, 32], [21, 33],
  [22, 23], [22, 24],
  [23, 24],
  [24, 25], [24, 26], [24, 27], [24, 28],
  [25, 26], [25, 27], [25, 28],
  [26, 27], [26, 28],
  [27, 28],
  [28, 35],
  [29, 30], [29, 31],
  [30, 31], [30, 32], [30, 33],
  [31, 32], [31, 33],
  [32, 33], [32, 35],
  [33, 35],
  [34, 35],
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
    { l: "📐 Linear Algebra", d: "Vectors, matrices, complex numbers, tensor products", c: "#60A5FA" },
    { l: "⚛️ Quantum Mechanics", d: "State, measurement, evolution, entanglement", c: "#818CF8" },
    { l: "🔵 Qubits", d: "Two-level systems in superposition", c: "#34D399" },
    { l: "🔗 Quantum Gates", d: "Unitary operations on qubit states", c: "#2DD4BF" },
    { l: "🔀 Circuits", d: "Sequences of gates with measurement", c: "#FBBF24" },
    { l: "⚡ Algorithms", d: "Shor, Grover, QFT, QPE, VQE", c: "#FB923C" },
    { l: "🛡️ Error Correction", d: "Logical qubits from noisy physical qubits", c: "#F87171" },
    { l: "🧊 Hardware", d: "Superconducting, ion, photonic, atom", c: "#A78BFA" },
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

function LinearAlgebraDemo() {
  const [vec, setVec] = useState([0.7, 0.3, 0.6, 0.4]);
  const norm = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2 + vec[3] ** 2);
  const normalized = vec.map((v) => v / norm);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {["|00⟩", "|01⟩", "|10⟩", "|11⟩"].map((label, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
              <span style={{ color: T.muted }}>{label}</span>
              <span style={{ color: T.accent, fontWeight: 700 }}>
                {(normalized[i] ** 2 * 100).toFixed(1)}%
              </span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={vec[i]}
              onChange={(e) => {
                const nv = [...vec];
                nv[i] = +e.target.value;
                setVec(nv);
              }} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <div style={{
        padding: "14px", borderRadius: 10, background: "#020812",
        border: `1px solid ${T.accent}`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.accent,
        wordBreak: "break-all",
      }}>
        |ψ⟩ = {normalized.map((v, i) => `${v.toFixed(3)}|${i.toString(2).padStart(2, "0")}⟩`).join(" + ")}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12 }}>
        Sum of |amplitude|² = {normalized.reduce((a, v) => a + v ** 2, 0).toFixed(3)} (must be 1.000)
      </div>
    </div>
  );
}

function AmplitudesDemo() {
  const [phase1, setPhase1] = useState(0);
  const [phase2, setPhase2] = useState(0);
  const a1 = Math.cos(phase1 * Math.PI / 180);
  const a2 = Math.cos(phase2 * Math.PI / 180);
  const sum = a1 + a2;
  const prob = ((a1 + a2) / 2) ** 2;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Two amplitudes combine. Same phase → reinforce. Opposite phase → cancel.
      </p>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Amplitude A phase</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{phase1}°</span>
        </div>
        <input type="range" min={0} max={360} value={phase1}
          onChange={(e) => setPhase1(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Amplitude B phase</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{phase2}°</span>
        </div>
        <input type="range" min={0} max={360} value={phase2}
          onChange={(e) => setPhase2(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>A</div>
            <div style={{ color: T.blue, fontSize: 18, fontWeight: 800 }}>{a1.toFixed(3)}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>B</div>
            <div style={{ color: T.purple, fontSize: 18, fontWeight: 800 }}>{a2.toFixed(3)}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>A+B</div>
            <div style={{ color: T.accent, fontSize: 18, fontWeight: 800 }}>{sum.toFixed(3)}</div>
          </div>
        </div>
        <div style={{ height: 12, background: T.border, borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            width: `${prob * 100}%`, height: "100%",
            background: prob > 0.7 ? T.green : prob > 0.3 ? T.amber : T.red,
            transition: "width .3s",
          }} />
        </div>
        <div style={{ color: T.text, fontSize: 12 }}>
          Probability of marked outcome: <strong style={{ color: T.accent }}>{(prob * 100).toFixed(1)}%</strong>
        </div>
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Try phase difference = 180° → constructive interference disappears. This is the mechanism Grover and Shor exploit.
      </div>
    </div>
  );
}

function SuperpositionDemo() {
  const [n, setN] = useState(3);
  const states = Math.pow(2, n);
  const labels = Array.from({ length: Math.min(states, 8) }, (_, i) => i.toString(2).padStart(n, "0"));
  const more = states > 8;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        n qubits in equal superposition covers 2ⁿ basis states
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Number of qubits</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{n}</span>
        </div>
        <input type="range" min={1} max={10} value={n}
          onChange={(e) => setN(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, marginBottom: 12,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: T.muted, fontSize: 12 }}>Basis states</span>
          <span style={{ color: T.accent, fontSize: 20, fontWeight: 800 }}>{states.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {labels.map((l, i) => (
            <div key={i} style={{
              padding: "4px 8px", borderRadius: 4,
              background: `${T.accent}22`, border: `1px solid ${T.accent}`,
              color: T.accent, fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
            }}>|{l}⟩</div>
          ))}
          {more && (
            <div style={{
              padding: "4px 8px", borderRadius: 4,
              background: T.elevated, border: `1px solid ${T.border}`,
              color: T.muted, fontSize: 10,
            }}>... {states - 8} more</div>
          )}
        </div>
      </div>
      <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        10 qubits hold 1,024 amplitudes. 50 qubits hold ~10¹⁵. But you can only read out one on measurement — algorithm design is about making the answer probable.
      </div>
    </div>
  );
}

function EntanglementDemo() {
  const [measured, setMeasured] = useState(null);
  const measure = () => {
    const outcome = Math.random() > 0.5 ? 0 : 1;
    setMeasured(outcome);
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Bell state (|00⟩ + |11⟩)/√2 — measuring one qubit determines the other
      </p>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 20 }}>
        {[0, 1].map((q) => (
          <div key={q} style={{ textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: measured !== null ? `${T.accent}22` : T.elevated,
              border: `2px solid ${measured !== null ? T.accent : T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 800,
              color: measured !== null ? T.accent : T.muted,
              marginBottom: 8, transition: "all .3s",
            }}>{measured !== null ? measured : "?"}</div>
            <div style={{ color: T.text, fontSize: 12 }}>Qubit {q}</div>
          </div>
        ))}
      </div>
      <button onClick={measure} style={{
        padding: "10px 24px", borderRadius: 20, background: T.accent,
        color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
        display: "block", margin: "0 auto",
      }}>📏 Measure</button>
      {measured !== null && (
        <div style={{
          marginTop: 14, padding: "12px 16px", borderRadius: 8,
          background: `${T.green}22`, border: `1px solid ${T.green}`,
          color: T.green, fontSize: 12, textAlign: "center",
        }}>
          Both qubits collapsed to |{measured}{measured}⟩ — perfect correlation
        </div>
      )}
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Before measurement, neither qubit has a definite value. After measuring one, the other is instantaneously determined — regardless of distance. But you can't use this for FTL communication.
      </div>
    </div>
  );
}

function DecoherenceDemo() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setTime((t) => (t >= 10 ? 0 : t + 0.1)), 100);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);
  const purity = Math.exp(-time / 3);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Coherence decays exponentially with time
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setRunning(!running)} style={{
          padding: "8px 18px", borderRadius: 20,
          background: running ? T.red : T.green, color: "#000",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>{running ? "⏸ Pause" : "▶ Run"}</button>
        <button onClick={() => { setTime(0); setRunning(false); }} style={{
          padding: "8px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
        }}>↺ Reset</button>
      </div>
      <svg width="100%" height="160" viewBox="0 0 500 160" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={30} y1={140} x2={470} y2={140} stroke={T.border} />
        <line x1={30} y1={20} x2={30} y2={140} stroke={T.border} />
        <polyline
          points={Array.from({ length: 100 }, (_, i) => {
            const t = i / 10;
            return `${30 + t * 44},${140 - Math.exp(-t / 3) * 120}`;
          }).join(" ")}
          fill="none" stroke={T.muted} strokeWidth={1.5} strokeDasharray="4,3" />
        <line x1={30 + time * 44} y1={20} x2={30 + time * 44} y2={140}
          stroke={T.accent} strokeWidth={2} />
        <circle cx={30 + time * 44} cy={140 - purity * 120} r={5} fill={T.accent} />
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">
          Coherence: {(purity * 100).toFixed(1)}%
        </text>
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        T2 is the time constant for phase coherence. Modern superconducting qubits have T2 ~100 μs; trapped ions have seconds. Longer coherence = more gates before error dominates.
      </div>
    </div>
  );
}

function BlochDemo() {
  const [theta, setTheta] = useState(90);
  const [phi, setPhi] = useState(0);
  const toRad = (deg) => (deg * Math.PI) / 180;
  const x = Math.sin(toRad(theta)) * Math.cos(toRad(phi));
  const y = Math.sin(toRad(theta)) * Math.sin(toRad(phi));
  const z = Math.cos(toRad(theta));
  const alpha = Math.cos(toRad(theta) / 2);
  const beta = Math.sin(toRad(theta) / 2);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Adjust θ and φ to explore the Bloch sphere
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { l: "θ (polar)", v: theta, set: setTheta, max: 180 },
          { l: "φ (azimuthal)", v: phi, set: setPhi, max: 360 },
        ].map((s) => (
          <div key={s.l}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: T.muted }}>{s.l}</span>
              <span style={{ color: T.accent, fontWeight: 700 }}>{s.v}°</span>
            </div>
            <input type="range" min={0} max={s.max} value={s.v}
              onChange={(e) => s.set(+e.target.value)} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <ellipse cx={250} cy={130} rx={100} ry={100}
          fill="none" stroke={T.border} strokeWidth={1} />
        <ellipse cx={250} cy={130} rx={100} ry={30}
          fill="none" stroke={T.border} strokeWidth={1} strokeDasharray="3,3" />
        <line x1={150} y1={130} x2={350} y2={130} stroke={T.border} />
        <line x1={250} y1={30} x2={250} y2={230} stroke={T.border} />
        <line x1={250} y1={130} x2={350} y2={130} stroke={T.border} strokeWidth={0.5} />
        <text x={250} y={25} textAnchor="middle" fill={T.green} fontSize="11" fontWeight="700">|0⟩</text>
        <text x={250} y={245} textAnchor="middle" fill={T.red} fontSize="11" fontWeight="700">|1⟩</text>
        <text x={360} y={132} fill={T.blue} fontSize="10">X</text>
        <text x={250} y={100} textAnchor="middle" fill={T.muted} fontSize="9">Z</text>
        <circle cx={250} cy={30} r={4} fill={T.green} />
        <circle cx={250} cy={230} r={4} fill={T.red} />
        <line x1={250} y1={130} x2={250 + x * 100} y2={130 - z * 100}
          stroke={T.accent} strokeWidth={3} />
        <circle cx={250 + x * 100} cy={130 - z * 100} r={8} fill={T.accent} />
        <text x={250 + x * 100 + 12} y={130 - z * 100} fill={T.accent} fontSize="12" fontWeight="700">
          |ψ⟩
        </text>
      </svg>
      <div style={{
        marginTop: 12, padding: "12px 16px", borderRadius: 10,
        background: T.surface, border: `1px solid ${T.border}`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.accent,
      }}>
        {`|ψ⟩ = ${alpha.toFixed(3)}|0⟩ + ${beta.toFixed(3)}e^{i·${(phi * Math.PI / 180).toFixed(2)}}|1⟩`}
      </div>
    </div>
  );
}

function Gates1QDemo() {
  const [input, setInput] = useState("0");
  const [gate, setGate] = useState("H");
  const gates = {
    X: { name: "X (bit flip)", result: input === "0" ? "1" : "0", desc: "Flips |0⟩ ↔ |1⟩" },
    Z: { name: "Z (phase flip)", result: input === "0" ? "0" : "−1", desc: "Adds −1 phase to |1⟩" },
    H: { name: "H (Hadamard)", result: input === "0" ? "(|0⟩+|1⟩)/√2" : "(|0⟩−|1⟩)/√2", desc: "Creates superposition" },
    S: { name: "S (phase π/2)", result: input === "0" ? "0" : "i·1", desc: "Adds i phase to |1⟩" },
    T: { name: "T (phase π/4)", result: input === "0" ? "0" : "e^{iπ/4}·1", desc: "Adds e^{iπ/4} phase to |1⟩" },
  };
  const g = gates[gate];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {["0", "1"].map((s) => (
          <button key={s} onClick={() => setInput(s)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${input === s ? T.accent : T.border}`,
            background: input === s ? `${T.accent}22` : "transparent",
            color: input === s ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>|{s}⟩</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.keys(gates).map((k) => (
          <button key={k} onClick={() => setGate(k)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${gate === k ? T.purple : T.border}`,
            background: gate === k ? `${T.purple}22` : "transparent",
            color: gate === k ? T.purple : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{k}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.purple}`, textAlign: "center",
      }}>
        <div style={{ color: T.purple, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{g.name}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 16,
          color: T.text, marginBottom: 8,
        }}>
          |{input}⟩ → {g.result}
        </div>
        <div style={{ color: T.muted, fontSize: 12 }}>{g.desc}</div>
      </div>
    </div>
  );
}

function Gates2QDemo() {
  const [c, setC] = useState("0");
  const [t, setT] = useState("0");
  const output = c === "1" ? (t === "0" ? "1" : "0") : t;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        CNOT: target flips when control is |1⟩
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ color: T.blue, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>CONTROL</div>
          {["0", "1"].map((s) => (
            <button key={s} onClick={() => setC(s)} style={{
              display: "block", width: "100%", marginBottom: 6,
              padding: "8px", borderRadius: 8,
              border: `1px solid ${c === s ? T.blue : T.border}`,
              background: c === s ? `${T.blue}22` : "transparent",
              color: c === s ? T.blue : T.muted,
              cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}>|{s}⟩</button>
          ))}
        </div>
        <div>
          <div style={{ color: T.green, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TARGET</div>
          {["0", "1"].map((s) => (
            <button key={s} onClick={() => setT(s)} style={{
              display: "block", width: "100%", marginBottom: 6,
              padding: "8px", borderRadius: 8,
              border: `1px solid ${t === s ? T.green : T.border}`,
              background: t === s ? `${T.green}22` : "transparent",
              color: t === s ? T.green : T.muted,
              cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}>|{s}⟩</button>
          ))}
        </div>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, textAlign: "center",
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: T.accent }}>
          CNOT|{c}{t}⟩ = |{c}{output}⟩
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        CNOT plus single-qubit gates generates any unitary. This is the reason CNOT is universal alongside H, T, S.
      </div>
    </div>
  );
}

function CircuitDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Initialize", desc: "Start with |00⟩" },
    { label: "Apply H", desc: "Superposition on qubit 0: (|0⟩+|1⟩)/√2" },
    { label: "Apply CNOT", desc: "Entangles: (|00⟩+|11⟩)/√2 — a Bell state" },
    { label: "Measure", desc: "Outcome is |00⟩ or |11⟩ with 50% each" },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${step === i ? T.accent : T.border}`,
            background: step === i ? `${T.accent}22` : "transparent",
            color: step === i ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {s.label}</button>
        ))}
      </div>
      <svg width="100%" height="160" viewBox="0 0 500 160" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <text x={30} y={55} fill={T.text} fontSize="12">q0</text>
        <text x={30} y={105} fill={T.text} fontSize="12">q1</text>
        <line x1={60} y1={50} x2={470} y2={50} stroke={T.border} strokeWidth={2} />
        <line x1={60} y1={100} x2={470} y2={100} stroke={T.border} strokeWidth={2} />

        {step >= 1 && (
          <g>
            <rect x={100} y={35} width={36} height={30} rx={4}
              fill={`${T.accent}33`} stroke={T.accent} strokeWidth={2} />
            <text x={118} y={55} textAnchor="middle" fill={T.accent} fontSize="14" fontWeight="700">H</text>
          </g>
        )}
        {step >= 2 && (
          <g>
            <line x1={220} y1={50} x2={220} y2={100} stroke={T.purple} strokeWidth={2} />
            <circle cx={220} cy={50} r={6} fill={T.purple} />
            <circle cx={220} cy={100} r={10} fill="none" stroke={T.purple} strokeWidth={2} />
            <line x1={210} y1={100} x2={230} y2={100} stroke={T.purple} strokeWidth={2} />
            <line x1={220} y1={90} x2={220} y2={110} stroke={T.purple} strokeWidth={2} />
          </g>
        )}
        {step >= 3 && (
          <g>
            <rect x={330} y={35} width={36} height={30} rx={4}
              fill={`${T.green}33`} stroke={T.green} strokeWidth={2} />
            <text x={348} y={55} textAnchor="middle" fill={T.green} fontSize="12" fontWeight="700">M</text>
            <rect x={330} y={85} width={36} height={30} rx={4}
              fill={`${T.green}33`} stroke={T.green} strokeWidth={2} />
            <text x={348} y={105} textAnchor="middle" fill={T.green} fontSize="12" fontWeight="700">M</text>
          </g>
        )}
      </svg>
      <div style={{
        marginTop: 12, padding: "12px 16px", borderRadius: 10,
        background: T.surface, border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{steps[step].label}</div>
        <div style={{ color: T.subtle, fontSize: 12 }}>{steps[step].desc}</div>
      </div>
    </div>
  );
}

function OracleDemo() {
  const [f, setF] = useState([0, 0, 1, 1]);
  const toggle = (i) => {
    const nf = [...f];
    nf[i] = nf[i] === 0 ? 1 : 0;
    setF(nf);
  };
  const balanced = f.filter((x) => x === 1).length === 2;
  const constant = f.filter((x) => x === 0).length === 4 || f.filter((x) => x === 1).length === 4;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Define a Boolean function f: {"{0,1}²"} → {"{0,1}"} and see if it's constant or balanced
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 8, marginBottom: 14 }}>
        {f.map((v, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            padding: "16px 8px", borderRadius: 8, textAlign: "center",
            background: v === 1 ? `${T.accent}22` : T.elevated,
            border: `2px solid ${v === 1 ? T.accent : T.border}`,
            cursor: "pointer", transition: "all .2s",
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>x = {i.toString(2).padStart(2, "0")}</div>
            <div style={{ color: v === 1 ? T.accent : T.muted, fontSize: 22, fontWeight: 800 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${constant ? T.blue : balanced ? T.green : T.border}`,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: constant ? T.blue : balanced ? T.green : T.muted }}>
          {constant ? "CONSTANT" : balanced ? "BALANCED" : "Neither"}
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>
          {constant && "All outputs are the same. Deutsch–Jozsa returns all zeros."}
          {balanced && "Exactly half are 1. Deutsch–Jozsa returns a non-zero string."}
          {!constant && !balanced && "Not constant or balanced — Deutsch–Jozsa doesn't apply, but you can still see the pattern."}
        </div>
      </div>
    </div>
  );
}

function GroverDemo() {
  const [N, setN] = useState(64);
  const iterations = Math.round(Math.PI / 4 * Math.sqrt(N));
  const [step, setStep] = useState(0);
  const maxSteps = iterations;
  const prob = step === 0 ? 1 / N : Math.pow(Math.sin((2 * step + 1) * Math.asin(1 / Math.sqrt(N))), 2);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Grover amplitude amplification: probability of finding the target grows with each iteration
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Search space N</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{N}</span>
          </div>
          <input type="range" min={4} max={1024} step={4} value={N}
            onChange={(e) => { setN(+e.target.value); setStep(0); }} style={{ width: "100%" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Iterations k</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{step} / {maxSteps}</span>
          </div>
          <input type="range" min={0} max={maxSteps} value={step}
            onChange={(e) => setStep(+e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Probability of measuring the target</div>
        <div style={{ color: prob > 0.9 ? T.green : prob > 0.5 ? T.amber : T.red, fontSize: 36, fontWeight: 900 }}>
          {(prob * 100).toFixed(1)}%
        </div>
        <div style={{ height: 12, background: T.border, borderRadius: 6, overflow: "hidden", marginTop: 12 }}>
          <div style={{
            width: `${prob * 100}%`, height: "100%",
            background: prob > 0.9 ? T.green : prob > 0.5 ? T.amber : T.accent,
            borderRadius: 6, transition: "width .3s",
          }} />
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Grover achieves peak probability after ~(π/4)√N iterations. More iterations decrease it — the amplitude oscillates. This is why oracle queries must be carefully counted.
      </div>
    </div>
  );
}

function QFTDemo() {
  const [period, setPeriod] = useState(4);
  const N = 16;
  const signal = Array.from({ length: N }, (_, i) => Math.cos((2 * Math.PI * i) / period));
  const transform = Array.from({ length: N }, (_, k) => {
    let re = 0;
    for (let i = 0; i < N; i++) re += signal[i] * Math.cos((2 * Math.PI * i * k) / N);
    return Math.abs(re) / N;
  });
  const maxSignal = Math.max(...signal.map(Math.abs));
  const maxTransform = Math.max(...transform);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        QFT reveals the period of a signal as a peak in the frequency domain
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Signal period</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{period}</span>
        </div>
        <input type="range" min={2} max={8} value={period}
          onChange={(e) => setPeriod(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="120" viewBox="0 0 500 120" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 10,
      }}>
        <polyline points={signal.map((v, i) => `${30 + i * 28},${60 - (v / maxSignal) * 40}`).join(" ")}
          fill="none" stroke={T.blue} strokeWidth={2} />
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">Input signal</text>
      </svg>
      <svg width="100%" height="120" viewBox="0 0 500 120" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {transform.map((v, i) => (
          <rect key={i} x={30 + i * 28 - 8} y={100 - (v / maxTransform) * 70}
            width={16} height={(v / maxTransform) * 70}
            fill={`${T.accent}88`} stroke={T.accent} />
        ))}
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">Fourier transform magnitude</text>
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        The QFT produces a state whose amplitude peaks at multiples of N/period. Measuring this gives the period — the core of Shor's algorithm.
      </div>
    </div>
  );
}

function ShorDemo() {
  const [N, setN] = useState(15);
  const [a, setA] = useState(2);
  const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
  const factor = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return i;
    return n;
  };
  const g = gcd(a, N);
  const trivial = g > 1;
  const p = trivial ? g : factor(N);
  const q = N / p;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Shor's algorithm: factor N by finding the period of a^x mod N
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>N (to factor)</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{N}</span>
          </div>
          <input type="range" min={4} max={100} value={N}
            onChange={(e) => setN(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Base a</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{a}</span>
          </div>
          <input type="range" min={2} max={Math.max(2, N - 1)} value={Math.min(a, N - 1)}
            onChange={(e) => setA(+e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, marginBottom: 12,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Sequence a^x mod N</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {Array.from({ length: 8 }, (_, i) => Math.pow(a, i) % N).map((v, i) => (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 4,
              background: `${T.blue}22`, border: `1px solid ${T.blue}`,
              color: T.blue, fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10,
        background: `${T.green}11`, border: `1px solid ${T.green}`,
      }}>
        <div style={{ color: T.green, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
          {trivial ? "Factor found trivially by gcd" : "Factoring via period-finding"}
        </div>
        <div style={{ color: T.text, fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}>
          {N} = {p} × {q}
        </div>
      </div>
    </div>
  );
}

function QPEDemo() {
  const [phase, setPhase] = useState(0.375);
  const [bits, setBits] = useState(4);
  const estimate = Math.round(phase * Math.pow(2, bits)) / Math.pow(2, bits);
  const binary = Math.round(phase * Math.pow(2, bits)).toString(2).padStart(bits, "0");
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        {"Phase estimation approximates φ in U|u⟩ = e^{2πiφ}|u⟩"}
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>True phase φ</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{phase.toFixed(4)}</span>
        </div>
        <input type="range" min={0} max={1} step={0.001} value={phase}
          onChange={(e) => setPhase(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Precision (n bits)</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{bits}</span>
        </div>
        <input type="range" min={1} max={10} value={bits}
          onChange={(e) => setBits(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Binary estimate (n = {bits})</div>
        <div style={{
          fontSize: 28, fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 800, color: T.accent, marginBottom: 8,
        }}>{binary}</div>
        <div style={{ color: T.text, fontSize: 14 }}>
          Estimated φ ≈ {estimate.toFixed(4)}
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>
          Error: {Math.abs(estimate - phase).toFixed(4)}
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        More bits = finer resolution. QPE is the subroutine that powers Shor, HHL, and quantum simulation.
      </div>
    </div>
  );
}

function ComplexityDemo() {
  const classes = [
    { name: "P", desc: "Classical, poly-time", contains: "Det. classical", color: T.green },
    { name: "BPP", desc: "Classical, poly-time, bounded error", contains: "P (believed)", color: T.teal },
    { name: "BQP", desc: "Quantum, poly-time, bounded error", contains: "BPP (believed)", color: T.accent },
    { name: "QMA", desc: "Quantum verifiable in poly-time", contains: "BQP (believed)", color: T.purple },
    { name: "PSPACE", desc: "Classical poly-space", contains: "QMA (believed)", color: T.pink },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        Quantum complexity classes are nested. BQP is strictly more powerful than BPP (believed) but does not contain NP-complete problems (believed).
      </p>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {classes.map((c, i) => {
          const size = 30 + i * 35;
          return (
            <g key={i}>
              <circle cx={250} cy={130} r={size}
                fill={`${c.color}11`} stroke={c.color} strokeWidth={2} />
              <text x={250} y={130 - size + 16} textAnchor="middle"
                fill={c.color} fontSize="11" fontWeight="700">{c.name}</text>
            </g>
          );
        })}
        <text x={250} y={250} textAnchor="middle" fill={T.muted} fontSize="9">
          Nested inclusion (not to scale)
        </text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        {classes.map((c) => (
          <div key={c.name} style={{
            padding: "10px 12px", borderRadius: 8,
            background: T.surface, border: `1px solid ${c.color}44`,
          }}>
            <div style={{ color: c.color, fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{c.name}</div>
            <div style={{ color: T.subtle, fontSize: 11 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyECDemo() {
  const [gates, setGates] = useState(1000);
  const [err, setErr] = useState(0.001);
  const noEC = Math.pow(1 - err, gates);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Without error correction, success probability falls exponentially
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Number of gates</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{gates}</span>
          </div>
          <input type="range" min={10} max={10000} value={gates}
            onChange={(e) => setGates(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Error rate per gate</span>
            <span style={{ color: T.accent, fontWeight: 700 }}>{err.toFixed(4)}</span>
          </div>
          <input type="range" min={0.0001} max={0.01} step={0.0001} value={err}
            onChange={(e) => setErr(+e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${noEC > 0.9 ? T.green : noEC > 0.3 ? T.amber : T.red}`,
        textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Success probability without QEC</div>
        <div style={{
          color: noEC > 0.9 ? T.green : noEC > 0.3 ? T.amber : T.red,
          fontSize: 36, fontWeight: 900, marginBottom: 8,
        }}>{(noEC * 100).toFixed(4)}%</div>
        <div style={{ height: 10, background: T.border, borderRadius: 5, overflow: "hidden" }}>
          <div style={{
            width: `${noEC * 100}%`, height: "100%",
            background: noEC > 0.9 ? T.green : noEC > 0.3 ? T.amber : T.red,
            borderRadius: 5, transition: "width .3s",
          }} />
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        A 1% error rate over 1000 gates yields ~0.004% success. QEC encodes logical qubits to suppress errors below threshold.
      </div>
    </div>
  );
}

function StabilizerDemo() {
  const [error, setError] = useState(null);
  const errors = [
    { id: null, label: "No error", syndrome: [0, 0], color: T.green },
    { id: 0, label: "Qubit 0 flipped", syndrome: [1, 0], color: T.red },
    { id: 1, label: "Qubit 1 flipped", syndrome: [1, 1], color: T.orange },
    { id: 2, label: "Qubit 2 flipped", syndrome: [0, 1], color: T.amber },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        3-qubit repetition code: stabilizers Z₁Z₂ and Z₂Z₃ detect single-qubit errors
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 }}>
        {errors.map((e) => (
          <button key={e.id ?? "none"} onClick={() => setError(e)} style={{
            padding: "8px 12px", borderRadius: 8,
            border: `1px solid ${error?.id === e.id ? e.color : T.border}`,
            background: error?.id === e.id ? `${e.color}22` : "transparent",
            color: error?.id === e.id ? e.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{e.label}</button>
        ))}
      </div>
      {error && (
        <div style={{
          padding: "20px", borderRadius: 10, background: T.surface,
          border: `1px solid ${error.color}`,
        }}>
          <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Syndrome measurement</div>
          <div style={{
            fontSize: 28, fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800, color: error.color, marginBottom: 8,
          }}>{error.syndrome.join("")}</div>
          <div style={{ color: T.subtle, fontSize: 12 }}>
            {error.id === null
              ? "No error detected — logical state intact."
              : `Error detected on qubit ${error.id}. Apply X to correct.`}
          </div>
        </div>
      )}
    </div>
  );
}

function SurfaceDemo() {
  const [d, setD] = useState(3);
  const p = 0.001;
  const pTh = 0.01;
  const logical = Math.pow(p / pTh, (d + 1) / 2);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Surface code: logical error rate falls exponentially with code distance
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Code distance d</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{d}</span>
        </div>
        <input type="range" min={3} max={21} step={2} value={d}
          onChange={(e) => setD(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`, textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>
          Logical error rate (per cycle)
        </div>
        <div style={{
          color: logical < 1e-10 ? T.green : logical < 1e-5 ? T.amber : T.red,
          fontSize: 32, fontWeight: 900,
        }}>
          {logical.toExponential(2)}
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 8 }}>
          Physical qubits needed: ~{d * d} (d²)
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Each unit increase in d adds ~d² physical qubits but reduces logical error by a factor of p/p_th. The tradeoff is favorable below threshold.
      </div>
    </div>
  );
}

function SuperconductingDemo() {
  const [temp, setTemp] = useState(15);
  const isValid = temp < 100;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Superconducting qubits need millikelvin temperatures
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Temperature (mK)</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{temp} mK</span>
        </div>
        <input type="range" min={5} max={5000} step={5} value={temp}
          onChange={(e) => setTemp(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "20px", borderRadius: 10,
        background: isValid ? `${T.green}11` : `${T.red}11`,
        border: `1px solid ${isValid ? T.green : T.red}`,
      }}>
        <div style={{ color: isValid ? T.green : T.red, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          {isValid ? "✓ Quantum regime" : "✗ Thermal noise destroys qubits"}
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>
          {isValid
            ? "Thermal energy is below the qubit gap. Operations are possible."
            : "Thermal energy exceeds the qubit energy gap. Superconducting state is destroyed."}
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Dilution refrigerators cool to ~10 mK — colder than deep space. The quantum-classical interface must work at this temperature, which is a major engineering bottleneck.
      </div>
    </div>
  );
}

function ModalitiesDemo() {
  const [mode, setMode] = useState("superconducting");
  const modes = {
    superconducting: {
      name: "Superconducting", color: T.blue,
      pros: ["Fast gates (ns)", "Mature fab", "IBM, Google"],
      cons: ["Cryogenic", "Limited connectivity", "Short coherence"],
    },
    ion: {
      name: "Trapped Ion", color: T.green,
      pros: ["High fidelity", "All-to-all", "Long coherence"],
      cons: ["Slow gates (μs)", "Complex optics", "Scaling"],
    },
    photonic: {
      name: "Photonic", color: T.amber,
      pros: ["Room temperature", "Fiber-compatible", "Low loss"],
      cons: ["2Q gates hard", "Loss", "Detection"],
    },
    neutral: {
      name: "Neutral Atom", color: T.purple,
      pros: ["Large arrays", "Reconfigurable", "Rydberg gates"],
      cons: ["Gate speed", "Coherence", "Readout"],
    },
  };
  const m = modes[mode];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(modes).map(([k, v]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${mode === k ? v.color : T.border}`,
            background: mode === k ? `${v.color}22` : "transparent",
            color: mode === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${m.color}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ color: T.green, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>✓ STRENGTHS</div>
            {m.pros.map((p, i) => (
              <div key={i} style={{
                padding: "6px 10px", borderRadius: 4, marginBottom: 4,
                background: `${T.green}11`, color: T.text, fontSize: 11,
              }}>{p}</div>
            ))}
          </div>
          <div>
            <div style={{ color: T.red, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>✗ WEAKNESSES</div>
            {m.cons.map((c, i) => (
              <div key={i} style={{
                padding: "6px 10px", borderRadius: 4, marginBottom: 4,
                background: `${T.red}11`, color: T.text, fontSize: 11,
              }}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SDKDemo() {
  const [sdk, setSdk] = useState("qiskit");
  const sdks = {
    qiskit: {
      name: "Qiskit (IBM)", color: T.blue,
      code: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()",
    },
    cirq: {
      name: "Cirq (Google)", color: T.green,
      code: "import cirq\nq = cirq.LineQubit.range(2)\nc = cirq.Circuit([\n  cirq.H(q[0]),\n  cirq.CNOT(q[0], q[1]),\n  cirq.measure(*q)\n])",
    },
    pennylane: {
      name: "PennyLane (Xanadu)", color: T.purple,
      code: "import pennylane as qml\ndev = qml.device('default.qubit', wires=2)\n@qml.qnode(dev)\ndef circuit():\n    qml.Hadamard(0)\n    qml.CNOT([0, 1])\n    return qml.probs()",
    },
    qsharp: {
      name: "Q# (Microsoft)", color: T.amber,
      code: "operation Bell() : Result[] {\n  use (q0, q1) = (Qubit(), Qubit());\n  H(q0);\n  CNOT(q0, q1);\n  return [M(q0), M(q1)];\n}",
    },
  };
  const s = sdks[sdk];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(sdks).map(([k, v]) => (
          <button key={k} onClick={() => setSdk(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${sdk === k ? v.color : T.border}`,
            background: sdk === k ? `${v.color}22` : "transparent",
            color: sdk === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <pre style={{
        background: "#020812", border: `1px solid ${s.color}`,
        borderRadius: 10, padding: "14px 16px", overflow: "auto",
        fontSize: 12, color: s.color, lineHeight: 1.7,
        fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap",
      }}>{s.code}</pre>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        All these produce the same Bell-state circuit. Choose based on target hardware, ecosystem, and workflow.
      </div>
    </div>
  );
}

function SimulatorDemo() {
  const [n, setN] = useState(20);
  const memory = Math.pow(2, n) * 16 / (1024 ** 3);
  const feasible = memory < 1024;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        State-vector simulation memory scales as 2ⁿ × 16 bytes (complex128 per amplitude)
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Number of qubits</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{n}</span>
        </div>
        <input type="range" min={10} max={50} value={n}
          onChange={(e) => setN(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <div style={{
        padding: "20px", borderRadius: 10,
        background: feasible ? `${T.green}11` : `${T.red}11`,
        border: `1px solid ${feasible ? T.green : T.red}`, textAlign: "center",
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Memory required</div>
        <div style={{
          color: feasible ? T.green : T.red,
          fontSize: 32, fontWeight: 900, marginBottom: 6,
        }}>
          {memory < 1 ? `${(memory * 1024).toFixed(1)} MB` :
           memory < 1024 ? `${memory.toFixed(1)} GB` :
           memory < 1024 * 1024 ? `${(memory / 1024).toFixed(1)} TB` :
           `${(memory / (1024 * 1024)).toExponential(2)} PB`}
        </div>
        <div style={{ color: T.subtle, fontSize: 12 }}>
          {feasible ? "Feasible on a single server" : "Exceeds practical single-machine limits"}
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Beyond ~40 qubits, direct state-vector simulation becomes impractical. Tensor networks and other methods can go further for low-entanglement circuits.
      </div>
    </div>
  );
}

function ChemistryDemo() {
  const [molecule, setMolecule] = useState("H2");
  const molecules = {
    H2: { name: "H₂ (hydrogen)", qubits: 4, classical: "seconds" },
    LiH: { name: "LiH (lithium hydride)", qubits: 12, classical: "minutes" },
    BeH2: { name: "BeH₂", qubits: 14, classical: "hours" },
    H2O: { name: "H₂O (water)", qubits: 14, classical: "hours" },
    FeMoco: { name: "FeMoco (nitrogenase)", qubits: 100, classical: "intractable" },
  };
  const m = molecules[molecule];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(molecules).map(([k, v]) => (
          <button key={k} onClick={() => setMolecule(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${molecule === k ? T.accent : T.border}`,
            background: molecule === k ? `${T.accent}22` : "transparent",
            color: molecule === k ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{k}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{m.name}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>Qubits required</div>
            <div style={{ color: T.purple, fontSize: 24, fontWeight: 800 }}>{m.qubits}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>Classical simulation</div>
            <div style={{ color: m.classical === "intractable" ? T.red : T.amber, fontSize: 16, fontWeight: 700, marginTop: 4 }}>
              {m.classical}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Quantum chemistry is the most credible near-term application. FeMoco — the enzyme that fixes nitrogen for fertilizer — is a Holy Grail: a quantum solution could save 1% of global energy.
      </div>
    </div>
  );
}

function QMLDemo() {
  const [baseline, setBaseline] = useState(0.75);
  const [quantum, setQuantum] = useState(0.78);
  const advantage = quantum - baseline;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        QML claims often depend on a weak classical baseline. Compare fairly.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Classical baseline</span>
            <span style={{ color: T.blue, fontWeight: 700 }}>{baseline.toFixed(2)}</span>
          </div>
          <input type="range" min={0} max={1} step={0.01} value={baseline}
            onChange={(e) => setBaseline(+e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
            <span style={{ color: T.muted }}>Quantum model</span>
            <span style={{ color: T.purple, fontWeight: 700 }}>{quantum.toFixed(2)}</span>
          </div>
          <input type="range" min={0} max={1} step={0.01} value={quantum}
            onChange={(e) => setQuantum(+e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${advantage > 0.05 ? T.green : advantage > 0 ? T.amber : T.red}`,
      }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>Quantum advantage</div>
        <div style={{
          color: advantage > 0.05 ? T.green : advantage > 0 ? T.amber : T.red,
          fontSize: 36, fontWeight: 900,
        }}>
          {advantage > 0 ? "+" : ""}{(advantage * 100).toFixed(1)}%
        </div>
        <div style={{ color: T.subtle, fontSize: 12, marginTop: 8 }}>
          {advantage > 0.1 && "Suspiciously large — check for unfair baseline."}
          {advantage > 0.05 && advantage <= 0.1 && "Modest advantage. Reproduce under rigorous conditions."}
          {advantage > 0 && advantage <= 0.05 && "Within noise. Not a real advantage."}
          {advantage <= 0 && "Classical baseline wins."}
        </div>
      </div>
    </div>
  );
}

function PQCDemo() {
  const [algo, setAlgo] = useState("rsa");
  const algos = {
    rsa: { name: "RSA-2048", quantum: "Broken by Shor", pqc: "ML-KEM" },
    ecc: { name: "ECC-256", quantum: "Broken by Shor", pqc: "ML-KEM" },
    aes128: { name: "AES-128", quantum: "Weakened by Grover (64-bit)", pqc: "AES-256" },
    aes256: { name: "AES-256", quantum: "Safe with doubled key", pqc: "AES-256 (already)" },
    sha256: { name: "SHA-256", quantum: "Weakened, use SHA-384+", pqc: "SHA-384" },
  };
  const a = algos[algo];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(algos).map(([k, v]) => (
          <button key={k} onClick={() => setAlgo(k)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${algo === k ? T.accent : T.border}`,
            background: algo === k ? `${T.accent}22` : "transparent",
            color: algo === k ? T.accent : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.accent}`,
      }}>
        <div style={{ color: T.accent, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{a.name}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>Quantum threat</div>
            <div style={{ color: T.red, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{a.quantum}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 11 }}>PQC replacement</div>
            <div style={{ color: T.green, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{a.pqc}</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Migrate to hybrid (classical + PQC) deployments. Long-lived data is already at risk from harvest-now-decrypt-later.
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
    `How does ${ch.title} apply in real quantum computing?`,
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
          system: `You are an expert quantum computing tutor helping someone learn linear algebra, quantum mechanics, qubits, gates, algorithms, error correction, and hardware. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
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
      <div style={{ fontSize: 32, marginBottom: 12 }}>⚛️</div>
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
    linearalgebra: LinearAlgebraDemo,
    amplitudes: AmplitudesDemo,
    superposition: SuperpositionDemo,
    entanglement: EntanglementDemo,
    decoherence: DecoherenceDemo,
    bloch: BlochDemo,
    gates1q: Gates1QDemo,
    gates2q: Gates2QDemo,
    circuit: CircuitDemo,
    oracle: OracleDemo,
    deutsch: OracleDemo,
    grover: GroverDemo,
    qft: QFTDemo,
    shor: ShorDemo,
    qpe: QPEDemo,
    complexity: ComplexityDemo,
    whyec: WhyECDemo,
    stabilizer: StabilizerDemo,
    surface: SurfaceDemo,
    superconducting: SuperconductingDemo,
    modalities: ModalitiesDemo,
    sdk: SDKDemo,
    simulator: SimulatorDemo,
    chemistry: ChemistryDemo,
    qml: QMLDemo,
    pqc: PQCDemo,
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
      <RelatedCurriculums currentId="quantum-computing" chapter={ch} />
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
        All 36 chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{
          background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`,
        }}>
          <defs>
            <radialGradient id="bgQC" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bgQC)" rx="14" />
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
          <span style={{ fontSize: 18 }}>⚛️</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Quantum Computing</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>11 Parts · 36 Chapters</div>
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
    { label: "Foundations Path", color: T.blue, desc: "Linear algebra, mechanics, qubits, gates", chs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { label: "Algorithms Track", color: T.green, desc: "Circuits, oracles, Shor, Grover, QFT, QPE", chs: [12, 13, 14, 15, 16, 17, 18, 19] },
    { label: "Error Correction", color: T.purple, desc: "Why EC matters, stabilizers, surface codes", chs: [22, 23, 24] },
    { label: "Hardware Route", color: T.amber, desc: "Superconducting, ion, photonic, atom", chs: [25, 26, 27, 28] },
    { label: "Applications & Frontier", color: T.pink, desc: "Chemistry, QML, PQC, the future", chs: [32, 33, 34, 35] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div className="curriculum-overview" style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <CurriculumHero eyebrow="Quantum path" title="Quantum Computing" description="A visual route from qubits and gates to algorithms, error correction, and quantum advantage." icon="⚛️" color="#8B5CF6" secondaryColor="#EC4899" parts={PARTS.length} chapters={CHAPTERS.length} terms={GLOSSARY.length} signal="Qubits → circuits → advantage" nodes={["Qubit", "Gate", "State", "Noise", "Algo"]} />
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
        }}>Quantum Computing</h1> */}
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          11 Parts · 36 Chapters · From Linear Algebra to Fault Tolerance
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