# Supplemental source recovery — missing screenshots

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:00:00 UTC

## Located folder

```text
_ai-conspects/OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties
```

## Why this patch exists

The previously processed SVG contained the complete non-empty text set but no embedded screenshots:

```text
old unique embedded images: 0
old image uses: 0
old non-empty text elements: 227
```

The replacement SVG contains:

```text
recovered unique embedded images: 263
recovered image uses: 269
duplicate image uses: 6
non-empty text elements: 227
empty SVG text placeholders: 38
```

Therefore no new meaningful text was added; the missing material is the screenshot layer.

## Supplemental spatial regions

- **R01:** 44 uses / 44 unique images. Nearby labels: not storing access tokens in browsers cookie auth properties; edpoint names + min flow; what to do for prod
- **R02:** 91 uses / 91 unique images. Nearby labels: default schemes values that are possible; needed for idp to prove that its you who initialized the flow; def challenge scheme how works
- **R03:** 39 uses / 34 unique images. Nearby labels: token rotation; gets in id token and what is being populated into ; for api to decide whether this user is allowed to request it(in addition to scopes)
- **R04:** 34 uses / 34 unique images. Nearby labels: token rotation; are there sec reason or just a payload?; app.Run();
- **R05:** 13 uses / 13 unique images. Nearby labels: token rotation; should we use refresh tokens in spa; what is conf/pub clients and why bff is good
- **R06:** 3 uses / 3 unique images. Nearby labels: what is conf/pub clients and why bff is good; pkce public client spa; confidential/public clients/pkce flow/both lients types flow,bff
- **R07:** 17 uses / 17 unique images. Nearby labels: pkce public client spa; pkce confidential client, mvc,bff; what is conf/pub clients and why bff is good
- **R08:** 12 uses / 12 unique images. Nearby labels: pkce confidential client, mvc,bff; pkce public client spa; what is conf/pub clients and why bff is good
- **R09:** 16 uses / 16 unique images. Nearby labels: !!!; setting all needed scopes; oidc events

## Recovery result

- The complete replacement SVG is stored under `source/`.
- Every embedded image definition is extracted under `source/images/`.
- Every image placement is represented in `data/supplemental-image-uses-v001.*`.
- Duplicate placements are retained and point to their first use.
- Contact sheets are generated for visual audit.
- Base transcript remains preserved.
- Supplemental screenshot transcription is intentionally marked as pending.

## Next step

Process `R01` through `R09`, then update the screenshot ledger to closed and produce a supplemental final-coverage audit.
