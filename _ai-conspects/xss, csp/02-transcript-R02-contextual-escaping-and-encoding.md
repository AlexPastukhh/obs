# Regional transcript — R02: Contextual escaping and encoding

Conspect: `xss, csp`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Escaping treats user content as data rather than markup. The required encoding depends on the destination context: HTML text, attribute, URL, JavaScript or CSS.

## Framework defaults

- React escapes string values inserted into JSX text and attributes.
- Server template engines usually provide automatic HTML encoding.
- Do not disable automatic encoding for convenience.
- Use text nodes or `textContent` when inserting plain text into the DOM.

## Context matters

- HTML encoding is not sufficient inside JavaScript source.
- URL values must be parsed and constrained to allowed schemes/origins.
- CSS values need their own validation and encoding rules.
- Attribute names and event-handler attributes should not be built from untrusted input.

## Encoding versus sanitizing

- Escape when the desired output is plain text.
- Sanitize when a safe HTML subset must remain markup.
- Validation rejects values outside a business format but is not a complete XSS defense.

## Representative pattern

```tsx
return <p>{userComment}</p>; // React emits text, not executable HTML
```

## Caveats

- Manually concatenating HTML strings can bypass framework escaping.
- A value safe in one output context may be unsafe in another.

## Source labels

- `escaping user content`

## Covered text elements

```text
T-003
```

## Covered screenshot uses

```text
IU-007, IU-008, IU-009
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
