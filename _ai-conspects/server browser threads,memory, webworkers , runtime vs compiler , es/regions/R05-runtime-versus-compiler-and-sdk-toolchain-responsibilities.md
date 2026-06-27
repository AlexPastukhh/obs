# R05 — Runtime versus compiler and SDK/toolchain responsibilities

Generated: 2026-06-27 UTC

```text
Image uses: 9
SVG text nodes: 5
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region separates execution-time and build-time components.

- A runtime executes already produced code and supplies services such as loading, memory management, garbage collection, JIT/interpreter behavior, threading, and platform integration.
- A compiler transforms source or intermediate representation into another form and reports compile-time diagnostics. Compilation may happen ahead of time, just in time, or as part of a hybrid pipeline.
- An SDK/toolchain is broader than the runtime: it includes compilers, build tooling, templates, package/restore support, analyzers, and developer commands.
- Installing only a runtime is sufficient for executing compatible deployed output, but not necessarily for building the project.
- Runtime errors occur while code executes; compiler errors prevent or alter produced output. The screenshots use this distinction to avoid attributing build behavior to the runtime.
- Version compatibility must be evaluated across produced artifacts, target/runtime, and SDK. “Works on my machine” can result from an SDK/runtime combination not present in deployment.
- The same conceptual split applies to browser/JavaScript tooling: an engine/runtime executes JavaScript, while transpilers/bundlers/type checkers perform build-time transformations and validation.

## Covered image uses

S-074, S-080, S-083, S-086, S-089, S-090, S-092, S-094, S-095

## Covered SVG text nodes

T-039, T-041, T-042, T-043, T-044

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
