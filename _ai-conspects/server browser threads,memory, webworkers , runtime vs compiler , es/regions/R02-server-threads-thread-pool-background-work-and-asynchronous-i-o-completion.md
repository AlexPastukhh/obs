# R02 — Server threads, thread pool, background work and asynchronous I/O completion

Generated: 2026-06-27 UTC

```text
Image uses: 10
SVG text nodes: 5
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region describes server-side concurrency.

- A server runtime uses managed worker threads/thread-pool infrastructure to execute request code and scheduled work.
- Asynchronous I/O does not require a thread to sit blocked for the entire wait. Completion is signaled by the runtime/OS, after which continuation work is scheduled.
- CPU-bound work still consumes a worker thread while it executes. Creating arbitrary background threads per request is not equivalent to scalable asynchronous I/O.
- Background work needs an owned lifetime, cancellation, exception observation, and shutdown behavior. Fire-and-forget request work can outlive scoped dependencies or lose failures.
- The screenshots distinguish worker threads, background threads, and I/O-completion/runtime-managed infrastructure rather than treating all concurrency as one pool.
- Visible failure examples show that exceptions must be observed and connected to logging or host lifetime policy. Unhandled failures in critical background services can terminate or destabilize the process depending on runtime/host policy.
- The practical rule is to use the server framework's hosted/background-service abstractions for durable background work and async APIs for I/O waits, while reserving explicit parallelism for measured CPU-bound workloads.

## Covered image uses

S-001, S-006, S-007, S-008, S-013, S-014, S-015, S-017, S-018, S-020

## Covered SVG text nodes

T-001, T-003, T-007, T-009, T-010

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
