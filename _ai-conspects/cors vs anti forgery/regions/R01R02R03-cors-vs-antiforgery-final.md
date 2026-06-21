# ASP.NET Core CORS vs antiforgery / simple requests / preflight / credentials — R01/R02/R03 final transcript v001

Generated: 2026-06-22 00:00:00 UTC

## Direction check

Goal: convert the source SVG and screenshots into source-preserving AI-readable text without losing image or canvas-label coverage.

This pass closes all 20 image uses and 5 grouped text blocks.

## 0.1 Area overview / reading quality

Explains why CORS and antiforgery solve different browser-security problems: CORS controls cross-origin JavaScript access and some non-simple request delivery, while antiforgery protects cookie-authenticated state-changing endpoints from cross-site request forgery.

Key ideas:

- CORS answers whether browser JavaScript from one origin may access another origin and whether a non-simple request may proceed after preflight.

- Antiforgery answers whether a state-changing request was intentionally initiated by the legitimate application/user context.

- Simple cross-site requests can be transmitted without preflight; the inability to read the response does not prevent server-side state change.

- Cookie authentication is automatically attached by the browser under applicable cookie rules, which is why CSRF exists.

- For APIs using bearer tokens in Authorization headers, the browser does not automatically attach the token in the same way as cookies; the threat model differs.

- Use antiforgery validation on unsafe cookie-authenticated endpoints, not as a replacement for authentication/authorization.


Reading quality: High conceptual readability. Screenshots and code examples were readable enough for semantic transcription; preserved PNGs remain source of truth for exact punctuation and code formatting.

## Verified semantic transcript

### R01 — Attacker capabilities and CORS boundaries

Classic HTML mechanisms such as forms, images and navigation can send cross-origin requests even when JavaScript cannot read responses. CORS is primarily an origin-based browser access-control mechanism; it does not authenticate a request and is not a complete CSRF defense.

Coverage: 7 image uses, 4 grouped text blocks. Sources: S-001, S-002, S-003, S-004, S-005, S-006, S-007.

### R02 — Simple requests, preflight and why CORS is not enough

Simple requests can be sent without preflight. A cookie-authenticated cross-site form POST may therefore reach the server and change state. Non-simple requests trigger OPTIONS preflight; if preflight fails the browser does not send the actual request, but this behavior must not be treated as antiforgery validation.

Coverage: 8 image uses, 1 grouped text blocks. Sources: S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015.

### R03 — XHR/fetch behavior and practical defense

XHR and fetch expose CORS failures to JavaScript and support modern API request shapes. Practical defense combines same-site cookie settings, server-side antiforgery tokens for cookie-authenticated unsafe methods, careful CORS allowlists, explicit credentials policy and defense-in-depth headers/origin checks.

Coverage: 5 image uses, 0 grouped text blocks. Sources: S-016, S-017, S-018, S-019, S-020.

## Operational and security conclusions

- CORS answers whether browser JavaScript from one origin may access another origin and whether a non-simple request may proceed after preflight.

- Antiforgery answers whether a state-changing request was intentionally initiated by the legitimate application/user context.

- Simple cross-site requests can be transmitted without preflight; the inability to read the response does not prevent server-side state change.

- Cookie authentication is automatically attached by the browser under applicable cookie rules, which is why CSRF exists.

- For APIs using bearer tokens in Authorization headers, the browser does not automatically attach the token in the same way as cookies; the threat model differs.

- Use antiforgery validation on unsafe cookie-authenticated endpoints, not as a replacement for authentication/authorization.

## Evidence map

- `data/R01R02R03-sources-stage1-v001.*` — every screenshot placement.

- `data/R01R02R03-text-labels-stage1-v001.*` — every grouped canvas-text block.

- `audit-assets/R01R02R03-source-images/` — source images renamed by source id.

- `data/final-coverage-audit-stage1-v001.*` — zero-remaining coverage audit.

## Final status

```text
total image uses: 20
total grouped text blocks: 5
remaining unclosed image uses: 0
remaining unclosed text blocks: 0
```
