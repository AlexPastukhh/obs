# Full combined final transcript — xss, csp

Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
meaningful text elements: 11 / 11
unique embedded screenshots: 29 / 29
screenshot uses: 29 / 29
repeated placements retained: 0
regions: 5 / 5
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Sanitizing untrusted HTML

Sanitization is required when the product intentionally accepts HTML and must preserve a safe subset. It removes or rewrites dangerous markup before the browser interprets it.

### Allowlist model

- Allow known-safe tags and attributes.
- Remove script-capable elements, event-handler attributes and dangerous URL schemes.
- Handle SVG, MathML, style attributes and malformed markup according to the sanitizer's threat model.
- Use a maintained HTML sanitizer rather than regex replacements.

### Boundary placement

- Sanitize as close as possible to the HTML trust boundary.
- Server-side sanitization protects every client consuming stored content.
- Client-side sanitization can provide defense in depth before a dangerous DOM sink.
- Store whether content is raw or sanitized so it is not accidentally trusted twice.

### React usage

- Normal JSX text rendering escapes content automatically.
- `dangerouslySetInnerHTML` bypasses that escaping and must receive sanitized HTML.
- Keep the sanitizer configuration centralized.
- Review allowed protocols for links and images.

### Representative pattern

```tsx
const cleanHtml = DOMPurify.sanitize(untrustedHtml, {
  USE_PROFILES: { html: true }
});

return <article dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
```

### Caveats

- Sanitization policy must be updated as browser behavior and sanitizer versions change.
- Sanitized HTML is still data; do not convert it into executable JavaScript or CSS contexts.

## R02 — Contextual escaping and encoding

Escaping treats user content as data rather than markup. The required encoding depends on the destination context: HTML text, attribute, URL, JavaScript or CSS.

### Framework defaults

- React escapes string values inserted into JSX text and attributes.
- Server template engines usually provide automatic HTML encoding.
- Do not disable automatic encoding for convenience.
- Use text nodes or `textContent` when inserting plain text into the DOM.

### Context matters

- HTML encoding is not sufficient inside JavaScript source.
- URL values must be parsed and constrained to allowed schemes/origins.
- CSS values need their own validation and encoding rules.
- Attribute names and event-handler attributes should not be built from untrusted input.

### Encoding versus sanitizing

- Escape when the desired output is plain text.
- Sanitize when a safe HTML subset must remain markup.
- Validation rejects values outside a business format but is not a complete XSS defense.

### Representative pattern

```tsx
return <p>{userComment}</p>; // React emits text, not executable HTML
```

### Caveats

- Manually concatenating HTML strings can bypass framework escaping.
- A value safe in one output context may be unsafe in another.

## R03 — Dangerous DOM sinks and untrusted input boundaries

XSS occurs when untrusted data reaches a browser sink that interprets it as HTML, script, URL code or another executable context.

### Common sinks

- `innerHTML`, `outerHTML`, `insertAdjacentHTML` and `document.write` parse HTML.
- React's `dangerouslySetInnerHTML` is an explicit HTML sink.
- String arguments to timer/eval APIs execute code and should not receive untrusted data.
- Dynamic script URLs and `javascript:` links are also dangerous.

### What counts as untrusted

- Form and editor input.
- Route parameters and query-string values.
- API/database content originally supplied by another user.
- Values from localStorage, postMessage, URL fragments and third-party integrations.

### Safer alternatives

- Use `textContent` or normal JSX for text.
- Create DOM elements and set validated properties rather than concatenating HTML.
- Sanitize only when HTML rendering is an explicit feature.
- Track data provenance instead of assuming database content is trusted.

### Representative pattern

```js
output.textContent = untrustedValue;

// Avoid:
// output.innerHTML = untrustedValue;
```

### Caveats

- A value does not become trusted merely because it was stored and later read from the database.
- Route/query data can be attacker-controlled even without a form field.

## R04 — CSP, Trusted Types and storage considerations

Content Security Policy and Trusted Types reduce the impact of mistakes at dangerous sinks. They are defense-in-depth controls, not substitutes for escaping and sanitization.

### CSP basics

- Send CSP as an HTTP response header.
- A strict `script-src` should avoid broad `unsafe-inline` and untrusted origins.
- Use nonces or hashes for intentional inline scripts.
- Directives such as `object-src 'none'`, `base-uri 'none'` and `frame-ancestors` reduce additional attack surfaces.

### Deployment

- Start with `Content-Security-Policy-Report-Only` to observe violations.
- Collect reports and remove unexpected script dependencies.
- Move to enforcing mode after validating production behavior.
- Keep third-party origins narrow and intentional.

### Trusted Types

- Trusted Types can require dangerous DOM sinks to receive approved typed values.
- Create a policy that delegates HTML creation to a sanitizer.
- This makes accidental direct assignment to sinks fail in supporting browsers.
- Trusted Types complements CSP and code review.

### Storage

- In-memory state disappears on refresh but remains accessible to injected code while the page is compromised.
- localStorage and sessionStorage persist differently but are both readable by same-origin JavaScript.
- Storage choice is not an XSS defense.
- Sensitive authentication design should minimize token exposure and use appropriate cookie protections where suitable.

### Representative pattern

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-random-per-response';
  object-src 'none';
  base-uri 'none';
  frame-ancestors 'none';
  require-trusted-types-for 'script'
```

### Caveats

- A CSP with permissive wildcards or `unsafe-inline` may provide little protection.
- Trusted Types support and exact policy behavior vary across browsers.

## R05 — Stored, reflected and DOM-based XSS flows

XSS categories describe where the malicious value is persisted and where the unsafe interpretation occurs.

### Stored XSS

- An attacker submits a payload that is stored by the application.
- Another user loads the stored content.
- The server or client inserts it into an executable sink.
- The payload runs in the victim's origin.

### Reflected XSS

- A request value such as a query parameter is immediately included in the response.
- The victim follows a crafted URL.
- Unsafe server rendering reflects the payload into HTML or script context.
- Correct contextual encoding prevents execution.

### DOM-based XSS

- The server response may be static and safe.
- Client JavaScript reads attacker-controlled URL/storage/message data.
- The client writes that value to a dangerous DOM sink.
- The vulnerability exists entirely in browser-side data flow.

### Impact

- Read accessible page data and tokens.
- Perform actions with the victim's session.
- Modify UI, capture input or redirect the user.
- Exfiltrate data to an attacker-controlled endpoint when policy permits.

### Representative pattern

```text
source (query / DB / postMessage)
→ application processing
→ unsafe HTML/script sink
→ execution in trusted origin
```

### Caveats

- The categories can overlap; stored data can later trigger a DOM-based sink.
- HttpOnly cookies reduce direct cookie theft but do not stop authenticated actions from injected code.

## Regional source map

### R01

- transcript: `01-transcript-R01-sanitizing-untrusted-html.md`
- text elements: `1`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-contextual-escaping-and-encoding.md`
- text elements: `1`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-dangerous-dom-sinks-and-untrusted-input-boundaries.md`
- text elements: `5`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-csp-trusted-types-and-storage-considerations.md`
- text elements: `3`
- screenshot uses: `14`
- unique screenshots: `14`
- repeated placements: `0`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-stored-reflected-and-dom-based-xss-flows.md`
- text elements: `1`
- screenshot uses: `7`
- unique screenshots: `7`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
browser/runtime/library versions and original examples.
