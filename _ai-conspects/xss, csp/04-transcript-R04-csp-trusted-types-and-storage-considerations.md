# Regional transcript — R04: CSP, Trusted Types and storage considerations

Conspect: `xss, csp`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Content Security Policy and Trusted Types reduce the impact of mistakes at dangerous sinks. They are defense-in-depth controls, not substitutes for escaping and sanitization.

## CSP basics

- Send CSP as an HTTP response header.
- A strict `script-src` should avoid broad `unsafe-inline` and untrusted origins.
- Use nonces or hashes for intentional inline scripts.
- Directives such as `object-src 'none'`, `base-uri 'none'` and `frame-ancestors` reduce additional attack surfaces.

## Deployment

- Start with `Content-Security-Policy-Report-Only` to observe violations.
- Collect reports and remove unexpected script dependencies.
- Move to enforcing mode after validating production behavior.
- Keep third-party origins narrow and intentional.

## Trusted Types

- Trusted Types can require dangerous DOM sinks to receive approved typed values.
- Create a policy that delegates HTML creation to a sanitizer.
- This makes accidental direct assignment to sinks fail in supporting browsers.
- Trusted Types complements CSP and code review.

## Storage

- In-memory state disappears on refresh but remains accessible to injected code while the page is compromised.
- localStorage and sessionStorage persist differently but are both readable by same-origin JavaScript.
- Storage choice is not an XSS defense.
- Sensitive authentication design should minimize token exposure and use appropriate cookie protections where suitable.

## Representative pattern

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-random-per-response';
  object-src 'none';
  base-uri 'none';
  frame-ancestors 'none';
  require-trusted-types-for 'script'
```

## Caveats

- A CSP with permissive wildcards or `unsafe-inline` may provide little protection.
- Trusted Types support and exact policy behavior vary across browsers.

## Source labels

- `when we store in memory we lose on refresh`
- `csp`
- `!!!!`

## Covered text elements

```text
T-001, T-005, T-006
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-013, IU-014, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020, IU-021
IU-022
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
