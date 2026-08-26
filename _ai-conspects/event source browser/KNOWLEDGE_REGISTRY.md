# Knowledge Registry

Source: `regions/final-coverage-transcript.md`; SVG: `source/event source browser.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: long-lived connection, lifecycle hooks, ready states, URL/credentials properties | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MAPPED |
| R01: unnamed `onmessage`, named `event:` listeners, permanent `close()` semantics | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MAPPED |
| R02 client lifecycle: unexpected drop, `CONNECTING`, same-URL reconnect, repeated error/open handlers | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MAPPED |
| R02 resume contract: remembered `id:` becomes `Last-Event-ID` during reconnect | `javascript.eventsource-client-lifecycle`, `http.sse-event-stream-reconnection` | `javascript`, `http` | both destination files | MAPPED |
| R03: `event`, `id`, repeatable `data`, `retry`, blank-line dispatch and newline joining | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MAPPED |
| R03: retry is future reconnect delay, startup/dynamic updates, overload/network use | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MAPPED |
| R04: healthy stream, changed delay, deploy/proxy/network failure, error, wait, resume, open, recovery reduction | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MAPPED |
| Reading quality, image/label counts, closure bookkeeping | — | — | — | NON_LEARNING |

Browser object behavior belongs to JavaScript; record framing and reconnect protocol belong to HTTP/SSE. `Last-Event-ID` is intentionally present in both units because it is the boundary contract connecting the client lifecycle to server resumption. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
