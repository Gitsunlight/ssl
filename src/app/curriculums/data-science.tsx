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
  { id: 1, label: "Mathematical Foundations", icon: "∑", chs: [1, 2, 3, 4] },
  { id: 2, label: "Probability & Inference", icon: "🎲", chs: [5, 6, 7, 8] },
  { id: 3, label: "Data Wrangling", icon: "🧹", chs: [9, 10, 11, 12] },
  { id: 4, label: "Exploratory Analysis", icon: "🔍", chs: [13, 14, 15] },
  { id: 5, label: "Classical Machine Learning", icon: "📈", chs: [16, 17, 18, 19, 20, 21] },
  { id: 6, label: "Model Evaluation & Selection", icon: "🎯", chs: [22, 23, 24] },
  { id: 7, label: "Deep Learning", icon: "🧠", chs: [25, 26, 27, 28] },
  { id: 8, label: "Causal Inference", icon: "🔗", chs: [29, 30, 31] },
  { id: 9, label: "MLOps & Production", icon: "⚙️", chs: [32, 33, 34] },
  { id: 10, label: "Ethics & Frontier", icon: "🚀", chs: [35, 36, 37] },
];

// ── Chapters ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    n: 0,
    part: 0,
    title: "The Map of Data Science",
    tagline: "From raw numbers to decisions — the full stack",
    insight:
      "Data science is not a single skill. It's the intersection of statistics, engineering, and domain judgment.",
    demo: "stack",
    content: [
      {
        type: "p",
        text: "Data science is the discipline of extracting insight and building predictive systems from data. It spans mathematics, statistics, engineering, and domain expertise — with a distinct stack at every layer.",
      },
      {
        type: "stack",
        rows: [
          ["🌍 Raw Data", "Logs, sensors, transactions, text, images, events"],
          ["🧹 Wrangling", "Cleaning, joining, imputing, transforming"],
          ["🔍 Exploration", "Distributions, correlations, outliers, visualizations"],
          ["📊 Statistics", "Estimation, hypothesis testing, uncertainty"],
          ["🤖 Machine Learning", "Predictive models that generalize"],
          ["🎯 Evaluation", "Cross-validation, metrics, calibration"],
          ["🚀 Deployment", "Serving, monitoring, retraining, MLOps"],
          ["🏢 Decisions", "Insight that changes what an organization does"],
        ],
      },
      {
        type: "insight",
        text: "Most real data science work is in the top and bottom layers: wrangling data and translating insight into decisions. Modeling is often 10–20% of the job.",
      },
    ],
  },
  {
    n: 1,
    part: 1,
    title: "Descriptive Statistics",
    tagline: "Mean, median, variance, quantiles — the vocabulary of data",
    insight:
      "The mean is the most abused statistic in existence. The median tells you what a typical person experiences.",
    demo: "descriptive",
    content: [
      {
        type: "p",
        text: "Descriptive statistics summarize a dataset: central tendency (mean, median, mode), spread (variance, standard deviation, IQR), and shape (skew, kurtosis).",
      },
      {
        type: "table",
        head: ["Statistic", "Definition", "Sensitive To"],
        rows: [
          ["Mean", "Arithmetic average", "Outliers"],
          ["Median", "Middle value", "Robust"],
          ["Mode", "Most frequent", "Categorical data"],
          ["Variance", "Average squared deviation", "Units, outliers"],
          ["Std dev", "√variance", "Units"],
          ["IQR", "Q3 − Q1", "Robust"],
        ],
      },
      {
        type: "insight",
        text: "Income, house prices, and click-through rates are almost always right-skewed. Report medians and quantiles, not means, unless you have a reason.",
      },
    ],
  },
  {
    n: 2,
    part: 1,
    title: "Linear Algebra for Data",
    tagline: "Vectors, matrices, and the geometry behind every model",
    insight:
      "Every model fitting procedure is a search through vector space. Every prediction is a dot product.",
    demo: "linearalgebra",
    content: [
      {
        type: "p",
        text: "Data is almost always stored as a matrix: rows are samples, columns are features. Linear algebra is the language of everything that follows — regression, PCA, deep learning.",
      },
      {
        type: "code",
        text: "X = [[x11, x12, ..., x1p],\n     [x21, x22, ..., x2p],\n     ...\n     [xn1, xn2, ..., xnp]]\n\n  n = samples, p = features\n\n  Prediction: ŷ = X · w + b",
      },
      {
        type: "table",
        head: ["Concept", "Use in Data Science"],
        rows: [
          ["Dot product", "Similarity, prediction, attention"],
          ["Matrix multiply", "Layer computation, projections"],
          ["Eigenvalues/vectors", "PCA, spectral clustering"],
          ["Inverse / pseudo-inverse", "Closed-form regression"],
          ["Norm", "Regularization (L1, L2)"],
        ],
      },
    ],
  },
  {
    n: 3,
    part: 1,
    title: "Calculus & Optimization",
    tagline: "Derivatives, gradients, and how models actually learn",
    insight:
      "Training a model is just optimization: find the parameters that minimize a loss function.",
    content: [
      {
        type: "p",
        text: "Calculus gives us the tools to optimize. The derivative tells us the direction and rate of change. The gradient generalizes this to many parameters. Gradient descent follows the gradient downhill.",
      },
      {
        type: "code",
        text: "w ← w − η · ∇L(w)\n\n  η = learning rate\n  ∇L(w) = gradient of loss w.r.t. weights\n\n  Repeat until convergence.",
      },
      {
        type: "table",
        head: ["Optimizer", "Idea", "Used For"],
        rows: [
          ["SGD", "Simple step downhill", "Baseline"],
          ["Momentum", "Remember direction", "Faster, smoother"],
          ["Adam", "Adaptive per-parameter", "Default for deep learning"],
          ["L-BFGS", "Quasi-Newton", "Small classical models"],
        ],
      },
    ],
  },
  {
    n: 4,
    part: 1,
    title: "Information Theory",
    tagline: "Entropy, KL divergence, and mutual information",
    insight:
      "Entropy is the average surprise. Every loss function in ML is secretly an information-theoretic measure.",
    content: [
      {
        type: "p",
        text: "Information theory quantifies uncertainty and information. Shannon entropy measures average surprise; KL divergence measures how different two distributions are; mutual information measures dependence.",
      },
      {
        type: "code",
        text: "H(X) = −Σ p(x) log p(x)\n\nKL(P‖Q) = Σ p(x) log(p(x)/q(x))\n\nI(X;Y) = H(X) − H(X|Y)",
      },
      {
        type: "table",
        head: ["Concept", "Use in Data Science"],
        rows: [
          ["Entropy", "Decision tree splitting, uncertainty"],
          ["Cross-entropy", "Classification loss"],
          ["KL divergence", "Variational inference, distillation"],
          ["Mutual information", "Feature selection, dependency"],
        ],
      },
    ],
  },
  {
    n: 5,
    part: 2,
    title: "Probability Foundations",
    tagline: "Random variables, distributions, and the laws of chance",
    insight:
      "Every dataset is a sample. Every model is a probability statement. Probability is the grammar of uncertainty.",
    demo: "distributions",
    content: [
      {
        type: "p",
        text: "Probability models uncertainty. Random variables map outcomes to numbers; distributions describe how those numbers behave. The law of large numbers and the central limit theorem are the two pillars of statistical inference.",
      },
      {
        type: "table",
        head: ["Distribution", "Domain", "Example Use"],
        rows: [
          ["Bernoulli", "0/1", "Click, conversion"],
          ["Binomial", "Count of successes", "A/B test conversions"],
          ["Poisson", "Counts", "Events per hour"],
          ["Normal", "Real", "Measurement noise"],
          ["Exponential", "Positive real", "Time between events"],
          ["Beta", "Probability", "Prior over rates"],
        ],
      },
      {
        type: "insight",
        text: "Most natural phenomena are approximately normal in the aggregate (CLT) but almost never normal in the tail. Tail behavior is where risk lives.",
      },
    ],
  },
  {
    n: 6,
    part: 2,
    title: "Statistical Inference",
    tagline: "Estimators, confidence intervals, and hypothesis tests",
    insight:
      "A confidence interval is a statement about the procedure, not about the parameter.",
    demo: "inference",
    content: [
      {
        type: "p",
        text: "Inference goes from sample to population: estimate parameters, quantify uncertainty, and test hypotheses. The bootstrap and Bayesian methods offer alternative frameworks when classical assumptions fail.",
      },
      {
        type: "table",
        head: ["Concept", "Definition", "Pitfall"],
        rows: [
          ["Estimator", "Function of data → parameter", "Bias vs variance"],
          ["Confidence interval", "Range with coverage probability", "Not P(param in CI)"],
          ["p-value", "P(data | H₀)", "Not P(H₀ | data)"],
          ["Power", "P(reject | H₁ true)", "Depends on effect size"],
          ["Bootstrap", "Resample with replacement", "Fails for extremes"],
        ],
      },
      {
        type: "insight",
        text: "p-values answer: 'How surprising is this data if nothing is going on?' They do not answer 'How likely is my hypothesis?' That requires Bayes.",
      },
    ],
  },
  {
    n: 7,
    part: 2,
    title: "Bayesian Thinking",
    tagline: "Priors, likelihoods, and the posterior — updating beliefs",
    insight:
      "Bayesian inference is the only framework that tells you what to believe, not just what to reject.",
    demo: "bayesian",
    content: [
      {
        type: "p",
        text: "Bayesian inference starts with a prior belief, updates it with data via the likelihood, and produces a posterior. It gives you a full distribution over parameters, not a point estimate.",
      },
      {
        type: "code",
        text: "P(θ | data) ∝ P(data | θ) · P(θ)\n\n  posterior ∝ likelihood × prior\n\n  With conjugate priors, closed-form updates:\n  Beta posterior: α' = α + successes\n                  β' = β + failures",
      },
      {
        type: "table",
        head: ["Framework", "Question Answered"],
        rows: [
          ["Frequentist", "If H₀ true, how likely is this data?"],
          ["Bayesian", "Given this data, what should I believe?"],
          ["Decision theory", "What action minimizes expected loss?"],
        ],
      },
    ],
  },
  {
    n: 8,
    part: 2,
    title: "A/B Testing",
    tagline: "Causal inference in the wild — the workhorse of tech",
    insight:
      "A/B testing is the industrial application of the randomized controlled trial.",
    demo: "abtest",
    content: [
      {
        type: "p",
        text: "A/B testing randomizes users to treatment and control, then compares outcomes. Done right, it isolates causal effects. Done wrong, it produces expensive false positives.",
      },
      {
        type: "table",
        head: ["Pitfall", "Consequence", "Fix"],
        rows: [
          ["Peeking", "Inflated false positives", "Fixed horizon or sequential test"],
          ["Multiple metrics", "p-hacking", "Pre-register + correction"],
          ["SRM (sample ratio mismatch)", "Broken randomization", "Monitor + halt"],
          ["Novelty effects", "Transient lift", "Longer horizon"],
          ["Network effects", "Contamination", "Cluster randomization"],
        ],
      },
      {
        type: "code",
        text: "Required n per arm:\n\n  n ≈ 16 σ² / Δ²\n\n  σ = std dev of metric\n  Δ = minimum detectable effect\n\n  Small effects require enormous samples.",
      },
    ],
  },
  {
    n: 9,
    part: 3,
    title: "Data Acquisition & Cleaning",
    tagline: "The 80% of the job nobody advertises",
    insight:
      "Garbage in, garbage out. Great models on dirty data lose to good models on clean data.",
    demo: "cleaning",
    content: [
      {
        type: "p",
        text: "Real data is missing, duplicated, inconsistent, and mislabeled. Data cleaning is not a preprocessing step — it's most of the project.",
      },
      {
        type: "table",
        head: ["Problem", "Common Fix"],
        rows: [
          ["Missing values", "Drop, impute (mean/median/model), or flag"],
          ["Duplicates", "Dedupe by key, fuzzy matching"],
          ["Outliers", "Investigate first; winsorize or transform"],
          ["Inconsistent units", "Standardize"],
          ["Encoding issues", "Normalize unicode, fix case"],
          ["Label noise", "Audit, relabel, robust loss"],
        ],
      },
      {
        type: "insight",
        text: "Always ask: is this missing at random (MAR), missing completely at random (MCAR), or missing not at random (MNAR)? The right imputation depends on the answer.",
      },
    ],
  },
  {
    n: 10,
    part: 3,
    title: "Feature Engineering",
    tagline: "Turning raw columns into signals",
    insight:
      "Good features beat good models. A logistic regression with great features beats a neural net with raw columns.",
    demo: "features",
    content: [
      {
        type: "p",
        text: "Feature engineering creates new inputs from raw data: transformations, interactions, aggregations, encodings, and domain-specific constructions.",
      },
      {
        type: "table",
        head: ["Technique", "Example"],
        rows: [
          ["Log transform", "Income, counts → less skew"],
          ["One-hot encoding", "Categorical → binary columns"],
          ["Target encoding", "Category → mean target (with CV)"],
          ["Binning", "Age → age buckets"],
          ["Interactions", "x₁ × x₂, ratios"],
          ["Time features", "Hour, day-of-week, holidays"],
          ["Aggregations", "User's 30-day average spend"],
          ["Text features", "TF-IDF, embeddings"],
        ],
      },
      {
        type: "insight",
        text: "Target encoding leaks if not done inside cross-validation folds. It's the single most common silent failure in tabular ML.",
      },
    ],
  },
  {
    n: 11,
    part: 3,
    title: "Data Transformation & Scaling",
    tagline: "Standardization, normalization, and why it matters",
    insight:
      "Distance-based and gradient-based models are sensitive to scale. Tree-based models are not.",
    content: [
      {
        type: "p",
        text: "Many algorithms assume features are on comparable scales. Standardization and normalization fix this. The right choice depends on the model and the distribution.",
      },
      {
        type: "table",
        head: ["Transform", "Formula", "When"],
        rows: [
          ["Standardization", "(x − μ)/σ", "Linear models, SVM, NN"],
          ["Min-max", "(x − min)/(max − min)", "Bounded inputs"],
          ["Robust scaling", "(x − median)/IQR", "Outliers present"],
          ["Log", "log(x)", "Right-skewed, positive"],
          ["Box-Cox", "Power transform", "Approximate normality"],
        ],
      },
      {
        type: "insight",
        text: "Fit scalers on training data only. Applying them to the full dataset before splitting is a subtle, common leak.",
      },
    ],
  },
  {
    n: 12,
    part: 3,
    title: "Data Leakage",
    tagline: "The silent killer of real-world ML",
    insight:
      "If a feature wouldn't be available at prediction time, it doesn't belong in training.",
    demo: "leakage",
    content: [
      {
        type: "p",
        text: "Leakage is when training data contains information not available at prediction time. It produces spectacular offline metrics and useless deployed models.",
      },
      {
        type: "table",
        head: ["Type", "Example"],
        rows: [
          ["Target leakage", "Feature = post-outcome info"],
          ["Train-test contamination", "Scaling before split"],
          ["Temporal leakage", "Future data in past training"],
          ["Group leakage", "Same user in train and test"],
          ["Preprocessing leakage", "Imputing with global mean"],
        ],
      },
      {
        type: "insight",
        text: "Always split by time and by group when applicable. Random splits hide leakage and inflate scores.",
      },
    ],
  },
  {
    n: 13,
    part: 4,
    title: "Exploratory Data Analysis",
    tagline: "Look at your data before you model it",
    insight:
      "EDA is where you find the bugs, the surprises, and the actual question.",
    demo: "eda",
    content: [
      {
        type: "p",
        text: "EDA is the systematic investigation of a dataset: distributions, relationships, outliers, missingness patterns, and anomalies. It's how you build intuition before modeling.",
      },
      {
        type: "table",
        head: ["Question", "Tool"],
        rows: [
          ["What is the distribution?", "Histogram, KDE"],
          ["How do variables relate?", "Scatter, correlation, heatmap"],
          ["Any outliers?", "Box plot, z-score, IQR"],
          ["Missingness pattern?", "Missingno matrix"],
          ["Groups differ?", "Grouped box plots, faceting"],
          ["Time pattern?", "Line plots, seasonal decomposition"],
        ],
      },
    ],
  },
  {
    n: 14,
    part: 4,
    title: "Data Visualization",
    tagline: "Communicating insight — grammar of graphics and design",
    insight:
      "A chart's job is not to look impressive — it's to make the comparison obvious.",
    demo: "visualization",
    content: [
      {
        type: "p",
        text: "Visualization is how insight travels. Good charts encode data faithfully and guide the eye; bad charts mislead without lying.",
      },
      {
        type: "table",
        head: ["Chart", "Best For"],
        rows: [
          ["Bar", "Comparing categories"],
          ["Line", "Trends over time"],
          ["Scatter", "Relationship between two numerics"],
          ["Histogram", "Distribution"],
          ["Box/violin", "Distribution by group"],
          ["Heatmap", "Matrix intensity, correlation"],
          ["Sankey", "Flows"],
        ],
      },
      {
        type: "insight",
        text: "Cut the chartjunk. Every pixel should serve the data. Tufte's data-ink ratio still holds.",
      },
    ],
  },
  {
    n: 15,
    part: 4,
    title: "Correlation & Association",
    tagline: "Measuring dependence — and why it isn't causation",
    insight:
      "Correlation is symmetric, unitless, linear, and easily fooled by outliers and confounders.",
    demo: "correlation",
    content: [
      {
        type: "p",
        text: "Correlation measures linear association. It ranges from -1 to 1, is invariant to scale, and says nothing about causation. Spearman and Kendall handle monotone and ordinal relationships.",
      },
      {
        type: "table",
        head: ["Coefficient", "Measures", "Robust To"],
        rows: [
          ["Pearson r", "Linear association", "Nothing"],
          ["Spearman ρ", "Monotone association", "Nonlinear monotone"],
          ["Kendall τ", "Concordance", "Small samples, ties"],
          ["Distance corr", "Any dependence", "Nonlinear"],
          ["Mutual info", "Any dependence", "Nonlinear"],
        ],
      },
      {
        type: "insight",
        text: "Anscombe's quartet: four datasets with identical correlations but wildly different shapes. Always plot.",
      },
    ],
  },
  {
    n: 16,
    part: 5,
    title: "Linear Regression",
    tagline: "The workhorse — simple, interpretable, and surprisingly strong",
    insight:
      "Linear regression is the null hypothesis of machine learning. Beat it before you reach for anything fancier.",
    demo: "linearreg",
    content: [
      {
        type: "p",
        text: "Linear regression fits a linear relationship between features and a continuous target. It's fast, interpretable, and the basis for much of statistics and ML.",
      },
      {
        type: "code",
        text: "ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ\n\n  Closed form:  β = (XᵀX)⁻¹Xᵀy\n\n  Loss:  MSE = (1/n) Σ (yᵢ − ŷᵢ)²",
      },
      {
        type: "table",
        head: ["Assumption", "What Breaks It"],
        rows: [
          ["Linearity", "Nonlinear relationships"],
          ["Independence", "Time series, clustered data"],
          ["Homoscedasticity", "Heteroscedastic errors"],
          ["Normality of residuals", "Inference, not prediction"],
          ["No multicollinearity", "Unstable coefficients"],
        ],
      },
    ],
  },
  {
    n: 17,
    part: 5,
    title: "Logistic Regression",
    tagline: "Classification via the sigmoid — calibrated probabilities",
    insight:
      "Logistic regression is linear regression with a squashing function that makes outputs interpretable as probabilities.",
    demo: "logistic",
    content: [
      {
        type: "p",
        text: "Logistic regression models P(y=1|x) via the sigmoid of a linear combination. It's the default baseline for binary classification.",
      },
      {
        type: "code",
        text: "p = σ(w·x + b) = 1 / (1 + exp(−(w·x + b)))\n\nLoss: binary cross-entropy\n\n  L = −[y log p + (1−y) log(1−p)]",
      },
      {
        type: "table",
        head: ["Property", "Value"],
        rows: [
          ["Output", "Probability in (0,1)"],
          ["Interpretation", "Odds ratios from coefficients"],
          ["Multiclass", "Softmax variant"],
          ["Regularization", "L1, L2, elastic net"],
          ["Extensions", "Ordinal, multinomial"],
        ],
      },
    ],
  },
  {
    n: 18,
    part: 5,
    title: "Regularization",
    tagline: "Bias-variance trade-off in practice — Ridge, Lasso, Elastic Net",
    insight:
      "Regularization is how you tell a model: 'be right, but be simple.'",
    demo: "regularization",
    content: [
      {
        type: "p",
        text: "Regularization adds a penalty for complexity to the loss function, shrinking coefficients and preventing overfitting. L1 zeros out features; L2 shrinks them; elastic net blends both.",
      },
      {
        type: "code",
        text: "Ridge (L2):   L = MSE + λΣβ²\nLasso (L1):   L = MSE + λΣ|β|\nElastic net:  L = MSE + λ₁Σ|β| + λ₂Σβ²",
      },
      {
        type: "table",
        head: ["Method", "Effect", "Use When"],
        rows: [
          ["Ridge", "Shrinks all coefficients", "Many small effects"],
          ["Lasso", "Zeros some coefficients", "Sparse signal"],
          ["Elastic net", "Both", "Correlated features"],
          ["Dropout", "NN regularization", "Deep networks"],
        ],
      },
    ],
  },
  {
    n: 19,
    part: 5,
    title: "Tree-Based Models",
    tagline: "Decision trees, random forests, and gradient boosting",
    insight:
      "On tabular data, gradient-boosted trees still beat deep learning most of the time.",
    demo: "trees",
    content: [
      {
        type: "p",
        text: "Decision trees split data recursively on the feature that best separates outcomes. Ensembles — random forests and gradient boosting — combine many trees to reduce variance and bias.",
      },
      {
        type: "table",
        head: ["Model", "Idea", "Strength"],
        rows: [
          ["Decision tree", "Recursive splits", "Interpretable"],
          ["Random forest", "Bagged decorrelated trees", "Robust default"],
          ["Gradient boosting", "Sequential residual fitting", "State of the art on tabular"],
          ["XGBoost/LightGBM", "Optimized boosting", "Fast, accurate"],
        ],
      },
      {
        type: "code",
        text: "Feature importance (impurity):\n  Σ over splits using feature\n  weighted by samples and impurity decrease\n\nMore robust: permutation importance\nor SHAP values.",
      },
    ],
  },
  {
    n: 20,
    part: 5,
    title: "Support Vector Machines",
    tagline: "Maximum margin classifiers and the kernel trick",
    insight:
      "SVMs find the boundary that maximizes the margin — the distance to the nearest points.",
    content: [
      {
        type: "p",
        text: "SVMs find the hyperplane that best separates classes, with a margin. The kernel trick lets them learn nonlinear boundaries by implicitly mapping to high-dimensional space.",
      },
      {
        type: "code",
        text: "Primal: min ½‖w‖²  s.t. yᵢ(w·xᵢ + b) ≥ 1\n\nKernel: K(xᵢ, xⱼ) = φ(xᵢ)·φ(xⱼ)\n\n  Linear:      xᵢ·xⱼ\n  Polynomial:  (xᵢ·xⱼ + c)^d\n  RBF:         exp(−γ‖xᵢ−xⱼ‖²)",
      },
      {
        type: "table",
        head: ["Kernel", "When"],
        rows: [
          ["Linear", "High-dim sparse data"],
          ["RBF", "Default; smooth boundaries"],
          ["Polynomial", "Interaction features"],
          ["Sigmoid", "Rarely"],
        ],
      },
    ],
  },
  {
    n: 21,
    part: 5,
    title: "Unsupervised Learning",
    tagline: "Clustering, dimensionality reduction, and anomaly detection",
    insight:
      "Unsupervised learning finds structure without labels — the only tool when labels don't exist.",
    demo: "unsupervised",
    content: [
      {
        type: "p",
        text: "Unsupervised methods discover patterns without a target: cluster similar points, reduce dimensions, and flag anomalies.",
      },
      {
        type: "table",
        head: ["Method", "Family", "Use"],
        rows: [
          ["K-means", "Clustering", "Fast, spherical clusters"],
          ["DBSCAN", "Clustering", "Arbitrary shapes, outliers"],
          ["Hierarchical", "Clustering", "Dendrograms"],
          ["PCA", "Dim reduction", "Linear compression"],
          ["t-SNE / UMAP", "Dim reduction", "Visualization"],
          ["Autoencoder", "Dim reduction", "Nonlinear, deep"],
          ["Isolation Forest", "Anomaly", "Outlier detection"],
        ],
      },
      {
        type: "insight",
        text: "K-means assumes clusters are spherical and equal-sized. When they aren't, it fails quietly and confidently.",
      },
    ],
  },
  {
    n: 22,
    part: 6,
    title: "Bias, Variance & the Learning Curve",
    tagline: "Why models fail — underfitting, overfitting, and the trade-off",
    insight:
      "Every model error decomposes into bias, variance, and irreducible noise.",
    demo: "biasvariance",
    content: [
      {
        type: "p",
        text: "Bias is systematic error from wrong assumptions. Variance is sensitivity to training data. The trade-off explains why complex models overfit and simple models underfit.",
      },
      {
        type: "code",
        text: "E[error] = bias² + variance + noise\n\n  bias²     — model too simple\n  variance  — model too complex\n  noise     — irreducible",
      },
      {
        type: "table",
        head: ["Symptom", "Diagnosis", "Fix"],
        rows: [
          ["Train high, test high", "Underfit (bias)", "More capacity, better features"],
          ["Train low, test high", "Overfit (variance)", "More data, regularization"],
          ["Train low, test low", "Good — try harder task", "—"],
          ["Both stuck high", "Noise floor", "Better data, better problem"],
        ],
      },
    ],
  },
  {
    n: 23,
    part: 6,
    title: "Cross-Validation & Model Selection",
    tagline: "Honest estimates of out-of-sample performance",
    insight:
      "Random K-fold is wrong for time series and grouped data. Use the right split.",
    demo: "cv",
    content: [
      {
        type: "p",
        text: "Cross-validation estimates generalization by training and testing on different subsets. The split scheme must match the deployment reality.",
      },
      {
        type: "table",
        head: ["Scheme", "When"],
        rows: [
          ["K-fold", "IID data"],
          ["Stratified K-fold", "Imbalanced classes"],
          ["Time series split", "Temporal data"],
          ["Group K-fold", "Clustered data (same user)"],
          ["Nested CV", "Hyperparameter tuning without leak"],
          ["Leave-one-out", "Very small datasets"],
        ],
      },
      {
        type: "insight",
        text: "Tuning hyperparameters on the same folds you report performance on is a subtle form of leakage. Use nested CV when you report final numbers.",
      },
    ],
  },
  {
    n: 24,
    part: 6,
    title: "Classification Metrics",
    tagline: "Accuracy is almost never the metric you want",
    insight:
      "For rare events, accuracy is a lie: predicting 'no' for everything gets 99% accuracy.",
    demo: "metrics",
    content: [
      {
        type: "p",
        text: "Different problems need different metrics. Accuracy, precision, recall, F1, AUC, log loss, and calibration each tell you something different.",
      },
      {
        type: "table",
        head: ["Metric", "Optimizes For", "Weakness"],
        rows: [
          ["Accuracy", "Overall correctness", "Useless under imbalance"],
          ["Precision", "Few false positives", "Ignores misses"],
          ["Recall", "Few false negatives", "Ignores false alarms"],
          ["F1", "Balance of P and R", "Arbitrary weight"],
          ["AUC-ROC", "Ranking across thresholds", "Ignores calibration"],
          ["PR-AUC", "Ranking under imbalance", "Less intuitive"],
          ["Log loss", "Calibrated probabilities", "Sensitive to extremes"],
        ],
      },
      {
        type: "code",
        text: "Precision = TP / (TP + FP)\nRecall    = TP / (TP + FN)\nF1        = 2·P·R / (P + R)",
      },
    ],
  },
  {
    n: 25,
    part: 7,
    title: "Neural Networks",
    tagline: "Layers, activations, and universal approximation",
    insight:
      "A neural network is a stack of linear transforms with nonlinearities between them.",
    demo: "neuralnet",
    content: [
      {
        type: "p",
        text: "Neural networks compose affine transforms with nonlinear activations. With enough width or depth, they can approximate any continuous function on a compact domain.",
      },
      {
        type: "code",
        text: "h⁽¹⁾ = σ(W₁x + b₁)\nh⁽²⁾ = σ(W₂h⁽¹⁾ + b₂)\nŷ    = softmax(W₃h⁽²⁾ + b₃)",
      },
      {
        type: "table",
        head: ["Activation", "Formula", "Notes"],
        rows: [
          ["ReLU", "max(0, x)", "Fast, default"],
          ["GELU", "x·Φ(x)", "Transformer default"],
          ["Sigmoid", "1/(1+e⁻ˣ)", "Output layer for binary"],
          ["Softmax", "exp/Σexp", "Multiclass output"],
          ["Tanh", "tanh(x)", "Legacy, bounded"],
        ],
      },
    ],
  },
  {
    n: 26,
    part: 7,
    title: "Training Neural Networks",
    tagline: "Backprop, optimizers, and the tricks that make it work",
    insight:
      "The network is easy. Getting gradients to flow through 100 layers is the hard part.",
    content: [
      {
        type: "p",
        text: "Training a neural network means computing gradients via backpropagation and updating weights. Modern training relies on initialization schemes, normalization, and careful learning-rate schedules.",
      },
      {
        type: "table",
        head: ["Trick", "What It Fixes"],
        rows: [
          ["Xavier/He init", "Vanishing/exploding gradients"],
          ["Batch/layer norm", "Internal covariate shift"],
          ["Dropout", "Overfitting"],
          ["Residual connections", "Deep network trainability"],
          ["LR schedules", "Convergence stability"],
          ["Gradient clipping", "Exploding gradients"],
        ],
      },
      {
        type: "code",
        text: "for epoch in range(E):\n  for x, y in loader:\n    y_hat = model(x)\n    loss = criterion(y_hat, y)\n    loss.backward()\n    optimizer.step()\n    optimizer.zero_grad()",
      },
    ],
  },
  {
    n: 27,
    part: 7,
    title: "Convolutional Networks",
    tagline: "Learning spatial features from images",
    insight:
      "Convolutions exploit translation invariance — the same pattern detector works everywhere in the image.",
    content: [
      {
        type: "p",
        text: "CNNs apply learnable filters over spatial inputs, exploiting locality and translation invariance. They dominate image and video tasks.",
      },
      {
        type: "table",
        head: ["Layer", "Purpose"],
        rows: [
          ["Convolution", "Feature detection"],
          ["Pooling", "Downsampling, translation invariance"],
          ["Batch norm", "Faster, more stable training"],
          ["Residual block", "Deep networks"],
          ["Attention", "Long-range dependencies (ViT)"],
        ],
      },
      {
        type: "code",
        text: "Conv output size:\n  W' = (W − K + 2P) / S + 1\n\n  W = input size\n  K = kernel size\n  P = padding\n  S = stride",
      },
    ],
  },
  {
    n: 28,
    part: 7,
    title: "Sequence Models & Transformers",
    tagline: "From RNNs to attention — modeling ordered data",
    insight:
      "Transformers replaced recurrence with attention. Every token sees every other token at once.",
    demo: "attention",
    content: [
      {
        type: "p",
        text: "Sequence models handle ordered data: text, audio, time series. RNNs and LSTMs process sequentially; transformers use self-attention to see the whole sequence in parallel.",
      },
      {
        type: "code",
        text: "Attention(Q,K,V) = softmax(QKᵀ/√d)·V\n\n  Q: query — what am I looking for?\n  K: key   — what do I contain?\n  V: value — what do I carry?",
      },
      {
        type: "table",
        head: ["Model", "Idea", "Weakness"],
        rows: [
          ["RNN", "Sequential hidden state", "Vanishing gradients"],
          ["LSTM", "Gated memory", "Slow, still sequential"],
          ["Transformer", "Self-attention", "O(n²) memory"],
          ["State-space (Mamba)", "Linear recurrence", "Newer, less mature"],
        ],
      },
    ],
  },
  {
    n: 29,
    part: 8,
    title: "Causal Inference Fundamentals",
    tagline: "Correlation is not causation — but we can still get causation",
    insight:
      "Causal inference is the science of asking 'what if?' — and getting a defensible answer.",
    demo: "causal",
    content: [
      {
        type: "p",
        text: "Causal inference estimates the effect of an intervention. Randomized experiments are the gold standard; observational methods approximate them under assumptions.",
      },
      {
        type: "table",
        head: ["Method", "Assumption"],
        rows: [
          ["RCT", "Randomization"],
          ["Matching", "No unmeasured confounders"],
          ["Regression adjustment", "Correct functional form"],
          ["Instrumental variables", "Valid instrument"],
          ["Difference-in-differences", "Parallel trends"],
          ["Regression discontinuity", "Continuity at cutoff"],
        ],
      },
      {
        type: "insight",
        text: "The fundamental problem of causal inference: you never observe both potential outcomes for the same unit. Every method is a way to estimate the missing one.",
      },
    ],
  },
  {
    n: 30,
    part: 8,
    title: "Confounding & DAGs",
    tagline: "Drawing your assumptions makes them testable",
    insight:
      "A DAG is a contract: 'I believe these are the only paths that matter.'",
    demo: "dag",
    content: [
      {
        type: "p",
        text: "Confounders create spurious associations. Directed Acyclic Graphs (DAGs) make causal assumptions explicit and tell you what to adjust for — and what NOT to adjust for.",
      },
      {
        type: "table",
        head: ["Structure", "Adjust?"],
        rows: [
          ["Confounder (X←C→Y)", "Yes"],
          ["Mediator (X→M→Y)", "No — blocks real effect"],
          ["Collider (X→C←Y)", "No — creates spurious association"],
          ["Proxy confounder", "Yes, if good proxy"],
        ],
      },
      {
        type: "insight",
        text: "Controlling for a collider induces bias. This is why 'adjust for everything' is not a strategy.",
      },
    ],
  },
  {
    n: 31,
    part: 8,
    title: "Uplift & Heterogeneous Effects",
    tagline: "Who benefits? Not just 'does it work?'",
    insight:
      "The average treatment effect is often the least interesting quantity in the room.",
    content: [
      {
        type: "p",
        text: "Heterogeneous treatment effects estimate how a treatment's impact varies across people. Uplift modeling targets those who respond positively — critical for marketing, medicine, and policy.",
      },
      {
        type: "table",
        head: ["Method", "Idea"],
        rows: [
          ["Causal forests", "Tree-based HTE estimation"],
          ["Meta-learners (S/T/X)", "Combine base learners"],
          ["Double ML", "Nuisance-free causal effects"],
          ["Uplift trees", "Directly split on uplift"],
        ],
      },
    ],
  },
  {
    n: 32,
    part: 9,
    title: "MLOps Fundamentals",
    tagline: "From notebook to production — the unsung 90%",
    insight:
      "A model in a notebook is a hypothesis. A model in production is a product.",
    demo: "mlops",
    content: [
      {
        type: "p",
        text: "MLOps is the engineering discipline of shipping, monitoring, and maintaining ML systems. It covers data versioning, model registries, CI/CD, monitoring, and retraining.",
      },
      {
        type: "table",
        head: ["Stage", "Tool Category"],
        rows: [
          ["Data versioning", "DVC, LakeFS"],
          ["Experiment tracking", "MLflow, W&B"],
          ["Feature store", "Feast, Tecton"],
          ["Model registry", "MLflow, SageMaker"],
          ["Serving", "TorchServe, BentoML, KServe"],
          ["Monitoring", "Evidently, Arize, WhyLabs"],
        ],
      },
    ],
  },
  {
    n: 33,
    part: 9,
    title: "Model Monitoring & Drift",
    tagline: "Models decay — data changes, relationships change",
    insight:
      "A model that was accurate last quarter may be actively harmful today. Monitoring is not optional.",
    demo: "drift",
    content: [
      {
        type: "p",
        text: "Production models face data drift (input distribution changes), concept drift (input-output relationship changes), and label drift (target distribution changes). Detection and response are core MLOps skills.",
      },
      {
        type: "table",
        head: ["Drift Type", "Detect Via"],
        rows: [
          ["Data drift", "PSI, KS test on inputs"],
          ["Concept drift", "Metric degradation"],
          ["Label drift", "Target distribution shift"],
          ["Feature drift", "Per-feature monitoring"],
          ["Prediction drift", "Output distribution shift"],
        ],
      },
      {
        type: "insight",
        text: "Detect drift before metrics fall. Input drift often precedes performance loss by days or weeks — enough time to react.",
      },
    ],
  },
  {
    n: 34,
    part: 9,
    title: "Reproducibility & Experiment Tracking",
    tagline: "If you can't reproduce it, it didn't happen",
    insight:
      "The most common cause of irreproducible results is untracked randomness and data.",
    content: [
      {
        type: "p",
        text: "Reproducibility means anyone can rerun your experiment and get the same result. It requires versioning code, data, environment, and random seeds.",
      },
      {
        type: "table",
        head: ["Layer", "What to Track"],
        rows: [
          ["Code", "Git commit hash"],
          ["Data", "Snapshot or hash"],
          ["Environment", "Docker image, requirements"],
          ["Config", "Hyperparameters, seeds"],
          ["Outputs", "Metrics, artifacts"],
        ],
      },
      {
        type: "insight",
        text: "Set every random seed: numpy, python, framework, and CUDA. Nondeterminism in GPU kernels is real and rare — but real.",
      },
    ],
  },
  {
    n: 35,
    part: 10,
    title: "Fairness & Bias in ML",
    tagline: "Models amplify the biases in their data",
    insight:
      "There is no single definition of fairness. Every choice trades off against another.",
    demo: "fairness",
    content: [
      {
        type: "p",
        text: "ML models can perpetuate or amplify historical bias. Fairness is not a property of a model — it's a property of a system, and it has multiple incompatible mathematical definitions.",
      },
      {
        type: "table",
        head: ["Definition", "Meaning"],
        rows: [
          ["Demographic parity", "Equal positive rate across groups"],
          ["Equal opportunity", "Equal TPR across groups"],
          ["Equalized odds", "Equal TPR and FPR"],
          ["Individual fairness", "Similar individuals → similar predictions"],
          ["Calibration", "Predicted probabilities mean the same across groups"],
        ],
      },
      {
        type: "insight",
        text: "You cannot simultaneously satisfy calibration and equalized odds (except in degenerate cases). Fairness requires choosing what you value.",
      },
    ],
  },
  {
    n: 36,
    part: 10,
    title: "Interpretability & Explainability",
    tagline: "Why did the model predict that?",
    insight:
      "Interpretability is not the same as accuracy — it's the ability to understand and trust a model.",
    demo: "shap",
    content: [
      {
        type: "p",
        text: "Interpretable models are understandable by design (linear, trees). Post-hoc methods explain black boxes. Each has limits — and none is a substitute for causal reasoning.",
      },
      {
        type: "table",
        head: ["Method", "Scope", "Notes"],
        rows: [
          ["Coefficients", "Global, linear", "Interpretable if features independent"],
          ["Feature importance", "Global, trees", "Impurity-based is biased"],
          ["Permutation importance", "Global, any", "Slower, model-agnostic"],
          ["Partial dependence", "Global", "Assumes feature independence"],
          ["SHAP", "Local + global", "Consistent, slow"],
          ["LIME", "Local", "Unstable, sample-dependent"],
        ],
      },
    ],
  },
  {
    n: 37,
    part: 10,
    title: "The Data Science Frontier",
    tagline: "Where the field is heading",
    insight:
      "Data science is merging with engineering, LLMs, and causal reasoning into one continuous practice.",
    content: [
      {
        type: "table",
        head: ["Frontier", "Description", "Status"],
        rows: [
          ["LLM-assisted DS", "Copilots for EDA, modeling, and code", "Mainstream"],
          ["Foundation models for tabular", "Pretrained tabular transformers", "Emerging"],
          ["Causal ML at scale", "RCT-grade inference from observational data", "Growing"],
          ["AutoML + MLOps fusion", "End-to-end automated pipelines", "Maturing"],
          ["Federated learning", "Training without centralizing data", "Niche to growing"],
          ["Decision-focused ML", "Optimize the downstream decision, not the prediction", "Research"],
        ],
      },
      {
        type: "insight",
        text: "The most valuable future intersection: causal inference + LLMs + decision-focused ML + MLOps + interpretability. Data science is becoming a systems discipline, not a modeling hobby.",
      },
    ],
  },
];

// ── Quizzes ───────────────────────────────────────────────────────────────
const QUIZZES = {
  0: [
    {
      q: "What best describes data science?",
      opts: [
        "Training the biggest neural network possible",
        "Extracting insight and building predictive systems from data, spanning statistics, engineering, and domain expertise",
        "Making charts in Excel",
        "A synonym for machine learning",
      ],
      ans: 1,
      exp: "Data science is a full-stack discipline: from raw data wrangling, through statistics and ML, up to deployed systems and organizational decisions. Most work is in the top and bottom layers — not modeling.",
    },
    {
      q: "What fraction of a real data science project is usually modeling?",
      opts: ["80%", "50%", "10–20%", "Almost 100%"],
      ans: 2,
      exp: "Most work is in data acquisition, cleaning, EDA, feature engineering, and translating insight into decisions. Modeling is often 10–20% of the total effort — and much less for analytics-focused roles.",
    },
  ],
  1: [
    {
      q: "Why prefer the median over the mean for income data?",
      opts: [
        "The median is easier to compute",
        "Income is right-skewed, and the mean is pulled upward by outliers",
        "Means are always wrong",
        "The median is more precise",
      ],
      ans: 1,
      exp: "Income distributions have long right tails: a few billionaires pull the mean far above what the typical person earns. The median is robust to outliers and reflects what a 'typical' person experiences.",
    },
    {
      q: "What does standard deviation measure?",
      opts: [
        "How far the mean is from zero",
        "The average squared deviation from the mean, square-rooted",
        "The range of the data",
        "The most common value",
      ],
      ans: 1,
      exp: "Standard deviation is √variance. It's in the same units as the data and measures spread. Unlike IQR, it's sensitive to outliers — that's both its strength and its weakness.",
    },
  ],
  6: [
    {
      q: "What does a 95% confidence interval actually mean?",
      opts: [
        "There's a 95% probability the true parameter is inside this interval",
        "If we repeated the experiment many times, 95% of such intervals would contain the true parameter",
        "The data is 95% correct",
        "The estimate is 95% accurate",
      ],
      ans: 1,
      exp: "A CI is a statement about the procedure, not the parameter. Frequentist CIs have coverage: across repeated samples, 95% of constructed intervals capture the truth. The probability statement is about the interval, not the parameter.",
    },
    {
      q: "What does a p-value < 0.05 mean?",
      opts: [
        "The null hypothesis is false",
        "There's a 5% chance the null is true",
        "The data would be surprising (under 5% probability) if the null hypothesis were true",
        "The result is practically significant",
      ],
      ans: 2,
      exp: "A p-value is P(data this extreme | H₀ true). It is NOT P(H₀ | data), and it says nothing about effect size or practical significance. Small p-values with tiny effects are common at scale.",
    },
  ],
  8: [
    {
      q: "Why is peeking at A/B test results dangerous?",
      opts: [
        "It slows down the test",
        "Repeatedly checking and stopping when p < 0.05 inflates the false positive rate dramatically",
        "It uses more compute",
        "It biases the metric",
      ],
      ans: 1,
      exp: "Every peek is a chance to stop early when random noise crosses the threshold. With enough peeks, false positives are nearly guaranteed. Fix with fixed horizons, sequential testing, or always-valid p-values.",
    },
    {
      q: "What is sample ratio mismatch (SRM)?",
      opts: [
        "An unequal number of metrics",
        "The observed split between A and B deviates from the expected ratio, indicating broken randomization",
        "A metric that favors one variant",
        "A type of statistical test",
      ],
      ans: 1,
      exp: "SRM is a red flag: if you randomized 50/50 but got 52/48 with n=10,000, something is broken — logging, assignment, or filtering. Always check SRM before interpreting results.",
    },
  ],
  12: [
    {
      q: "What is data leakage?",
      opts: [
        "Data stored in an insecure location",
        "Training a model on information that won't be available at prediction time",
        "Losing rows during preprocessing",
        "A type of database failure",
      ],
      ans: 1,
      exp: "Leakage means the training signal contains information from the future or from the target. It produces spectacular offline metrics and useless deployed models. Common causes: target leakage, train-test contamination, temporal leakage, and group leakage.",
    },
    {
      q: "Why is scaling before train-test split a leak?",
      opts: [
        "It changes the units",
        "The test set's statistics leak into the scaling parameters used to train the model",
        "It makes the model slower",
        "It breaks cross-validation",
      ],
      ans: 1,
      exp: "If you compute μ and σ on the full dataset, the training data has 'seen' the test set's distribution. Always fit scalers on train only, then apply them to test. This is a subtle, common, and silent leak.",
    },
  ],
  22: [
    {
      q: "What is the bias-variance trade-off?",
      opts: [
        "A trade-off between speed and accuracy",
        "Error decomposes into bias (systematic error) and variance (sensitivity to training data)",
        "A choice between linear and nonlinear models",
        "A regularization technique",
      ],
      ans: 1,
      exp: "Expected error = bias² + variance + noise. Simple models have high bias; complex models have high variance. The right complexity balances them. Regularization, ensembling, and more data reduce variance without adding bias.",
    },
    {
      q: "Your model has 99% train accuracy and 65% test accuracy. What's wrong?",
      opts: [
        "Underfitting — add more capacity",
        "Overfitting — the model memorized the training set",
        "The test set is bad",
        "Nothing — this is normal",
      ],
      ans: 1,
      exp: "Large train-test gap = overfitting (high variance). Fixes: more data, regularization, simpler model, dropout, early stopping. A 34-point gap is severe and almost never acceptable.",
    },
  ],
  24: [
    {
      q: "Why is accuracy misleading for rare events?",
      opts: [
        "It's slow to compute",
        "Predicting the majority class for everything gives high accuracy while being useless",
        "It doesn't handle probabilities",
        "It always underestimates performance",
      ],
      ans: 1,
      exp: "With 1% positive rate, predicting 'no' for everything gives 99% accuracy and zero recall. Use precision, recall, F1, PR-AUC, or cost-weighted metrics under imbalance.",
    },
    {
      q: "What does AUC-ROC measure?",
      opts: [
        "The accuracy at a fixed threshold",
        "The probability that a random positive is ranked above a random negative",
        "The calibration of predicted probabilities",
        "The training loss",
      ],
      ans: 1,
      exp: "AUC-ROC is the probability that a randomly chosen positive example scores higher than a randomly chosen negative. It's threshold-independent — useful for ranking but insensitive to calibration. PR-AUC is often preferred under heavy imbalance.",
    },
  ],
  29: [
    {
      q: "What is the fundamental problem of causal inference?",
      opts: [
        "Data is always missing",
        "You can never observe both potential outcomes (treated and untreated) for the same unit",
        "Experiments are expensive",
        "Correlation is not causation",
      ],
      ans: 1,
      exp: "For any unit, you observe only one outcome: treated or untreated. The counterfactual is forever hidden. Every causal method is a way to estimate the missing potential outcome under explicit assumptions.",
    },
    {
      q: "What is a confounder?",
      opts: [
        "A variable on the causal path",
        "A variable that affects both treatment and outcome, creating a spurious association",
        "A variable affected by both treatment and outcome",
        "An unmeasured variable",
      ],
      ans: 1,
      exp: "A confounder (X ← C → Y) affects both treatment and outcome, generating a non-causal association. You must adjust for it. Mediators and colliders should NOT be adjusted for — that's why 'control for everything' is wrong.",
    },
  ],
  32: [
    {
      q: "What is MLOps?",
      opts: [
        "A Python library for ML",
        "The engineering discipline of shipping, monitoring, and maintaining ML systems in production",
        "A cloud service",
        "A type of neural network",
      ],
      ans: 1,
      exp: "MLOps covers data versioning, experiment tracking, model registries, CI/CD, serving, monitoring, and retraining. It's what turns a notebook into a product — and it's most of the effort in production ML.",
    },
    {
      q: "What is data drift?",
      opts: [
        "Data moving between servers",
        "A change in the distribution of input features over time",
        "A change in model weights",
        "A slow database query",
      ],
      ans: 1,
      exp: "Data drift is when P(X) changes — the inputs your model sees in production differ from training. Concept drift is when P(Y|X) changes. Both degrade performance; input drift often appears first, giving you time to react.",
    },
  ],
  35: [
    {
      q: "Can a model be simultaneously calibrated and satisfy equalized odds?",
      opts: [
        "Yes, always",
        "Only if base rates are equal across groups",
        "Never",
        "Only with deep learning",
      ],
      ans: 1,
      exp: "Chouldechova and Kleinberg showed that calibration and equalized odds are incompatible unless base rates are equal across groups. Fairness requires choosing which criterion matters — it's a values question, not a math one.",
    },
    {
      q: "What is demographic parity?",
      opts: [
        "Equal accuracy across groups",
        "Equal positive prediction rate across groups",
        "Equal feature distributions across groups",
        "Equal training data size",
      ],
      ans: 1,
      exp: "Demographic parity requires P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1). It ignores base rates and can be inappropriate when true outcome rates legitimately differ across groups. It's one of many incompatible fairness definitions.",
    },
  ],
};

// ── Glossary ──────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "A/B Test", def: "Randomized controlled experiment comparing two variants. The industrial standard for causal inference in tech. Watch for peeking, SRM, and multiple comparisons.", ch: 8 },
  { term: "AUC-ROC", def: "Area under the ROC curve. Probability a random positive ranks above a random negative. Threshold-independent but insensitive to calibration.", ch: 24 },
  { term: "Bias-Variance Trade-off", def: "Expected error decomposes into bias² (systematic error) + variance (sensitivity to training data) + noise. Central to model selection.", ch: 22 },
  { term: "Bootstrap", def: "Resampling with replacement to estimate the sampling distribution of a statistic. Fails for extreme quantiles and heavy tails.", ch: 6 },
  { term: "Calibration", def: "A model is calibrated if predicted probabilities match observed frequencies (e.g., 80% predictions are correct 80% of the time).", ch: 24 },
  { term: "Causal Inference", def: "Estimating the effect of an intervention. RCTs are the gold standard; observational methods approximate them under assumptions.", ch: 29 },
  { term: "Collider", def: "A variable caused by both treatment and outcome (X→C←Y). Adjusting for it induces spurious association. Never control for a collider.", ch: 30 },
  { term: "Concept Drift", def: "A change in the relationship P(Y|X) between inputs and outputs over time. Distinct from data drift and often harder to detect.", ch: 33 },
  { term: "Confidence Interval", def: "A range constructed so that, across repeated samples, a specified fraction contains the true parameter. A statement about the procedure, not the parameter.", ch: 6 },
  { term: "Confounder", def: "A variable affecting both treatment and outcome (X←C→Y). Must be adjusted for to estimate causal effects. Common source of spurious correlation.", ch: 30 },
  { term: "Cross-Validation", def: "Estimating generalization by training and testing on different data subsets. The split scheme must match deployment reality (IID, temporal, grouped).", ch: 23 },
  { term: "Data Drift", def: "A change in the input distribution P(X) over time. Often precedes metric degradation, giving time to react.", ch: 33 },
  { term: "Data Leakage", def: "Training on information not available at prediction time. Produces spectacular offline metrics and useless deployed models.", ch: 12 },
  { term: "Decision Tree", def: "A model that recursively splits data on features to separate outcomes. Interpretable but prone to overfitting.", ch: 19 },
  { term: "DAG", def: "Directed Acyclic Graph. Encodes causal assumptions explicitly and tells you what to adjust for — and what NOT to adjust for.", ch: 30 },
  { term: "EDA", def: "Exploratory Data Analysis. Systematic investigation of distributions, relationships, and anomalies before modeling.", ch: 13 },
  { term: "Elastic Net", def: "Regularization combining L1 (Lasso) and L2 (Ridge) penalties. Handles correlated features with sparse selection.", ch: 18 },
  { term: "Entropy", def: "Average surprise of a random variable. Basis for decision-tree splits and cross-entropy loss.", ch: 4 },
  { term: "Equalized Odds", def: "Fairness criterion requiring equal TPR and FPR across groups. Incompatible with calibration unless base rates are equal.", ch: 35 },
  { term: "Feature Engineering", def: "Creating new inputs from raw data: transforms, interactions, aggregations, encodings. Often beats model choice in tabular ML.", ch: 10 },
  { term: "Gradient Boosting", def: "Ensemble method that fits trees sequentially to residuals. State of the art on tabular data (XGBoost, LightGBM).", ch: 19 },
  { term: "Gradient Descent", def: "Iterative optimization: w ← w − η∇L(w). The backbone of training every modern ML model.", ch: 3 },
  { term: "Heterogeneous Treatment Effect", def: "How a treatment's impact varies across individuals. Central to uplift modeling and personalization.", ch: 31 },
  { term: "Hypothesis Test", def: "A procedure to decide whether data is compatible with a null hypothesis. p-values measure P(data | H₀), not P(H₀ | data).", ch: 6 },
  { term: "Imputation", def: "Filling in missing values. The right method depends on whether data is MCAR, MAR, or MNAR.", ch: 9 },
  { term: "Information Theory", def: "Quantifies uncertainty and information. Entropy, KL divergence, and mutual information underlie many ML losses and feature selection methods.", ch: 4 },
  { term: "KL Divergence", def: "A measure of how one probability distribution differs from another. Asymmetric and nonnegative. Used in variational inference and distillation.", ch: 4 },
  { term: "Lasso", def: "L1 regularization: adds λΣ|β| to the loss. Drives some coefficients exactly to zero, performing feature selection.", ch: 18 },
  { term: "Logistic Regression", def: "Binary classification via sigmoid of a linear combination. Interpretable coefficients (odds ratios), calibrated probabilities.", ch: 17 },
  { term: "Mean Squared Error", def: "Average squared difference between predictions and targets. Differentiable, sensitive to outliers.", ch: 3 },
  { term: "Mediator", def: "A variable on the causal path (X→M→Y). Adjusting for it blocks the real effect. Never control for a mediator.", ch: 30 },
  { term: "MLOps", def: "Engineering discipline for shipping, monitoring, and maintaining ML systems. Covers data versioning, tracking, serving, and monitoring.", ch: 32 },
  { term: "MNAR", def: "Missing Not At Random — missingness depends on the unobserved value. The hardest case; imputation alone cannot fix it.", ch: 9 },
  { term: "Mutual Information", def: "I(X;Y) = H(X) − H(X|Y). Measures any dependence, including nonlinear. Used for feature selection.", ch: 4 },
  { term: "p-value", def: "P(data this extreme | H₀ true). Does NOT mean P(H₀ | data). Widely misused and misinterpreted.", ch: 6 },
  { term: "PCA", def: "Principal Component Analysis. Linear dimensionality reduction via eigenvectors of the covariance matrix. Preserves global variance, not local structure.", ch: 21 },
  { term: "Precision", def: "TP / (TP + FP). Fraction of positive predictions that are correct. Optimize when false positives are costly.", ch: 24 },
  { term: "Random Forest", def: "Bagged ensemble of decorrelated decision trees. Robust default for tabular data.", ch: 19 },
  { term: "Recall", def: "TP / (TP + FN). Fraction of actual positives correctly identified. Optimize when false negatives are costly.", ch: 24 },
  { term: "Regularization", def: "Adding a penalty for complexity to the loss. Ridge (L2), Lasso (L1), elastic net (both). The primary defense against overfitting.", ch: 18 },
  { term: "SHAP", def: "SHapley Additive exPlanations. Game-theoretic local and global explanations. Consistent but slow.", ch: 36 },
  { term: "Standardization", def: "(x − μ)/σ. Rescales features to mean 0, unit variance. Required for distance-based and gradient-based models.", ch: 11 },
  { term: "Stratified Split", def: "Train-test split that preserves class proportions. Essential under imbalance.", ch: 23 },
  { term: "t-SNE / UMAP", def: "Nonlinear dimensionality reduction for visualization. Preserve local structure. Distances between clusters are not meaningful.", ch: 21 },
  { term: "Target Encoding", def: "Replacing a category with the mean target value. Powerful but leaks unless computed inside CV folds.", ch: 10 },
  { term: "Transformer", def: "Sequence model based on self-attention. Every token attends to every other token in parallel. O(n²) memory.", ch: 28 },
  { term: "Uplift Modeling", def: "Estimating heterogeneous treatment effects to target those who respond positively to an intervention.", ch: 31 },
  { term: "Variance", def: "Average squared deviation from the mean. In the units of the data, take the square root to get standard deviation.", ch: 1 },
];

// ── Knowledge Graph ───────────────────────────────────────────────────────
const EDGES = [
  [0, 1], [0, 5], [0, 9], [0, 13], [0, 16], [0, 22], [0, 25], [0, 29], [0, 32],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [2, 4],
  [3, 4], [3, 16], [3, 25],
  [4, 5], [4, 19], [4, 22],
  [5, 6], [5, 7], [5, 8],
  [6, 7], [6, 8],
  [7, 8], [7, 29],
  [8, 29], [8, 31],
  [9, 10], [9, 11], [9, 12],
  [10, 11], [10, 12], [10, 19],
  [11, 12], [11, 18], [11, 21],
  [12, 23], [12, 24],
  [13, 14], [13, 15],
  [14, 15],
  [15, 29], [15, 30],
  [16, 17], [16, 18], [16, 19], [16, 22],
  [17, 18], [17, 24],
  [18, 22], [18, 23],
  [19, 20], [19, 22], [19, 36],
  [20, 24],
  [21, 14], [21, 36],
  [22, 23], [22, 24],
  [23, 24], [23, 32],
  [24, 33], [24, 35],
  [25, 26], [25, 27], [25, 28],
  [26, 27], [26, 28], [26, 32],
  [27, 28], [27, 36],
  [28, 37],
  [29, 30], [29, 31],
  [30, 31], [30, 36],
  [31, 37],
  [32, 33], [32, 34],
  [33, 34],
  [35, 36], [35, 37],
  [36, 37],
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
    { l: "🌍 Raw Data", d: "Logs, sensors, transactions, text, images", c: "#60A5FA" },
    { l: "🧹 Wrangling", d: "Cleaning, joining, imputing, transforming", c: "#818CF8" },
    { l: "🔍 Exploration", d: "Distributions, correlations, outliers", c: "#34D399" },
    { l: "📊 Statistics", d: "Estimation, hypothesis testing, uncertainty", c: "#2DD4BF" },
    { l: "🤖 Machine Learning", d: "Predictive models that generalize", c: "#FBBF24" },
    { l: "🎯 Evaluation", d: "Cross-validation, metrics, calibration", c: "#FB923C" },
    { l: "🚀 Deployment", d: "Serving, monitoring, retraining, MLOps", c: "#F87171" },
    { l: "🏢 Decisions", d: "Insight that changes what an org does", c: "#A78BFA" },
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

function DescriptiveDemo() {
  const data = [2, 3, 4, 5, 6, 7, 8, 9, 100];
  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / data.length;
  const std = Math.sqrt(variance);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const stats = [
    { name: "Mean", value: mean.toFixed(2), note: "Pulled up by the 100" },
    { name: "Median", value: median, note: "Robust — unaffected" },
    { name: "Std dev", value: std.toFixed(2), note: "Inflated by outlier" },
    { name: "IQR", value: iqr, note: "Robust spread" },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Dataset: [2, 3, 4, 5, 6, 7, 8, 9, 100] — one extreme outlier
      </p>
      <svg width="100%" height="80" viewBox="0 0 500 80" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
        marginBottom: 14,
      }}>
        <line x1={30} y1={40} x2={470} y2={40} stroke={T.border} strokeWidth={2} />
        {[2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => (
          <circle key={v} cx={40 + i * 30} cy={40} r={6} fill={T.accent} />
        ))}
        <circle cx={420} cy={40} r={8} fill={T.red} />
        <text x={420} y={25} textAnchor="middle" fill={T.red} fontSize="10" fontWeight="700">100</text>
        <line x1={40 + (mean - 2) * 30} y1={55} x2={40 + (mean - 2) * 30} y2={20}
          stroke={T.amber} strokeWidth={2} strokeDasharray="3,3" />
        <text x={40 + (mean - 2) * 30} y={70} textAnchor="middle" fill={T.amber} fontSize="9">mean</text>
        <line x1={40 + (median - 2) * 30} y1={55} x2={40 + (median - 2) * 30} y2={20}
          stroke={T.green} strokeWidth={2} />
        <text x={40 + (median - 2) * 30} y={70} textAnchor="middle" fill={T.green} fontSize="9">median</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {stats.map((s) => (
          <div key={s.name} style={{
            padding: "12px 14px", borderRadius: 8,
            background: T.surface, border: `1px solid ${T.border}`,
          }}>
            <div style={{ color: T.muted, fontSize: 11, marginBottom: 2 }}>{s.name}</div>
            <div style={{ color: T.accent, fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: T.muted, fontSize: 11 }}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinearAlgebraDemo() {
  const [v1, setV1] = useState([0.8, 0.6]);
  const [v2, setV2] = useState([0.5, 0.9]);
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const n1 = Math.hypot(...v1), n2 = Math.hypot(...v2);
  const cos = dot / (n1 * n2);
  const angle = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  const cx = 200, cy = 150, scale = 100;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Dot product measures similarity: large when vectors point the same way
      </p>
      <svg width="100%" height="280" viewBox="0 0 400 280" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        {[-100, -50, 0, 50, 100].map((v) => (
          <g key={v}>
            <line x1={cx + v} y1={20} x2={cx + v} y2={260} stroke={T.border} strokeWidth={0.5} strokeDasharray="2,4" />
            <line x1={20} y1={cy + v} x2={380} y2={cy + v} stroke={T.border} strokeWidth={0.5} strokeDasharray="2,4" />
          </g>
        ))}
        <line x1={cx} y1={cy} x2={cx + v1[0] * scale} y2={cy - v1[1] * scale}
          stroke={T.accent} strokeWidth={2.5} />
        <circle cx={cx + v1[0] * scale} cy={cy - v1[1] * scale} r={5} fill={T.accent} />
        <text x={cx + v1[0] * scale + 10} y={cy - v1[1] * scale} fill={T.accent} fontSize="12" fontWeight="700">A</text>
        <line x1={cx} y1={cy} x2={cx + v2[0] * scale} y2={cy - v2[1] * scale}
          stroke={T.purple} strokeWidth={2.5} />
        <circle cx={cx + v2[0] * scale} cy={cy - v2[1] * scale} r={5} fill={T.purple} />
        <text x={cx + v2[0] * scale + 10} y={cy - v2[1] * scale} fill={T.purple} fontSize="12" fontWeight="700">B</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Dot product", v: dot.toFixed(3), c: dot > 0.7 ? T.green : dot > 0 ? T.amber : T.red },
          { l: "Cosine similarity", v: cos.toFixed(3), c: cos > 0.8 ? T.green : T.amber },
          { l: "Angle", v: angle.toFixed(1) + "°", c: angle < 30 ? T.green : angle < 90 ? T.amber : T.red },
        ].map((s) => (
          <div key={s.l} style={{
            padding: "10px 12px", borderRadius: 8,
            background: T.surface, border: `1px solid ${T.border}`, textAlign: "center",
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{s.l}</div>
            <div style={{ color: s.c, fontSize: 16, fontWeight: 800 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistributionsDemo() {
  const [dist, setDist] = useState("normal");
  const dists = {
    normal: { name: "Normal", desc: "Bell-shaped, symmetric. Sum of many small effects (CLT).", color: T.blue, params: "μ, σ" },
    uniform: { name: "Uniform", desc: "Equal probability over an interval.", color: T.green, params: "a, b" },
    exponential: { name: "Exponential", desc: "Time between Poisson events. Memoryless.", color: T.amber, params: "λ" },
    lognormal: { name: "Log-normal", desc: "Right-skewed. Product of many positive factors.", color: T.purple, params: "μ, σ" },
  };
  const curves = {
    normal: Array.from({ length: 60 }, (_, i) => Math.exp(-((i - 30) ** 2) / 100)),
    uniform: Array.from({ length: 60 }, (_, i) => (i > 15 && i < 45 ? 1 : 0)),
    exponential: Array.from({ length: 60 }, (_, i) => Math.exp(-i / 12)),
    lognormal: Array.from({ length: 60 }, (_, i) => (i < 5 ? 0 : Math.exp(-((Math.log(i) - Math.log(20)) ** 2) / 0.8))),
  };
  const d = dists[dist];
  const pts = curves[dist].map((v, i) => `${30 + i * 7},${160 - v * 100}`).join(" ");
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(dists).map(([k, v]) => (
          <button key={k} onClick={() => setDist(k)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${dist === k ? v.color : T.border}`,
            background: dist === k ? `${v.color}22` : "transparent",
            color: dist === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <svg width="100%" height="200" viewBox="0 0 500 200" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 12,
      }}>
        <polyline points={pts} fill="none" stroke={d.color} strokeWidth={2.5} />
        <line x1={30} y1={160} x2={470} y2={160} stroke={T.border} strokeWidth={1} />
      </svg>
      <div style={{
        padding: "12px 16px", borderRadius: 10,
        background: T.surface, border: `1px solid ${d.color}`,
      }}>
        <div style={{ color: d.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{d.name} distribution</div>
        <div style={{ color: T.subtle, fontSize: 12, marginBottom: 6 }}>{d.desc}</div>
        <div style={{ color: T.muted, fontSize: 11 }}>Parameters: <span style={{ color: T.text, fontWeight: 600 }}>{d.params}</span></div>
      </div>
    </div>
  );
}

function InferenceDemo() {
  const [trueMean, setTrueMean] = useState(50);
  const [n, setN] = useState(30);
  const [cis, setCis] = useState([]);
  const run = () => {
    const next = [];
    for (let i = 0; i < 20; i++) {
      const sample = Array.from({ length: n }, () => trueMean + (Math.random() - 0.5) * 40);
      const mean = sample.reduce((a, b) => a + b, 0) / n;
      const variance = sample.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1);
      const se = Math.sqrt(variance / n);
      const lo = mean - 1.96 * se;
      const hi = mean + 1.96 * se;
      next.push({ mean, lo, hi, hits: lo <= trueMean && hi >= trueMean });
    }
    setCis(next);
  };
  const hits = cis.filter((c) => c.hits).length;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Each line is a 95% CI from a sample. ~95% should contain the true mean.
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={run} style={{
          padding: "8px 20px", borderRadius: 20, background: T.accent,
          color: "#000", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>▶ Draw 20 Samples</button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: T.muted, fontSize: 12 }}>n =</span>
          {[10, 30, 100].map((v) => (
            <button key={v} onClick={() => setN(v)} style={{
              padding: "4px 12px", borderRadius: 16,
              border: `1px solid ${n === v ? T.accent : T.border}`,
              background: n === v ? `${T.accent}22` : "transparent",
              color: n === v ? T.accent : T.muted,
              cursor: "pointer", fontSize: 11, fontWeight: 600,
            }}>{v}</button>
          ))}
        </div>
      </div>
      <div style={{
        padding: "16px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 10 }}>
          <span style={{ color: T.muted }}>True mean = {trueMean}</span>
          <span style={{ color: hits === cis.length && cis.length > 0 ? T.green : T.amber, fontWeight: 700 }}>
            {cis.length > 0 ? `${hits}/${cis.length} intervals contain truth` : ""}
          </span>
        </div>
        {cis.length === 0 ? (
          <div style={{ color: T.muted, fontSize: 12, textAlign: "center", padding: 20 }}>
            Click "Draw 20 Samples" to visualize confidence intervals
          </div>
        ) : (
          <svg width="100%" height={220} viewBox="0 0 500 220">
            <line x1={50 + ((trueMean - 20) / 60) * 400} y1={0}
              x2={50 + ((trueMean - 20) / 60) * 400} y2={220}
              stroke={T.accent} strokeWidth={2} strokeDasharray="4,4" />
            {cis.map((c, i) => {
              const y = 10 + i * 10;
              const lo = 50 + ((c.lo - 20) / 60) * 400;
              const hi = 50 + ((c.hi - 20) / 60) * 400;
              const m = 50 + ((c.mean - 20) / 60) * 400;
              return (
                <g key={i}>
                  <line x1={lo} y1={y} x2={hi} y2={y}
                    stroke={c.hits ? T.green : T.red} strokeWidth={2} />
                  <circle cx={m} cy={y} r={3} fill={c.hits ? T.green : T.red} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}

function BayesianDemo() {
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(1);
  const [trials, setTrials] = useState(20);
  const [successes, setSuccesses] = useState(12);
  const postAlpha = alpha + successes;
  const postBeta = beta + (trials - successes);
  const priorMean = alpha / (alpha + beta);
  const postMean = postAlpha / (postAlpha + postBeta);
  const curve = (a, b) => Array.from({ length: 80 }, (_, i) => {
    const x = i / 80;
    const logB = (t, u) => {
      const lg = (n) => { let s = 0; for (let i = 1; i <= n - 1; i++) s += Math.log(i); return s; };
      return lg(t) + lg(u) - lg(t + u);
    };
    return { x, y: Math.exp((a - 1) * Math.log(x + 1e-6) + (b - 1) * Math.log(1 - x + 1e-6) - logB(a, b)) };
  });
  const prior = curve(alpha, beta);
  const post = curve(postAlpha, postBeta);
  const maxY = Math.max(...post.map((p) => p.y), ...prior.map((p) => p.y));
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Beta prior + Bernoulli likelihood → Beta posterior (conjugate update)
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { l: "Successes", v: successes, set: setSuccesses, max: trials },
          { l: "Failures", v: trials - successes, set: (v) => setSuccesses(trials - v), max: trials },
          { l: "Total trials", v: trials, set: setTrials, max: 100 },
        ].map((s) => (
          <div key={s.l}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: T.muted }}>{s.l}</span>
              <span style={{ color: T.accent, fontWeight: 700 }}>{s.v}</span>
            </div>
            <input type="range" min={0} max={s.max} value={s.v}
              onChange={(e) => s.set(+e.target.value)} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <svg width="100%" height="180" viewBox="0 0 500 180" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 12,
      }}>
        <polyline points={prior.map((p) => `${30 + p.x * 440},${160 - (p.y / maxY) * 140}`).join(" ")}
          fill="none" stroke={T.muted} strokeWidth={1.5} strokeDasharray="4,3" />
        <polyline points={post.map((p) => `${30 + p.x * 440},${160 - (p.y / maxY) * 140}`).join(" ")}
          fill="none" stroke={T.accent} strokeWidth={2.5} />
        <text x={250} y={20} textAnchor="middle" fill={T.muted} fontSize="10">
          Prior (dashed) → Posterior (solid)
        </text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Prior mean", v: priorMean.toFixed(3), c: T.muted },
          { l: "Posterior mean", v: postMean.toFixed(3), c: T.accent },
          { l: "Posterior α, β", v: `${postAlpha}, ${postBeta}`, c: T.green },
        ].map((s) => (
          <div key={s.l} style={{
            padding: "10px 12px", borderRadius: 8,
            background: T.surface, border: `1px solid ${T.border}`, textAlign: "center",
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{s.l}</div>
            <div style={{ color: s.c, fontSize: 14, fontWeight: 800 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ABTestDemo() {
  const [nA, setNA] = useState(1000);
  const [convA, setConvA] = useState(100);
  const [nB, setNB] = useState(1000);
  const [convB, setConvB] = useState(120);
  const pA = convA / nA, pB = convB / nB;
  const pPool = (convA + convB) / (nA + nB);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB));
  const z = se > 0 ? (pB - pA) / se : 0;
  const pValue = 2 * (1 - 0.5 * (1 + Math.sign(z) * Math.sqrt(1 - Math.exp(-2 * z * z / Math.PI))));
  const lift = ((pB - pA) / pA) * 100;
  const significant = Math.abs(z) > 1.96;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Two-proportion z-test — the workhorse of A/B analysis
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[
          { label: "Control (A)", n: nA, setN: setNA, c: convA, setC: setConvA, color: T.blue },
          { label: "Treatment (B)", n: nB, setN: setNB, c: convB, setC: setConvB, color: T.green },
        ].map((g) => (
          <div key={g.label} style={{
            padding: "12px 14px", borderRadius: 10,
            background: T.surface, border: `1px solid ${g.color}44`,
          }}>
            <div style={{ color: g.color, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>{g.label}</div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                <span style={{ color: T.muted }}>Sample size</span>
                <span style={{ color: T.text, fontWeight: 700 }}>{g.n}</span>
              </div>
              <input type="range" min={100} max={10000} step={100} value={g.n}
                onChange={(e) => g.setN(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                <span style={{ color: T.muted }}>Conversions</span>
                <span style={{ color: T.text, fontWeight: 700 }}>{g.c}</span>
              </div>
              <input type="range" min={0} max={g.n} value={g.c}
                onChange={(e) => g.setC(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div style={{ marginTop: 10, color: T.muted, fontSize: 11 }}>
              Rate: <span style={{ color: g.color, fontWeight: 700 }}>{((g.c / g.n) * 100).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        padding: "16px", borderRadius: 10,
        background: significant ? `${T.green}11` : T.surface,
        border: `1px solid ${significant ? T.green : T.border}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>Lift</div>
            <div style={{ color: lift > 0 ? T.green : T.red, fontSize: 18, fontWeight: 800 }}>
              {lift > 0 ? "+" : ""}{lift.toFixed(2)}%
            </div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>z-score</div>
            <div style={{ color: T.text, fontSize: 18, fontWeight: 800 }}>{z.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ color: T.muted, fontSize: 10 }}>p-value</div>
            <div style={{ color: significant ? T.green : T.muted, fontSize: 18, fontWeight: 800 }}>
              {Math.abs(pValue) < 0.001 ? "<0.001" : pValue.toFixed(3)}
            </div>
          </div>
        </div>
        <div style={{
          color: significant ? T.green : T.muted, fontSize: 12, fontWeight: 600,
        }}>
          {significant ? "✓ Statistically significant at α = 0.05" : "✗ Not significant — could be noise"}
        </div>
      </div>
    </div>
  );
}

function CleaningDemo() {
  const [strategy, setStrategy] = useState("drop");
  const raw = [12, 15, null, 18, 22, null, 25, 30, null, 35, 40, 28];
  const strategies = {
    drop: { name: "Drop rows", color: T.red, desc: "Loses data; bad if missingness is not random" },
    mean: { name: "Mean impute", color: T.amber, desc: "Preserves n but distorts variance" },
    median: { name: "Median impute", color: T.blue, desc: "Robust to outliers" },
    flag: { name: "Flag + impute", color: T.green, desc: "Preserves missingness signal" },
  };
  const nonNull = raw.filter((v) => v != null);
  const mean = nonNull.reduce((a, b) => a + b, 0) / nonNull.length;
  const sorted = [...nonNull].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const cleaned = (() => {
    if (strategy === "drop") return raw.filter((v) => v != null);
    if (strategy === "mean") return raw.map((v) => v ?? +mean.toFixed(1));
    if (strategy === "median") return raw.map((v) => v ?? median);
    return raw.map((v) => v ?? +median.toFixed(1));
  })();
  const s = strategies[strategy];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(strategies).map(([k, v]) => (
          <button key={k} onClick={() => setStrategy(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${strategy === k ? v.color : T.border}`,
            background: strategy === k ? `${v.color}22` : "transparent",
            color: strategy === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>RAW DATA</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {raw.map((v, i) => (
            <div key={i} style={{
              padding: "8px 12px", borderRadius: 6,
              background: v == null ? `${T.red}22` : T.elevated,
              border: `1px solid ${v == null ? T.red : T.border}`,
              color: v == null ? T.red : T.text, fontSize: 13, fontWeight: 700,
              minWidth: 40, textAlign: "center",
            }}>{v == null ? "?" : v}</div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>CLEANED</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cleaned.map((v, i) => (
            <div key={i} style={{
              padding: "8px 12px", borderRadius: 6,
              background: `${s.color}22`, border: `1px solid ${s.color}`,
              color: T.text, fontSize: 13, fontWeight: 700, minWidth: 40, textAlign: "center",
            }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "12px 14px", borderRadius: 8,
        background: T.surface, border: `1px solid ${s.color}`,
      }}>
        <div style={{ color: s.color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{s.name}</div>
        <div style={{ color: T.subtle, fontSize: 12 }}>{s.desc}</div>
        <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>
          n = {cleaned.length} · mean = {(cleaned.reduce((a, b) => a + b, 0) / cleaned.length).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function FeaturesDemo() {
  const [transform, setTransform] = useState("raw");
  const raw = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  const log = raw.map((v) => Math.log(v));
  const stand = (() => {
    const m = raw.reduce((a, b) => a + b, 0) / raw.length;
    const sd = Math.sqrt(raw.reduce((a, b) => a + (b - m) ** 2, 0) / raw.length);
    return raw.map((v) => (v - m) / sd);
  })();
  const data = transform === "raw" ? raw : transform === "log" ? log : stand;
  const max = Math.max(...data.map(Math.abs));
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          { k: "raw", label: "Raw", c: T.red },
          { k: "log", label: "Log", c: T.green },
          { k: "stand", label: "Standardized", c: T.blue },
        ].map((t) => (
          <button key={t.k} onClick={() => setTransform(t.k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${transform === t.k ? t.c : T.border}`,
            background: transform === t.k ? `${t.c}22` : "transparent",
            color: transform === t.k ? t.c : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{t.label}</button>
        ))}
      </div>
      <svg width="100%" height="180" viewBox="0 0 500 180" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={30} y1={150} x2={470} y2={150} stroke={T.border} strokeWidth={1} />
        <line x1={30} y1={20} x2={30} y2={150} stroke={T.border} strokeWidth={1} />
        {data.map((v, i) => {
          const x = 40 + i * 42;
          const h = Math.abs(v / max) * 120;
          return (
            <g key={i}>
              <rect x={x - 15} y={150 - h} width={30} height={h}
                fill={`${transform === "raw" ? T.red : transform === "log" ? T.green : T.blue}88`}
                stroke={transform === "raw" ? T.red : transform === "log" ? T.green : T.blue} />
              <text x={x} y={166} textAnchor="middle" fill={T.muted} fontSize="9">{raw[i]}</text>
            </g>
          );
        })}
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">Transformed values</text>
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {transform === "raw" && "Raw values span 1–512. Distance-based models will weight large values disproportionately."}
        {transform === "log" && "Log transform compresses the range. Monotonic — preserves order but equalizes scale."}
        {transform === "stand" && "Standardization (z-scores) centers at 0 and scales to unit variance. Required for linear models and NNs."}
      </div>
    </div>
  );
}

function LeakageDemo() {
  const [withLeak, setWithLeak] = useState(false);
  const realAcc = 72;
  const leakAcc = 99;
  const acc = withLeak ? leakAcc : realAcc;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setWithLeak(false)} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${!withLeak ? T.green : T.border}`,
          background: !withLeak ? `${T.green}22` : "transparent",
          color: !withLeak ? T.green : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Clean Pipeline</button>
        <button onClick={() => setWithLeak(true)} style={{
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${withLeak ? T.red : T.border}`,
          background: withLeak ? `${T.red}22` : "transparent",
          color: withLeak ? T.red : T.muted, cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Leaky Pipeline</button>
      </div>
      <div style={{
        padding: "20px", borderRadius: 10,
        background: T.surface, border: `1px solid ${withLeak ? T.red : T.green}`,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
          <span style={{ color: T.muted, fontSize: 12 }}>Validation accuracy:</span>
          <span style={{
            color: withLeak ? T.red : T.green,
            fontSize: 40, fontWeight: 900,
          }}>{acc}%</span>
        </div>
        <div style={{ height: 10, background: T.border, borderRadius: 5, overflow: "hidden", marginBottom: 12 }}>
          <div style={{
            width: `${acc}%`, height: "100%",
            background: withLeak ? T.red : T.green, transition: "width .4s",
          }} />
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.6 }}>
          {withLeak
            ? "⚠️ Leaky pipeline: features include post-outcome information, scaling applied before split, or target encoding fitted outside CV. Offline looks great — production collapses."
            : "✓ Clean pipeline: all preprocessing fitted inside CV folds; no future information; grouped/temporal splits where needed. Offline matches deployment."}
        </div>
      </div>
    </div>
  );
}

function EDADemo() {
  const [feature, setFeature] = useState("age");
  const data = {
    age: { dist: [2, 5, 12, 20, 25, 30, 45, 60, 72, 40, 30, 22, 18, 12, 8], label: "Age", color: T.blue },
    income: { dist: [5, 10, 20, 30, 45, 60, 80, 90, 85, 70, 55, 40, 28, 18, 10], label: "Income (log)", color: T.green },
    clicks: { dist: [8, 20, 40, 55, 70, 60, 45, 30, 20, 12, 8, 5, 3, 2, 1], label: "Clicks", color: T.amber },
    churn: { dist: [3, 8, 15, 25, 40, 55, 65, 70, 60, 45, 30, 18, 10, 5, 3], label: "Churn risk", color: T.red },
  };
  const d = data[feature];
  const max = Math.max(...d.dist);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(data).map(([k, v]) => (
          <button key={k} onClick={() => setFeature(k)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${feature === k ? v.color : T.border}`,
            background: feature === k ? `${v.color}22` : "transparent",
            color: feature === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.label}</button>
        ))}
      </div>
      <svg width="100%" height="200" viewBox="0 0 500 200" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={30} y1={170} x2={470} y2={170} stroke={T.border} strokeWidth={1} />
        <line x1={30} y1={20} x2={30} y2={170} stroke={T.border} strokeWidth={1} />
        {d.dist.map((v, i) => (
          <rect key={i} x={40 + i * 28} y={170 - (v / max) * 140}
            width={24} height={(v / max) * 140}
            fill={`${d.color}88`} stroke={d.color} strokeWidth={1} />
        ))}
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">
          Distribution of {d.label}
        </text>
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {feature === "age" && "Roughly uniform age distribution — no strong skew."}
        {feature === "income" && "Right-skewed income — log transform recommended."}
        {feature === "clicks" && "Right-skewed count data — Poisson-like. Consider log1p or count models."}
        {feature === "churn" && "Bimodal churn risk — suggests two subpopulations worth modeling separately."}
      </div>
    </div>
  );
}

function VisualizationDemo() {
  const [chart, setChart] = useState("scatter");
  const points = Array.from({ length: 40 }, () => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
  }));
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { k: "scatter", label: "Scatter" },
          { k: "bar", label: "Bar" },
          { k: "histogram", label: "Histogram" },
          { k: "box", label: "Box" },
        ].map((c) => (
          <button key={c.k} onClick={() => setChart(c.k)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${chart === c.k ? T.accent : T.border}`,
            background: chart === c.k ? `${T.accent}22` : "transparent",
            color: chart === c.k ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{c.label}</button>
        ))}
      </div>
      <svg width="100%" height="240" viewBox="0 0 500 240" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={40} y1={210} x2={470} y2={210} stroke={T.border} />
        <line x1={40} y1={20} x2={40} y2={210} stroke={T.border} />
        {chart === "scatter" && points.map((p, i) => (
          <circle key={i} cx={40 + p.x * 42} cy={210 - p.y * 18} r={5}
            fill={`${T.accent}88`} stroke={T.accent} />
        ))}
        {chart === "bar" && [3, 6, 4, 8, 5, 7, 2].map((v, i) => (
          <rect key={i} x={70 + i * 55} y={210 - v * 20} width={35} height={v * 20}
            fill={`${T.accent}88`} stroke={T.accent} />
        ))}
        {chart === "histogram" && (() => {
          const bins = Array(10).fill(0);
          points.forEach((p) => bins[Math.floor(p.x)]++);
          const max = Math.max(...bins);
          return bins.map((v, i) => (
            <rect key={i} x={40 + i * 42} y={210 - (v / max) * 170}
              width={38} height={(v / max) * 170}
              fill={`${T.accent}88`} stroke={T.accent} />
          ));
        })()}
        {chart === "box" && [1, 2, 3].map((g, gi) => {
          const vals = Array.from({ length: 30 }, () => g + (Math.random() - 0.5) * 2);
          vals.sort((a, b) => a - b);
          const q1 = vals[7], med = vals[15], q3 = vals[22];
          const x = 120 + gi * 100;
          return (
            <g key={gi}>
              <line x1={x} y1={210 - vals[0] * 40} x2={x} y2={210 - vals[29] * 40}
                stroke={T.accent} />
              <rect x={x - 20} y={210 - q3 * 40} width={40} height={(q3 - q1) * 40}
                fill={`${T.accent}33`} stroke={T.accent} />
              <line x1={x - 20} y1={210 - med * 40} x2={x + 20} y2={210 - med * 40}
                stroke={T.accent} strokeWidth={2} />
            </g>
          );
        })}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {chart === "scatter" && "Scatter: relationship between two continuous variables. Look for patterns, clusters, and outliers."}
        {chart === "bar" && "Bar: compare a numeric value across categories. Sort by value, not alphabetically."}
        {chart === "histogram" && "Histogram: distribution of a continuous variable. Watch bin width — it changes the story."}
        {chart === "box" && "Box: distribution by group. Shows median, IQR, and outliers compactly."}
      </div>
    </div>
  );
}

function CorrelationDemo() {
  const [r, setR] = useState(0.7);
  const points = (() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = r * x + Math.sqrt(1 - r * r) * (Math.random() - 0.5) * 6;
      pts.push({ x, y });
    }
    return pts;
  })();
  const cx = 250, cy = 130, scale = 30;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Drag the correlation coefficient to see the shape of association change
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Pearson r</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{r.toFixed(2)}</span>
        </div>
        <input type="range" min={-1} max={1} step={0.05} value={r}
          onChange={(e) => setR(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <line x1={30} y1={cy} x2={470} y2={cy} stroke={T.border} strokeWidth={0.5} strokeDasharray="3,3" />
        <line x1={cx} y1={20} x2={cx} y2={240} stroke={T.border} strokeWidth={0.5} strokeDasharray="3,3" />
        {points.map((p, i) => (
          <circle key={i} cx={cx + p.x * scale} cy={cy - p.y * scale} r={4}
            fill={`${T.accent}88`} stroke={T.accent} strokeWidth={0.8} />
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {Math.abs(r) > 0.8 && "Strong linear association."}
        {Math.abs(r) > 0.4 && Math.abs(r) <= 0.8 && "Moderate linear association."}
        {Math.abs(r) <= 0.4 && "Weak or no linear association."}
        {" "}Always plot — correlation can be high with nonlinear patterns, or zero with strong nonlinear relationships.
      </div>
    </div>
  );
}

function LinearRegDemo() {
  const [slope, setSlope] = useState(1.5);
  const [intercept, setIntercept] = useState(3);
  const [noise, setNoise] = useState(0.5);
  const points = Array.from({ length: 30 }, () => {
    const x = Math.random() * 8;
    const y = 1.5 * x + 3 + (Math.random() - 0.5) * noise * 8;
    return { x, y };
  });
  const mse = points.reduce((a, p) => a + (p.y - (slope * p.x + intercept)) ** 2, 0) / points.length;
  const sxx = points.reduce((a, p) => a + (p.x - points.reduce((b, q) => b + q.x, 0) / points.length) ** 2, 0);
  const sxy = points.reduce((a, p) => {
    const mx = points.reduce((b, q) => b + q.x, 0) / points.length;
    const my = points.reduce((b, q) => b + q.y, 0) / points.length;
    return a + (p.x - mx) * (p.y - my);
  }, 0);
  const bestSlope = sxy / sxx;
  const mx = points.reduce((a, p) => a + p.x, 0) / points.length;
  const my = points.reduce((a, p) => a + p.y, 0) / points.length;
  const bestIntercept = my - bestSlope * mx;
  const cx = 250, cy = 200, scale = 40;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Fit a line to the data — minimize mean squared error
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { l: "Slope", v: slope, set: setSlope, min: 0, max: 3, step: 0.1 },
          { l: "Intercept", v: intercept, set: setIntercept, min: 0, max: 8, step: 0.5 },
        ].map((s) => (
          <div key={s.l}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: T.muted }}>{s.l}</span>
              <span style={{ color: T.accent, fontWeight: 700 }}>{s.v.toFixed(2)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.v}
              onChange={(e) => s.set(+e.target.value)} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <svg width="100%" height="260" viewBox="0 0 500 260" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 10,
      }}>
        <line x1={30} y1={cy} x2={470} y2={cy} stroke={T.border} />
        <line x1={cx} y1={20} x2={cx} y2={cy} stroke={T.border} />
        {points.map((p, i) => {
          const pred = slope * p.x + intercept;
          return (
            <g key={i}>
              <line x1={cx + (p.x - 4) * scale} y1={cy - p.y * 15}
                x2={cx + (p.x - 4) * scale} y2={cy - pred * 15}
                stroke={T.red} strokeWidth={1} opacity={0.4} strokeDasharray="2,2" />
              <circle cx={cx + (p.x - 4) * scale} cy={cy - p.y * 15} r={4}
                fill={`${T.blue}88`} stroke={T.blue} />
            </g>
          );
        })}
        <line x1={cx - 4 * scale} y1={cy - intercept * 15}
          x2={cx + 4 * scale} y2={cy - (slope * 8 + intercept) * 15}
          stroke={T.accent} strokeWidth={2.5} />
        <line x1={cx - 4 * scale} y1={cy - bestIntercept * 15}
          x2={cx + 4 * scale} y2={cy - (bestSlope * 8 + bestIntercept) * 15}
          stroke={T.green} strokeWidth={1.5} strokeDasharray="4,3" />
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: "10px 14px", borderRadius: 8, background: T.surface, border: `1px solid ${T.border}` }}>
          <div style={{ color: T.muted, fontSize: 11 }}>Your MSE</div>
          <div style={{ color: T.amber, fontSize: 18, fontWeight: 800 }}>{mse.toFixed(2)}</div>
        </div>
        <div style={{ padding: "10px 14px", borderRadius: 8, background: T.surface, border: `1px solid ${T.green}` }}>
          <div style={{ color: T.muted, fontSize: 11 }}>Optimal line</div>
          <div style={{ color: T.green, fontSize: 18, fontWeight: 800 }}>
            y = {bestSlope.toFixed(2)}x + {bestIntercept.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogisticDemo() {
  const [threshold, setThreshold] = useState(0.5);
  const scores = [
    { score: 0.05, y: 0 }, { score: 0.15, y: 0 }, { score: 0.22, y: 0 },
    { score: 0.35, y: 0 }, { score: 0.42, y: 1 }, { score: 0.48, y: 0 },
    { score: 0.55, y: 1 }, { score: 0.62, y: 1 }, { score: 0.68, y: 0 },
    { score: 0.75, y: 1 }, { score: 0.82, y: 1 }, { score: 0.88, y: 1 },
    { score: 0.92, y: 1 }, { score: 0.95, y: 1 }, { score: 0.98, y: 1 },
  ];
  let tp = 0, fp = 0, tn = 0, fn = 0;
  scores.forEach((s) => {
    const pred = s.score >= threshold ? 1 : 0;
    if (pred === 1 && s.y === 1) tp++;
    else if (pred === 1 && s.y === 0) fp++;
    else if (pred === 0 && s.y === 0) tn++;
    else fn++;
  });
  const prec = tp + fp === 0 ? 0 : tp / (tp + fp);
  const rec = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 = prec + rec === 0 ? 0 : (2 * prec * rec) / (prec + rec);
  const acc = (tp + tn) / scores.length;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Move the threshold to see how precision, recall, and accuracy trade off
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Threshold</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{threshold.toFixed(2)}</span>
        </div>
        <input type="range" min={0} max={1} step={0.01} value={threshold}
          onChange={(e) => setThreshold(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="80" viewBox="0 0 500 80" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        {scores.map((s, i) => (
          <g key={i}>
            <circle cx={40 + s.score * 420} cy={40} r={8}
              fill={s.y === 1 ? T.green : T.red} opacity={0.7} />
            <text x={40 + s.score * 420} y={25} textAnchor="middle"
              fill={s.y === 1 ? T.green : T.red} fontSize="9" fontWeight="700">
              {s.y === 1 ? "+" : "−"}
            </text>
          </g>
        ))}
        <line x1={40 + threshold * 420} y1={10} x2={40 + threshold * 420} y2={70}
          stroke={T.accent} strokeWidth={2.5} />
        <text x={40 + threshold * 420} y={78} textAnchor="middle" fill={T.accent} fontSize="10">threshold</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          { l: "True Positives", v: tp, c: T.green },
          { l: "False Positives", v: fp, c: T.amber },
          { l: "True Negatives", v: tn, c: T.blue },
          { l: "False Negatives", v: fn, c: T.red },
        ].map((m) => (
          <div key={m.l} style={{
            padding: "8px 12px", borderRadius: 8, background: T.surface,
            border: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between",
          }}>
            <span style={{ color: T.muted, fontSize: 11 }}>{m.l}</span>
            <span style={{ color: m.c, fontWeight: 700 }}>{m.v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Precision", v: prec, c: T.blue },
          { l: "Recall", v: rec, c: T.purple },
          { l: "F1", v: f1, c: T.amber },
          { l: "Accuracy", v: acc, c: T.green },
        ].map((m) => (
          <div key={m.l} style={{
            padding: "10px 12px", borderRadius: 8, background: T.surface,
            border: `1px solid ${m.c}44`, textAlign: "center",
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{m.l}</div>
            <div style={{ color: m.c, fontSize: 16, fontWeight: 800 }}>{m.v.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegularizationDemo() {
  const [lambda, setLambda] = useState(0.5);
  const [penalty, setPenalty] = useState("l2");
  const coefs = [2.5, 1.8, -3.2, 0.9, -1.4, 4.1, -0.3, 2.2];
  const shrunk = coefs.map((c) => {
    if (penalty === "l2") return c / (1 + lambda);
    const sign = Math.sign(c);
    return sign * Math.max(0, Math.abs(c) - lambda);
  });
  const maxAbs = Math.max(...coefs.map(Math.abs), ...shrunk.map(Math.abs));
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { k: "l1", label: "Lasso (L1)", c: T.amber },
          { k: "l2", label: "Ridge (L2)", c: T.blue },
        ].map((p) => (
          <button key={p.k} onClick={() => setPenalty(p.k)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `1px solid ${penalty === p.k ? p.c : T.border}`,
            background: penalty === p.k ? `${p.c}22` : "transparent",
            color: penalty === p.k ? p.c : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{p.label}</button>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>λ (regularization strength)</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{lambda.toFixed(2)}</span>
        </div>
        <input type="range" min={0} max={4} step={0.05} value={lambda}
          onChange={(e) => setLambda(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="180" viewBox="0 0 500 180" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 10,
      }}>
        <line x1={250} y1={10} x2={250} y2={170} stroke={T.border} strokeWidth={0.5} strokeDasharray="2,3" />
        {coefs.map((c, i) => {
          const y = 20 + i * 18;
          const w = (Math.abs(c) / maxAbs) * 100;
          const sw = (Math.abs(shrunk[i]) / maxAbs) * 100;
          return (
            <g key={i}>
              <rect x={250 - w} y={y - 4} width={w * 2} height={7}
                fill={`${T.muted}44`} />
              <rect x={250 - sw * Math.sign(shrunk[i] || 1) - (shrunk[i] < 0 ? sw : 0)}
                y={y - 4} width={sw} height={7}
                fill={penalty === "l1" ? T.amber : T.blue} opacity={0.85} />
              <text x={30} y={y + 3} fill={T.muted} fontSize="10">β{i + 1}</text>
            </g>
          );
        })}
        <text x={250} y={176} textAnchor="middle" fill={T.muted} fontSize="9">
          Gray = original · Colored = regularized
        </text>
      </svg>
      <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {penalty === "l1" && "Lasso (L1): drives some coefficients exactly to zero — performs feature selection."}
        {penalty === "l2" && "Ridge (L2): shrinks coefficients smoothly toward zero — never exactly zero."}
        {" "}Both reduce overfitting by penalizing complexity.
      </div>
    </div>
  );
}

function TreesDemo() {
  const [depth, setDepth] = useState(3);
  const points = Array.from({ length: 80 }, () => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
    label: Math.random() > 0.5 ? 1 : 0,
  }));
  // Simulate splits at depth levels
  const splits = [
    { axis: "y", at: 5 },
    { axis: "x", at: 5 },
    { axis: "y", at: 2.5 },
    { axis: "x", at: 7.5 },
  ].slice(0, depth);
  const cx = 250, cy = 140, s = 24;
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Tree depth</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{depth}</span>
        </div>
        <input type="range" min={1} max={4} value={depth}
          onChange={(e) => setDepth(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="300" viewBox="0 0 500 300" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {points.map((p, i) => (
          <circle key={i} cx={cx + (p.x - 5) * s} cy={cy - (p.y - 5) * s} r={5}
            fill={p.label === 1 ? `${T.green}88` : `${T.red}88`}
            stroke={p.label === 1 ? T.green : T.red} />
        ))}
        {splits.map((sp, i) => {
          const off = i === 0 ? 0 : i === 1 ? 0 : i === 2 ? 0 : 0;
          if (sp.axis === "y") {
            return <line key={i} x1={20} y1={cy - (sp.at - 5) * s} x2={480} y2={cy - (sp.at - 5) * s}
              stroke={T.accent} strokeWidth={1.5} strokeDasharray="6,4" opacity={0.8} />;
          }
          return <line key={i} x1={cx + (sp.at - 5) * s} y1={20} x2={cx + (sp.at - 5) * s} y2={280}
            stroke={T.accent} strokeWidth={1.5} strokeDasharray="6,4" opacity={0.8} />;
        })}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Decision trees recursively split the feature space on axis-aligned boundaries. Depth controls complexity: shallow = underfit, deep = overfit.
      </div>
    </div>
  );
}

function UnsupervisedDemo() {
  const [k, setK] = useState(3);
  const points = Array.from({ length: 60 }, () => {
    const cluster = Math.floor(Math.random() * 3);
    const cx = [80, 250, 400][cluster];
    const cy = [80, 180, 90][cluster];
    return {
      x: cx + (Math.random() - 0.5) * 80,
      y: cy + (Math.random() - 0.5) * 80,
      trueCluster: cluster,
    };
  });
  const colors = [T.blue, T.green, T.amber];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        K-means with k={k} — points colored by nearest centroid
      </p>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[2, 3, 4, 5].map((v) => (
          <button key={v} onClick={() => setK(v)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${k === v ? T.accent : T.border}`,
            background: k === v ? `${T.accent}22` : "transparent",
            color: k === v ? T.accent : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>k = {v}</button>
        ))}
      </div>
      <svg width="100%" height="280" viewBox="0 0 500 280" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={5}
            fill={`${colors[p.trueCluster]}88`}
            stroke={colors[p.trueCluster]} />
        ))}
        {Array.from({ length: k }).map((_, i) => {
          const angle = (i / k) * Math.PI * 2;
          const r = k === 1 ? 0 : 130;
          const x = 250 + Math.cos(angle) * r;
          const y = 140 + Math.sin(angle) * r * 0.6;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={12} fill="none"
                stroke={colors[i % colors.length]} strokeWidth={3} />
              <line x1={x - 6} y1={y} x2={x + 6} y2={y}
                stroke={colors[i % colors.length]} strokeWidth={2} />
              <line x1={x} y1={y - 6} x2={x} y2={y + 6}
                stroke={colors[i % colors.length]} strokeWidth={2} />
            </g>
          );
        })}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        K-means minimizes within-cluster variance. It assumes spherical, similar-sized clusters — and will happily split a large cluster or merge two close ones.
      </div>
    </div>
  );
}

function BiasVarianceDemo() {
  const [complexity, setComplexity] = useState(3);
  const x = Array.from({ length: 30 }, (_, i) => i / 29);
  const trueFn = (t) => Math.sin(t * Math.PI * 2) * 0.4 + 0.5;
  const trainPred = (t) => {
    const noise = Math.sin(t * Math.PI * 2 * complexity) * 0.02 * complexity;
    return trueFn(t) + noise;
  };
  const bias = Math.max(0, 0.4 - complexity * 0.05);
  const variance = complexity * complexity * 0.01;
  const total = bias * bias + variance;
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Increasing model complexity: bias falls, variance rises, total error is U-shaped
      </p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: T.muted }}>Model complexity</span>
          <span style={{ color: T.accent, fontWeight: 700 }}>{complexity}</span>
        </div>
        <input type="range" min={1} max={10} value={complexity}
          onChange={(e) => setComplexity(+e.target.value)} style={{ width: "100%" }} />
      </div>
      <svg width="100%" height="220" viewBox="0 0 500 220" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 10,
      }}>
        <line x1={30} y1={200} x2={470} y2={200} stroke={T.border} />
        <line x1={30} y1={20} x2={30} y2={200} stroke={T.border} />
        <polyline points={x.map((t, i) => `${30 + i * 14.5},${200 - trueFn(t) * 350}`).join(" ")}
          fill="none" stroke={T.muted} strokeWidth={1.5} strokeDasharray="4,3" />
        <polyline points={x.map((t, i) => `${30 + i * 14.5},${200 - Math.max(0, Math.min(1, trainPred(t))) * 350}`).join(" ")}
          fill="none" stroke={T.accent} strokeWidth={2.5} />
        <text x={250} y={15} textAnchor="middle" fill={T.muted} fontSize="10">
          Truth (dashed) vs model (solid)
        </text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Bias²", v: bias * bias, c: T.blue },
          { l: "Variance", v: variance, c: T.amber },
          { l: "Total error", v: total, c: T.red },
        ].map((m) => (
          <div key={m.l} style={{
            padding: "10px 12px", borderRadius: 8, background: T.surface,
            border: `1px solid ${T.border}`, textAlign: "center",
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{m.l}</div>
            <div style={{ color: m.c, fontSize: 16, fontWeight: 800 }}>{m.v.toFixed(3)}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {complexity <= 2 && "Model is too simple — high bias, underfitting."}
        {complexity >= 3 && complexity <= 6 && "Sweet spot: balanced bias and variance."}
        {complexity >= 7 && "Model is too complex — high variance, overfitting."}
      </div>
    </div>
  );
}

function CVDemo() {
  const [scheme, setScheme] = useState("kfold");
  const schemes = {
    kfold: { name: "K-Fold", color: T.blue, folds: ["Test", "Train", "Train", "Train", "Train"] },
    stratified: { name: "Stratified", color: T.green, folds: ["Test", "Train", "Train", "Train", "Train"] },
    timeseries: { name: "Time Series", color: T.amber, folds: ["Test", "Test", "Test", "Test", "Train"] },
    group: { name: "Group K-Fold", color: T.purple, folds: ["Test", "Test", "Train", "Train", "Train"] },
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(schemes).map(([k, v]) => (
          <button key={k} onClick={() => setScheme(k)} style={{
            padding: "5px 14px", borderRadius: 20,
            border: `1px solid ${scheme === k ? v.color : T.border}`,
            background: scheme === k ? `${v.color}22` : "transparent",
            color: scheme === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.name}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[0, 1, 2, 3, 4].map((fold) => {
          const s = schemes[scheme];
          return (
            <div key={fold} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: T.muted, fontSize: 11, minWidth: 60 }}>Fold {fold + 1}</span>
              {s.folds.map((f, i) => {
                const isTest = scheme === "timeseries"
                  ? i >= fold
                  : scheme === "group"
                  ? i === fold || i === (fold + 1) % 5
                  : i === fold;
                return (
                  <div key={i} style={{
                    flex: 1, padding: "10px", borderRadius: 6, textAlign: "center",
                    background: isTest ? `${T.red}44` : `${s.color}33`,
                    border: `1px solid ${isTest ? T.red : s.color}`,
                    color: isTest ? T.red : T.text, fontSize: 11, fontWeight: 700,
                  }}>{isTest ? "TEST" : "train"}</div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 14, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        {scheme === "kfold" && "Standard K-fold: data split randomly. Valid for IID data only."}
        {scheme === "stratified" && "Stratified: preserves class proportions per fold. Essential under imbalance."}
        {scheme === "timeseries" && "Time series split: test is always in the future relative to train. Never shuffle time."}
        {scheme === "group" && "Group K-fold: keeps all rows of the same group (user, patient, device) in the same fold. Prevents group leakage."}
      </div>
    </div>
  );
}

function MetricsDemo() {
  const [tp, setTp] = useState(50);
  const [fp, setFp] = useState(20);
  const [fn, setFn] = useState(30);
  const [tn, setTn] = useState(900);
  const prec = tp + fp === 0 ? 0 : tp / (tp + fp);
  const rec = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 = prec + rec === 0 ? 0 : (2 * prec * rec) / (prec + rec);
  const acc = (tp + tn) / (tp + tn + fp + fn);
  const specificity = tn / (tn + fp);
  const metrics = [
    { l: "Precision", v: prec, c: T.blue, f: "TP / (TP+FP)" },
    { l: "Recall", v: rec, c: T.purple, f: "TP / (TP+FN)" },
    { l: "F1", v: f1, c: T.amber, f: "2PR/(P+R)" },
    { l: "Accuracy", v: acc, c: T.green, f: "(TP+TN)/all" },
    { l: "Specificity", v: specificity, c: T.teal, f: "TN / (TN+FP)" },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Adjust the confusion matrix cells to see how metrics change
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { l: "True Positives", v: tp, set: setTp, c: T.green },
          { l: "False Positives", v: fp, set: setFp, c: T.amber },
          { l: "False Negatives", v: fn, set: setFn, c: T.red },
          { l: "True Negatives", v: tn, set: setTn, c: T.blue },
        ].map((m) => (
          <div key={m.l}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: T.muted }}>{m.l}</span>
              <span style={{ color: m.c, fontWeight: 700 }}>{m.v}</span>
            </div>
            <input type="range" min={0} max={1000} value={m.v}
              onChange={(e) => m.set(+e.target.value)} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
        {metrics.map((m) => (
          <div key={m.l} style={{
            padding: "12px", borderRadius: 10, background: T.surface,
            border: `1px solid ${m.c}44`,
          }}>
            <div style={{ color: T.muted, fontSize: 10, marginBottom: 4 }}>{m.l}</div>
            <div style={{ color: m.c, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{m.v.toFixed(3)}</div>
            <div style={{ color: T.muted, fontSize: 9, fontFamily: "monospace" }}>{m.f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeuralNetDemo() {
  const [layers, setLayers] = useState([4, 3, 3, 2]);
  const [active, setActive] = useState(null);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        A small neural network: 4 input → 3 hidden → 3 hidden → 2 output
      </p>
      <svg width="100%" height="300" viewBox="0 0 500 300" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        {layers.map((count, li) => {
          const x = 70 + li * 120;
          return Array.from({ length: count }).map((_, ni) => {
            const y = 150 + (ni - (count - 1) / 2) * 55;
            return <circle key={`${li}-${ni}`} cx={x} cy={y} r={18}
              fill={active === li ? `${T.accent}44` : T.surface}
              stroke={T.accent} strokeWidth={2} />;
          });
        })}
        {layers.slice(0, -1).map((count, li) => {
          return Array.from({ length: count }).map((_, ni) => {
            const x1 = 70 + li * 120;
            const y1 = 150 + (ni - (count - 1) / 2) * 55;
            return Array.from({ length: layers[li + 1] }).map((_, nj) => {
              const x2 = 70 + (li + 1) * 120;
              const y2 = 150 + (nj - (layers[li + 1] - 1) / 2) * 55;
              return <line key={`${li}-${ni}-${nj}`} x1={x1 + 18} y1={y1} x2={x2 - 18} y2={y2}
                stroke={T.border} strokeWidth={0.8} />;
            });
          });
        })}
        {layers.map((_, li) => (
          <text key={li} x={70 + li * 120} y={290} textAnchor="middle"
            fill={T.muted} fontSize="10">
            {li === 0 ? "Input" : li === layers.length - 1 ? "Output" : `Hidden ${li}`}
          </text>
        ))}
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Every connection is a weight. Training adjusts each weight via backpropagation. Stacking more layers lets the network learn increasingly abstract features.
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
  const [sel, setSel] = useState(null);
  const heat = (v) => {
    const r = Math.round(34 + (239 - 34) * v);
    const g = Math.round(211 + (68 - 211) * v);
    return `rgb(${r},${g},238)`;
  };
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Click a token to see which tokens it attends to
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {tokens.map((t, i) => (
          <button key={i} onClick={() => setSel(sel === i ? null : i)} style={{
            padding: "8px 14px", borderRadius: 20,
            border: `2px solid ${sel === i ? T.accent : T.border}`,
            background: sel === i ? `${T.accent}22` : T.elevated,
            color: sel === i ? T.accent : T.text,
            cursor: "pointer", fontWeight: 600, fontSize: 14,
          }}>{t}</button>
        ))}
      </div>
      {sel !== null ? (
        <div>
          <div style={{ color: T.text, fontSize: 13, marginBottom: 10 }}>
            <strong style={{ color: T.accent }}>"{tokens[sel]}"</strong> attends to:
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tokens.map((t, j) => (
              <div key={j} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 8,
                  background: heat(attn[sel][j]),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13, color: "#000", marginBottom: 4,
                }}>{(attn[sel][j] * 100).toFixed(0)}%</div>
                <div style={{ color: T.text, fontSize: 12 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          padding: "20px", background: T.elevated, borderRadius: 8,
          border: `1px solid ${T.border}`, color: T.muted, fontSize: 13, textAlign: "center",
        }}>↑ Click a token to visualize its attention pattern</div>
      )}
    </div>
  );
}

function CausalDemo() {
  const [adjust, setAdjust] = useState("none");
  const options = {
    none: { label: "No adjustment", color: T.red, bias: 0.4 },
    confounder: { label: "Adjust for confounder", color: T.green, bias: 0.0 },
    mediator: { label: "Adjust for mediator", color: T.amber, bias: -0.3 },
    collider: { label: "Adjust for collider", color: T.red, bias: 0.5 },
  };
  const o = options[adjust];
  const trueEffect = 0.5;
  const observed = trueEffect + o.bias;
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(options).map(([k, v]) => (
          <button key={k} onClick={() => setAdjust(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${adjust === k ? v.color : T.border}`,
            background: adjust === k ? `${v.color}22` : "transparent",
            color: adjust === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{v.label}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${o.color}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: T.muted, fontSize: 12 }}>True causal effect</span>
          <span style={{ color: T.green, fontSize: 18, fontWeight: 800 }}>{trueEffect}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: T.muted, fontSize: 12 }}>Your estimate</span>
          <span style={{ color: o.color, fontSize: 18, fontWeight: 800 }}>{observed.toFixed(2)}</span>
        </div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.6 }}>
          {adjust === "none" && "Not adjusting for a confounder leaves spurious association — estimate is biased upward."}
          {adjust === "confounder" && "Correct! Adjusting for the confounder isolates the causal effect."}
          {adjust === "mediator" && "Adjusting for a mediator blocks the real causal path — estimate is biased downward."}
          {adjust === "collider" && "Adjusting for a collider creates spurious association — estimate is biased upward."}
        </div>
      </div>
    </div>
  );
}

function DAGDemo() {
  const [selected, setSelected] = useState("confounder");
  const structures = {
    confounder: {
      nodes: { X: { x: 100, y: 100 }, C: { x: 250, y: 60 }, Y: { x: 400, y: 100 } },
      edges: [["C", "X"], ["C", "Y"], ["X", "Y"]],
      label: "Confounder",
      advice: "Adjust for C",
      color: T.green,
    },
    mediator: {
      nodes: { X: { x: 100, y: 100 }, M: { x: 250, y: 100 }, Y: { x: 400, y: 100 } },
      edges: [["X", "M"], ["M", "Y"]],
      label: "Mediator",
      advice: "Do NOT adjust for M",
      color: T.amber,
    },
    collider: {
      nodes: { X: { x: 100, y: 100 }, C: { x: 250, y: 160 }, Y: { x: 400, y: 100 } },
      edges: [["X", "C"], ["Y", "C"]],
      label: "Collider",
      advice: "Do NOT adjust for C",
      color: T.red,
    },
  };
  const s = structures[selected];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.entries(structures).map(([k, v]) => (
          <button key={k} onClick={() => setSelected(k)} style={{
            padding: "6px 14px", borderRadius: 20,
            border: `1px solid ${selected === k ? v.color : T.border}`,
            background: selected === k ? `${v.color}22` : "transparent",
            color: selected === k ? v.color : T.muted,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{v.label}</button>
        ))}
      </div>
      <svg width="100%" height="220" viewBox="0 0 500 220" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`, marginBottom: 12,
      }}>
        <defs>
          <marker id="arrowDS" viewBox="0 0 10 10" refX="20" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={T.muted} />
          </marker>
        </defs>
        {s.edges.map(([from, to], i) => {
          const a = s.nodes[from], b = s.nodes[to];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={s.color} strokeWidth={2} markerEnd="url(#arrowDS)" />;
        })}
        {Object.entries(s.nodes).map(([id, n]) => (
          <g key={id}>
            <circle cx={n.x} cy={n.y} r={26} fill={T.surface}
              stroke={s.color} strokeWidth={2.5} />
            <text x={n.x} y={n.y + 6} textAnchor="middle" fill={T.text} fontSize="16" fontWeight="800">{id}</text>
          </g>
        ))}
      </svg>
      <div style={{
        padding: "12px 16px", borderRadius: 10,
        background: `${s.color}11`, border: `1px solid ${s.color}`,
      }}>
        <div style={{ color: s.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.advice}</div>
        <div style={{ color: T.subtle, fontSize: 12, lineHeight: 1.5 }}>
          {selected === "confounder" && "A confounder affects both X and Y, creating spurious association. Adjust to remove it."}
          {selected === "mediator" && "A mediator lies on the causal path X→M→Y. Adjusting blocks the real effect — never adjust for mediators when estimating total effects."}
          {selected === "collider" && "A collider is caused by both X and Y. Adjusting induces spurious association (Berkson's paradox, selection bias)."}
        </div>
      </div>
    </div>
  );
}

function MLOpsDemo() {
  const [stage, setStage] = useState(0);
  const stages = [
    { name: "Data Ingestion", color: T.blue, desc: "Raw data lands; versioned with DVC/LakeFS." },
    { name: "Feature Engineering", color: T.green, desc: "Features computed; written to feature store." },
    { name: "Training", color: T.amber, desc: "Model trained; experiments tracked in MLflow/W&B." },
    { name: "Evaluation", color: T.purple, desc: "Metrics computed; model compared to production." },
    { name: "Registry", color: T.pink, desc: "Model promoted to staging or production." },
    { name: "Serving", color: T.teal, desc: "Model deployed behind API; traffic routed." },
    { name: "Monitoring", color: T.red, desc: "Drift, latency, metrics tracked. Alert on degradation." },
  ];
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        The MLOps lifecycle — every stage has tooling, ownership, and failure modes
      </p>
      <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
        {stages.map((s, i) => (
          <button key={i} onClick={() => setStage(i)} style={{
            padding: "5px 12px", borderRadius: 16,
            border: `1px solid ${stage === i ? s.color : T.border}`,
            background: stage === i ? `${s.color}22` : "transparent",
            color: stage === i ? s.color : T.muted,
            cursor: "pointer", fontSize: 11, fontWeight: 600,
          }}>{i + 1}. {s.name}</button>
        ))}
      </div>
      <div style={{
        padding: "20px", borderRadius: 10,
        background: T.surface, border: `1px solid ${stages[stage].color}`,
      }}>
        <div style={{ color: stages[stage].color, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          Stage {stage + 1}: {stages[stage].name}
        </div>
        <div style={{ color: T.subtle, fontSize: 13, lineHeight: 1.6 }}>{stages[stage].desc}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0} style={{
          padding: "6px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: stage === 0 ? T.muted : T.text,
          cursor: stage === 0 ? "default" : "pointer", fontSize: 12,
        }}>← Previous</button>
        <button onClick={() => setStage(Math.min(stages.length - 1, stage + 1))}
          disabled={stage === stages.length - 1} style={{
          padding: "6px 16px", borderRadius: 20, background: T.accent,
          color: "#000", border: "none",
          cursor: stage === stages.length - 1 ? "default" : "pointer",
          fontSize: 12, fontWeight: 700,
          opacity: stage === stages.length - 1 ? 0.5 : 1,
        }}>Next →</button>
      </div>
    </div>
  );
}

function DriftDemo() {
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setTick((t) => (t >= 30 ? 0 : t + 1)), 300);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);
  const trainMean = 50;
  const currentMean = 50 + tick * 0.8;
  const train = Array.from({ length: 60 }, (_, i) => Math.exp(-((i - 30) ** 2) / 200));
  const current = Array.from({ length: 60 }, (_, i) => Math.exp(-((i - 30 - tick * 0.6) ** 2) / 200));
  const psi = Math.min(1, tick / 30);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setRunning(!running)} style={{
          padding: "8px 18px", borderRadius: 20,
          background: running ? T.red : T.green, color: "#000",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
        }}>{running ? "⏸ Pause" : "▶ Simulate Drift"}</button>
        <button onClick={() => { setTick(0); setRunning(false); }} style={{
          padding: "8px 16px", borderRadius: 20, background: T.elevated,
          border: `1px solid ${T.border}`, color: T.text, cursor: "pointer", fontSize: 12,
        }}>↺ Reset</button>
        <div style={{
          marginLeft: "auto", padding: "6px 14px", borderRadius: 8,
          background: T.elevated, border: `1px solid ${T.border}`, fontSize: 12,
        }}>
          <span style={{ color: T.muted }}>PSI: </span>
          <span style={{
            color: psi > 0.25 ? T.red : psi > 0.1 ? T.amber : T.green,
            fontWeight: 700,
          }}>{psi.toFixed(3)}</span>
        </div>
      </div>
      <svg width="100%" height="200" viewBox="0 0 500 200" style={{
        background: T.elevated, borderRadius: 10, border: `1px solid ${T.border}`,
      }}>
        <polyline points={train.map((v, i) => `${30 + i * 7.3},${170 - v * 130}`).join(" ")}
          fill="none" stroke={T.muted} strokeWidth={1.5} strokeDasharray="4,3" />
        <polyline points={current.map((v, i) => `${30 + i * 7.3},${170 - v * 130}`).join(" ")}
          fill="none" stroke={T.red} strokeWidth={2.5} />
        <text x={250} y={20} textAnchor="middle" fill={T.muted} fontSize="10">
          Training (dashed) vs Production (solid)
        </text>
      </svg>
      <div style={{ marginTop: 10, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        PSI &lt; 0.1: no significant shift. 0.1–0.25: moderate shift, investigate. &gt; 0.25: significant drift, retrain.
      </div>
    </div>
  );
}

function FairnessDemo() {
  const [rate, setRate] = useState({ a: 0.4, b: 0.4 });
  const [tnr, setTnr] = useState({ a: 0.8, b: 0.8 });
  const groups = [
    { key: "a", label: "Group A", color: T.blue },
    { key: "b", label: "Group B", color: T.purple },
  ];
  const dp = Math.abs(rate.a - rate.b);
  const eo = Math.abs(tnr.a - tnr.b);
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 12 }}>
        Adjust per-group rates to see how fairness criteria diverge
      </p>
      {groups.map((g) => (
        <div key={g.key} style={{ marginBottom: 12 }}>
          <div style={{ color: g.color, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{g.label}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                <span style={{ color: T.muted }}>Positive rate</span>
                <span style={{ color: T.text, fontWeight: 700 }}>{(rate[g.key] * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min={0} max={1} step={0.05} value={rate[g.key]}
                onChange={(e) => setRate({ ...rate, [g.key]: +e.target.value })} style={{ width: "100%" }} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
                <span style={{ color: T.muted }}>True positive rate</span>
                <span style={{ color: T.text, fontWeight: 700 }}>{(tnr[g.key] * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min={0} max={1} step={0.05} value={tnr[g.key]}
                onChange={(e) => setTnr({ ...tnr, [g.key]: +e.target.value })} style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { l: "Demographic parity gap", v: dp, c: T.green },
          { l: "Equal opportunity gap", v: eo, c: T.purple },
        ].map((m) => (
          <div key={m.l} style={{
            padding: "12px", borderRadius: 10, background: T.surface,
            border: `1px solid ${m.c}44`,
          }}>
            <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>{m.l}</div>
            <div style={{ color: m.v < 0.05 ? T.green : m.v < 0.15 ? T.amber : T.red, fontSize: 20, fontWeight: 800 }}>
              {m.v.toFixed(3)}
            </div>
            <div style={{ color: T.muted, fontSize: 10, marginTop: 4 }}>
              {m.v < 0.05 ? "Fair by this criterion" : "Disparity present"}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        Different fairness definitions can conflict. You cannot simultaneously satisfy calibration and equalized odds unless base rates are equal. Fairness requires choosing which criterion matters.
      </div>
    </div>
  );
}

function SHAPDemo() {
  const contributions = [
    { feature: "Age", value: 0.42 },
    { feature: "Income", value: 0.28 },
    { feature: "Tenure", value: -0.18 },
    { feature: "Region", value: 0.12 },
    { feature: "Plan", value: -0.08 },
    { feature: "Support calls", value: 0.22 },
  ];
  const base = 0.35;
  const pred = base + contributions.reduce((a, c) => a + c.value, 0);
  const maxAbs = Math.max(...contributions.map((c) => Math.abs(c.value)));
  return (
    <div>
      <p style={{ color: T.muted, fontSize: 13, marginBottom: 14 }}>
        SHAP values decompose a prediction into per-feature contributions
      </p>
      <div style={{
        padding: "20px", borderRadius: 10, background: T.surface,
        border: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 12 }}>
          <span style={{ color: T.muted }}>Base (expected) prediction</span>
          <span style={{ color: T.text, fontWeight: 700 }}>{base.toFixed(3)}</span>
        </div>
        {contributions.map((c) => (
          <div key={c.feature} style={{
            display: "grid", gridTemplateColumns: "100px 1fr 60px",
            alignItems: "center", gap: 8, marginBottom: 6,
          }}>
            <span style={{ color: T.text, fontSize: 12 }}>{c.feature}</span>
            <div style={{ position: "relative", height: 14, background: T.border, borderRadius: 2 }}>
              <div style={{
                position: "absolute",
                left: c.value > 0 ? "50%" : `calc(50% - ${(Math.abs(c.value) / maxAbs) * 50}%)`,
                width: `${(Math.abs(c.value) / maxAbs) * 50}%`,
                top: 0, bottom: 0,
                background: c.value > 0 ? T.green : T.red,
                borderRadius: 2,
              }} />
            </div>
            <span style={{
              color: c.value > 0 ? T.green : T.red,
              fontSize: 12, fontWeight: 700, textAlign: "right",
            }}>{c.value > 0 ? "+" : ""}{c.value.toFixed(2)}</span>
          </div>
        ))}
        <div style={{
          display: "flex", justifyContent: "space-between", fontSize: 12,
          marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}`,
        }}>
          <span style={{ color: T.muted }}>Final prediction</span>
          <span style={{ color: T.accent, fontWeight: 800, fontSize: 16 }}>{pred.toFixed(3)}</span>
        </div>
      </div>
      <div style={{ color: T.muted, fontSize: 12, lineHeight: 1.6 }}>
        SHAP values are additive: base + sum of contributions = prediction. They answer "how much did this feature push the prediction up or down?" — locally and globally.
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
    `How does ${ch.title} connect to real data science work?`,
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
          system: `You are an expert data science tutor helping someone learn statistics, probability, data wrangling, machine learning, deep learning, causal inference, and MLOps. The student is studying:\n\n${ctx}\n\nAnswer clearly and concisely. Use concrete examples and analogies. Keep responses under 200 words. Be encouraging and direct.`,
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
      <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
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
    descriptive: DescriptiveDemo,
    linearalgebra: LinearAlgebraDemo,
    distributions: DistributionsDemo,
    inference: InferenceDemo,
    bayesian: BayesianDemo,
    abtest: ABTestDemo,
    cleaning: CleaningDemo,
    features: FeaturesDemo,
    leakage: LeakageDemo,
    eda: EDADemo,
    visualization: VisualizationDemo,
    correlation: CorrelationDemo,
    linearreg: LinearRegDemo,
    logistic: LogisticDemo,
    regularization: RegularizationDemo,
    trees: TreesDemo,
    unsupervised: UnsupervisedDemo,
    biasvariance: BiasVarianceDemo,
    cv: CVDemo,
    metrics: MetricsDemo,
    neuralnet: NeuralNetDemo,
    attention: AttentionDemo,
    causal: CausalDemo,
    dag: DAGDemo,
    mlops: MLOpsDemo,
    drift: DriftDemo,
    fairness: FairnessDemo,
    shap: SHAPDemo,
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
      <RelatedCurriculums currentId="data-science" chapter={ch} />
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
        All 38 chapters and their conceptual connections. Click any node to open that chapter. ⊙ = read
      </p>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <svg width={W} height={H} style={{
          background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`,
        }}>
          <defs>
            <radialGradient id="bgDS" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0E1C30" />
              <stop offset="100%" stopColor="#040810" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#bgDS)" rx="14" />
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
          <span style={{ fontSize: 18 }}>📊</span>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>Data Science</div>
        </div>
        <div style={{ color: T.muted, fontSize: 11, marginLeft: 26 }}>11 Parts · 38 Chapters</div>
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
    { label: "Analyst Path", color: T.blue, desc: "Stats, EDA, visualization, A/B testing", chs: [0, 1, 5, 6, 7, 8, 9, 13, 14, 15] },
    { label: "ML Engineer Track", color: T.green, desc: "Features, models, evaluation, MLOps", chs: [10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24, 32, 33, 34] },
    { label: "Deep Learning Route", color: T.purple, desc: "Neural nets, transformers, production DL", chs: [25, 26, 27, 28, 2, 3] },
    { label: "Causal / Research", color: T.amber, desc: "Causal inference, fairness, interpretability", chs: [29, 30, 31, 35, 36, 37] },
  ];
  const highlighted = activePath !== null ? new Set(paths[activePath].chs) : null;
  const recentlyRead = [...read].slice(-3).reverse();
  return (
    <div className="curriculum-overview" style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <CurriculumHero eyebrow="Evidence path" title="Data Science" description="A visual route from probability and data preparation to experiments, models, and production decisions." icon="📊" color="#A78BFA" secondaryColor="#F472B6" parts={PARTS.length} chapters={CHAPTERS.length} terms={GLOSSARY.length} signal="Data → model → decision" nodes={["Data", "Stats", "ML", "Eval", "MLOps"]} />
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
        }}>Data Science</h1> */}
        <p style={{ color: T.muted, fontSize: 15, margin: "0 0 24px" }}>
          11 Parts · 38 Chapters · From Statistics to Machine Learning
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