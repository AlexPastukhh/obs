# Regional transcript — R04: Plain unions, manual property checks and design guidance

Conspect: `never type, exhaustion check with discriminated union`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A union without a shared discriminant can still be narrowed, but code must inspect properties or use custom type guards. This is often more fragile.

## Property checks

- The `in` operator can narrow when only some members contain a property.
- `typeof` and `instanceof` work for primitive/class distinctions.
- Custom predicates can encapsulate complex checks.
- Overlapping optional properties can make narrowing ambiguous.

## Why discriminants are better

- One stable field communicates the variant explicitly.
- Switch statements are easier to read and audit.
- Exhaustiveness checks become straightforward.
- Serialization and debugging show the state directly.

## Design guidance

- Add a discriminant when the variants represent states or commands.
- Keep variant payloads precise.
- Avoid unions of nearly identical objects with no reliable distinguishing property.
- Validate external JSON before treating it as the union.

## Representative pattern

```ts
type Cat = { meow(): void };
type Dog = { bark(): void };

function speak(animal: Cat | Dog) {
  if ("meow" in animal) animal.meow();
  else animal.bark();
}
```

## Caveats

- Property-existence checks can change meaning when models evolve.
- Compile-time unions do not validate runtime JSON.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-010, IU-011, IU-012
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
