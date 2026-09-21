"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RelatedCurriculums } from "./related-curriculums";
import { CurriculumHero } from "./curriculum-hero";

// ── Design Tokens (exactly matching frontier-llm.tsx) ─────────────────────
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
const PC = [
  "#818CF8",
  "#60A5FA",
  "#34D399",
  "#34D399",
  "#FBBF24",
  "#FBBF24",
  "#F87171",
  "#F87171",
  "#F87171",
  "#A78BFA",
  "#A78BFA",
  "#A78BFA",
  "#A78BFA",
];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Territory Map", icon: "🗺️", chs: [0] },
  { id: 1, label: "Mathematical Foundations", icon: "∑", chs: [1, 2, 3, 4, 5, 6, 7] },
  { id: 2, label: "Neural Networks", icon: "🧠", chs: [8, 9, 10] },
  { id: 3, label: "Transformer Architecture", icon: "⚡", chs: [11, 12, 13, 14, 15] },
  { id: 4, label: "How Models Learn", icon: "📈", chs: [16] },
  { id: 5, label: "Alignment Systems", icon: "🎯", chs: [17, 18, 19, 20] },
  { id: 6, label: "Inference Systems", icon: "⚙️", chs: [21, 22, 23, 24] },
  { id: 7, label: "Evaluation Systems", icon: "📊", chs: [27] },
  { id: 8, label: "Distributed Training", icon: "🖥️", chs: [31] },
  { id: 9, label: "Mixture of Experts", icon: "🔀", chs: [33] },
  { id: 10, label: "Reasoning Models", icon: "💭", chs: [34] },
  { id: 11, label: "Agents, RAG & MCP", icon: "🤖", chs: [35, 36, 37] },
  { id: 12, label: "Building Frontier AI", icon: "🚀", chs: [38, 39, 40, 41] },
];

// ── Chapters (Information Theory Curriculum mapped to same structure) ─────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of the Territory",
    tagline: "The complete vertical stack — from electrons to meaning",
    insight: "Most people only see the bits. The frontier is built on every layer beneath.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Before any technical detail, you need a mental model of what information actually is — not as data, but as a layered technical system built on seven distinct strata.",
      },
      {
        type: "stack",
        rows: [
          ["🌍 Physical States", "Electrons, voltages, charges — the raw substrate"],
          ["🔤 Signals", "Time-varying voltages that carry patterns"],
          ["📐 Bits", "Distinguishable states we interpret as 0 and 1"],
          ["🧠 Logic Gates", "Transistors combined to compute Boolean functions"],
          ["🏋️ Computation", "Programs that transform state according to rules"],
          ["📱 Representation", "Numbers, text, images, audio encoded as bits"],
          ["🏢 Meaning", "Interpretation applied by humans, software, or models"],
        ],
      },
      {
        type: "insight",
        text: "Start at the bottom (physics). Every concept connects downward to physical reality, upward to meaning. You cannot understand any layer without understanding the ones below it.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "What Is a Computer?",
    tagline: "Before we ask how, we must ask what.",
    insight: "A computer does not understand anything intrinsically — it manipulates physical states according to rules.",
    demo: "interpretation",
    content: [
      {
        type: "p",
        text: "A computer is a physical system. Electrons flow through silicon. Nothing in that flow 'knows' it is a letter or a number. We layer interpretations on top: a pattern of voltages becomes a byte, a byte becomes a character via a table, a character becomes a word via a language.",
      },
      {
        type: "code",
        text: "Take the byte 01000001:\n\nProgrammer says: 65\nTypist says: 'A'\nNetwork engineer says: valid TCP segment start\n\nAll are correct — the byte did not change.",
      },
      {
        type: "insight",
        text: "Meaning is assigned by interpretation, not contained in the bits. The same bit pattern can support many different meanings.",
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Electricity",
    tagline: "What is actually flowing?",
    insight: "Voltage is a difference in electric potential — an energy-per-charge gradient.",
    content: [
      {
        type: "p",
        text: "Voltage is a difference in electric potential energy per unit charge between two points. Think of it as a 'pressure' that pushes charge carriers. Current is the flow rate of charge carriers. Signals are time-varying voltages we use to carry information.",
      },
      {
        type: "code",
        text: "V = W / Q\n\nvolts = joules per coulomb\n\nA 9V battery delivers 9 joules of energy\nper coulomb of charge it moves.",
      },
      {
        type: "table",
        head: ["Concept", "Physical Meaning"],
        rows: [
          ["Voltage", "Difference in electric potential energy per charge"],
          ["Current", "Flow rate of charge carriers"],
          ["Resistance", "Opposition to current flow"],
          ["Signal", "Time-varying voltage carrying information"],
        ],
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Semiconductors",
    tagline: "Where insulators learn to conduct on command.",
    insight: "The band gap determines whether a material is a conductor, semiconductor, or insulator.",
    content: [
      {
        type: "p",
        text: "Electrons in a solid occupy energy bands. The gap between the valence band (bound) and conduction band (free) determines conductivity. Silicon has a ~1.1 eV gap — small enough that thermal or field excitation can promote electrons.",
      },
      {
        type: "code",
        text: "Insulator gap > 5 eV\nSemiconductor: 0.5–3 eV\nConductor: bands overlap\n\nSilicon: 1.12 eV\nGermanium: 0.66 eV\nDiamond: 5.5 eV",
      },
      {
        type: "insight",
        text: "Small controllable gaps mean we can switch a semiconductor with a small external signal.",
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Transistors",
    tagline: "One signal controls another.",
    insight: "A transistor is a voltage-controlled current valve — not a perfect switch.",
    demo: "transistor",
    content: [
      {
        type: "p",
        text: "A MOSFET has a gate that, when charged, attracts carriers into a channel between source and drain, allowing current to flow. That is analog behavior. We define thresholds: if gate voltage > V_th, we call it 'on'; if < V_th, 'off'. This is an engineering choice.",
      },
      {
        type: "code",
        text: "I_D = ½ · μₙ · Cₒₓ · (W/L) · (V_GS − V_th)²\n\nDrain current rises quadratically with\ngate voltage above threshold.\nBelow threshold, essentially no current flows.",
      },
      {
        type: "table",
        head: ["Logic Level", "Voltage Range (5V TTL)"],
        rows: [
          ["Logic 0", "0V – 0.8V"],
          ["Logic 1", "2.0V – 5V"],
          ["Noise Margin", "Gap between highest 0 and lowest 1"],
        ],
      },
    ],
  },
  {
    n: 5,
    part: 1,
    title: "Logic Gates",
    tagline: "From switches to propositions.",
    insight: "NAND and NOR are functionally complete — any Boolean function can be built from them alone.",
    demo: "logic",
    content: [
      {
        type: "p",
        text: "Logic gates enforce the digital abstraction at every stage. NAND gives us both inversion (NOT) and a fundamental combining operation (AND). With those two, we can derive everything else.",
      },
      {
        type: "code",
        text: "NOT(A) = NAND(A,A)\nAND(A,B) = NOT(NAND(A,B))\nOR(A,B) = NAND(NOT A, NOT B)\n\nSince NOT and AND suffice for all Boolean\nfunctions, NAND suffices.",
      },
      {
        type: "insight",
        text: "Hardware designers can standardize on a single gate type, simplifying fabrication and libraries.",
      },
    ],
  },
  {
    n: 6,
    part: 1,
    title: "Boolean Algebra",
    tagline: "The mathematics underlying every digital system.",
    insight: "De Morgan's laws swap AND↔OR while pushing NOT inward.",
    content: [
      {
        type: "p",
        text: "Boolean algebra describes two-element sets with AND, OR, NOT. These identities follow from the definition of the Boolean lattice. Circuit minimization tools (Karnaugh maps, Quine-McCluskey) rely on these laws.",
      },
      {
        type: "code",
        text: "¬(A ∨ B) = ¬A ∧ ¬B\n¬(A ∧ B) = ¬A ∨ ¬B\n\nVerify with a truth table:\nboth sides match for all 4 input combinations.",
      },
      {
        type: "table",
        head: ["Law", "Expression"],
        rows: [
          ["Identity", "A ∧ 1 = A, A ∨ 0 = A"],
          ["Null", "A ∧ 0 = 0, A ∨ 1 = 1"],
          ["Idempotent", "A ∧ A = A, A ∨ A = A"],
          ["Complement", "A ∧ ¬A = 0, A ∨ ¬A = 1"],
          ["De Morgan", "¬(A ∧ B) = ¬A ∨ ¬B"],
        ],
      },
    ],
  },
  {
    n: 7,
    part: 1,
    title: "Binary",
    tagline: "Why two states, and why not three.",
    insight: "Binary is chosen for noise margin and reliability — not because it's a law of physics.",
    demo: "binary",
    content: [
      {
        type: "p",
        text: "Distinguishing two voltage ranges reliably is cheap. Distinguishing ten ranges reliably requires more margin and more sensitive receivers, and errors scale up. Binary is the smallest alphabet that still permits non-trivial computation.",
      },
      {
        type: "code",
        text: "(1011)₂ = 1·2³ + 0·2² + 1·2¹ + 1·2⁰\n         = 8 + 0 + 2 + 1\n         = 11\n\nHex: base 16\nOctal: base 8\nDecimal: base 10",
      },
      {
        type: "table",
        head: ["Base", "Name", "Digits"],
        rows: [
          ["2", "Binary", "0, 1"],
          ["8", "Octal", "0–7"],
          ["10", "Decimal", "0–9"],
          ["16", "Hexadecimal", "0–9, A–F"],
        ],
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "Bits and Bytes",
    tagline: "A bit is not a small thing — it is a distinction.",
    insight: "A bit has no single physical form. It can be voltage, charge, magnetic orientation, or optical polarization.",
    content: [
      {
        type: "p",
        text: "A bit is defined by the property of having exactly two distinguishable states. A byte is a convenient grouping — 8 bits — but not physically special. IBM's System/360 (1964) standardized on 8.",
      },
      {
        type: "code",
        text: "Compare a DRAM cell (charge),\nan HDD (magnetization),\nand an optical fiber (polarization).\n\nAll can store the same bit.",
      },
      {
        type: "table",
        head: ["Unit", "Size", "Typical Use"],
        rows: [
          ["Bit", "1 binary digit", "Smallest distinction"],
          ["Nibble", "4 bits", "One hex digit"],
          ["Byte", "8 bits", "One character (ASCII)"],
          ["Word", "16–64 bits", "CPU register size"],
        ],
      },
    ],
  },
  {
    n: 9,
    part: 2,
    title: "Data Representation",
    tagline: "Numbers, text, images, and audio from the same substrate.",
    insight: "All representation schemes are conventions — fixed maps from bits to meaning.",
    demo: "interpretation",
    content: [
      {
        type: "p",
        text: "Two's complement: negative x stored as 2^n − x. Float: IEEE 754 with sign, exponent, mantissa. ASCII: 7-bit, 128 code points. Unicode: 1.1M code points. UTF-8: variable-length encoding of code points as bytes.",
      },
      {
        type: "code",
        text: "Two's complement:\n-1 = 0xFFFF in 16-bit\nAdd 1 to 0xFFFF → 0x0000 (overflow wraps)\n\nUTF-8:\n'A'  = 0x41\n'é'  = 0xC3 0xA9\n'漢' = 0xE6 0xBC 0xA2",
      },
      {
        type: "table",
        head: ["Data Type", "Encoding", "Example"],
        rows: [
          ["Unsigned int", "Binary", "0b10110101 = 181"],
          ["Signed int8", "Two's complement", "0b11111111 = -1"],
          ["ASCII", "7-bit table", "0x41 = 'A'"],
          ["UTF-8", "Variable bytes", "0xE6BCA2 = '漢'"],
          ["Float32", "IEEE 754", "1 bit sign + 8 exp + 23 mantissa"],
        ],
      },
    ],
  },
  {
    n: 10,
    part: 2,
    title: "CPU and Machine Code",
    tagline: "How does a sequence of bits become an action?",
    insight: "The CPU does not understand; it reacts to bit patterns by activating pre-wired control paths.",
    demo: "cpu",
    content: [
      {
        type: "p",
        text: "The instruction decoder is a fixed logic circuit. It examines specific bits (the opcode field) and asserts control lines. Each instruction is a bit pattern with fields: opcode, operands, addressing modes.",
      },
      {
        type: "code",
        text: "Fetch-Decode-Execute Cycle:\n\nIR ← Memory[PC]\nPC ← PC + 1\ndecode IR\nexecute\n\nx86-64 examples:\n0x90           = NOP\n0x48 0x01 0xD8 = ADD rax, rbx",
      },
      {
        type: "table",
        head: ["Concept", "Meaning"],
        rows: [
          ["ISA", "Formal specification of state transitions"],
          ["Microarchitecture", "Circuit that realizes the ISA"],
          ["Opcode", "Bits identifying the instruction"],
          ["Register file", "Fast storage inside CPU"],
        ],
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Memory",
    tagline: "Where does a bit live when no one is looking?",
    insight: "Memory is a hierarchy — fast/small/expensive to slow/large/cheap.",
    demo: "memory",
    content: [
      {
        type: "p",
        text: "Addresses are indices. The hardware maps address bits to a decoder that selects one storage cell among millions. A virtual address is translated by the MMU to a physical address via page tables.",
      },
      {
        type: "code",
        text: "Address space size = 2^(address bits)\n64-bit = 2^64 addresses\n\n32-bit addressing + 4KB pages:\n2^32 / 2^12 = 2^20 pages",
      },
      {
        type: "table",
        head: ["Memory Type", "Access Time", "Typical Size"],
        rows: [
          ["L1 Cache", "~1 ns", "32–64 KB"],
          ["L2 Cache", "~4 ns", "256 KB – 1 MB"],
          ["DRAM", "~80 ns", "8–64 GB"],
          ["SSD", "~100 µs", "256 GB – 4 TB"],
          ["HDD", "~10 ms", "1–20 TB"],
        ],
      },
    ],
  },
  {
    n: 12,
    part: 3,
    title: "Operating Systems",
    tagline: "From transistors to something you can call.",
    insight: "The OS hides hardware complexity behind clean interfaces.",
    content: [
      {
        type: "p",
        text: "Physical storage is blocks, tracks, and cells. A 'file' is a software structure maintained by the OS that groups named sequences of bytes. The OS maps a path to inodes, extents, and physical blocks.",
      },
      {
        type: "code",
        text: "OS Abstractions:\n\nProcess  → hides CPU scheduling\nFile     → hides disk blocks\nSocket   → hides network packets\nVirtual memory → hides physical RAM",
      },
      {
        type: "table",
        head: ["Abstraction", "Hides"],
        rows: [
          ["Process", "CPU scheduling, context switching"],
          ["File", "Disk blocks, inodes, extents"],
          ["Socket", "Network packets, routing"],
          ["Virtual memory", "Physical RAM layout"],
        ],
      },
    ],
  },
  {
    n: 13,
    part: 3,
    title: "Programming Languages",
    tagline: "How humans talk to machines.",
    insight: "A computer never sees your source code; it sees a translation.",
    content: [
      {
        type: "p",
        text: "Source text is a byte sequence. It is not executable by itself. A compiler: text → tokens → AST → IR → machine code. An interpreter: text → tokens → AST → evaluation.",
      },
      {
        type: "code",
        text: "x = a + b * c\n\nTokens:\nID(x) ASSIGN ID(a) PLUS ID(b) STAR ID(c)\n\nCompilation pipeline:\ntext → tokens → AST → IR → machine code",
      },
      {
        type: "table",
        head: ["Approach", "How It Works"],
        rows: [
          ["Compiler", "Translates entire program before execution"],
          ["Interpreter", "Evaluates AST directly, line by line"],
          ["JIT", "Compiles hot paths during execution"],
          ["Bytecode", "Intermediate representation (Python, Java)"],
        ],
      },
    ],
  },
  {
    n: 14,
    part: 3,
    title: "Communication",
    tagline: "Source, transmitter, channel, receiver, destination.",
    insight: "Communication is about reproducing a selected message — noise is an intrinsic adversary.",
    demo: "channel",
    content: [
      {
        type: "p",
        text: "A message is selected at one point and reproduced (possibly with distortion) at another. Source → encoder → channel (+ noise) → decoder → destination. The theory abstracts away the physical medium's specifics.",
      },
      {
        type: "code",
        text: "Shannon–Hartley Theorem:\n\nC = B · log₂(1 + S/N)\n\nC = channel capacity (bits/sec)\nB = bandwidth (Hz)\nS/N = signal-to-noise power ratio\n\nExample: B = 1 MHz, S/N = 1000 (30 dB)\nC ≈ 10⁶ · log₂(1001) ≈ 10 Mbps",
      },
      {
        type: "insight",
        text: "Shannon proved that any rate below C can be transmitted with arbitrarily low error — a counterintuitive result.",
      },
    ],
  },
  {
    n: 15,
    part: 3,
    title: "Information Theory",
    tagline: "Surprise has a unit.",
    insight: "Information is defined operationally: bits are reduced uncertainty.",
    demo: "entropy",
    content: [
      {
        type: "p",
        text: "Information is additive for independent events. If you learn two independent things, the total information should be the sum. Logarithms turn multiplication of probabilities into addition of information.",
      },
      {
        type: "code",
        text: "I(x) = -log₂ p(x)\n\nIf p(x) = 1 (certain), I(x) = 0 bits\nIf p(x) = 0.5, I(x) = 1 bit\n\nEntropy:\nH(X) = -Σ p(x) log₂ p(x)\n\nFair coin: H = 1 bit\nFair 8-sided die: H = 3 bits",
      },
      {
        type: "table",
        head: ["Distribution", "Entropy (bits)"],
        rows: [
          ["Fair coin", "1.0"],
          ["Biased coin (p=0.9)", "0.469"],
          ["Fair 4-sided die", "2.0"],
          ["Fair 8-sided die", "3.0"],
          ["English text (~1.1 bits/char)", "~1.1"],
        ],
      },
      {
        type: "insight",
        text: "Entropy is the expected surprise. High entropy = unpredictable source. Entropy sets the lower bound on average code length for lossless compression.",
      },
    ],
  },
  {
    n: 16,
    part: 4,
    title: "Compression",
    tagline: "The bound is entropy, not size.",
    insight: "Compression exploits redundancy — it is not 'making things smaller'; it is exploiting structure that was already there.",
    demo: "compression",
    content: [
      {
        type: "p",
        text: "A compression algorithm is a function from strings to strings that must be invertible for lossless cases. By a counting argument: there are 2^n bit strings of length n. There are only 2^(n-1) strings of length < n. So at most half of n-bit strings can compress.",
      },
      {
        type: "code",
        text: "Shannon's source coding theorem:\nL* ≥ H(X)\n\nNo lossless code can average fewer bits\nper symbol than the source's entropy.\n\nEnglish text: ~1.1 bits/letter\nPlain ASCII: 8 bits/letter\nCompression: ~7x reduction",
      },
      {
        type: "table",
        head: ["Algorithm", "Type", "Use Case"],
        rows: [
          ["Huffman", "Lossless", "Symbol-by-symbol optimal"],
          ["LZ77/LZ78", "Lossless", "General-purpose"],
          ["DEFLATE", "Lossless", "gzip, PNG"],
          ["JPEG", "Lossy", "Photographs"],
          ["MP3/AAC", "Lossy", "Audio"],
        ],
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "Error Correction",
    tagline: "Adding redundancy to preserve information.",
    insight: "Redundancy enables error detection and correction. Hamming codes add enough redundancy to correct single-bit errors.",
    demo: "hamming",
    content: [
      {
        type: "p",
        text: "A block code maps k message bits to n transmitted bits (n > k). The code rate R = k/n. Shannon: for any R < C, there exists a code with arbitrarily low error probability as block length grows.",
      },
      {
        type: "code",
        text: "Hamming(7,4):\n\n4 message bits → 7 transmitted bits\nCorrects 1 error\nRate R = 4/7 ≈ 0.571\n\nEven parity example:\nData: 1011\nCount 1s: 3\nParity bit: 1 (to make even)\nTransmitted: 10111",
      },
      {
        type: "table",
        head: ["Code", "Rate", "Corrects"],
        rows: [
          ["Parity", "n-1/n", "Detects 1 error"],
          ["Hamming(7,4)", "4/7", "Corrects 1 error"],
          ["Reed-Solomon", "Variable", "Burst errors"],
          ["LDPC", "Near capacity", "Modern standard"],
        ],
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Cryptography",
    tagline: "Secrecy is a property of the key, not the cipher.",
    insight: "A key is a secret that determines which transformation is applied. Randomness is a computational resource — you cannot invent it.",
    demo: "crypto",
    content: [
      {
        type: "p",
        text: "A key is a random choice from a space. The security is proportional to how hard it is to guess. A key of n bits has 2^n possible values. Brute force averages 2^(n-1) guesses.",
      },
      {
        type: "code",
        text: "Key entropy:\nH(K) = n bits for uniform n-bit key\n\nBrute force:\nAverage 2^(n-1) guesses\n\nAES-256: 2^255 average guesses\n'password123': low entropy",
      },
      {
        type: "table",
        head: ["Type", "Example", "Key Property"],
        rows: [
          ["Symmetric", "AES-256", "Same key for encrypt/decrypt"],
          ["Asymmetric", "RSA, ECC", "Public/private key pair"],
          ["Hash", "SHA-256", "One-way, no key"],
          ["OTP", "One-time pad", "Perfect secrecy if key is random"],
        ],
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "Networks",
    tagline: "Reliable communication over unreliable links.",
    insight: "Every protocol layer adds framing, addressing, and error handling.",
    demo: "network",
    content: [
      {
        type: "p",
        text: "Bits go through copper, fiber, and radio as electrical, optical, or electromagnetic signals. HTTP 'files' are reassembled from TCP segments that are reassembled from IP packets that are carried by Ethernet frames.",
      },
      {
        type: "code",
        text: "OSI Layers:\n\n7. Application  → HTTP, DNS\n6. Presentation → TLS, JPEG\n5. Session      → Sockets\n4. Transport    → TCP, UDP\n3. Network      → IP\n2. Data Link    → Ethernet\n1. Physical     → Copper, fiber, radio",
      },
      {
        type: "insight",
        text: "Files are a user-level abstraction; at the network level, everything is packets. TCP turns unreliable packets into a reliable byte stream.",
      },
    ],
  },
  {
    n: 20,
    part: 5,
    title: "Information and Meaning",
    tagline: "Syntax is not semantics.",
    insight: "Information theory is silent on meaning. Meaning is assigned by interpreters — humans, software, or models.",
    demo: "semantics",
    content: [
      {
        type: "p",
        text: "The model manipulates vectors, not concepts. Whatever 'understanding' means for humans, the model performs a different kind of operation. Syntax: rules about symbol arrangement. Semantics: mapping of symbols to referents. Pragmatics: use in context.",
      },
      {
        type: "code",
        text: "Take 'The cat is on the mat.'\nCompute its embedding.\nCompare to 'Le chat est sur le tapis.'\nObserve nearness in vector space —\na proxy for meaning, not meaning itself.",
      },
      {
        type: "insight",
        text: "Computers can manipulate representations that correlate with meaning without possessing meaning.",
      },
    ],
  },
  {
    n: 21,
    part: 6,
    title: "What Is Inference?",
    tagline: "Training creates the model. Inference makes the money.",
    insight: "Every ChatGPT response, every Claude message — all inference, running 24/7.",
    content: [
      {
        type: "p",
        text: "Inference is using the trained model to generate text. While training happens once (expensively), inference runs continuously at massive scale.",
      },
      {
        type: "table",
        head: ["Aspect", "Scale"],
        rows: [
          ["Training Cost (GPT-4 est.)", "~$100M+"],
          ["Inference Cost per 1M Tokens", "~$10–$100"],
          ["Daily Users (large models)", "100M+"],
          ["Daily Inference Cost", "$100K+"],
        ],
      },
    ],
  },
  {
    n: 22,
    part: 6,
    title: "Information-Theoretic Limits",
    tagline: "What cannot be done, no matter the engineering.",
    insight: "No lossless compressor can beat entropy on average. No reliable communication can exceed channel capacity.",
    content: [
      {
        type: "p",
        text: "Some limits are imposed by mathematics, not physics. Better hardware does not help. Source coding and channel coding theorems are asymptotic statements about expected performance over all messages.",
      },
      {
        type: "code",
        text: "Source coding theorem:\nL* ≥ H(X)\n\nChannel coding theorem:\nR < C for reliable communication\n\nThese bounds are information-theoretic,\nnot merely technological.",
      },
      {
        type: "insight",
        text: "Recognizing fundamental limits prevents wasted effort and shapes design.",
      },
    ],
  },
  {
    n: 23,
    part: 6,
    title: "Information Theory and AI",
    tagline: "Learning as compression.",
    insight: "Prediction is the compression of experience.",
    demo: "crossentropy",
    content: [
      {
        type: "p",
        text: "The model assigns probabilities to possible next tokens given context. A confident correct prediction means low surprise — low information. Training minimizes cross-entropy between predicted and true distributions.",
      },
      {
        type: "code",
        text: "Cross-entropy:\nH(p, q) = -Σ p(x) log q(x)\n\nKL divergence:\nD_KL(p ‖ q) = H(p, q) − H(p)\n\nUniform predictor over 50K vocab:\nlog₂(50,000) ≈ 15.6 bits/token\nTrained LLMs reach ~2 bits/token",
      },
      {
        type: "table",
        head: ["Metric", "Value"],
        rows: [
          ["Uniform predictor (50K vocab)", "15.6 bits/token"],
          ["Trained LLM", "~2 bits/token"],
          ["True English entropy (est.)", "~1.5 bits/token"],
          ["Perplexity", "2^(cross-entropy)"],
        ],
      },
    ],
  },
  {
    n: 24,
    part: 6,
    title: "Research-Level Questions",
    tagline: "What remains open.",
    insight: "Information theory does not explain semantics. Computation and information are deeply related but not identical.",
    content: [
      {
        type: "p",
        text: "We can measure information without understanding meaning. This gap is the source of many open problems. Candidate open problems: the true entropy of natural language, the nature of generalization in deep learning, whether information-theoretic bounds constrain consciousness.",
      },
      {
        type: "code",
        text: "Open questions:\n\n• What is the true entropy of English?\n• Do information-theoretic bounds constrain learning?\n• Is grounding necessary for semantics?\n• What would a theory of meaning look like?",
      },
      {
        type: "insight",
        text: "The curriculum ends not with answers but with tools to ask better questions.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes information as a system?",
      opts: [
        "A very fast search engine",
        "A hierarchical stack from physical states to meaning",
        "A text generation program",
        "A large database of facts",
      ],
      ans: 1,
      exp: "Information is best understood as a layered system — from raw physical states at the bottom, through signals, bits, logic, computation, representation, all the way up to meaning at the top.",
    },
    {
      q: "Why does understanding all layers of the stack matter?",
      opts: [
        "It helps you write better code",
        "Each layer depends on those below it — you can't understand one in isolation",
        "It's required for job interviews",
        "Only researchers need this understanding",
      ],
      ans: 1,
      exp: "Every representation has constraints imposed by computation, which has constraints imposed by logic gates, which has constraints imposed by physics. Understanding the stack reveals why things work the way they do — and why certain problems are hard.",
    },
  ],
  1: [
    {
      q: "Does a computer understand English, numbers, or images?",
      opts: [
        "Yes, it understands all of them",
        "No, it manipulates physical states according to rules",
        "Only numbers",
        "Only text",
      ],
      ans: 1,
      exp: "A computer is a physical system. Electrons flow through silicon. Nothing in that flow 'knows' it is a letter or a number. We layer interpretations on top. Meaning is assigned by interpretation, not contained in the bits.",
    },
    {
      q: "What is the difference between a physical state and a symbol?",
      opts: [
        "There is no difference",
        "A physical state exists independently; a symbol is an interpretation of that state",
        "A symbol is always digital",
        "A physical state is always analog",
      ],
      ans: 1,
      exp: "A transistor has a physical state (charge accumulated in its channel). A wire has a measurable voltage. These exist whether or not anyone interprets them. We choose to interpret two ranges of voltage as 0 and 1. That choice is the birth of the 'bit'.",
    },
  ],
  15: [
    {
      q: "Why is information measured in logarithms?",
      opts: [
        "It's a technical trick",
        "Information is additive for independent events; logarithms turn multiplication of probabilities into addition",
        "Because computers use binary",
        "Because Shannon liked logarithms",
      ],
      ans: 1,
      exp: "If you learn two independent things, the total information should be the sum. Logarithms turn multiplication of probabilities into addition of information. Base 2 makes the unit the 'bit' — a choice between two equally likely alternatives.",
    },
    {
      q: "What is the entropy of a fair coin flip?",
      opts: ["0 bits", "0.5 bits", "1 bit", "2 bits"],
      ans: 2,
      exp: "For a fair coin, H = −0.5·log₂0.5 − 0.5·log₂0.5 = 1 bit. A fair coin has maximum entropy for a binary outcome — the outcome is maximally uncertain.",
    },
    {
      q: "What does conditional entropy H(X|Y) mean intuitively?",
      opts: [
        "The entropy of X and Y together",
        "How much uncertainty remains about X after learning Y",
        "The entropy of Y given X",
        "The mutual information between X and Y",
      ],
      ans: 1,
      exp: "Conditional entropy H(X|Y) measures how much uncertainty remains about X after Y is known. If Y tells you everything about X, H(X|Y) = 0. If Y tells you nothing, H(X|Y) = H(X).",
    },
  ],
  16: [
    {
      q: "Why can't every file be compressed?",
      opts: [
        "Compression algorithms are too slow",
        "By counting: there are 2^n strings of length n, but only 2^(n-1) strings shorter than n — so at most half can compress",
        "Files are already compressed",
        "Compression requires too much memory",
      ],
      ans: 1,
      exp: "A compression algorithm is a function from strings to strings that must be invertible. By a counting argument: there are 2^n bit strings of length n. There are only 2^(n-1) strings of length < n. So at most half of n-bit strings can compress. The rest must expand or stay the same.",
    },
    {
      q: "What is the theoretical limit of lossless compression?",
      opts: [
        "The file size divided by 2",
        "The entropy of the source",
        "The number of unique symbols",
        "The bandwidth of the channel",
      ],
      ans: 1,
      exp: "Shannon's source coding theorem: the expected code length per symbol is at least H(X). No lossless code can average fewer bits per symbol than the source's entropy. Entropy is the boundary of compressibility.",
    },
  ],
  23: [
    {
      q: "What does cross-entropy measure in language model training?",
      opts: [
        "The speed of the model",
        "The number of training steps",
        "How surprised the model was by the correct token",
        "The size of the model's weights",
      ],
      ans: 2,
      exp: "Cross-entropy measures the difference between the model's predicted probability distribution and the correct answer. If the model was very confident about the wrong answer, loss is very high. If it predicted correctly with high confidence, loss is near zero.",
    },
    {
      q: "What is the relationship between perplexity and cross-entropy?",
      opts: [
        "They are the same thing",
        "Perplexity = 2^(cross-entropy)",
        "Perplexity = cross-entropy squared",
        "There is no relationship",
      ],
      ans: 1,
      exp: "Perplexity = 2^(cross-entropy). If a model has cross-entropy of 2 bits/token, its perplexity is 2² = 4. Perplexity can be thought of as the weighted average number of choices the model is considering at each step.",
    },
  ],
  17: [
    {
      q: "How much redundancy is needed for error correction?",
      opts: [
        "50% always",
        "It depends on the channel's error rate and the target reliability",
        "100% always",
        "No redundancy is needed",
      ],
      ans: 1,
      exp: "More redundancy = more resilience but lower effective rate. A block code maps k message bits to n transmitted bits (n > k). Shannon: for any R < C, there exists a code with arbitrarily low error probability as block length grows.",
    },
    {
      q: "What does Hamming(7,4) accomplish?",
      opts: [
        "Compresses 7 bits to 4 bits",
        "Encodes 4 message bits as 7 transmitted bits, correcting 1 error",
        "Encrypts 7 bits",
        "Transmits 7 bits with no error correction",
      ],
      ans: 1,
      exp: "Hamming(7,4) takes 4 message bits and adds 3 parity bits to create 7 transmitted bits. It can correct any single-bit error. The code rate is 4/7 ≈ 0.571.",
    },
  ],
  18: [
    {
      q: "What makes a key good for cryptography?",
      opts: [
        "Its length in characters",
        "Its entropy — how random and unpredictable it is",
        "Whether it contains numbers and letters",
        "How easy it is to remember",
      ],
      ans: 1,
      exp: "A key is a random choice from a space. The security is proportional to how hard it is to guess. A key of n bits has 2^n possible values. Brute force averages 2^(n-1) guesses. If keys are biased, entropy is lower.",
    },
    {
      q: "What is Kerckhoffs's principle?",
      opts: [
        "The cipher must be secret",
        "The security lies in the key, not in the cipher",
        "Encryption must be symmetric",
        "Keys must be at least 256 bits",
      ],
      ans: 1,
      exp: "Kerckhoffs's principle states that a cryptosystem should be secure even if everything about the system, except the key, is public knowledge. The security lies in the key, not in the secrecy of the algorithm.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Bit", def: "The smallest binary distinction that can carry information. Defined by having exactly two distinguishable states.", ch: 8 },
  { term: "Boolean Algebra", def: "Algebraic system describing two-element sets with AND, OR, NOT operations. Foundation of digital circuit design.", ch: 6 },
  { term: "Byte", def: "A grouping of 8 bits. Not physically special, but standardized by IBM's System/360 in 1964.", ch: 8 },
  { term: "Channel Capacity", def: "The maximum rate at which information can be reliably transmitted over a noisy channel (Shannon–Hartley theorem).", ch: 14 },
  { term: "Compression", def: "Exploiting redundancy to reduce the number of bits needed to represent information. Bounded by entropy.", ch: 16 },
  { term: "Cross-Entropy", def: "Measures the average number of bits needed to encode the true distribution p using a code optimized for q. Used in LLM training.", ch: 23 },
  { term: "De Morgan's Laws", def: "¬(A ∧ B) = ¬A ∨ ¬B and ¬(A ∨ B) = ¬A ∧ ¬B. Push NOT through gates while swapping AND↔OR.", ch: 6 },
  { term: "Entropy", def: "Expected information from a random variable. H(X) = −Σ p(x) log₂ p(x). Sets the lower bound on lossless compression.", ch: 15 },
  { term: "Error Correction", def: "Adding redundancy to detect and correct errors introduced by noise during transmission.", ch: 17 },
  { term: "Hamming Code", def: "A block code that maps k message bits to n transmitted bits, correcting single-bit errors. Hamming(7,4) is common.", ch: 17 },
  { term: "Information", def: "Measured as uncertainty reduction. One bit reduces uncertainty by a factor of 2 when alternatives are equally likely.", ch: 15 },
  { term: "ISA", def: "Instruction Set Architecture. Formal specification of the set of state transitions a CPU can perform.", ch: 10 },
  { term: "KL Divergence", def: "D_KL(p ‖ q) = H(p, q) − H(p). Measures extra bits needed because you used the wrong code. Zero iff p = q.", ch: 23 },
  { term: "Logic Gate", def: "Physical device implementing a Boolean function. NAND and NOR are functionally complete.", ch: 5 },
  { term: "Machine Code", def: "Bit patterns interpreted by the CPU control unit to perform operations.", ch: 10 },
  { term: "MOSFET", def: "Metal-Oxide-Semiconductor Field-Effect Transistor. Voltage-controlled current valve. Dominant transistor in modern ICs.", ch: 4 },
  { term: "Nyquist–Shannon Sampling", def: "f_s > 2 f_max. A band-limited signal can be perfectly reconstructed from samples taken above twice its bandwidth.", ch: 9 },
  { term: "One-Time Pad", def: "Encryption using a random key as long as the message, used only once. Achieves perfect secrecy.", ch: 18 },
  { term: "Perplexity", def: "2^(cross-entropy). A measure of how well a language model predicts text. Lower is better.", ch: 23 },
  { term: "PN Junction", def: "Boundary between p-type and n-type semiconductor. Acts as a one-way valve for current. Basis of diodes and transistors.", ch: 3 },
  { term: "Redundancy", def: "Extra bits added to a message that carry no new information but enable error detection or correction.", ch: 17 },
  { term: "Shannon–Hartley", def: "C = B log₂(1 + S/N). Channel capacity increases logarithmically with signal-to-noise ratio.", ch: 14 },
  { term: "Signal", def: "A time-varying voltage or current used to carry information.", ch: 2 },
  { term: "Source Coding Theorem", def: "L* ≥ H(X). No lossless code can average fewer bits per symbol than the source's entropy.", ch: 16 },
  { term: "Tokenization", def: "Converting text into sub-word units (tokens) that a language model can process.", ch: 9 },
  { term: "Transistor", def: "A voltage-controlled current valve. Three terminals: gate, source, drain. Basis of all modern computing.", ch: 4 },
  { term: "Two's Complement", def: "Representation of signed integers: negative x stored as 2^n − x. Enables simple arithmetic.", ch: 9 },
  { term: "UTF-8", def: "Variable-length encoding of Unicode code points as bytes. Dominant character encoding on the web.", ch: 9 },
  { term: "Voltage", def: "Difference in electric potential energy per unit charge between two points. Measured in volts.", ch: 2 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 8], [0, 11],
  [1, 2], [1, 3], [1, 4], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 5],
  [3, 4], [3, 5],
  [4, 5], [4, 6], [4, 10],
  [5, 6], [5, 7],
  [6, 7],
  [8, 9], [8, 10],
  [9, 10], [9, 11],
  [10, 11], [10, 12],
  [11, 12], [11, 13],
  [12, 13], [12, 14],
  [13, 14], [13, 15],
  [14, 15], [14, 16],
  [15, 16], [15, 17],
  [16, 17], [16, 18],
  [17, 18], [17, 19],
  [18, 19], [18, 20],
  [19, 20], [19, 21],
  [20, 21], [20, 22],
  [21, 22], [21, 23],
  [22, 23], [22, 24],
  [23, 24],
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
function StackDemo() {
  const layers = [
    { l: "🌍 Physical States", d: "Electrons, voltages, charges — the raw substrate", c: "#60A5FA" },
    { l: "🔤 Signals", d: "Time-varying voltages that carry patterns", c: "#818CF8" },
    { l: "📐 Bits", d: "Distinguishable states we interpret as 0 and 1", c: "#34D399" },
    { l: "🧠 Logic Gates", d: "Transistors combined to compute Boolean functions", c: "#FBBF24" },
    { l: "🏋️ Computation", d: "Programs that transform state according to rules", c: "#F97316" },
    { l: "📱 Representation", d: "Numbers, text, images, audio encoded as bits", c: "#F87171" },
    { l: "🏢 Meaning", d: "Interpretation applied by humans, software, or models", c: "#A78BFA" },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <div style={{ paddingTop: 8 }}>
      {layers.map((l, i) => (
        <div
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 8,
            marginBottom: 5,
            background: active === i ? `${l.c}22` : T.elevated,
            border: `1px solid ${active === i ? l.c : T.border}`,
            cursor: "pointer",
            transition: "all .2s",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.c, flexShrink: 0 }} />
          <span style={{ color: T.text, fontWeight: 600, fontSize: 13, flex: 1 }}>{l.l}</span>
          {active === i && <span style={{ color: l.c, fontSize: 12 }}>{l.d}</span>}
          <span style={{ color: T.muted, fontSize: 10 }}>Layer {i}</span>
        </div>
      ))}
    </div>
  );
}

function VectorDemo() {
  const words = [
    { label: "Dog", x: 140, y: 110, vec: [0.91, 0.23, -0.55], c: "#34D399" },
    { label: "Cat", x: 175, y: 135, vec: [0.89, 0.19, -0.51], c: "#34D399" },
    { label: "Wolf", x: 108, y: 148, vec: [0.82, 0.15, -0.48], c: "#34D399" },
    { label: "Car", x: 315, y: 88, vec: [-0.11, 0.94, 0.72], c: "#F87171" },
    { label: "Truck", x: 345, y: 115, vec: [-0.15, 0.91, 0.68], c: "#F87171" },
    { label: "King", x: 230, y: 200, vec: [0.5, -0.3, 0.8], c: "#A78BFA" },
    { label: "Queen", x: 260, y: 228, vec: [0.48, -0.28, 0.78], c: "#A78BFA" },
  ];
  const [hov, setHov] = useState<typeof words[0] | null>(null);
  const dot = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0);
  const sim = (a: typeof words[0], b: typeof words[0]) => {
    const d = +dot(a.vec, b.vec).toFixed(3);
    return {
      val: d,
      label: d > 0.8 ? "Very Similar" : d > 0.5 ? "Related" : d > 0.2 ? "Loosely Related" : "Unrelated",
      color: d > 0.8 ? "#34D399" : d > 0.5 ? "#60A5FA" : d > 0.2 ? "#FBBF24" : "#F87171",
    };
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>Hover a word to see dot-product similarity with all others</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <svg width="420" height="280" style={{ background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, flexShrink: 0 }}>
          <text x={210} y={20} textAnchor="middle" fill={T.muted} fontSize="11">2D Projection of Embedding Space</text>
          {["Animals", "Vehicles", "Royalty"].map((g, i) => {
            const gx = [140, 325, 240][i], gy = [80, 78, 175][i];
            return (
              <g key={g}>
                <circle cx={gx} cy={gy} r={45} fill="none" stroke={["#34D399", "#F87171", "#A78BFA"][i]} strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
                <text x={gx} y={gy - 50} textAnchor="middle" fill={["#34D399", "#F87171", "#A78BFA"][i]} fontSize="10" opacity="0.7">{g}</text>
              </g>
            );
          })}
          {hov && words.filter((w) => w.label !== hov.label).map((w) => {
            const s = sim(hov, w);
            return <line key={w.label} x1={hov.x} y1={hov.y} x2={w.x} y2={w.y} stroke={s.color} strokeWidth={1.5} opacity={0.5} />;
          })}
          {words.map((w) => (
            <g key={w.label} onMouseEnter={() => setHov(w)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
              <circle cx={w.x} cy={w.y} r={hov?.label === w.label ? 12 : 8} fill={w.c} opacity={hov && hov.label !== w.label ? 0.5 : 1} style={{ transition: "all .15s" }} />
              <text x={w.x} y={w.y - 14} textAnchor="middle" fill={T.text} fontSize="12" fontWeight="600">{w.label}</text>
            </g>
          ))}
        </svg>
        {hov ? (
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ color: T.accent, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>From: {hov.label}</div>
            {words.filter((w) => w.label !== hov.label).map((w) => {
              const s = sim(hov, w);
              return (
                <div key={w.label} style={{ marginBottom: 6, padding: "6px 10px", borderRadius: 6, background: T.elevated, border: `1px solid ${T.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ color: T.text, fontSize: 13 }}>{w.label}</span>
                    <span style={{ color: s.color, fontSize: 12, fontFamily: "monospace" }}>{s.val}</span>
                  </div>
                  <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${Math.max(0, ((s.val + 1) / 2) * 100)}%`, height: "100%", background: s.color, transition: "width .3s" }} />
                  </div>
                  <div style={{ color: s.color, fontSize: 10, marginTop: 2 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: 13 }}>← Hover a word</div>
        )}
      </div>
    </div>
  );
}

function LogicGatePlayground() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const gates = [
    { name: "AND", out: a && b },
    { name: "OR", out: a || b },
    { name: "NOT A", out: !a },
    { name: "XOR", out: a !== b },
    { name: "NAND", out: !(a && b) },
    { name: "NOR", out: !(a || b) },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setA(!a)}
          style={{
            padding: "10px 18px",
            borderRadius: 20,
            border: `2px solid ${a ? T.green : T.border}`,
            background: a ? `${T.green}22` : T.elevated,
            color: a ? T.green : T.muted,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          Input A: {a ? "1" : "0"}
        </button>
        <button
          onClick={() => setB(!b)}
          style={{
            padding: "10px 18px",
            borderRadius: 20,
            border: `2px solid ${b ? T.green : T.border}`,
            background: b ? `${T.green}22` : T.elevated,
            color: b ? T.green : T.muted,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          Input B: {b ? "1" : "0"}
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {gates.map((g) => (
          <div
            key={g.name}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: g.out ? `${T.accent}22` : T.elevated,
              border: `2px solid ${g.out ? T.accent : T.border}`,
              textAlign: "center",
              transition: "all .2s",
            }}
          >
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".07em" }}>{g.name}</div>
            <div style={{ color: g.out ? T.accent : T.subtle, fontSize: 20, fontWeight: 800 }}>{g.out ? "1" : "0"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BinaryDecoder() {
  const [byte, setByte] = useState("01000001");
  const isValid = /^[01]{1,8}$/.test(byte);
  const decimal = isValid ? parseInt(byte, 2) : null;
  const hex = isValid && decimal !== null ? "0x" + decimal.toString(16).toUpperCase().padStart(2, "0") : "—";
  const ascii = isValid && decimal !== null && decimal >= 32 && decimal < 127 ? String.fromCharCode(decimal) : (decimal !== null && decimal < 32 ? "(control)" : "—");
  return (
    <div style={{ padding: 20 }}>
      <input
        value={byte}
        onChange={(e) => setByte(e.target.value.replace(/[^01]/g, "").slice(0, 8))}
        style={{
          width: "100%",
          background: T.elevated,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          color: T.accent,
          fontSize: 20,
          textAlign: "center",
          fontFamily: "monospace",
          letterSpacing: "0.15em",
          outline: "none",
          marginBottom: 16,
          boxSizing: "border-box",
        }}
        placeholder="Enter 8 bits"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 8 }}>
        {[
          { label: "Decimal", value: decimal ?? "—" },
          { label: "Hex", value: hex },
          { label: "ASCII", value: ascii },
          { label: "Bits", value: isValid ? byte.length : 0 },
        ].map((item) => (
          <div key={item.label} style={{ padding: "10px 12px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}` }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".07em" }}>{item.label}</div>
            <div style={{ color: T.text, fontSize: 14, fontFamily: "monospace" }}>{item.value}</div>
          </div>
        ))}
      </div>
      <p style={{ color: T.muted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>
        Same bits, four interpretations. None is more "true" than another.
      </p>
    </div>
  );
}

function EntropyVisualizer() {
  const [p, setP] = useState(0.5);
  const h = -(p * Math.log2(p || 1) + (1 - p) * Math.log2(1 - p || 1));
  const pct = h * 100;
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ color: T.text, fontSize: 14, fontWeight: 600 }}>P(heads) = {p.toFixed(2)}</span>
        <span style={{ color: T.accent, fontSize: 16, fontWeight: 700, fontFamily: "monospace" }}>H = {isNaN(h) ? 0 : h.toFixed(3)} bits</span>
      </div>
      <input
        type="range"
        min="0.01"
        max="0.99"
        step="0.01"
        value={p}
        onChange={(e) => setP(parseFloat(e.target.value))}
        style={{ width: "100%", marginBottom: 16, accentColor: T.accent }}
      />
      <div style={{ height: 24, background: T.elevated, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${T.accent}, ${T.purple})`, transition: "width .2s", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
          <span style={{ color: "#000", fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>{h.toFixed(2)}</span>
        </div>
      </div>
      <p style={{ color: T.muted, fontSize: 12, fontStyle: "italic" }}>
        Maximum entropy (1 bit) when the coin is fair. Zero entropy when one outcome is certain.
      </p>
    </div>
  );
}

function InterpretationSandbox() {
  const bytes = "01001000";
  const decimal = parseInt(bytes, 2);
  const signed = decimal > 127 ? decimal - 256 : decimal;
  const interpretations = [
    { label: "Unsigned int", value: decimal.toString() },
    { label: "Signed int8", value: signed.toString() },
    { label: "Hex", value: "0x" + decimal.toString(16).toUpperCase() },
    { label: "ASCII", value: String.fromCharCode(decimal) },
    { label: "Float (8-bit)", value: "≈ 1.5 × 10¹" },
    { label: "x86-64 opcode", value: "(partial — REX prefix)" },
  ];
  return (
    <div style={{ padding: 20 }}>
      <div style={{ padding: "12px 16px", borderRadius: 10, background: T.elevated, border: `1px solid ${T.border}`, textAlign: "center", fontFamily: "monospace", fontSize: 20, color: T.accent, letterSpacing: "0.15em", marginBottom: 16 }}>
        {bytes}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {interpretations.map((i) => (
          <div key={i.label} style={{ padding: "10px 12px", borderRadius: 8, background: T.elevated, border: `1px solid ${T.border}` }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: ".07em" }}>{i.label}</div>
            <div style={{ color: T.text, fontSize: 12, fontFamily: "monospace", wordBreak: "break-all" }}>{i.value}</div>
          </div>
        ))}
      </div>
      <p style={{ color: T.muted, fontSize: 12, marginTop: 12, fontStyle: "italic" }}>
        The bits do not choose. The interpreter does.
      </p>
    </div>
  );
}

function EquationCard({ eq }: { eq: { plain: string; variables: { symbol: string; meaning: string }[]; intuition: string; example: string } }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div style={{ padding: 20, borderRadius: 14, background: T.elevated, border: `1px solid ${T.border}`, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ color: T.purple, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Equation</div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{ background: "transparent", border: "none", color: T.accent, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
        >
          {showDetails ? "Hide" : "Show"} details
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "16px 0", fontFamily: "monospace", fontSize: 18, color: T.text, letterSpacing: "0.05em" }}>
        {eq.plain}
      </div>
      {showDetails && (
        <div style={{ paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 6 }}>Variables</div>
            {eq.variables.map((v) => (
              <div key={v.symbol} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 13 }}>
                <span style={{ color: T.purple, fontFamily: "monospace", fontWeight: 700, minWidth: 40 }}>{v.symbol}</span>
                <span style={{ color: T.subtle }}>{v.meaning}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 4 }}>Intuition</div>
            <p style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{eq.intuition}</p>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 4 }}>Example</div>
            <p style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6, fontFamily: "monospace" }}>{eq.example}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AI Tutor ──────────────────────────────────────────────────────────────
function AiTutor({ ch }: { ch: (typeof CHAPTERS)[0] }) {
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const ctx = `Chapter ${ch.n}: "${ch.title}"\nTagline: ${ch.tagline}\nKey insight: ${ch.insight || ""}\nContent: ${ch.content
    .filter((b) => b.type === "p" || b.type === "insight")
    .map((b) => b.text)
    .join(" ")}`;
  const suggestions = [
    `Explain "${ch.title}" like I'm 5`,
    `Most common misconception about ${ch.title}?`,
    `How does ${ch.title} connect to real frontier models?`,
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
          system: `You are an expert AI tutor helping someone learn information theory. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
          messages: nm,
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b: { text?: string }) => b.text || "").join("") || "Sorry, I couldn't generate a response. Please try again.";
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
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: T.elevated,
                    border: `1px solid ${T.border}`,
                    color: T.subtle,
                    cursor: "pointer",
                    fontSize: 13,
                    lineHeight: 1.4,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 10,
                background: m.role === "user" ? `${T.accent}22` : T.elevated,
                border: `1px solid ${m.role === "user" ? T.accent : T.border}`,
                color: T.text,
                fontSize: 13,
                lineHeight: 1.65,
              }}
            >
              {m.role === "assistant" && (
                <div style={{ color: T.accent, fontWeight: 700, fontSize: 10, marginBottom: 5, letterSpacing: ".08em" }}>🤖 AI TUTOR</div>
              )}
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
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask anything about this chapter…"
          style={{
            flex: 1,
            background: T.elevated,
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: "10px 14px",
            color: T.text,
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: loading || !input.trim() ? T.elevated : T.accent,
            color: loading || !input.trim() ? T.muted : "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 13,
            transition: "all .2s",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ── Quiz ──────────────────────────────────────────────────────────────────
function QuizPane({ ch, onScore }: { ch: (typeof CHAPTERS)[0]; onScore?: (n: number, score: number, total: number) => void }) {
  const qs = QUIZZES[ch.n as keyof typeof QUIZZES];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  if (!qs)
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
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
  const reset = () => {
    setAnswers({});
    setRevealed({});
    setScore(null);
  };
  const allAnswered = Object.keys(answers).length === qs.length;
  return (
    <div>
      {score !== null && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: score === qs.length ? "#34D39922" : "#FBBF2422",
            border: `1px solid ${score === qs.length ? "#34D399" : "#FBBF24"}`,
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: T.text, fontWeight: 700 }}>
            Score: {score}/{qs.length} {score === qs.length ? "🎉 Perfect!" : score >= qs.length / 2 ? "👍 Good!" : "📚 Keep studying!"}
          </span>
          <button
            onClick={reset}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: T.elevated,
              border: `1px solid ${T.border}`,
              color: T.text,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Retry
          </button>
        </div>
      )}
      {qs.map((q, qi) => (
        <div
          key={qi}
          style={{
            marginBottom: 20,
            padding: "16px",
            borderRadius: 10,
            background: T.elevated,
            border: `1px solid ${revealed[qi] ? (answers[qi] === q.ans ? "#34D39944" : "#F8717144") : T.border}`,
          }}
        >
          <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
            Q{qi + 1}. {q.q}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {q.opts.map((opt, oi) => {
              const isSel = answers[qi] === oi;
              const isCorr = revealed[qi] && oi === q.ans;
              const isWrong = revealed[qi] && isSel && oi !== q.ans;
              return (
                <div
                  key={oi}
                  onClick={() => !revealed[qi] && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: isCorr ? "#34D39922" : isWrong ? "#F8717122" : isSel ? `${T.accent}22` : T.surface,
                    border: `1px solid ${isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.border}`,
                    cursor: revealed[qi] ? "default" : "pointer",
                    color: T.text,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all .15s",
                  }}
                >
                  <span style={{ color: isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.muted, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                    {isCorr ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                </div>
              );
            })}
          </div>
          {revealed[qi] && (
            <div
              style={{
                marginTop: 10,
                padding: "10px 14px",
                borderRadius: 8,
                background: `${T.accent}11`,
                border: `1px solid ${T.accent}44`,
                color: T.subtle,
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              💡 {q.exp}
            </div>
          )}
        </div>
      ))}
      {!score && allAnswered && (
        <button
          onClick={submit}
          style={{
            padding: "10px 24px",
            borderRadius: 20,
            background: T.accent,
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Submit Quiz
        </button>
      )}
      {!allAnswered && <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>Answer all {qs.length} questions to submit</div>}
    </div>
  );
}

// Type guards
function isTableBlock(b: any): b is { type: "table"; head: string[]; rows: string[][] } {
  return b.type === "table" && "head" in b && "rows" in b;
}
function isStackBlock(b: any): b is { type: "stack"; rows: [string, string][] } {
  return b.type === "stack" && "rows" in b && Array.isArray(b.rows);
}

// ── Block Renderer ────────────────────────────────────────────────────────
function Block({ b }: { b: (typeof CHAPTERS)[0]["content"][0] }) {
  if (b.type === "p")
    return <p style={{ color: T.subtle, lineHeight: 1.75, fontSize: 14, margin: "0 0 14px" }}>{b.text}</p>;
  if (b.type === "insight")
    return (
      <div
        style={{
          padding: "12px 16px",
          borderRadius: 10,
          background: `${T.accent}11`,
          border: `1px solid ${T.accent}55`,
          margin: "14px 0",
          display: "flex",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ color: T.text, fontSize: 13, lineHeight: 1.6 }}>{b.text}</span>
      </div>
    );
  if (b.type === "code")
    return (
      <pre
        style={{
          background: "#020812",
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          overflow: "auto",
          fontSize: 12,
          color: "#7DD3FC",
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          lineHeight: 1.6,
          margin: "0 0 14px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
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
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      color: T.accent,
                      fontWeight: 700,
                      borderBottom: `1px solid ${T.border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {b.rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : T.elevated }}>
                {(Array.isArray(row) ? row : [row]).map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "8px 12px",
                      color: j === 0 ? T.text : T.subtle,
                      borderBottom: `1px solid ${T.border}44`,
                      lineHeight: 1.5,
                    }}
                  >
                    {cell}
                  </td>
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
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              marginBottom: 4,
              borderRadius: 8,
              background: T.elevated,
              border: `1px solid ${T.border}`,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 3,
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                borderRadius: "8px 0 0 8px",
                background: `hsl(${200 + i * 25},70%,60%)`,
              }}
            />
            <div style={{ fontWeight: 700, color: T.text, fontSize: 13, minWidth: 180 }}>{label}</div>
            <div style={{ color: T.muted, fontSize: 12 }}>{desc}</div>
          </div>
        ))}
      </div>
    );
  return null;
}

// ── Chapter View ──────────────────────────────────────────────────────────
function ChapterView({
  ch,
  onBack,
  color,
  read,
  toggleRead,
  notes,
  setNotes,
  onScore,
}: {
  ch: (typeof CHAPTERS)[0];
  onBack: () => void;
  color: string;
  read: Set<number>;
  toggleRead: (n: number) => void;
  notes: Record<number, string>;
  setNotes: (n: Record<number, string>) => void;
  onScore: (n: number, score: number, total: number) => void;
}) {
  const [tab, setTab] = useState("content");
  const DemoComponents: Record<string, React.ComponentType> = {
    stack: StackDemo,
    vectors: VectorDemo,
    logic: LogicGatePlayground,
    binary: BinaryDecoder,
    entropy: EntropyVisualizer,
    interpretation: InterpretationSandbox,
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
      <button
        onClick={onBack}
        style={{
          background: "transparent",
          border: "none",
          color: T.muted,
          cursor: "pointer",
          fontSize: 13,
          padding: "16px 0",
          marginBottom: 4,
        }}
      >
        ← Back to Curriculum
      </button>
      <div
        style={{
          padding: "20px 24px",
          borderRadius: 14,
          background: T.surface,
          border: `1px solid ${color}44`,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: color, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
              Chapter {ch.n} · Part {ch.part}
            </div>
            <h1 style={{ color: T.text, fontSize: 22, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.3 }}>{ch.title}</h1>
            <p style={{ color: T.muted, fontSize: 14, margin: 0 }}>{ch.tagline}</p>
          </div>
          <button
            onClick={() => toggleRead(ch.n)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              background: read.has(ch.n) ? `${color}22` : "transparent",
              border: `1px solid ${read.has(ch.n) ? color : T.border}`,
              color: read.has(ch.n) ? color : T.muted,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {read.has(ch.n) ? "✓ Read" : "Mark as Read"}
          </button>
        </div>
        {ch.insight && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 8,
              background: `${color}11`,
              border: `1px solid ${color}44`,
              color: color,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✦ {ch.insight}
          </div>
        )}
      </div>
      <RelatedCurriculums currentId="information-theory" chapter={ch} />
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 16,
          background: T.surface,
          borderRadius: 10,
          padding: 4,
          border: `1px solid ${T.border}`,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 8,
              border: "none",
              background: tab === t.id ? T.elevated : "transparent",
              color: tab === t.id ? T.text : T.muted,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 400,
              transition: "all .15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {t.label}
            {t.badge && (
              <span style={{ background: color, color: "#000", borderRadius: 10, padding: "1px 5px", fontSize: 10, fontWeight: 700 }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div>
        {tab === "content" && (
          <div>
            {ch.content.map((b, i) => (
              <Block key={i} b={b} />
            ))}
            {DemoComponent && (
              <div style={{ padding: "20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginTop: 8 }}>
                <div style={{ color: T.accent, fontWeight: 700, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>
                  ⚡ Interactive Demo
                </div>
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
            <textarea
              value={notes[ch.n] || ""}
              onChange={(e) => setNotes({ ...notes, [ch.n]: e.target.value })}
              placeholder={`Your notes on "${ch.title}"…\n\nJot down key ideas, questions, or connections to other chapters.`}
              style={{
                width: "100%",
                minHeight: 240,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "16px",
                color: T.text,
                fontSize: 14,
                lineHeight: 1.7,
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
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
function ConceptMap({ openChapter, read }: { openChapter: (n: number) => void; read: Set<number> }) {
  const [hov, setHov] = useState<number | null>(null);
  const W = 760, H = 520;
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 40px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>🕸️ Knowledge Graph</h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>
        All {CHAPTERS.length} chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
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
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms and definitions…"
        style={{
          width: "100%",
          background: T.elevated,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          padding: "12px 16px",
          color: T.text,
          fontSize: 14,
          outline: "none",
          marginBottom: 16,
          boxSizing: "border-box",
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(290px,100%),1fr))", gap: 10 }}>
        {filtered.map((g) => (
          <div key={g.term} style={{ padding: "14px 16px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{g.term}</span>
              {g.ch != null && (
                <button
                  onClick={() => openChapter(g.ch!)}
                  style={{ background: "transparent", border: "none", color: T.accent, cursor: "pointer", fontSize: 11, padding: 0, whiteSpace: "nowrap" }}
                >
                  Ch {g.ch} →
                </button>
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
  setView: (v: string) => void;
  openChapter: (n: number) => void;
  selCh: number | null;
  read: Set<number>;
  quizScores: Record<number, { score: number; total: number }>;
  search: string;
  setSearch: (s: string) => void;
  mobile: boolean;
}) {
  const [expanded, setExpanded] = useState(new Set([0, 1, 2, 3]));
  const toggle = (id: number) => setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  const totalQ = Object.values(quizScores).reduce((a, s) => a + s.score, 0);
  const maxQ = Object.values(quizScores).reduce((a, s) => a + s.total, 0);
  return (
    <div
      style={{
        width: mobile ? "100%" : 270,
        background: T.surface,
        borderRight: mobile ? "none" : `1px solid ${T.border}`,
        borderBottom: mobile ? `1px solid ${T.border}` : "none",
        height: mobile ? "auto" : "100vh",
        overflowY: mobile ? "visible" : "auto",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        maxHeight: mobile ? "none" : "100vh",
      }}
    >
      <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 18 }}>🧠</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Information Theory</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>From Electrons to Meaning</div>
      </div>
      {mobile ? (
        <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 12px", borderBottom: `1px solid ${T.border}`, WebkitOverflowScrolling: "touch" }}>
          {[
            { id: "home", icon: "🏠", label: "Home" },
            { id: "map", icon: "🕸️", label: "Map" },
            { id: "glossary", icon: "📖", label: "Glossary" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              style={{
                flex: "0 0 auto",
                padding: "8px 12px",
                borderRadius: 999,
                border: `1px solid ${view === v.id ? T.accent : T.border}`,
                background: view === v.id ? `${T.accent}22` : T.elevated,
                color: view === v.id ? T.text : T.muted,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
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
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 8,
                border: "none",
                background: view === v.id ? T.elevated : "transparent",
                color: view === v.id ? T.text : T.muted,
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              {v.icon}
            </button>
          ))}
        </div>
      )}
      <div style={{ padding: mobile ? "10px 12px 8px" : "8px 12px", borderBottom: `1px solid ${T.border}` }}>
        {mobile ? (
          <>
            <div style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Jump to chapter</div>
            <select
              value={selCh ?? ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value)) openChapter(value);
              }}
              style={{
                width: "100%",
                background: T.elevated,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: T.text,
                fontSize: 12,
                outline: "none",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select a chapter</option>
              {CHAPTERS.map((chapter) => (
                <option key={chapter.n} value={chapter.n}>
                  Ch {chapter.n}: {chapter.title}
                </option>
              ))}
            </select>
          </>
        ) : (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chapters…"
            style={{
              width: "100%",
              background: T.elevated,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "7px 12px",
              color: T.text,
              fontSize: 12,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
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
              {isExp &&
                filteredChs.map((n) => {
                  const ch = chMap[n];
                  if (!ch) return null;
                  const isSel = selCh === n && view === "chapter";
                  const isRead = read.has(n);
                  const hasQ = !!QUIZZES[n as keyof typeof QUIZZES];
                  return (
                    <div
                      key={n}
                      onClick={() => openChapter(n)}
                      style={{
                        padding: "6px 16px 6px 32px",
                        cursor: "pointer",
                        background: isSel ? `${color}18` : "transparent",
                        borderLeft: `3px solid ${isSel ? color : "transparent"}`,
                        transition: "all .15s",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ color: isSel ? color : T.text, fontSize: 12, fontWeight: isSel ? 700 : 400, lineHeight: 1.3 }}>
                          Ch {n} — {ch.title}
                        </div>
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
function Overview({
  setView,
  openChapter,
  read,
  quizScores,
}: {
  setView: (v: string) => void;
  openChapter: (n: number) => void;
  read: Set<number>;
  quizScores: Record<number, { score: number; total: number }>;
}) {
  const [activePath, setActivePath] = useState<number | null>(null);
  const paths = [
    { label: "Novice Path", color: T.blue, desc: "Ch 0 → Read straight through the stack", chs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { label: "Engineer Track", color: T.green, desc: "Focus on logic, binary, and computation", chs: [5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { label: "Researcher Route", color: T.purple, desc: "Deep dive into entropy, compression, coding", chs: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
    { label: "Executive View", color: T.amber, desc: "Strategy, limits, and open questions", chs: [20, 21, 22, 23, 24] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div className="curriculum-overview" style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <CurriculumHero eyebrow="Signal path" title="Information Theory" description="A visual route from bits and probability to entropy, communication, compression, and meaning." icon="📡" color="#2DD4BF" secondaryColor="#60A5FA" parts={PARTS.length} chapters={CHAPTERS.length} terms={GLOSSARY.length} signal="Bits → uncertainty → meaning" nodes={["Bits", "Code", "Entropy", "Signal", "AI"]} />
      <div style={{ padding: "40px 0 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, #22D3EE0A 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ color: T.accent, fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
          Version 3.0 · 2026
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 900,
            margin: "0 0 10px",
            background: "linear-gradient(135deg,#F0F6FF 30%,#22D3EE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          From Electrons to Meaning
        </h1>
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          {CHAPTERS.length} Chapters · From Fundamentals to Frontier Systems
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "🕸️", label: "Concept Map", action: () => setView("map") },
            { icon: "📖", label: "Glossary", action: () => setView("glossary") },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                background: T.elevated,
                border: `1px solid ${T.border}`,
                color: T.text,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { n: CHAPTERS.length, label: "Chapters" },
          { n: 13, label: "Parts" },
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
          <div style={{ color: T.subtle, fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".07em" }}>
            Continue where you left off
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {recentlyRead.map((n) => {
              const ch = CHAPTERS.find((c) => c.n === n);
              if (!ch) return null;
              return (
                <button
                  key={n}
                  onClick={() => openChapter(n)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: T.elevated,
                    border: `1px solid ${PC[ch.part]}44`,
                    color: T.text,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Ch {n}: {ch.title}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
        <div style={{ color: T.text, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📍 Choose a Learning Path</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          {paths.map((p, i) => (
            <div
              key={i}
              onClick={() => setActivePath(activePath === i ? null : i)}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: activePath === i ? `${p.color}22` : T.elevated,
                border: `2px solid ${activePath === i ? p.color : T.border}`,
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.label}</div>
              <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {PARTS.map((p) => {
        const color = PC[p.id];
        const chapters = p.chs.map((n) => CHAPTERS.find((c) => c.n === n)).filter(Boolean) as (typeof CHAPTERS)[0][];
        return (
          <div key={p.id} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span>{p.icon}</span>
              <span style={{ color: color, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" }}>
                Part {p.id} — {p.label}
              </span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
              {chapters.map((ch) => {
                const isRead = read.has(ch.n);
                const hi = highlighted ? highlighted.has(ch.n) : false;
                const dim = highlighted && !hi;
                const qs = quizScores[ch.n];
                return (
                  <div
                    key={ch.n}
                    onClick={() => openChapter(ch.n)}
                    style={{
                      padding: "14px",
                      borderRadius: 10,
                      background: hi ? `${color}22` : T.surface,
                      border: `1px solid ${hi ? color : dim ? "#0E1C3044" : T.border}`,
                      cursor: "pointer",
                      opacity: dim ? 0.4 : 1,
                      transition: "all .2s",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", top: 8, right: 10, display: "flex", gap: 4 }}>
                      {isRead && <span style={{ color: color, fontSize: 12 }}>✓</span>}
                      {ch.demo && <span style={{ color: T.accent, fontSize: 10 }}>⚡</span>}
                      {QUIZZES[ch.n as keyof typeof QUIZZES] && <span style={{ color: T.amber, fontSize: 10 }}>🎯</span>}
                    </div>
                    <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>Ch {ch.n}</div>
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
    s.textContent = `* { box-sizing: border-box; } body { margin:0; font-family:'Inter',system-ui,sans-serif; background:#040810; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} } input::placeholder{color:#4A6A8A;} textarea::placeholder{color:#4A6A8A;}`;
    document.head.appendChild(s);
  }, []);

  const openChapter = (n: number) => {
    setSelCh(n);
    setView("chapter");
    setSearch("");
  };
  const toggleRead = (n: number) =>
    setRead((r) => {
      const s = new Set(r);
      s.has(n) ? s.delete(n) : s.add(n);
      return s;
    });
  const onScore = (n: number, score: number, total: number) => setQuizScores((q) => ({ ...q, [n]: { score, total } }));

  const ch = selCh !== null ? CHAPTERS.find((c) => c.n === selCh) : null;
  const color = ch ? PC[ch.part] : T.accent;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        minHeight: "100vh",
        height: mobile ? "auto" : "100vh",
        overflow: mobile ? "visible" : "hidden",
        background: T.bg,
        color: T.text,
      }}
    >
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