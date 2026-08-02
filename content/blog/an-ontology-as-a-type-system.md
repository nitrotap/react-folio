---
title: "An ontology as a type system"
date: "2026-07-06"
description: "The type layer of a Rust statistics library, generated from a TypeDB ontology. Not codegen for its own sake — a place to put domain knowledge where the compiler can enforce it."
tags: ["rust", "typedb", "ontologies", "codegen"]
draft: false
---

Every statistics library eventually invents a taxonomy. Some distributions are continuous, some discrete. Some have a mean, some famously don't. Some tests are parametric, some aren't; some return an effect size and some have no defined one.

That taxonomy usually lives in three places at once: partially in the trait hierarchy, partially in the docs, and mostly in the head of whoever wrote it. The three drift.

So I put it in one place and generated the rest.

## The shape

The `ds` ontology is a TypeDB namespace — entities, attributes, relations, and the subtyping between them. It is the source of truth. A generator with no dependencies outside `std` reads it and emits the Rust type layer:

```
ds ontology (TQL)  ──gen-ontology──▶  src/generated.rs  ──▶  hand-written math
  entities/attrs                       15 traits              (src/math.rs, …)
  relations/functions                  140 structs
```

Two rules do most of the work:

**Abstract entities become marker traits, with the hierarchy preserved.** If the ontology says a normal distribution is a `Distribution`, which is a `StatisticalConstruct`, which is an `AbstractEntity`, the generated Rust says exactly that:

```rust
pub trait Distribution: StatisticalConstruct {}
pub trait StatisticalConstruct: AbstractEntity {}
```

**Concrete entities become structs** carrying every inherited attribute and implementing every ancestor trait. Add an attribute to a parent in the ontology and it appears on every descendant struct on the next generation, or the build breaks. There is no version of this where the docs and the types disagree, because the docs aren't the source — the ontology is.

There's a second grouping layer that turned out to matter more than expected: domain grouping by subtyping (statistics vs. machine learning), and *intent* grouping by relation. Intent is the thing a user actually arrives with — "find the communities," "test whether these differ" — and it cuts across the type hierarchy. A relation expresses that without contorting the subtyping.

## What is not generated

The numerics. All of them.

The generated types are skeletons — parameter structs, trait impls, the shape of the thing. Every incomplete gamma function, every exact p-value, every ziggurat table is written by hand against those skeletons.

This is the part I'd defend hardest. Generating a type layer from a schema is a well-understood trade: you accept a build step and you get a guarantee that the taxonomy is internally consistent. Generating *numerical methods* is a different proposition entirely, and the failure mode is silent wrongness in the fourth decimal place. The line sits exactly where the interesting judgement starts.

## Carving a public crate out of it

The workspace is large and most of it isn't ready to be public API. The published `stats-claw` crate is carved out of it mechanically, driven by a config file rather than by copying:

```
include_family = StatisticalConstruct
include_family = LearningConstruct
exclude_family = Intent
exclude_family = Theorem
exclude_family = ComputationalMethod
```

The carve decides what ships by walking the same ontology the types came from. Families that represent internal composition or theory layers never leave the workspace. Because the rule is expressed against the ontology and not against file paths, adding a new entity puts it on the correct side of the boundary automatically.

A second ontology would carve with only a profile change — no family name, namespace, or path is baked into the tool.

## Was it worth it

For a library this size, honestly: the generator took longer than hand-writing 140 structs would have.

What it bought is that the taxonomy can now be *wrong in exactly one place*. When I decided that a result type belonged under a different family, that was a one-line ontology edit and a regeneration, not an afternoon of grepping for every place the old assumption had been written down.

That's the same reason the proofs exist. Not because the code is hard, but because the invariants are easy to state and expensive to lose.
