# Portfolio Rebuild — Design

**Date:** 2026-07-31
**Owner:** Kartik Jevaji (`nitrotap`)
**Repo:** `react-folio-2` → deployed at `nitrotap.dev`

---

## 1. Why

The current site is wrong on facts, not merely stale. It says Denver (he lives in
St. Paul), "Full Stack Web Developer" (he is a Full Stack AI Engineer), "Phase Change
2022–Present" (Nov 2023), and "2+ years experience". It lists Uber driving as a headline
role. It omits every employer between 2011 and 2023. Its hero copy is generated filler
("Transform your ideas into reality with cutting-edge web and AI solutions").

It is also broken: project screenshots point at `/public/ai-*.png`, which is both the
wrong path convention for Next.js and a file that does not exist; dark mode sets
`--background: #fff` while body text is hardcoded dark; `tailwind.config.ts` is a
Tailwind v3 config under Tailwind v4, so the custom palette never loads.

Most importantly, it describes a generic full-stack developer. The actual body of work is
a single coherent thesis, and none of it is on the site.

## 2. Thesis

**Neural generates. Symbolic verifies.**

Every project is the same shape:

- `yee-claw` — a TypeDB ontology generates the Rust type system; hand-written numerics sit
  on the generated types; **72 Kani proof harnesses** verify invariants over all inputs;
  scipy equivalence checks the numbers empirically; Miri backstops UB.
- `cobol-coder` + `COBOLEval` — fine-tune a model to write COBOL, then build the harness
  that measures whether it did.
- Agent work — harness-level evals with graders and hallucination detection for the
  behaviour that cannot be proven; a symbolic verifier loop for the behaviour that can.
- `Proximal` — scrape real Rust PRs to fine-tune on, feeding verified code generation.

The through-line is **trust nothing; verify everything**, applied from agent loops down to
floating-point numerics. Positioning target: **security-focused AI engineering**.

## 3. Audience & disclosure

**Audience:** hiring. This is a personal portfolio, not a Telesto shop front.

**Disclosure rule:** *claim capabilities and outcomes from all work; link only what is
public.* This is what the existing resume already does. Specifically:

| Work | Claim | Link |
|---|---|---|
| `stats-claw` | yes | crates.io / docs.rs / GitHub |
| `cobol-coder` | yes | HuggingFace |
| `COBOLEval` | yes | GitHub |
| `city-code-assistant` | yes | GitHub |
| `yee-claw` (private) | yes, described | no repo link |
| Telesto `platform`, `proximal` (private) | yes, described | no repo link |
| Phase Change internal tooling | resume-level abstraction only | no |

Nothing on the site may assert something a reader cannot verify or that we have not
confirmed. Two claims were caught overstated during design and must stay corrected:
Kani proofs live in `yee-claw`, not in published `stats-claw` 0.1.0 (see §7); and
`COBOLEval` is a substantial rebuild of bloop's benchmark with upstream attribution
retained, not original authorship of the benchmark itself.

## 4. Structure

| § | Section | Content |
|---|---|---|
| 00 | Hero | Thesis, role, St. Paul MN, links |
| 01 | Three pillars | Formal verification · AI security & evaluation · Symbolic grounding |
| **02** | **Verification** | **Centerpiece.** Named Kani harnesses, what each guarantees, proof-vs-test, Miri, scipy equivalence, zero-unsafe with the self-enforcing `gates.rs` invariant |
| 03 | Selected work | stats-claw, yee-claw, cobol-coder + COBOLEval, Telesto platform, Proximal |
| 04 | Experience | Phase Change (Nov 2023–), ATHENA, edX, Epic (2011–13) |
| 05 | Education | Pitt MS + BS Statistics, Regis, UMN, CompTIA A+ |
| 06 | Contact | kartikinpublic@gmail.com, github/nitrotap, linkedin/kjevaji |

§02 is the differentiator. Real harness names rendered as artifacts —
`resampling_permutation_is_bijection`, `moments_variance_non_negative`,
`p2_positions_strictly_increasing`, `rng_next_f64_in_unit_interval` — each with the
invariant it establishes. No other portfolio has this page.

## 5. Visual direction

**Neumorphism**, per the `Neumorphism` entry in the existing Design Style Library artifact:
ground `#e0e5ec`, ink `#3a4252`, muted `#8a94a6`, accent `#6a7bff`, system sans.

**Accessibility constraint — non-negotiable.** The specced muted-on-ground pair is roughly
2.3:1 against a 4.5:1 WCAG AA requirement. The site argues its author is rigorous; a
reviewer impressed by "Lighthouse 99–100" will run Lighthouse. Therefore:

- Soft dual-shadow extrusion applies to **surfaces** — cards, wells, proof tiles — where
  the effect reads best anyway.
- **All text meets AA.** Darken the muted tone; never set body copy in it at small sizes.
- **Visible focus rings** on every interactive element; neumorphic controls are notoriously
  ambiguous about affordance.
- Verify with an automated audit before ship. Target: Lighthouse accessibility 100.

## 6. Stack

- **Next.js 15 static export** — `output: "export"` is already configured.
- **Astryx** (`@astryxdesign/core`, `@astryxdesign/theme-neutral`, CLI) for components.
  Themes are CSS custom property overrides, so Neumorphism ships as a theme, not a fork.
  `swizzle` to eject a component if one needs deeper change.
- **Delete `tailwind.config.ts`** — v3 format, inert under v4. Tailwind v4 CSS-first for
  layout only.
- **Keep the `siteData.ts` pattern.** Data-driven sections is a sound design; the data is
  what is wrong, not the architecture. Rewrite the data, fix `Project.screenshot` paths,
  delete the three dead `HeroSection` variants and the unused `minimal`/`split` branches.
- Replace raw `<img>` with `next/image` where static export permits.

## 7. Sequencing

1. **Cut `stats-claw` 0.2.0 with the Kani blocks carved through**, plus the
   `VERIFICATION.md` the carve config already reserves. Published 0.1.0 predates the
   verification work, so §02 currently rests on a private repo. This release converts the
   site's strongest claim from unverifiable to citable. *In progress via background agent,
   under a hard constraint that nothing but the statistics package and its Kani proofs
   leaves `yee-claw`.*
2. **Write the `cobol-coder` model card.** The model is public with no card at all — a
   free credibility win, and it completes the fine-tune → evaluate story.
3. **Fix the `COBOLEval` README CI badge**, which still points at `bloopai` and causes
   readers to misattribute the rebuild.
4. Build the site.

## 8. Skills taxonomy

Replaces the current undifferentiated ~100-item list.

- **Verification & correctness** — Kani, Miri, model checking, deterministic PRNG design,
  reference-equivalence testing, Playwright E2E (300+), Jest/vitest
- **AI engineering** — LLM fine-tuning (Unsloth, HuggingFace Transformers; Qwen, Llama 3.2,
  Granite, DeepSeek), agents (OpenAI Agents SDK, LangChain/LangSmith, MCP, multi-agent,
  A2UI), harness-level evals and graders, hallucination detection, RAG, vector stores
- **Symbolic & knowledge representation** — TypeDB/TypeQL, agentic and domain ontologies,
  ontology→type code generation, LinkML
- **Languages** — Rust, TypeScript, Python, Kotlin, SQL, COBOL/JCL, PHP, Java, R, OCaml/ReasonML
- **Web** — React, Next.js, TanStack Start, Angular, Ionic, Tailwind, Radix, Drizzle,
  better-auth, GraphQL/Apollo
- **Data** — PostgreSQL, TypeDB, MySQL/MariaDB, MongoDB, pgvector
- **Infrastructure** — Docker, Ansible, nginx, systemd, VPS, AWS, Azure, Vercel, CI/CD,
  Turborepo/pnpm, Sentry

## 9. Naming

Keep `stats-claw`. Crates are discovered through crates.io, docs.rs, and lib.rs — not
domains. Renaming a published crate forfeits the docs.rs URL and version history for no
gain. Separately: NS lookups for `statsclaw.io`, `stats-claw.dev`, `statsclaw.dev`,
`statsclaw.rs`, and `yeeclaw.dev` all fail to resolve, including `statsclaw.io` —
re-check at a registrar, as the "taken" reading may have been a parked or premium listing.
`nitrotap.dev/stats-claw` costs nothing regardless.

## 10. Open questions

- Final headline wording. *Neural generates. Symbolic verifies.* is the current proposal;
  the existing Direction A artifact used "Neurosymbolic AI, and the statistics underneath it."
- Whether Telesto gets a named section or stays implicit in experience.
- Whether to add short written pieces (Kani numerics, ontology-driven codegen). High value
  for the hiring goal, but scope beyond this spec.
