# Regional transcript — R03: Flag toggling and explicit disabling

Conspect: `inline flags sharp`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

.NET inline option groups can both enable and disable flags. The minus sign marks options disabled for the following scope.

## Toggle syntax

- `(?s)` enables Singleline.
- `(?-s)` disables it.
- `(?im-s)` enables IgnoreCase and Multiline while disabling Singleline.
- `(?s-m:...)` applies the combination only inside a group.

## Practical use

- A broad pattern may enable one mode and temporarily disable it for a strict fragment.
- Prefer a single scoped group over distant toggles when possible.

## Representative pattern

```csharp
var pattern = @"(?s)prefix.*(?-s:same-line-only.*)suffix";
```

## Caveats

- Multiline changes anchors, whereas Singleline changes dot; the names are easy to confuse.
- Always include tests with and without newline boundaries.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
