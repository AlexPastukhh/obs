# Regional transcript — R02: Config Record and literal-preserving use cases

Conspect: `typescript explicit type annotations vs satisfies`  
Generated: 2026-06-28 14:30:00 UTC

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

`satisfies` is particularly valuable for maps and configuration objects: it verifies required keys and value shapes while retaining exact keys and literals.

## Record validation

- A `Record<KeyUnion, Value>` target detects missing and extra keys.
- The resulting object still knows the specific property names.
- Property values retain more precise inferred types than a broad annotation often exposes.

## as const combination

- `as const` preserves readonly literal values.
- `as const satisfies Contract` validates that literal-rich object against the contract.
- This is useful for route tables, event maps and design tokens.

## Config access

- Precise keys improve autocomplete.
- Discriminated config values can remain narrow for later control-flow checks.
- The checked object can still be passed to APIs expecting the broader contract.

## Representative pattern

```ts
type RouteName = "home" | "profile";
type RouteConfig = { path: `/${string}`; auth: boolean };

const routes = {
  home: { path: "/", auth: false },
  profile: { path: "/profile", auth: true }
} as const satisfies Record<RouteName, RouteConfig>;

routes.profile.path; // "/profile"
```

## Caveats

- `as const` also makes properties readonly, which may not suit mutable configuration.
- A broad index signature weakens detection of misspelled keys.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-007, IU-008, IU-009, IU-010, IU-011
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
