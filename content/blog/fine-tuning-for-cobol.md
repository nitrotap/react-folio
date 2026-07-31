---
title: "Fine-tuning for COBOL, and the harness that measures it"
date: "2026-06-18"
description: "A 0.5B model for COBOL system understanding is the easy half. The hard half is knowing whether it got better — which means fixing the benchmark first."
tags: ["llm", "fine-tuning", "evaluation", "cobol"]
draft: false
---

COBOL is a good stress test for code models. There are hundreds of billions of lines of it in production, the people who wrote it are retiring, and there is almost no COBOL in the pretraining mix relative to Python. So models are confidently bad at it in a way that's easy to miss if you only look at the output.

I fine-tuned a small model for it. The more useful work was building the thing that told me whether it helped.

## The model

`cobol-coder` is a Qwen2 0.5B fine-tune, BF16, trained with Unsloth and Hugging Face Transformers. It's deliberately small — the target is system understanding on constrained hardware, not the leaderboard. Larger fine-tunes of Llama 3.2, Granite, and DeepSeek exist alongside it for the same domain.

Fine-tuning a small model is, mechanically, the least interesting part of this. The data pipeline and the evaluation are where the time actually goes.

## The measurement problem

The benchmark that exists is bloop.ai's COBOLEval — a transpilation of OpenAI's HumanEval into COBOL, 146 tasks. It's a genuinely good piece of work and it's the right starting point.

It was also last touched in May 2024, and it assumes a workflow I didn't have.

So I rebuilt around it. The benchmark data is untouched — `CobolEval.jsonl` is byte-identical to upstream, deliberately, because a benchmark you've quietly edited is not a benchmark. What changed is everything around it:

**Local inference.** Added an Ollama path so evaluation runs against local models without an API round-trip. When you're iterating on a 0.5B fine-tune, waiting on a hosted endpoint for 146 tasks is the bottleneck.

**An agentic orchestrator.** A Rust evaluation driver built on Rig, with per-task JSONL conversation logging. Single-shot completion tells you whether a model can emit correct COBOL in one pass. That's a real number, but it isn't how anyone uses these models. The orchestrator lets the model compile, read the error, and revise — and the JSONL log means you can go back and read *how* it failed, not just that it did.

**JCL tooling.** A parser, validator, and linter for job control language. To be precise about what this is: static analysis only. It does not execute, submit, or simulate a job, and no JCL touches the pass@k pipeline. It exists because reading a COBOL program without its JCL is reading half the system.

## What I'm not claiming

I have not published benchmark numbers for the fine-tune.

The GPT-4 10.27% pass@1 figure people cite from COBOLEval is bloop's result, from their run. It is not mine, and repeating it next to my fork would imply a comparison I haven't earned.

There's also a structural gotcha worth naming, because I hit it myself: the orchestrator defaults `--execute` to false. An out-of-the-box run compiles the generated COBOL but never runs it, which means pass@1 is zero by construction. If you evaluate anything with this and get a suspiciously round score, check that flag first.

## The thread back to everything else

This is the same argument as the formal verification work, one level down.

For numeric code, the invariants are crisp enough to prove — a permutation is a bijection, a variance is non-negative, an index is in bounds. You get a proof over all inputs.

For a language model, none of that applies. There is no invariant to state and nothing to model-check. What's left is measurement: a benchmark you didn't tamper with, a harness that logs what actually happened, and enough discipline not to quote someone else's number as your own.

Proof where proof is possible. Evaluation everywhere else. Neither one is optional.
