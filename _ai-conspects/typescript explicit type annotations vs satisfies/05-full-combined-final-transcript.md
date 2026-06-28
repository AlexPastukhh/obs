# Full combined final transcript — typescript explicit type annotations vs satisfies

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 11 / 11
screenshot uses: 11 / 11
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Explicit annotation versus satisfies

A type annotation assigns the variable the annotated type. The `satisfies` operator checks assignability while preserving the expression's useful inferred type.

### Annotation

- `const value: Target = expression` validates the expression against Target.
- The variable is then viewed as Target.
- Specific property information can be widened or hidden by the target type.

### satisfies

- `const value = expression satisfies Target` performs a compatibility check.
- The variable keeps the inferred shape of the expression.
- Excess or misspelled properties can still be diagnosed for object literals.

### Selection

- Use an annotation when the variable should intentionally expose the abstract contract.
- Use `satisfies` for configuration objects where validation and precise inference are both useful.

### Representative pattern

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

### Caveats

- `satisfies` is a compile-time operator and emits no runtime check.
- Contextual typing can still influence the expression's inferred members.

## R02 — Config Record and literal-preserving use cases

`satisfies` is particularly valuable for maps and configuration objects: it verifies required keys and value shapes while retaining exact keys and literals.

### Record validation

- A `Record<KeyUnion, Value>` target detects missing and extra keys.
- The resulting object still knows the specific property names.
- Property values retain more precise inferred types than a broad annotation often exposes.

### as const combination

- `as const` preserves readonly literal values.
- `as const satisfies Contract` validates that literal-rich object against the contract.
- This is useful for route tables, event maps and design tokens.

### Config access

- Precise keys improve autocomplete.
- Discriminated config values can remain narrow for later control-flow checks.
- The checked object can still be passed to APIs expecting the broader contract.

### Representative pattern

```ts
type RouteName = "home" | "profile";
type RouteConfig = { path: `/${string}`; auth: boolean };

const routes = {
  home: { path: "/", auth: false },
  profile: { path: "/profile", auth: true }
} as const satisfies Record<RouteName, RouteConfig>;

routes.profile.path; // "/profile"
```

### Caveats

- `as const` also makes properties readonly, which may not suit mutable configuration.
- A broad index signature weakens detection of misspelled keys.

## R03 — When not to use satisfies and runtime-validation limits

`satisfies` does not replace annotations, assertions, generics, or runtime schema validation. It only checks one expression during TypeScript compilation.

### Not an assertion

- `value as Type` asks the compiler to treat a value as Type and can bypass safety.
- `value satisfies Type` verifies compatibility and does not change the runtime value.
- Use assertions only when external reasoning guarantees the type.

### External data

- JSON, network responses and environment variables remain untrusted at runtime.
- Validate them with a parser/schema before assigning a trusted type.
- A `satisfies` expression around a type assertion does not validate the underlying data.

### When annotation is better

- Public variables or fields should sometimes intentionally expose a stable abstraction.
- Function parameters and returns normally use explicit types.
- Mutable values may need widening to the contract rather than a narrow literal type.

### Representative pattern

```ts
const raw: unknown = JSON.parse(input);

// Runtime validation is still required:
const config = ConfigSchema.parse(raw);
```

### Caveats

- `satisfies` cannot make invalid runtime input safe.
- Overusing narrow inference can make later mutation inconvenient.

## R04 — Rules availability and practical summary

The `satisfies` operator was introduced in TypeScript 4.9. It is syntax, so the project compiler and editor tooling must support that version or newer.

### Practical rule

- Annotation: validate and expose the annotated type.
- `satisfies`: validate while retaining inferred detail.
- Assertion: override compiler knowledge; use sparingly.
- Runtime parser: validate unknown external values.

### Tooling

- Align the TypeScript version used by the IDE, build and lint tools.
- A dependency's older parser may reject newer TypeScript syntax even when `tsc` accepts it.

### Representative pattern

```ts
const settings = {
  mode: "strict",
  retries: 3
} satisfies AppSettings;
```

### Caveats

- Compiler upgrades can change inference details; keep type tests for critical public APIs.
- Use the simplest construct that communicates the intended abstraction.

## Regional source map

### R01

- transcript: `01-transcript-R01-explicit-annotation-versus-satisfies.md`
- text elements: `0`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-config-record-and-literal-preserving-use-cases.md`
- text elements: `0`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-when-not-to-use-satisfies-and-runtime-validation-limits.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-rules-availability-and-practical-summary.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
