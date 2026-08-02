---
title: "Four ways to prove a program right"
date: "2026-07-31"
description: "Kani, Verus, Dafny, and Lean prove different things, and only one of them proves something about the binary you ship. A comparison written from the position of having used exactly one of them."
tags: ["verification", "kani", "verus", "dafny", "lean"]
draft: false
---

My permutation harness proves that a resampler is a bijection for `n` up to six. Someone asked what it would take to prove it for all `n`.

The honest answer is that it would take a different tool. Kani is a bounded model checker, and "bounded" is not a footnote — it is the entire shape of the claim. Six is not infinity. So I went and read the documentation for the three tools people reach for when six isn't enough.

I've shipped work with Kani: 72 harnesses across a Rust statistics library, running as a release gate, with Miri underneath as the undefined-behaviour backstop. I have not *verified a system* in Lean, Dafny, or Verus — though I have contributed to the Verus compiler, which is a different thing and taught me something specific about how ghost code is erased. Everything below about those three comes from their own docs and papers, and I'll flag where I'm reasoning rather than reporting.

## What each one actually proves

**Kani** reuses the rustc frontend and swaps the backend: instead of lowering MIR to LLVM, it lowers MIR to Goto-C and hands the result to CBMC, which encodes program traces as SAT/SMT problems. The Kani docs describe model checking as "non-random and exhaustive (though often only up to some bound on input or problem size)." That parenthesis is the whole game. What you get is a proof over a bounded input space — genuinely exhaustive within the bound, and silent about everything outside it. In exchange you get panics, arithmetic overflow, out-of-bounds indexing, and several classes of undefined behaviour checked by default, with no specification written at all.

**Verus** generates verification conditions from a subset of Rust and discharges them with Z3. No bound. It proves the `requires`/`ensures`/`invariant` clauses you wrote, over all inputs. Its distinguishing idea, from the OOPSLA 2023 paper, is a mode system separating `spec`, `proof`, and `exec` code, where proofs manipulate linear ghost permissions to reason about raw pointers and concurrency. The paper formalises linearity, borrowing, and the modes in a lambda calculus and proves type safety for it — a stronger self-account than most tools in this space offer.

**Dafny** is auto-active verification in its own language, powered by Boogie and Z3, compiling out to a general-purpose language afterwards. Same unbounded, specification-relative guarantee as Verus.

**Lean** is different in kind. It's a dependent type theory where a proof is a term, and a small kernel — a few thousand lines of C++ — checks that term against its type. Tactics, `mathlib`, and every piece of automation sit outside the trusted core and can be arbitrarily buggy without threatening soundness, because the kernel re-checks their output. That's the de Bruijn criterion, and it's why a Lean theorem is the strongest artefact of the four. It's also the reason mathlib can carry over a million lines of formalised mathematics without anyone auditing all of it.

The ordering is real: a Lean theorem > a Verus or Dafny postcondition > a Kani result at bound six. But the ordering runs opposite to effort, and the tools are not substitutes.

## Where the burden sits

Kani gives you the most for free. `cargo kani` on an existing crate checks memory safety and overflow before you have written a single specification. The work is harness design — choosing what's symbolic, what's assumed, and how big the bound can be before the solver stops terminating.

Dafny and Verus are auto-active: you write invariants and contracts, the SMT solver does the reasoning, and when it fails you get a failed proof obligation rather than an explanation. That's the characteristic experience and the characteristic frustration. You are debugging a solver's silence.

Lean inverts it. Automation exists — `simp`, `omega`, `grind` — but the machine is fundamentally a checker, not a searcher. You write the argument.

## Loops, which is where they diverge hardest

Kani unwinds:

```rust
#[kani::unwind(11)]
```

The bound has to be one more than the actual iteration count. Get it wrong and you get an *unwinding assertion* failure, and other properties come back undetermined. I want to be fair to Kani here: it tells you. It does not quietly verify a truncated program and report success. There's also an experimental path — `#[kani::loop_invariant(cond)]` behind `-Z loop-contracts`, with optional `#[kani::loop_decreases(expr)]` — that abstracts loops instead of unrolling them and lifts bounded proofs to unbounded ones. It's marked experimental, so I wouldn't build a release gate on it yet.

Dafny and Verus both want an invariant and a termination measure. Dafny:

```dafny
while i < n
  invariant 0 <= i <= n
  decreases n - i
```

Verus, same shape, Rust syntax:

```rust
while idx < n
    invariant
        idx <= n,
        sum == triangle(idx as nat),
    decreases n - idx,
```

Without `decreases` you get partial correctness — right *if* it terminates. With it, total correctness.

Lean has no loops to speak of. Recursion is checked for termination, and the induction principle falls out of the inductive type definition. Proving something about all naturals means writing the induction:

```lean
theorem zero_add : ∀ n, add zero n = n
  | zero => rfl
  | succ n => congrArg succ (zero_add n)
```

That's from the Lean docs, against their own `Nat` definition. It holds for every natural number. That's the trade: the most work per property, and no bound anywhere.

## The trust boundary, which is the actual decision

Every one of these has a place where verification stops and trust starts. They differ in where.

Verus verifies the Rust you ship. Ghost code is erased; the executable is compiled by rustc from source you can read. That's the tightest coupling of the four.

Kani verifies your crate's MIR, which is close — but the route through Goto-C is a translation you're trusting, floating-point operations like `sqrt` are over-approximated, and concurrency isn't supported at all: Kani warns and compiles concurrent code as if it were sequential. For the numeric-invariant work I do that's acceptable. For a lock-free queue it would be dangerous, and the warning is easy to scroll past.

Dafny asks you to ship its output. Neither the verifier nor the compilers are proved correct, and soundness bugs have been found in both — that's stated plainly in the literature motivating recent verified-VCG and verified-compiler work for Dafny. Sources also disagree on backend maturity: the project site lists C#, Java, JavaScript, and Go as solid with Python "in progress," while release notes and FAQs describe Python as shipped and Rust as in progress or planned. Check the version you'd actually install.

Lean has the smallest trusted kernel and the largest gap to your binary. You either write your program in Lean and trust its (unverified) compiler to C, or you verify a translated model — Aeneas turns safe Rust into a pure functional model in Lean, Rocq, or F\*, at the cost of excluding interior mutability and unsafe code — and trust the translation.

There is no option here where nothing is trusted. Pick which unverified thing you're comfortable with.

## A realistic first week

**Kani**: you get value on day one, before writing any specification, because the default checks find real panics. By day three you're fighting solver blowup and shrinking bounds. I know this one first-hand — my full suite takes over twenty minutes, which is too slow for a pre-commit hook and fine for a release gate.

**Verus**: expect to spend the first day on toolchain setup — it's not a plain cargo plugin — and much of the week discovering which Rust features are in the supported subset. The project describes itself as under active development, so this moves.

**Dafny**: probably the smoothest of the three annotation-based tools. The language was designed around the verifier and you'll prove a binary search correct fairly quickly. The catch arrives later, when you notice you're writing Dafny and not writing your product.

**Lean**: week one is learning tactics and mathlib naming conventions. You will not verify production code in it. That's not a failure of the tool; it's what buying a real theorem costs.

## What I'd actually pick

If you have a Rust codebase now and no budget for writing specifications: **Kani**. It's the only one of the four that pays off before you've written a spec, and bounded proofs over small `n` catch essentially all index-arithmetic and boundary bugs. Add Miri, because model checking and interpretation have different blind spots.

If you're writing Rust where a bound would be a lie — unbounded loops, data-structure invariants, concurrent permissions: **Verus**. It's the only tool that gives unbounded guarantees about the same source rustc compiles. The price is a moving language subset and a real learning curve.

If you're designing an algorithm from scratch and will accept shipping generated code: **Dafny**. Best effort-to-guarantee ratio in the middle of the range, and the least friction.

If the property is genuinely mathematical, or the claim has to survive a decade: **Lean**. Nothing else produces an artefact independently checkable by a five-thousand-line kernel.

What I wouldn't do is reach for Lean to verify an existing Rust codebase. That path exists, but it's a research toolchain and a restricted subset, and the honest version of that decision is "we're rewriting for verifiability."

For my library, the bound at six is still the right call. Not because it's a strong theorem — it isn't — but because the properties I care about fail at small `n` or not at all. The moment I write something where that stops being true, the answer is Verus, and I'd rather know that now than argue it later.
