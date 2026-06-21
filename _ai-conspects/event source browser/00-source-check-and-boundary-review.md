# Stage0 - event source browser source check and boundary review v001

Generated: 2026-06-22 UTC

## Exact-name rule

```text
SVG: event source browser.svg
Conspect folder: _ai-conspects/event source browser
```

The conspect folder name exactly matches the SVG filename without `.svg`.

## Counts

```text
unique embedded images: 20
image uses on canvas: 20
text labels parsed: 8
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Name | Meaning |
|---|---:|---:|---|---|
| R01 | 3 | 2 | eventsource-properties-events-client-basics | EventSource properties/events and basic browser client usage |
| R02 | 5 | 2 | automatic-browser-behavior-reconnect | automatic browser reconnection, Last-Event-ID and reconnect semantics |
| R03 | 6 | 2 | server-fields-retry-control | server-sent event fields, id/event/data/retry and server-controlled reconnect delay |
| R04 | 6 | 2 | retry-timeline-scenarios | timeline examples, changing retry values, disconnect and recovery scenarios |

## Rule

Inventory and candidate regions are a checklist, not source of truth. Final transcript passes must re-check visual and semantic boundaries before marking regions complete.

## Next

Start transcript/final-coverage pass after this combined stage0 bundle is reviewed and committed.
