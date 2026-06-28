# Regional transcript — R01: useLocation and the location object

Conspect: `uselocation`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`useLocation` returns the current React Router location and subscribes the component to location changes.

## Location fields

- `pathname` contains the path portion.
- `search` contains the query string including the leading question mark.
- `hash` contains the fragment including the leading hash.
- `state` contains navigation state that was passed without appearing in the URL.
- `key` identifies a history entry in router implementations that expose it.

## Router context

- The hook must run beneath a router provider.
- It describes the current rendered route location, not a mutable global browser object.
- Use navigation APIs to change location rather than mutating the returned object.

## Caveats

- Navigation state is not durable across every reload or direct URL entry.
- Do not place sensitive data in query strings or untrusted navigation state.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
