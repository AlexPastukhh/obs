# Stage0 source check and boundary review — xss, csp

Generated: 2026-06-28 09:00:00 UTC

## Source decision

New conspect. Exact target:

`_ai-conspects/xss, csp`

Complete source:

`source/xss, csp.svg`

## Source inventory

```text
meaningful text elements: 11
unique embedded screenshots: 29
screenshot uses on canvas: 29
repeated screenshot placements: 0
missing image definitions: 0
unused image definitions: 0
```

## Region method

The complete canvas was reviewed visually. Text and screenshot placements are
assigned to manually selected semantic anchor headings. The regions follow the
visible knowledge roads rather than equal coordinate strips.

## Current coverage boundary

Stage0 preserves, extracts and inventories the source. No semantic transcript
is claimed yet.

```text
processed text elements: 0 / 11
processed screenshot uses: 0 / 29
remaining text elements: 11
remaining screenshot uses: 29
```

## Planned regions

| Region | Logical road | Text | Uses | Unique images |
|---|---|---:|---:|---:|
| R01 | Sanitizing untrusted HTML | 1 | 2 | 2 |
| R02 | Escaping and encoding user content | 1 | 3 | 3 |
| R03 | innerHTML, dangerouslySetInnerHTML and untrusted input boundaries | 5 | 3 | 3 |
| R04 | CSP, Trusted Types and storage considerations | 3 | 14 | 14 |
| R05 | XSS categories and attack flows | 1 | 7 | 7 |

## Next

Review every regional contact sheet, create semantic transcripts and then issue
a combined transcript with a full-conspect coverage audit.
