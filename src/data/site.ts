/**
 * Site content.
 *
 * Disclosure rule: capabilities and outcomes from all work may be claimed;
 * only public artefacts get links. Private repositories (yee-claw, the Telesto
 * platform, Proximal) are described without a link. Nothing here asserts
 * something a reader cannot check.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Pillar {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  detail: string[];
}

export interface Proof {
  name: string;
  establishes: string;
  area: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "public" | "private";
  period: string;
  summary: string;
  detail: string[];
  stack: string[];
  links: Link[];
  highlights?: { label: string; value: string }[];
}

export interface SkillGroup {
  slug: string;
  name: string;
  summary: string;
  items: string[];
}

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  arrangement?: string;
  highlights: string[];
}

export interface Credential {
  institution: string;
  award: string;
  period: string;
  note?: string;
}

export const profile = {
  name: "Kartik Jevaji",
  handle: "nitrotap",
  role: "Full Stack AI Engineer",
  focus: "Security-focused AI engineering",
  location: "St. Paul, Minnesota",
  thesis: "Neural generates. Symbolic verifies.",
  lede:
    "I build ontologies and automated-reasoning agents that keep language models honest, and I write the numerical machinery underneath them in Rust — with proofs where proof is possible and evaluation where it isn't.",
  summary: [
    "Software engineer working on neurosymbolic AI systems and formally verified software. A TypeDB ontology generates the type layer, hand-written numerics sit on top, and a Kani proof suite establishes the invariants that tests can only sample.",
    "The same shape runs through the agent work: domain and agentic ontologies for symbolic grounding, harness-level evaluations with graders for the behaviour that can't be proven, and determinism kept in the foreground.",
    "Master's in Statistics, fifteen years of engineering in between, and a recent return to statistics by way of Rust.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/nitrotap" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kjevaji" },
    { label: "Hugging Face", href: "https://huggingface.co/nitrotap" },
    { label: "Email", href: "mailto:kartikinpublic@gmail.com" },
  ] satisfies Link[],
};

export const pillars: Pillar[] = [
  {
    slug: "formal-verification",
    name: "Formal verification",
    kicker: "Proof, not sampling",
    summary:
      "Model checking establishes properties over all inputs in a bounded space. A test tells you about the cases you thought of.",
    detail: [
      "Kani proof harnesses over the numeric kernels of a statistical computing library — index bounds, totality, structural invariants like bijectivity and partitioning.",
      "Miri as the dynamic undefined-behaviour backstop for what model checking cannot reach.",
      "Quality gates that lock invariants mechanically rather than by convention: a test that requires a written SAFETY justification for any future `unsafe`, in a codebase that currently contains none.",
      "Reading and tracking the wider ecosystem — Creusot, Verus, Charon, Aeneas, Dafny, and the verified Rust standard library effort.",
    ],
  },
  {
    slug: "ai-security-and-evaluation",
    name: "AI security & evaluation",
    kicker: "Measure what you cannot prove",
    summary:
      "Language models are probabilistic. Where proof does not apply, the answer is graded evaluation, determinism, and adversarial testing.",
    detail: [
      "Harness-level evaluation frameworks with graders for accuracy and hallucination detection, integrated with LangSmith and MCP.",
      "Deterministic agent interfaces — reproducibility treated as a product property rather than a debugging aid.",
      "Benchmark construction and repair: rebuilding a code-generation benchmark, then measuring a fine-tune against it.",
      "Security review as practice — hardened deployments, database security audits, and the AI security verification standards.",
    ],
  },
  {
    slug: "symbolic-grounding",
    name: "Symbolic grounding",
    kicker: "Structure a reasoner can traverse",
    summary:
      "Formal schemas turn tacit domain knowledge into something a reasoner can walk and a model can be held accountable to.",
    detail: [
      "A TypeDB ontology as the single source of truth for a Rust type system, compiled to traits and structs by a zero-dependency generator.",
      "Agentic and domain ontologies backing a symbolic verifier loop.",
      "Abstract entities become marker traits with the hierarchy preserved; concrete entities become structs carrying every inherited attribute.",
      "Knowledge representation tooling — TypeQL, LinkML, Datalog stores, and semantic web frameworks.",
    ],
  },
];

/**
 * Kani harnesses. The suite is 72 harnesses across 44 files, run as a
 * pre-release gate rather than per-change. Those named below are a
 * representative selection, quoted verbatim from the source.
 */
export const verification = {
  harnessCount: 72,
  fileCount: 44,
  /**
   * 68 of the 72 harnesses carve through to the published stats-claw crate;
   * the 4 that stay behind cover the private composition layer, which the carve
   * excludes. Distinguished here because the public number is the checkable one.
   */
  publicHarnessCount: 68,
  publicFileCount: 43,
  summary:
    "A statistical library is a poor fit for testing alone: the interesting failures are index arithmetic, float edge cases, and structural invariants that only break on inputs nobody thinks to write down. Kani model-checks these over every input in a bounded space.",
  notes: [
    "Harnesses live in `#[cfg(kani)] mod verification` blocks co-located with the code they constrain, so they are invisible to normal builds and cost nothing at runtime.",
    "Miri runs as the dynamic undefined-behaviour backstop for what Kani cannot reach.",
    "Numerics are separately validated against `scipy.stats`, `scikit-learn`, `ruptures`, and `mlxtend` via committed golden fixtures, to documented tolerances between 1e-8 and 1e-12.",
    "Sampling is deterministic by construction: a hand-written SplitMix64 generator gives byte-identical results across platforms.",
    "The full suite takes upwards of twenty minutes, so it runs as a release gate rather than on every push.",
  ],
  proofs: [
    {
      name: "resampling_permutation_is_bijection",
      establishes: "A permutation resampler emits each index exactly once — it permutes rather than merely shuffling.",
      area: "Resampling",
    },
    {
      name: "resampling_kfold_test_sets_partition",
      establishes: "K-fold test sets partition the dataset: no sample is held out twice, none is silently dropped.",
      area: "Resampling",
    },
    {
      name: "resampling_bootstrap_indices_in_bounds",
      establishes: "Every bootstrap draw indexes inside the sample, for all sample sizes.",
      area: "Resampling",
    },
    {
      name: "resampling_loo_indices_partition",
      establishes: "Leave-one-out splits cover the dataset exactly once each.",
      area: "Resampling",
    },
    {
      name: "moments_variance_non_negative",
      establishes: "Welford's streaming update can never yield a negative variance, whatever the input sequence.",
      area: "Streaming",
    },
    {
      name: "p2_positions_strictly_increasing",
      establishes: "The P² quantile estimator's marker positions stay strictly ordered — the invariant the algorithm rests on.",
      area: "Streaming",
    },
    {
      name: "rng_next_f64_in_unit_interval",
      establishes: "Generated floats land in [0, 1) with no boundary escape.",
      area: "PRNG",
    },
    {
      name: "rng_u64_to_f64_faithful",
      establishes: "The integer-to-float conversion rounds faithfully rather than drifting at the extremes.",
      area: "PRNG",
    },
    {
      name: "ziggurat_table_indices_in_bounds",
      establishes: "The ziggurat sampler's table lookups stay in range for every generated candidate.",
      area: "Sampling",
    },
    {
      name: "class_argmax_in_bounds",
      establishes: "Classification argmax returns a valid class index, including for degenerate score vectors.",
      area: "Algorithms",
    },
    {
      name: "optimizers_norm_finite_non_negative",
      establishes: "Optimizer norms stay finite and non-negative — no NaN propagation into a descent step.",
      area: "Optimizers",
    },
    {
      name: "normal_pdf_no_panic",
      establishes: "The normal density is total: no input panics, including subnormals and infinities.",
      area: "Distributions",
    },
  ] satisfies Proof[],
};

export const projects: Project[] = [
  {
    slug: "stats-claw",
    name: "stats-claw",
    tagline: "Data science on the hot path",
    status: "public",
    period: "2026 – present",
    summary:
      "In-process statistical computing for Rust — distributions, hypothesis tests, and resampling — with zero runtime dependencies, validated against scipy.",
    detail: [
      "The Rust ecosystem has strong data pipelines and inference, but no classical hypothesis-test suite with scipy-grade p-values. That gap is the crate's reason to exist.",
      "std-only: no BLAS, no LAPACK, no transitive supply chain. It compiles in seconds and drops into any Rust binary, including constrained targets.",
      "Fourteen distribution families with pdf/pmf, cdf, quantile, moments, log-space tails, and seeded sampling. Exact and asymptotic p-values across t, ANOVA, χ², Fisher, Mann–Whitney, Wilcoxon, Kruskal–Wallis, KS, and Shapiro.",
      "Every numeric is checked against committed golden fixtures generated from the reference Python libraries, to tolerances documented per area.",
    ],
    stack: ["Rust", "Kani", "Miri", "scipy equivalence", "SplitMix64"],
    links: [
      { label: "crates.io", href: "https://crates.io/crates/stats-claw" },
      { label: "docs.rs", href: "https://docs.rs/stats-claw" },
      { label: "GitHub", href: "https://github.com/nitrotap/stats-claw" },
    ],
    highlights: [
      { label: "Runtime dependencies", value: "0" },
      { label: "Distribution families", value: "14" },
      { label: "Tolerance vs. scipy", value: "1e-12" },
    ],
  },
  {
    slug: "yee-claw",
    name: "yee-claw",
    tagline: "An ontology as a type system",
    status: "private",
    period: "2026 – present",
    summary:
      "An ontological application builder for verified code generation. A TypeDB ontology is the source of truth; a zero-dependency generator compiles it into the Rust type layer that hand-written numerics are built against.",
    detail: [
      "Abstract entities become marker traits with the hierarchy preserved; concrete entities become structs carrying every inherited attribute and implementing each ancestor trait.",
      "Two grouping layers: domain by subtyping, and user intent by relation.",
      "The generated types are skeletons — the numerics are written by hand against them, then proven.",
      "stats-claw is a mechanical carve-out of this workspace, produced by a configurable tool rather than copied by hand.",
    ],
    stack: ["Rust", "TypeDB", "TypeQL", "Kani", "Miri", "Code generation"],
    links: [],
    highlights: [
      { label: "Kani harnesses", value: "72" },
      { label: "Files under proof", value: "44" },
    ],
  },
  {
    slug: "cobol-coder",
    name: "cobol-coder",
    tagline: "A small model that reads COBOL",
    status: "public",
    period: "2026",
    summary:
      "A Qwen2 0.5B fine-tune for COBOL system understanding, trained with Unsloth and Hugging Face Transformers.",
    detail: [
      "Part of a broader effort to give language models useful competence on legacy mainframe code, where training data is scarce and the cost of a wrong answer is high.",
      "Companion to a rebuilt evaluation harness — the fine-tune and the thing that measures it were built together, deliberately.",
      "Sits alongside larger fine-tunes of Llama 3.2, Granite, and DeepSeek for the same domain.",
    ],
    stack: ["Python", "Unsloth", "Hugging Face Transformers", "Qwen2", "PyTorch"],
    links: [{ label: "Hugging Face", href: "https://huggingface.co/nitrotap/cobol-coder" }],
    highlights: [
      { label: "Base model", value: "Qwen2 0.5B" },
      { label: "Precision", value: "BF16" },
    ],
  },
  {
    slug: "coboleval",
    name: "COBOLEval",
    tagline: "Measuring generated COBOL",
    status: "public",
    period: "2026",
    summary:
      "A substantial rebuild of bloop's COBOL code-generation benchmark, adding JCL static analysis, an agentic orchestrator, and local inference.",
    detail: [
      "Built on bloop.ai's transpilation of OpenAI's HumanEval into COBOL — the benchmark data and original transpiler are theirs, and the dataset is unchanged.",
      "Added a JCL parser, validator, and linter for mainframe job control — static analysis only; it does not execute or submit jobs.",
      "Added a Rig-based agentic evaluation orchestrator in Rust, with per-task JSONL conversation logging.",
      "Added Ollama support so evaluation runs against local models without an API round-trip.",
    ],
    stack: ["Rust", "Python", "JCL", "Rig", "Ollama", "GnuCOBOL", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/nitrotap/COBOLEval" },
      { label: "Upstream (bloop.ai)", href: "https://github.com/bloopai/COBOLEval" },
    ],
    highlights: [
      { label: "Benchmark tasks", value: "146" },
      { label: "Rust vs. upstream", value: "3.8×" },
    ],
  },
  {
    slug: "telesto-platform",
    name: "Telesto platform",
    tagline: "Federated multi-tenant infrastructure",
    status: "private",
    period: "2026 – present",
    summary:
      "A federated platform serving multiple brands and customers from one codebase, with an ontology-backed data layer and infrastructure managed as code.",
    detail: [
      "Multi-tenant branding resolved at the document level, so marketing surfaces and product apps ship from a single build.",
      "Contract-first internal packages separating the kernel, adapters, and the ontology transport.",
      "Deployment managed with Ansible across VPS hosts — nginx, systemd, and containerised services, with error tracking in place.",
      "Two customer engagements running on it.",
    ],
    stack: [
      "TypeScript",
      "TanStack Start",
      "PostgreSQL",
      "Drizzle",
      "TypeDB",
      "Docker",
      "Ansible",
      "Turborepo",
    ],
    links: [],
  },
  {
    slug: "proximal",
    name: "Proximal",
    tagline: "Training data for verified code generation",
    status: "private",
    period: "2026 – present",
    summary:
      "A continuously running pipeline that streams, enriches, and exports GitHub pull request data as structured training sets — with a Rust-specific subset feeding the code-generation work.",
    detail: [
      "Ingests from the public GitHub Archive rather than the API, so it runs continuously at no API cost.",
      "Enriches merged pull requests with diffs, reviews, and commits, then exports JSONL datasets.",
      "Language filters are refreshed on a schedule to keep the Rust subset current.",
      "Deduplicated on GitHub event IDs; merged pull requests only, as the higher-signal population.",
    ],
    stack: ["TypeScript", "PostgreSQL", "Docker", "GH Archive", "JSONL"],
    links: [],
  },
  {
    slug: "city-code-assistant",
    name: "City Code Assistant",
    tagline: "Retrieval over municipal code",
    status: "public",
    period: "2025 – 2026",
    summary:
      "A retrieval-augmented assistant over a city's municipal code — ask it to draft a checklist for a special events permit and it answers from the ordinance text.",
    detail: [
      "Municipal code is long, cross-referential, and rarely read by the people it governs; retrieval over the actual text beats a model's recollection of it.",
      "Vector store built from the ordinance corpus, queried through a chat interface.",
    ],
    stack: ["JavaScript", "OpenAI API", "RAG", "Vector store"],
    links: [
      { label: "GitHub", href: "https://github.com/nitrotap/city-code-assistant" },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    slug: "verification",
    name: "Verification & correctness",
    summary:
      "Establishing that software does what it claims — by proof where the domain allows it, and by disciplined measurement everywhere else.",
    items: [
      "Kani (bounded model checking)",
      "Miri (undefined-behaviour detection)",
      "Property and invariant design",
      "Reference-equivalence testing",
      "Deterministic PRNG design",
      "Playwright end-to-end testing",
      "Jest / Vitest",
      "Mechanical quality gates",
    ],
  },
  {
    slug: "ai-engineering",
    name: "AI engineering",
    summary:
      "Fine-tuning small models for domains with scarce data, and building the agent systems and evaluation harnesses around them.",
    items: [
      "LLM fine-tuning (Unsloth, Hugging Face Transformers)",
      "Qwen, Llama 3.2, Granite, DeepSeek",
      "OpenAI Agents SDK",
      "LangChain / LangSmith",
      "Model Context Protocol (MCP)",
      "Multi-agent architectures",
      "Harness-level evals and graders",
      "Hallucination detection",
      "Retrieval-augmented generation",
      "Vector stores",
      "Azure OpenAI",
      "Anthropic Claude, OpenAI GPT",
    ],
  },
  {
    slug: "symbolic-ai",
    name: "Symbolic AI & knowledge representation",
    summary:
      "Formal schemas that give a reasoner something to traverse and a model something to be held to.",
    items: [
      "TypeDB / TypeQL",
      "Agentic and domain ontologies",
      "Ontology-driven code generation",
      "LinkML",
      "Semantic web (Jena, RDF)",
      "Datalog stores",
    ],
  },
  {
    slug: "languages",
    name: "Languages",
    summary: "Working proficiency across systems, application, and statistical languages.",
    items: [
      "Rust",
      "TypeScript / JavaScript",
      "Python",
      "Kotlin",
      "SQL",
      "COBOL / JCL",
      "PHP",
      "Java",
      "R / SAS",
      "OCaml / ReasonML",
    ],
  },
  {
    slug: "web",
    name: "Web & product",
    summary:
      "Full-cycle application development, from design system through to production deployment.",
    items: [
      "React",
      "Next.js",
      "TanStack Start",
      "Angular",
      "Ionic / Capacitor",
      "Astryx",
      "Radix UI",
      "Tailwind CSS",
      "Drizzle ORM",
      "better-auth",
      "GraphQL / Apollo",
      "Express.js",
    ],
  },
  {
    slug: "data",
    name: "Data",
    summary: "Relational, document, graph, and vector stores.",
    items: [
      "PostgreSQL",
      "TypeDB",
      "MySQL / MariaDB",
      "MongoDB",
      "pgvector",
      "Sequelize / Mongoose",
    ],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure & delivery",
    summary:
      "Running services in production — provisioning, deployment, monitoring, and the pipelines between them.",
    items: [
      "Docker",
      "Ansible",
      "nginx",
      "systemd",
      "VPS administration",
      "AWS",
      "Azure",
      "Vercel",
      "CI/CD pipelines",
      "Turborepo / pnpm",
      "Sentry",
    ],
  },
  {
    slug: "statistics",
    name: "Statistics",
    summary:
      "A master's degree, and the discipline underneath the numerical work.",
    items: [
      "Hypothesis testing",
      "Bayesian statistics",
      "Resampling and bootstrap",
      "Regression and regularisation",
      "Clustering and decomposition",
      "Change-point detection",
      "Predictive modelling",
      "Time series analysis",
    ],
  },
];

export const experience: Role[] = [
  {
    company: "Phase Change Software",
    title: "Software Engineer",
    period: "November 2023 – Present",
    location: "Hybrid",
    arrangement: "Full-time",
    highlights: [
      "Building a neurosymbolic AI agent with autonomous A2UI integration.",
      "Developed harness-level evaluations with graders for accuracy and hallucination detection across agentic applications and MCP, integrated with LangSmith.",
      "Developed agentic and domain ontologies.",
      "Migrated the company website from WordPress to React/Next.js, raising Lighthouse scores from 60–80% to 99–100% and reaching top-10 search rankings.",
      "Fine-tuned small language models — Qwen, Llama 3.2, Granite, DeepSeek — for COBOL system understanding using Python and Hugging Face Transformers.",
      "Built ReasonReact components and established the unit testing framework; developed Angular prototypes with AI agent features.",
      "Managed the CI/CD pipeline with weekly deployments and 300+ Playwright tests.",
    ],
  },
  {
    company: "edX",
    title: "Instructional Specialist",
    period: "March 2023 – December 2023",
    location: "Remote",
    arrangement: "Contract",
    highlights: [
      "Supported classroom metrics and discussion facilitation.",
      "Managed student attendance and troubleshot student problems.",
      "Worked with a diverse classroom to enable high completion rates.",
    ],
  },
  {
    company: "ATHENA Consulting",
    title: "Web Development Intern",
    period: "July 2023 – November 2023",
    location: "Golden, Colorado",
    arrangement: "Part-time",
    highlights: [
      "Designed and developed a client website.",
      "Applied modern design principles to resolve mobile issues.",
      "Managed the project against deliverables and deadlines.",
    ],
  },
  {
    company: "Epic",
    title: "Application Coordinator, Implementation Services",
    period: "April 2011 – January 2013",
    location: "Verona, Wisconsin",
    highlights: [
      "Led the Epic implementation in Omaha, Nebraska.",
      "Coordinated the rollout across a team of five analysts.",
      "Owned day-to-day troubleshooting plus oversight and task management for the build team.",
      "Served as primary point of contact for customer questions and internal workflow support.",
    ],
  },
];

export const education: Credential[] = [
  {
    institution: "CompTIA",
    award: "A+ Certification",
    period: "Issued February 2024 · Expires February 2027",
  },
  {
    institution: "Regis University",
    award: "Certificate, Web Development",
    period: "August 2022 – June 2023",
    note: "16-credit program in web development and software engineering — PHP, AJAX, Angular, REST, D3, Cordova.",
  },
  {
    institution: "University of Minnesota Boot Camps",
    award: "Certificate, Full Stack Web Development",
    period: "December 2021 – June 2022",
  },
  {
    institution: "University of Pittsburgh",
    award: "Master of Science, Statistics",
    period: "August 2009 – August 2010",
  },
  {
    institution: "University of Pittsburgh",
    award: "Bachelor of Science, Statistics",
    period: "2006 – 2009",
  },
];

export const navLinks: Link[] = [
  { label: "Verification", href: "/verification" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Writing", href: "/blog" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getSkillGroup(slug: string) {
  return skillGroups.find((s) => s.slug === slug) ?? null;
}
