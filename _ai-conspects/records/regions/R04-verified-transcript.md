# R04 — Reference-type value objects and EF complex-type modeling

## Boundary

This region covers immutable reference-type value objects and their use as richer domain/EF complex types.

## Verified transcript

An immutable, logically value-like object can reasonably be a record class even when multiple owners share the same reference. Value equality still compares contents, while the runtime passes a reference rather than copying all fields.

The screenshots use an `Address` record as the main example. Sharing an immutable address reference is not dangerous in the same way as sharing mutable state. This does not require manually interning or deduplicating equal instances; it only means reference-type value objects are legitimate.

A small compact type such as `Money` may fit `readonly record struct`. A richer value object with several fields, strings, validation, or framework integration may fit `record class`. For EF Core owned/complex-type modeling, a record class can be conceptually suitable when the object is owned by an entity, immutable, compared by value, and not an independent identity-based entity. Actual mapping details remain version- and feature-specific.


## Source closure

- Verified image uses: 4
- Verified non-empty SVG text nodes: 1
- Missing: 0
- Unreviewed: 0
