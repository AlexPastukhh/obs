# Full source-preserving transcript v002 — EventSource browser / Server-Sent Events

Generated: 2026-07-04 UTC

```text
authoritative SVG: source/event source browser.svg
SHA-256: e2fe30a13873b066a835fcec4a9c48d2335b0f156d723845e95dfb6f4590dbd6
Git blob SHA: dc7da4f7343e594bf75ff99e4396300e468ebe6e
viewBox: 0 0 5088.122033312979 2832.2216398766977
unique embedded screenshots: 20 / 20
image uses: 20 / 20
duplicate extra placements: 0
native SVG text lines: 8 / 8
source blocks: 20 / 20
```

## Topic boundary

browser EventSource behavior, SSE framing, retry and Last-Event-ID.

## Transcript policy

Visible wording and code are preserved source-by-source with conservative OCR normalization.
Obvious glyph substitutions, broken member-access spacing and editor artifacts are corrected.
Exact screenshot typography remains authoritative.

---

## S-001 — What the browser does automatically

```text
source_id: S-001
image_hash: b46359c7fac8
placements: 1
image_file: source/images-near-literal-v001/S-001__b46359c7fac8.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
What the browser does automatically
1) Auto-reconnect on connection loss
If the connection drops (network blip, server closed socket, proxy timeout), the browser will:
- fire error
- switch readyState to CONNECTING
- wait "retry delay"
- reconnect automatically to the same URL
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «What the browser does automatically»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-002 — Built-in EventSource events (client side)

```text
source_id: S-002
image_hash: 5e36b425bc20
placements: 1
image_file: source/images-near-literal-v001/S-002__5e36b425bc20.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Built-in EventSource events (client side)
EventSource supports these standard events/properties:
- open — fired when the connection is established (or re-established).
- handler: es.onopen = (event) => { ... } or es.addEventListener("open", ...)
- message — fired for SSE messages that don't specify an event: name (default event type).
- handler: es.onmessage = (event) => { ... } or addEventListener("message, ...)
- error — fired on network errors, disconnects, CORS issues, etc. Also happens during reconnect
attempts.
- handler: es.onerror = (event) => { ... } or addEventListener("error", ...)
Also available on the instance:
- readyState: 0 CONNECTING, 1 OPEN, 2 CLOSED
- close(): permanently closes (no more reconnect)
- withCredentials option only via constructor { withCredentials: true } (supported in modem
browsers)
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Built-in EventSource events (client side)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-003 — Use server features to send richer info

```text
source_id: S-003
image_hash: 7da6d3affa3c
placements: 1
image_file: source/images-near-literal-v001/S-003__7da6d3affa3c.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Use server features to send richer info
On the server, you can set:
- 'event: <name> — controls which listener fires
- data: <text> — ends up in event.data
- (id: <id> — ends up in event.lastEventId (and used for resume via |Last-Event-ID)
- (retry: <ms> — tells browser how long to wait before reconnecting
So if you want "extra fields", you typically include them inside JSON in data::
- vent: progress O
id: 123
data: {"pct":42, "stage": "upload"}
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Use server features to send richer info»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-004 — Can the server change the EventSource retry delay?

```text
source_id: S-004
image_hash: dcf09fb5339b
placements: 1
image_file: source/images-near-literal-v001/S-004__dcf09fb5339b.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Key rules
- You can send `retry: <ms>` any time.
- It applies to future reconnect attempts (it doesn't "sleep" an already-open connection).
- You can send it:
- by itself (just `retry: 30000\n\n`)
- or inside an event block (alongside event: / data: / id:)
Most people send it once at the beginning, then optionally update it when conditions change.
~~~

### Recall

1. Какое поведение EventSource/SSE показано в разделе об изменении retry delay?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-005 — Timeline example (start with 5s, later increase to 30s)

```text
source_id: S-005
image_hash: 8f47b4b626cd
placements: 1
image_file: source/images-near-literal-v001/S-005__8f47b4b626cd.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Timeline example (start with 5s, later increase to 30s)
TO — client connects
Server response begins (headers already Content-Type: text/event-stream etc.)
Server writes:
"Plain text oO
retry: 5000
event: connected
data: {"serverTime": "2026-03-11T10:00:00Z"}
Browser behavior:
- fires open
- readyState = OPEN
- stores reconnect delay = 5000ms
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Timeline example (start with 5s, later increase to 30s)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-006 — 2) Resume using Last-Event-ID (if you send id:)

```text
source_id: S-006
image_hash: 08dcb1c1107e
placements: 1
image_file: source/images-near-literal-v001/S-006__08dcb1c1107e.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
2) Resume using Last-Event-ID (if you send id:)

If your server sends event IDs:
"Plain text oO
id: 123
data: {...}

the browser remembers the last received ID. On reconnect it automatically includes:

- (Last-Event-ID: 123 (as a request header)
So your server can continue from that point (if you support replay).
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «2) Resume using Last-Event-ID (if you send id:)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-007 — Quick SSE event format refresher (server — client)

```text
source_id: S-007
image_hash: 8eb30a7f86bd
placements: 1
image_file: source/images-near-literal-v001/S-007__8eb30a7f86bd.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Quick SSE event format refresher (server — client)
An SSE "event" is text lines terminated by a blank line:
- vent: my-event oO
id: 10
retry: 5000
data: hello
data: world
Client receives one |MessageEvent:
- type = "my-event"
- lastEventId = "10"
- =data = "hello\nworld""
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Quick SSE event format refresher (server — client)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-008 — What you get inside the callback (e)

```text
source_id: S-008
image_hash: 4fe5edc3ba6d
placements: 1
image_file: source/images-near-literal-v001/S-008__4fe5edc3ba6d.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
What you get inside the callback (e)
For "message" and custom events, the callback gets a MessageEvent -
Useful fields:
- e.data (string) — the payload from data: (if server sends multiple data: lines, they're joined with
\n)
- e.lastEventid (string) — value from 'id: (used for resume / replay)
- e.origin (string) — origin of the stream
- e.type (string) — event type name ("message" Or your custom name)
For "open and "error, browsers often pass a plain Event:
- You can read e.type
- You typically don't get HTTP status codes or detailed error info (that's a known limitation of SSE in
browsers)
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «What you get inside the callback (e)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-009 — When you'd include retry: on the server

```text
source_id: S-009
image_hash: 2d50368123f2
placements: 1
image_file: source/images-near-literal-v001/S-009__2d50368123f2.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
When you'd include retry: on the server
Use retry: when you want the server to control how aggressively the browser reconnects after a
disconnect/error.
Good times to set it:

- You know disconnects are normal (deployments, LB idle timeouts, mobile networks) and you want a

calm reconnect pace.

- You're protecting your server from reconnect storms (many clients dropping at once).

- You want different retry behavior per stream (some streams can retry fast, others should back off).
If you don't send retry:, the browser uses its own default reconnect delay (browser-defined, not reliably
consistent across vendors).
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «When you'd include retry: on the server»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-010 — T1 — normal streaming continues

```text
source_id: S-010
image_hash: 5f04e33c29e5
placements: 1
image_file: source/images-near-literal-v001/S-010__5f04e33c29e5.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
T1 — normal streaming continues
Server writes:
") Plain text oO
- vent: order-status
id: 101
data: {"status": "Processing", "time": "2026-03-11T10:00:022"}
- vent: order-status
id: 102
data: {"status": "Packed", "time": "2026-03-11T10:00:05Z"}
Browser.
- dispatches | order-status events
- remembers lastEventid = 102
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «T1 — normal streaming continues»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-011 — 3) It triggers events like this

```text
source_id: S-011
image_hash: 4c579764c95b
placements: 1
image_file: source/images-near-literal-v001/S-011__4c579764c95b.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
3) It triggers events like this

- open: fired when the connection is established (including after reconnect)

- (message (or your custom event): fired when an event arrives

- error: fired when the connection fails / is interrupted / CORS issues / during reconnect attempts
Important: browsers do not reliably give you the HTTP status code in the |error event.
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «3) It triggers events like this»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-012 — On what events does it reconnect?

```text
source_id: S-012
image_hash: 0aa57798dd85
placements: 1
image_file: source/images-near-literal-v001/S-012__0aa57798dd85.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
On what events does it reconnect?

It reconnects when the stream is not explicitly closed by JS and the connection ends unexpectedly.
- Reconnects on: network interruption, server disconnect, proxy timeout, many transient failures.
- Does not reconnect if you call eventSource.close() (that's permanent).
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «On what events does it reconnect?»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-013 — Reading MessageEvent properties

```text
source_id: S-013
image_hash: 9508bc2e7dfc
placements: 1
image_file: source/images-near-literal-v001/S-013__9508bc2e7dfc.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example:
es.addEventListener("message", (e) => {
console.log(e.type); // "message"
console.log(e.data); // string
console.log(e.lastEventId); // string (maybe "")
~~~

### Recall

1. Какие свойства MessageEvent читаются в callback?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-014 — Example 1: Set a default retry for the whole stream

```text
source_id: S-014
image_hash: a89a3527cc5a
placements: 1
image_file: source/images-near-literal-v001/S-014__a89a3527cc5a.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example 1: Set a default retry for the whole stream

Send it once near the beginning (or any time; it updates the value).
"Plain text oO
retry: 5000

Meaning "wait ~5 seconds before reconnecting".

ASPNET Core (SSE) example:
await Response.WriteAsync("retry: 50@0\n\n");
await Response.Body.FlushAsync();
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Example 1: Set a default retry for the whole stream»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-015 — T2 — server detects overload

```text
source_id: S-015
image_hash: 86b3a493ce22
placements: 1
image_file: source/images-near-literal-v001/S-015__86b3a493ce22.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
T2 — server detects overload
Server decides: "if clients disconnect, | want them to reconnect more slowly."
Option A (send retry alone, simplest):
") Plain text oO
retry: 30000
- vent: server-busy
data: {"level": "high", "msg": "Back off reconnects"}
Option B (include retry: inside the same event block):
") Plain text oO
- vent: server-busy
retry: 30000
data: {"level": "high", "msg": "Back off reconnects"}
Rerawicnar
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «T2 — server detects overload»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-016 — Also, if the server responds with a non-200 or invalid SSE response, browsers generally trigger erro

```text
source_id: S-016
image_hash: db08c98150c2
placements: 1
image_file: source/images-near-literal-v001/S-016__db08c98150c2.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Also, if the server responds with a non-200 or invalid SSE response, browsers generally trigger error and
will often keep retrying, which is why retry: can help avoid hammering.
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Also, if the server responds with a non-200 or invalid SSE response, browsers generally trigger erro»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-017 — Example 2: Change retry dynamically (e.g., on overload)

```text
source_id: S-017
image_hash: 82cdf58f2225
placements: 1
image_file: source/images-near-literal-v001/S-017__82cdf58f2225.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example 2: Change retry dynamically (e.g., on overload)
If you detect the server is under load, you can instruct clients to reconnect less frequently.
"Plain text oO
- vent: server-busy
data: {"msg":"slow down"}
retry: 30000
Client can listen to | server-busy, but the key part is retry: 30000 which updates reconnection delay to 30s.
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Example 2: Change retry dynamically (e.g., on overload)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-018 — Browser.

```text
source_id: S-018
image_hash: a0d8796c56a7
placements: 1
image_file: source/images-near-literal-v001/S-018__a0d8796c56a7.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Browser.
- still stays connected (no reconnect happens now)
- updates reconnect delay to 30000ms
- dispatches server-busy
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «Browser.»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-019 — T3 — connection drops (deploy, proxy timeout, wifi blip)

```text
source_id: S-019
image_hash: dbb4db9f9313
placements: 1
image_file: source/images-near-literal-v001/S-019__dbb4db9f9313.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
T3 — connection drops (deploy, proxy timeout, wifi blip)
Socket breaks.

Browser:

1. fires error

2. sets readyState = CONNECTING

3. waits ~30000ms (the last retry: it saw)

4. reconnects to the same URL

5. automatically sends Last-Event-ID: 102

6. fires open on success
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «T3 — connection drops (deploy, proxy timeout, wifi blip)»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?

---

## S-020 — T4 — server recovered, wants faster reconnect again

```text
source_id: S-020
image_hash: 228202b06da6
placements: 1
image_file: source/images-near-literal-v001/S-020__228202b06da6.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
T4 — server recovered, wants faster reconnect again
After reconnect (or at any time), server can reduce it:
") Plain text oO
retry: 5000
- vent: server-ok
data: {"level":"normal"}
Now future reconnect attempts go back to ~5s.
~~~

### Recall

1. Какое поведение EventSource/SSE показано в «T4 — server recovered, wants faster reconnect again»?
2. Как browser и server обмениваются состоянием reconnect?
3. Как выглядит корректный SSE frame для этого случая?
