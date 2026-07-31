/**
 * Kani proof harnesses, quoted verbatim from the source — including their doc
 * comments, which is where the reasoning for each bound actually lives.
 *
 * Every harness here is one that carves through to the published `stats-claw`
 * crate, so a reader can check it against crates.io rather than take it on
 * faith. Nothing from the private composition layer appears.
 */

export interface Harness {
  /** Function name, matching the entry in `verification.proofs`. */
  name: string;
  /** Path within the crate's `src/`, shown as the code block's title. */
  file: string;
  /** Verbatim source. Do not reformat — it is quoted, not authored. */
  code: string;
}

export const harnesses: Harness[] = [
  {
    name: "resampling_permutation_is_bijection",
    file: "resampling/schemes.rs",
    code: "/// Proves [`permutation`] returns a genuine bijection of `0..N` for *every*\n/// generator state: length `N`, every element in `0..N`, and each index\n/// appearing exactly once. The Fisher\u2013Yates swaps draw `j = uniform_index(i+1)`\n/// with `j <= i < N`, so every `swap(i, j)` is in bounds \u2014 Kani discharges the\n/// slice-access safety while the `seen` tally proves no index is dropped or\n/// duplicated. `N = 4` keeps the three symbolic swaps tractable.\n#[kani::proof]\n#[kani::unwind(8)]\nfn resampling_permutation_is_bijection() {\n    const N: usize = 4;\n    let state: u64 = kani::any();\n    let mut rng = SplitMix64::new(state);\n    let perm = permutation(N, &mut rng);\n    assert!(perm.len() == N, \"permutation length changed from {N}\");\n    let mut seen = [false; N];\n    for &v in &perm {\n        assert!(v < N, \"permutation produced an out-of-range index {v}\");\n        assert!(!seen[v], \"permutation repeated index {v}\");\n        seen[v] = true;\n    }\n    assert!(seen.iter().all(|&s| s), \"permutation dropped an index\");\n}",
  },
  {
    name: "moments_variance_non_negative",
    file: "streaming/moments.rs",
    code: "/// Proves that after any three symbolic magnitude-bounded (`|x| \u2264 MAX_ABS`)\n/// updates the accumulator neither panics nor overflows and reports a\n/// non-negative, non-`NaN` variance. Kani confirms the sign argument survives\n/// `f64` rounding, not just in exact arithmetic.\n///\n/// The `M2` update adds `delta \u00b7 delta2`, whose two factors are\n/// `(x \u2212 mean_old)` and `(x \u2212 mean_new) = delta \u00b7 (n\u22121)/n`; they share a sign,\n/// so the exact product is `\u2265 0` and the fused multiply-add of two non-negative\n/// reals rounds to a non-negative `f64`. Hence `M2 \u2265 0`, and the Bessel divisor\n/// `n \u2212 1 > 0` once `count \u2265 2`, so `variance() \u2265 0`. (`assert!(v >= 0.0)` also\n/// rejects `NaN`, which is never `\u2265 0`.) Three updates suffice to exercise the\n/// `count \u2265 2` variance path; the loop-free unrolling needs no unwind bound.\n#[kani::proof]\nfn moments_variance_non_negative() {\n    let mut m = RunningMoments::new();\n    m.update(any_bounded());\n    m.update(any_bounded());\n    m.update(any_bounded());\n    let v = m.variance();\n    assert!(v >= 0.0, \"variance was negative or NaN: {v}\");\n    assert_eq!(m.count(), 3, \"count diverged from the number of updates\");\n}",
  },
  {
    name: "p2_positions_strictly_increasing",
    file: "streaming/p2.rs",
    code: "/// Proves that for a symbolic quantile `p \u2208 [0, 1]` and any sequence of seven\n/// symbolic bounded observations, [`P2Quantile::update`] never panics or\n/// overflows and the integer `positions` array stays strictly increasing after\n/// every update \u2014 including through the post-bootstrap parabolic/linear path.\n///\n/// Strictly-increasing positions are the precondition that makes every\n/// fixed-index `positions`/`heights` access in this module provably in bounds,\n/// so this harness is the formal discharge of the scoped\n/// `allow(clippy::indexing_slicing)`.\n///\n/// The `#[kani::unwind(8)]` bound fully unrolls the estimator's internal\n/// fixed-length loops (all `0..5` / `1..4` / `0..4`) and the seven-step update\n/// loop; no loop is input-length dependent.\n#[kani::proof]\n#[kani::unwind(8)]\nfn p2_positions_strictly_increasing() {\n    let p: f64 = kani::any();\n    kani::assume(p >= 0.0);\n    kani::assume(p <= 1.0);\n    let mut q = P2Quantile::new(p);\n    assert_positions_ascending(&q);\n    for _ in 0..UPDATES {\n        q.update(any_obs());\n        assert_positions_ascending(&q);\n    }\n}",
  },
  {
    name: "rng_next_f64_in_unit_interval",
    file: "rng.rs",
    code: "/// Proves [`SplitMix64::next_f64`] lands in the half-open unit interval\n/// `[0.0, 1.0)` for *every* possible generator state \u2014 the uniform-sampler\n/// contract the whole distributions layer builds on, verified symbolically\n/// rather than over the 10 000 sampled draws the unit test checks.\n#[kani::proof]\nfn rng_next_f64_in_unit_interval() {\n    let state: u64 = kani::any();\n    let mut rng = SplitMix64::new(state);\n    let u = rng.next_f64();\n    assert!(u >= 0.0, \"next_f64 produced a negative value: {u}\");\n    assert!(u < 1.0, \"next_f64 reached or exceeded 1.0: {u}\");\n}",
  },
];

export function getHarness(name: string): Harness | null {
  return harnesses.find((h) => h.name === name) ?? null;
}
