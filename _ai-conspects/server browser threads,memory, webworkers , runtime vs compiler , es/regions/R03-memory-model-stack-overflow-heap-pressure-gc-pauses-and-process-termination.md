# R03 — Memory model, stack overflow, heap pressure, GC pauses and process termination

Generated: 2026-06-27 UTC

```text
Image uses: 23
SVG text nodes: 12
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region compares browser and server failure/memory behavior.

- Both environments have call stacks and managed heaps, but their isolation and failure boundaries differ: a browser page/worker is isolated from the server process, while a server failure can affect many requests.
- Recursive or excessively deep synchronous calls can overflow the stack. The examples contrast React/browser stack-overflow symptoms with server-side stack-overflow/process behavior.
- Heap allocation pressure increases garbage-collection work. Large retained graphs, repeated allocations, and unnecessary copies can create latency even when memory is eventually reclaimed.
- Shared versus local state matters. Browser workers generally exchange cloned/transferred data; server threads operate inside one process and can access shared process memory, which requires synchronization and careful ownership.
- A garbage-collection pause is not the same as process termination: GC pauses execution to reclaim/compact memory, whereas fatal runtime conditions or unhandled host-level failures may end the process.
- The screenshots emphasize diagnosis: separate stack exhaustion, heap growth, ordinary exceptions, and fatal process failure rather than calling all of them “memory errors.”
- For responsive systems, avoid unbounded recursion, monitor allocation/retention, reduce unnecessary shared state, and keep failure boundaries explicit.

## Covered image uses

S-024, S-030, S-035, S-036, S-038, S-039, S-040, S-042, S-047, S-048, S-049, S-050, S-052, S-056, S-057, S-058, S-061, S-064, S-065, S-066, S-068, S-071, S-073

## Covered SVG text nodes

T-016, T-017, T-020, T-021, T-024, T-027, T-028, T-031, T-033, T-034, T-035, T-036

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
