# Regional transcript — R02: stackalloc basics, thresholds and stack pressure

Conspect: `span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R02
image uses processed: 28 / 28
unique screenshots represented: 28
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`stackalloc` allocates unmanaged element storage in the current stack frame and is useful for small, bounded temporary buffers.

## Basic use

- `Span<byte> buffer = stackalloc byte[256];` provides a safe span view over stack memory.
- The memory is released automatically when the method frame returns.
- The CLR garbage collector does not track or reclaim the stack-allocated bytes.

## When it helps

- Small parsing, formatting, encoding and temporary scratch buffers can avoid short-lived heap allocations.
- The benefit is largest in hot paths where profiling shows allocation pressure.
- For one-off or large buffers, ordinary arrays are often simpler and safer.

## Threshold pattern

- Choose stack storage only below a conservative maximum and rent/allocate larger buffers.
- The threshold should consider total frame size, nesting, recursion, platform stack size and all concurrent local allocations.
- There is no universal safe byte count for every application.

## Stack overflow

- Large or repeated `stackalloc` operations can exhaust the thread stack.
- Stack overflow is generally not recoverable in-process.
- Allocating inside a loop can accumulate within the same method frame depending on generated code and lifetime; allocate once outside the loop and reuse the span when possible.

## Caveats

- Do not select stackalloc only because it is faster in theory; measure the hot path.
- User-controlled lengths must be bounded before stack allocation.

## Nearby source labels

- stackalloc
- stackallock
- stackmemory stack overflow
- how can avoid heap allocations in loops but carefully
- when to use stackalloc when heap objects better
- about stack overflow and memory
- tackalloc in separate method
- memory.span
- stackalloc additions
- have inside
- !!!!
- for memory
- producer - consumer pipeline usecase
- what span and memory can
- can i use ref with them?
- so of memory and span are structs, they are being copyed
- what is ordinary value type, not ref struct

## Covered screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032
IU-044, IU-049, IU-050, IU-051, IU-052, IU-053, IU-057, IU-067, IU-077, IU-078, IU-079, IU-080, IU-081
IU-082, IU-083
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
