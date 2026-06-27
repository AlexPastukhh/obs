# R03 — Record structs, copying, ref/in/out and value-type storage

## Boundary

This region covers `record struct`, value-type copying, `ref`/`in`/`out`, storage location, large-struct costs, and choosing reference semantics with value equality.

## Verified transcript

The keyword `record` by itself means `record class`, so it is a reference type. A value-type record must be declared as `record struct` or `readonly record struct`.

Structs are copied by value in ordinary assignment and parameter passing. For small immutable values this is often desirable. For larger structs, repeated copies can increase data movement, cache pressure, and mutation confusion.

Parameter modifiers change the behavior:

- `ref` passes by reference and permits read/write access;
- `in` passes by reference with read-only intent and is often useful for large structs;
- `out` passes by reference for assignment by the callee.

Avoid reducing the topic to “stack versus heap.” A value type is stored inline wherever it lives: a local may be in stack/register-related storage, a field is inline inside its containing object, an array stores elements inline, and boxing places a wrapped copy on the managed heap. A large struct field inside a class therefore lives inside that heap object.

The practical concern is representation and copying, not a simple stack-good/heap-bad rule. Structs are strongest when small, immutable, value-like, frequently created, and logically data—examples include `DateTime`, `Guid`, `TimeSpan`, points, decimals, small IDs, coordinates, and compact money values.

A record class can be preferable when value equality is wanted but the model is larger, nullable, shared by reference, inheritance/framework integration matters, or copying the full value is undesirable.


## Source closure

- Verified image uses: 14
- Verified non-empty SVG text nodes: 6
- Missing: 0
- Unreviewed: 0
