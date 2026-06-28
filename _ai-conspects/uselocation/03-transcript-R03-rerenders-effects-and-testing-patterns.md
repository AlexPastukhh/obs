# Regional transcript — R03: Rerenders, effects and testing patterns

Conspect: `uselocation`  
Generated: 2026-06-28 05:00:00 UTC

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

A component using `useLocation` rerenders when the router publishes a new location.

## Effects

- Use an effect keyed by the relevant location fields for analytics or scroll restoration.
- Depending on the entire location object is appropriate only when every navigation change matters.
- Cleanup subscriptions or timers created by location-driven effects.

## Rendering

- Conditional UI can compare `pathname` or inspect route matches.
- Prefer route configuration for page-level branching rather than large manual pathname switches.

## Testing

- Render the component under `MemoryRouter` or a memory data router.
- Set `initialEntries` to the desired location.
- Assert user-visible behavior and, when necessary, expose a small test location display.

## Caveats

- Development Strict Mode can run effects more than once.
- Do not treat `useLocation` as a general replacement for route params or loader data.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001, IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
