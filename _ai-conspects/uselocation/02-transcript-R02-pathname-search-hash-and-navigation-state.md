# Regional transcript — R02: pathname, search, hash and navigation state

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

Each location field serves a different routing concern and should be parsed with the corresponding API.

## Pathname

- Use route params for dynamic path segments.
- Normalize trailing slashes and basename behavior according to router configuration.

## Search

- Parse `location.search` with `URLSearchParams` for simple query values.
- Repeated keys, arrays and typed values need explicit conventions.
- Changing query parameters creates a new location and can trigger loaders or effects.

## Hash

- The hash is client-side fragment state and is not sent to the server in HTTP requests.
- It can identify an in-page anchor or application substate.

## State

- Navigation state is useful for transient context such as the origin page or a success notice.
- Always handle direct entry where state is absent.

## Caveats

- The location object identity can change even when only one field changes.
- Derive only the specific field a component needs.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-003, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
