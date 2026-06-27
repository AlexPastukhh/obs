# Full combined final transcript — root document

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 1 / 1
unique embedded screenshots: 6 / 6
screenshot uses on canvas: 6 / 6
repeated screenshot placements retained: 0
logical regions: 1 / 1
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Root document and API self-discovery

A root document is the API entry point. It gives a client a small set of starting links so the first transition does not require a hard-coded controller route.

### Problem

- Even a hypermedia-oriented client must initially know at least one URL.
- Without a root document, clients commonly hard-code `/api/authors` or another collection endpoint.
- Route-template changes then leak into every consumer.

### Root endpoint

- Expose a stable endpoint such as `GET /api` or `GET /api/root`.
- Name the action route so links can be generated through the framework rather than concatenated manually.
- Return a compact document containing relations, target URLs and HTTP methods.

### Starting links

- A `self` link points back to the root.
- An `authors` or collection relation points to the collection GET endpoint.
- A `create-author` relation points to the collection POST endpoint.
- Only advertise transitions the current client is allowed or expected to use.

### Client behavior

- The client requests the root document once.
- It locates relations by semantic name, not by parsing URL templates.
- The client can then navigate to collections or commands while remaining decoupled from route layout.

### Contract design

- Use stable relation names and a consistent link representation.
- The root document is discoverability metadata, not a dump of every route.
- Version the link contract deliberately when relations or semantics change.

### Caveats

- The client still needs one documented bootstrap URL.
- A root document provides discoverability but does not by itself implement full HATEOAS state transitions.

## Coverage map

### R01

- text elements: `1`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-root-document-and-self-discovery.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
