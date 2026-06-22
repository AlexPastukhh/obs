# Stage0 - Cookies general theory / plain cookie options source check and boundary review v001

Generated: 2026-06-02 16:20:00 UTC

## Direction check

Goal:
Convert the uploaded `cookies-general-theo-plain-cookie-options.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, duplicate-use list, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries so large passes can process 60-100+ images without losing/duplicating screenshots.

Next:
Start transcript pass after boundary review. Since total image-use count is 90, the whole conspect can probably be closed in one transcript pass if boundary review confirms coherence. Otherwise split as R01+R02 and then R03.

---

## Counts

```text
unique embedded images: 90
image uses on canvas: 90
text labels parsed: 25
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Candidate images | Meaning |
|---|---:|---|
| R01 | 21 | auth cookie options / full defaults / plain CookieOptions / AddCookie impact / UseCookiePolicy / Cookie.Name / normal cookie flow |
| R02 | 40 | general cookie theory / request-response cookies / partitioned and third-party cookies / how cookies look / HttpOnly vs non-HttpOnly / refresh-token storage notes |
| R03 | 29 | SameSite option / Secure when SameSite=None / HTTPS vs non-HTTPS cookie visibility / examples/comparison / SameSite vs CORS allowance |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
```

## Suggested batching

```text
Pass 1 option A: R01+R02+R03 = 90 images.
Meaning: full cookies conspect in one pass, if boundary review confirms this is a coherent single sheet.

Pass 1 option B: R01+R02 = 61 images.
Meaning: auth/plain cookie options + general cookie theory + partitioned/HttpOnly/refresh-token road.

Pass 2 option B: R03 = 29 images.
Meaning: SameSite/Secure/CORS comparison road with final coverage audit.
```
