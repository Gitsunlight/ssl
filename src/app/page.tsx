"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
  {
    id: 1,
    label: "Mathematical Foundations",
    icon: "∑",
    chs: [1, 2, 3, 4, 5, 6, 7],
  },
  { id: 2, label: "Neural Networks", icon: "🧠", chs: [8, 9, 10] },
  {
    id: 3,
    label: "Transformer Architecture",
    icon: "⚡",
    chs: [11, 12, 13, 14, 15],
  },
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

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of the Territory",
    tagline:
      "The complete vertical stack — from raw data to AI-operated organizations",
    insight:
      "Most people only see the product layer. The frontier is built on every layer beneath.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Before any technical detail, you need a mental model of what an LLM actually is — not as a chatbot, but as a layered technical system built on seven distinct strata.",
      },
      {
        type: "stack",
        rows: [
          ["🌍 Internet → Data", "Every book, article, code, conversation ever written"],
          ["🔤 Tokens", "Text broken into sub-word units computers can process as numbers"],
          ["📐 Vectors & Matrices", "Words transformed into geometric coordinates; all AI is matrix multiplication"],
          ["🧠 Neural Network → Transformer", "The architecture that processes and generates language"],
          ["🏋️ Training → Inference", "Learning from data, then using that knowledge to answer queries"],
          ["📱 Products → Agents", "Consumer apps; autonomous AI workers"],
          ["🏢 Organizations", "The ultimate goal: AI that runs entire business operations"],
        ],
      },
      {
        type: "insight",
        text: "Start at the top (data). Every concept connects downward to mathematics, upward to products. You cannot understand any layer without understanding the ones below it.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "Vectors",
    tagline: "Words become points. Meaning becomes geometry.",
    insight: "Without vectors: no semantic relationships, no learning, no attention, no LLMs.",
    demo: "vectors",
    content: [
      {
        type: "p",
        text: "A vector is a list of numbers. Every concept, every word, every relationship in an LLM exists as a point in high-dimensional space. Computers understand only numbers — meaning must be encoded as coordinates.",
      },
      {
        type: "code",
        text: "Dog  = [0.91, 0.23, -0.55]\nCat  = [0.89, 0.19, -0.51]  ← Very close to Dog\nCar  = [-0.11, 0.94, 0.72]  ← Far from Dog",
      },
      {
        type: "table",
        head: ["Model Class", "Embedding Dimension"],
        rows: [
          ["Smaller Models", "1,536"],
          ["Mid-Size Models", "3,072"],
          ["GPT-3 Class", "4,096"],
          ["Frontier Models", "8,192+"],
        ],
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Matrices",
    tagline: "All of AI is matrix multiplication",
    insight: "Frontier AI companies are, at their core, matrix multiplication companies.",
    content: [
      {
        type: "p",
        text: "A matrix is a table of numbers. Every operation in an LLM — neurons, transformers, attention — is ultimately matrix multiplication.",
      },
      {
        type: "table",
        head: ["Component", "Operation"],
        rows: [
          ["Neuron Layer", "Matrix Multiplication"],
          ["Transformer Layer", "Matrix Multiplication"],
          ["Attention", "Matrix Multiplication"],
          ["GPU Hardware", "Optimized for Matrix Multiplication"],
        ],
      },
      {
        type: "insight",
        text: "The entire frontier AI race boils down to: who can perform more matrix multiplications for less money and less energy?",
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Tensors",
    tagline: "Multi-dimensional arrays that flow through every neural network",
    insight: "Everything in deep learning is a tensor.",
    content: [
      {
        type: "p",
        text: "A tensor is a generalized matrix. Think of it as a multi-dimensional array that carries data of any shape through a neural network.",
      },
      {
        type: "code",
        text: "Scalar (0D) → 5\nVector (1D) → [1, 2, 3]\nMatrix (2D) → [[1,2],[3,4]]\nTensor (nD) → Multi-dimensional array\n\nTypical LLM tensor: [32, 8192, 4096]\n  32   = batch size (sequences)\n  8192 = sequence length (tokens)\n  4096 = hidden dimension",
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Dot Product",
    tagline: "The most important operation in AI — measures similarity between vectors",
    insight: "The trillion-dollar AI industry is built on Q · K = Attention Score.",
    demo: "vectors",
    content: [
      {
        type: "p",
        text: "The dot product multiplies matching elements of two vectors and sums the results. What it measures: similarity.",
      },
      {
        type: "code",
        text: "A · B = Σ(aᵢ × bᵢ)\n\nDog · Cat = Large value  → Semantically similar\nDog · Car = Small value  → Semantically different",
      },
      {
        type: "insight",
        text: "Attention = Q · K. The Query asks 'what am I looking for?' The Key answers 'what do I contain?' Their dot product produces an attention score. This single operation is at the heart of every frontier model.",
      },
    ],
  },
  {
    n: 5,
    part: 1,
    title: "Information Theory",
    tagline: "The mathematics of surprise, uncertainty, and prediction",
    insight: "AI is fundamentally an entropy reduction machine.",
    content: [
      {
        type: "p",
        text: "Created by Claude Shannon in 1948. Entropy measures how surprised you are by an outcome. Language modeling is: predict the next token → reduce uncertainty at each step.",
      },
      {
        type: "table",
        head: ["Entropy Level", "Example", "Meaning"],
        rows: [
          ["Low", "'The sun will rise tomorrow'", "Not surprised — low information content"],
          ["High", "Lottery: 7-14-23-31-42", "Very surprised — high information content"],
        ],
      },
      {
        type: "insight",
        text: "Training an LLM is training it to be less surprised by human text — to assign high probability to the tokens humans actually write.",
      },
    ],
  },
  {
    n: 6,
    part: 1,
    title: "Cross Entropy Loss",
    tagline: "The heartbeat of training — measures how wrong the model is",
    insight: "Every weight update in every LLM traces back to cross entropy loss.",
    content: [
      {
        type: "p",
        text: "Cross entropy measures the difference between the model's predicted probability distribution and the correct answer. The training loop minimizes this number trillions of times.",
      },
      {
        type: "table",
        head: ["Scenario", "Prediction", "Loss"],
        rows: [
          ["Good Prediction", "Blue: 90%, Green: 5%, Dog: 5%", "Very Low ✅"],
          ["Bad Prediction", "Dog: 90%, Blue: 5%, Green: 5%", "Very High ❌"],
        ],
      },
      {
        type: "insight",
        text: "The Training Loop: Forward Pass → Cross Entropy Loss → Backward Pass → Update Weights → Repeat. This cycle, run trillions of times, is how LLMs learn.",
      },
    ],
  },
  {
    n: 7,
    part: 1,
    title: "Optimization",
    tagline: "Finding the lowest valley in a billion-dimensional landscape",
    insight: "Modern LLMs navigate a loss landscape with hundreds of billions of dimensions.",
    content: [
      {
        type: "p",
        text: "Optimization finds the best weights by minimizing the loss function. Imagine navigating a vast mountainous terrain blindfolded, always stepping downhill.",
      },
      {
        type: "table",
        head: ["Method", "How It Works", "Used For"],
        rows: [
          ["SGD", "Simple downhill walking", "Research, simple models"],
          ["Adam", "Remembers past gradients", "Most modern LLMs"],
          ["AdamW", "Adam + Weight Decay", "Frontier models"],
          ["Shampoo", "Second-order information", "Meta's models"],
        ],
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "The Artificial Neuron",
    tagline: "A mathematical simplification of biological neurons",
    insight: "Millions of simple neurons, connected in layers, give rise to complex intelligence.",
    content: [
      {
        type: "p",
        text: "An artificial neuron mimics the biological neuron: receive inputs, weight them, sum them, apply an activation function to produce an output.",
      },
      {
        type: "code",
        text: "y = activation( Σ(wᵢ × xᵢ) + bias )",
      },
      {
        type: "table",
        head: ["Biological", "Artificial Equivalent"],
        rows: [
          ["Dendrites", "Input features (x₁, x₂, x₃)"],
          ["Synaptic weights", "Connection weights (w₁, w₂, w₃)"],
          ["Axon", "Activation function"],
          ["Neurotransmitters", "Signal output"],
        ],
      },
    ],
  },
  {
    n: 9,
    part: 2,
    title: "Activation Functions",
    tagline: "Without them, the entire network collapses to a single linear operation",
    insight: "Activations are the difference between a lookup table and deep learning.",
    content: [
      {
        type: "p",
        text: "Without activation functions, stacking layers does nothing useful — they all collapse into a single linear transformation. Activations break this, letting each layer learn genuinely new representations.",
      },
      {
        type: "table",
        head: ["Function", "Formula", "Use Case"],
        rows: [
          ["ReLU", "max(0, x)", "Computer vision"],
          ["GELU", "x × Φ(x)", "Most LLMs (GPT, Claude)"],
          ["SiLU", "x × σ(x)", "Many modern LLMs"],
          ["Swish", "x × σ(βx)", "Some frontier models"],
        ],
      },
    ],
  },
  {
    n: 10,
    part: 2,
    title: "Residual Connections",
    tagline: "Skip connections that enabled 100+ layer networks",
    insight: "Output = Layer(x) + x — a simple addition that unlocked the deep learning era.",
    content: [
      {
        type: "p",
        text: "Residual connections allow information to bypass layers. This prevents the vanishing gradient problem that made deep networks untrainable before 2015.",
      },
      {
        type: "code",
        text: "Output = Layer(x) + x  ← the skip connection",
      },
      {
        type: "table",
        head: ["Without Residuals", "With Residuals"],
        rows: [
          ["100-layer transformers → FAIL ❌", "100-layer transformers → SUCCEED ✅"],
          ["Signal degrades after many layers", "Identity path preserves information"],
          ["Gradients vanish during backprop", "Clean gradient highways through network"],
        ],
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Tokenization",
    tagline: "Converting text into numbers — the first step of every LLM",
    insight: "Computers don't read text. They read numbers. Tokenization is the translation layer.",
    content: [
      {
        type: "p",
        text: "LLMs don't process text directly. Every piece of text is first broken into tokens (sub-word units) using Byte Pair Encoding, then converted to integer IDs.",
      },
      {
        type: "code",
        text: '"Hello world"  →  [15496, 995]\n\nBPE Algorithm:\n1. Start with individual characters\n2. Find most frequent adjacent pair\n3. Merge into a new token\n4. Repeat until vocab size reached (~50K tokens)',
      },
      {
        type: "table",
        head: ["Text", "Token IDs"],
        rows: [
          ['"Hello"', "[15496]"],
          ['"Hello world"', "[15496, 995]"],
          ['"The quick brown fox"', "[464, 2068, 7586, 21891]"],
        ],
      },
    ],
  },
  {
    n: 12,
    part: 3,
    title: "Embeddings",
    tagline: "Tokens become vectors; vectors become meaning",
    insight: "King − Man + Woman ≈ Queen — vector arithmetic works in embedding space.",
    content: [
      {
        type: "p",
        text: "The embedding table maps each token ID to a high-dimensional vector. These vectors are learned during training — the model discovers how to organize concepts in geometric space so semantically related things are physically close.",
      },
      {
        type: "code",
        text: "Token ID → Embedding Table (Lookup) → [0.22, -1.12, 0.44, ...]\n\nFamous relationship:\nKing - Man + Woman ≈ Queen  ← vector arithmetic!",
      },
      {
        type: "insight",
        text: "Embeddings are learned geometry. Relationships between concepts are encoded as geometric transformations — the model doesn't memorize facts, it learns structure.",
      },
    ],
  },
  {
    n: 13,
    part: 3,
    title: "Attention",
    tagline: "The invention that changed AI — every token can see every other token simultaneously",
    insight: "'Attention Is All You Need' (2017) launched the entire modern AI era.",
    demo: "attention",
    content: [
      {
        type: "p",
        text: "Before attention, models processed text sequentially and struggled with long-range dependencies. Attention lets every token look at every other token simultaneously, learning which relationships matter most.",
      },
      {
        type: "code",
        text: "Attention = softmax( Q × Kᵀ / √d ) × V\n\nQ (Query) = 'What am I looking for?'\nK (Key)   = 'What do I contain?'\nV (Value) = 'What information do I carry?'",
      },
      {
        type: "table",
        head: ["Context Length", "Attention Pairs", "Memory per Layer"],
        rows: [
          ["2,048", "4M", "~16 MB"],
          ["8,192", "64M", "~268 MB"],
          ["32,768", "1B", "~4 GB"],
          ["100,000+", "10B+", "~40 GB+"],
        ],
      },
      {
        type: "insight",
        text: "O(n²) complexity: double the context = 4× the memory. This bottleneck drives most modern inference optimization research.",
      },
    ],
  },
  {
    n: 14,
    part: 3,
    title: "The Transformer Block",
    tagline: "The repeating unit — stacked 32 to 120+ times in frontier models",
    insight:
      "Each block: LayerNorm → Multi-Head Attention → Residual → LayerNorm → MLP → Residual.",
    content: [
      {
        type: "p",
        text: "The transformer block is the fundamental repeating unit. Stacking it deeper and wider is how we scale from 125M to 1.7T parameter models.",
      },
      {
        type: "table",
        head: ["Model", "Layers", "Hidden Size", "Parameters"],
        rows: [
          ["GPT-3 Small", "12", "768", "125M"],
          ["GPT-3 175B", "96", "12,288", "175B"],
          ["Claude 3.7 (est.)", "~120", "~12,800", "~500B+"],
          ["GPT-4 (reported)", "~120", "~16,000", "~1.7T"],
          ["DeepSeek-V3 (MoE)", "~120", "~12,800", "~671B MoE"],
        ],
      },
    ],
  },
  {
    n: 15,
    part: 3,
    title: "Decoder-Only Architecture",
    tagline: "The dominant architecture of all modern LLMs",
    insight: "GPT, Claude, Llama, Grok, DeepSeek, Mistral — all decoder-only.",
    content: [
      {
        type: "p",
        text: "All modern large LLMs use decoder-only architecture. They generate text autoregressively — one token at a time, each token attending only to previous tokens (causal masking).",
      },
      {
        type: "code",
        text: "Input → Tokenize → Embed → [Block × 32–120+] → LayerNorm → Linear → Softmax → Token → Repeat",
      },
      {
        type: "table",
        head: ["Property", "Description"],
        rows: [
          ["Autoregressive", "Predicts one token at a time"],
          ["Causal masking", "Each token only sees past tokens"],
          ["Unidirectional", "Cannot look forward in the sequence"],
          ["Generation loop", "Repeats until END token or max length"],
        ],
      },
    ],
  },
  {
    n: 16,
    part: 4,
    title: "Backpropagation",
    tagline: "The engine of learning — how errors flow backwards through the network",
    insight: "Without backprop, no LLM would exist. It tells every weight: which direction to move.",
    demo: "training",
    content: [
      {
        type: "p",
        text: "Backpropagation uses the chain rule of calculus to compute how much each weight contributed to the prediction error. Gradient descent then adjusts every weight to reduce future errors.",
      },
      {
        type: "code",
        text: "New Weight = Old Weight − Learning Rate × Gradient",
      },
      {
        type: "table",
        head: ["Phase", "Small Scale", "Frontier Scale"],
        rows: [
          ["Data Processing", "$10K", "$10M+"],
          ["Pretraining", "$100K", "$100M+"],
          ["Instruction Tuning", "$10K", "$10M+"],
          ["Alignment / Safety", "$10K", "$20M+"],
          ["Total", "~$150K", "~$145M+"],
        ],
      },
      {
        type: "insight",
        text: "Frontier models have 100B–1.7T parameters. Each training step computes a gradient for every single parameter, across thousands of GPUs, for weeks.",
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "RLHF",
    tagline: "Reinforcement Learning from Human Feedback — what made ChatGPT useful",
    insight: "A base model predicts text. RLHF teaches it what humans actually want.",
    content: [
      {
        type: "p",
        text: "The base model trained on internet data is good at predicting text, but not at being helpful. RLHF fixes this with a 3-step pipeline.",
      },
      {
        type: "table",
        head: ["Step", "What Happens"],
        rows: [
          ["1. Collect preferences", "Show humans two responses — ask which is better"],
          ["2. Train Reward Model", "Learns to predict human preferences from collected data"],
          ["3. RL optimization", "Fine-tune LLM to maximize reward model scores via PPO"],
        ],
      },
      {
        type: "insight",
        text: "A response can be statistically likely and totally unhelpful. RLHF bridges the gap between 'predicts text well' and 'is actually useful to humans.'",
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Constitutional AI",
    tagline: "Anthropic's approach: principles over pure human labeling",
    insight: "This became Claude's foundation — encoding explicit values directly into training.",
    content: [
      {
        type: "p",
        text: "Constitutional AI uses a written 'constitution' of principles to guide model behavior, enabling the model to critique and revise its own outputs without a human labeler for every example.",
      },
      {
        type: "table",
        head: ["Step", "Process"],
        rows: [
          ["Generate", "Model produces an initial response"],
          ["Critique", "Model evaluates against constitutional principles"],
          ["Revise", "Model produces an improved, principle-aligned response"],
          ["Train", "Critique-revision pairs become training data"],
        ],
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "DPO",
    tagline: "Direct Preference Optimization — simpler and cheaper than RLHF",
    insight: "No reward model needed. Just preference pairs and a direct gradient update.",
    content: [
      {
        type: "p",
        text: "DPO reformulates RLHF as a classification problem — directly optimizing on (preferred, rejected) response pairs without a separate reward model.",
      },
      {
        type: "table",
        head: ["RLHF", "DPO"],
        rows: [
          ["Separate Reward Model needed", "No separate reward model"],
          ["Complex PPO training", "Direct gradient update"],
          ["Training instability common", "More stable optimization"],
          ["High computational cost", "Much cheaper"],
        ],
      },
    ],
  },
  {
    n: 20,
    part: 5,
    title: "RLAIF",
    tagline: "AI judging AI — scales where human feedback cannot",
    insight: "RLAIF is why alignment can now keep pace with rapid model iteration.",
    content: [
      {
        type: "p",
        text: "RLAIF replaces human judges with AI judges. Much cheaper and faster — scales to millions of examples.",
      },
      {
        type: "table",
        head: ["Metric", "Human Feedback", "AI Feedback (RLAIF)"],
        rows: [
          ["Cost", "$10–50/hour", "~$0.001/example"],
          ["Speed", "Days to weeks", "Minutes to hours"],
          ["Scale", "Thousands", "Millions of examples"],
          ["Quality", "High (nuance)", "Surprisingly good"],
        ],
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
    title: "KV Cache",
    tagline: "The single most important inference optimization — 10–100× speedup",
    insight:
      "Without KV cache, every token generation would recompute attention over ALL prior tokens.",
    demo: "kvcache",
    content: [
      {
        type: "p",
        text: "Without KV cache: for every new token, you recompute attention over ALL previous tokens from scratch. Token 1001 requires reprocessing all 1000 prior tokens. Catastrophically expensive.",
      },
      {
        type: "p",
        text: "KV Cache stores Keys and Values from previous tokens in memory. Each new token only needs to compute attention for itself and look up the stored K/V pairs.",
      },
      {
        type: "table",
        head: ["Model", "Context Length", "KV Cache Size per User"],
        rows: [
          ["GPT-3 175B", "4,096", "~20 MB"],
          ["GPT-4", "8,192", "~60 MB"],
          ["Claude 3", "200,000", "~1.2 GB"],
          ["Gemini 1.5", "1,000,000+", "~6 GB+"],
        ],
      },
      {
        type: "insight",
        text: "These are per-user sizes. Serving 100M users with long contexts requires petabytes of KV cache storage — this is a primary cost driver.",
      },
    ],
  },
  {
    n: 23,
    part: 6,
    title: "FlashAttention",
    tagline: "2–4× faster attention by solving the memory bandwidth bottleneck",
    insight:
      "The problem wasn't computation — it was moving data back and forth in GPU memory.",
    content: [
      {
        type: "p",
        text: "Traditional attention moves data between slow HBM (GPU main memory, 80GB on H100) and fast SRAM (on-chip, ~256KB). FlashAttention fuses operations to keep data in fast SRAM throughout.",
      },
      {
        type: "table",
        head: ["Metric", "Improvement"],
        rows: [
          ["Speed", "2–4× faster"],
          ["Memory", "5–20× less"],
          ["Context Length", "Enabled 128K+ context windows"],
        ],
      },
    ],
  },
  {
    n: 24,
    part: 6,
    title: "vLLM & Continuous Batching",
    tagline: "Modern serving: keep GPUs at 100% utilization",
    insight: "Static batching wastes GPUs. Continuous batching keeps them constantly busy.",
    content: [
      {
        type: "p",
        text: "vLLM introduces Paged KV Cache (inspired by OS virtual memory) — allocating memory in pages on demand rather than reserving large fixed blocks per request.",
      },
      {
        type: "table",
        head: ["Static Batching", "Continuous Batching"],
        rows: [
          ["Process one request fully before next", "Dynamically add/remove requests each iteration"],
          ["GPUs idle between requests", "GPUs stay fully utilized"],
          ["Baseline throughput", "2–10× throughput"],
        ],
      },
    ],
  },
  {
    n: 27,
    part: 7,
    title: "Evaluation Systems",
    tagline: "Without rigorous evaluation, you cannot know if you are improving",
    insight: "The hardest problem in AI: how do you actually know if a model is good?",
    content: [
      {
        type: "p",
        text: "Evaluation is the scientific backbone of LLM development. A hierarchy of methods from automated benchmarks to real-world production monitoring.",
      },
      {
        type: "table",
        head: ["Layer", "Method", "Tests"],
        rows: [
          ["1 — Benchmarks", "MMLU, GSM8K, HumanEval", "Knowledge, reasoning, coding"],
          ["2 — AI Judges", "GPT-4 or Claude as judge", "Quality, helpfulness, safety"],
          ["3 — Human Eval", "Expert reviewers, blind comparison", "Nuanced quality"],
          ["4 — Red Teaming", "Adversarial testing", "Robustness, failure modes"],
          ["5 — Production", "Real-world metrics", "Actual user satisfaction"],
        ],
      },
      {
        type: "p",
        text: "LMSYS Chatbot Arena uses Elo ratings (from chess) — real users choose between anonymous model responses, generating a crowdsourced ranking.",
      },
    ],
  },
  {
    n: 31,
    part: 8,
    title: "Distributed Training",
    tagline: "No single GPU can train GPT — you need thousands working in concert",
    insight: "A 1T parameter model needs 2TB just to store weights. An H100 has 80GB.",
    content: [
      {
        type: "p",
        text: "Frontier models require thousands of GPUs working in concert, connected by ultra-high-speed networking, using multiple parallelism strategies simultaneously.",
      },
      {
        type: "table",
        head: ["Strategy", "How It Works", "Key Benefit"],
        rows: [
          ["Data Parallelism", "Each GPU has full model, different data batches", "Simple to implement"],
          ["Tensor Parallelism", "Split individual layers across GPUs", "Handles huge layers"],
          ["Pipeline Parallelism", "Different layers on different GPU groups", "Memory efficiency"],
          ["Expert Parallelism", "MoE experts distributed across GPUs", "Critical for MoE"],
        ],
      },
      {
        type: "insight",
        text: "Frontier labs combine all three: DP × TP × PP. Example: 8×8×8 = 512 GPUs working in concert, connected by NVLink (900+ GB/s) and InfiniBand (400–800 Gbps).",
      },
    ],
  },
  {
    n: 33,
    part: 9,
    title: "Mixture of Experts (MoE)",
    tagline: "Why DeepSeek can compete with 10× less compute",
    insight: "Dense: every token uses every parameter. MoE: each token uses only 2–3 expert networks.",
    demo: "moe",
    content: [
      {
        type: "p",
        text: "In a dense model, every token activates every parameter. MoE uses a learned router to select only a few specialized 'experts' per token, achieving much higher efficiency.",
      },
      {
        type: "code",
        text: "Dense: 671B parameters → every token uses ALL 671B\nMoE:   671B parameters → each token uses only ~37B\n\nSame capacity. ~18× less compute per token.",
      },
      {
        type: "table",
        head: ["MoE Benefits", "MoE Trade-offs"],
        rows: [
          ["Lower inference cost per token", "Routing complexity"],
          ["More total model capacity", "Load balancing challenges"],
          ["Specialized experts per domain", "Training instability"],
          ["Greater scale at same budget", "More complex optimization"],
        ],
      },
    ],
  },
  {
    n: 34,
    part: 10,
    title: "Reasoning Models",
    tagline: "Trading latency for accuracy — think before you answer",
    insight:
      "The Reasoning Budget: more thinking = higher accuracy = higher cost = slower response.",
    content: [
      {
        type: "p",
        text: "Reasoning models generate intermediate thinking steps before producing a final answer. More compute at inference time consistently yields higher accuracy on hard problems.",
      },
      {
        type: "code",
        text: "Traditional: Question → Instant Answer\nReasoning:  Question → Think → Reflect → Verify → Answer",
      },
      {
        type: "table",
        head: ["Company", "Models", "Reasoning Approach"],
        rows: [
          ["OpenAI", "o1, o3, o4-mini", "Chain of Thought (hidden)"],
          ["Anthropic", "Claude 3.7 Sonnet+", "Extended Thinking mode"],
          ["DeepSeek", "DeepSeek-R1", "Verification + Reflection"],
          ["Google", "Gemini 2.0 Flash", "CoT integration"],
        ],
      },
    ],
  },
  {
    n: 35,
    part: 11,
    title: "RAG — Retrieval-Augmented Generation",
    tagline: "Giving models access to knowledge beyond their training cutoff",
    insight:
      "LLMs have a knowledge cutoff. RAG gives them a live connection to external knowledge.",
    content: [
      {
        type: "p",
        text: "RAG retrieves relevant documents at query time and injects them into the context, grounding model responses in up-to-date information without retraining.",
      },
      {
        type: "code",
        text: "Question → Embed → Search vector DB → Retrieve top-k chunks\n→ Inject into context → Generate grounded response",
      },
      {
        type: "table",
        head: ["Step", "Description"],
        rows: [
          ["Indexing", "Embed all documents, store in vector database"],
          ["Retrieval", "Embed the question, find nearest neighbor chunks"],
          ["Generation", "Inject retrieved docs into prompt; model cites sources"],
        ],
      },
    ],
  },
  {
    n: 36,
    part: 11,
    title: "MCP — Model Context Protocol",
    tagline: "The USB-C for AI — standardizing how models connect to the world",
    insight: "Anthropic's open protocol: one standard for tools, databases, files, and APIs.",
    content: [
      {
        type: "p",
        text: "MCP standardizes how AI models connect to external tools and data sources. Instead of every integration being custom-built, MCP provides a universal protocol — plug-and-play for AI.",
      },
      {
        type: "code",
        text: "Model → MCP Client → MCP Server → Tools / DBs / APIs / Files",
      },
      {
        type: "table",
        head: ["MCP Servers Can Expose"],
        rows: [
          ["Database connections (SQL, NoSQL)"],
          ["File systems and document stores"],
          ["Web search and API integrations"],
          ["Code execution environments"],
          ["Spreadsheets, calendars, email"],
        ],
      },
    ],
  },
  {
    n: 37,
    part: 11,
    title: "Agent Systems",
    tagline: "From answering questions to taking autonomous action",
    insight: "Agents combine planning, memory, tool use, and execution into autonomous workflows.",
    content: [
      {
        type: "p",
        text: "Agent systems connect multiple AI models and tools into pipelines that complete complex, multi-step tasks autonomously.",
      },
      {
        type: "table",
        head: ["Agent Role", "Responsibility"],
        rows: [
          ["Planner", "Breaks complex goals into subtasks; orchestrates other agents"],
          ["Researcher", "Searches for information, retrieves relevant context"],
          ["Coder", "Writes, tests, and debugs code"],
          ["Reviewer", "Checks output quality, accuracy, and safety"],
          ["Executor", "Takes real-world actions: sends emails, deploys code"],
        ],
      },
      {
        type: "insight",
        text: "Example: 'Build me a website' → Planner decomposes → Researcher finds templates → Coder generates HTML/CSS → Reviewer checks → Executor deploys.",
      },
    ],
  },
  {
    n: 38,
    part: 12,
    title: "The Competitive Landscape",
    tagline: "Who the players are and what advantages they hold in 2026",
    insight: "The frontier AI race is as much about distribution and data as research.",
    content: [
      {
        type: "table",
        head: ["Company", "Key Advantages", "Key Challenges"],
        rows: [
          ["OpenAI", "Brand, talent, ChatGPT distribution", "Competition, cost at scale"],
          ["Anthropic", "Alignment leadership, enterprise trust", "Scale speed, distribution"],
          ["Google DeepMind", "TPUs, Search, YouTube, Cloud", "Bureaucracy, product focus"],
          ["Meta", "Open source leadership, compute", "Research-product gap"],
          ["DeepSeek", "Efficiency, MoE innovation, cost", "Trust, Western market access"],
          ["xAI", "Capital, X platform, real-time data", "Talent depth, experience"],
        ],
      },
      {
        type: "table",
        head: ["Company Type", "Annual Compute Budget"],
        rows: [
          ["Small Startup", "$1–10M"],
          ["Series A Startup", "$10–50M"],
          ["Serious Model Lab", "$50–500M"],
          ["Frontier Competitor", "$1B+"],
        ],
      },
    ],
  },
  {
    n: 39,
    part: 12,
    title: "The Minimum Frontier Stack",
    tagline: "What you actually need to compete at the frontier",
    insight: "Great researchers alone aren't enough. You need every layer of this stack.",
    content: [
      {
        type: "table",
        head: ["Team", "Core Responsibilities"],
        rows: [
          ["Training Team", "Pretraining, fine-tuning, distributed systems"],
          ["Research Team", "Novel architectures, MoE, reasoning, attention variants"],
          ["Inference Team", "Serving infrastructure, KV cache, throughput optimization"],
          ["Data Team", "Web crawl, quality filtering, deduplication, curation"],
          ["Evaluation Team", "Benchmarks, harness, human eval, automated judges"],
          ["Alignment Team", "RLHF, Constitutional AI, DPO, safety fine-tuning"],
          ["Red Team", "Adversarial testing, jailbreaks, safety failure discovery"],
          ["Infrastructure", "GPU clusters, networking, storage, reliability"],
          ["Agent Team", "RAG, MCP, tool integration, agentic workflows"],
        ],
      },
    ],
  },
  {
    n: 40,
    part: 12,
    title: "Real Competitive Moats",
    tagline: "Not transformers anymore — everyone has transformers",
    insight:
      "The new moats in 2026: data flywheels, distribution, evaluation, inference efficiency.",
    content: [
      {
        type: "table",
        head: ["Moat", "Why It Matters", "2026 Leader"],
        rows: [
          ["Data Flywheel", "More users → better data → better model → more users", "OpenAI"],
          ["Distribution", "Who can reach 100M+ users?", "OpenAI, Google, Meta"],
          ["Evaluation Systems", "Can't improve what you can't measure", "Anthropic, OpenAI"],
          ["Inference Efficiency", "Cost per token = direct margin advantage", "DeepSeek, Anthropic"],
          ["Agent Ecosystem", "Platform effects and developer lock-in", "OpenAI"],
          ["Reasoning Quality", "Next-gen benchmark-beating performance", "OpenAI (o-series)"],
          ["Developer Platform", "Best DX = most third-party apps", "Anthropic"],
        ],
      },
    ],
  },
  {
    n: 41,
    part: 12,
    title: "The Frontier Thesis",
    tagline: "Four stages of AI evolution — we are in Stage 2→3 transition",
    insight: "The shift from answering questions to operating organizations is underway.",
    content: [
      {
        type: "table",
        head: ["Stage", "Capability", "Era"],
        rows: [
          ["Stage 1: Language Models", "Answering questions, generating text", "2018–2022"],
          ["Stage 2: Reasoning Systems", "Solving problems, multi-step thinking", "2023–2025"],
          ["Stage 3: Agentic Systems", "Autonomous tasks, tool use, multi-step planning", "2024–2026"],
          ["Stage 4: Organization Intelligence", "Running operations, managing workflows", "2025–2028+"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: Reasoning Models + Agent Architectures + Memory Systems + Evaluation Infrastructure + Organization Monitoring.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes an LLM as a system?",
      opts: [
        "A very fast search engine",
        "A hierarchical technical stack from data to organizations",
        "A text generation program",
        "A large database of text",
      ],
      ans: 1,
      exp: "An LLM is best understood as a layered technical system — from raw internet data at the bottom, through tokens, vectors, neural networks, training, inference, all the way up to products and organizations at the top.",
    },
    {
      q: "Why does understanding all layers of the stack matter?",
      opts: [
        "It helps you write better prompts",
        "Each layer depends on those below it — you can't understand one in isolation",
        "It's required for AI job interviews",
        "Only researchers need this understanding",
      ],
      ans: 1,
      exp: "Every product feature has constraints imposed by inference, which has constraints imposed by training, which has constraints imposed by the architecture. Understanding the stack reveals why things work the way they do — and why certain problems are hard.",
    },
  ],
  1: [
    {
      q: "What is a vector in the LLM context?",
      opts: [
        "A GPU instruction",
        "A list of numbers representing meaning in geometric space",
        "A type of transformer layer",
        "A tokenization method",
      ],
      ans: 1,
      exp: "A vector is a list of numbers. In LLMs, words and concepts become vectors — coordinates in high-dimensional space where semantic similarity becomes spatial proximity. 'Dog' and 'Cat' vectors are close; 'Dog' and 'Car' vectors are far apart.",
    },
    {
      q: "Why are 'dog' and 'cat' close together in embedding space?",
      opts: [
        "They were manually placed there",
        "They have similar spelling",
        "They appear in similar contexts throughout training data",
        "A rule hardcodes their proximity",
      ],
      ans: 2,
      exp: "The model learns from training data that 'dog' and 'cat' appear in similar contexts: 'I have a dog/cat', 'My dog/cat is hungry'. This co-occurrence teaches the model they belong in similar regions of vector space — no one programmed this, it emerges from training.",
    },
  ],
  4: [
    {
      q: "The dot product of two vectors measures:",
      opts: [
        "Their sum",
        "Their distance apart",
        "Their similarity (directional alignment)",
        "Their average value",
      ],
      ans: 2,
      exp: "The dot product multiplies corresponding elements and sums them. When two vectors point in similar directions (semantically related words), this sum is large — high similarity. When perpendicular, it's zero. When opposite, it's negative.",
    },
    {
      q: "In attention, what does Q · K compute?",
      opts: [
        "The output value to pass forward",
        "How much each token should attend to each other token",
        "The position encoding offset",
        "A learned bias term",
      ],
      ans: 1,
      exp: "Q (Query) asks 'what am I looking for?' K (Key) says 'what do I contain?' Their dot product produces an attention score — a single number indicating how much this query should attend to this key. This is computed for every Q-K pair, yielding the attention matrix.",
    },
  ],
  6: [
    {
      q: "What does cross entropy loss measure?",
      opts: [
        "The speed of the model",
        "The number of training steps",
        "How wrong the model's prediction was vs the correct answer",
        "The size of the model's weights",
      ],
      ans: 2,
      exp: "Cross entropy quantifies the difference between the model's predicted probability distribution and the correct answer. If the model was very confident about the wrong answer, loss is very high. If it predicted correctly with high confidence, loss is near zero.",
    },
    {
      q: "Why is the training loop run trillions of times?",
      opts: [
        "To make the model memorize training data",
        "Each iteration slightly adjusts weights toward lower loss — small steps across massive scale accumulate into intelligence",
        "To generate more training data",
        "To validate the model on held-out data",
      ],
      ans: 1,
      exp: "Each training step: Forward Pass → compute Cross Entropy Loss → Backward Pass → nudge every weight slightly in the direction that reduces loss. Individually tiny improvements. Run trillions of times across hundreds of billions of parameters — this is how a model learns to predict language.",
    },
  ],
  13: [
    {
      q: "Before attention, what was the main limitation of language models?",
      opts: [
        "They couldn't handle numbers",
        "They couldn't process text quickly",
        "They struggled to connect distant words — long-range dependencies",
        "They used too much memory",
      ],
      ans: 2,
      exp: "RNNs processed text sequentially, maintaining a hidden state. Information from early tokens would fade by the time later tokens were processed. Attention solves this by allowing every token to directly attend to every other token simultaneously — the entire sequence is available at once.",
    },
    {
      q: "Why does context length have O(n²) memory complexity in standard attention?",
      opts: [
        "Each token stores n copies of itself",
        "Every token attends to every other: n×n = n² pairs",
        "The softmax operation squares the input",
        "Positional encodings scale quadratically",
      ],
      ans: 1,
      exp: "For n tokens, you compute an attention score for every pair: token 1 attends to tokens 1–n, token 2 attends to tokens 1–n, etc. That's n × n = n² attention pairs. Double the context length = 4× the memory. This is why long-context models are expensive to run.",
    },
  ],
  16: [
    {
      q: "What does backpropagation compute?",
      opts: [
        "The model's predictions",
        "How much each weight contributed to the prediction error (its gradient)",
        "The loss function value",
        "The forward pass output",
      ],
      ans: 1,
      exp: "Backpropagation applies the chain rule of calculus to trace the error backwards through the network, computing a gradient for each weight — a number saying 'if you increase this weight by ε, the loss changes by gradient × ε'. This tells each weight exactly how to move to reduce error.",
    },
    {
      q: "Why does frontier model training cost $100M+?",
      opts: [
        "The researchers are very expensive",
        "Gradient computation for 100B–1.7T parameters across thousands of GPUs for weeks dominates",
        "Electricity costs are the main factor",
        "Data licensing costs dominate",
      ],
      ans: 1,
      exp: "Training requires computing gradients for every parameter at every step. With 100B–1.7T parameters, across thousands of H100 GPUs (each ~$30K–$40K to buy, or $2–4/hour to rent), running for weeks, the compute cost dominates. Frontier training runs cost $50M–$150M+ in GPU time alone.",
    },
  ],
  22: [
    {
      q: "Without KV cache, what happens when generating the 1000th token?",
      opts: [
        "The model runs faster due to learned patterns",
        "The model must recompute attention over all 999 previous tokens from scratch",
        "The model samples from a stored distribution",
        "The model truncates context to save memory",
      ],
      ans: 1,
      exp: "Without KV cache, generating each new token requires reprocessing the entire sequence. Token 1000 would need to recompute attention over all 999 previous tokens. Total generation cost is O(n²) — with a 100K context, generating the last token requires 100K forward passes worth of computation.",
    },
    {
      q: "What does KV Cache actually store?",
      opts: [
        "All model weights for fast access",
        "The Key and Value tensors from attention for all previous tokens",
        "Pre-computed logits for common words",
        "The entire token sequence as embeddings",
      ],
      ans: 1,
      exp: "KV Cache stores the Key (K) and Value (V) tensors computed from all previous tokens. When generating a new token, you compute its Q, K, V — then look up all previous K/V pairs from the cache. Only one new attention computation needed per new token, regardless of context length.",
    },
  ],
  33: [
    {
      q: "The key difference between dense and MoE models:",
      opts: [
        "MoE models are smaller in total parameters",
        "Dense models always perform better",
        "Dense activates all parameters per token; MoE activates only 2–3 expert networks per token",
        "MoE models require different hardware types",
      ],
      ans: 2,
      exp: "In a dense model, every token activates every parameter. DeepSeek-V3 has 671B total parameters but each token only activates ~37B — roughly 18× less compute per token. Total capacity is the same; active compute is massively reduced. This is the MoE efficiency gain.",
    },
    {
      q: "What does the 'router' in MoE do?",
      opts: [
        "Manages networking between GPUs",
        "A learned function that assigns each token to a subset of experts",
        "A special training algorithm",
        "The first transformer layer of the model",
      ],
      ans: 1,
      exp: "The router is a small learned network (usually a linear layer with softmax) that takes each token and outputs probabilities over all experts. The top-k experts (usually k=2) with highest probability are selected. The router learns which expert is best for which type of token — coding tokens route to the coding expert, math tokens route to the math expert, etc.",
    },
  ],
  34: [
    {
      q: "The fundamental trade-off in reasoning models:",
      opts: [
        "Parameters vs training cost",
        "Latency vs accuracy — more thinking steps = slower but more accurate",
        "Memory vs speed",
        "Token limit vs model quality",
      ],
      ans: 1,
      exp: "Reasoning models spend additional compute generating intermediate 'thinking' tokens before the final answer. This extended inference means slower responses (more latency) but consistently higher accuracy on complex problems. You literally buy accuracy with time — the 'reasoning budget' is a tunable parameter.",
    },
    {
      q: "Why do reasoning models perform better on hard problems?",
      opts: [
        "They have more parameters",
        "They use a special neural architecture",
        "Extended chain-of-thought lets them catch errors, reconsider, and verify — like an expert working step by step",
        "They train on harder data",
      ],
      ans: 2,
      exp: "Complex problems require multi-step reasoning where early errors propagate. By generating explicit reasoning steps, the model can notice inconsistencies, reconsider approaches, and self-correct. This mirrors how a human expert works through a hard math or logic problem — methodically, with checking.",
    },
  ],
  17: [
    {
      q: "What problem does RLHF solve that pretraining cannot?",
      opts: [
        "It makes models faster at inference",
        "It teaches the model to be helpful and aligned with human preferences, not just statistically likely",
        "It increases model size efficiently",
        "It reduces training cost",
      ],
      ans: 1,
      exp: "Pretraining teaches a model to predict internet text — which includes unhelpful, verbose, and harmful content. A base model is not useful by default. RLHF specifically teaches: 'what do humans actually want from a helpful AI assistant?' — using human comparisons to shape the model's behavior.",
    },
    {
      q: "What is the role of the Reward Model in RLHF?",
      opts: [
        "It replaces the transformer architecture",
        "It scores model outputs to simulate human preference judgment at scale",
        "It manages the training compute budget",
        "It generates training data from the internet",
      ],
      ans: 1,
      exp: "Human labelers can't evaluate millions of responses — too slow and expensive. The Reward Model is trained on human preference data (A vs B comparisons) and learns to predict which response humans would prefer. During RL, the LLM is optimized to maximize Reward Model scores — scaling human preference learning by 1000×.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  {
    term: "Attention",
    def: "Mechanism letting every token directly consider every other token, computing weighted relevance via Q×Kᵀ/√d × V. The core innovation of the Transformer.",
    ch: 13,
  },
  {
    term: "Backpropagation",
    def: "Algorithm using the chain rule to compute gradients of loss w.r.t. every weight, enabling gradient descent to train deep networks.",
    ch: 16,
  },
  {
    term: "BPE",
    def: "Byte Pair Encoding. Tokenization algorithm: starts with characters, iteratively merges the most frequent adjacent pair until reaching target vocabulary size (~50K).",
    ch: 11,
  },
  {
    term: "Constitutional AI",
    def: "Anthropic's alignment approach: a written 'constitution' of principles guides model self-critique and revision, reducing dependence on human labelers.",
    ch: 18,
  },
  {
    term: "Context Window",
    def: "Maximum tokens the model can process at once. Ranges from 4K (early models) to 1M+ (Gemini 1.5). Memory cost is O(n²) per layer.",
    ch: 13,
  },
  {
    term: "Cross Entropy",
    def: "Loss function measuring how surprised the model was by the correct token. Lower = model was more confident about the right answer. The heartbeat of LLM training.",
    ch: 6,
  },
  {
    term: "DPO",
    def: "Direct Preference Optimization. Alignment technique that directly optimizes on (preferred, rejected) response pairs without a separate reward model.",
    ch: 19,
  },
  {
    term: "Embedding",
    def: "A high-dimensional vector representation of a token, learned during training. Semantically similar tokens cluster together in embedding space.",
    ch: 12,
  },
  {
    term: "FlashAttention",
    def: "Memory-efficient attention implementation avoiding large intermediate matrices in HBM, keeping data in fast SRAM. 2–4× faster, 5–20× less memory.",
    ch: 23,
  },
  {
    term: "Gradient",
    def: "Vector indicating how much each weight contributed to the loss. Points in direction of steepest loss increase; gradient descent moves in the opposite direction.",
    ch: 7,
  },
  {
    term: "HBM",
    def: "High Bandwidth Memory. The main GPU memory (80GB on H100). Fast but not as fast as on-chip SRAM. Data must be moved between HBM and compute units.",
    ch: 23,
  },
  {
    term: "KV Cache",
    def: "Stores Key and Value tensors from all previous tokens during generation. Eliminates recomputation — each new token only attends to cached K/V pairs.",
    ch: 22,
  },
  {
    term: "MCP",
    def: "Model Context Protocol. Anthropic's open standard for connecting AI models to external tools, databases, files, and APIs.",
    ch: 36,
  },
  {
    term: "MoE",
    def: "Mixture of Experts. Architecture where a router selects a small subset of 'expert' networks to process each token, dramatically reducing per-token compute.",
    ch: 33,
  },
  {
    term: "Multi-Head Attention",
    def: "Running multiple attention mechanisms in parallel, each learning different relationship types: syntax, semantics, co-reference, long-range structure.",
    ch: 14,
  },
  {
    term: "Parameters",
    def: "The learned numerical weights of a model. GPT-3: 175B. GPT-4 (reported): ~1.7T. Each is a floating-point number adjusted during training.",
    ch: 8,
  },
  {
    term: "PPO",
    def: "Proximal Policy Optimization. RL algorithm used in RLHF to fine-tune the LLM. Ensures updates are not too large, keeping training stable.",
    ch: 17,
  },
  {
    term: "RAG",
    def: "Retrieval-Augmented Generation. Retrieves relevant documents at query time and injects them into context, grounding responses in up-to-date information.",
    ch: 35,
  },
  {
    term: "Residual Connection",
    def: "Skip connection: Output = Layer(x) + x. Allows information to bypass layers, preventing vanishing gradients in deep networks.",
    ch: 10,
  },
  {
    term: "RLHF",
    def: "Reinforcement Learning from Human Feedback. Alignment technique: collect human preferences → train reward model → RL-optimize LLM to maximize reward.",
    ch: 17,
  },
  {
    term: "Softmax",
    def: "Converts a vector of numbers into a probability distribution (all positive, sum to 1). Used in attention and the final output layer.",
    ch: 13,
  },
  {
    term: "Temperature",
    def: "Controls randomness in token sampling. Low (0.1) = deterministic. High (1.0+) = creative/random. Set to 0 for reproducible outputs.",
    ch: 21,
  },
  {
    term: "Tensor",
    def: "N-dimensional array. Scalars (0D), vectors (1D), matrices (2D) are all tensors. LLM activations are typically 3D: [batch, sequence, hidden].",
    ch: 3,
  },
  {
    term: "Token",
    def: "Basic unit of text in an LLM. Sub-word units produced by BPE. 'unhappiness' might be ['un','happiness']. Typical vocab: ~50K tokens.",
    ch: 11,
  },
  {
    term: "Transformer",
    def: "Neural architecture based on self-attention, introduced in 'Attention Is All You Need' (2017). Backbone of all modern LLMs.",
    ch: 14,
  },
  {
    term: "vLLM",
    def: "Serving framework using Paged KV Cache (virtual-memory-inspired). Enables continuous batching and dramatically improves serving throughput.",
    ch: 24,
  },
  {
    term: "Vector",
    def: "A list of numbers representing a point in mathematical space. Words become vectors (embeddings) where spatial distance encodes semantic similarity.",
    ch: 1,
  },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1],
  [0, 8],
  [0, 11],
  [0, 16],
  [0, 21],
  [0, 33],
  [0, 38],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 12],
  [2, 3],
  [2, 4],
  [3, 4],
  [4, 13],
  [5, 6],
  [6, 7],
  [6, 16],
  [7, 16],
  [8, 9],
  [8, 10],
  [9, 10],
  [10, 14],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [13, 22],
  [13, 23],
  [16, 6],
  [16, 17],
  [16, 31],
  [17, 18],
  [17, 19],
  [17, 20],
  [18, 19],
  [19, 20],
  [21, 22],
  [22, 23],
  [23, 24],
  [21, 24],
  [27, 16],
  [27, 17],
  [31, 33],
  [33, 34],
  [33, 38],
  [34, 35],
  [35, 36],
  [36, 37],
  [37, 38],
  [38, 39],
  [39, 40],
  [40, 41],
  [34, 40],
];

const NODE_POS: Record<number, { x: number; y: number }> = (() => {
  const W = 760,
    H = 520,
    CX = W / 2,
    CY = H / 2,
    R = 200;
  const pos: Record<number, { x: number; y: number }> = {};
  pos[0] = { x: CX, y: CY };
  const outer = PARTS.filter((p) => p.id > 0);
  outer.forEach((p, pi) => {
    const a = (pi / outer.length) * 2 * Math.PI - Math.PI / 2;
    const cx = CX + R * Math.cos(a),
      cy = CY + R * Math.sin(a);
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
    {
      l: "🌍 Internet → Data",
      d: "Every book, article, code, conversation ever written",
      c: "#60A5FA",
    },
    {
      l: "🔤 Tokens",
      d: "Text broken into sub-word units computers can process",
      c: "#818CF8",
    },
    {
      l: "📐 Vectors & Matrices",
      d: "Numbers transformed into geometric coordinates",
      c: "#34D399",
    },
    {
      l: "🧠 Transformer Blocks",
      d: "The architecture that processes and generates language",
      c: "#FBBF24",
    },
    {
      l: "🏋️ Training → Inference",
      d: "Learn from data, then apply that knowledge",
      c: "#F97316",
    },
    {
      l: "📱 Products → Agents",
      d: "ChatGPT, Claude, autonomous AI workers",
      c: "#F87171",
    },
    {
      l: "🏢 Organizations",
      d: "AI-operated business operations",
      c: "#A78BFA",
    },
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
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: l.c,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: T.text,
              fontWeight: 600,
              fontSize: 13,
              flex: 1,
            }}
          >
            {l.l}
          </span>
          {active === i && (
            <span style={{ color: l.c, fontSize: 12 }}>{l.d}</span>
          )}
          <span style={{ color: T.muted, fontSize: 10 }}>Layer {i}</span>
        </div>
      ))}
    </div>
  );
}
function VectorDemo() {
  const words = [
    {
      label: "Dog",
      x: 140,
      y: 110,
      vec: [0.91, 0.23, -0.55],
      c: "#34D399",
    },
    {
      label: "Cat",
      x: 175,
      y: 135,
      vec: [0.89, 0.19, -0.51],
      c: "#34D399",
    },
    {
      label: "Wolf",
      x: 108,
      y: 148,
      vec: [0.82, 0.15, -0.48],
      c: "#34D399",
    },
    {
      label: "Car",
      x: 315,
      y: 88,
      vec: [-0.11, 0.94, 0.72],
      c: "#F87171",
    },
    {
      label: "Truck",
      x: 345,
      y: 115,
      vec: [-0.15, 0.91, 0.68],
      c: "#F87171",
    },
    {
      label: "King",
      x: 230,
      y: 200,
      vec: [0.5, -0.3, 0.8],
      c: "#A78BFA",
    },
    {
      label: "Queen",
      x: 260,
      y: 228,
      vec: [0.48, -0.28, 0.78],
      c: "#A78BFA",
    },
  ];
  const [hov, setHov] = useState<{
    label: string;
    x: number;
    y: number;
    vec: number[];
    c: string;
  } | null>(null);
  const dot = (a: number[], b: number[]) =>
    a.reduce((s, v, i) => s + v * b[i], 0);
  const sim = (a: { vec: number[] }, b: { vec: number[] }) => {
    const d = +dot(a.vec, b.vec).toFixed(3);
    return {
      val: d,
      label:
        d > 0.8 ? "Very Similar" : d > 0.5 ? "Related" : d > 0.2 ? "Loosely Related" : "Unrelated",
      color: d > 0.8 ? "#34D399" : d > 0.5 ? "#60A5FA" : d > 0.2 ? "#FBBF24" : "#F87171",
    };
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Hover a word to see dot-product similarity with all others
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <svg
          width="420"
          height="280"
          style={{
            background: T.elevated,
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            flexShrink: 0,
          }}
        >
          <text x={210} y={20} textAnchor="middle" fill={T.muted} fontSize="11">
            2D Projection of Embedding Space
          </text>
          {["Animals", "Vehicles", "Royalty"].map((g, i) => {
            const gx = [140, 325, 240][i],
              gy = [80, 78, 175][i];
            return (
              <g key={g}>
                <circle
                  cx={gx}
                  cy={gy}
                  r={45}
                  fill="none"
                  stroke={["#34D399", "#F87171", "#A78BFA"][i]}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.4"
                />
                <text
                  x={gx}
                  y={gy - 50}
                  textAnchor="middle"
                  fill={["#34D399", "#F87171", "#A78BFA"][i]}
                  fontSize="10"
                  opacity="0.7"
                >
                  {g}
                </text>
              </g>
            );
          })}
          {hov &&
            words
              .filter((w) => w.label !== hov.label)
              .map((w) => {
                const s = sim(hov, w);
                return (
                  <line
                    key={w.label}
                    x1={hov.x}
                    y1={hov.y}
                    x2={w.x}
                    y2={w.y}
                    stroke={s.color}
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                );
              })}
          {words.map((w) => (
            <g
              key={w.label}
              onMouseEnter={() => setHov(w)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={w.x}
                cy={w.y}
                r={hov?.label === w.label ? 12 : 8}
                fill={w.c}
                opacity={hov && hov.label !== w.label ? 0.5 : 1}
                style={{ transition: "all .15s" }}
              />
              <text
                x={w.x}
                y={w.y - 14}
                textAnchor="middle"
                fill={T.text}
                fontSize="12"
                fontWeight="600"
              >
                {w.label}
              </text>
            </g>
          ))}
        </svg>
        {hov ? (
          <div style={{ flex: 1, minWidth: 160 }}>
            <div
              style={{
                color: T.accent,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              From: {hov.label}
            </div>
            {words
              .filter((w) => w.label !== hov.label)
              .map((w) => {
                const s = sim(hov, w);
                return (
                  <div
                    key={w.label}
                    style={{
                      marginBottom: 6,
                      padding: "6px 10px",
                      borderRadius: 6,
                      background: T.elevated,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 3,
                      }}
                    >
                      <span style={{ color: T.text, fontSize: 13 }}>
                        {w.label}
                      </span>
                      <span
                        style={{
                          color: s.color,
                          fontSize: 12,
                          fontFamily: "monospace",
                        }}
                      >
                        {s.val}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: T.border,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(0, ((s.val + 1) / 2) * 100)}%`,
                          height: "100%",
                          background: s.color,
                          transition: "width .3s",
                        }}
                      />
                    </div>
                    <div style={{ color: s.color, fontSize: 10, marginTop: 2 }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.muted,
              fontSize: 13,
            }}
          >
            ← Hover a word
          </div>
        )}
      </div>
    </div>
  );
}
function AttentionDemo() {
  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  const attn = [
    [0.5, 0.1, 0.1, 0.05, 0.2, 0.05],
    [0.3, 0.4, 0.15, 0.05, 0.05, 0.05],
    [0.1, 0.25, 0.35, 0.1, 0.05, 0.15],
    [0.1, 0.1, 0.15, 0.4, 0.1, 0.15],
    [0.3, 0.05, 0.05, 0.05, 0.45, 0.1],
    [0.15, 0.1, 0.2, 0.15, 0.15, 0.25],
  ];
  const [sel, setSel] = useState<number | null>(null);
  const heat = (v: number) => {
    const r = Math.round(34 + (239 - 34) * v),
      g = Math.round(211 + (68 - 211) * v),
      b = 238;
    return `rgb(${r},${g},${b})`;
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Click a token to see which other tokens it attends to most
      </p>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        {tokens.map((t, i) => (
          <button
            key={i}
            onClick={() => setSel(sel === i ? null : i)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              border: `2px solid ${sel === i ? T.accent : T.border}`,
              background: sel === i ? `${T.accent}22` : T.elevated,
              color: sel === i ? T.accent : T.text,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {sel !== null ? (
        <div>
          <div style={{ color: T.text, fontSize: 13, marginBottom: 10 }}>
            <strong style={{ color: T.accent }}>"{tokens[sel]}"</strong> attends
            to:
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tokens.map((t, j) => (
              <div key={j} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    background: heat(attn[sel][j]),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#000",
                    marginBottom: 4,
                  }}
                >
                  {(attn[sel][j] * 100).toFixed(0)}%
                </div>
                <div style={{ color: T.text, fontSize: 12 }}>{t}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "8px 12px",
              borderRadius: 8,
              background: T.elevated,
              border: `1px solid ${T.border}`,
              color: T.muted,
              fontSize: 12,
            }}
          >
            Darker = stronger attention. Each row sums to 100%. This is one head
            — frontier models run 96–128 heads in parallel, each learning
            different relationships.
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            background: T.elevated,
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            color: T.muted,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          ↑ Click any token above to visualize its attention pattern
        </div>
      )}
    </div>
  );
}
function TrainingDemo() {
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(3.42);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const STEPS = [
    { label: "Forward Pass", desc: "Input flows through all transformer layers", color: "#60A5FA" },
    {
      label: "Calculate Loss",
      desc: "Cross entropy measures prediction error",
      color: "#FBBF24",
    },
    {
      label: "Backward Pass",
      desc: "Gradients flow backward through every layer",
      color: "#F87171",
    },
    {
      label: "Update Weights",
      desc: "Each weight moves toward lower loss",
      color: "#34D399",
    },
  ];
  useEffect(() => {
    if (playing) {
      ref.current = setInterval(() => {
        setStep((s) => {
          const n = (s + 1) % 4;
          if (n === 0)
            setLoss((l) => Math.max(0.1, +(l - 0.08 + Math.random() * 0.02).toFixed(3)));
          return n;
        });
      }, 900);
    } else if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [playing]);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          style={{
            padding: "8px 20px",
            borderRadius: 20,
            background: playing ? "#F87171" : "#34D399",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {playing ? "⏸ Pause" : "▶ Run Training"}
        </button>
        <button
          onClick={() => {
            setStep(0);
            setLoss(3.42);
            setPlaying(false);
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            background: T.elevated,
            color: T.text,
            border: `1px solid ${T.border}`,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          ↺ Reset
        </button>
        <div
          style={{
            marginLeft: "auto",
            padding: "6px 16px",
            borderRadius: 8,
            background: T.elevated,
            border: `1px solid ${T.border}`,
          }}
        >
          <span style={{ color: T.muted, fontSize: 12 }}>Loss: </span>
          <span
            style={{
              color: loss < 1.5 ? "#34D399" : loss < 2.5 ? "#FBBF24" : "#F87171",
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {loss.toFixed(3)}
          </span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "14px",
              borderRadius: 10,
              background: step === i ? `${s.color}22` : T.elevated,
              border: `2px solid ${step === i ? s.color : T.border}`,
              transition: "all .3s",
            }}
          >
            <div
              style={{
                color: step === i ? s.color : T.subtle,
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              {step === i ? "→ " : ""}
              {i + 1}. {s.label}
            </div>
            <div style={{ color: T.muted, fontSize: 12 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          height: 8,
          background: T.border,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${((3.42 - loss) / 3.32) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg,#F87171,#FBBF24,#34D399)",
            transition: "width .5s",
            borderRadius: 4,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          color: T.muted,
          fontSize: 11,
        }}
      >
        <span>High Loss (untrained)</span>
        <span>Low Loss (well-trained)</span>
      </div>
    </div>
  );
}
function MoEDemo() {
  const [active, setActive] = useState<number[]>([]);
  const [routing, setRouting] = useState(false);
  const experts = ["Language", "Math", "Code", "Science", "Reasoning", "Creative", "Factual", "Safety"];
  const icons = ["💬", "🔢", "💻", "🔬", "🧮", "✍️", "📚", "🛡️"];
  const route = () => {
    setRouting(true);
    setActive([]);
    setTimeout(() => {
      const p: number[] = [];
      while (p.length < 2) {
        const r = Math.floor(Math.random() * 8);
        if (!p.includes(r)) p.push(r);
      }
      setActive(p);
      setRouting(false);
    }, 700);
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        A dense model uses all 8 experts every time. MoE routes each token to
        only 2.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {experts.map((e, i) => (
          <div
            key={i}
            style={{
              padding: "10px 8px",
              borderRadius: 8,
              textAlign: "center",
              background: active.includes(i) ? `${T.accent}22` : T.elevated,
              border: `2px solid ${active.includes(i) ? T.accent : T.border}`,
              transition: "all .3s",
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{icons[i]}</div>
            <div
              style={{
                color: active.includes(i) ? T.accent : T.subtle,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {e}
            </div>
            {active.includes(i) && (
              <div style={{ color: T.accent, fontSize: 10, marginTop: 2 }}>
                ACTIVE
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={route}
        disabled={routing}
        style={{
          padding: "10px 24px",
          borderRadius: 20,
          background: T.accent,
          color: "#000",
          border: "none",
          cursor: routing ? "wait" : "pointer",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {routing ? "Routing..." : "⚡ Route a Token"}
      </button>
      {active.length > 0 && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 8,
            background: T.elevated,
            border: `1px solid ${T.border}`,
            color: T.muted,
            fontSize: 12,
          }}
        >
          ✅ Token routed to{" "}
          <strong style={{ color: T.accent }}>{experts[active[0]]}</strong> +{" "}
          <strong style={{ color: T.accent }}>{experts[active[1]]}</strong> —
          using ~{(2 / 8) * 100}% of total parameters (~18× less compute than
          dense)
        </div>
      )}
    </div>
  );
}
function KVCacheDemo() {
  const sentence = ["The", "cat", "sat", "on", "the", "mat"];
  const [genIdx, setGenIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = () => {
    setGenIdx(-1);
    setRunning(true);
  };
  useEffect(() => {
    if (!running) return;
    if (genIdx >= sentence.length - 1) {
      setRunning(false);
      return;
    }
    ref.current = setTimeout(() => setGenIdx((i) => i + 1), 700);
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [running, genIdx]);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Watch how KV Cache eliminates redundant computation during generation
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { mode: "nocache", label: "Without Cache", col: "#F87171" },
          { mode: "cache", label: "With KV Cache", col: "#34D399" },
        ].map(({ mode, label, col }) => (
          <div
            key={mode}
            style={{
              padding: 16,
              borderRadius: 10,
              background: T.elevated,
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ color: col, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
              {label}
            </div>
            <div style={{ minHeight: 80 }}>
              {sentence.slice(0, genIdx + 1).map((t, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginRight: 6,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      background: `${col}22`,
                      border: `1px solid ${col}`,
                      color: T.text,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                  {i < genIdx && (
                    <span style={{ color: mode === "nocache" ? "#F87171" : "#34D399", fontSize: 10 }}>
                      {mode === "nocache" ? "↻" : "✓"}
                    </span>
                  )}
                </span>
              ))}
            </div>
            {genIdx > 0 && (
              <div
                style={{
                  marginTop: 8,
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: `${col}11`,
                  fontSize: 11,
                  color: col,
                }}
              >
                {mode === "nocache"
                  ? `Token ${genIdx + 1}: recomputing all ${genIdx} previous tokens ↻`
                  : `Token ${genIdx + 1}: only 1 new computation ✓ (${genIdx} tokens cached)`}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={start}
        disabled={running}
        style={{
          marginTop: 14,
          padding: "8px 20px",
          borderRadius: 20,
          background: T.accent,
          color: "#000",
          border: "none",
          cursor: running ? "wait" : "pointer",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {running ? "Generating..." : "▶ Simulate Generation"}
      </button>
    </div>
  );
}

// ── AI Tutor ──────────────────────────────────────────────────────────────
function AiTutor({ ch }: { ch: (typeof CHAPTERS)[0] }) {
  const [msgs, setMsgs] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
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
          system: `You are an expert AI tutor helping someone learn frontier LLM concepts. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
          messages: nm,
        }),
      });
      const data = await res.json();
      const text =
        data.content?.map((b: { text?: string }) => b.text || "").join("") ||
        "Sorry, I couldn't generate a response. Please try again.";
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    }
    setLoading(false);
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: 420 }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingBottom: 8,
        }}
      >
        {msgs.length === 0 && (
          <div>
            <div style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
              Ask anything about this chapter:
            </div>
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
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
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
                <div
                  style={{
                    color: T.accent,
                    fontWeight: 700,
                    fontSize: 10,
                    marginBottom: 5,
                    letterSpacing: ".08em",
                  }}
                >
                  🤖 AI TUTOR
                </div>
              )}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: T.elevated,
                border: `1px solid ${T.border}`,
                color: T.muted,
                fontSize: 13,
              }}
            >
              Thinking<span style={{ animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingTop: 12,
          borderTop: `1px solid ${T.border}`,
        }}
      >
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
function QuizPane({
  ch,
  onScore,
}: {
  ch: (typeof CHAPTERS)[0];
  onScore?: (n: number, score: number, total: number) => void;
}) {
  const qs = QUIZZES[ch.n as keyof typeof QUIZZES];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  if (!qs)
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
        <div style={{ color: T.subtle, fontSize: 14, marginBottom: 8 }}>
          No quiz yet for this chapter.
        </div>
        <div style={{ color: T.muted, fontSize: 13 }}>
          Try the AI Tutor tab — ask it to quiz you verbally!
        </div>
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
            Score: {score}/{qs.length}{" "}
            {score === qs.length
              ? "🎉 Perfect!"
              : score >= qs.length / 2
              ? "👍 Good!"
              : "📚 Keep studying!"}
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
            border: `1px solid ${
              revealed[qi]
                ? answers[qi] === q.ans
                  ? "#34D39944"
                  : "#F8717144"
                : T.border
            }`,
          }}
        >
          <div
            style={{
              color: T.text,
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
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
                    background: isCorr
                      ? "#34D39922"
                      : isWrong
                      ? "#F8717122"
                      : isSel
                      ? `${T.accent}22`
                      : T.surface,
                    border: `1px solid ${
                      isCorr ? "#34D399" : isWrong ? "#F87171" : isSel ? T.accent : T.border
                    }`,
                    cursor: revealed[qi] ? "default" : "pointer",
                    color: T.text,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all .15s",
                  }}
                >
                  <span
                    style={{
                      color: isCorr
                        ? "#34D399"
                        : isWrong
                        ? "#F87171"
                        : isSel
                        ? T.accent
                        : T.muted,
                      fontWeight: 700,
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
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
      {!allAnswered && (
        <div style={{ color: T.muted, fontSize: 12, marginTop: 4 }}>
          Answer all {qs.length} questions to submit
        </div>
      )}
    </div>
  );
}

// ── Block Renderer ────────────────────────────────────────────────────────
function Block({ b }: { b: (typeof CHAPTERS)[0]["content"][0] }) {
  if (b.type === "p")
    return (
      <p style={{ color: T.subtle, lineHeight: 1.75, fontSize: 14, margin: "0 0 14px" }}>
        {b.text}
      </p>
    );
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
        <span style={{ color: T.text, fontSize: 13, lineHeight: 1.6 }}>
          {b.text}
        </span>
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
  if (b.type === "table")
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
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? "transparent" : T.elevated }}
              >
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
  if (b.type === "stack")
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
            <div
              style={{
                fontWeight: 700,
                color: T.text,
                fontSize: 13,
                minWidth: 180,
              }}
            >
              {label}
            </div>
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
  const DemoComp = {
    stack: StackDemo,
    vectors: VectorDemo,
    attention: AttentionDemo,
    training: TrainingDemo,
    moe: MoEDemo,
    kvcache: KVCacheDemo,
  }[ch.demo as keyof typeof DemoComp];
  const TABS = [
    { id: "content", label: "📖 Content" },
    { id: "quiz", label: "🎯 Quiz", badge: QUIZZES[ch.n as keyof typeof QUIZZES]?.length },
    { id: "tutor", label: "🤖 AI Tutor" },
    { id: "notes", label: "📝 Notes" },
  ];
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 16px 60px" }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: color,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Chapter {ch.n} · Part {ch.part}
            </div>
            <h1
              style={{
                color: T.text,
                fontSize: 22,
                fontWeight: 800,
                margin: "0 0 8px",
                lineHeight: 1.3,
              }}
            >
              {ch.title}
            </h1>
            <p style={{ color: T.muted, fontSize: 14, margin: 0 }}>
              {ch.tagline}
            </p>
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
              <span
                style={{
                  background: color,
                  color: "#000",
                  borderRadius: 10,
                  padding: "1px 5px",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {t.badge}
              </span>
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
            {DemoComp && (
              <div
                style={{
                  padding: "20px",
                  borderRadius: 14,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    color: T.accent,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  ⚡ Interactive Demo
                </div>
                <DemoComp />
              </div>
            )}
          </div>
        )}
        {tab === "quiz" && <QuizPane ch={ch} onScore={onScore} />}
        {tab === "tutor" && (
          <div
            style={{
              padding: "20px",
              borderRadius: 14,
              background: T.surface,
              border: `1px solid ${T.border}`,
            }}
          >
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
              {(notes[ch.n] || "").length} characters · Notes are saved in this
              session
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Concept Map ───────────────────────────────────────────────────────────
function ConceptMap({
  openChapter,
  read,
}: {
  openChapter: (n: number) => void;
  read: Set<number>;
}) {
  const [hov, setHov] = useState<number | null>(null);
  const W = 760,
    H = 520;
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 40px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>
        🕸️ Knowledge Graph
      </h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>
        All 41 chapters and their conceptual connections. Click any node to open
        that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg
          width={W}
          height={H}
          style={{
            background: T.surface,
            borderRadius: 14,
            border: `1px solid ${T.border}`,
          }}
        >
          <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bg)" rx="14" />
          {EDGES.map(([a, b], i) => {
            const pa = NODE_POS[a],
              pb = NODE_POS[b];
            if (!pa || !pb) return null;
            const hi = hov === a || hov === b;
            return (
              <line
                key={i}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={hi ? T.accent : T.border}
                strokeWidth={hi ? 2 : 1}
                opacity={hov && !hi ? 0.15 : 0.7}
              />
            );
          })}
          {CHAPTERS.map((ch) => {
            const p = NODE_POS[ch.n];
            if (!p) return null;
            const color = PC[ch.part];
            const isH = hov === ch.n;
            const isR = read.has(ch.n);
            const r = ch.n === 0 ? 14 : isH ? 11 : 8;
            return (
              <g
                key={ch.n}
                onMouseEnter={() => setHov(ch.n)}
                onMouseLeave={() => setHov(null)}
                onClick={() => openChapter(ch.n)}
                style={{ cursor: "pointer" }}
              >
                {isH && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r + 8}
                    fill={color}
                    opacity={0.15}
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={isH ? color : `${color}77`}
                  stroke={color}
                  strokeWidth={isR ? 2.5 : 1}
                />
                {isR && (
                  <text
                    x={p.x}
                    y={p.y + 4}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="9"
                    fontWeight="800"
                  >
                    ✓
                  </text>
                )}
                {ch.n === 0 && !isR && (
                  <text
                    x={p.x}
                    y={p.y + 4}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="10"
                    fontWeight="700"
                  >
                    0
                  </text>
                )}
                {isH && (
                  <g>
                    <rect
                      x={p.x + r + 6}
                      y={p.y - 18}
                      width={Math.min(chMap[ch.n]?.title.length * 7 + 20, 210)}
                      height={34}
                      rx={6}
                      fill={T.elevated}
                      stroke={color}
                      strokeWidth={1}
                    />
                    <text
                      x={p.x + r + 14}
                      y={p.y - 5}
                      fill={T.text}
                      fontSize="11"
                      fontWeight="600"
                    >
                      Ch {ch.n}:{" "}
                      {chMap[ch.n]?.title.substring(0, 24)}
                      {chMap[ch.n]?.title.length > 24 ? "…" : ""}
                    </text>
                    <text
                      x={p.x + r + 14}
                      y={p.y + 8}
                      fill={T.muted}
                      fontSize="9"
                    >
                      Part {ch.part} · {PC[ch.part] && "click to open"}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PARTS.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 20,
              background: T.elevated,
              border: `1px solid ${T.border}`,
            }}
          >
            <div
              style={{ width: 8, height: 8, borderRadius: "50%", background: PC[p.id] }}
            />
            <span style={{ color: T.muted, fontSize: 11 }}>
              {p.icon} {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Glossary ──────────────────────────────────────────────────────────────
function GlossaryView({ openChapter }: { openChapter: (n: number) => void }) {
  const [q, setQ] = useState("");
  const filtered = GLOSSARY.filter(
    (g) =>
      !q ||
      g.term.toLowerCase().includes(q.toLowerCase()) ||
      g.def.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px 60px" }}>
      <h2 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>
        📖 Glossary
      </h2>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>
        {GLOSSARY.length} key terms from the curriculum
      </p>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
          gap: 10,
        }}
      >
        {filtered.map((g) => (
          <div
            key={g.term}
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              background: T.surface,
              border: `1px solid ${T.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 6,
              }}
            >
              <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>
                {g.term}
              </span>
              {g.ch != null && (
                <button
                  onClick={() => openChapter(g.ch!)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: T.accent,
                    cursor: "pointer",
                    fontSize: 11,
                    padding: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  Ch {g.ch} →
                </button>
              )}
            </div>
            <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.65 }}>
              {g.def}
            </div>
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
}: {
  view: string;
  setView: (v: string) => void;
  openChapter: (n: number) => void;
  selCh: number | null;
  read: Set<number>;
  quizScores: Record<number, { score: number; total: number }>;
  search: string;
  setSearch: (s: string) => void;
}) {
  const [expanded, setExpanded] = useState(new Set([0, 1, 2, 3]));
  const toggle = (id: number) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const chMap = Object.fromEntries(CHAPTERS.map((c) => [c.n, c]));
  const totalQ = Object.values(quizScores).reduce((a, s) => a + s.score, 0);
  const maxQ = Object.values(quizScores).reduce((a, s) => a + s.total, 0);
  return (
    <div
      style={{
        width: 270,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        height: "100vh",
        overflowY: "auto",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "18px 16px 12px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 18 }}>🧠</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>
            Frontier LLM V3
          </div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>
          12 Parts · 41 Chapters
        </div>
      </div>
      <div
        style={{
          padding: "8px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          gap: 4,
        }}
      >
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
      <div
        style={{
          padding: "8px 12px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
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
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        {PARTS.map((p) => {
          const color = PC[p.id];
          const filteredChs = p.chs.filter((n) => {
            if (!search) return true;
            const ch = chMap[n];
            return (
              ch &&
              (ch.title.toLowerCase().includes(search.toLowerCase()) ||
                ch.tagline.toLowerCase().includes(search.toLowerCase()))
            );
          });
          if (search && filteredChs.length === 0) return null;
          const isExp = expanded.has(p.id) || !!search;
          return (
            <div key={p.id}>
              <div
                onClick={() => toggle(p.id)}
                style={{
                  padding: "7px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: 13 }}>{p.icon}</span>
                <span
                  style={{
                    color: color,
                    fontWeight: 700,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    flex: 1,
                  }}
                >
                  {p.label}
                </span>
                <span style={{ color: T.muted, fontSize: 10 }}>
                  {isExp ? "▾" : "▸"}
                </span>
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
                        <div
                          style={{
                            color: isSel ? color : T.text,
                            fontSize: 12,
                            fontWeight: isSel ? 700 : 400,
                            lineHeight: 1.3,
                          }}
                        >
                          Ch {n} — {ch.title}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                        {isRead && (
                          <span style={{ color: color, fontSize: 10 }}>✓</span>
                        )}
                        {hasQ && (
                          <span style={{ color: T.accent, fontSize: 10 }}>🎯</span>
                        )}
                        {ch.demo && (
                          <span style={{ color: T.purple, fontSize: 10 }}>⚡</span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderTop: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span style={{ color: T.muted, fontSize: 11 }}>Chapters read</span>
          <span style={{ color: T.text, fontSize: 11, fontWeight: 700 }}>
            {read.size}/{CHAPTERS.length}
          </span>
        </div>
        <div
          style={{
            height: 3,
            background: T.border,
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: `${(read.size / CHAPTERS.length) * 100}%`,
              height: "100%",
              background: T.accent,
              borderRadius: 2,
              transition: "width .4s",
            }}
          />
        </div>
        {maxQ > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span style={{ color: T.muted, fontSize: 11 }}>Quiz score</span>
            <span style={{ color: T.amber, fontSize: 11, fontWeight: 700 }}>
              {totalQ}/{maxQ}
            </span>
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
    {
      label: "Novice Path",
      color: T.blue,
      desc: "Ch 0 → Read straight through the stack",
      chs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      label: "Engineer Track",
      color: T.green,
      desc: "Focus on Transformer + Production infrastructure",
      chs: [11, 12, 13, 14, 15, 16, 21, 22, 23, 24],
    },
    {
      label: "Researcher Route",
      color: T.purple,
      desc: "Deep dive into Training, MoE, Reasoning",
      chs: [16, 17, 18, 19, 20, 27, 31, 33, 34],
    },
    {
      label: "Executive View",
      color: T.amber,
      desc: "Strategy, Competitive Moats, Frontier Thesis",
      chs: [38, 39, 40, 41],
    },
  ];
  const highlighted =
    activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <div
        style={{
          padding: "40px 0 28px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, #22D3EE0A 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            color: T.accent,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
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
          The Frontier LLM Curriculum
        </h1>
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          12 Parts · 41 Chapters · From Fundamentals to Frontier Systems
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          { n: CHAPTERS.length, label: "Chapters" },
          { n: 12, label: "Parts" },
          { n: Object.keys(QUIZZES).length, label: "Quizzes" },
          { n: GLOSSARY.length, label: "Terms" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "14px",
              borderRadius: 10,
              background: T.surface,
              border: `1px solid ${T.border}`,
              textAlign: "center",
            }}
          >
            <div style={{ color: T.accent, fontSize: 24, fontWeight: 900 }}>
              {s.n}
            </div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      {recentlyRead.length > 0 && (
        <div
          style={{
            marginBottom: 20,
            padding: "16px 20px",
            borderRadius: 12,
            background: T.surface,
            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              color: T.subtle,
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: ".07em",
            }}
          >
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
      <div
        style={{
          marginBottom: 24,
          padding: "16px 20px",
          borderRadius: 12,
          background: T.surface,
          border: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            color: T.text,
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          📍 Choose a Learning Path
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 10,
          }}
        >
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
              <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                {p.label}
              </div>
              <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.5 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
      {PARTS.map((p) => {
        const color = PC[p.id];
        const chapters = p.chs.map((n) => CHAPTERS.find((c) => c.n === n)).filter(Boolean) as (typeof CHAPTERS)[0][];
        return (
          <div key={p.id} style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span>{p.icon}</span>
              <span
                style={{
                  color: color,
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                Part {p.id} — {p.label}
              </span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 8,
              }}
            >
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
                      border: `1px solid ${
                        hi ? color : dim ? "#0E1C3044" : T.border
                      }`,
                      cursor: "pointer",
                      opacity: dim ? 0.4 : 1,
                      transition: "all .2s",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      {isRead && (
                        <span style={{ color: color, fontSize: 12 }}>✓</span>
                      )}
                      {ch.demo && (
                        <span style={{ color: T.accent, fontSize: 10 }}>⚡</span>
                      )}
                      {QUIZZES[ch.n as keyof typeof QUIZZES] && (
                        <span style={{ color: T.amber, fontSize: 10 }}>🎯</span>
                      )}
                    </div>
                    <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>
                      Ch {ch.n}
                    </div>
                    <div
                      style={{
                        color: T.text,
                        fontWeight: 700,
                        fontSize: 13,
                        lineHeight: 1.3,
                        marginBottom: 4,
                        paddingRight: 28,
                      }}
                    >
                      {ch.title}
                    </div>
                    <div style={{ color: T.muted, fontSize: 11, lineHeight: 1.4 }}>
                      {ch.tagline}
                    </div>
                    {qs && (
                      <div style={{ marginTop: 6, color: T.amber, fontSize: 10 }}>
                        Quiz: {qs.score}/{qs.total}
                      </div>
                    )}
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
  const [quizScores, setQuizScores] = useState<Record<number, { score: number; total: number }>>(
    {}
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap";
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
  const onScore = (n: number, score: number, total: number) =>
    setQuizScores((q) => ({ ...q, [n]: { score, total } }));

  const ch = selCh !== null ? CHAPTERS.find((c) => c.n === selCh) : null;
  const color = ch ? PC[ch.part] : T.accent;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
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
      />
      <div style={{ flex: 1, overflowY: "auto" }}>
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
          <Overview
            setView={setView}
            openChapter={openChapter}
            read={read}
            quizScores={quizScores}
          />
        )}
      </div>
    </div>
  );
}