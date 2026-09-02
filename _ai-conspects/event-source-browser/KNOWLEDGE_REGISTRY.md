# Knowledge Registry - EventSource browser / Server-Sent Events

Workspace: `_ai-conspects/event-source-browser/`

## Authoritative source

- Authoritative processed sources: `10-full-source-preserving-transcript-v003.md`, `11-technical-corrections-v002.md`, `12-repetition-question-bank-v002.md`, `13-final-near-literal-coverage-audit-v002.md`, `15-transcript-quality-hotfix-v003.md`, and `data/source-ledger-near-literal-v002.*`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`
- Original SVG: `source/event source browser.svg`
- SHA-256: `e2fe30a13873b066a835fcec4a9c48d2335b0f156d723845e95dfb6f4590dbd6`
- Git blob: `dc7da4f7343e594bf75ff99e4396300e468ebe6e`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| S-001–S-002, S-011–S-013: EventSource construction, open/message/error hooks, named listeners, `CONNECTING`/`OPEN`/`CLOSED`, permanent `close()`, URL, and constructor-only credentials option | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| S-003, S-007–S-008, S-013 plus corrections 4–5: `MessageEvent.data`, `lastEventId`, `origin`, `type`, newline-joined data lines, and JSON-in-`data` rather than arbitrary first-class properties | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| S-001, S-006, S-011–S-012, S-016, S-019 plus corrections 1 and 3: error/`CONNECTING`/delay/same-URL reconnect/open lifecycle, remembered ID, non-success or invalid-stream retries, and explicit-close exception | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| S-008, S-011: plain open/error events and browser limitation that error callbacks do not reliably expose HTTP status or detailed failure information | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| Correction 8: EventSource is one-way server-to-client; use fetch or WebSocket when the client must send application messages | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| S-003, S-007, S-010, S-017 plus corrections 4–6: `event`, `id`, repeatable `data`, `retry`, blank-line dispatch, newline joining, and JSON payload framing | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MERGED |
| S-004–S-005, S-009, S-014–S-015, S-017–S-018, S-020 plus correction 2: standalone or in-record `retry`, future-attempt semantics, browser default, startup/dynamic updates, overload pacing, and recovery reduction | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MERGED |
| S-006, S-010, S-019 plus correction 3: browser remembers `id`, sends `Last-Event-ID` on reconnect, and enables server replay/resumption | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MERGED |
| S-005, S-014 plus correction 7: `text/event-stream`, correct blank-line writes, periodic flush, and stopping the server loop on request cancellation | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MERGED |
| Historical transcripts and processing/status artifacts (00-source-check-and-boundary-review-v001.md, `10-...-v001.md`, `10-...-v002.md`, `11-technical-corrections-v001.md`, `13-...-v001.md`, `13-...-v002.md`, 14-transcript-quality-correction-v002.md, 15-transcript-quality-hotfix-v003.md, TRANSCRIPT_STATUS.md, MANIFEST.md) | - | - | - | NON_LEARNING |
| Repetition material (`12-repetition-question-bank-v002.md`, with v001 retained historically) | - | - | - | NON_LEARNING |
| Preserved SVG, screenshots, image/source ledgers, native SVG text, and audit assets (source/, data/, audit-assets/) | - | - | - | NON_LEARNING |

## Boundary decisions

### Duplicate source/material identity

The older `_ai-conspects/event source browser/` workspace and this workspace identify the same canonical source path and the same material inventory: 20 screenshots and 8 native/text-label lines. Claim-by-claim comparison maps S-001–S-020 into the two units created from the older workspace, so this migration extends those canonical IDs rather than creating duplicates. SHA-256 `e2fe30a13873b066a835fcec4a9c48d2335b0f156d723845e95dfb6f4590dbd6` and Git blob `dc7da4f7343e594bf75ff99e4396300e468ebe6e` are verified by this newer workspace's SOT; the older SOT does not record a hash.

### Topic boundary

Browser object construction, callback event shapes, lifecycle state, explicit close, and the one-way API boundary remain in `javascript.eventsource-client-lifecycle`. Wire fields, record termination, retry control, server response lifecycle, and `Last-Event-ID` resumption remain in `http.sse-event-stream-reconnection`. The remembered-ID contract is intentionally represented at both sides of that boundary.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     0 |
| MERGED       |     9 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 12
Distinct Knowledge IDs: 2 (0 new + 2 merged into existing)
