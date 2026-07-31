---
title: "A gateway is a control point, not a proof"
date: "2026-07-31"
description: "Reading the docs for Google's Agent Gateway. Some of what it enforces is a genuine invariant. Some of it is a language model grading another language model, which the docs are refreshingly honest about."
tags: ["agents", "governance", "mcp", "evaluation"]
draft: false
---

The failure I worry about with a tool-using agent isn't a wrong answer. It's a plausible-looking call to something real — a refund issued, a row deleted, an outbound request to a host nobody meant to be reachable. The model picked the tool at runtime. There was no branch in my code that decided it.

That's an awkward place to stand if your instinct is to prove things. There's no invariant to state. "The agent calls the right tool" isn't a property of a program; it's a property of a distribution over a prompt you haven't seen yet.

So I read the documentation for Google's Agent Gateway with one question in mind: of everything that can go wrong at that boundary, how much can a network control point actually catch?

I haven't deployed it. This is a docs read.

## What it is

Agent Gateway is described as the networking component of the Gemini Enterprise Agent Platform — it secures and governs connectivity for agentic interactions, whether between users and agents, agents and tools, or agents and each other. It runs in one of two modes. `CLIENT_TO_AGENT` is ingress: clients reaching your hosted agents. `AGENT_TO_ANYWHERE` is egress: your agent reaching out to MCP servers, other agents, and API endpoints.

Egress is the interesting one, and its central mechanic is an allowlist. Resources get registered in Agent Registry — agents, MCP servers, tools, endpoints — and the docs are blunt about the consequence: registering them is required, because the gateway blocks all outbound traffic to hosts not in the registry. Anything unregistered is denied by default.

That's a real property. It's decidable, it holds for every request, and it doesn't depend on anything the model said. Same for identity: agent identities are secured by default with Context-Aware Access, using mTLS and DPoP, and the gateway uses that identity as the principal for authorization. IAM allow and deny policies then restrict which agent may reach which tool, with conditions expressible over attributes of the call — the resource name, whether the operation is read-only, whether it's destructive, whether it's idempotent.

I'd call that layer enforcement in the strict sense. It's a predicate over the request, evaluated the same way every time, and if it says no the call does not happen.

## The part that is a grader

Then there's Semantic Governance. You write constraints in natural language — up to 5,000 characters — scoped to an agent or to a specific tool. The docs' own example is a shipping rule: always use UPS within the USA, always DHL within the EU. A policy engine evaluates each proposed tool call against the current user prompt, the constraints, the tools manifest, the chat history, and the suggested invocations, and returns `ALLOW` or `DENY`.

That is an LLM judge sitting in the request path.

The documentation says so, in a warning I did not expect to find and respect for being there: Semantic Governance Policy is a generative AI service that uses an LLM to implement natural language policies; LLMs are probabilistic and can make mistakes; verdicts may not be accurate.

I've built graders — harness-level evaluators that score model output for hallucination, run offline against a fixed set. The technology here is the same. The position is not. Offline, a grader's errors cost you a slightly wrong number in a report. Inline, its false negatives are your security posture and its false positives are an outage. A grader promoted to an enforcement point inherits obligations it was never measured against.

Which is presumably why every path through these docs routes you through dry-run first.

```yaml
name: AUTHORIZATION_EXTENSION_NAME
service: iap.googleapis.com
failOpen: true
timeout: 1s
metadata:
  iamEnforcementMode: "DRY_RUN"
  iapPolicyVersion: "V1"
```

Two fields in that sample are worth sitting with. `iamEnforcementMode: DRY_RUN` means policies are evaluated and logged but not applied — the console calls it audit-only, and the recommendation for Semantic Governance is the same: deploy in dry-run, validate, then enforce. That is an evaluation loop wearing a config file. You are being told to collect a labelled corpus of your own traffic before you let the policy touch it. The verdict logs carry a rationale field, so the corpus arrives annotated.

And `failOpen: true`, at a one-second timeout. If the authorization extension doesn't answer, traffic proceeds. That's a defensible availability default and it is also the precise difference between a control and a guarantee. A proof does not have a timeout.

## Where the line falls

The gateway sees requests. That's its vantage point and its ceiling.

It can tell you an agent called `process_refund`. It cannot tell you the refund was owed. It can confirm the destination was registered and the identity was permitted and the method was not marked destructive. It cannot confirm the reasoning that produced the call was sound, because that reasoning never crosses the network boundary — only its output does. Everything the gateway knows about intent, it knows by asking another model.

The structural limits are stated plainly too. HTTP-based traffic only, including MCP and A2A — so an MCP server your agent speaks to over stdio is simply not in scope. No VPC Service Controls. No self-signed certificates. A cap of 5,000 registered resources per gateway, and at most four custom authorization policies on an egress gateway. And the default-deny is only as strong as registry hygiene: the perimeter is exactly the set of things somebody remembered to register, which makes the registry an operational artefact with security consequences rather than an inventory.

None of this is a criticism. It's the shape of the tool. I've spent enough time writing Kani harnesses for index arithmetic to know how narrow the provable region is — a permutation is a bijection, a variance is non-negative, a float lands in `[0, 1)`. Those are properties you can close over all inputs. "This tool call served the user's actual intent" is not in that family and never will be.

What's left is a layered answer. Prove what's provable. Enforce what's decidable — registry membership, identity, IAM conditions on the call itself. Measure everything above that, honestly, with the enforcement turned off until the measurement says something.

The thing I'd resist is the slide between those layers. A gateway is where you put the rules you can state but can't prove, and that's a genuinely useful place for them to live. It stops being useful the moment it gets described as making an agent safe. It makes an agent *governed*, which is a weaker and more honest claim, and the documentation — to its credit — mostly makes the weaker one.
