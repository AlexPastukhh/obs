# Regional transcript — R01: Callback dependency problem and useRef motivation

Conspect: `useRef to avoid including into deps array, to avoid rerenders or bad recreations`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A changing callback can force an effect to tear down and register again when the callback appears in the dependency list.

## Why the dependency changes

- Functions declared during render receive a new identity unless stabilized.
- A callback often closes over current props or state, so omitting it from dependencies can create stale behavior.
- Including it correctly may cause repeated subscription, timer or listener recreation.

## What a ref provides

- `useRef` returns a stable object whose `.current` field can change without requesting a render.
- A ref can store the latest callback while the external registration remains stable.
- The ref is an escape hatch for imperative integration, not a replacement for reactive state.

## Appropriate use

- The external API needs one long-lived handler.
- The handler must always execute the latest callback logic.
- Re-registering is expensive, lossy or semantically wrong.

## Caveats

- Do not silence dependency warnings by moving every reactive value into refs.
- Prefer ordinary dependencies when resubscription is cheap and accurately represents the effect.

## Covered source units

### Text elements

```text
T-001, T-002, T-003, T-004
```

### Screenshot uses

```text
IU-001, IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
