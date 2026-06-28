# Regional transcript — R02: Concrete access, default methods and name conflicts

Conspect: `explicit interface inplementation`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The runtime object still implements the interface, but member lookup depends on the static type of the reference.

## Static reference type

- `instance.Member()` searches the concrete class's public surface.
- `((IContract)instance).Member()` dispatches through the interface slot.
- The implementation can be reached without creating another object.

## Two interfaces, one name

- A class can explicitly implement `IReader.Execute` and `IWriter.Execute` separately.
- Each interface cast selects its own behavior.
- This avoids ambiguous or misleading public overloads.

## Default interface methods

- A default interface implementation is normally called through an interface reference.
- A class member with the same name does not necessarily replace every interface dispatch scenario unless it implements the required slot.
- Explicit implementation can intentionally override the interface-provided behavior.

## Role-specific behavior

- The same object can present different capabilities to different consumers.
- Dependency injection against the narrow interface naturally exposes only that role.

## Representative pattern

```csharp
public interface IReader { void Execute(); }
public interface IWriter { void Execute(); }

public sealed class Processor : IReader, IWriter
{
    void IReader.Execute() => Console.WriteLine("read");
    void IWriter.Execute() => Console.WriteLine("write");
}
```

## Caveats

- Different behavior for identical names should represent genuinely different contracts.
- Document required casts when users are expected to interact with the concrete type directly.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-002, IU-003, IU-006, IU-007, IU-008, IU-009, IU-010
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
