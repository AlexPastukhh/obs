# Regional transcript — R05: Stored, reflected and DOM-based XSS flows

Conspect: `xss, csp`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

XSS categories describe where the malicious value is persisted and where the unsafe interpretation occurs.

## Stored XSS

- An attacker submits a payload that is stored by the application.
- Another user loads the stored content.
- The server or client inserts it into an executable sink.
- The payload runs in the victim's origin.

## Reflected XSS

- A request value such as a query parameter is immediately included in the response.
- The victim follows a crafted URL.
- Unsafe server rendering reflects the payload into HTML or script context.
- Correct contextual encoding prevents execution.

## DOM-based XSS

- The server response may be static and safe.
- Client JavaScript reads attacker-controlled URL/storage/message data.
- The client writes that value to a dangerous DOM sink.
- The vulnerability exists entirely in browser-side data flow.

## Impact

- Read accessible page data and tokens.
- Perform actions with the victim's session.
- Modify UI, capture input or redirect the user.
- Exfiltrate data to an attacker-controlled endpoint when policy permits.

## Representative pattern

```text
source (query / DB / postMessage)
→ application processing
→ unsafe HTML/script sink
→ execution in trusted origin
```

## Caveats

- The categories can overlap; stored data can later trigger a DOM-based sink.
- HttpOnly cookies reduce direct cookie theft but do not stop authenticated actions from injected code.

## Source labels

- `types of xss`

## Covered text elements

```text
T-007
```

## Covered screenshot uses

```text
IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
