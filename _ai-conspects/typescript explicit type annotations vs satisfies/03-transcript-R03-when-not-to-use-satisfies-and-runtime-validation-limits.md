# Regional transcript — R03: When not to use satisfies and runtime-validation limits

Conspect: `typescript explicit type annotations vs satisfies`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`satisfies` does not replace annotations, assertions, generics, or runtime schema validation. It only checks one expression during TypeScript compilation.

## Not an assertion

- `value as Type` asks the compiler to treat a value as Type and can bypass safety.
- `value satisfies Type` verifies compatibility and does not change the runtime value.
- Use assertions only when external reasoning guarantees the type.

## External data

- JSON, network responses and environment variables remain untrusted at runtime.
- Validate them with a parser/schema before assigning a trusted type.
- A `satisfies` expression around a type assertion does not validate the underlying data.

## When annotation is better

- Public variables or fields should sometimes intentionally expose a stable abstraction.
- Function parameters and returns normally use explicit types.
- Mutable values may need widening to the contract rather than a narrow literal type.

## Representative pattern

```ts
const raw: unknown = JSON.parse(input);

// Runtime validation is still required:
const config = ConfigSchema.parse(raw);
```

## Caveats

- `satisfies` cannot make invalid runtime input safe.
- Overusing narrow inference can make later mutation inconvenient.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-005, IU-006
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
