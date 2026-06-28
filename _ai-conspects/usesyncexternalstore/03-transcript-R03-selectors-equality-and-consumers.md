# Regional transcript — R03: Selectors, equality and store consumers

Conspect: `usesyncexternalstore`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A selector lets a component observe the smallest useful slice of a larger snapshot. Equality determines whether a changed store snapshot affects that slice.

## Why selectors

- A component displaying the user name does not need to rerender for an unrelated preference.
- Selecting one primitive often gives stable `Object.is` equality automatically.
- Selecting an object requires a stable cached value or a suitable equality comparison.

## Selector patterns

- Call `useSyncExternalStore` for the whole immutable snapshot and derive a cheap primitive locally.
- For expensive or object-shaped slices, use a selector-aware wrapper that caches the selected result.
- Keep selectors pure and free of component side effects.
- Parameterized selectors should avoid creating fresh aggregate objects on every call.

## Equality

- `Object.is` is the base snapshot comparison used by the core hook.
- A selector layer may use reference, shallow or custom equality.
- Custom equality must be cheaper than the rerender work it saves and must not hide meaningful changes.
- Immutable structural sharing makes equality decisions simpler.

## Consumer examples

- Header: select the current display name.
- Protected route: select authentication and initialization flags.
- Token refresh indicator: select only the refresh status.
- Debug panel: intentionally consume the complete snapshot.

## Caveats

- Returning a new array/object from a selector defeats reference equality unless it is cached.
- Overly broad consumers make external-store updates resemble a global Context rerender.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-012, IU-013, IU-014, IU-015
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
