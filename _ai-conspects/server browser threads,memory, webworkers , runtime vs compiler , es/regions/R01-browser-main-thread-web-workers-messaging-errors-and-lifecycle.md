# R01 — Browser main thread, Web Workers, messaging, errors and lifecycle

Generated: 2026-06-27 UTC

```text
Image uses: 40
SVG text nodes: 21
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region covers browser execution and Web Worker mechanics.

- Normal page JavaScript, DOM work, layout/paint coordination, and most event callbacks run on the browser's main thread. Long synchronous work blocks responsiveness.
- A Web Worker runs JavaScript in a separate worker global scope. It does not share the page's DOM and communicates through messages.
- The examples create a worker, send data with `postMessage`, receive results through `message`/`onmessage`, and handle failures through the worker's `error` event.
- Inside the worker, `self.onmessage` receives work and `self.postMessage` returns results. Unexpected worker errors can also be observed inside the worker global scope.
- Message payloads are transferred using the browser's structured-clone/transfer rules rather than by sharing arbitrary mutable objects.
- Workers are appropriate for CPU-heavy computation that can be isolated. They are not automatically faster for small tasks because startup, serialization/transfer, coordination, and memory have costs.
- A worker is not a free resource. It has its own execution context and must be terminated when no longer needed. The examples explicitly call `terminate` or close the worker.
- Error handling is intentionally shown on both sides: page-side `worker.onerror` for observing worker failure and worker-side handling for code that can recover or report a structured error.
- The screenshots contrast a dedicated worker with running the same operation on the main thread and show how to keep UI work responsive.

## Covered image uses

S-002, S-003, S-004, S-005, S-009, S-010, S-011, S-012, S-016, S-019, S-021, S-022, S-023, S-025, S-026, S-027, S-028, S-029, S-031, S-032, S-033, S-034, S-037, S-041, S-043, S-044, S-045, S-046, S-051, S-053, S-054, S-055, S-059, S-060, S-062, S-063, S-067, S-069, S-070, S-072

## Covered SVG text nodes

T-002, T-004, T-005, T-006, T-008, T-011, T-012, T-013, T-014, T-015, T-018, T-019, T-022, T-023, T-025, T-026, T-029, T-030, T-032, T-037, T-038

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
