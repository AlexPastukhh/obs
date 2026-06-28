# Regional transcript — R03: Discriminated unions and control-flow narrowing

Conspect: `never type, exhaustion check with discriminated union`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A discriminated union gives every variant a shared literal-valued property such as `kind`, `type`, or `status`. That property lets TypeScript narrow reliably.

## Structure

- Each member has the same discriminant property name.
- Each member uses a distinct literal value.
- Variant-specific fields remain separate.
- The union is declared from the variant object types.

## Narrowing

- Checking `value.kind === 'success'` narrows to the success variant.
- A switch provides clear exhaustive branching.
- Inside a case, variant-specific fields are available without manual casts.
- The remaining value becomes `never` after all variants are handled.

## Applications

- Async request states.
- Reducer actions.
- Domain commands and events.
- API result types and parser outputs.

## Representative pattern

```ts
type Result<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function render<T>(result: Result<T>) {
  switch (result.status) {
    case "loading": return "Loading";
    case "success": return String(result.data);
    case "error": return result.error.message;
    default: return assertNever(result);
  }
}
```

## Caveats

- Use literal types rather than a broad `string` discriminant.
- Optional discriminants weaken narrowing and should usually be avoided.

## Source labels

- `discriminated union`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-008, IU-009
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
