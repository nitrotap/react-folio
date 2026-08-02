---
title: "Where the ghost code goes"
date: "2026-07-31"
description: "Verus erases proofs before compilation, which sounds like a metaphor until you go read the macro that does it. What I learned about ghost types from fixing a turbofish that fell off during expansion."
tags: ["verus", "rust", "verification", "kani"]
draft: false
---

This does not compile:

```rust
fn test() {
    let g1 = Ghost::<int>(1);
}
```

You get `error[E0283]: type annotations needed for Ghost<_>`, which is an odd thing to be told when the type annotation is sitting right there in the source. That was Verus issue #2013, filed in November. In March I sent the fix, and it went in as PR #2235.

I want to be careful about what that is and isn't. I have not verified a system with Verus. In an earlier post comparing four verification tools I drew the line at not having verified a system in it, and that line still holds — my day-to-day verification work is 72 Kani harnesses over a Rust statistics library, run as a release gate with Miri underneath. What I shipped to Verus was twenty-two lines in a proc macro and three tests. But it happened to be twenty-two lines in exactly the place where ghost code stops being an idea and becomes a code path, and that turned out to be the most useful thing I could have read.

## The bug is a lesson about erasure

Everyone describes Verus the same way: you write specifications and proofs alongside your code, and they're erased before compilation so they cost nothing at runtime. That's true. It is also the kind of sentence you can nod at for a year without knowing anything.

Here is what erasure actually is. In `source/builtin_macros/src/syntax.rs`, when the `verus!` macro meets a `Ghost(...)` or `Tracked(...)` call, it emits one of three things:

- in the erased build, `Ghost::assume_new_fallback(|| unreachable!())` — the payload is gone, and the closure that would produce it is unreachable
- inside ghost context, `Ghost::new(inner)` — still ghost, just wrapped
- in exec context, `ghost_exec(...)` tagged `#[verifier::ghost_wrapper]`

Two wrappers, three modes, six generated paths. The bug was that the visitor rewrote the expression before anyone read the turbofish off the original path, so `::<int>` was simply dropped on the floor in all six. The fix extracts `PathArguments` first and interpolates it into each `quote_spanned!`. That's the whole patch.

What I took from it is that "erased" is not an abstraction over the compiler. It is a branch. And the erased branch is real code that has to typecheck like anything else — which is why dropping a type argument produced a Rust inference failure rather than a verification failure. The proof and the program are the same source file being expanded twice, differently.

## Two wrappers, two very different contracts

Verus has three modes. The guide's own three-line summary:

```rust
spec fn f1(x: int) -> int { x / 2 }
proof fn f2(x: int) -> int { x / 2 }
exec fn f3(x: u64) -> u64 { x / 2 }
```

`spec` describes properties, `proof` proves them, `exec` compiles and runs. `exec` may call all three; `proof` may call spec and proof; `spec` may call only spec. Both spec and proof are ghost.

`Ghost<T>` and `Tracked<T>` are how ghost values cross into exec signatures, since an exec function's arguments must be exec mode. In `source/builtin/src/lib.rs` both are the same thing at runtime:

```rust
pub struct Ghost<A> { phantom: PhantomData<A> }
pub struct Tracked<A> { phantom: PhantomData<A> }
```

Zero-sized. `ghost_exec` and `tracked_exec` both `core::mem::forget` the payload and hand back the empty wrapper.

The difference is four lines further down, and it is the entire point:

```rust
impl<A> Copy for Ghost<A> {}
impl<A: Copy> Copy for Tracked<A> {}
```

`Ghost<A>` is `Copy` for every `A`, unconditionally. Ghost code is allowed to duplicate anything, because a claim about a value costs nothing to state twice. `Tracked<A>` is `Copy` only when its payload is. So `Tracked` isn't inherently affine — it is affine exactly when what it carries refuses to be copied.

And the permissions refuse. From `source/vstd/raw_ptr.rs`:

```rust
pub tracked struct PointsTo<T> {
    phantom: core::marker::PhantomData<T>,
    no_copy: NoCopy,
}
```

`NoCopy` is an empty struct that doesn't implement `Copy`. That one field is the whole enforcement mechanism.

## What a permission buys that an assertion doesn't

An assertion is a claim checked at a point. It says something was true there. It says nothing about whether anyone else also believes it, or whether it stays true two lines later.

A permission is a value. You have to be handed one, you can only hand it on to one place, and you get it back only if the callee returns it. Here's a real signature:

```rust
pub fn ptr_mut_write<T>(ptr: *mut T, Tracked(perm): Tracked<&mut PointsTo<T>>, v: T)
    requires
        old(perm).ptr() == ptr,
    ensures
        final(perm).ptr() == ptr,
        final(perm).opt_value() == MemContents::Init(v),
```

You cannot write through a raw pointer without producing a `PointsTo` for that specific pointer. You cannot conjure one, because it's `external_body` and holds a `NoCopy`. You cannot hold two for the same location, because handing yours away moves it. Exclusive access stops being a comment and becomes a thing you either have or don't.

The part I find genuinely clever is who checks this. Verus has a test where a tracked value is consumed in two consecutive `match` scrutinees, and the expected failure is asserted as a *Rust* error: `use of moved value: t`. The linearity of the proof is caught by the same ownership discipline that catches it in your executable code. The OOPSLA'23 paper — *Verus: Verifying Rust Programs using Linear Ghost Types* — puts the mode system exactly there: specifications are not checked for linearity and borrowing, while executable code and proofs are. Proofs are held to the borrow checker. Specs are not, which is why they get to be freely copyable and total.

## Two ways to pay

My permutation harness proves a Fisher–Yates shuffle is a bijection with `N = 4`. Four, because three symbolic swaps is what stays tractable. My PRNG harness is better — `let state: u64 = kani::any()` is genuinely every state, all 2^64 of them, because there's no loop to unwind. But the bijection proof is bounded, and the bound is a sentence I have to write down honestly every time I describe it.

That's Kani's price: bound the input space, then say the bound out loud. In exchange you get memory safety, overflow, and panic checks on an existing crate before you have written a single specification. It's a very good trade and I'd make it again.

Verus charges somewhere else entirely. There's no bound. There's also no free lunch: to reason about a raw pointer you must thread a `PointsTo` through every function that touches it, and that threading is real work in real signatures that a reviewer has to read. You are not annotating a program. You are writing a second program in the type system, and the two have to agree.

Kani asks you to shrink the world until the solver can see all of it. Verus asks you to carry the proof with you. I've paid the first price 72 times. I've only read the invoice on the second one — but I've now read it closely enough to have found a place where it was misprinted, and that's a different kind of reading than skimming the docs.
