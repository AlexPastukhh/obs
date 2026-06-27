# records — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — record basics, generated members and class-vs-record choice

C# records are data-oriented types with compiler-supported value semantics. A record can be a reference type (`record class`) or a value type (`record struct`). For a record, the compiler supplies value-based equality infrastructure, including `Equals`, `GetHashCode`, and the `==` / `!=` operators; it also supplies a readable `ToString`. Positional records additionally get generated properties, a primary-constructor-like declaration shape, and deconstruction support.

Records are not limited to generated members. They can contain methods, constructors, validation logic, private fields, private properties, and explicitly declared members. Positional syntax is compact and useful when the public data shape is the main API. Non-positional syntax gives more control over initialization, accessors, validation, and encapsulation.

Choose a record when the value carried by the members is the main identity of the object and value equality is desirable. Choose an ordinary class when object identity, lifecycle, mutable aggregate behavior, framework proxying, or reference equality is central. A record does not automatically make every member deeply immutable: referenced objects stored inside it can still be mutable.

**Covered source labels:** `T-001, T-018, T-019, T-020, T-021, T-022`

## R02 — record class vs record struct, copying costs and with expressions

A `record class` is a reference type. Copying a variable copies the reference, while a `with` expression creates a new record object and performs a shallow member copy before applying the requested changes. Referenced members are shared unless they are explicitly cloned.

A `record struct` is a value type. Assignment, argument passing by value, returning by value, and a `with` expression copy the struct value. Large structs can therefore be expensive when copied frequently. A struct stored as a field inside a heap object or an array element is stored inline there; the statement “structs are always on the stack” is false. A struct may also be boxed, captured, or otherwise live in heap-backed storage.

Prefer a reference type with value equality when the value is large, frequently passed around, needs inheritance or polymorphism, should support `null`, or should avoid repeated full-value copies. Structs are strongest when they are small, immutable, identity-free values with predictable copy behavior. A struct can be larger than a reference-sized handle, so size and access patterns matter more than the word “value”.

**Covered source labels:** `T-002, T-003, T-004, T-005, T-006, T-009, T-010, T-011, T-012, T-013, T-014, T-015`

## R03 — passing structs, ref/in/out and value-object guidance

A struct parameter is passed by value unless the signature says otherwise. `in` passes a readonly reference, `ref` passes a mutable reference to an existing variable, and `out` passes a reference that the callee must assign. These forms can avoid large copies, but they also expose aliasing and lifetime constraints and should be used only when profiling or API semantics justify them.

Structs are not stack-only. They can be embedded inline in classes and arrays, boxed into objects, or stored wherever their containing storage lives.

For domain value objects and EF Core complex types, either an immutable record class or a small readonly record struct can work. The decision should consider size, copying frequency, nullability, serialization/ORM behavior, and whether sharing reference-typed nested members is acceptable.

**Covered source labels:** `T-007, T-008, T-016, T-017`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
