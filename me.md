# Kartik Jevaji

Full Stack AI Engineer · M.A. Statistics · St. Paul, MN
(412) 638-3064 · kartikinpublic@gmail.com
[nitrotap.dev](https://www.nitrotap.dev) · [github.com/nitrotap](https://github.com/nitrotap) · [linkedin.com/in/kjevaji](https://www.linkedin.com/in/kjevaji) · [huggingface.co/nitrotap](https://huggingface.co/nitrotap)

Software engineer building AI systems and the machinery that establishes whether they work. Ontologies and automated-reasoning agents that keep language models honest; evaluation harnesses with graders where proof does not apply; formal verification where it does. Master's in statistics, an enterprise implementation background, and full ownership from schema through interface to production deploy.

---

## Experience

### Phase Change Software — Software Engineer

Nov 2023 – Present · Hybrid

- Building a neurosymbolic AI agent with autonomous A2UI integration.
- Introduced harness-level evaluations and graders for accuracy and hallucination detection across agentic applications and MCP servers, integrated with LangSmith. Adopted internally by QA.
- Developed agentic and domain ontologies.
- Fine-tuned small language models (Qwen, Llama 3.2, Granite, DeepSeek) for COBOL system understanding using Python and HuggingFace Transformers.
- Own the CI/CD pipeline: weekly production deployments gated by 300+ Playwright end-to-end tests, with code review and production support.
- Migrated the company website from WordPress to React/Next.js, raising Lighthouse from 60–80% to 99–100% and reaching top-10 search rankings.
- Built a ReasonReact component library and established the team's unit testing framework; developed Angular prototypes with embedded agent features.

### edX — Instructional Specialist

Mar 2023 – Dec 2023 · Contract, Remote

- Supported a full-stack web development classroom: tracked metrics, led discussions, and troubleshot student issues to drive high completion rates.

### ATHENA Consulting — Web Development Intern

Jul 2023 – Nov 2023 · Part-time · Golden, CO

- Designed and delivered a client website on schedule, applying responsive design to resolve mobile usability issues.

### Epic — Application Coordinator, Implementation Services

Apr 2011 – Jan 2013 · Verona, WI

- Led the Epic implementation in Omaha, NE: coordinated the rollout across five analysts, owned day-to-day troubleshooting and task management for the build team, and served as primary point of contact for customer questions.

### Alzheimer's Association — Volunteer, Data Entry / Tech Support

2017 – 2022 · Denver, CO

- Maintained accuracy of key database identifiers; provided on-demand technical support during education classes; automated processes with the Google Sheets API.

---

## Projects

### stats-claw — Rust statistical computing

[crates.io](https://crates.io/crates/stats-claw) · [docs.rs](https://docs.rs/stats-claw) · [GitHub](https://github.com/nitrotap/stats-claw)

In-process statistical computing with **zero runtime dependencies** — distributions, hypothesis tests, and resampling, validated against `scipy.stats`, `scikit-learn`, `ruptures`, and `mlxtend` through committed golden fixtures to documented tolerances between 1e-8 and 1e-12.

**68 Kani proof harnesses** in the published crate (72 across the source workspace), each with its bound stated: permutation bijectivity, k-fold partitioning, Welford variance non-negativity, PRNG unit-interval bounds, ziggurat table indices. Miri as the undefined-behaviour backstop. Fourteen distribution families; exact and asymptotic p-values across t, ANOVA, χ², Fisher, Mann–Whitney, Wilcoxon, Kruskal–Wallis, KS, and Shapiro.

### Verus — merged compiler contribution

[PR #2235](https://github.com/verus-lang/verus/pull/2235) · [write-up](https://www.nitrotap.dev/blog/where-the-ghost-code-goes)

Fixed type arguments being dropped during `Ghost`/`Tracked` macro expansion in the Verus verifier, so a turbofish written in source survived to the type checker. Resolves issue #2013, filed by a project maintainer. Merged March 2026.

### yee-claw — ontology-driven verified code generation

*Private.* A TypeDB ontology is the single source of truth; a zero-dependency generator compiles it into the Rust type layer that hand-written numerics are built against. Abstract entities become marker traits with the hierarchy preserved; concrete entities become structs carrying every inherited attribute. `stats-claw` is a mechanical carve-out, produced by a configurable tool rather than copied.

### cobol-coder — small-model fine-tune

[HuggingFace](https://huggingface.co/nitrotap/cobol-coder)

Qwen2 0.5B fine-tuned for COBOL system understanding with Unsloth and HuggingFace Transformers. Part of a broader effort on legacy mainframe code, where training data is scarce and wrong answers are expensive.

### COBOLEval — code-generation benchmark

[GitHub](https://github.com/nitrotap/COBOLEval) · built on [bloop.ai's benchmark](https://github.com/bloopai/COBOLEval)

Substantial rebuild of bloop's HumanEval-to-COBOL transpilation (146 tasks; dataset unchanged). Added a JCL parser, validator, and linter for mainframe job control (static analysis only), a Rig-based agentic evaluation orchestrator in Rust with per-task JSONL conversation logging, Ollama support for local inference, and GnuCOBOL compatibility fixes.

### Telesto platform

*Private.* Federated multi-tenant platform serving several brands from one codebase — contract-first internal packages, ontology-backed data layer, Ansible-managed VPS deployment with nginx and containerised services. Two customer engagements.

### Proximal — training-data pipeline

*Private.* Continuously running pipeline streaming merged pull requests from the public GitHub Archive, enriched with diffs, reviews, and commits, exported as JSONL training sets with language-specific subsets refreshed on schedule. Deduplicated on event ID; no API cost.

### Earlier

- **City Code Assistant** — retrieval over municipal code so a resident can find a permit checklist without reading the ordinance. [GitHub](https://github.com/nitrotap/city-code-assistant)
- **museum-models** — 3D PWA in Ionic React, Three.js
- **electron-kiosk** — cross-platform Electron shell wrapping Three.js
- **Mental Health Check** — mood-tracking PWA. MERN, Apollo/GraphQL, Chart.js
- **Brain Lift** — NASA Task Load Index cognitive-load tracker across web, iOS, Android. LAMP, Angular, Ionic, Capacitor

---

## Technical

**Verification & correctness** — Kani (bounded model checking), Verus (linear ghost types), Miri, property and invariant design, reference-equivalence testing, deterministic PRNG design, Playwright, Jest/Vitest

**AI engineering** — LLM fine-tuning (Unsloth, HuggingFace Transformers; Qwen, Llama 3.2, Granite, DeepSeek), OpenAI Agents SDK, LangChain/LangSmith, MCP, multi-agent architectures, harness-level evals and graders, hallucination detection, RAG and GraphRAG, vector stores, NeMo Guardrails, Azure OpenAI, Anthropic Claude, OpenAI

**Symbolic AI & knowledge representation** — TypeDB/TypeQL, agentic and domain ontologies, ontology-driven code generation, LinkML, Neo4j, semantic web (Jena, RDF), Datalog

**Languages** — Rust, TypeScript/JavaScript, Python, Kotlin, SQL, COBOL/JCL, PHP, Java, R, SAS, OCaml/ReasonML

**Web & product** — React, Next.js, TanStack Start, Angular, Ionic/Capacitor, Three.js, React Three Fiber, Astryx, Radix UI, Tailwind, Drizzle ORM, better-auth, GraphQL/Apollo, Express, Ktor

**Data** — PostgreSQL, TypeDB, MySQL/MariaDB, MongoDB, pgvector, Neo4j

**Infrastructure** — Docker, Ansible, nginx, systemd, VPS administration, AWS (EC2, Lightsail, Route 53), Azure, Vercel, CI/CD, Turborepo/pnpm, Sentry

**Statistics** — hypothesis testing, Bayesian statistics, resampling and bootstrap, regression and regularisation, clustering and decomposition, change-point detection, time series

**Design** — Figma, Sketch, wireframing, design systems, style guides, accessibility (WCAG AA)

---

## Education & Certifications

| | | |
|---|---|---|
| **CompTIA A+** | Certification | Feb 2024 – Feb 2027 |
| **Regis University** | Certificate, Web Development — LAMP | Aug 2022 – Jun 2023 |
| **University of Minnesota** | Certificate, Full Stack Web Development — MERN | Dec 2021 – Jun 2022 |
| **University of Pittsburgh** | M.A. Statistics | Aug 2009 – Aug 2010 |
| **University of Pittsburgh** | B.S. Statistics | 2006 – 2009 |
