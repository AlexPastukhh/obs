# R01 - lock / Monitor mutual exclusion and critical section

Generated: 2026-06-20 08:05:01 UTC

`lock` is syntax over `Monitor.Enter` / `Monitor.Exit`. It protects a critical section by allowing only one thread to hold the monitor for a private gate object at a time.

Use a private readonly gate object, keep the protected section small, and release through `finally` semantics. Do not lock on public objects, `this`, `typeof(...)`, or string literals.

This region covers mutual exclusion, monitor ownership, reentrancy, and the critical-section mental model.

