# Regional transcript — R01: Explicit annotation versus satisfies

Conspect: `typescript explicit type annotations vs satisfies`  
Generated: 2026-06-28 14:30:00 UTC

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

A type annotation assigns the variable the annotated type. The `satisfies` operator checks assignability while preserving the expression's useful inferred type.

## Annotation

- `const value: Target = expression` validates the expression against Target.
- The variable is then viewed as Target.
- Specific property information can be widened or hidden by the target type.

## satisfies

- `const value = expression satisfies Target` performs a compatibility check.
- The variable keeps the inferred shape of the expression.
- Excess or misspelled properties can still be diagnosed for object literals.

## Selection

- Use an annotation when the variable should intentionally expose the abstract contract.
- Use `satisfies` for configuration objects where validation and precise inference are both useful.

## Representative pattern

```ts
type Palette = Record<"red" | "green", string | [number, number, number]>;

const annotated: Palette = {
  red: [255, 0, 0],
  green: "#00ff00"
};

const checked = {
  red: [255, 0, 0],
  green: "#00ff00"
} satisfies Palette;

// checked.green retains string methods.
```

## Caveats

- `satisfies` is a compile-time operator and emits no runtime check.
- Contextual typing can still influence the expression's inferred members.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
