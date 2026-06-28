# Regional transcript — R03: Dangerous DOM sinks and untrusted input boundaries

Conspect: `xss, csp`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

XSS occurs when untrusted data reaches a browser sink that interprets it as HTML, script, URL code or another executable context.

## Common sinks

- `innerHTML`, `outerHTML`, `insertAdjacentHTML` and `document.write` parse HTML.
- React's `dangerouslySetInnerHTML` is an explicit HTML sink.
- String arguments to timer/eval APIs execute code and should not receive untrusted data.
- Dynamic script URLs and `javascript:` links are also dangerous.

## What counts as untrusted

- Form and editor input.
- Route parameters and query-string values.
- API/database content originally supplied by another user.
- Values from localStorage, postMessage, URL fragments and third-party integrations.

## Safer alternatives

- Use `textContent` or normal JSX for text.
- Create DOM elements and set validated properties rather than concatenating HTML.
- Sanitize only when HTML rendering is an explicit feature.
- Track data provenance instead of assuming database content is trusted.

## Representative pattern

```js
output.textContent = untrustedValue;

// Avoid:
// output.innerHTML = untrustedValue;
```

## Caveats

- A value does not become trusted merely because it was stored and later read from the database.
- Route/query data can be attacker-controlled even without a form field.

## Source labels

- `innerhtml or dangerouslysetinnerhtml from user input`
- `The main rule - dont put anything from user's input`
- `into html by default`
- `not only literal input`
- `but also some route params/query string params`

## Covered text elements

```text
T-004, T-008, T-009, T-010, T-011
```

## Covered screenshot uses

```text
IU-010, IU-011, IU-012
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
