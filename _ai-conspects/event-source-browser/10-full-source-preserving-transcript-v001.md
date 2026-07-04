# Full source-preserving transcript v001 — EventSource browser / Server-Sent Events

    Generated: 2026-07-04 UTC

    ```text
    source SVG: source/event source browser.svg
    SHA-256: e2fe30a13873b066a835fcec4a9c48d2335b0f156d723845e95dfb6f4590dbd6
    Git blob SHA: dc7da4f7343e594bf75ff99e4396300e468ebe6e
    viewBox: 0 0 5088.122033312979 2832.2216398766977
    unique embedded screenshots: 20 / 20
    image uses: 20 / 20
    duplicate extra placements: 0
    native SVG text lines: 8 / 8
    source blocks: 20 / 20
    ```

    This transcript is near-literal normalized and OCR-assisted. Obvious OCR noise is corrected where clear; exact punctuation, indentation and version-specific API spelling remain authoritative in the preserved screenshots.

    ## Integrated map

    Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

    ## Source-by-source transcript

## S-001 — What th- browser does automatically

        ```text
        source_id: S-001
        image_hash: b46359c7fac8
        placements: 1
        image_file: source/images-near-literal-v001/S-001__b46359c7fac8.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        What th- browser does automatically
1) Auto-reconnect on connection loss
If th- connection drops (network blip, server closed socket, proxy timeout), th- browser will:
- fir- error
- switch readyStat- to CONNECTING
- wait “retry delay”
- reconnect automatically to th- sam- URL
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-002 — Built-in Eventsourc- events (client side)

        ```text
        source_id: S-002
        image_hash: 5e36b425bc20
        placements: 1
        image_file: source/images-near-literal-v001/S-002__5e36b425bc20.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Built-in Eventsourc- events (client side)
EventSourc- supports thes- standard events/properties:
- |open — fired when th- connection is established (or re-established).
- handler: es.onopen = (event) => { ... } OF es.addEventListener("open", ..-)
- (messag- — fired for SSE messages that don’t specify an event: nam- (default event type).
- handler: es.onmessag- = (event) => { ... } or addEventListener("message™, -.-.)
- error — fired on network errors, disconnects, CORS issues, etc. Also happens during reconnect
attempts.
- handler: es.onerror = (event) => { ... } OF addEventListener(“error", .-..)
Also availabl- on th- instance:
- readyStat- : @ CONNECTING, 1 OPEN, 2 CLOSED
* | close() : permanently closes (no mor- reconnect)
- withCredentials option only via constructor { withCredentials: tru- } (supported in modem
browsers)
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-003 — Us- server features to send richer info

        ```text
        source_id: S-003
        image_hash: 7da6d3affa3c
        placements: 1
        image_file: source/images-near-literal-v001/S-003__7da6d3affa3c.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Us- server features to send richer info
On th- server, you can set:
- ‘event: <name> — controls which listener fires
- data: <text> — ends up in e-data
- (id: <id> — ends up in e-lastEventId (and used for resum- via |Last-Event-ID )
- (retry: <ms> — tells browser how long to wait befor- reconnecting
So if you want “extra fields”, you typically includ- them insid- JSON in data: :
event: progress O
id: 123
data: {"pct":42, “stage”: "upload"}
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-004 — Vaio WHCHCVE! I agpvedio Il UI SUC.

        ```text
        source_id: S-004
        image_hash: dcf09fb5339b
        placements: 1
        image_file: source/images-near-literal-v001/S-004__dcf09fb5339b.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Vaio WHCHCVE! I agpvedio Il UI SUC.
Key rules
- You can send |retry: <ms> any time.
- It applies to futur- reconnect attempts (it doesn’t “sleep” an already-open connection).
- You can send it:
- by itself (just (retry: 3@000\n\n )
- or insid- an event block (alongsid- event: / data: / id: )
Most peopl- send it onc- at th- beginning, then optionally updat- it when conditions change.
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-005 — Timelin- exampl- (start with 5s, later increas- to 30s)

        ```text
        source_id: S-005
        image_hash: 8f47b4b626cd
        placements: 1
        image_file: source/images-near-literal-v001/S-005__8f47b4b626cd.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Timelin- exampl- (start with 5s, later increas- to 30s)
TO — client connects
Server respons- begins (headers already Content-Type: text/event-stream etc.)
Server writes:
```text oO
retry: 5000
event: connected
data: {"serverTime”™ : "2026-03-11T10:00:00Z"}
Browser behavior:
- fires open
- readyStat- = OPEN
- stores reconnect delay = 5000ms
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-006 — 2) Resum- using Last-Event-ID (if you send id: )

        ```text
        source_id: S-006
        image_hash: 08dcb1c1107e
        placements: 1
        image_file: source/images-near-literal-v001/S-006__08dcb1c1107e.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        2) Resum- using Last-Event-ID (if you send id: )

If your server sends event IDs:
```text oO
id: 123
data: {...}

th- browser remembers th- last received ID. On reconnect it automatically includes:

- (Last-Event-ID: 123 (as a request header)
So your server can continu- from that point (if you support replay).
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-007 — Quick SSE event format refresher (server — client)

        ```text
        source_id: S-007
        image_hash: 8eb30a7f86bd
        placements: 1
        image_file: source/images-near-literal-v001/S-007__8eb30a7f86bd.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Quick SSE event format refresher (server — client)
An SSE “event” is text lines terminated by a blank line:
event: my-event oO
id: 10
retry: 5000
data: hello
data: world
Client receives on- |MessageEvent :
- typ- = "my-event”
- lastEventId = "10"
- =data = “hello\nworld”"
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-008 — What you get insid- th- callback (e)

        ```text
        source_id: S-008
        image_hash: 4fe5edc3ba6d
        placements: 1
        image_file: source/images-near-literal-v001/S-008__4fe5edc3ba6d.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        What you get insid- th- callback (e)
For “message” and custom events, th- callback gets a MessageEvent -
Useful fields:
- |e.data (string) — th- payload from data: (if server sends multipl- data: lines, they'r- joined with
\n)
- |e.lastEventId (string) — valu- from ‘id: (used for resum- / replay)
- e.origin (string) — origin of th- stream
- |e.typ- (string) — event typ- nam- ( "message" Or your custom name)
For “open™ and “error™ , browsers often pass a plain Event :
- You can read e.type
- You typically don’t get HTTP status codes or detailed error info (that’s a known limitation of SSE in
browsers)
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-009 — When you'd includ- retry: on th- server

        ```text
        source_id: S-009
        image_hash: 2d50368123f2
        placements: 1
        image_file: source/images-near-literal-v001/S-009__2d50368123f2.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        When you'd includ- retry: on th- server
Us- retry: when you want th- server to control how aggressively th- browser reconnects after a
disconnect/error.
Good times to set it:

- You know disconnects ar- normal (deployments, LB idl- timeouts, mobil- networks) and you want a

calm reconnect pace.

- You'r- protecting your server from reconnect storms (many clients dropping at once).

- You want different retry behavior per stream (som- streams can retry fast, others should back off).
If you don't send retry: , th- browser uses its own default reconnect delay (browser-defined, not reliably
consistent across vendors).
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-010 — T1 — normal streaming continues

        ```text
        source_id: S-010
        image_hash: 5f04e33c29e5
        placements: 1
        image_file: source/images-near-literal-v001/S-010__5f04e33c29e5.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        T1 — normal streaming continues
Server writes:
“) Plain text oO
event: order-status
id: 101
data: {"status": "Processing" , "time": "2026-03-11T10:00:022"}
event: order-status
id: 102
data: {"status”: "Packed", “time”: "2026-03-11T10:00:05Z"}
Browser.
- dispatches | order-status events
- remembers lastEventId = 102
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-011 — 3) It triggers events lik- this

        ```text
        source_id: S-011
        image_hash: 4c579764c95b
        placements: 1
        image_file: source/images-near-literal-v001/S-011__4c579764c95b.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        3) It triggers events lik- this

- open: fired when th- connection is established (including after reconnect)

- (messag- (or your custom event): fired when an event arrives

- error : fired when th- connection fails / is interrupted / CORS issues / during reconnect attempts
Important: browsers do not reliably giv- you th- HTTP status cod- in th- |error event.
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-012 — On what events does it reconnect?

        ```text
        source_id: S-012
        image_hash: 0aa57798dd85
        placements: 1
        image_file: source/images-near-literal-v001/S-012__0aa57798dd85.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        On what events does it reconnect?

It reconnects when th- stream is not explicitly closed by JS and th- connection ends unexpectedly.
- @ Reconnects on: network interruption, server disconnect, proxy timeout, many transient failures.
e- > Does not reconnect if you call eventSource.close() (that’s permanent).
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-013 — EE ES LE

        ```text
        source_id: S-013
        image_hash: 9508bc2e7dfc
        placements: 1
        image_file: source/images-near-literal-v001/S-013__9508bc2e7dfc.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        EE ES LE
Example:
“JavaScript c
es.addEventListener("message", (e) => {
console. log(e.type) ; // "message"
console. log(e.data) ; // string
console. log(e.lastEventId); // string (mayb- "")
ys
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-014 — Exampl- 1: Set a default retry for th- whol- stream

        ```text
        source_id: S-014
        image_hash: a89a3527cc5a
        placements: 1
        image_file: source/images-near-literal-v001/S-014__a89a3527cc5a.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Exampl- 1: Set a default retry for th- whol- stream

Send it onc- near th- beginning (or any time; it updates th- value).
```text oO
retry: 5000

Meaning “wait ~5 seconds befor- reconnecting”.

ASPNET Cor- (SSE) example:
```csharp oO
await Response.WriteAsync("retry: 50@0\n\n");
await Response.Body.FlushAsync();
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-015 — T2 — server detects overload

        ```text
        source_id: S-015
        image_hash: 86b3a493ce22
        placements: 1
        image_file: source/images-near-literal-v001/S-015__86b3a493ce22.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        T2 — server detects overload
Server decides: “if clients disconnect, | want them to reconnect mor- slowly.”
Option A (send retry alone, simplest):
“) Plain text oO
retry: 30000
event: server-busy
data: {"level": "high", "msg": "Back off reconnects"}
Option B (includ- retry: insid- th- sam- event block):
“) Plain text oO
event: server-busy
retry: 30000
data: {"level": "high", "msg": "Back off reconnects"}
Rerawicnar
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-016 — Also, if th- server responds with a non-200 or invalid SSE response, browsers generally tr

        ```text
        source_id: S-016
        image_hash: db08c98150c2
        placements: 1
        image_file: source/images-near-literal-v001/S-016__db08c98150c2.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Also, if th- server responds with a non-200 or invalid SSE response, browsers generally trigger error and
will often keep retrying, which is why retry: can help avoid hammering.
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-017 — Exampl- 2: Chang- retry dynamically (e.g., on overload)

        ```text
        source_id: S-017
        image_hash: 82cdf58f2225
        placements: 1
        image_file: source/images-near-literal-v001/S-017__82cdf58f2225.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Exampl- 2: Chang- retry dynamically (e.g., on overload)
If you detect th- server is under load, you can instruct clients to reconnect less frequently.
```text oO
event: server-busy
data: {"msg":"slow down"}
retry: 30000
Client can listen to | server-busy , but th- key part is retry: 30000 which updates reconnection delay to 30s.
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-018 — Browser.

        ```text
        source_id: S-018
        image_hash: a0d8796c56a7
        placements: 1
        image_file: source/images-near-literal-v001/S-018__a0d8796c56a7.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Browser.
- still stays connected (no reconnect happens now)
- updates reconnect delay to 30000ms
- dispatches server-busy
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-019 — T3 — connection drops (deploy, proxy timeout, wifi blip)

        ```text
        source_id: S-019
        image_hash: dbb4db9f9313
        placements: 1
        image_file: source/images-near-literal-v001/S-019__dbb4db9f9313.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        T3 — connection drops (deploy, proxy timeout, wifi blip)
Socket breaks.

Browser:

1. fires error

2. sets readyStat- = CONNECTING

3. waits ~30000ms (th- last retry: it saw)

4. reconnects to th- sam- URL

5. automatically sends Last-Event-ID: 102

6. fires open on success
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?


---

## S-020 — T4 — server recovered, wants faster reconnect again

        ```text
        source_id: S-020
        image_hash: 228202b06da6
        placements: 1
        image_file: source/images-near-literal-v001/S-020__228202b06da6.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        T4 — server recovered, wants faster reconnect again
After reconnect (or at any time), server can reduc- it:
“) Plain text oO
retry: 5000
event: server-ok
data: {"level":"normal"}
Now futur- reconnect attempts go back to ~5s.
        ```

        ### Смысл

        Конспект описывает browser `EventSource`: автоматический reconnect, `open`/`message`/`error`,
custom event names, `data:`, `id:`, `retry:`, `Last-Event-ID`, `MessageEvent` fields и
практические правила SSE framing.

        ### Вопросы
1. Что браузер делает при разрыве EventSource connection?
2. Как `id:` связан с `Last-Event-ID`?
3. Где передавать дополнительные поля SSE event?

