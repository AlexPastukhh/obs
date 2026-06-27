# Corrected source check and boundary review — jwt auth v002

## Source mapping

- Uploaded repaired source: `jwt auth(1).svg`
- Existing logical folder: `_ai-conspects/jwt auth/`
- Authoritative corrected source: `source/jwt auth.svg`
- Raw uploaded source preserved: `source/jwt auth(1).svg`

## Verified correction

```text
previous embedded images: 0
corrected unique embedded images: 170
corrected image uses: 171
recovered missing image uses: 171
text labels: 112 (unchanged)
duplicate image placements: 1
removed old text labels: 0
```

The previous export retained the native canvas text but omitted every screenshot.
The repaired SVG restores all screenshot evidence while keeping the same 112 text labels.

## Semantic regions

| Region | Images | Labels | Scope |
|---|---:|---:|---|
| R01 | 11 | 74 | React Query singleton token cache, refresh single-flight, authenticated fetch, login/logout and UI updates |
| R02 | 35 | 21 | refresh-token rotation, token families, replay detection, database state and Redis acceleration/locking |
| R03 | 58 | 9 | end-to-end ASP.NET Core + React access/refresh flow, boot auth and reactive external token store |
| R04 | 67 | 8 | JWT signing keys, KID/JWKS rotation, token descriptors, handlers, headers/claims/signature and validation |

## Audit assets

- `audit-assets/jwt-auth-corrected-full-preview-v002.png`
- regional contact sheets under `audit-assets/contact-sheet-r01...r04-final-v002-*.png`

## Review result

All 171 screenshot placements and all 112 canvas labels were reviewed and assigned to a semantic region. The duplicate screenshot placement remains represented as two source uses and one unique extracted image.
