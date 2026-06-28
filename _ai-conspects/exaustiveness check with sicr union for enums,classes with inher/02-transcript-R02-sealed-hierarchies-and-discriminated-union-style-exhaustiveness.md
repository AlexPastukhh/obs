# Regional transcript — R02: Sealed hierarchies and discriminated-union-style exhaustiveness

Conspect: `exaustiveness check with sicr union for enums,classes with inher`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A closed record hierarchy plus pattern matching can model TypeScript-style discriminated unions more strongly than a plain enum.

## Closed shape hierarchy

- Use an abstract base record or class and a finite set of derived record types.
- Pattern-match on the runtime type in a switch expression.
- Each derived type can carry the data required for that case.
- Mark leaf types sealed and keep construction controlled so the intended set stays closed.

## Exhaustiveness

- List every known derived type without a discard arm when compiler/analyzer support can enforce the closure.
- Adding a new derived case should create diagnostics at every exhaustive switch.
- A runtime unhandled value still fails rather than silently choosing an unrelated default.

## Alternatives

- A library union type such as `OneOf` can provide an explicit finite case set.
- Visitor patterns provide compile-time dispatch but add more boilerplate.
- For simple value-free cases, an enum remains smaller and easier.

## Caveats

- C# does not provide a native TypeScript-style discriminated-union declaration.
- A publicly extensible base class prevents true global exhaustiveness.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
