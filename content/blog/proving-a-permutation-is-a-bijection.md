---
title: "Proving a permutation is a bijection"
date: "2026-07-20"
description: "A statistics library is a bad fit for testing alone. The interesting failures are index arithmetic and structural invariants nobody writes a test for — so I model-check them instead."
tags: ["rust", "kani", "verification"]
draft: false
---

There is a bug I kept thinking about while writing a resampling module.

A permutation test shuffles labels and recomputes a statistic. The shuffle has to be a genuine permutation — every index appearing exactly once. If it isn't, nothing crashes. No assertion fires. You get p-values that are subtly, quietly wrong, and you find out months later when a result won't replicate.

A unit test doesn't help much here. You can shuffle a thousand arrays and check each one, and you have learned something about a thousand arrays. The property you actually want is about *all* of them.

## What model checking buys you

Kani is a bounded model checker for Rust. You write a harness that says "for any input in this space, this must hold," and it either proves it or hands you a counterexample. Not a failing case it happened to sample — a constructed witness.

```rust
#[cfg(kani)]
mod verification {
    use super::*;

    #[kani::proof]
    fn resampling_permutation_is_bijection() {
        let n: usize = kani::any();
        kani::assume(n > 0 && n <= 6);

        let idx = permutation_indices(n, &mut seeded_rng());

        // Every position is hit exactly once.
        let mut seen = [false; 6];
        for &i in idx.iter() {
            assert!(i < n);
            assert!(!seen[i]);
            seen[i] = true;
        }
    }
}
```

The bound matters and it's the honest caveat: this proves the property for `n` up to 6, not for all `n`. Bounded model checking is bounded. But index-arithmetic bugs essentially always show up in small cases — off-by-one at the boundary, a swap that reads before it writes — and a proof over every arrangement of six elements is a stronger statement than a thousand random draws of a hundred.

## What ended up under proof

The suite is 72 harnesses across 44 files. A few that earned their place:

- `resampling_kfold_test_sets_partition` — k-fold test sets partition the dataset. No sample held out twice, none silently dropped. This is the one I'd most expect to rot during a refactor.
- `moments_variance_non_negative` — Welford's online update can't produce a negative variance. It's a subtraction of accumulated quantities, and a naive implementation absolutely can go negative through cancellation.
- `p2_positions_strictly_increasing` — the P² quantile estimator maintains five markers that must stay ordered. The whole algorithm is meaningless if they cross.
- `rng_next_f64_in_unit_interval` — generated floats land in `[0, 1)`. The half-open interval is load-bearing; a `1.0` escaping into an inverse-CDF call produces an infinity.
- `ziggurat_table_indices_in_bounds` — the ziggurat sampler's table lookups stay in range for every candidate it generates.

None of these are exotic. They're the things you'd assert in a code review and then never check again.

## Where it sits in the build

The harnesses live in `#[cfg(kani)] mod verification` blocks next to the code they constrain. The `kani` cfg is registered in the workspace lints, so ordinary builds don't see them and don't pay for them. The crate keeps its zero-runtime-dependency guarantee — Kani never appears in `[dependencies]`.

The full suite takes north of twenty minutes, which is too slow for a pre-commit hook and fine for a release gate. That's where it runs.

Miri covers what Kani can't. Model checking reasons about a bounded input space; Miri executes the real test suite under an interpreter that detects undefined behaviour. Different tools, different blind spots.

And underneath both, the numbers still get checked empirically — every distribution, test, and estimator validated against `scipy.stats`, `scikit-learn`, `ruptures`, and `mlxtend` via committed golden fixtures, to tolerances between 1e-8 and 1e-12. Proof establishes structure. It does not tell you your incomplete gamma function is correct.

## The part I didn't expect

The most useful artefact wasn't a proof. It was a test called `gates.rs` that walks the source tree and fails the build if any `unsafe` block lacks a `// SAFETY:` justification on one of the three preceding lines.

The codebase contains no `unsafe` at all. The gate has never caught anything. It exists so that the day someone relaxes the lint for a SIMD path, the justification is not optional — the invariant is enforced by the build rather than by whoever reviews the PR.

That's the same instinct as the proofs, just cheaper. Most of what goes wrong in a codebase goes wrong because a rule lived in someone's head instead of in the build.
