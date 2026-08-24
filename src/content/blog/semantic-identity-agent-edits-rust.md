---
title: "Stable Identity Before Agent Edits: Lessons from Building SEMAPRAX in Rust"
description: "How Rust newtypes, checked HIR, deterministic graph projections, and replayed evidence can make coding-agent edits easier to review."
pubDate: 2026-08-24
author: Kevin Riedl, Wavect GmbH
tags:
  - rust
  - compilers
  - ai
draft: true
---

_This article was written by Kevin Riedl for Wavect GmbH and adapted for the Rust India community from the [original Wavect article](https://wavect.io/blog/semantic-identity-rust-agent-edits/)._

A coding agent can produce a perfectly valid text edit and still change the wrong thing. A byte range identifies a position in one file snapshot; it does not identify the declaration the agent meant. Formatting, a nearby comment, or a concurrent edit can move that position before the patch is applied.

This is one of the problems we are exploring in [SEMAPRAX](https://wavect.io/semaprax/), an Apache-2.0, pre-alpha language and compiler research project implemented in Rust. The project keeps readable `.spx` source as the canonical Git representation, while giving tools a checked semantic representation with persistent declaration identities.

The project is deliberately experimental. It does not claim production readiness or complete language safety. What is useful today is the narrower compiler-engineering lesson: an agent edit should name the program entity it intends to change, bind that intent to a known source revision, and fail closed when either one has moved.

## A name is better than a byte offset, but it is not an identity

Consider a tool that wants to update a function. A line and column can become stale after formatting. A function name survives formatting, but names remain contextual: scopes, imports, overloads, and renames can change what a name resolves to.

SEMAPRAX therefore distinguishes persistent declaration identities from revision-local expression identities. A public declaration keeps its `@id` when it is renamed or moved. An expression inside the declaration can receive a fresh identity when the source revision changes.

That asymmetry matters. Preserving every transient syntax node across arbitrary rewrites would promise more stability than the compiler can honestly guarantee. Declarations are durable edit targets; expressions are addresses within one checked revision.

## Rust makes accidental identity mixing harder

The compiler does not represent every identity as an interchangeable `String`. Its HIR uses separate types for declarations and expressions:

```rust
pub struct DeclarationId(String);
pub struct ExpressionId(String);

pub struct ResolvedFunction {
    pub id: DeclarationId,
    // checked signature, body, and effects
}
```

The example is shortened, but the boundary is real. A function that expects a persistent declaration target cannot accidentally receive a revision-local expression address without an explicit conversion.

This is ordinary Rust type design applied to a compiler protocol. The same idea works for source digests, capability tokens, transaction identifiers, and evidence envelopes: if two values have different authority or lifetime, giving them different types makes the distinction visible at every call site.

## Resolve meaning once, then reuse it

Another failure mode appears when every downstream tool reconstructs meaning from syntax. If a graph exporter, native backend, WebAssembly backend, and patch engine each resolve names independently, they can disagree about types, ownership, effects, or call targets.

SEMAPRAX parses source, resolves it into checked HIR, and verifies the admitted language subset before downstream projections consume it. The simplified flow is:

1. Parse the human-readable source.
2. Resolve names and persistent identities into HIR.
3. Verify the admitted types, effects, ownership rules, and contracts.
4. Project graph data or target artifacts from that checked representation.
5. Bind proposed changes to the source revision and semantic target.

The semantic graph is a compiler projection, not a second source of truth. Humans still review source in Git. Agents get structured context without requiring reviewers to accept an opaque database as the program.

## Determinism is more than stable node IDs

Persistent IDs do not help much if graph output changes between identical runs. The compiler also needs deterministic traversal, serialization, diagnostics, and failure selection.

Rust's ordered collections help here. SEMAPRAX uses `BTreeMap` and `BTreeSet` where the data is mathematically unordered and requires a canonical projection. That removes randomized hash iteration as a source of drift.

There is an important limit: execution order must not be sorted for prettier output. Evaluation and cleanup sequences carry meaning. Canonical ordering belongs on sets, not on vectors whose order is part of the language semantics.

This distinction is easy to lose in tooling code. A stable JSON file is not useful if achieving stability silently changes the program it describes.

## Evidence should describe permission, not grant it

A semantic patch can carry evidence that its target existed, its expected source digest matched, and its bounded checks passed. Possessing that evidence must not itself grant write authority.

The experimental SEMAPRAX patch route keeps those responsibilities separate. The component that owns the commit lock independently replays the bounded evidence against the current source before it stages a candidate. A stale snapshot, a changed identity, or a forged report fails before mutation.

That design addresses three different problems:

- **Stale intent:** the proposal was valid for an older source revision.
- **Wrong target:** matching text now resolves to a different declaration.
- **Forged confidence:** a caller presents a plausible report without reproducing its checks.

Independent replay does not prove that a requested change is wise. It proves the narrower statement that the exact bounded proposal still satisfies the checks to which its evidence is bound.

## Patterns Rust tool authors can reuse

You do not need a new programming language to apply these ideas. Refactoring engines, IDE services, and coding-agent tools can reuse the same boundaries:

1. Give durable program entities explicit identities instead of treating file positions as identities.
2. Use Rust newtypes for values with different lifetimes or authority.
3. Centralize resolved meaning in one checked IR.
4. Specify deterministic ordering and serialization, then test repeat runs byte for byte.
5. Bind edits to both a semantic target and a source snapshot.
6. Replay evidence inside the component that actually owns mutation authority.
7. Publish limits alongside features so one passing lane is not mistaken for a system-wide guarantee.

SEMAPRAX tracks those limits in a completion matrix. The current v0.2 compiler is a growing vertical slice with native C11/Clang and WebAssembly Core lanes plus semantic graph and transaction tooling. Many parts of the long-term language goal remain partial or missing; the repository treats executable evidence, not design prose, as the completion gate.

## Try the graph projection

The source is available at [github.com/wavect/semaprax](https://github.com/wavect/semaprax). A small example can be inspected with:

```bash
git clone https://github.com/wavect/semaprax.git
cd semaprax
cargo run -- graph examples/hello.spx
```

The useful question is not whether SEMAPRAX already fulfils its broad research goal. It does not. The useful question is whether stable identities, checked semantic projections, and replay-before-mutation can give agent tooling a safer unit of intent than a byte range.

For us, Rust has been a good language in which to make those boundaries explicit. Persistent identity is not an expression address. Evidence is not authority. A graph projection is not the source of truth. Encoding each distinction in the type system makes it harder for compiler code to blur them later.

_Editorial disclosure: OpenAI Codex assisted with drafting this adaptation. Wavect checked the technical claims against the SEMAPRAX repository and remains responsible for the article._
