// @ts-nocheck
"use client";

import jsx from "react/jsx-runtime";
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
  pink: "#F472B6",
  teal: "#2DD4BF",
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
  "#E879F9",
];

// ── Parts ─────────────────────────────────────────────────────────────────
const PARTS = [
  { id: 0, label: "Territory Map", icon: "🗺️", chs: [0] },
  { id: 1, label: "Graph Foundations", icon: "🔵", chs: [1, 2, 3, 4] },
  { id: 2, label: "Core Algorithms", icon: "🧭", chs: [5, 6, 7, 8, 9] },
  { id: 3, label: "Graph Databases", icon: "🗄️", chs: [10, 11, 12] },
  { id: 4, label: "Knowledge Graphs", icon: "🕸️", chs: [13, 14, 15] },
  { id: 5, label: "Graph Neural Networks", icon: "🧠", chs: [16, 17, 18, 19] },
  { id: 6, label: "Graph RAG & Retrieval", icon: "🔍", chs: [20, 21, 22] },
  { id: 7, label: "Graph Analytics at Scale", icon: "⚙️", chs: [23, 24, 25] },
  { id: 8, label: "Graphs in AI Systems", icon: "🤖", chs: [26, 27, 28] },
  { id: 9, label: "Engineering Frontier", icon: "🚀", chs: [29, 30, 31] },
  { id: 10, label: "Compiler & Program Graphs", icon: "🧩", chs: [32, 33, 34, 35] },
];

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of Graph Engineering",
    tagline: "From nodes and edges to graph-native AI systems",
    insight:
      "Graphs are the universal language for representing relationships — and relationships are where intelligence lives.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Graph engineering is the discipline of modeling, storing, querying, and learning from connected data. It spans a vertical stack: from raw entities and relationships, through storage and algorithms, up to graph neural networks and graph-augmented LLM systems.",
      },
      {
        type: "stack",
        rows: [
          ["🌍 Raw Entities & Relations", "People, places, products, events — and how they connect"],
          ["🔵 Nodes & Edges", "The mathematical primitives: vertices and edges"],
          ["🗄️ Graph Storage", "Adjacency lists, edge lists, property graphs, RDF triples"],
          ["🧭 Graph Algorithms", "Traversal, shortest paths, centrality, community detection"],
          ["🧠 Graph Neural Networks", "Learning representations from graph structure"],
          ["🔍 Graph RAG", "Retrieval-augmented generation over knowledge graphs"],
          ["🤖 Graph-Native AI", "Agents that reason over structured relational knowledge"],
        ],
      },
      {
        type: "insight",
        text: "Every layer depends on the one below it. A GNN is only as good as the graph it operates on. Graph RAG is only as good as the knowledge graph it retrieves from. Start at the bottom.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "What Is a Graph?",
    tagline: "Nodes, edges, and the mathematics of connection",
    insight:
      "A graph G = (V, E) is the simplest possible model of a relationship system.",
    demo: "graphbasics",
    content: [
      {
        type: "p",
        text: "A graph is a set of vertices (nodes) V and a set of edges E connecting them. Edges can be directed or undirected, weighted or unweighted. That's it — and that simplicity is why graphs model everything from social networks to molecules to code dependencies.",
      },
      {
        type: "code",
        text: "Undirected:  A — B\nDirected:    A → B\nWeighted:    A —(3.5)— B\nMulti:       A — B, A — B (parallel edges)\nHyper:       edge connects 3+ nodes",
      },
      {
        type: "table",
        head: ["Graph Type", "Edge Property", "Real Example"],
        rows: [
          ["Undirected", "Symmetric", "Friendship, road networks"],
          ["Directed", "Asymmetric", "Twitter follows, web links"],
          ["Weighted", "Numeric label", "Distances, costs, strengths"],
          ["Bipartite", "Two node sets", "Users ↔ movies, authors ↔ papers"],
          ["Hypergraph", "N-ary edges", "Co-authorship, chemical reactions"],
        ],
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Graph Representations",
    tagline: "Adjacency lists, matrices, and edge lists — each with trade-offs",
    insight:
      "The right representation can be the difference between O(1) and O(V) lookups.",
    demo: "graphbasics",
    content: [
      {
        type: "p",
        text: "How you store a graph determines what operations are fast. There is no single best representation — only the right one for your access pattern.",
      },
      {
        type: "code",
        text: "Adjacency List:  A → [B, C]\n                 B → [A]\n                 C → [A]\n\nAdjacency Matrix:  A B C\n                 A 0 1 1\n                 B 1 0 0\n                 C 1 0 0\n\nEdge List:       [(A,B), (A,C)]",
      },
      {
        type: "table",
        head: ["Representation", "Space", "Edge Lookup", "Neighbor Iteration"],
        rows: [
          ["Adjacency List", "O(V + E)", "O(degree)", "O(degree) ✅"],
          ["Adjacency Matrix", "O(V²)", "O(1) ✅", "O(V)"],
          ["Edge List", "O(E)", "O(E)", "O(E)"],
        ],
      },
      {
        type: "insight",
        text: "Sparse graphs (most real-world graphs) → adjacency list. Dense graphs or frequent edge queries → adjacency matrix. Edge lists are best for streaming and batch processing.",
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Graph Properties",
    tagline: "Degree, density, connectivity, diameter — the vital signs of a graph",
    insight:
      "Real-world graphs are almost never random — they're scale-free, small-world, and clustered.",
    content: [
      {
        type: "p",
        text: "Graph properties tell you what kind of graph you're dealing with and which algorithms will work. Real networks (social, biological, technological) share striking statistical regularities.",
      },
      {
        type: "table",
        head: ["Property", "Definition", "Typical Real-World Value"],
        rows: [
          ["Degree", "Number of edges per node", "Power-law distributed"],
          ["Density", "E / (V(V-1)/2)", "Very sparse (< 0.001)"],
          ["Diameter", "Longest shortest path", "Small-world: ~6 hops"],
          ["Clustering coefficient", "Triangles / triples", "High (0.1–0.6)"],
          ["Connected components", "Maximal connected subgraphs", "One giant + many small"],
        ],
      },
      {
        type: "insight",
        text: "The 'small-world' property — six degrees of separation — is why graph traversal is powerful: you can reach most of the graph in a few hops, even with billions of nodes.",
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Graph Taxonomy",
    tagline: "Trees, DAGs, cycles, cliques — named structures with special properties",
    insight:
      "Recognizing that your graph is a DAG unlocks topological sort. Recognizing a tree unlocks linear-time algorithms.",
    content: [
      {
        type: "p",
        text: "Certain graph shapes have special properties that enable faster algorithms or cleaner models. Knowing the taxonomy helps you choose the right tool.",
      },
      {
        type: "table",
        head: ["Structure", "Definition", "Why It Matters"],
        rows: [
          ["Tree", "Connected, acyclic, V-1 edges", "Unique paths; linear algorithms"],
          ["DAG", "Directed, acyclic", "Topological sort; dependency resolution"],
          ["Cycle", "Path returning to start", "Detected by DFS; breaks pipelines"],
          ["Clique", "All nodes mutually connected", "Social groups; NP-hard to find max"],
          ["Planar", "Drawable without edge crossings", "Maps; faster algorithms"],
          ["Bipartite", "2-colorable", "Matching; recommendation systems"],
        ],
      },
      {
        type: "code",
        text: "Tree:      A\n          / \\\n         B   C\n        / \\\n       D   E\n\nDAG:       A → B → D\n           A → C → D",
      },
    ],
  },
  {
    n: 5,
    part: 2,
    title: "BFS & DFS",
    tagline: "The two fundamental traversals — breadth-first and depth-first",
    insight:
      "BFS finds shortest paths in unweighted graphs. DFS reveals structure: cycles, components, topological order.",
    demo: "traversal",
    content: [
      {
        type: "p",
        text: "Traversal is the foundation of every graph algorithm. BFS explores level by level using a queue. DFS goes deep using a stack (or recursion).",
      },
      {
        type: "code",
        text: "BFS: queue = [start]\n     while queue:\n       node = queue.pop(0)\n       for neighbor in node.neighbors:\n         if not visited: queue.append(neighbor)\n\nDFS: stack = [start]\n     while stack:\n       node = stack.pop()\n       for neighbor in node.neighbors:\n         if not visited: stack.append(neighbor)",
      },
      {
        type: "table",
        head: ["Algorithm", "Data Structure", "Time", "Finds"],
        rows: [
          ["BFS", "Queue", "O(V + E)", "Shortest path (unweighted)"],
          ["DFS", "Stack / Recursion", "O(V + E)", "Cycles, components, topo sort"],
        ],
      },
    ],
  },
  {
    n: 6,
    part: 2,
    title: "Shortest Paths",
    tagline: "Dijkstra, Bellman-Ford, A* — finding the cheapest route",
    insight:
      "Dijkstra is just BFS with a priority queue. A* is just Dijkstra with a heuristic.",
    demo: "shortestpath",
    content: [
      {
        type: "p",
        text: "Shortest path is the most-used graph primitive in production: routing, recommendations, dependency resolution, and network analysis all reduce to it.",
      },
      {
        type: "table",
        head: ["Algorithm", "Graph Type", "Time", "Key Idea"],
        rows: [
          ["BFS", "Unweighted", "O(V + E)", "Level-by-level expansion"],
          ["Dijkstra", "Non-negative weights", "O((V+E) log V)", "Greedy + priority queue"],
          ["Bellman-Ford", "Negative weights OK", "O(VE)", "Relax all edges V-1 times"],
          ["A*", "Non-negative + heuristic", "O((V+E) log V)", "Dijkstra + goal-directed heuristic"],
          ["Floyd-Warshall", "All pairs", "O(V³)", "Dynamic programming"],
        ],
      },
      {
        type: "code",
        text: "Dijkstra:\n  dist = {start: 0}, heap = [(0, start)]\n  while heap:\n    d, u = heappop(heap)\n    if d > dist[u]: continue\n    for v, w in u.edges:\n      if dist[u] + w < dist[v]:\n        dist[v] = dist[u] + w\n        heappush(heap, (dist[v], v))",
      },
    ],
  },
  {
    n: 7,
    part: 2,
    title: "Centrality & Influence",
    tagline: "Who matters in a network? Degree, betweenness, PageRank",
    insight:
      "PageRank turned centrality into a trillion-dollar industry. It's still the best starting point for influence.",
    demo: "centrality",
    content: [
      {
        type: "p",
        text: "Centrality measures answer: which nodes are most important? Different definitions of 'important' yield different algorithms and different answers.",
      },
      {
        type: "table",
        head: ["Measure", "Question", "Use Case"],
        rows: [
          ["Degree", "How many connections?", "Popularity, hubs"],
          ["Betweenness", "How many shortest paths pass through?", "Bridges, bottlenecks"],
          ["Closeness", "How fast to reach everyone?", "Information spread"],
          ["Eigenvector", "Connected to important nodes?", "Influence"],
          ["PageRank", "Random-walk visit probability", "Web search, ranking"],
        ],
      },
      {
        type: "code",
        text: "PageRank:\n  PR(u) = (1-d)/N + d × Σ PR(v)/out_degree(v)\n         for v in in_neighbors(u)\n\n  Iterate until convergence (d ≈ 0.85)",
      },
      {
        type: "insight",
        text: "Betweenness centrality finds the nodes whose removal would most disrupt the network — critical for infrastructure resilience and identifying key opinion leaders.",
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "Community Detection",
    tagline: "Finding clusters, modules, and communities in graphs",
    insight:
      "Modularity maximization is NP-hard, but Louvain gets within 1% in near-linear time.",
    demo: "community",
    content: [
      {
        type: "p",
        text: "Communities are densely connected subgraphs with sparse connections between them. Detecting them reveals structure: social circles, functional modules, topic clusters.",
      },
      {
        type: "table",
        head: ["Algorithm", "Approach", "Time", "Notes"],
        rows: [
          ["Louvain", "Modularity greedy", "O(E log V)", "Fast, widely used"],
          ["Leiden", "Improved Louvain", "O(E log V)", "Guarantees connected communities"],
          ["Label Propagation", "Neighbor voting", "O(E)", "Very fast, less stable"],
          ["Girvan-Newman", "Edge betweenness removal", "O(E²V)", "Slow, good for small graphs"],
          ["Spectral", "Eigenvectors of Laplacian", "O(V³)", "Theoretically elegant"],
        ],
      },
      {
        type: "code",
        text: "Modularity Q = (1/2m) Σ [Aᵢⱼ - kᵢkⱼ/2m] δ(cᵢ, cⱼ)\n\n  A = adjacency matrix\n  k = degree\n  m = total edges\n  δ = 1 if same community",
      },
    ],
  },
  {
    n: 9,
    part: 2,
    title: "Graph Coloring & Matching",
    tagline: "Scheduling, assignment, and resource allocation on graphs",
    insight:
      "Many NP-hard problems become tractable on special graph classes — bipartite, interval, planar.",
    content: [
      {
        type: "p",
        text: "Coloring assigns labels to nodes so no adjacent nodes share a label. Matching pairs nodes via edges. Both model real allocation problems.",
      },
      {
        type: "table",
        head: ["Problem", "Model", "Real Application"],
        rows: [
          ["Graph coloring", "No adjacent same color", "Register allocation, scheduling"],
          ["Maximum matching", "Largest set of disjoint edges", "Job assignment, dating apps"],
          ["Minimum vertex cover", "Smallest node set touching all edges", "Network monitoring"],
          ["Maximum independent set", "Largest set with no edges", "Conflict resolution"],
        ],
      },
      {
        type: "code",
        text: "Bipartite matching (Hopcroft-Karp):\n  O(E√V)\n\n  Greedy + augmenting paths\n  Used in: recommender systems, ad allocation",
      },
    ],
  },
  {
    n: 10,
    part: 3,
    title: "Property Graphs",
    tagline: "Nodes and edges with arbitrary key-value properties",
    insight:
      "Property graphs are the dominant model in industry: flexible, intuitive, and queryable.",
    demo: "propertygraph",
    content: [
      {
        type: "p",
        text: "A property graph attaches key-value pairs to both nodes and edges. This makes it easy to model rich, evolving domains without schema migration.",
      },
      {
        type: "code",
        text: "(alice:Person {name: 'Alice', age: 30})\n  -[:KNOWS {since: 2019}]->\n(bob:Person {name: 'Bob', age: 32})\n  -[:WORKS_AT]->\n(acme:Company {name: 'Acme'})",
      },
      {
        type: "table",
        head: ["Feature", "Property Graph", "RDF Triple Store"],
        rows: [
          ["Model", "Nodes + edges with properties", "Subject-predicate-object triples"],
          ["Schema", "Flexible, schema-optional", "Ontology-driven"],
          ["Query", "Cypher, Gremlin", "SPARQL"],
          ["Best for", "Application graphs", "Knowledge graphs, linked data"],
        ],
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Cypher & Gremlin",
    tagline: "Declarative and imperative graph query languages",
    insight:
      "Cypher reads like ASCII art of the graph. Gremlin is a traversal DSL you can compose.",
    demo: "cypher",
    content: [
      {
        type: "p",
        text: "Graph query languages let you express patterns visually. Cypher (Neo4j) is declarative and readable. Gremlin (Apache TinkerPop) is imperative and composable.",
      },
      {
        type: "code",
        text: "Cypher:\n  MATCH (a:Person)-[:KNOWS]->(b:Person)\n  WHERE a.name = 'Alice'\n  RETURN b.name\n\nGremlin:\n  g.V().has('Person','name','Alice')\n    .out('KNOWS').values('name')",
      },
      {
        type: "table",
        head: ["Language", "Paradigm", "Database"],
        rows: [
          ["Cypher", "Declarative, pattern-matching", "Neo4j, Memgraph"],
          ["Gremlin", "Imperative, traversal-based", "TinkerPop, JanusGraph"],
          ["SPARQL", "Declarative, triple patterns", "RDF stores"],
          ["GQL", "ISO standard (2024)", "Emerging across vendors"],
        ],
      },
    ],
  },
  {
    n: 12,
    part: 3,
    title: "Graph Storage Engines",
    tagline: "Native graph vs relational vs columnar — where do you put the edges?",
    insight:
      "Index-free adjacency is the defining feature of native graph databases.",
    content: [
      {
        type: "p",
        text: "Storing a graph is fundamentally about how you lay out edges on disk. The choice determines traversal performance at scale.",
      },
      {
        type: "table",
        head: ["Engine Type", "Storage", "Traversal Cost", "Examples"],
        rows: [
          ["Native graph", "Index-free adjacency", "O(1) per hop ✅", "Neo4j, Memgraph"],
          ["Relational", "Join tables", "O(log V) per hop", "PostgreSQL, MySQL"],
          ["Columnar", "Edge tables", "Batch-friendly", "ClickHouse, BigQuery"],
          ["Triple store", "Subject-predicate-object", "Index-heavy", "Jena, Blazegraph"],
          ["Distributed", "Sharded adjacency", "Network-bound", "JanusGraph, NebulaGraph"],
        ],
      },
      {
        type: "insight",
        text: "Index-free adjacency means each node stores direct pointers to its neighbors. Following an edge is a pointer dereference, not an index lookup — this is why native graph DBs are orders of magnitude faster for deep traversals.",
      },
    ],
  },
  {
    n: 13,
    part: 4,
    title: "Knowledge Graphs",
    tagline: "Entities, relations, and ontologies — structured world knowledge",
    insight:
      "A knowledge graph is a graph where nodes are real-world entities and edges are typed relations.",
    demo: "knowledgegraph",
    content: [
      {
        type: "p",
        text: "Knowledge graphs represent facts about the world as triples: (subject, predicate, object). They power search engines, recommendation systems, and increasingly, LLM grounding.",
      },
      {
        type: "code",
        text: "(Albert_Einstein, born_in, Ulm)\n(Albert_Einstein, won, Nobel_Prize_in_Physics)\n(Albert_Einstein, known_for, Theory_of_Relativity)\n(Nobel_Prize_in_Physics, part_of, Nobel_Prize)",
      },
      {
        type: "table",
        head: ["Knowledge Graph", "Scale", "Domain"],
        rows: [
          ["Wikidata", "100M+ entities", "General"],
          ["Google Knowledge Graph", "500B+ facts", "General"],
          ["Freebase (archived)", "1.9B triples", "General"],
          ["DBpedia", "3B+ triples", "Wikipedia-derived"],
          ["Domain KGs", "Varies", "Medical, legal, financial"],
        ],
      },
    ],
  },
  {
    n: 14,
    part: 4,
    title: "Ontologies & Schema",
    tagline: "RDFS, OWL, and defining what your graph means",
    insight:
      "An ontology is a formal contract: what types exist, what relations are valid, what can be inferred.",
    content: [
      {
        type: "p",
        text: "Ontologies define the vocabulary of a knowledge graph: classes, properties, hierarchies, and inference rules. They turn a graph of facts into a graph of meaning.",
      },
      {
        type: "table",
        head: ["Standard", "Purpose", "Expressiveness"],
        rows: [
          ["RDFS", "Class/property hierarchy", "Low"],
          ["OWL Lite", "Cardinality, simple constraints", "Medium"],
          ["OWL DL", "Description logic", "High (decidable)"],
          ["OWL Full", "Full first-order", "Very high (undecidable)"],
          ["SHACL", "Shape constraints", "Validation-focused"],
        ],
      },
      {
        type: "code",
        text: "RDFS:\n  :Person rdfs:subClassOf :Agent\n  :knows rdfs:domain :Person\n  :knows rdfs:range :Person\n\nOWL:\n  :Parent owl:equivalentClass\n    [ owl:intersectionOf (:Person\n      [ owl:onProperty :hasChild\n        owl:someValuesFrom :Person ]) ]",
      },
    ],
  },
  {
    n: 15,
    part: 4,
    title: "Graph Embeddings",
    tagline: "Translating graph structure into vectors",
    insight:
      "Node2Vec, DeepWalk, and LINE learn vectors where graph proximity becomes vector proximity.",
    demo: "embeddings",
    content: [
      {
        type: "p",
        text: "Graph embeddings learn low-dimensional vector representations of nodes such that nodes close in the graph are close in vector space. This lets you use vector databases and downstream ML on graph data.",
      },
      {
        type: "table",
        head: ["Method", "Approach", "Captures"],
        rows: [
          ["DeepWalk", "Random walks + Word2Vec", "Local structure"],
          ["Node2Vec", "Biased random walks", "Local + global structure"],
          ["LINE", "1st + 2nd order proximity", "Direct + indirect edges"],
          ["Metapath2Vec", "Heterogeneous walks", "Multi-type graphs"],
          ["GraphSAGE", "Inductive aggregation", "Unseen nodes"],
        ],
      },
      {
        type: "code",
        text: "Node2Vec:\n  1. Generate biased random walks\n  2. Treat walks as sentences\n  3. Run Skip-gram (Word2Vec)\n  4. Get embedding per node\n\n  p, q control depth vs breadth bias",
      },
    ],
  },
  {
    n: 16,
    part: 5,
    title: "Graph Neural Networks",
    tagline: "Deep learning on graph-structured data",
    insight:
      "A GNN is message passing: each node aggregates information from its neighbors.",
    demo: "gnn",
    content: [
      {
        type: "p",
        text: "GNNs generalize convolutions to graphs. Each layer, every node receives messages from its neighbors, aggregates them, and updates its own representation. Stack L layers and information flows L hops.",
      },
      {
        type: "code",
        text: "Message passing (simplified):\n  h_v^(l+1) = UPDATE(h_v^(l),\n                      AGGREGATE({h_u^(l) : u ∈ N(v)}))\n\n  AGGREGATE: mean, sum, max, attention\n  UPDATE: MLP, GRU, linear",
      },
      {
        type: "table",
        head: ["GNN Layer", "Aggregation", "Key Idea"],
        rows: [
          ["GCN", "Mean (normalized)", "Spectral convolution approximation"],
          ["GraphSAGE", "Mean / LSTM / pool", "Inductive, scalable"],
          ["GAT", "Attention-weighted", "Learns neighbor importance"],
          ["GIN", "Sum", "Maximally expressive (WL test)"],
          ["MPNN", "Generic message function", "Unified framework"],
        ],
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "GNN Architecture Patterns",
    tagline: "Depth, pooling, skip connections, and over-smoothing",
    insight:
      "Stack too many GNN layers and all nodes converge to the same vector — this is over-smoothing.",
    content: [
      {
        type: "p",
        text: "GNNs face unique architectural challenges: receptive field growth, over-smoothing, and readout. Modern architectures address these with skip connections, jumping knowledge, and hierarchical pooling.",
      },
      {
        type: "table",
        head: ["Challenge", "Symptom", "Solution"],
        rows: [
          ["Over-smoothing", "All nodes converge", "Skip connections, dropout, residual"],
          ["Over-squashing", "Long-range info lost", "Graph rewiring, virtual nodes"],
          ["Scalability", "Memory blowup", "Neighbor sampling (GraphSAGE)"],
          ["Readout", "Graph-level tasks", "Global pooling, attention pool"],
          ["Heterogeneity", "Multiple node types", "R-GCN, HGT, metapaths"],
        ],
      },
      {
        type: "code",
        text: "Jumping Knowledge (JK):\n  h_final = CONCAT(h^(1), h^(2), ..., h^(L))\n\n  Lets the model choose which layer's\n  representation to use per node",
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "GNN Applications",
    tagline: "Drug discovery, recommendation, fraud detection, traffic",
    insight:
      "Any domain where relationships matter is a GNN candidate — and most domains are relational.",
    content: [
      {
        type: "p",
        text: "GNNs shine wherever the signal is in the connections, not just the features. They're now standard in chemistry, recommender systems, and fraud detection.",
      },
      {
        type: "table",
        head: ["Domain", "Graph", "Task"],
        rows: [
          ["Drug discovery", "Molecule atoms/bonds", "Property prediction"],
          ["Recommendation", "User-item bipartite", "Link prediction"],
          ["Fraud detection", "Transaction network", "Anomaly detection"],
          ["Traffic", "Road network", "Flow forecasting"],
          ["Knowledge graphs", "Entity-relation", "Link prediction, QA"],
          ["Code analysis", "AST + call graph", "Bug detection"],
        ],
      },
      {
        type: "insight",
        text: "Molecule property prediction was the first GNN killer app — models like SchNet and DimeNet predict quantum properties directly from graph structure, accelerating drug discovery.",
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "GNN Training at Scale",
    tagline: "Sampling, partitioning, and distributed GNN training",
    insight:
      "You cannot fit a billion-node graph in GPU memory. Sampling is mandatory.",
    content: [
      {
        type: "p",
        text: "Real graphs have billions of nodes and edges. Training GNNs on them requires mini-batch sampling, graph partitioning, and careful memory management.",
      },
      {
        type: "table",
        head: ["Technique", "How", "Trade-off"],
        rows: [
          ["Neighbor sampling", "Sample k neighbors per layer", "Stochastic, fast"],
          ["Cluster-GCN", "Partition into clusters", "Fewer cross-partition edges"],
          ["GraphSAINT", "Sample subgraphs", "Unbiased, slower"],
          ["Distributed", "Shard graph across machines", "Communication overhead"],
          ["Pinned memory", "Async CPU-GPU transfer", "Engineering complexity"],
        ],
      },
    ],
  },
  {
    n: 20,
    part: 6,
    title: "Graph RAG",
    tagline: "Retrieval-augmented generation over knowledge graphs",
    insight:
      "Vector RAG retrieves chunks. Graph RAG retrieves subgraphs — preserving relationships.",
    demo: "graphrag",
    content: [
      {
        type: "p",
        text: "Graph RAG combines knowledge graphs with LLMs: instead of retrieving flat text chunks, you retrieve a relevant subgraph and serialize it into the prompt. This preserves relational context that chunking destroys.",
      },
      {
        type: "code",
        text: "Query → Entity linking → Subgraph retrieval\n     → Serialize triples → LLM prompt\n     → Grounded answer with reasoning path",
      },
      {
        type: "table",
        head: ["Vector RAG", "Graph RAG"],
        rows: [
          ["Retrieves top-k chunks", "Retrieves relevant subgraph"],
          ["Loses cross-chunk relations", "Preserves explicit relations"],
          ["Embedding similarity", "Entity + relation matching"],
          ["Simple to build", "Requires KG construction"],
          ["Good for facts", "Good for multi-hop reasoning"],
        ],
      },
      {
        type: "insight",
        text: "Microsoft's GraphRAG showed that community summaries over a knowledge graph dramatically improve global questions like 'What are the main themes?' — questions vector RAG fails at.",
      },
    ],
  },
  {
    n: 21,
    part: 6,
    title: "Multi-Hop Question Answering",
    tagline: "Answering questions that require traversing relations",
    insight:
      "Multi-hop QA is where graphs beat vectors: 'Who directed the film that won the Oscar for the actor born in X?'",
    content: [
      {
        type: "p",
        text: "Many questions require chaining facts: A → B → C. Vector RAG struggles because the intermediate entity may not appear in the query. Graph RAG traverses explicitly.",
      },
      {
        type: "code",
        text: "Q: Who is the spouse of the director of Inception?\n\n  Hop 1: Inception --directed_by--> Christopher_Nolan\n  Hop 2: Christopher_Nolan --spouse--> Emma_Thomas\n\n  Answer: Emma Thomas",
      },
      {
        type: "table",
        head: ["Approach", "Method", "Strengths"],
        rows: [
          ["Prompting", "LLM iterates queries", "Flexible, no training"],
          ["Graph traversal", "Follow edges programmatically", "Deterministic, fast"],
          ["GNN + LLM", "GNN scores paths, LLM generates", "Learned path ranking"],
          ["Agentic", "LLM plans hops, tools execute", "Most flexible"],
        ],
      },
    ],
  },
  {
    n: 22,
    part: 6,
    title: "Graph-Enhanced Agents",
    tagline: "Agents that use graphs as memory and world models",
    insight:
      "An agent's memory is a graph: entities, events, and their relations over time.",
    content: [
      {
        type: "p",
        text: "Agentic systems increasingly use graphs as structured memory. Instead of a flat conversation buffer, the agent maintains a graph of entities, facts, and temporal relations, enabling long-horizon reasoning.",
      },
      {
        type: "table",
        head: ["Graph Role", "What It Stores", "Agent Benefit"],
        rows: [
          ["Episodic memory", "Events + timestamps", "Recall past interactions"],
          ["Semantic memory", "Entities + relations", "World knowledge"],
          ["Task graph", "Subtasks + dependencies", "Planning and execution"],
          ["Tool graph", "Tools + capabilities", "Tool selection"],
          ["Belief graph", "Uncertain facts + confidence", "Reasoning under uncertainty"],
        ],
      },
      {
        type: "code",
        text: "Agent memory graph:\n  (user) --asked--> (question)\n  (question) --about--> (entity)\n  (entity) --has_property--> (fact)\n  (fact) --verified_by--> (source)\n  (source) --has_trust--> (score)",
      },
    ],
  },
  {
    n: 23,
    part: 7,
    title: "Graph Analytics at Scale",
    tagline: "Pregel, GraphX, and distributed graph processing",
    insight:
      "Think like a vertex: Pregel's vertex-centric model made distributed graph processing simple.",
    content: [
      {
        type: "p",
        text: "When a graph doesn't fit on one machine, you need distributed processing. Google's Pregel introduced the vertex-centric paradigm: each vertex runs the same function, exchanging messages with neighbors across supersteps.",
      },
      {
        type: "code",
        text: "Pregel superstep:\n  1. Receive messages from previous step\n  2. Update vertex value\n  3. Send messages to neighbors\n  4. Vote to halt\n\n  Repeat until all vertices halt",
      },
      {
        type: "table",
        head: ["Framework", "Model", "Notes"],
        rows: [
          ["Pregel", "Vertex-centric", "Google's original"],
          ["Giraph", "Pregel clone", "Hadoop-based"],
          ["GraphX", "Spark RDD + graph", "Unified with data pipelines"],
          ["GraphLab / PowerGraph", "Gather-apply-scatter", "Asynchronous"],
          ["Ligra / Gunrock", "Frontier-based", "Single-machine, fast"],
        ],
      },
    ],
  },
  {
    n: 24,
    part: 7,
    title: "Streaming Graphs",
    tagline: "When edges arrive continuously and you can't recompute",
    insight:
      "Real-time fraud detection needs streaming graph algorithms, not nightly batch jobs.",
    content: [
      {
        type: "p",
        text: "Many graphs are dynamic: edges and nodes arrive continuously. Streaming graph systems maintain approximate answers under insertions and deletions without full recomputation.",
      },
      {
        type: "table",
        head: ["Problem", "Streaming Approach", "Guarantee"],
        rows: [
          ["Connected components", "Union-Find (incremental)", "Exact for insertions"],
          ["Triangle counting", "Sampling / sketches", "Approximate"],
          ["PageRank", "Incremental updates", "Approximate"],
          ["Community detection", "Label propagation", "Approximate"],
          ["Anomaly detection", "Sketch-based", "Probabilistic"],
        ],
      },
      {
        type: "code",
        text: "Streaming connected components:\n  on edge (u, v):\n    union(u, v)\n  query(u, v):\n    find(u) == find(v)\n\n  O(α(n)) amortized per operation",
      },
    ],
  },
  {
    n: 25,
    part: 7,
    title: "Graph Compression",
    tagline: "Web graphs, succinct structures, and billion-edge storage",
    insight:
      "The Web graph has trillions of edges. Compression is not optional.",
    content: [
      {
        type: "p",
        text: "Graphs are highly compressible because they're sparse and often exhibit locality. Succinct data structures store graphs in near-information-theoretic space while supporting fast queries.",
      },
      {
        type: "table",
        head: ["Technique", "Idea", "Compression"],
        rows: [
          ["Adjacency list delta", "Sort + delta encode", "2–5×"],
          ["Web graph compression", "Reference previous lists", "10–20×"],
          ["Elias-Fano", "Succinct monotone sequences", "Near-optimal"],
          ["Bloom filters", "Probabilistic membership", "Lossy but tiny"],
          ["Graph summarization", "Merge similar nodes", "Lossy, task-dependent"],
        ],
      },
    ],
  },
  {
    n: 26,
    part: 8,
    title: "Graphs in LLM Systems",
    tagline: "Where graphs meet transformers",
    insight:
      "Transformers are fully-connected graphs with learned attention. Explicit graphs constrain and structure that attention.",
    content: [
      {
        type: "p",
        text: "LLMs and graphs are converging. Attention itself is a graph. Structured inputs (code, molecules, knowledge) are graphs. Retrieval is graph traversal. The intersection is rich.",
      },
      {
        type: "table",
        head: ["Intersection", "How Graphs Help"],
        rows: [
          ["Attention as graph", "Tokens attend to tokens — a weighted graph"],
          ["Structured input", "Code ASTs, molecules, tables as graphs"],
          ["Retrieval", "Graph RAG retrieves relational context"],
          ["Reasoning", "Chain-of-thought as path in reasoning graph"],
          ["Memory", "Agent memory as evolving graph"],
          ["Verification", "Knowledge graph fact-checking"],
        ],
      },
    ],
  },
  {
    n: 27,
    part: 8,
    title: "Graph Transformers",
    tagline: "Transformers that operate on graphs instead of sequences",
    insight:
      "Graph transformers replace positional encodings with structural encodings.",
    demo: "graphtransformer",
    content: [
      {
        type: "p",
        text: "Graph transformers apply self-attention to graph nodes, using structural features (degree, shortest path, Laplacian eigenvectors) as positional encodings. They often outperform GNNs on long-range tasks.",
      },
      {
        type: "table",
        head: ["Model", "Key Idea", "Strength"],
        rows: [
          ["Graphormer", "Centrality + spatial encoding", "Molecular property prediction"],
          ["GraphGPS", "Local MPNN + global attention", "General graphs"],
          ["SAN", "Learned positional encodings", "Expressive"],
          ["GPS", "Hybrid recipe", "State-of-the-art benchmarks"],
        ],
      },
      {
        type: "code",
        text: "Graphormer attention:\n  Aᵢⱼ = (hᵢ W_Q)(hⱼ W_K)ᵀ / √d\n        + b_φ(degree)\n        + b_spdist(shortest_path(i,j))",
      },
    ],
  },
  {
    n: 28,
    part: 8,
    title: "Neuro-Symbolic Graphs",
    tagline: "Combining graph logic with neural learning",
    insight:
      "Symbolic graphs give precision; neural nets give generalization. Together they give both.",
    content: [
      {
        type: "p",
        text: "Neuro-symbolic systems use graphs as the symbolic substrate and neural networks for perception and generalization. This is a promising path to more reliable, interpretable AI.",
      },
      {
        type: "table",
        head: ["Approach", "Symbolic Part", "Neural Part"],
        rows: [
          ["Logic + GNN", "Rules, constraints", "GNN for perception"],
          ["KG + LLM", "Knowledge graph", "LLM for language"],
          ["Program synthesis", "Graph of operations", "Neural search"],
          ["Theorem proving", "Proof graph", "Neural tactic prediction"],
          ["Scene graphs", "Object relations", "CNN/ViT perception"],
        ],
      },
    ],
  },
  {
    n: 29,
    part: 9,
    title: "Graph Infrastructure Stack",
    tagline: "What you need to run graphs in production",
    insight:
      "A production graph stack has storage, compute, query, and learning layers — each with distinct requirements.",
    content: [
      {
        type: "p",
        text: "Running graphs at scale requires a full stack: storage engines, query layers, compute frameworks, and ML integration. No single tool covers everything.",
      },
      {
        type: "table",
        head: ["Layer", "Responsibility", "Tools"],
        rows: [
          ["Storage", "Persist nodes and edges", "Neo4j, JanusGraph, Neptune"],
          ["Query", "Cypher, Gremlin, SPARQL", "Neo4j, TigerGraph, Dgraph"],
          ["Compute", "Batch and streaming algorithms", "Spark GraphX, Pregel, Flink Gelly"],
          ["Embedding", "Learn node vectors", "PyG, DGL, GraphSAGE"],
          ["GNN training", "Deep learning on graphs", "PyG, DGL, OGB"],
          ["Serving", "Low-latency inference", "Triton, TorchServe, ONNX"],
          ["Visualization", "Explore and debug", "Gephi, Cytoscape, Graphistry"],
        ],
      },
    ],
  },
  {
    n: 30,
    part: 9,
    title: "Graph Engineering Trade-offs",
    tagline: "Latency, consistency, expressiveness, cost — you can't have everything",
    insight:
      "Every graph system design is a negotiation between four competing forces.",
    content: [
      {
        type: "p",
        text: "Graph engineering is full of trade-offs. Understanding them is what separates a working prototype from a production system.",
      },
      {
        type: "table",
        head: ["Decision", "Option A", "Option B"],
        rows: [
          ["Storage", "Native graph (fast traversal)", "Relational (familiar, ACID)"],
          ["Consistency", "Strong (slow, correct)", "Eventual (fast, complex)"],
          ["Processing", "Batch (throughput)", "Streaming (latency)"],
          ["Algorithm", "Exact (slow, correct)", "Approximate (fast, probabilistic)"],
          ["Model", "GNN (learned, opaque)", "Rules (explicit, brittle)"],
          ["Distribution", "Single machine (simple)", "Cluster (scalable, complex)"],
        ],
      },
      {
        type: "insight",
        text: "The most common production mistake is choosing a distributed graph system when a single machine would suffice. A modern server with 1TB RAM handles billions of edges if the graph is sparse.",
      },
    ],
  },
  {
    n: 31,
    part: 9,
    title: "The Graph Engineering Frontier",
    tagline: "Where graphs and AI are heading together",
    insight:
      "The frontier is graph-native AI: systems that perceive, reason, and act over structured relational knowledge.",
    content: [
      {
        type: "table",
        head: ["Frontier", "Description", "Status"],
        rows: [
          ["Graph foundation models", "Pre-trained on diverse graphs", "Early research"],
          ["LLM + KG integration", "LLMs query and update KGs", "Rapidly maturing"],
          ["Temporal knowledge graphs", "Time-aware relational reasoning", "Active research"],
          ["Causal graphs + ML", "Graphs for causal inference", "Growing"],
          ["Graph-native agents", "Agents with graph memory and tools", "Emerging"],
          ["Differentiable graph algorithms", "End-to-end learnable graph ops", "Research"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: Graph RAG + Knowledge Graphs + GNNs + LLM Agents + Temporal Reasoning + Evaluation Infrastructure. Graphs are becoming the substrate for grounded, verifiable AI.",
      },
    ],
  },
  {
    n: 32,
    part: 10,
    title: "Abstract Syntax Trees",
    tagline: "Parsing code into a structured graph of meaning",
    insight:
      "An AST is a tree-shaped program representation where syntax is turned into explicit nodes, operators, and operands.",
    content: [
      {
        type: "p",
        text: "The Abstract Syntax Tree (AST) is the earliest major graph in compiler pipelines. It represents program structure as a tree: assignments, expressions, conditionals, loops, function calls, and return values. Each node is a language construct; edges represent composition.",
      },
      {
        type: "code",
        text: `x = y + 1;
if (x > 0) {
  z = x * 2;
}

AST nodes: Assign, Add, Compare, If, Call, Return`,
      },
      {
        type: "table",
        head: ["AST Pattern", "Meaning"],
        rows: [
          ["BinaryExpr", "Operator with left and right operands"],
          ["IfStmt", "Conditional branch"],
          ["CallExpr", "Function invocation"],
          ["VarDecl", "Variable definition"],
          ["ReturnStmt", "Control exits a function"],
        ],
      },
      {
        type: "insight",
        text: "The AST is the canonical graph for language tooling: pretty-printers, linters, refactoring engines, type checkers, and code generators all operate on it or on an enriched variant of it.",
      },
    ],
  },
  {
    n: 33,
    part: 10,
    title: "Control-Flow Graphs",
    tagline: "Program execution as a graph of reachable states",
    insight:
      "A CFG is a directed graph where nodes are basic blocks and edges are possible execution paths between them.",
    content: [
      {
        type: "p",
        text: "Control-flow graphs (CFGs) model how execution moves through a program. Each node represents a basic block — a straight-line sequence of instructions — and each edge captures a branch, jump, or fall-through pathway. CFGs are essential for optimization, reachability analysis, and bug detection.",
      },
      {
        type: "code",
        text: `entry -> B1 -> B2 -> B3
             \    \_
                 -> exit

B1: if (x > 0) goto B2 else B3`,
      },
      {
        type: "table",
        head: ["CFG Property", "What It Tells You"],
        rows: [
          ["Reachability", "Which blocks can execute from entry"],
          ["Dominators", "Which blocks always execute before a node"],
          ["Loops", "Back-edges and cycle structure"],
          ["Branching", "True/false path conditions"],
        ],
      },
      {
        type: "insight",
        text: "CFGs answer the question: 'what can happen next?' This makes them the foundation for many compiler analyses — dead-code elimination, loop optimization, branch prediction, and security checks.",
      },
    ],
  },
  {
    n: 34,
    part: 10,
    title: "Data Dependence Graphs",
    tagline: "Tracing which values flow into which computations",
    insight:
      "A DDG is a graph of value producers and consumers: every edge means 'this value influences this use'.",
    content: [
      {
        type: "p",
        text: "Data dependence graphs (DDGs) model the flow of values through a program. They connect definitions to later uses, revealing when a value is reused, overwritten, or can be optimized away. DDGs complement CFGs by focusing on data movement instead of execution order.",
      },
      {
        type: "code",
        text: `x = a + b
y = x * 2
z = y + 3

DDG edges: a -> x -> y -> z
           b -> x -> y -> z`,
      },
      {
        type: "table",
        head: ["Graph Lens", "Question"],
        rows: [
          ["CFG", "What executes next?"],
          ["DDG", "What value influences this use?"],
          ["AST", "What is the syntax tree?"],
          ["SSA", "How are versions of a variable tracked?"],
        ],
      },
      {
        type: "insight",
        text: "A program is not just a series of instructions; it is a dependency network. DDGs are the graphs that let compilers reason about parallelism, elimination, and reordering without changing semantics.",
      },
    ],
  },
  {
    n: 35,
    part: 10,
    title: "SSA Form and Def-Use Graphs",
    tagline: "Each value has a unique version, and each use points to a definition",
    insight:
      "SSA makes program analysis cleaner by ensuring every variable assignment creates a new version and every use is explicit.",
    content: [
      {
        type: "p",
        text: "Static Single Assignment (SSA) is a compiler representation where each variable is assigned exactly once. When a value may come from multiple control-flow paths, a phi node merges versions. This creates a clear def-use graph that makes optimization and analysis easier.",
      },
      {
        type: "code",
        text: `x1 = a + b
if (cond) {
  x2 = x1 + 1
} else {
  x3 = x1 - 1
}
x4 = phi(x2, x3)
y = x4 * 2`,
      },
      {
        type: "table",
        head: ["SSA Concept", "Why It Helps"],
        rows: [
          ["Single assignment", "No ambiguity about which value is current"],
          ["Phi node", "Merge values from multiple predecessors"],
          ["Def-use chains", "Directly connect definitions to uses"],
          ["Optimization", "Simplifies constant propagation and dead code elimination"],
        ],
      },
      {
        type: "insight",
        text: "SSA is one of the most important program-analysis graphs in modern compilers. It converts a program from a mutable state machine into a richer value graph, which is easier to analyze, optimize, and lower to machine code.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes graph engineering?",
      opts: [
        "Drawing charts and plots",
        "Modeling, storing, querying, and learning from connected data",
        "A JavaScript charting library",
        "Database administration only",
      ],
      ans: 1,
      exp: "Graph engineering is the full discipline of working with connected data: from modeling entities and relations, through storage and algorithms, up to graph neural networks and graph-augmented AI systems.",
    },
    {
      q: "Why do graphs matter for AI?",
      opts: [
        "They make code run faster",
        "Relationships between entities are where much of intelligence and meaning lives",
        "They replace neural networks",
        "They are only used for visualization",
      ],
      ans: 1,
      exp: "Most real-world knowledge is relational. Graphs explicitly model relationships, enabling reasoning, retrieval, and learning that flat data cannot capture. This is why knowledge graphs and graph RAG are central to modern AI.",
    },
  ],
  1: [
    {
      q: "A graph G = (V, E) consists of:",
      opts: [
        "Vertices and edges",
        "Rows and columns",
        "Keys and values",
        "Layers and neurons",
      ],
      ans: 0,
      exp: "A graph is a set of vertices V and a set of edges E connecting pairs of vertices. Everything else — direction, weight, type — is an extension of this simple definition.",
    },
    {
      q: "What's the difference between directed and undirected graphs?",
      opts: [
        "Directed graphs have weighted edges",
        "Directed edges have a direction (A→B); undirected edges are symmetric (A—B)",
        "Undirected graphs cannot have cycles",
        "Directed graphs only have one node",
      ],
      ans: 1,
      exp: "Directed edges go from a source to a target — like Twitter follows or web links. Undirected edges represent symmetric relationships — like friendship or road connections. The direction changes which algorithms apply and what the edges mean.",
    },
  ],
  5: [
    {
      q: "Which traversal finds the shortest path in an unweighted graph?",
      opts: ["DFS", "BFS", "Dijkstra", "A*"],
      ans: 1,
      exp: "BFS explores level by level, so the first time it reaches a node, it's via the shortest path in terms of number of edges. DFS dives deep and may find a longer path first. Dijkstra and A* are for weighted graphs.",
    },
    {
      q: "What data structure does DFS use internally?",
      opts: ["Queue", "Stack (or recursion)", "Heap", "Linked list"],
      ans: 1,
      exp: "DFS uses a stack — either explicitly or via recursion. It pushes neighbors and pops the most recent, diving as deep as possible before backtracking. BFS uses a queue instead.",
    },
  ],
  6: [
    {
      q: "Dijkstra's algorithm fails when:",
      opts: [
        "The graph is too large",
        "There are negative edge weights",
        "The graph is directed",
        "There are too many nodes",
      ],
      ans: 1,
      exp: "Dijkstra assumes that once a node is finalized, its distance can't improve. Negative edges violate this — a longer path could become cheaper. Bellman-Ford handles negative weights (and detects negative cycles).",
    },
    {
      q: "A* is best described as:",
      opts: [
        "Dijkstra with a heuristic guiding search toward the goal",
        "A faster version of BFS",
        "An approximation algorithm",
        "A type of GNN",
      ],
      ans: 0,
      exp: "A* is Dijkstra plus a heuristic h(n) that estimates distance to the goal. It prioritizes nodes by f(n) = g(n) + h(n). With an admissible heuristic, A* is optimal and often explores far fewer nodes than Dijkstra.",
    },
  ],
  7: [
    {
      q: "PageRank measures:",
      opts: [
        "How many edges a node has",
        "The probability a random walker is at a node after many steps",
        "The shortest path between nodes",
        "The number of communities",
      ],
      ans: 1,
      exp: "PageRank simulates a random walker who follows edges and occasionally jumps to a random node. The stationary distribution of this walk gives each node's rank. Nodes linked from important nodes get higher rank — this is why it powers web search.",
    },
    {
      q: "Betweenness centrality identifies:",
      opts: [
        "The most popular node",
        "Nodes that act as bridges on shortest paths",
        "The largest community",
        "The node with the highest degree",
      ],
      ans: 1,
      exp: "Betweenness counts how many shortest paths pass through each node. High-betweenness nodes are bottlenecks or bridges — critical for information flow, and their removal most disrupts the network.",
    },
  ],
  13: [
    {
      q: "A knowledge graph triple is:",
      opts: [
        "Node, edge, weight",
        "Subject, predicate, object",
        "Row, column, value",
        "Vertex, degree, community",
      ],
      ans: 1,
      exp: "Knowledge graphs represent facts as (subject, predicate, object) triples: (Einstein, born_in, Ulm). This simple structure scales to billions of facts and supports logical inference.",
    },
    {
      q: "What is an ontology in a knowledge graph?",
      opts: [
        "A database index",
        "A formal specification of classes, properties, and inference rules",
        "A visualization tool",
        "A type of graph algorithm",
      ],
      ans: 1,
      exp: "An ontology defines the vocabulary and rules of a knowledge graph: what classes exist, what properties connect them, what can be inferred. RDFS and OWL are standard ontology languages.",
    },
  ],
  16: [
    {
      q: "A GNN layer does what?",
      opts: [
        "Sorts nodes by degree",
        "Aggregates neighbor information to update each node's representation",
        "Finds shortest paths",
        "Detects communities",
      ],
      ans: 1,
      exp: "GNNs use message passing: each node collects representations from its neighbors, aggregates them (mean, sum, max, attention), and combines with its own representation to produce an updated vector. Stacking layers extends the receptive field.",
    },
    {
      q: "Over-smoothing in GNNs means:",
      opts: [
        "The graph is too large",
        "Node representations become too similar after many layers",
        "The learning rate is too high",
        "Edges are lost during training",
      ],
      ans: 1,
      exp: "After many GNN layers, each node has aggregated from its entire neighborhood, and representations converge. This is over-smoothing — deeper GNNs can perform worse. Skip connections, residual layers, and jumping knowledge mitigate it.",
    },
  ],
  20: [
    {
      q: "Graph RAG differs from vector RAG by:",
      opts: [
        "Using larger embedding models",
        "Retrieving relevant subgraphs instead of flat text chunks",
        "Running on GPUs",
        "Using only SQL databases",
      ],
      ans: 1,
      exp: "Vector RAG retrieves top-k text chunks by embedding similarity, losing relations between chunks. Graph RAG retrieves a relevant subgraph — entities and their relations — preserving structured context that supports multi-hop reasoning.",
    },
    {
      q: "Multi-hop QA is hard for vector RAG because:",
      opts: [
        "Embeddings are too small",
        "The intermediate entity may not appear in the query, so relevant chunks aren't retrieved",
        "Vector databases are slow",
        "LLMs can't read text",
      ],
      ans: 1,
      exp: "In 'Who is the spouse of the director of Inception?', the answer requires first finding the director (Nolan), then his spouse (Emma Thomas). A vector search for the whole question may not retrieve chunks about either intermediate entity. Graph traversal follows the path explicitly.",
    },
  ],
  25: [
    {
      q: "Why is graph compression important?",
      opts: [
        "To make visualizations smaller",
        "The Web graph has trillions of edges — storage and bandwidth are major costs",
        "Compression improves algorithm correctness",
        "Graphs are incompressible",
      ],
      ans: 1,
      exp: "Massive graphs (web, social, biological) have billions to trillions of edges. Storing and moving them is expensive. Succinct data structures and reference-based compression achieve 10–20× reductions while still supporting queries.",
    },
    {
      q: "Elias-Fano encoding is used for:",
      opts: [
        "Succinct storage of monotone integer sequences",
        "Graph visualization",
        "Community detection",
        "Training GNNs",
      ],
      ans: 0,
      exp: "Elias-Fano is a succinct encoding for monotone sequences (like sorted adjacency lists). It stores them in near-optimal space while supporting fast rank/select queries — essential for compressed graph structures.",
    },
  ],
  32: [
    {
      q: "What does an AST represent?",
      opts: [
        "A graph of runtime memory addresses",
        "The parse structure of a program's syntax",
        "A network of connected machines",
        "A random walk over execution states",
      ],
      ans: 1,
      exp: "An AST is a tree-shaped representation of program structure: variables, operators, conditionals, calls, and control constructs. It expresses syntax as a structured graph, not as plain text.",
    },
    {
      q: "Why are ASTs important in toolchains?",
      opts: [
        "They replace the runtime",
        "They are used by linters, refactors, type checkers, and code generators",
        "They are only for visual plotting",
        "They are only used in databases",
      ],
      ans: 1,
      exp: "ASTs capture meaning in a structured way, which is exactly what static analysis and transformations need. Refactoring, type checking, code generation, and linting all rely on AST-level structure.",
    },
  ],
  33: [
    {
      q: "What is a CFG?",
      opts: [
        "A graph of variable definitions",
        "A directed graph of basic blocks and execution paths",
        "A tree of parse nodes",
        "A social graph of code contributors",
      ],
      ans: 1,
      exp: "A Control-Flow Graph (CFG) models how execution moves between basic blocks. It makes branch structure visible and is central to compiler analysis and optimization.",
    },
    {
      q: "What does a CFG help answer?",
      opts: [
        "Which variables are used by which function?",
        "What can happen next during execution?",
        "How to render a syntax tree?",
        "Which nodes are in the same community?",
      ],
      ans: 1,
      exp: "CFGs are built to answer flow questions: reachability, dominance, loops, and branch behavior. This is essential for optimization and safety analysis.",
    },
  ],
  34: [
    {
      q: "A DDG primarily captures:",
      opts: [
        "Execution order only",
        "Value producer-to-consumer flows",
        "The parse tree of an expression",
        "User interface components",
      ],
      ans: 1,
      exp: "A Data Dependence Graph (DDG) connects definitions to their later uses. It lets the compiler reason about data flow and optimization opportunities without changing semantics.",
    },
    {
      q: "Why do DDGs matter for optimization?",
      opts: [
        "They reveal reusable values and dependencies across instructions",
        "They replace type inference",
        "They are only for dead code detection",
        "They ignore variables and only track labels",
      ],
      ans: 0,
      exp: "A DDG makes dependencies explicit, allowing the compiler to reorder or simplify computations while preserving required data flow. It is a key concept in parallelization and optimization.",
    },
  ],
  35: [
    {
      q: "What does SSA guarantee?",
      opts: [
        "Each variable is assigned exactly once before use",
        "Every variable can be mutated freely",
        "All loops are removed",
        "The parser outputs a social graph",
      ],
      ans: 0,
      exp: "In Static Single Assignment form, each variable assignment creates a new version. This removes ambiguity and simplifies def-use analysis and optimization.",
    },
    {
      q: "What is a phi node used for?",
      opts: [
        "A branch in the AST",
        "A merge of values from different control-flow paths",
        "A type cast in the parser",
        "A newline token in the lexer",
      ],
      ans: 1,
      exp: "When a value can arrive from multiple predecessors, a phi node merges them into a single SSA variable. This makes control-flow merges explicit and analyzable.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Adjacency List", def: "Graph representation: each node stores a list of its neighbors. Space-efficient for sparse graphs, fast neighbor iteration.", ch: 2 },
  { term: "Adjacency Matrix", def: "Graph representation: V×V matrix where entry (i,j) indicates an edge. O(1) edge lookup but O(V²) space.", ch: 2 },
  { term: "A*", def: "Shortest-path algorithm that combines Dijkstra with a heuristic guiding search toward the goal. Optimal with an admissible heuristic.", ch: 6 },
  { term: "AST", def: "Abstract Syntax Tree. A structured graph of program syntax where operators, variables, and statements are explicit nodes and edges.", ch: 32 },
  { term: "BFS", def: "Breadth-First Search. Explores level by level using a queue. Finds shortest paths in unweighted graphs.", ch: 5 },
  { term: "Betweenness Centrality", def: "Measures how often a node lies on shortest paths between other nodes. High values indicate bridges or bottlenecks.", ch: 7 },
  { term: "Bipartite Graph", def: "Graph whose nodes can be split into two sets with edges only between sets. Models users↔items, authors↔papers.", ch: 4 },
  { term: "CFG", def: "Control-Flow Graph. Directed graph of basic blocks and branches that captures program execution paths.", ch: 33 },
  { term: "Cypher", def: "Declarative graph query language used by Neo4j. Patterns written as ASCII art: (a)-[:KNOWS]->(b).", ch: 11 },
  { term: "DAG", def: "Directed Acyclic Graph. Enables topological sort and represents dependencies. Used in build systems, ML pipelines.", ch: 4 },
  { term: "DDG", def: "Data Dependence Graph. Shows which definitions flow into which uses, enabling optimization and parallelization.", ch: 34 },
  { term: "DFS", def: "Depth-First Search. Explores as deep as possible before backtracking. Detects cycles, components, and topological order.", ch: 5 },
  { term: "Dijkstra", def: "Shortest-path algorithm for non-negative weights. Greedy expansion with a priority queue. O((V+E) log V).", ch: 6 },
  { term: "Edge List", def: "Graph representation: list of (u, v) pairs. Simple, compact, good for streaming and batch processing.", ch: 2 },
  { term: "GNN", def: "Graph Neural Network. Neural architecture that learns node/edge/graph representations via message passing over graph structure.", ch: 16 },
  { term: "GAT", def: "Graph Attention Network. GNN layer that uses attention to weight neighbor contributions, learning which neighbors matter.", ch: 16 },
  { term: "GCN", def: "Graph Convolutional Network. GNN layer that aggregates neighbor features with normalized mean pooling.", ch: 16 },
  { term: "Graph RAG", def: "Retrieval-Augmented Generation over knowledge graphs. Retrieves relevant subgraphs instead of text chunks, preserving relations.", ch: 20 },
  { term: "Gremlin", def: "Imperative graph traversal language from Apache TinkerPop. Composable steps: g.V().has(...).out(...).", ch: 11 },
  { term: "Hypergraph", def: "Graph where edges can connect more than two nodes. Models co-authorship, chemical reactions.", ch: 1 },
  { term: "Index-Free Adjacency", def: "Native graph storage technique: nodes store direct pointers to neighbors, making edge traversal O(1) instead of index lookup.", ch: 12 },
  { term: "Knowledge Graph", def: "Graph of real-world entities and typed relations, often stored as (subject, predicate, object) triples. Powers search and AI grounding.", ch: 13 },
  { term: "Louvain", def: "Fast community detection algorithm using greedy modularity optimization. O(E log V) time, widely used.", ch: 8 },
  { term: "Message Passing", def: "Core GNN operation: nodes exchange information with neighbors, aggregate, and update their representations.", ch: 16 },
  { term: "Modularity", def: "Metric measuring how well a partition separates a graph into communities. Louvain and Leiden maximize it.", ch: 8 },
  { term: "Node2Vec", def: "Graph embedding method using biased random walks and Skip-gram. Learns vectors where graph proximity = vector proximity.", ch: 15 },
  { term: "Ontology", def: "Formal specification of classes, properties, and inference rules for a knowledge graph. RDFS and OWL are standards.", ch: 14 },
  { term: "Over-smoothing", def: "GNN failure mode: after many layers, all node representations converge. Mitigated by skip connections and residual layers.", ch: 17 },
  { term: "PageRank", def: "Centrality measure based on random-walk stationary distribution. Nodes linked from important nodes rank higher. Powers web search.", ch: 7 },
  { term: "Phi Node", def: "SSA merge operation that combines values from multiple incoming control-flow paths into a single variable version.", ch: 35 },
  { term: "Pregel", def: "Google's vertex-centric distributed graph processing model. Each vertex runs a function, exchanges messages, votes to halt.", ch: 23 },
  { term: "Property Graph", def: "Graph model where nodes and edges have key-value properties. Flexible, schema-optional. Used by Neo4j, Neptune.", ch: 10 },
  { term: "RDF", def: "Resource Description Framework. W3C standard for representing knowledge as subject-predicate-object triples.", ch: 13 },
  { term: "Shortest Path", def: "Minimum-cost path between two nodes. Computed by BFS (unweighted), Dijkstra (non-negative), Bellman-Ford (negative OK).", ch: 6 },
  { term: "SPARQL", def: "Query language for RDF triple stores. Declarative, pattern-based, W3C standard.", ch: 11 },
  { term: "SSA", def: "Static Single Assignment. A compiler form where each variable is assigned exactly once and def-use edges are explicit.", ch: 35 },
  { term: "Succinct Data Structure", def: "Storage that uses near-information-theoretic space while supporting fast queries. Used for compressed graphs.", ch: 25 },
  { term: "Topological Sort", def: "Linear ordering of a DAG's nodes such that every edge goes from earlier to later. Used in build systems, scheduling.", ch: 4 },
  { term: "Triple", def: "Knowledge graph fact: (subject, predicate, object). The atom of RDF and many knowledge graphs.", ch: 13 },
  { term: "Union-Find", def: "Disjoint-set data structure for connectivity queries. Near-constant time per operation with path compression + union by rank.", ch: 24 },
  { term: "Vertex-Centric", def: "Programming model for distributed graph processing: think like a vertex, exchange messages with neighbors.", ch: 23 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 5], [0, 10], [0, 13], [0, 16], [0, 20], [0, 23], [0, 29],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [2, 4],
  [3, 4], [3, 5],
  [4, 5], [4, 8], [4, 9],
  [5, 6], [5, 7], [5, 8], [5, 9],
  [6, 7], [6, 8],
  [7, 8], [7, 9],
  [10, 11], [10, 12], [10, 13], [10, 14],
  [11, 12], [11, 12],
  [13, 14], [13, 15], [13, 20], [13, 27],
  [14, 15], [14, 27],
  [15, 16], [15, 20],
  [16, 17], [16, 18], [16, 19], [16, 27],
  [17, 18], [17, 19],
  [18, 19], [18, 26],
  [19, 23], [19, 29],
  [20, 21], [20, 22], [20, 26], [20, 27],
  [21, 22],
  [22, 26], [22, 28],
  [23, 24], [23, 25], [23, 29],
  [24, 25],
  [26, 27], [26, 28],
  [27, 28], [27, 29],
  [28, 29],
  [29, 30], [29, 31],
  [30, 31],
  [0, 32], [20, 32], [32, 33], [33, 34], [34, 35],
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
    { l: "🌍 Raw Entities & Relations", d: "People, places, products, events", c: "#60A5FA" },
    { l: "🔵 Nodes & Edges", d: "Vertices and edges — the math primitives", c: "#818CF8" },
    { l: "🗄️ Graph Storage", d: "Adjacency lists, property graphs, RDF triples", c: "#34D399" },
    { l: "🧭 Graph Algorithms", d: "Traversal, shortest paths, centrality, communities", c: "#2DD4BF" },
    { l: "🧠 Graph Neural Networks", d: "Learning representations from structure", c: "#FBBF24" },
    { l: "🔍 Graph RAG", d: "Retrieval-augmented generation over knowledge graphs", c: "#FB923C" },
    { l: "🤖 Graph-Native AI", d: "Agents reasoning over relational knowledge", c: "#F87171" },
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

function GraphBasicsDemo() {
  const [directed, setDirected] = useState(false);
  const nodes = [
    { id: "A", x: 100, y: 60 },
    { id: "B", x: 240, y: 60 },
    { id: "C", x: 170, y: 170 },
    { id: "D", x: 100, y: 260 },
    { id: "E", x: 240, y: 260 },
  ];
  const edges = [
    ["A", "B"], ["A", "C"], ["B", "C"],
    ["C", "D"], ["C", "E"], ["D", "E"],
  ];
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button onClick={() => setDirected(!directed)} style={{
          padding: "6px 16px", borderRadius: 20, border: `1px solid ${T.accent}`,
          background: directed ? `${T.accent}22` : "transparent", color: T.accent,
          cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>
          {directed ? "Directed →" : "Undirected —"}
        </button>
      </div>
      <svg width="340" height="320" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          return (
            <g key={i}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={T.border} strokeWidth={2} />
              {directed && (
                <polygon points={`${nb.x},${nb.y} ${nb.x - 12 * (nb.x - na.x) / Math.hypot(nb.x - na.x, nb.y - na.y)},${nb.y - 12 * (nb.y - na.y) / Math.hypot(nb.x - na.x, nb.y - na.y)} ${nb.x - 12 * (nb.y - na.y) / Math.hypot(nb.x - na.x, nb.y - na.y)},${nb.y + 12 * (nb.x - na.x) / Math.hypot(nb.x - na.x, nb.y - na.y)}`} fill={T.accent} />
              )}
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={20} fill={T.surface} stroke={T.accent} strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={T.text} fontSize="14" fontWeight="700">{n.id}</text>
          </g>
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {directed
          ? "Directed graph: each edge has a source and target. Traversal can only follow the arrows."
          : "Undirected graph: edges are symmetric. A—B means you can go A→B and B→A."}
      </div>
    </div>
  );
}

function TraversalDemo() {
  const nodes = [
    { id: "A", x: 80, y: 70 },
    { id: "B", x: 200, y: 50 },
    { id: "C", x: 300, y: 100 },
    { id: "D", x: 170, y: 160 },
    { id: "E", x: 280, y: 210 },
    { id: "F", x: 80, y: 230 },
  ];
  const edges = [
    ["A", "B"], ["A", "D"], ["B", "C"], ["B", "D"],
    ["C", "E"], ["D", "E"], ["D", "F"],
  ];
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const runBFS = () => {
    const order = ["A", "B", "D", "C", "F", "E"];
    setVisited([]); setCurrent(null);
    let i = 0;
    const t = setInterval(() => {
      if (i >= order.length) { clearInterval(t); return; }
      setCurrent(order[i]);
      setVisited((v) => [...v, order[i]]);
      i++;
    }, 500);
  };
  const runDFS = () => {
    const order = ["A", "B", "C", "E", "D", "F"];
    setVisited([]); setCurrent(null);
    let i = 0;
    const t = setInterval(() => {
      if (i >= order.length) { clearInterval(t); return; }
      setCurrent(order[i]);
      setVisited((v) => [...v, order[i]]);
      i++;
    }, 500);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={runBFS} style={{
          padding: "6px 16px", borderRadius: 20, background: T.accent, color: "#000",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>▶ Run BFS</button>
        <button onClick={runDFS} style={{
          padding: "6px 16px", borderRadius: 20, background: T.purple, color: "#000",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>▶ Run DFS</button>
      </div>
      <svg width="380" height="280" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={T.border} strokeWidth={2} />;
        })}
        {nodes.map((n) => {
          const isVisited = visited.includes(n.id);
          const isCurrent = current === n.id;
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={22}
                fill={isCurrent ? T.accent : isVisited ? `${T.green}44` : T.surface}
                stroke={isCurrent ? T.accent : isVisited ? T.green : T.border}
                strokeWidth={2} />
              <text x={n.x} y={n.y + 5} textAnchor="middle"
                fill={isCurrent ? "#000" : T.text} fontSize="14" fontWeight="700">{n.id}</text>
            </g>
          );
        })}
      </svg>
      {visited.length > 0 && (
        <div style={{ marginTop: 10, color: T.muted, fontSize: 12 }}>
          Visit order: <strong style={{ color: T.accent }}>{visited.join(" → ")}</strong>
        </div>
      )}
    </div>
  );
}

function ShortestPathDemo() {
  const nodes = [
    { id: "A", x: 60, y: 120 },
    { id: "B", x: 180, y: 50 },
    { id: "C", x: 180, y: 190 },
    { id: "D", x: 300, y: 120 },
    { id: "E", x: 420, y: 60 },
    { id: "F", x: 420, y: 180 },
  ];
  const edges = [
    ["A", "B", 4], ["A", "C", 2],
    ["B", "D", 5], ["B", "E", 10],
    ["C", "D", 8], ["C", "F", 12],
    ["D", "E", 3], ["D", "F", 7],
    ["E", "F", 2],
  ];
  const [dist, setDist] = useState<Record<string, number>>({});
  const [path, setPath] = useState<string[]>([]);
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const runDijkstra = () => {
    const d: Record<string, number> = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity };
    const prev: Record<string, string | undefined> = {};
    const unvisited = new Set(Object.keys(d));
    while (unvisited.size > 0) {
      let u: string | null = null;
      for (const n of unvisited) if (u === null || d[n] < d[u]) u = n;
      if (u === null || d[u] === Infinity) break;
      unvisited.delete(u);
      for (const [a, b, w] of edges) {
        const v = a === u ? b : b === u ? a : null;
        if (v && unvisited.has(v) && d[u] + w < d[v]) {
          d[v] = d[u] + w; prev[v] = u;
        }
      }
    }
    setDist(d);
    const p: string[] = []; let cur = "F";
    while (cur) { p.unshift(cur); cur = prev[cur]; }
    setPath(p);
  };
  return (
    <div>
      <button onClick={runDijkstra} style={{
        padding: "6px 16px", borderRadius: 20, background: T.accent, color: "#000",
        border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, marginBottom: 12,
      }}>▶ Run Dijkstra (A → F)</button>
      <svg width="500" height="250" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b, w], i) => {
          const na = nMap[a], nb = nMap[b];
          const inPath = path.includes(a) && path.includes(b) &&
            Math.abs(path.indexOf(a) - path.indexOf(b)) === 1;
          return (
            <g key={i}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={inPath ? T.accent : T.border} strokeWidth={inPath ? 3 : 1.5} />
              <rect x={(na.x + nb.x) / 2 - 10} y={(na.y + nb.y) / 2 - 8} width={20} height={16}
                rx={3} fill={T.surface} stroke={inPath ? T.accent : T.border} strokeWidth={1} />
              <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 + 4}
                textAnchor="middle" fill={inPath ? T.accent : T.muted} fontSize="10" fontWeight="600">{w}</text>
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={22}
              fill={path.includes(n.id) ? `${T.accent}33` : T.surface}
              stroke={path.includes(n.id) ? T.accent : T.border} strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={T.text} fontSize="14" fontWeight="700">{n.id}</text>
            {dist[n.id] !== undefined && (
              <text x={n.x} y={n.y - 30} textAnchor="middle" fill={T.green} fontSize="10" fontWeight="600">
                {dist[n.id] === Infinity ? "∞" : dist[n.id]}
              </text>
            )}
          </g>
        ))}
      </svg>
      {path.length > 0 && (
        <div style={{ marginTop: 10, color: T.muted, fontSize: 12 }}>
          Shortest path: <strong style={{ color: T.accent }}>{path.join(" → ")}</strong> = {dist["F"]}
        </div>
      )}
    </div>
  );
}

function CentralityDemo() {
  const nodes = [
    { id: "A", x: 60, y: 130 }, { id: "B", x: 170, y: 50 },
    { id: "C", x: 170, y: 210 }, { id: "D", x: 280, y: 130 },
    { id: "E", x: 390, y: 50 }, { id: "F", x: 390, y: 210 },
    { id: "G", x: 480, y: 130 },
  ];
  const edges = [
    ["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"],
    ["D", "E"], ["D", "F"], ["E", "G"], ["F", "G"],
  ];
  const degree = { A: 2, B: 2, C: 2, D: 4, E: 2, F: 2, G: 2 };
  const betweenness = { A: 0, B: 0.5, C: 0.5, D: 1.0, E: 0.5, F: 0.5, G: 0 };
  const [metric, setMetric] = useState("degree");
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const vals = metric === "degree" ? degree : betweenness;
  const maxV = Math.max(...Object.values(vals));
  const colorFor = (v) => {
    const t = v / maxV;
    const r = Math.round(34 + (239 - 34) * t);
    const g = Math.round(211 + (68 - 211) * t);
    return `rgb(${r},${g},238)`;
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["degree", "betweenness"].map((m) => (
          <button key={m} onClick={() => setMetric(m)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${metric === m ? T.accent : T.border}`,
            background: metric === m ? `${T.accent}22` : "transparent",
            color: metric === m ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600, textTransform: "capitalize",
          }}>{m}</button>
        ))}
      </div>
      <svg width="540" height="260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={T.border} strokeWidth={2} />;
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={20 + vals[n.id] * 8}
              fill={colorFor(vals[n.id])} opacity={0.8} stroke={T.border} strokeWidth={1.5} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#000" fontSize="13" fontWeight="700">{n.id}</text>
            <text x={n.x} y={n.y + 40} textAnchor="middle" fill={T.muted} fontSize="10">
              {vals[n.id].toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {metric === "degree"
          ? "Degree centrality: nodes with more connections are larger. D has the highest degree (4)."
          : "Betweenness centrality: nodes on more shortest paths are larger. D bridges the two halves of the network."}
      </div>
    </div>
  );
}

function CommunityDemo() {
  const nodes = [
    { id: 1, x: 100, y: 80, c: 0 }, { id: 2, x: 160, y: 50, c: 0 },
    { id: 3, x: 140, y: 130, c: 0 }, { id: 4, x: 60, y: 140, c: 0 },
    { id: 5, x: 300, y: 80, c: 1 }, { id: 6, x: 360, y: 50, c: 1 },
    { id: 7, x: 340, y: 130, c: 1 }, { id: 8, x: 260, y: 140, c: 1 },
    { id: 9, x: 200, y: 220, c: 2 }, { id: 10, x: 260, y: 220, c: 2 },
    { id: 11, x: 230, y: 270, c: 2 },
  ];
  const edges = [
    [1, 2], [1, 3], [1, 4], [2, 3], [3, 4],
    [5, 6], [5, 7], [5, 8], [6, 7], [7, 8],
    [9, 10], [9, 11], [10, 11],
    [3, 9], [7, 10], [1, 5],
  ];
  const colors = ["#818CF8", "#34D399", "#FBBF24"];
  const [show, setShow] = useState(false);
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div>
      <button onClick={() => setShow(!show)} style={{
        padding: "6px 16px", borderRadius: 20, background: T.accent, color: "#000",
        border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, marginBottom: 12,
      }}>{show ? "Hide" : "Detect"} Communities</button>
      <svg width="440" height="320" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          const cross = na.c !== nb.c;
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={show && cross ? T.red : T.border}
              strokeWidth={show && cross ? 2 : 1.5} strokeDasharray={show && cross ? "4,4" : "0"} />
          );
        })}
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={18}
            fill={show ? `${colors[n.c]}44` : T.surface}
            stroke={show ? colors[n.c] : T.border} strokeWidth={2} />
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {show
          ? "Louvain detected 3 communities (colored). Dashed red lines are cross-community edges — sparse connections between dense clusters."
          : "Click 'Detect Communities' to run Louvain modularity optimization."}
      </div>
    </div>
  );
}

function PropertyGraphDemo() {
  const [sel, setSel] = useState(null);
  const nodes = [
    { id: "alice", label: "Alice", type: "Person", x: 100, y: 80, props: { name: "Alice", age: 30 } },
    { id: "bob", label: "Bob", type: "Person", x: 300, y: 80, props: { name: "Bob", age: 32 } },
    { id: "acme", label: "Acme", type: "Company", x: 200, y: 200, props: { name: "Acme", founded: 2010 } },
  ];
  const edges = [
    { from: "alice", to: "bob", label: "KNOWS", props: { since: 2019 } },
    { from: "alice", to: "acme", label: "WORKS_AT", props: { role: "Engineer" } },
    { from: "bob", to: "acme", label: "WORKS_AT", props: { role: "Designer" } },
  ];
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>Click a node or edge to inspect its properties</p>
      <svg width="400" height="280" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map((e, i) => {
          const na = nMap[e.from], nb = nMap[e.to];
          const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
          return (
            <g key={i} onClick={() => setSel({ kind: "edge", ...e })} style={{ cursor: "pointer" }}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={T.border} strokeWidth={2} />
              <text x={mx} y={my - 4} textAnchor="middle" fill={T.accent} fontSize="10" fontWeight="600">{e.label}</text>
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} onClick={() => setSel({ kind: "node", ...n })} style={{ cursor: "pointer" }}>
            <circle cx={n.x} cy={n.y} r={24}
              fill={sel?.id === n.id ? `${T.accent}33` : T.surface}
              stroke={T.accent} strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={T.text} fontSize="12" fontWeight="700">{n.label}</text>
            <text x={n.x} y={n.y + 42} textAnchor="middle" fill={T.muted} fontSize="10">{n.type}</text>
          </g>
        ))}
      </svg>
      {sel && (
        <div style={{
          marginTop: 12, padding: "12px 16px", borderRadius: 10,
          background: T.surface, border: `1px solid ${sel.kind === "node" ? T.accent : T.green}`,
        }}>
          <div style={{ color: sel.kind === "node" ? T.accent : T.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>
            {sel.kind === "node" ? `Node: ${sel.label} (${sel.type})` : `Edge: ${sel.label}`}
          </div>
          {Object.entries(sel.props || {}).map(([k, v]) => (
            <div key={k} style={{ color: T.subtle, fontSize: 12 }}>
              <span style={{ color: T.muted }}>{k}:</span> {String(v)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CypherDemo() {
  const [query, setQuery] = useState("MATCH (a:Person)-[:KNOWS]->(b:Person)\nWHERE a.name = 'Alice'\nRETURN b.name");
  const [result, setResult] = useState(null);
  const run = () => {
    if (query.includes("KNOWS") && query.includes("Alice")) {
      setResult([{ "b.name": "Bob" }]);
    } else if (query.includes("WORKS_AT")) {
      setResult([{ "c.name": "Acme" }, { "c.name": "Acme" }]);
    } else {
      setResult([{ "result": "No matching pattern found" }]);
    }
  };
  return (
    <div>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} style={{
        width: "100%", minHeight: 80, background: "#020812", border: `1px solid ${T.border}`,
        borderRadius: 10, padding: "12px 14px", color: "#7DD3FC", fontSize: 13,
        fontFamily: "'JetBrains Mono','Fira Code',monospace", lineHeight: 1.6,
        outline: "none", resize: "vertical", boxSizing: "border-box",
      }} />
      <button onClick={run} style={{
        marginTop: 8, padding: "6px 18px", borderRadius: 20, background: T.accent,
        color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
      }}>▶ Run Query</button>
      {result && (
        <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
          <div style={{ color: T.muted, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>RESULT</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>{Object.keys(result[0]).map((k) => (
                <th key={k} style={{ textAlign: "left", padding: "6px 10px", color: T.accent, borderBottom: `1px solid ${T.border}` }}>{k}</th>
              ))}</tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((v, j) => (
                    <td key={j} style={{ padding: "6px 10px", color: T.text, borderBottom: `1px solid ${T.border}44` }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function KnowledgeGraphDemo() {
  const triples = [
    { s: "Einstein", p: "born_in", o: "Ulm" },
    { s: "Einstein", p: "won", o: "Nobel_Prize" },
    { s: "Einstein", p: "known_for", o: "Relativity" },
    { s: "Nobel_Prize", p: "part_of", o: "Nobel_Prizes" },
    { s: "Relativity", p: "proposed_by", o: "Einstein" },
    { s: "Ulm", p: "located_in", o: "Germany" },
  ];
  const [sel, setSel] = useState("Einstein");
  const related = triples.filter((t) => t.s === sel || t.o === sel);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {["Einstein", "Nobel_Prize", "Relativity", "Ulm"].map((e) => (
          <button key={e} onClick={() => setSel(e)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${sel === e ? T.accent : T.border}`,
            background: sel === e ? `${T.accent}22` : "transparent",
            color: sel === e ? T.accent : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{e}</button>
        ))}
      </div>
      <div style={{ background: "#020812", borderRadius: 10, border: `1px solid ${T.border}`, padding: "14px 16px" }}>
        {related.map((t, i) => (
          <div key={i} style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 13, lineHeight: 2, color: "#7DD3FC" }}>
            <span style={{ color: t.s === sel ? T.accent : T.blue }}>({t.s}</span>
            <span style={{ color: T.amber }}> {t.p} </span>
            <span style={{ color: t.o === sel ? T.accent : T.green }}>{t.o})</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Click an entity to see all triples where it appears as subject or object. This is the core of knowledge graph traversal.
      </div>
    </div>
  );
}

function EmbeddingsDemo() {
  const nodes = [
    { id: "A", x: 120, y: 80, vec: [0.9, 0.2], c: "#34D399" },
    { id: "B", x: 160, y: 110, vec: [0.85, 0.25], c: "#34D399" },
    { id: "C", x: 90, y: 130, vec: [0.88, 0.15], c: "#34D399" },
    { id: "D", x: 300, y: 70, vec: [-0.2, 0.9], c: "#F87171" },
    { id: "E", x: 340, y: 100, vec: [-0.15, 0.88], c: "#F87171" },
    { id: "F", x: 250, y: 200, vec: [0.3, -0.4], c: "#A78BFA" },
    { id: "G", x: 290, y: 220, vec: [0.28, -0.38], c: "#A78BFA" },
  ];
  const [hov, setHov] = useState(null);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Node2Vec projects graph structure into 2D space — graph neighbors become vector neighbors
      </p>
      <svg width="420" height="280" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={220} y1={0} x2={220} y2={280} stroke={T.border} strokeWidth={0.5} strokeDasharray="4,4" />
        <line x1={0} y1={140} x2={420} y2={140} stroke={T.border} strokeWidth={0.5} strokeDasharray="4,4" />
        {hov && nodes.filter((n) => n.id !== hov.id).map((n) => {
          const d = Math.hypot(n.vec[0] - hov.vec[0], n.vec[1] - hov.vec[1]);
          return (
            <line key={n.id} x1={hov.x} y1={hov.y} x2={n.x} y2={n.y}
              stroke={d < 0.3 ? T.green : d < 0.6 ? T.amber : T.red}
              strokeWidth={1.5} opacity={0.4} strokeDasharray="3,3" />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
            <circle cx={n.x} cy={n.y} r={hov?.id === n.id ? 12 : 8}
              fill={n.c} opacity={hov && hov.id !== n.id ? 0.5 : 1} />
            <text x={n.x} y={n.y - 16} textAnchor="middle" fill={T.text} fontSize="12" fontWeight="600">{n.id}</text>
          </g>
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {hov
          ? `From ${hov.id}: green = close in embedding space (structurally similar), amber = moderate, red = far.`
          : "Hover a node to see embedding-space distances to others. Nodes that are close in the graph should be close here."}
      </div>
    </div>
  );
}

function GNNDemo() {
  const [layer, setLayer] = useState(0);
  const nodes = [
    { id: "A", x: 200, y: 60 },
    { id: "B", x: 100, y: 160 },
    { id: "C", x: 300, y: 160 },
    { id: "D", x: 60, y: 260 },
    { id: "E", x: 200, y: 260 },
    { id: "F", x: 340, y: 260 },
  ];
  const edges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "E"], ["C", "F"]];
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const neighbors = { A: ["B", "C"], B: ["A", "D", "E"], C: ["A", "E", "F"], D: ["B"], E: ["B", "C"], F: ["C"] };
  const activeNodes = (() => {
    if (layer === 0) return ["A"];
    if (layer === 1) return ["A", ...neighbors["A"]];
    if (layer === 2) return ["A", ...neighbors["A"], ...neighbors["B"], ...neighbors["C"]];
    return nodes.map((n) => n.id);
  })();
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[0, 1, 2, 3].map((l) => (
          <button key={l} onClick={() => setLayer(l)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${layer === l ? T.accent : T.border}`,
            background: layer === l ? `${T.accent}22` : "transparent",
            color: layer === l ? T.accent : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>Layer {l}</button>
        ))}
      </div>
      <svg width="420" height="320" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          const active = activeNodes.includes(a) && activeNodes.includes(b);
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={active ? T.accent : T.border} strokeWidth={active ? 2 : 1.5} />;
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={22}
              fill={activeNodes.includes(n.id) ? `${T.accent}44` : T.surface}
              stroke={activeNodes.includes(n.id) ? T.accent : T.border} strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={T.text} fontSize="14" fontWeight="700">{n.id}</text>
          </g>
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {layer === 0 && "Layer 0: only A's own features are visible."}
        {layer === 1 && "Layer 1: A aggregates from its direct neighbors B and C."}
        {layer === 2 && "Layer 2: information has propagated 2 hops — D, E, F now influence A."}
        {layer === 3 && "Layer 3: the entire graph is within A's receptive field."}
      </div>
    </div>
  );
}

function GraphRAGDemo() {
  const [step, setStep] = useState(-1);
  const steps = [
    { label: "Query", desc: "Who is the spouse of the director of Inception?" },
    { label: "Entity Linking", desc: "Identify 'Inception' → movie entity, 'director' → relation" },
    { label: "Subgraph Retrieval", desc: "Traverse: Inception → directed_by → Nolan → spouse → Emma Thomas" },
    { label: "Serialize", desc: "(Inception, directed_by, Christopher_Nolan)\\n(Christopher_Nolan, spouse, Emma_Thomas)" },
    { label: "LLM Generation", desc: "Answer: Emma Thomas, based on the retrieved subgraph" },
  ];
  return (
    <div>
      <button onClick={() => setStep(step >= steps.length - 1 ? -1 : step + 1)} style={{
        padding: "6px 18px", borderRadius: 20, background: T.accent, color: "#000",
        border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, marginBottom: 16,
      }}>{step < 0 ? "▶ Start Graph RAG" : step >= steps.length - 1 ? "↺ Reset" : "Next Step →"}</button>
      {steps.map((s, i) => (
        <div key={i} style={{
          padding: "10px 14px", borderRadius: 8, marginBottom: 6,
          background: step >= i ? `${T.accent}11` : T.elevated,
          border: `1px solid ${step === i ? T.accent : step > i ? `${T.accent}44` : T.border}`,
          opacity: step >= i ? 1 : 0.4, transition: "all .3s",
        }}>
          <div style={{ color: step >= i ? T.accent : T.muted, fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
            {step === i ? "→ " : step > i ? "✓ " : ""}{s.label}
          </div>
          {step >= i && (
            <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{s.desc}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function GraphTransformerDemo() {
  const nodes = [
    { id: "A", x: 180, y: 60 }, { id: "B", x: 90, y: 160 },
    { id: "C", x: 270, y: 160 }, { id: "D", x: 180, y: 260 },
  ];
  const edges = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]];
  const [active, setActive] = useState(null);
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Click a node to see its attention pattern — graph transformers attend to structurally relevant nodes
      </p>
      <svg width="360" height="320" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {edges.map(([a, b], i) => {
          const na = nMap[a], nb = nMap[b];
          const hi = active && (a === active || b === active);
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={hi ? T.accent : T.border} strokeWidth={hi ? 3 : 1.5} />;
        })}
        {active && nodes.filter((n) => n.id !== active).map((n) => {
          const na = nMap[active];
          const structural = edges.some(([a, b]) =>
            (a === active && b === n.id) || (b === active && a === n.id));
          if (structural) return null;
          return <line key={`attn-${n.id}`} x1={na.x} y1={na.y} x2={n.x} y2={n.y}
            stroke={T.purple} strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />;
        })}
        {nodes.map((n) => (
          <g key={n.id} onClick={() => setActive(active === n.id ? null : n.id)} style={{ cursor: "pointer" }}>
            <circle cx={n.x} cy={n.y} r={22}
              fill={active === n.id ? `${T.accent}33` : T.surface}
              stroke={active === n.id ? T.accent : T.border} strokeWidth={2} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={T.text} fontSize="14" fontWeight="700">{n.id}</text>
          </g>
        ))}
      </svg>
      {active && (
        <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
          Solid lines: direct graph edges. Dashed purple lines: global attention connections learned by the transformer. Unlike GNNs, graph transformers can attend to distant nodes based on structural encodings.
        </div>
      )}
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
    `How does ${ch.title} connect to real graph systems?`,
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
          system: `You are an expert graph engineering tutor helping someone learn graph theory, graph databases, GNNs, and graph AI. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
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
      <div style={{ fontSize: 32, marginBottom: 12 }}>🕸️</div>
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
            borderRadius: "8px 0 0 8px", background: `hsl(${200 + i * 25},70%,60%)`,
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
    graphbasics: GraphBasicsDemo,
    traversal: TraversalDemo,
    shortestpath: ShortestPathDemo,
    centrality: CentralityDemo,
    community: CommunityDemo,
    propertygraph: PropertyGraphDemo,
    cypher: CypherDemo,
    knowledgegraph: KnowledgeGraphDemo,
    embeddings: EmbeddingsDemo,
    gnn: GNNDemo,
    graphrag: GraphRAGDemo,
    graphtransformer: GraphTransformerDemo,
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
        All 32 chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{
          background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`,
        }}>
          <defs>
            <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bg2)" rx="14" />
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
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5]));
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
          <span style={{ fontSize: 18 }}>🕸️</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Graph Engineering</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>10 Parts · 32 Chapters</div>
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
    { label: "Beginner Path", color: T.blue, desc: "Ch 0 → Foundations → Core algorithms", chs: [0, 1, 2, 3, 4, 5, 6, 7] },
    { label: "Engineer Track", color: T.green, desc: "Storage, query, production graph systems", chs: [10, 11, 12, 23, 24, 25, 29, 30] },
    { label: "AI/ML Route", color: T.purple, desc: "GNNs, embeddings, graph RAG, graph AI", chs: [15, 16, 17, 18, 19, 20, 21, 22, 26, 27, 28] },
    { label: "Strategy View", color: T.amber, desc: "Trade-offs, frontier, infrastructure", chs: [29, 30, 31] },
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
        }}>Graph Engineering</h1>
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          10 Parts · 32 Chapters · From Nodes and Edges to Graph-Native AI
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
          { n: 10, label: "Parts" },
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