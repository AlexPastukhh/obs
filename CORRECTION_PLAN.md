# Correction plan — four audited conspects

Generated: 2026-06-30

## Archive 1 — urgent correctness fixes

```text
type narrowing
delete
```

Purpose:

- create the missing TypeScript transcript;
- replace the materially incorrect SQL transcript;
- make both conspects repetition-ready immediately.

## Archive 2 — HashCode source-preserving expansion

```text
hashcode
```

Planned work:

- 24 screenshot-specific blocks;
- preserve all code examples and anti-patterns;
- mutable-key bucket diagrams;
- `HashCode.Combine`;
- incremental `HashCode.Add`;
- comparer overload;
- sequence hashing;
- records and `IEquatable<T>`;
- source-specific questions and coding exercises.

## Archive 3 — Exhaustiveness source/code expansion

```text
exaustiveness check with sicr union for enums,classes with inher
```

Planned work:

- six screenshot-specific code blocks;
- enum switch example;
- discard-arm tradeoff;
- `SwitchExpressionException`;
- record hierarchy;
- Circle/Square/Triangle examples;
- TypeScript `assertNever` comparison;
- `OneOf`/visitor alternatives;
- questions and coding prompts.

## Priority

1. Archive 1 — required immediately because one transcript is absent and one changes SQL semantics.
2. Archive 2 — broad concepts are present, but most source code is missing.
3. Archive 3 — conceptual summary is good; precision/code layer is missing.
