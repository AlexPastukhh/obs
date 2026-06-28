# Full combined final transcript — explicit interface inplementation

Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
meaningful text elements: 3 / 3
unique embedded screenshots: 20 / 20
screenshot uses: 20 / 20
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Why and when explicit interface implementation is useful

Explicit interface implementation makes a member available only through an interface-typed reference. It keeps interface-specific behavior off the class's ordinary public surface.

### Syntax and access

- The member is written with the qualified name, for example `void IDisposable.Dispose()`.
- It has no public/private modifier.
- A variable typed as the concrete class cannot call it directly.
- Casting or assigning the object to the interface exposes the member.

### Useful reasons

- The operation is meaningful only as part of an infrastructure/framework contract.
- The class should present a smaller domain-focused public API.
- Two interfaces declare members with the same signature but require different behavior.
- An interface member name conflicts with an existing public member.

### Example

- A domain object can expose `Complete()` publicly while implementing cleanup only through `IDisposable`.
- Collections often expose advanced mutation behavior only through collection interfaces.

### Representative pattern

```csharp
public sealed class RetryScope : IDisposable
{
    public void Complete()
    {
        // Domain-facing API
    }

    void IDisposable.Dispose()
    {
        // Infrastructure cleanup
    }
}
```

### Caveats

- Hiding a member does not make it inaccessible to callers who have the interface.
- Do not use explicit implementation merely to make an API surprising.

## R02 — Concrete access, default methods and name conflicts

The runtime object still implements the interface, but member lookup depends on the static type of the reference.

### Static reference type

- `instance.Member()` searches the concrete class's public surface.
- `((IContract)instance).Member()` dispatches through the interface slot.
- The implementation can be reached without creating another object.

### Two interfaces, one name

- A class can explicitly implement `IReader.Execute` and `IWriter.Execute` separately.
- Each interface cast selects its own behavior.
- This avoids ambiguous or misleading public overloads.

### Default interface methods

- A default interface implementation is normally called through an interface reference.
- A class member with the same name does not necessarily replace every interface dispatch scenario unless it implements the required slot.
- Explicit implementation can intentionally override the interface-provided behavior.

### Role-specific behavior

- The same object can present different capabilities to different consumers.
- Dependency injection against the narrow interface naturally exposes only that role.

### Representative pattern

```csharp
public interface IReader { void Execute(); }
public interface IWriter { void Execute(); }

public sealed class Processor : IReader, IWriter
{
    void IReader.Execute() => Console.WriteLine("read");
    void IWriter.Execute() => Console.WriteLine("write");
}
```

### Caveats

- Different behavior for identical names should represent genuinely different contracts.
- Document required casts when users are expected to interact with the concrete type directly.

## R03 — Simple APIs, advanced operations and interface-specific views

Explicit implementation can preserve a simple primary API while still satisfying richer framework or advanced-user contracts.

### Capability views

- The concrete class exposes the common operations.
- An advanced interface exposes lower-level controls.
- A read-only interface can be handed to consumers that should not mutate.
- An infrastructure interface can remain available to serializers, frameworks or DI.

### Collections

- A custom collection may expose domain operations publicly.
- Generic collection members such as `Add`, `Remove` or `IsReadOnly` can be explicit when direct collection semantics are not the primary API.
- Enumerability can still be public or explicit according to expected usage.

### API evolution

- Explicit members avoid adding names to IntelliSense for every concrete user.
- They can resolve clashes introduced by a new interface version.
- Prefer adapter types when the roles have substantially different state or lifecycles.

### Representative pattern

```csharp
public sealed class OrderLines : ICollection<OrderLine>
{
    public void AddProduct(Product product, int quantity) { /* invariants */ }

    void ICollection<OrderLine>.Add(OrderLine item) =>
        throw new NotSupportedException("Use AddProduct.");

    // Other interface members...
}
```

### Caveats

- Throwing from required interface members may violate caller expectations; a separate adapter may be cleaner.
- A minimal public surface is useful only when the hidden interface remains coherent.

## R04 — Public exposure guidance and design examples

Choose implicit, explicit or dual exposure based on how callers are expected to use the type—not only on whether the syntax is possible.

### Use implicit implementation when

- The member is a natural operation of the concrete type.
- Concrete callers should discover it in IntelliSense.
- One implementation satisfies all relevant interface roles.

### Use explicit implementation when

- The operation belongs only to a secondary contract.
- Names collide or role behavior differs.
- The primary class API should remain narrow.
- A framework contract should not dominate the domain-facing design.

### Expose both when

- Concrete callers need the operation and an interface contract also requires it.
- A public method can contain the implementation while the explicit member forwards to it.
- Forwarding prevents logic duplication.

### Design checks

- Can the caller understand why a cast is required?
- Would a wrapper or adapter communicate the role more clearly?
- Does dependency injection already provide the narrow interface view?

### Representative pattern

```csharp
public sealed class Resource : IDisposable
{
    public void Close() { /* shared cleanup */ }

    void IDisposable.Dispose() => Close();
}
```

### Caveats

- Explicit implementation affects discoverability, not visibility or security.
- Prefer composition when one class is accumulating unrelated roles.

## Regional source map

### R01

- transcript: `01-transcript-R01-why-and-when-explicit-interface-implementation-is-useful.md`
- text elements: `3`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-concrete-access-default-methods-and-name-conflicts.md`
- text elements: `0`
- screenshot uses: `7`
- unique screenshots: `7`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-simple-apis-advanced-operations-and-interface-specific-views.md`
- text elements: `0`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-public-exposure-guidance-and-design-examples.md`
- text elements: `0`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
framework/language-version details and original examples.
