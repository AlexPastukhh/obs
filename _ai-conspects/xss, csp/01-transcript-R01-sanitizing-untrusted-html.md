# Regional transcript — R01: Sanitizing untrusted HTML

Conspect: `xss, csp`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Sanitization is required when the product intentionally accepts HTML and must preserve a safe subset. It removes or rewrites dangerous markup before the browser interprets it.

## Allowlist model

- Allow known-safe tags and attributes.
- Remove script-capable elements, event-handler attributes and dangerous URL schemes.
- Handle SVG, MathML, style attributes and malformed markup according to the sanitizer's threat model.
- Use a maintained HTML sanitizer rather than regex replacements.

## Boundary placement

- Sanitize as close as possible to the HTML trust boundary.
- Server-side sanitization protects every client consuming stored content.
- Client-side sanitization can provide defense in depth before a dangerous DOM sink.
- Store whether content is raw or sanitized so it is not accidentally trusted twice.

## React usage

- Normal JSX text rendering escapes content automatically.
- `dangerouslySetInnerHTML` bypasses that escaping and must receive sanitized HTML.
- Keep the sanitizer configuration centralized.
- Review allowed protocols for links and images.

## Representative pattern

```tsx
const cleanHtml = DOMPurify.sanitize(untrustedHtml, {
  USE_PROFILES: { html: true }
});

return <article dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
```

## Caveats

- Sanitization policy must be updated as browser behavior and sanitizer versions change.
- Sanitized HTML is still data; do not convert it into executable JavaScript or CSS contexts.

## Source labels

- `sanitizing`

## Covered text elements

```text
T-002
```

## Covered screenshot uses

```text
IU-005, IU-006
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
